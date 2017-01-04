// imports
import { combineReducers } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';
import { Observable } from 'rxjs/Observable';
import { storeLogger } from 'ngrx-store-logger';
import { createSelector } from 'reselect';

// reducers
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

// metareducers
export default compose(storeLogger(), combineReducers)({
  app: appReducer,
  article: articleReducer,
  creator: creatorReducer,
  docs: docsReducer,
});

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

export const getAppState = (state: IAppState) => state.app;

// selectors
export const getIsBooting = createSelector(getAppState, fromAppReducer.isBooting);
export const getAppStatus = createSelector(getAppState, fromAppReducer.getStatus);
export const getNotifications = createSelector(getAppState, fromAppReducer.getNotifications);

export function getCreatorSelectedType() {
  return compose(fromCreatorReducer.getSelectedType(), getCreatorState());
}

export function getCreatorTypes() {
  return compose(fromCreatorReducer.getTypes(), getCreatorState());
}

export function getCreatorType(id: number) {
  return compose(fromCreatorReducer.getType(id), getCreatorState());
}

export function getArticleChannels() {
  return compose(fromArticleReducer.getChannels(), getArticleState());
}

export function getArticleMaster() {
  return compose(fromArticleReducer.getMaster(), getArticleState());
}

export function getArticleChannel(channel: number) {
  return compose(fromArticleReducer.getChannel(channel), getArticleState());
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

export function isChannelsLoaded() {
  return compose(fromArticleReducer.getArticleLoaded(), getArticleState());
}

export function isChannelsLoading() {
  return compose(fromArticleReducer.getArticleLoading(), getArticleState());
}
