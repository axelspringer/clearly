// Impotables
import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { forwardRef } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationEnd } from '@angular/router';
import { AppComponent } from '../app';

@Component({
  selector: 'sg-menu',  // <sg-menu></sg-menu>
  providers: [],
  styleUrls: ['./menu.style.scss'],
  templateUrl: './menu.component.html',
})
export class MenuComponent implements AfterViewInit {

  public $routes: any = [];

  private _appRef: AppComponent;

  constructor(
    @Inject(forwardRef(() => AppComponent)) public app: AppComponent,
    private router: Router,
  ) {
    this._appRef = app;
    this.$routes = router.config.filter(route => route.data && route.data['isMenu']);
    this.$routes = this.$routes.sort((a, b) => a.data['order'] > b.data['order']);
  }

  public trigger(value) {

    this.router.navigate([value]);

  }

  public ngAfterViewInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd &&
        this._appRef['sg-menu'].opened) {
        this._appRef['sg-menu'].toggle();
      }
    });
  }

};
