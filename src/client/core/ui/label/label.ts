/* tslint:disable no-input-rename */
import { Component } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'ui-label',
  styleUrls: ['./label.scss'],
  templateUrl: './label.html',
})
export class LabelComponent {

  // public

  private _title: string;

  // inputs

  @Input()
  public get title(): string {
    return this._title;
  }

  public set title(newTitle: string) {
    this._title = newTitle;
  }

}
