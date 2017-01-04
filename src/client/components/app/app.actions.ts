/* tslint:disable max-classes-per-file */
// imports
import { Action } from '@ngrx/store';
import { Actions } from '@ngrx/effects';

// interfaces
import { ActionType } from './app.util';

// components
import { Notification } from '../notifications';

export const ActionTypes = {
  ADD_NOTIFICATIONS:    ActionType('[NOTIFICATIONS:ADD]'),
  READ_NOTIFICATION:    ActionType('[NOTIFICATION:READ]'),
  REMOVE_NOTIFICATIONS: ActionType('[NOTIFICATIONS:REMOVE]'),

  UPDATE_STATUS:        ActionType('[APP:UPDATE_STATUS]'),
  UPDATE_BOOTING:       ActionType('[APP:UPDATE_BOOTING]'),
};

export class AddNotifcationAction implements Action {
  public type = ActionTypes.ADD_NOTIFICATIONS;

  constructor(public payload: Notification[] | Notification) { }
}

export class RemoveNotificationAction implements Action {
  public type = ActionTypes.REMOVE_NOTIFICATIONS;
  public payload = null;
}

export class ReadNotificationAction implements Action {
  public type = ActionTypes.READ_NOTIFICATION;

  constructor(public payload: number) {}
}

export class HasBootedAction implements Action {
  public type = ActionTypes.UPDATE_BOOTING;
  public payload = false;
}

export type Actions
  = AddNotifcationAction
  | RemoveNotificationAction
  | ReadNotificationAction
  | HasBootedAction;
