/* tslint:disable no-input-rename */
import { Component } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'ui-popover-item',
  templateUrl: './popit.html',
})
export class PopoverItemComponent {

  @Input() public label: string = null;

}
