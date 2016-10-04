// Importables
import { AsyncSubject } from 'rxjs';
import { Inject, EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Observer } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { ReplaySubject } from 'rxjs';
import * as PouchDB from 'pouchdb';
import * as R from 'ramda';

// Components
import { LogEventError } from '../log';
import { LogEventInfo } from '../log';
import { LogEventLog } from '../log';
import { LogService } from '../log';

import { EventEmitProvider } from '../events';
import { Event } from '../events';

export interface DatabaseProviderOptions {
  name: string;
  retry: number;
  debugFilter: string;
};

// put here to avoid side-effects
export var DATABASE_PROVIDER_OPTIONS: DatabaseProviderOptions = {
  name: 'blackbeard',
  retry: 5,
  debugFilter: 'pouchdb:api'
};


@Injectable()
export class DatabaseProvider {

  private _db: any; // should be PouchDB
  private _logging: LogService;
  private _options: DatabaseProviderOptions;

  private _emitter$: EventEmitter<any>;
  private _requests: number = 0;

  constructor(
    log: LogService,
    @Inject(DATABASE_PROVIDER_OPTIONS) options: DatabaseProviderOptions
  ) {

    this._logging = log;
    this._logging.log(new LogEventLog(`Initializing Database`));
    this._options = options;

    // connect to emitter
    this._emitter$ = EventEmitProvider.connect(DatabaseProvider.name);

    try {
      // sync for now...
      PouchDB.debug.enable(options.debugFilter);
      const db = new PouchDB(options.name);

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


export var DATABASE_PROVIDERS = [
  {
    provide: DATABASE_PROVIDER_OPTIONS,
    useValue: DATABASE_PROVIDER_OPTIONS
  },
  {
    provide: DatabaseProvider,
    useClass: DatabaseProvider
  }
];
