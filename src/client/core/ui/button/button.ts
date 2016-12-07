/* tslint:disable no-input-rename */
import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { HostListener } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'button[ui-button]',
  styleUrls: ['./button.scss'],
  templateUrl: './button.html',
})
export class ButtonComponent {

  private _disabled: boolean = null;

  // inputs
  @Input()
  public get disabled() {
    return this._disabled;
  }

  public set disabled(newState: boolean) {
    this._disabled = newState;
  }

  @HostListener('click', ['$event'])
  public onClick(event: Event) {
    if (this._disabled) {
      this._preventDisabledEvents(event);
    }
  }

  // private

  private _preventDisabledEvents(event: Event) {
    console.log(event);
    // disabled buttons do nothing
    event.preventDefault();
    event.stopImmediatePropagation();
  }

}
