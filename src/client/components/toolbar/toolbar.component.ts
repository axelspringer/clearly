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
import { EventEmitProvider } from '../../commons';
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

  constructor(
    @Inject(forwardRef(() => App)) app: App,
    notify: NotifyProvider
  ) {
    this._appRef = app;
  }

  toggleMenu() {
    this._appRef.menu.toggle();
  }

  ngOnInit() {
    EventEmitProvider.connect(new ToolbarTitleUpdate()).subscribe(value => this.title$ = value);
  }

};
