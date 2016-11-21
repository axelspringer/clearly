// Importables
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { ViewChild } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

// Compponents
import { AppConfig } from '../../config';
import { EventEmitProvider } from '../../core';
import { DatabaseProvider } from './../../core';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'sg-app',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  @ViewChild('menu') public menu;

  constructor(
    private __translate: TranslateService,
    private __title: Title,
  ) {
    this.__translate.setDefaultLang(AppConfig.DEFAULT_LANGUAGE);
    this.__translate.use(AppConfig.DEFAULT_LANGUAGE);

    EventEmitProvider
      .connect(DatabaseProvider.name)
      .subscribe(val => console.log(val));
  }

  public ngOnInit(): void {
    this.__title.setTitle(AppConfig.HTML5_TITLE);

  }

}
