// Importables
import { Observable } from 'rxjs/Observable';

// Components
import * as fromAppActions from './app.actions';
import { StatusComponentType } from '../status';
import { Notification } from '../notifications';

export interface IAppState {
  isBooting: boolean;
  status: StatusComponentType;
  notifications: Notification[];
}

const init = {
  isBooting: true,
  status: StatusComponentType.IDLE,
  notifications: [],
};

export default function (state = init, action: fromAppActions.Actions): IAppState  {

  switch (action.type) {

    case fromAppActions.ActionTypes.UPDATE_BOOTING: {
      return { ...state, isBooting: action.payload }
    }

    case fromAppActions.ActionTypes.ADD_NOTIFICATIONS: {
      return { ...state, notifications: [].concat(state.notifications, action.payload) };
    }

    case fromAppActions.ActionTypes.READ_NOTIFICATION: {
      state.notifications[action.payload].read = true;
      return { ...state };
    }

    case fromAppActions.ActionTypes.REMOVE_NOTIFICATIONS: {
      return { ...state, notifications: [] };
    }

    case fromAppActions.ActionTypes.UPDATE_STATUS: {
      return { ...state, status: action.payload };
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

export function isBooting() {
  return (state$: Observable<IAppState>) => state$
    .map(s => s.isBooting);
}
