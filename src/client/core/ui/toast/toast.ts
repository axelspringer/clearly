/* tslint:disable no-input-rename */
// imports
import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';

// components

import { Toaster } from './toaster';

// interface

import { TOASTY_TYPE } from './interface';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'ui-toast',
  styleUrls: ['./toast.scss'],
  templateUrl: './toast.html',
})
export class ToastComponent {

  // properties

  public get toasty() {
    return this._toaster.toasties;
  }

  constructor(
    private _toaster: Toaster,
  ) {
  }

  // angular

  public classz(type: TOASTY_TYPE): string {
    return type ? TOASTY_TYPE[type].toLowerCase() : null;
  }

  // public

  public dismiss(event: Event) {
    event.preventDefault();
    event.stopImmediatePropagation();

    this._toaster.pop();
  }

}
