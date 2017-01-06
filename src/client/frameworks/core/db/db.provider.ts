/* tslint:disable max-classes-per-file */
// Importables
import { Inject, EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as PouchDB from 'pouchdb';
import * as _ from 'lodash';

// Components
import { EventEmitProvider } from '../events';
import { LogEventError } from '../log';
import { LogEventLog } from '../log';
import { LogService } from '../log';

export interface IDatabaseProviderOptions {
  name: string;
  retry: number;
  debugFilter: string;
};

// put here to avoid side-effects
export const DATABASE_PROVIDER_OPTIONS: IDatabaseProviderOptions = {
  name: 'blackbeard',
  retry: 5,
  debugFilter: 'pouchdb:api',
};

export class DatabaseProviderOptions {

  constructor(options?: any) {
    const defaults = {
      name: 'blackbeard',
      retry: 5,
      debugFilter: 'pouchdb:api',
    };
    return Object.assign(defaults, options);
  }

}

@Injectable()
export class DatabaseProvider {

  private __db: any; // should be PouchDB
  private __options: any;

  private __emitter$: EventEmitter<any>;

  constructor(
    private __logging: LogService,
    @Inject(DATABASE_PROVIDER_OPTIONS) options: DatabaseProviderOptions,
  ) {

    this.__logging.log(new LogEventLog(`Initializing Database`));
    this.__options = Object.assign(DATABASE_PROVIDER_OPTIONS, options); // could be moved to class

    // connect to emitter
    this.__emitter$ = EventEmitProvider.connect(DatabaseProvider.name);

    try {
      // sync for now...
      PouchDB['debug'].enable(this.__options.debugFilter);
      const db = new PouchDB(this.__options.name);

      if (!!_.isFunction(db)) {
        throw new Error(`${PouchDB.constructor.name} - Promise missing`);
      }

      this.__logging.log(new LogEventLog(db));
      this.__db = db; // sync
    } catch (err) {
      this.__logging.log(new LogEventError(err));
    }

  }

  // public

  public get db(): any {
    return this.__db;
  }

  public get(id: string): Observable<any> {
    return this.__fromPromise(this.db.get(id));
  }

  public post(doc: any = {}): Observable<any> {
    return this.__fromPromise(this.db.post(doc));
  }

  public put(doc: any = {}): Observable<any> {
    return this.__fromPromise(this.db.put(doc));
  }

  public allDocs(options: any = { include_docs: true }): Observable<any> {
    return this.__fromPromise(this.db.allDocs(options));
  }

  public create(doc: any = {}): Observable<any> {
    return this.post(doc);
  }

  public update(id: string, doc): Observable<any> {
    return this.get(id)
      .switchMap(_doc => this.put(doc));
  }

  // yep, wtf
  public wtf(): any {
    // should be disposed
    if (!!this.__db) {
      return this.__db.destroy();
    }
  }

  // private

  private __fromPromise(promise): Observable<any> {
    return Observable
      .fromPromise(promise)
      .catch(err => {
        this.__logging.log(new LogEventError(err));
        return Observable.of({}); // cached version
      });
  }

};

export const DATABASE_PROVIDERS = [
  {
    provide: DATABASE_PROVIDER_OPTIONS,
    useValue: DATABASE_PROVIDER_OPTIONS,
  },
  {
    provide: DatabaseProvider,
    useClass: DatabaseProvider,
  },
];
