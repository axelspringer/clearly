// Importables
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { ViewChild } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

// Compponents
import { AppConfig } from '../../config';
import { EventEmitProvider } from '../../commons';
import { NotifyProvider } from '../../commons';
import { NotifyEvent } from '../../commons';
import { DatabaseProvider } from './../../commons';

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
    title: Title,
    notify: NotifyProvider
  ) {

    this._title = title;
    this._translate = translate;

    translate.setDefaultLang(AppConfig.DEFAULT_LANGUAGE);
    translate.use(AppConfig.DEFAULT_LANGUAGE);

    const test = EventEmitProvider
      .connect(DatabaseProvider.name)
      .subscribe(val => console.log(val));

    // test.emit(new NotifyEvent('Artikel gespeichert', 'Lorem ipsum ...'));
    // test.emit(new NotifyEvent('Artikel gespeichert', 'Lorem ipsum ...'));
    // test.emit(new NotifyEvent('Artikel gespeichert', 'Lorem ipsum ...'));
    // test.emit(new NotifyEvent('Artikel gespeichert', 'Lorem ipsum ...'));

    // const event1 = new AvatarSpinnerEvent(true);
    // const event2 = new AvatarSpinnerEvent(true);
    // const event3 = new AvatarSpinnerEvent(true);

    // // demo
    // setTimeout(() => {
    //   EventEmitProvider.emit(event1);
    // }, 5000);

    // setTimeout(() => {
    //   EventEmitProvider.emit(event2);
    // }, 6000);

    // setTimeout(() => {
    //   EventEmitProvider.emit(event3);
    // }, 7000);

  }

  ngOnInit() {

    this._title.setTitle(AppConfig.HTML5_TITLE);

  }

}
