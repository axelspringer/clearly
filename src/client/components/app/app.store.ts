// Importables
import { ActionReducer } from '@ngrx/store';
import { combineReducers } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';
import { Observable } from 'rxjs/Observable';
import { storeLogger } from 'ngrx-store-logger';

// Reducers
import { articleReducer } from '../+creator/article';
import appReducer from './app.reducer';
import * as fromAppReducer from './app.reducer';
import { creatorReducer } from '../+creator';
import { docsReducer } from '../../reducers';
import { fromArticleReducer } from '../+creator/article';
import { fromCreatorReducer } from '../+creator';
import { fromDocsReducer } from '../../reducers';

// app state
export interface IAppState {
  app: any;
  creator: any;
  docs: any;
  article: any;
};

// slices as interface
export {
}

// metareducers
export default compose(hmrState, storeLogger(), combineReducers)({
  app: appReducer,
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
export function getAppState() {
  return (state$: Observable<IAppState>) => state$
    .map(s => s.app);
}

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

export function isBooting() {
  return compose(fromAppReducer.getAppBooting(), getAppState());
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
