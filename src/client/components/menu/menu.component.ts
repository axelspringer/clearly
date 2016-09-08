// Impotables
import {
  Component,
  AfterViewInit
} from '@angular/core';
import { AppConfig } from '../../config';
import { Router } from '@angular/router';

@Component({
  selector: 'menu',  // <menu></menu>
  providers: [],
  styleUrls: [ './menu.style.scss' ],
  templateUrl: './menu.component.html'
})
export class Menu {

  $routes: any = [];

  constructor(
    private router: Router
  ) {

    this.$routes = router.config.filter(route => route.data && route.data['isMenu']);
    this.$routes = this.$routes.sort((a, b) => a.data['order'] > b.data['order']);

  }

};
