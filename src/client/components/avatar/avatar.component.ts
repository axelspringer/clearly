// Impotables
import { Observable } from 'rxjs';
import { Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { Component } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../app';
import { isDocsLoading } from '../app';

// Components
import { NotifyProvider } from '../../core';
import { AppConfig } from '../../config';
import { EventEmitProvider } from '../../core';
import { App } from '../app';
import { DatabaseProvider } from '../../core';

@Component({
  selector: 'avatar',  // <menu></menu>
  providers: [],
  styleUrls: ['./avatar.style.scss'],
  templateUrl: './avatar.component.html'
})
export class Avatar implements OnInit {

  public loading$: Observable<any>;

  private _emitter$: EventEmitter<any>;
  private _subject$: Subject<any> = new Subject();
  private _notify: NotifyProvider;

  private _isLoading: true;
  private isLoading$: Observable<any>;

  constructor(
    notify: NotifyProvider,
    private store: Store<AppState>
  ) {
    this._notify = notify;
    this.isLoading$ = this.store.let(isDocsLoading());
  }

  get events() {
    return this._notify.events;
  }

  clear() {
    this._notify.reset();
  }

  ngOnInit() {
    this._emitter$ = EventEmitProvider.connect(DatabaseProvider.name);
    this._emitter$.subscribe(this._subject$);
    this.loading$ = this._subject$.asObservable()
      .map(event => event.payload);
  }

  test() {

  }

};
