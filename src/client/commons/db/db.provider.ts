import { Observable } from 'rxjs';
// Importables
import {
  Inject,
  Injectable
} from '@angular/core';
import { Observer } from 'rxjs';
import { LogService } from '../log';
import { LogEventError } from '../log';
import { LogEventLog } from '../log';
import { LogEventInfo } from '../log';

export interface DatabaseProviderOptions {
  name: string;
};

export var DATABASE_PROVIDER_OPTIONS: DatabaseProviderOptions = {
  name: 'default'
};

@Injectable()
export class DatabaseProvider implements DatabaseProvider {

  private _options: DatabaseProviderOptions;
  private _logService: LogService;

  constructor(
    logService: LogService,
    @Inject(DATABASE_PROVIDER_OPTIONS) options: DatabaseProviderOptions
  ) {

    this._logService = logService;
    this._options = options;

  }

  open(name?: string, options?: Object) {

    return Observable.create((observer: Observer<any>) => {

      try {

        this._logService.log(new LogEventLog(`Initializing Database ...`));
        this._logService.log(new LogEventInfo(`Enabling PouchDB (*) debug mode ...`));

      } catch (dbError) {



      }

    });

  }

};


// open(name: string, options?: Object): Observable<any> {

//     return Observable.create((observer: Observer<any>) => {

//       try {

//         console.group(`Initializing Database ...`);

//         console.log(`Enabling PouchDB (*) debug mode ...`);
//         PouchDB.debug.enable('*');

//         // this is all really sync ...
//         const db = new PouchDB(name, options);


//         // this._db$ = db;

//         console.log(this._db);
//         observer.next(db);
//         observer.complete();
//         console.groupEnd();

//       } catch (err) {

//         observer.error(err);

//       }

//     });

//   }
