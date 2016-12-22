/* tslint:disable max-line-length no-input-rename max-classes-per-file */
import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'ui-sidenav',
  template: '<ng-content></ng-content>',
})
export class SideNavComponent {

}
