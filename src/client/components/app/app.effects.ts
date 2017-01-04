// Importables
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { Effect } from '@ngrx/effects';
import { Observable } from 'rxjs';

// Components
import * as fromAppActions from './app.actions';
import { fromCreatorActions } from '../+creator';
import { StatusComponentType } from '../status';

const LOAD_ACTIONS = [
  fromCreatorActions.ActionTypes.LOAD,
];

const IDLE_ACTIONS = [
  fromCreatorActions.ActionTypes.LOAD_SUCCESS,
];

@Injectable()
export class AppEffects {

  @Effect() public setStatusLoad$: Observable<Action> = this._actions
    .ofType(...LOAD_ACTIONS)
    .map(() => ({
      type: fromAppActions.ActionTypes.UPDATE_STATUS,
      payload: StatusComponentType.LOADING,
    }));

  @Effect() public setStatusIdle$: Observable<Action> = this._actions
    .ofType(...IDLE_ACTIONS)
    .map(() => ({
      type: fromAppActions.ActionTypes.UPDATE_STATUS,
      payload: StatusComponentType.IDLE,
    }));

  constructor(
    private _actions: Actions,
  ) {
  }

}
