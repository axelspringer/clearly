import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Store } from '@ngrx/store';
import {
  AppState,
  getUserState
} from '../../reducers';

// changing title
import { EventEmitProvider } from '../../core';
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

    EventEmitProvider.connect(Toolbar.prototype.constructor.name).emit(this.constructor.name);

  }

}
