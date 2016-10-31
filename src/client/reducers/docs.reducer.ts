// Importables
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

// Actions
import { DocsActions } from '../actions';

export interface IDocsState {
  loaded: boolean;
  loading: number;
  docs: Array<any>;
}

const init: IDocsState = {
  loaded: false,
  loading: 0,
  docs: [],
};

export default function (state = init, action: Action): IDocsState  {

  switch (action.type) {

    case DocsActions.LOAD: {
      return Object.assign({}, state, {
        loading: ++state.loading,
      });
    }

    case DocsActions.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        docs: action.payload,
        loading: --state.loading,
      });
    }

    default:
      return state;

  }

}

export function getDocs() {
  return (state$: Observable<IDocsState>) => state$
    .map(s => s.docs);
}

export function getDocsLoading() {
  return (state$: Observable<IDocsState>) => state$
    .map(s => s.loading);
}

export function getDocsLoaded() {
  return (state$: Observable<IDocsState>) => state$
    .map(s => s.loaded);
}
