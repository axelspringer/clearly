// Impotables
import { Observable } from 'rxjs';
import { Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { Component } from '@angular/core';

import { NotifyProvider } from '../../commons';
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

  @Input('should-load') shouldLoad: Observable<Boolean>;
  @Input() notify: Observable<any>;

  private _events: Array<any> = [];

  constructor() {}

  get events() {

    return this._events;

  }

  ngOnInit() {

    this.notify
      .do(event => this._events.push(event))
      .subscribe();

  }

};
