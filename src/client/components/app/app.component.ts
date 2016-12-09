// Importables
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from 'ng2-translate';
import { ViewChild } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationStart } from '@angular/router';
import { NavigationEnd } from '@angular/router';
import { NavigationCancel } from '@angular/router';


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
  @ViewChild('progressBar') public progressBar;

  constructor(
    private _translate: TranslateService,
    private _title: Title,
    private _router: Router,
    // app ref
  ) {
    this._translate.setDefaultLang(AppConfig.DEFAULT_LANGUAGE);
    this._translate.use(AppConfig.DEFAULT_LANGUAGE);

    EventEmitProvider
      .connect(DatabaseProvider.name)
      .subscribe(val => console.log(val));
  }

  public ngOnInit(): void {
    this._title.setTitle(AppConfig.HTML5_TITLE);

    this._router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.progressBar.start(25);
      }
      if (event instanceof NavigationEnd) {
        this.progressBar.complete();
      }
      if (event instanceof NavigationCancel) {
        this.progressBar.error();
      }
    });
  }

}
