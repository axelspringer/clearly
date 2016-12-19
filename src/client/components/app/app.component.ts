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
import { ElementRef } from '@angular/core';
import { Renderer } from '@angular/core';

// Compponents
import { AppConfig } from '../../config';
import { EventEmitProvider } from '../../core';
import { DatabaseProvider } from './../../core';
import { Toasty } from '../../core';
import { Toaster } from '../../core';
import { TOASTY_TYPE } from '../../core';

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
    private _toaster: Toaster,
    private _elRef: ElementRef,
    private _renderer: Renderer,
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
    this._renderer.setElementClass(this._elRef.nativeElement, 'critical', false);

    setTimeout(() => {
      this._toaster.push(new Toasty('test 1', TOASTY_TYPE.WARN));
    }, 4000);

    setTimeout(() => {
      this._toaster.push(new Toasty('test2', TOASTY_TYPE.WARN));
    }, 6000);

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
