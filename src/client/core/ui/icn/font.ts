/* tslint:disable no-input-rename */
import { Component } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { Input } from '@angular/core';
import { ElementRef } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'ui-font-icon',
  styleUrls: ['./font.scss'],
  templateUrl: './font.html',
})
export class FontIconComponent {

  // instance

  private _classz = [];

  constructor(
    public _elRef: ElementRef,
  ) {
  }

  // inputs

  @Input()
  public get classz() {
    return this._classz;
  }

  public set classz(newClassz: string[] | string) {
    this._classz = ['fa'].concat(newClassz || []);
  }

  // public

  public get elRef() {
    return this._elRef;
  }

}
