// Importables
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { ViewChild } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

// Compponents
import { AppConfig } from '../../config';
import { EventEmitterProvider } from '../,,/commons';

@Component({
  encapsulation: ViewEncapsulation.None,
  providers: [
  ],
  selector: 'app',
  styleUrls: [
    './app.style.scss'
  ],
  templateUrl: './app.component.html'
})
export class App implements OnInit {

  @ViewChild('menu') menu;

  private _title: Title;
  private _translate: TranslateService;
  private _version$: string = AppConfig.VERSION;

  constructor(
    translate: TranslateService,
    title: Title
  ) {

    this._title = title;
    this._translate = translate;

    translate.setDefaultLang(AppConfig.DEFAULT_LANGUAGE);
    translate.use(AppConfig.DEFAULT_LANGUAGE);

  }

  ngOnInit() {

    this._title.setTitle(AppConfig.HTML5_TITLE);

  }

}
