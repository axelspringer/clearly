// Importables
import { Inject, EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as PouchDB from 'pouchdb';
import * as R from 'ramda';

// Components
import { EventEmitProvider } from '../events';
import { LogEventError } from '../log';
import { LogEventLog } from '../log';
import { LogService } from '../log';

export interface DatabaseProviderOptions {
  name: string;
  retry: number;
  debugFilter: string;
};

// put here to avoid side-effects
export const DATABASE_PROVIDER_OPTIONS: DatabaseProviderOptions = {
  name: 'blackbeard',
  retry: 5,
  debugFilter: 'pouchdb:api'
};

export class DatabaseProviderOptions {

  constructor(options?: any) {
    const defaults = {
      name: 'blackbeard',
      retry: 5,
      debugFilter: 'pouchdb:api'
    };
    return Object.assign(defaults, options);
  }

}

@Injectable()
export class DatabaseProvider {

  private _db: any; // should be PouchDB
  private _options: any;

  private _emitter$: EventEmitter<any>;
  // private _requests: number = 0;

  constructor(
    private _logging: LogService,
    @Inject(DATABASE_PROVIDER_OPTIONS) options: DatabaseProviderOptions
  ) {

    this._logging.log(new LogEventLog(`Initializing Database`));
    this._options = Object.assign(DATABASE_PROVIDER_OPTIONS, options); // could be moved to class

    // connect to emitter
    this._emitter$ = EventEmitProvider.connect(DatabaseProvider.name);

    try {
      // sync for now...
      PouchDB['debug'].enable(this._options.debugFilter);
      const db = new PouchDB(this._options.name);

      if (!!R.is(Function, db))
        throw new Error(`${PouchDB.constructor.name} - Promise missing`);

      this._logging.log(new LogEventLog(db));
      this._db = db; // sync
    } catch (err) {
      this._logging.log(new LogEventError(err));
    }

  }

  get db(): any {
    return this._db;
  }

  get(id: string): Observable<any> {
    return this._fromPromise(this.db.get(id));
  }

  post(doc: any = {}): Observable<any> {
    return this._fromPromise(this.db.post(doc));
  }

  put(doc: any = {}): Observable<any> {
    return this._fromPromise(this.db.put(doc));
  }

  allDocs(options: any = { include_docs: true }): Observable<any> {
    return this._fromPromise(this.db.allDocs(options));
  }

  create(doc: any = {}): Observable<any> {
    return this.post(doc);
  }

  update(id: string, doc): Observable<any> {
    return this.get(id)
      .switchMap(_doc => this.put(doc));
  }

  _fromPromise(promise): Observable<any> {
    return Observable
      .fromPromise(promise)
      .catch(err => {
        this._logging.log(new LogEventError(err));
        return Observable.of({}); // cached version
      });
  }

  // yep, wtf
  wtf(): any {

    // should be disposed
    if (!!this._db)
      return this._db.destroy();

  }

};


export const DATABASE_PROVIDERS = [
  {
    provide: DATABASE_PROVIDER_OPTIONS,
    useValue: DATABASE_PROVIDER_OPTIONS
  },
  {
    provide: DatabaseProvider,
    useClass: DatabaseProvider
  }
];
