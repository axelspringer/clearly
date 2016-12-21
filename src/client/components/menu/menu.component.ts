/* tslint:disable: variable-name max-line-length no-forward-ref */
// Importables
import { AfterViewInit } from '@angular/core';
import { Component } from '@angular/core';
import { NavigationStart } from '@angular/router';
import { Router } from '@angular/router';
import * as _ from 'lodash';

// Components
import { MainComponent } from '../main';

@Component({
  selector: 'sg-menu',  // <sg-menu></sg-menu>
  styleUrls: ['./menu.component.scss'],
  templateUrl: './menu.component.html',
})
export class MenuComponent implements AfterViewInit {

  public menu: any = [];

  constructor(
    private _main: MainComponent,
    private _router: Router,
  ) {
    this.menu = _.sortBy(_.map(_.filter(this._router.config, (route) => route['menu'] && route['menu'].show), route => Object.assign({}, {path: route.path}, route['menu'])), config => config['order']);
    // TODO@sdoell: adding again to routes
  }

  public navigate(value: string) {
    this._router.navigate([value]);
  }

  public ngAfterViewInit() {
    this._router.events.subscribe(event => {
      if (event instanceof NavigationStart &&
        this._main.menu.opened) {
        this._main.menu.toggle();
      }
    });
  }

};
