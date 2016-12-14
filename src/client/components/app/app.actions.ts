// Importables
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

// components
import { Notification } from '../notifications';

@Injectable()
export class AppActions {

  // definitions

  public static ADD_NOTIFICATION = '[NOTIFICATIONS:ADD]';

  public static UPDATE_STATUS    = '[APP:UPDATE_STATUS]';

  // actions

  public addNotifications(notifications: Notification[] | Notification): Action {
    return {
      type: AppActions.ADD_NOTIFICATION,
      payload: notifications,
    };
  }

}
