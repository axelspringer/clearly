// Importables
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

// Actions
import { ArticleActions } from './article.actions';

export interface IArticleState {
  loaded: boolean;
  loading: number;
  channels: any[];
  data: any[];
  form: any[];
}

const init: IArticleState = {
  loaded: false,
  loading: 0,
  channels: [],
  data: [],
  form: [],
};

export default function (state = init, action: Action): IArticleState  {

  switch (action.type) {

    case ArticleActions.UPDATE: {
      return Object.assign({}, state, action.payload);
    }

    case ArticleActions.RESET: {
      return Object.assign({}, init);
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

export function getData() {
  return (state$: Observable<IArticleState>) => state$
    .map(s => s.data);
}

export function getArticleLoading() {
  return (state$: Observable<IArticleState>) => state$
    .map(s => s.loading);
}

export function getArticleLoaded() {
  return (state$: Observable<IArticleState>) => state$
    .map(s => s.loaded);
}
