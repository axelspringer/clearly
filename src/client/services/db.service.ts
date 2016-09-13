// Database service
import { Injectable } from '@angular/core';
import {
  Subject,
  Observable,
  Observer
} from 'rxjs';
import PouchDB = require('pouchdb');

import { DBConfig } from '../config';

@Injectable()
export class DBService {

  private _db;
  private _updates: Subject<Object>;

  constructor() {

    this.initDB();
    this._updates = <Subject<Object>>new Subject();

  }

  get updates() {

    return this._updates.asObservable();

  }

  get db() {

    return this._db;

  }

  initDB() {

    console.group(`Initializin DBService`);
    this._db = new PouchDB(DBConfig.NAME); // defaults to idb
    console.log(this._db);
    console.groupEnd();

  }

  open(name: string, options?: Object): Observable<any> {

    return Observable.create((observer: Observer<any>) => {

      try {

        // this is alll very much sync ...
        const db = new PouchDB(name, options);
        this._db = db;
        observer.next(db);
        observer.complete();

      } catch (err) {

        observer.error(err);

      }

    });

  }


  create(): Observable<any> {

    return Observable.fromPromise(this._db.post({}));

  }

  update(id: string, data: Object) {

    this._db.get(id).then(doc => {
      return this._db.put(Object.assign({
        _id: id,
        _rev: doc._rev
      }, data))
        .then(res => this._updates.error(res))
        .catch(err => this._updates.error(err));
    });

  }

  // wtf
  wtf() {

    this._db.destroy();

  }

}
