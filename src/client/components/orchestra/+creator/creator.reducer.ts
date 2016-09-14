// Importables
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

// Component
import { CreatorActions } from './creator.actions';
import { DFormElement } from '../../dform';

let init = [];

export default function (state = init, action: Action)  {

  switch (action.type) {

    case CreatorActions.ADD_ITEM: {
      return state.concat(action.payload);
    }

    case CreatorActions.RESET: {
      return init;
    }

    default:
      return state;

  }

}

export function getItems() {
  return (state$: Observable<any>) => state$;
}
