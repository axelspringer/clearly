// importables

import { BehaviorSubject } from 'rxjs';
import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { forwardRef } from '@angular/core';
import { getNotifications } from '../app';
import { Inject } from '@angular/core';
import { OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ViewEncapsulation } from '@angular/core';

// components

import { AppActions } from '../app';
import { IAppState } from '../app';

// interface

import { Notification } from './notifications.interface';
import { NOTIFICATION_TYPE } from './notifications.interface';

// component

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'sg-notifications',  // <sg-notifications></sg-notifications>
  styleUrls: ['./notifications.component.scss'],
  templateUrl: './notifications.component.html',
})
export class NotificationsComponent implements OnInit {

  // properties

  public unreadCount: BehaviorSubject<number> = new BehaviorSubject(0);

  public get notifications() {
    return this._store
      .let(getNotifications())
      .distinctUntilChanged()
      .do(notifications => this._updateStatus(notifications));
  }

  // constructor

  constructor(
    private _store: Store<IAppState>,
    @Inject(forwardRef(() => AppActions)) public _appActions: AppActions,
  ) {
  }

  // angular
  public ngOnInit(): void {
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

  // public

  public read(notification: Notification, idx: number): void {
    if (!notification.read) {
      this._store.dispatch(this._appActions.readNotification(idx));
    }
  }

  public removeAll(): void {
    this._store.dispatch(this._appActions.removeNotifications());
  }

  public notificationClassz(notification: Notification): string[] {
    return []
      .concat(NOTIFICATION_TYPE[notification.type]
      .toLowerCase(), notification.read ? 'read' : 'unread');
  }

  // private

  private _updateStatus(notifications): void {
    this.unreadCount.next(notifications.filter(notification => !notification.read).length);
  }

};
