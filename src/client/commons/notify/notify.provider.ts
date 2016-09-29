// Importables
import { Injectable } from '@angular/core';
import { Inject } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Subject, ReplaySubject } from 'rxjs';

// Components
import { EventEmitProvider } from '../events';
import { Event } from '../events';
import { Observable } from 'rxjs/Rx';

// Interfaces
export interface NotifyProviderOptions {
};

export class NotifyEvent extends Event {

  private _read: boolean = false;

  constructor(title?: string, message?: string) {
    super({ title, message });
  }

  read() {
    return this._read = true;
  }

  unread() {
    return this._read = false;
  }

}

// put here to avoid side-effects
export var NOTIFY_PROVIDER_OPTIONS: NotifyProviderOptions = {
};


@Injectable()
export class NotifyProvider {

  private _emitter$: EventEmitter<any>;
  private _replay$: ReplaySubject<any>;
  private _events: Array<any> = [];

  constructor() {

    this._emitter$ = EventEmitProvider.connect(new NotifyEvent());
    this._replay$ = new ReplaySubject();

    this._emitter$
      // .distinctUntilChanged()
      .do(event => this._events.push(event))
      .subscribe(this._replay$);

  }

  get events() {
    return this._events;
  }

  reset(events: Array<any> = []) {
    return this._events = [];
  }

  subscribe(): Observable<NotifyEvent> {
    return this._replay$.asObservable();
  }

};


export var NOTIFY_PROVIDERS = [
  {
    provide: NOTIFY_PROVIDER_OPTIONS,
    useValue: NOTIFY_PROVIDER_OPTIONS
  },
  {
    provide: NotifyProvider,
    useClass: NotifyProvider
  }
];
