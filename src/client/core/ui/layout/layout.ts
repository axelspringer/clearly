// Importables
import { Component } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'ui-layout-sidenav',
  styleUrls: ['./sidenav.scss'],
  templateUrl: './sidenav.html',
})
export class SideNavLayoutComponent {

}
