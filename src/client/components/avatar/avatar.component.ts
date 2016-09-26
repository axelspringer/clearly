// Impotables
import { Observable } from 'rxjs';
import { Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { Component } from '@angular/core';

import { AppConfig } from '../../config';
import { EventEmitterProvider } from '../../commons';
import { App } from '../app';

@Component({
  selector: 'avatar',  // <menu></menu>
  providers: [],
  styleUrls: ['./avatar.style.scss'],
  templateUrl: './avatar.component.html'
})
export class Avatar implements OnInit {

  @Input('should-load') shouldLoad$: Observable<Boolean>;
  @Input('has-notifications') hasNotifications$: Observable<Array<number>>;

  constructor() {

    this.shouldLoad$ = Observable.of(true);

    this.hasNotifications$ = Observable.of([0, 1, 2]);

  }

  ngOnInit () {

  }

};
