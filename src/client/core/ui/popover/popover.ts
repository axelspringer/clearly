/* tslint:disable no-input-rename */
import { Component } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'ui-popover',
  styleUrls: ['./popover.scss'],
  templateUrl: './popover.html',
})
export class PopoverComponent {

  public show: boolean = true;

  @Input() public icon: string = null;

  public toggle() {
    this.show = !this.show;
  }

}
