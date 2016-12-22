/* tslint:disable max-line-length no-input-rename max-classes-per-file */
import { AsyncSubject } from 'rxjs';
import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { ElementRef } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Input } from '@angular/core';
import { Observable } from 'rxjs';
import { OnInit } from '@angular/core';
import { Output } from '@angular/core';
import { Renderer } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { trigger } from '@angular/core';
import { state } from '@angular/core';
import { transition } from '@angular/core';
import { animate } from '@angular/core';
import { style } from '@angular/core';
import * as _ from 'lodash';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'ui-sidenav',
  template: '<ng-content></ng-content>',
  animations: [
    trigger('menuState', [
      state('opened', style({
        transform: 'translate3d(0, 0, 0)',
      })),
      state('closed', style({
        transform: 'translate3d(-100%, 0, 0)',
      })),
      transition('opened => closed', animate('400ms ease-in-out')),
      transition('closed => opened', animate('400ms ease-in-out')),
    ]),
  ],
})
export class SideNavComponent implements OnInit {

  // Outputs

  @Output() public onOpen = new EventEmitter<boolean>();
  @Output() public onClose = new EventEmitter<boolean>();

  // Inputs

  @Input()
  public get opened(): boolean {
    return this._opened;
  }

  public set opened(isOpen: boolean) {
    this.toggle(isOpen);
  }

  // private

  private _opened: boolean = false;
  private _animationObservable: AsyncSubject<any> = null;
  private _classz = {
    'is-open': false,
    'is-close': true,
  };

  constructor(
    private _elRef: ElementRef,
    private _renderer: Renderer,
  ) {
  }

  // angular

  public ngOnInit() {
    this._updateClassz();
  }

  // public

  public toggle(isOpen: boolean = !this.opened): Observable<boolean> {

    this._opened = isOpen;

    this._toggleClassz();
    this._updateClassz();

    // this should be move to animation frame
    if (this._opened) {
      this.onOpen.emit(true);
    }

    if (!this._opened) {
      this.onClose.emit(false);
    }

    return this._toggleAnimationObservable();

  }

  // private

  private _toggleClassz() {
    this._classz['is-open'] = this._opened;
    this._classz['is-close'] = !this._opened;
  }

  private _updateClassz() {
    _.forOwn(this._classz, (state, classz) => {
      this._renderer.setElementClass(this._elRef.nativeElement, classz, state);
    });
  }

  private _toggleAnimationObservable() {
    this._animationObservable = new AsyncSubject();
    return this._animationObservable;
  }

}
