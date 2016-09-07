// Impotables
import { Component } from '@angular/core';
import { AppConfig } from '../../config';

@Component({
  selector: 'toolbar',  // <toolbar></toolbar>
  providers: [],
  styleUrls: [ './toolbar.style.scss' ],
  templateUrl: './toolbar.component.html'
})
export class Toolbar {

  private version$: string = AppConfig.VERSION;
  private title$: string = AppConfig.HTML5_TITLE; // TODO@sdoell: should be moved to service

  constructor() {
  }

};
