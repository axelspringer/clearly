/* tslint:disable: max-classes-per-file */
// Importables
import { Component } from '@angular/core';
import { forwardRef } from '@angular/core';
import { Inject } from '@angular/core';
import { OnInit } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Renderer } from '@angular/core';

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
  styleUrls: ['./toolbar.component.scss'],
  templateUrl: './toolbar.component.html',
})
export class ToolbarComponent implements OnInit {

  public title: string = AppConfig.HTML5_TITLE; // TODO@sdoell: should be moved to service

  constructor(
    private _elRef: ElementRef,
    private _renderer: Renderer,
    @Inject(forwardRef(() => AppComponent)) private _app: AppComponent,
  ) { }

  public ngOnInit() {
    // adjust next elements
    const el = this.contentElement(this._elRef);
    const height = this.height(this._elRef);
    this._renderer.setElementStyle(el, 'position', 'relative');
    this._renderer.setElementStyle(el, 'top', `${height}px`);

    // EventEmitProvider
    //   .connect(new ToolbarTitleUpdate())
    //   .subscribe(value => this.title = value);
  }

  public toggleMenu() {
    this._app['menu'].toggle();
  }

  public get contentElement() {
    return (__: ElementRef) => __.nativeElement.nextElementSibling;
  }

  public get height() {
    return (__: ElementRef) => __.nativeElement.offsetHeight;
  }

};
