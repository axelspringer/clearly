/* tslint:disable no-input-rename max-classes-per-file */
import { Component } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Renderer } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { Output } from '@angular/core';
import { Input } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { AsyncSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { OnInit } from '@angular/core';
import * as _ from 'lodash';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'ui-sidenav',
  template: '<ng-content></ng-content>',
})
export class SideNavComponent implements OnInit {

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

  // Outputs

  @Output() public onOpen = new EventEmitter<void>();

  // Inputs

  @Input()
  public get opened(): boolean {
    return this._opened;
  }

  public set opened(isOpen: boolean) {
    this.toggle(isOpen);
  }


  // angular
  public ngOnInit() {
    this._updateClassz();
  }

  // public

  public open() {

  }

  public close() {

  }

  public toggle(isOpen: boolean = !this.opened): Observable<boolean> {

    this._opened = isOpen;

    this._toggleClassz();
    this._updateClassz();

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

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'ui-layout-sidenav',
  styleUrls: ['./sidenav.scss'],
  templateUrl: './sidenav.html',
})
export class SideNavLayoutComponent {


}
