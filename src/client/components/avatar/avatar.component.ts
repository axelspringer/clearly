// Impotables
import { Observable } from 'rxjs';
import { Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { Component } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

// Components
import { NotifyProvider } from '../../commons';
import { AppConfig } from '../../config';
import { EventEmitterProvider } from '../../commons';
import { App } from '../app';

import { Event } from '../../commons';

// Interfaces
export class AvatarSpinnerEvent extends Event {

  constructor(show?: boolean) {
    super({ show });
  }

}

@Component({
  selector: 'avatar',  // <menu></menu>
  providers: [],
  styleUrls: ['./avatar.style.scss'],
  templateUrl: './avatar.component.html'
})
export class Avatar implements OnInit {

  public loading$: Observable<boolean>;

  private _emitter$: EventEmitter<any>;
  private _subject$: Subject<any> = new Subject();
  private _notify: NotifyProvider;

  constructor(
    notify: NotifyProvider
  ) {
    this._notify = notify;
  }

  get events() {
    return this._notify.events;
  }

  clear() {
    this._notify.reset();
  }

  ngOnInit() {
    this._emitter$ = EventEmitterProvider.subscribe(new AvatarSpinnerEvent());
    this._emitter$.subscribe(this._subject$);

    this.loading$ = this._subject$.asObservable().map(event => event.payload.show);

  }

};
