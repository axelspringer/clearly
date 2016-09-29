// Importables
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

// Actions
import { DocsActions } from '../actions';

export interface DocsState {
  loaded: boolean;
  loading: boolean;
  docs: Array<any>;
}

const init: DocsState = {
  loaded: false,
  loading: false,
  docs: []
};

export default function (state = init, action: Action): DocsState  {

  switch (action.type) {

    case DocsActions.LOAD: {
      return Object.assign({}, state, {
        loading: true
      });
    }

    case DocsActions.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        docs: action.payload,
        loading: false
      });
    }

    default:
      return state;

  }

}

export function getDocs() {
  return (state$: Observable<DocsState>) => state$
    .map(s => s.docs);
}
