// Impotables
import { AfterViewInit } from '@angular/core';
import { Component } from '@angular/core';
import { forwardRef } from '@angular/core';
import { Inject } from '@angular/core';
import { NavigationStart } from '@angular/router';
import { Router } from '@angular/router';

// Components
import { AppComponent } from '../app';

@Component({
  selector: 'sg-menu',  // <sg-menu></sg-menu>
  providers: [],
  styleUrls: ['./menu.style.scss'],
  templateUrl: './menu.component.html',
})
export class MenuComponent implements AfterViewInit {

  public $routes: any = [];

  constructor(
    @Inject(forwardRef(() => AppComponent)) public _app: AppComponent, // TODO@sdoell: could be moved to service
    private _router: Router,
  ) {
    // TODO@sdoell: adding again to routes
    // this.$routes = router.config.filter(route => route.data && route.data['isMenu']);
    // this.$routes = this.$routes.sort((a, b) => a.data['order'] > b.data['order']);
  }

  public navigate(value: string) {
    this._router.navigate([value]);
  }

  public ngAfterViewInit() {
    this._router.events.subscribe(event => {
      if (event instanceof NavigationStart &&
        this._app.menu.opened) {
        this._app.menu.toggle();
      }
    });
  }

};
