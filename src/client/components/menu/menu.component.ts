/* tslint:disable: variable-name max-line-length no-forward-ref */
// Importables
import { AfterViewInit } from '@angular/core';
import { Component } from '@angular/core';
import { NavigationStart } from '@angular/router';
import { Router } from '@angular/router';
import { RoutesRecognized } from '@angular/router';
import { Route } from '@angular/router';
import * as _ from 'lodash';

// Components
import { SideNav } from '../../frameworks/core';

@Component({
  selector: 'sg-menu',  // <sg-menu></sg-menu>
  styleUrls: ['./menu.component.scss'],
  templateUrl: './menu.component.html',
})
export class MenuComponent implements AfterViewInit {

  public menu: any = [];

  constructor(
    private _router: Router,
    private _sideNav: SideNav,
  ) {
    // TODO@sdoell: adding again to routes
    this.menu = this._findMenuItems(this._router.config);
  }

  // public

  public navigate(value: string) {
    this._router.navigate([value]);
  }

  public ngAfterViewInit() {
    this._router.events.subscribe(event => {
      if (event instanceof RoutesRecognized) {
        this.menu = this._findMenuItems(this._router.config);
      }
      if (event instanceof NavigationStart) {
        this._sideNav.toggle();
      }
    });
  }

  // private

  private _findMenuItems(routes: Route[]) {
    const menu = [];
    const search = _ => {
      _.forEach(route => {
        if (route['menu']) {
          menu.push({ path: route.path, ...route['menu'] });
        }
        if (route.children) {
          search(route.children);
        }
      });
    };
    search(routes);
    return _.sortBy(menu, item => item['order']);
  }

};
