// Importables
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

// Components
import { AppActions } from './app.actions';
import { StatusComponentType } from '../status';
import { Notification } from '../notifications';

export interface IAppState {
  status: StatusComponentType;
  notifications: Notification[];
}

const init = {
  status: StatusComponentType.IDLE,
  notifications: [],
};

export default function (state = init, action: Action)  {

  switch (action.type) {

    case AppActions.ADD_NOTIFICATION: {
      return Object.assign({}, state, {
        notifications: [].concat(state.notifications, action.payload)
      });
    }

    case AppActions.UPDATE_STATUS: {
      return Object.assign({}, state, {
        status: action.payload,
      });
    }

    default:
      return state;

  }

}

export function getStatus() {
  return (state$: Observable<IAppState>) => state$
    .map(s => s.status);
}

export function getNotifications() {
  return (state$: Observable<IAppState>) => state$
    .map(s => s.notifications);
}
