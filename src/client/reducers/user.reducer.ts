import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { UserActions } from '../actions';

// definition of the state
export interface UserState {
  userId: string;
};

const initialState: UserState = {
  userId: ''
};

export default function (state = initialState, action: Action): UserState {

  switch (action.type) {

    case UserActions.UPDATE: {
      return Object.assign({}, action.payload);
    }

    default:
      return state;

  }

}

export function getUser() {
  return (state$: Observable<UserState>) => state$;
}
