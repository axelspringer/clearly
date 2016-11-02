// Importables
import { Component } from '@angular/core';
import { forwardRef } from '@angular/core';
import { Inject } from '@angular/core';
import { OnInit } from '@angular/core';

// Components
import { AppComponent } from '../app';
import { AppConfig } from '../../config';
import { Event } from '../../core';
import { EventEmitProvider } from '../../core';
import { NotifyProvider } from './../../core';

// Interface
export class ToolbarTitleUpdate extends Event {

  constructor(payload: any = {}) {
    super(payload);
  }

}

@Component({
  selector: 'sg-toolbar',  // <sg-toolbar></sg-toolbar>
  providers: [],
  styleUrls: ['./toolbar.style.scss'],
  templateUrl: './toolbar.component.html',
})
export class ToolbarComponent implements OnInit {

  private title$: string = AppConfig.HTML5_TITLE; // TODO@sdoell: should be moved to service

  private _appRef: AppComponent;

  constructor(
    @Inject(forwardRef(() => AppComponent)) public app: AppComponent,
    notify: NotifyProvider,
  ) {
    this._appRef = app;
  }

  public toggleMenu() {
    this._appRef['menu'].toggle();
  }

  public ngOnInit() {
    EventEmitProvider.connect(new ToolbarTitleUpdate()).subscribe(value => this.title$ = value);
  }

};
