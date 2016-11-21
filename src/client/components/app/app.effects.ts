// Importables
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { Effect } from '@ngrx/effects';
import { Observable } from 'rxjs';

// Components
import { DatabaseProvider } from '../../core';
import { AppActions } from './app.actions';

@Injectable()
export class AppEffects {

  private _db: DatabaseProvider;

  @Effect() public loadArticle$: Observable<Action> = this.actions$
    .ofType(AppActions.BOOT)
    .switchMap(() => {
      return Observable.of(true)
        .map(() => {
          return {
            type: AppActions.BOOT_SUCCESS,
            payload: true
          }
        })
    })
    .catch(err => Observable.of({
      type: 'LOAD_FAILURE',
      paylod: err,
    }));

  constructor(
    private actions$: Actions,
    db: DatabaseProvider, // have database connect
  ) {
    this._db = db;
  }

}

export default [
  AppEffects,
];
