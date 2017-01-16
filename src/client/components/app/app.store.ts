/* tslint:disable max-line-length */
// imports
import { combineReducers } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';
import { storeLogger } from 'ngrx-store-logger';
import { createSelector } from 'reselect';

// reducers
import { articleReducer } from '../+creator/article';
import appReducer from './app.reducer';
import * as fromAppReducer from './app.reducer';
import { creatorReducer } from '../+creator';
import { fromArticleReducer } from '../+creator';
import { fromCreatorReducer } from '../+creator';

// interface
import { ICreatorState } from '../+creator';

// app state
export interface IAppState {
  app: any;
  creator: ICreatorState;
  docs: any;
  article: any;
}

// metareducer
export default compose(storeLogger(), combineReducers)({
  app: appReducer,
  article: articleReducer,
  creator: creatorReducer,
})

// states
export const getAppState      = (state: IAppState) => state.app
export const getCreatorState  = (state: IAppState) => state.creator
export const getArticleState  = (state: IAppState) => state.article

// app selectors
export const getIsBooting     = createSelector(getAppState, fromAppReducer.isBooting)
export const getAppStatus     = createSelector(getAppState, fromAppReducer.getStatus)
export const getNotifications = createSelector(getAppState, fromAppReducer.getNotifications)

// creator selectors
export const getCreatorTypes  = createSelector(getCreatorState, fromCreatorReducer.getTypes)
export const getCreatorSelectedType = createSelector(getCreatorState, fromCreatorReducer.getSelectedType)
export const getCreatorSelected     = createSelector(getCreatorTypes, getCreatorSelectedType, (types, selectedType) => types[selectedType])

// article selectors
export const getArticleChannels   = createSelector(getArticleState, fromArticleReducer.getChannels)
export const getArticleChannel    = (channel) => createSelector(getArticleState, getArticleChannels, (channels) => channels[channel])
export const getArticleMaster     = createSelector(getArticleState, fromArticleReducer.getMaster)
export const getIsChannelsLoaded  = createSelector(getArticleState, fromArticleReducer.getArticleLoaded)
export const getIsChannelsLoading = createSelector(getArticleState, fromArticleReducer.getArticleLoading)
