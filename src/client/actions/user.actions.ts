// UserState actions
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { UserState } from '../reducers';

@Injectable()
export class UserActions {

  static UPDATE    = '[USER] Updating the user';
  static LOGIN     = '[USER] Login the user';

  updateUser(newState: UserState): Action {
    return {
      type: UserActions.UPDATE,
      payload: newState
    };
  }

}
