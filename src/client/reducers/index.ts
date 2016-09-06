// combineReducers
import '@ngrx/core/add/operator/select';
import { Observable } from 'rxjs/Observable';
import { UserState } from './user.reducer';

// ngrx tools
import { compose } from '@ngrx/core/compose'; // reducer function
import { storeLogger } from 'ngrx-store-logger'; // log operations
import { combineReducers } from '@ngrx/store'; // combine multiple reducers

// reducers
import userReducer, * as fromUser from './user.reducer';

// app state
export interface AppState {
  user: fromUser.UserState; // slice
};

// slices as interface
export {
  UserState
}

// metareducers
export default compose(storeLogger(), combineReducers)({
  user: userReducer
});

// selectors
export function getState(state: string) {
  return (state$: Observable<AppState>) => state$
    .select(s => s[state]);
}

export function getUserState() {
  return getState('user');
}

// child selectors
export function getUser() {
  return compose(fromUser.getUser(), getUserState());
}
