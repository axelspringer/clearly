/* tslint:disable: max-line-length max-classes-per-file */
// Importables
import { ChangeDetectionStrategy } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { Component } from '@angular/core';
import { forwardRef } from '@angular/core';
import { getNotifications } from '../app';
import { Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';

// components
import { IAppState } from '../app';
import { AppActions } from '../app';

// interface

export enum NOTIFICATION_TYPE {
  INFO,
  WARN,
  ERROR,
};

export interface INotification {
  read: boolean;
  subject: string;
  message: string;
  type: NOTIFICATION_TYPE;
};

export type Notification = INotification;

// component

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'sg-notifications',  // <sg-notifications></sg-notifications>
  styleUrls: ['./notifications.component.scss'],
  templateUrl: './notifications.component.html',
})
export class NotificationsComponent {

  public unreadCount: BehaviorSubject<number> = new BehaviorSubject(0);

  // instance

  private _icon: string = 'fa-bell-o';

  // properties

  public get notifications() {
    return this._store
      .let(getNotifications())
      .distinctUntilChanged()
      .do(notifications => this._updateStatus(notifications));
  }

  public get icon() {
    return this._icon;
  }

  // constructor

  constructor(
    private _store: Store<IAppState>,
    @Inject(forwardRef(() => AppActions)) public _appActions: AppActions,
  ) {
    // demo
    this._store.dispatch(this._appActions.addNotifications([
      {
        read: false,
        subject: 'test',
        message: 'test',
        type: NOTIFICATION_TYPE.INFO,
      },
    ]));
    this._store.dispatch(this._appActions.addNotifications([
      {
        read: false,
        subject: 'test',
        message: 'test',
        type: NOTIFICATION_TYPE.WARN,
      },
    ]));
    this._store.dispatch(this._appActions.addNotifications([
      {
        read: false,
        subject: 'test',
        message: 'test',
        type: NOTIFICATION_TYPE.ERROR,
      },
    ]));
  }

  // angular

  // public

  public read(notification: Notification, idx: number) {
    if (!notification.read) {
      this._store.dispatch(this._appActions.readNotification(idx));
    }
  }

  public removeAll() {
    this._store.dispatch(this._appActions.removeNotifications());
  }

  public notificationClassz(notification: Notification) {
    return [].concat(NOTIFICATION_TYPE[notification.type].toLowerCase(), notification.read ? 'read' : 'unread');
  }

  // private

  private _updateStatus(notifications) {
    this.unreadCount.next(notifications.filter(notification => !notification.read).length);
  }

};
