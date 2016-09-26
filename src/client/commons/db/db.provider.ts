// Importables
import { AsyncSubject } from 'rxjs';
import { Inject } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Observer } from 'rxjs';
import { ReplaySubject } from 'rxjs';
import * as PouchDB from 'pouchdb';
import * as R from 'ramda';

// Components
import { LogEventError } from '../log';
import { LogEventInfo } from '../log';
import { LogEventLog } from '../log';
import { LogService } from '../log';


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
export class DatabaseProvider implements DatabaseProvider {

  private _db: any; // should be PouchDB
  private _log: LogService;
  private _options: DatabaseProviderOptions;

  constructor(
    logService: LogService,
    @Inject(DATABASE_PROVIDER_OPTIONS) options: DatabaseProviderOptions
  ) {

    this._log = logService;
    this._options = options;

    this._log.log(new LogEventLog(`Initializing Database`));

    try {

      // sync for now...
      const db = new PouchDB(options.name);
      this._log.log(new LogEventLog(db));

      PouchDB.debug.enable(options.debugFilter);

      this._db = db; // sync

    } catch (err) {

      this._log.log(new LogEventError(err));

    }

  }

  get db(): any {

    return this._db;

  }

  create(doc: any = {}): Observable<any> {

    return this.post();

  }

  update(id: string, doc) {

    return this.get(id)
      .switchMap(_doc => {
        return this.put(doc); // could be chained
      });

  }

  get(id: string): Observable<any> {

    return this._toPromise(this.db.get(id));

  }

  post(doc: any = {}): Observable<any> {

    return this._toPromise(this.db.post(doc));

  }

  put(doc: any = {}) {

    return this._toPromise(this.db.put(doc));

  }

  _toPromise(promise): Observable<any> {

    return Observable.fromPromise(promise)
      .catch(err => {
        this._log.log(new LogEventError(err));
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
