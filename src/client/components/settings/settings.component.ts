import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Store } from '@ngrx/store';
import {
  AppState,
  getUserState
} from '../../reducers';

// changing title
import { EventEmitterBus } from '../../commons';
import { Toolbar } from '../toolbar';

@Component({
  selector: 'settings',  // <settings></settings>
  providers: [
  ],
  styleUrls: ['./settings.style.css'],
  templateUrl: './settings.component.html'
})
export class Settings {

  private title$ = 'Settings';

  // TypeScript public modifiers
  constructor(
    private title: Title
  ) {

  }

  ngOnInit() {

    console.log('hello `Settings` component');
    this.title.setTitle(this.title$);

    EventEmitterBus.get(Toolbar.prototype.constructor.name).emit(this.constructor.name);

  }

}
