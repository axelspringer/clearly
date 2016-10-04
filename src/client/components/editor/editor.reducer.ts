// Importables
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

// Component
import { EditorActions } from './editor.actions';

const init = [];

export default function (state = init, action: Action)  {

  switch (action.type) {

    case EditorActions.ADD_ITEM: {
      return state.concat(action.payload);
    }

    case EditorActions.REMOVE_ITEM: {
      state.splice(action.payload, 1); // remove item from store
      return state;
    }

    case EditorActions.RESET: {
      return init;
    }

    default:
      return state;

  }

}

export function getItems() {
  return (state$: Observable<any>) => state$
    .map(s => s);
}
