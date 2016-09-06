// User effects
import { Injectable } from '@angular/core';
import {
  Actions,
  Effect
} from '@ngrx/effects';
import { UserActions } from '../actions';

@Injectable()
export class UserEffects {

  @Effect() boot$ = this.actions$
    .ofType(UserActions.LOGIN)
    .distinctUntilChanged()
    .do(() => console.log('Updating user'));

  constructor(
    private actions$: Actions,
  ) { }

}
