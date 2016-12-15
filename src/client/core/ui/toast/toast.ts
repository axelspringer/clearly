/* tslint:disable no-input-rename */
// imports
import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

// components
import { Toaster } from './toaster';

// interface

export enum TOASTY_TYPE {
  INFO,
  WARN,
  ERROR,
};

export interface IToasty {
  message: string;
  type: TOASTY_TYPE;
};

export type Toasty = IToasty;

@Component({
  encapsulation: ViewEncapsulation.None,
  providers: [Toaster],
  selector: 'ui-toast',
  styleUrls: ['./toast.scss'],
  templateUrl: './toast.html',
})
export class ToastComponent {

  // properties
  public _toasty: Toasty = null;

  // inputs

  @Input()
  public set toasty(newValue) {
    console.log(newValue);
    this._toasty = newValue;
  }

  @Input() public show: boolean = false;

  // public
  public get classz(): string {
    return TOASTY_TYPE[this.toasty.type].toLowerCase();
  }

}
