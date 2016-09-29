// Importables
import { Injectable } from '@angular/core';

import {
  Subject,
  BehaviorSubject,
  ReplaySubject,
  AsyncSubject,
  Observable,
  Observer
} from 'rxjs';
import * as PouchDB from 'pouchdb';

// Components
import { DBConfig } from '../config'; // should remove this

@Injectable()
export class DBService {

  private _db$;
  private _updates$: AsyncSubject<Object>;

  constructor() {
    this._updates$ = <AsyncSubject<Object>>new AsyncSubject();
  }

  // properties
  get updates() {
    return this._updates$.asObservable();
  }

  get db() {
    return Observable.of(this._db$);
  }

  // operations
  open(name: string, options?: Object): Observable<any> {

    return Observable.create((observer: Observer<any>) => {

      try {

        console.group(`Initializing Database ...`);

        console.log(`Enabling PouchDB (*) debug mode ...`);
        PouchDB.debug.enable('*');

        // this is all really sync ...
        const db = new PouchDB(name, options);


        // this._db$ = db;

        console.log(this._db);
        observer.next(db);
        observer.complete();
        console.groupEnd();

      } catch (err) {

        observer.error(err);

      }

    });

  }

  create(doc?: Object) {
    Observable.from(this._db$.put(doc || {}))
      .retry(5)
      .onErrorResumeNext()
      .subscribe(this._updates$); // we can subscribe with a subject

    return this.db; // generating new stream from
  }

  save(id: string, data: Object): Promise<any> {
    return this._db$.get(id).then(doc => {
      return this._db$.put(Object.assign({
        _id: id,
        _rev: doc['_rev']
      }, data));
    });
  }

  allDocs(options?: Object) { // TODO@sdoell: fet
    // return Observable.when()

    // .of(this._db$)().switchMap(db => {
    //   return Observable.from(this._db$.allDocs(options || {
    //     include_docs: true
    //   }));
    // });

    // Observable.from(this._db$.allDocs(options || {
    //   include_docs: true
    // }));
  }

  // wtf
  wtf() {

    this._db$.destroy();

  }

}
