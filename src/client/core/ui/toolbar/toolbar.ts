/* tslint:disable no-input-rename */
import { Component } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'ui-toolbar',
  styleUrls: ['./toolbar.scss'],
  templateUrl: './toolbar.html',
})
export class ToolbarComponent {

  // angular

}
