// Importables
import { Component } from '@angular/core';
// import { ChangeDetectionStrategy } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { ViewChild } from '@angular/core';
import { QueryList } from '@angular/core';
import { trigger } from '@angular/core';
import { state } from '@angular/core';
import { transition } from '@angular/core';
import { animate } from '@angular/core';
import { style } from '@angular/core';

@Component({
  // changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'ui-layout-sidenav',
  styleUrls: ['./sidenav.scss'],
  templateUrl: './sidenav.html',
  animations: [
    trigger('menuState', [
      state('opened', style({
        transform: 'translate3d(240px, 0, 0)',
      })),
      state('closed', style({
        transform: 'translate3d(0, 0, 0)',
      })),
      transition('opened => closed', animate('400ms ease-in-out')),
      transition('closed => opened', animate('400ms ease-in-out')),
    ]),
  ],
})
export class SideNavLayoutComponent {

  @ViewChild('uiLayoutSidenavPusher') public pusher: QueryList<any>;

  public opened = 'closed';

  public toggle() {
    this.opened = this.opened === 'closed' ? 'opened' : 'closed';
  }

}
