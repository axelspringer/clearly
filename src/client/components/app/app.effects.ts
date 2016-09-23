// Importables
import { Action } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { mergeEffects } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

// Components
import { DatabaseProvider } from '../../commons';

@Injectable()
export class AppEffects {

  private _db: DatabaseProvider;

  constructor(
    db: DatabaseProvider // have database connect
  ) {

    this._db = db;

  }

}

export default [
  AppEffects
];

