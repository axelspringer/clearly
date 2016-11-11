// Importables
import { Injectable } from '@angular/core';

// Components
import { DatabaseProvider } from '../../core';

@Injectable()
export class AppEffects {

  private _db: DatabaseProvider;

  constructor(
    db: DatabaseProvider, // have database connect
  ) {
    this._db = db;
  }

}

export default [
  AppEffects,
];
