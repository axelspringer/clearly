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
import { fromArticleReducer } from '../+creator/article';
import { articleReducer } from '../+creator/article';
import { fromDocsReducer } from '../../reducers';

// app state
export interface IAppState {
  creator: any;
  docs: any;
  article: any;
};

// slices as interface
export {
}

// metareducers
export default compose(hmrState, storeLogger(), combineReducers)({
  creator: creatorReducer,
  docs: docsReducer,
  article: articleReducer,
});

// hmr
export function hmrState(reducer: ActionReducer<any>): ActionReducer<any> {
  const ACTION = 'RESET_STATE';
  return function (state, action) {
    if (action.type === ACTION) {
      return action.payload;
    }
    return reducer(state, action);
  };
}

// slices
export function getCreatorState() {
  return (state$: Observable<IAppState>) => state$
    .map(s => s.creator);
}

export function getDocsState() {
  return (state$: Observable<IAppState>) => state$
    .map(s => s.docs);
}

export function getArticleState() {
  return (state$: Observable<IAppState>) => state$
    .map(s => s.article);
}

// selectors
export function getCreatorItems() {
  return compose(fromCreatorReducer.getItems(), getCreatorState());
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

export function getChannels() {
  return compose(fromArticleReducer.getChannels(), getArticleState());
}

export function isChannelsLoaded() {
  return compose(fromArticleReducer.getArticleLoaded(), getArticleState());
}

export function isChannelsLoading() {
  return compose(fromArticleReducer.getArticleLoading(), getArticleState());
}
