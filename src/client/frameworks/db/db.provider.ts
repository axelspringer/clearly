// imports
import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
import { Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Observer } from 'rxjs';
import { OpaqueToken } from '@angular/core';

// interface
import { IDBSchema } from './db.interface';
import { IDB_TXN_READ } from './db.interface';
import { IDB_TXN_READWRITE } from './db.interface';

export const IDB_FACTORY = new OpaqueToken('IDB_FACTORY');
export const IDB_SCHEMA = new OpaqueToken('IDB_SCHEMA');

export const getIDBFactory = (): IDBFactory => {
  return typeof window !== 'undefined' ? window.indexedDB : self.indexedDB;
};

@Injectable()
export class DatabaseProvider {

  constructor(
    @Inject(IDB_SCHEMA) public schema: IDBSchema = null,
    @Inject(IDB_FACTORY) public idb: IDBFactory = null,
  ) {
    console.log(`Initializing DatabaseProvider ...`);
  }

  // public

  public open(dbName: string, dbSchemaVersion: number = 1): Observable<IDBDatabase> {
    // self
    const idb = this.idb;
    const schema = this.schema;

    return new Observable((observer: Observer<any>) => {

      // open database
      const openRequest: IDBOpenDBRequest = idb.open(dbName, schema.version || dbSchemaVersion);

      // success.
      openRequest.onsuccess = (event: Event) => { // on success, return the handle to the database

        // instance object
        const db = (<IDBOpenDBRequest> event.target).result;

        observer.next(db);
        observer.complete();
      };

      // error.
      openRequest.onerror = (event: Event) => {
        observer.error((<IDBOpenDBRequest> event.target).error);
      };

      // upgrade needed.
      openRequest.onupgradeneeded = (event: Event) => {

        // instance object
        const db = (<IDBOpenDBRequest> event.target).result;

        observer.next(this.upgrade(db));
        observer.complete();

      };

    });
  }

  public get(storeName: string, key: string | number): Observable<any> {
    // self
    const schema = this.schema;
    const open$ = this.open(schema.name, schema.version);

    return open$
      .switchMap((db: IDBDatabase) => {
        // get object store.
        const store: IDBObjectStore = this.getObjectStore(db, storeName, IDB_TXN_READ);

        return new Observable((observer: Observer<any>) => {

          // request.
          const request: IDBRequest = store.get(key);

          // success.
          request.onsuccess = (event: Event) => {

            const data = (<IDBOpenDBRequest> event.target).result;

            if (data) {
              observer.next(data);
              observer.complete();
            } else {
              observer.complete();
            }

          };

          // error.
          request.onerror = (event: Event) => {
            observer.error((<IDBRequest> event.target).error);
          };
        });
      });
  }

  public getAll(storeName: string): Observable<any> {
    // self
    const schema = this.schema;
    const open$ = this.open(schema.name, schema.version);

    return open$
      .switchMap((db: IDBDatabase) => {
        // get object store.
        const store: IDBObjectStore = this.getObjectStore(db, storeName, IDB_TXN_READ);

        return new Observable((observer: Observer<any>) => {

          // request.
          const request: IDBRequest = store.openCursor();

          // success.
          request.onsuccess = (event: Event) => {

            // step through values in the object store
            const cursor: IDBCursorWithValue = (<IDBRequest> event.target).result;

            if (cursor) {
              observer.next(cursor.value);
              cursor.continue();
            } else {
              observer.complete();
            }

          };

          // error.
          request.onerror = (event: Event) => {
            observer.error((<IDBRequest> event.target).error);
          };
        });
      });
  }

  public write(storeName: string, obj: any, key?: string | number): Observable<any> {
    // self
    const schema = this.schema;
    const open$ = this.open(schema.name, schema.version);

    return open$
      .switchMap((db: IDBDatabase) => {
        // get object store
        const store: IDBObjectStore = this.getObjectStore(db, storeName, IDB_TXN_READWRITE);

        return new Observable((observer: Observer<any>) => {

          // request.
          const request: IDBRequest = store.add(obj, key);

          // success.
          request.onsuccess = (event: Event) => {
            observer.next((<IDBRequest> event.target).readyState);
            observer.complete();
          };

          // error.
          request.onerror = (event: Event) => {
            observer.error((<IDBRequest> event.target).error.name);
          };

        });

      });
  }

  public delete(storeName: string, key: string | number) {
    // self
    const schema = this.schema;
    const open$ = this.open(schema.name, schema.version);

    return open$
      .switchMap((db: IDBDatabase) => {
        // get object store
        const store: IDBObjectStore = this.getObjectStore(db, storeName, IDB_TXN_READWRITE);

        return new Observable((observer: Observer<any>) => {

          // request
          const request: IDBRequest = store.delete(key);

          // success.
          request.onsuccess = (event: Event) => {
            observer.next((<IDBRequest> event.target).readyState);
            observer.complete();
          };

          // error.
          request.onerror = (event: Event) => {
            observer.error((<IDBRequest> event.target).error.name);
          };

        });
      });

  }

  public update(storeName: string, obj: any, key?: string | number) {
    // self
    const schema = this.schema;
    const open$ = this.open(schema.name, schema.version);

    return open$
      .switchMap((db: IDBDatabase) => {
        // get object store
        const store: IDBObjectStore = this.getObjectStore(db, storeName, IDB_TXN_READWRITE);

        return new Observable((observer: Observer<any>) => {

          // request
          const request: IDBRequest = store.put(obj, key);

          // success.
          request.onsuccess = (event: Event) => {
            observer.next((<IDBRequest> event.target).readyState);
            observer.complete();
          };

          // error.
          request.onerror = (event: Event) => {
            observer.error((<IDBRequest> event.target).error.name);
          };

        });
      });

  }

  // private

  private upgrade(dbRef: IDBDatabase): IDBDatabase {
    // self
    const schema = this.schema;

    Object.keys(this.schema.stores).forEach(store => {
      if (dbRef.objectStoreNames.contains(store)) {
        dbRef.deleteObjectStore(store);
      }
      dbRef.createObjectStore(store, <IDBObjectStoreParameters> schema.stores[store]);
    });

    return dbRef;
  }

  private getObjectStore(dbRef: IDBDatabase, storeName: string, mode: string) {
    const tx: IDBTransaction = dbRef.transaction(storeName, mode);
    return tx.objectStore(storeName);
  }

}
