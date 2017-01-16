// interface
import { IArticleState } from './article.interface';
import * as fromArticleActions from './article.actions';

const init: IArticleState = {
  loaded: false,
  loading: 0,
  channels: [],
  master: [],
};

export default function (state = init, action: fromArticleActions.Actions): IArticleState  {

  switch (action.type) {

    case fromArticleActions.ActionTypes.UPDATE: {
      return { ...state, ...action.payload };
    }

    case fromArticleActions.ActionTypes.RESET: {
      return { ...init };
    }

    default:
      return state;

  }

}

// slices
export const getChannels    = (state: IArticleState) => state.channels;
export const getMaster      = (state: IArticleState) => state.master;
export const getArticleLoaded   = (state: IArticleState) => state.loaded;
export const getArticleLoading  = (state: IArticleState) => state.loading;
