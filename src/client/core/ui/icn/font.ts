/* tslint:disable no-input-rename */
import { Component } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'ui-font-icon',
  styleUrls: ['./font.scss'],
  templateUrl: './font.html',
})
export class FontIconComponent {

  private _classz = [];

  @Input()
  public get classz() {
    return this._classz;
  }

  public set classz(newClassz: string[] | string) {
    this._classz = ['fa'].concat(newClassz || []);
  }

}
