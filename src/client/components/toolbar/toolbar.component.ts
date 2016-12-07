/* tslint:disable: max-classes-per-file */
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

// Interface
export class ToolbarTitleUpdate extends Event {
  constructor(payload: any = {}) {
    super(payload);
  }
}

@Component({
  selector: 'sg-toolbar',  // <sg-toolbar></sg-toolbar>
  styleUrls: ['./toolbar.style.scss'],
  templateUrl: './toolbar.component.html',
})
export class ToolbarComponent implements OnInit {

  public title: string = AppConfig.HTML5_TITLE; // TODO@sdoell: should be moved to service

  constructor(
    @Inject(forwardRef(() => AppComponent)) private _app: AppComponent,
  ) { }

  public ngOnInit() {
    console.log(this._app);
    // EventEmitProvider
    //   .connect(new ToolbarTitleUpdate())
    //   .subscribe(value => this.title = value);
  }

  public toggleMenu() {
    this._app['menu'].toggle();
  }

};
