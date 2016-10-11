// Impotables
import { Observable } from 'rxjs';
import { Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { Component } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';

// Components
import { App } from '../app';
import { AppConfig } from '../../config';
import { AppState } from '../app';
import { DatabaseProvider } from '../../core';
import { EventEmitProvider } from '../../core';
import { isDocsLoading } from '../app';
import { NotifyProvider } from '../../core';
import { isChannelsLoading } from '../app';

@Component({
  selector: 'avatar',  // <avatar></avatar>
  providers: [],
  styleUrls: [
    './avatar.component.scss'
  ],
  templateUrl: './avatar.component.html'
})
export class Avatar implements OnInit {

  public loading$: Observable<any>;

  private emitter$: EventEmitter<any>;
  private subject$: Subject<any> = new Subject();

  private isDocsLoading$: Observable<any>;
  private isChannelsLoading$: Observable<any>;
  private isLoading$: Observable<any>;

  constructor(
    private notify: NotifyProvider,
    private store: Store<AppState>
  ) {
    this.isDocsLoading$ = this.store.let(isDocsLoading());
    this.isChannelsLoading$ = this.store.let(isChannelsLoading());

    this.isLoading$ = Observable
      .zip(
        this.isDocsLoading$,
        this.isChannelsLoading$
      )
      .map(state => state.reduce((cur, prev) => cur + prev));

  }

  get events() {
    return this.notify.events;
  }

  clear() {
    this.notify.reset();
  }

  ngOnInit() {
    this.emitter$ = EventEmitProvider.connect(DatabaseProvider.name); // could be better
    this.emitter$.subscribe(this.subject$);
    this.loading$ = this.subject$.asObservable()
      .map(event => event.payload);
  }

};
