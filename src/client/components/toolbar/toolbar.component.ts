// Importables
import { Component } from '@angular/core';
import { forwardRef } from '@angular/core';
import { Inject } from '@angular/core';
import { Injectable } from '@angular/core';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';

// Components
import { App } from '../app';
import { AppConfig } from '../../config';
import { Event } from '../../commons';
import { EventEmitterProvider } from '../../commons';
import { NotifyProvider } from './../../commons';

// Interface
export class ToolbarTitleUpdate extends Event {

  constructor(payload: any = {}) {

    super(payload);

  }

}

@Component({
  selector: 'toolbar',  // <toolbar></toolbar>
  providers: [],
  styleUrls: ['./toolbar.style.scss'],
  templateUrl: './toolbar.component.html'
})
export class Toolbar implements OnInit {

  private version$: string = AppConfig.VERSION;
  private title$: string = AppConfig.HTML5_TITLE; // TODO@sdoell: should be moved to service

  private _appRef: App;
  private _notify: NotifyProvider;
  private notify$: Observable<any>;
  private load$: Observable<Boolean>;

  constructor(
    @Inject(forwardRef(() => App)) app: App,
    notify: NotifyProvider
  ) {

    this._appRef = app;
    this._notify = notify;
    this.notify$ = this._notify.subscribe();
    this.load$ = Observable.of(true);

  }

  toggleMenu() {

    this._appRef.menu.toggle();

  }

  ngOnInit() {

    EventEmitterProvider.create(new ToolbarTitleUpdate()).subscribe(value => this.title$ = value);

  }

};
