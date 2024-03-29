/* tslint:disable: max-classes-per-file */
// Importables
import { Component } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Renderer } from '@angular/core';

// Components
import { AppConfig } from '../../config';
import { SideNav } from '../../frameworks';

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
export class ToolbarComponent implements AfterViewInit {

  public title: string = AppConfig.HTML5_TITLE; // TODO@sdoell: should be moved to service

  constructor(
    private _elRef: ElementRef,
    private _renderer: Renderer,
    private _sideNav: SideNav,
  ) { }

  public ngAfterViewInit() {
    // adjust next elements
    const el = this.contentElement(this._elRef);
    this._renderer.setElementStyle(el, 'position', 'relative');
    this._renderer.setElementStyle(el, 'top', `${this.height(this._elRef)}px`);
  }

  public toggleMenu(event: Event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    this._sideNav.toggle();
  }

  public get contentElement() {
    return (__: ElementRef) => __.nativeElement.nextElementSibling;
  }

  public get height() {
    return (__: ElementRef) => __.nativeElement.clientHeight;
  }

};
