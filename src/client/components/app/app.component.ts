/*
 * Angular 2 decorators and services
 */
import {
  Component,
  ViewChild,
  AfterViewInit,
  ViewEncapsulation
} from '@angular/core';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { Title } from '@angular/platform-browser';

import { AppConfig } from '../../config';
import { DBService } from '../../services';
import { EmitterService } from '../,,/commons';


/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  providers: [
  ],
  styleUrls: [
    './app.style.scss'
  ],
  templateUrl: './app.component.html'
})
export class App implements AfterViewInit {

  @ViewChild('menu') menu;

  private title$ = AppConfig.HTML5_TITLE;
  private version$ = AppConfig.VERSION;

  constructor(
    public translate: TranslateService,
    public title: Title,
    public db: DBService // comment to disable db service to be not injected
  ) {

    translate.setDefaultLang(AppConfig.DEFAULT_LANGUAGE);
    translate.use(AppConfig.DEFAULT_LANGUAGE);

  }

  ngOnInit() {

    this.title.setTitle(AppConfig.HTML5_TITLE);

  }

  ngAfterViewInit() {
  }

}
