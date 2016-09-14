// Importables
import { Observable } from 'rxjs/Observable';
import { compose } from '@ngrx/core/compose'; // reducer function
import { storeLogger } from 'ngrx-store-logger'; // log operations
import {
  ActionReducer,
  combineReducers
 } from '@ngrx/store'; // combine multiple reducers

// Reducers
import creatorReducer, * as fromCreator from '../orchestra/+creator';
import orchestraReducer, * as fromOrchestra from '../orchestra';

// app state
export interface AppState {
  creator: any;
  orchestra: fromOrchestra.OrchestraState;
};

// slices as interface
export {
}

// metareducers
export default compose(hmrState, storeLogger(), combineReducers)({
  creator: creatorReducer,
  orchestra: orchestraReducer
});

// hmr
export function hmrState(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state, action) {
    if (action.type === 'RESET_STATE') {
      console.log(action.payload);
      return action.payload;
    }
    return reducer(state, action);
  }
}

// selectors
export function getCreatorState() {
  return (state$: Observable<AppState>) => state$
    .select(s => s.creator);
}

export function getOrchestraState() {
  return (state$: Observable<AppState>) => state$
    .select(s => s.orchestra);
}

export function getCreatorItems() {
  return compose(fromCreator.getItems(), getCreatorState());
}

export function getDoc() {
  return compose(fromOrchestra.getDoc(), getOrchestraState());
}
