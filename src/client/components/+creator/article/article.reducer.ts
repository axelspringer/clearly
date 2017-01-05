/* tslint:disable object-literal-key-quotes */
// Importables
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

// Actions
import { ArticleActions } from './article.actions';

export interface IArticleState {
  loaded: boolean;
  loading: number;
  channels: any[];
  master: any[];
}

const init: IArticleState = {
  loaded: false,
  loading: 0,
  channels: [],
  master: [],
};

export default function (state = init, action: Action): IArticleState  {

  switch (action.type) {

    case ArticleActions.UPDATE: {
      return { ...state, ...action.payload };
    }

    case ArticleActions.RESET: {
      return { ...init };
    }

    default:
      return state;

  }

}

export function getChannels() {
  return (state$: Observable<IArticleState>) => state$
    .map(s => s.channels);
}

export function getChannel(channel: number) {
  return (state$: Observable<IArticleState>) => state$
    .map(s => s.channels[channel]);
}

export function getMaster() {
  return (state$: Observable<IArticleState>) => state$
    .map(s => s.master);
}

export function getArticleLoading() {
  return (state$: Observable<IArticleState>) => state$
    .map(s => s.loading);
}

export function getArticleLoaded() {
  return (state$: Observable<IArticleState>) => state$
    .map(s => s.loaded);
}
