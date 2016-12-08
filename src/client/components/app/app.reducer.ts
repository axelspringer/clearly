// Importables
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

// Components
import { AppActions } from './app.actions';
import { StatusComponentType } from '../status';

export interface IAppState {
  isBooting: boolean;
  status: StatusComponentType;
}

const init = {
  isBooting: true,
  status: StatusComponentType.IDLE,
};

export default function (state = init, action: Action)  {

  switch (action.type) {

    case AppActions.UPDATE_STATUS: {
      return Object.assign({}, state, {
        status: action.payload,
      });
    }

    case AppActions.BOOT: {
      return Object.assign({}, state, {
        isBooting: true,
      });
    }

    case AppActions.BOOT_SUCCESS: {
      return Object.assign({}, state, {
        isBooting: false,
      });
    }

    default:
      return state;

  }

}

export function getAppBooting() {
  return (state$: Observable<IAppState>) => state$
    .map(s => s.isBooting);
}

export function getStatus() {
  return (state$: Observable<IAppState>) => state$
    .map(s => s.status);
}
