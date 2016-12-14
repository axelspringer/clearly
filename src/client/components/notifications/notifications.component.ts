/* tslint:disable: max-line-length max-classes-per-file */
// Importables
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getNotifications } from '../app';
import { Inject } from '@angular/core';
import { forwardRef } from '@angular/core';

// components
import { IAppState } from '../app';
import { AppActions } from '../app';

// interface

export enum NOTIFICATION_TYPE {
  INFO,
  WARN,
  ERROR,
}

export interface INotification {
  read: false,
  subject: string;
  message: string;
  type: NOTIFICATION_TYPE;
}

export type Notification = INotification;

// component

@Component({
  selector: 'sg-notifications',  // <sg-notifications></sg-notifications>
  styleUrls: ['./notifications.component.scss'],
  templateUrl: './notifications.component.html',
})
export class NotificationsComponent {

  // instance

  private _icon: string = 'fa-bell-o';

  // properties

  public get notifications() {
    return this._store.let(getNotifications());
  }

  public get icon() {
    return this._icon;
  }

  // constructor

  constructor(
    private _store: Store<IAppState>,
    @Inject(forwardRef(() => AppActions)) public _appActions: AppActions,
  ) {
    this._store.dispatch(this._appActions.addNotifications([
      {
        read: false,
        subject: 'test',
        message: 'test',
        type: NOTIFICATION_TYPE.INFO,
      },
    ]));
  }

  // public

  public read(notification: Notification, idx: number) {
    if (!notification.read) {
      this._store.dispatch(this._appActions.readNotification(idx));
    }
  }

  public removeAll() {
    this._store.dispatch(this._appActions.removeNotifications());
  }

  public classz(notification: Notification) {
    return [].concat(NOTIFICATION_TYPE[notification.type].toLowerCase(), notification.read ? 'read': 'unread');
  }

  // angular

};
