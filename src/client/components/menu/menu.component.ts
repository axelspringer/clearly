// Impotables
import {
  Component,
  Inject,
  forwardRef,
  AfterViewInit,
  OnInit
} from '@angular/core';
import { AppConfig } from '../../config';
import {
  Router,
  NavigationEnd
} from '@angular/router';
import { EventEmitProvider } from '../../core';

import { App } from '../app';

@Component({
  selector: 'menu',  // <menu></menu>
  providers: [],
  styleUrls: ['./menu.style.scss'],
  templateUrl: './menu.component.html'
})
export class Menu implements AfterViewInit {

  $routes: any = [];

  private _appRef: App;

  constructor(
    @Inject(forwardRef(() => App)) app: App,
    private router: Router
  ) {

    this._appRef = app;

    this.$routes = router.config.filter(route => route.data && route.data['isMenu']);
    this.$routes = this.$routes.sort((a, b) => a.data['order'] > b.data['order']);

  }

  trigger(value) {

    this.router.navigate([value]);

  }

  ngAfterViewInit() {

    this.router.events.subscribe(event => {
      console.log(this.router);
      if (event instanceof NavigationEnd &&
        this._appRef.menu.opened) {
        this._appRef.menu.toggle();
      }
    });

  }

};
