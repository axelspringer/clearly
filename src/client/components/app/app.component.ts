// importables
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from 'ng2-translate';
import { ViewChild } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Renderer } from '@angular/core';

// components
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
  }

}
