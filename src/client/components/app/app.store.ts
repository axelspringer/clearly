// Importables
import { ActionReducer } from '@ngrx/store';
import { combineReducers } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';
import { Observable } from 'rxjs/Observable';
import { storeLogger } from 'ngrx-store-logger';

// Reducers
import creatorReducer, * as fromCreator from '../orchestra/+creator';
import orchestraReducer, * as fromOrchestra from '../orchestra';
import { docsReducer } from '../../reducers';
import { fromDocsReducer } from '../../reducers';

// app state
export interface AppState {
  creator: any;
  docs: any;
  orchestra: fromOrchestra.OrchestraState;
};

// slices as interface
export {
}

// metareducers
export default compose(hmrState, storeLogger(), combineReducers)({
  creator: creatorReducer,
  docs: docsReducer,
  orchestra: orchestraReducer,
});

// hmr
export function hmrState(reducer: ActionReducer<any>): ActionReducer<any> {
  const ACTION = 'RESET_STATE';
  return function (state, action) {
    if (action.type === ACTION) {
      console.log(action.payload);
      return action.payload;
    }
    return reducer(state, action);
  };
}

// slices
export function getCreatorState() {
  return (state$: Observable<AppState>) => state$
    .map(s => s.creator);
}

export function getOrchestraState() {
  return (state$: Observable<AppState>) => state$
    .map(s => s.orchestra);
}

export function getDocsState() {
  return (state$: Observable<AppState>) => state$
    .map(s => s.docs);
}

// selectors
export function getCreatorItems() {
  return compose(fromCreator.getItems(), getCreatorState());
}

export function getDocs() {
  return compose(fromDocsReducer.getDocs(), getDocsState());
}

export function isDocsLoading() {
  return compose(fromDocsReducer.getDocsLoading(), getDocsState());
}

export function isDocsLoaded() {
  return compose(fromDocsReducer.getDocsLoaded(), getDocsState());
}
