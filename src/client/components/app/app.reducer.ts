// Importables
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppActions } from './app.actions';

export interface IAppState {
  isBooting: boolean;
}

const init = {
  isBooting: true,
};

export default function (state = init, action: Action)  {

  switch (action.type) {

    case AppActions.BOOT: {
      return Object.assign({}, state, {
        isBooting: true,
      });
    }

    case AppActions.BOOT_SUCCESS: {
      return Object.assign({}, state, {
        isBooting: false,
      })
    }

    default:
      return state;

  }

}

export function getAppBooting() {
  return (state$: Observable<IAppState>) => state$
    .map(s => s.isBooting);
}
