// Importables
import { ActionReducer } from '@ngrx/store';
import { combineReducers } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';
import { Observable } from 'rxjs/Observable';
import { storeLogger } from 'ngrx-store-logger';

// Reducers
import { creatorReducer } from '../+creator';
import { fromCreatorReducer } from '../+creator';
import { docsReducer } from '../../reducers';
import { fromDocsReducer } from '../../reducers';
import { editorReducer } from '../editor';
import { fromEditorReducer } from '../editor';

// app state
export interface AppState {
  creator: any;
  docs: any;
  editor: any;
};

// slices as interface
export {
}

// metareducers
export default compose(hmrState, storeLogger(), combineReducers)({
  creator: creatorReducer,
  docs: docsReducer,
  editor: editorReducer
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

export function getDocsState() {
  return (state$: Observable<AppState>) => state$
    .map(s => s.docs);
}

export function getEditorState() {
  return (state$: Observable<AppState>) => state$
    .map(s => s.editor);
}

// selectors
export function getCreatorItems() {
  return compose(fromCreatorReducer.getItems(), getCreatorState());
}

export function getEditorItems() {
  return compose(fromEditorReducer.getItems(), getEditorState());
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
