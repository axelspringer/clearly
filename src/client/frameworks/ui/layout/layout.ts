// imports
import { animate } from '@angular/core';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { OnInit } from '@angular/core';
import { state } from '@angular/core';
import { style } from '@angular/core';
import { transition } from '@angular/core';
import { trigger } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

// components
import { SideNav } from './state';

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
export class SideNavLayoutComponent implements OnInit {

  public state: Observable<string>;

  constructor(
    private _sideNav: SideNav,
  ) {}

  public ngOnInit() {
    this.state = this._sideNav.opened
      .switchMap(opened => Observable.of(opened ? 'opened' : 'close'));
  }

}
