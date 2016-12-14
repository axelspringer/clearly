// Importables
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

// components
import { Notification } from '../notifications';

@Injectable()
export class AppActions {

  // definitions

  public static ADD_NOTIFICATIONS    = '[NOTIFICATIONS:ADD]';
  public static READ_NOTIFICATION    = '[NOTIFICATION:READ]';
  public static REMOVE_NOTIFICATIONS  = '[NOTIFICATIONS:REMOVE]';

  public static UPDATE_STATUS    = '[APP:UPDATE_STATUS]';

  // actions

  public addNotifications(notifications: Notification[] | Notification): Action {
    return {
      type: AppActions.ADD_NOTIFICATIONS,
      payload: notifications,
    };
  }

  public removeNotifications(): Action {
    return {
      type: AppActions.REMOVE_NOTIFICATIONS,
    };
  }

  public readNotification(idx: number): Action {
    return {
      type: AppActions.READ_NOTIFICATION,
      payload: idx,
    };
  }

}
