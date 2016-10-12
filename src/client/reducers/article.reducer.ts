// Importables
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

// Actions
import { ArticleActions } from '../actions';

export interface ArticleState {
  loaded: boolean;
  loading: number;
  channels: Array<any>;
}

const init: ArticleState = {
  loaded: false,
  loading: 0,
  channels: []
};

export default function (state = init, action: Action): ArticleState  {

  switch (action.type) {

    case ArticleActions.LOAD: {
      return Object.assign({}, state, {
        loading: ++state.loading
      });
    }

    case ArticleActions.LOAD_SUCCESS: {
      return Object.assign({}, state, action.payload, {
        loading: --state.loading
      });
    }

    case ArticleActions.UPDATE: {
      return Object.assign({}, state, action.payload);
    }


    case ArticleActions.CHANNELS_UPDATE: {
      return Object.assign({}, state, {
        channels: action.payload
      });
    }

    default:
      return state;

  }

}

export function getChannels() {
  return (state$: Observable<ArticleState>) => state$
    .map(s => s.channels);
}

export function getArticleLoading() {
  return (state$: Observable<ArticleState>) => state$
    .map(s => s.loading);
}

export function getArticleLoaded() {
  return (state$: Observable<ArticleState>) => state$
    .map(s => s.loaded);
}
