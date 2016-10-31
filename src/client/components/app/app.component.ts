// Importables
import { Angular2Apollo } from 'angular2-apollo';
// import { ApolloQueryObservable } from 'angular2-apollo';
// import { ApolloQueryResult } from 'apollo-client';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { ViewChild } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

// Compponents
import { AppConfig } from '../../config';
import { EventEmitProvider } from '../../core';
import { NotifyProvider } from '../../core';
// import { NotifyEvent } from '../../core';
import { DatabaseProvider } from './../../core';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'sg-app',
  styleUrls: [
    './app.style.scss',
  ],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  @ViewChild('menu') public menu;

  constructor(
    private apollo: Angular2Apollo,
    private translate: TranslateService,
    private title: Title,
    private notify: NotifyProvider,
  ) {

    translate.setDefaultLang(AppConfig.DEFAULT_LANGUAGE);
    translate.use(AppConfig.DEFAULT_LANGUAGE);

    EventEmitProvider
      .connect(DatabaseProvider.name)
      .subscribe(val => console.log(val));

  }

  public ngOnInit() {

    this.title.setTitle(AppConfig.HTML5_TITLE);

  }

}
