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
  private notify: NotifyProvider;

  private isDocsLoading$: Observable<any>;
  private isChannelsLoading$: Observable<any>;
  private isLoading$: Observable<any>;

  constructor(
    notify: NotifyProvider,
    private store: Store<AppState>
  ) {
    this.notify = notify;
    this.isDocsLoading$ = this.store.let(isDocsLoading());
    this.isChannelsLoading$ = this.store.let(isChannelsLoading());

    this.isLoading$ = Observable.combineLatest(
      this.isDocsLoading$,
      this.isChannelsLoading$,
      (s1, s2) => s1 + s2 > 0
    );

  }

  get events() {
    return this.notify.events;
  }

  clear() {
    this.notify.reset();
  }

  ngOnInit() {

    this.emitter$ = EventEmitProvider.connect(DatabaseProvider.name);
    this.emitter$.subscribe(this.subject$);
    this.loading$ = this.subject$.asObservable()
      .map(event => event.payload);

  }

  test() {

  }

};
