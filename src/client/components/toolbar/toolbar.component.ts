// Impotables
import {
  Component,
  Inject,
  forwardRef,
  Injectable,
  OnInit
} from '@angular/core';
import { AppConfig } from '../../config';
import { App } from '../app';
import { EmitterService } from '../../commons';

@Component({
  selector: 'toolbar',  // <toolbar></toolbar>
  providers: [],
  styleUrls: ['./toolbar.style.scss'],
  templateUrl: './toolbar.component.html'
})
export class Toolbar implements OnInit {

  private version$: string = AppConfig.VERSION;
  private title$: string = AppConfig.HTML5_TITLE; // TODO@sdoell: should be moved to service

  private _appRef: App;

  constructor(
    @Inject(forwardRef(() => App)) app: App
  ) {

    this._appRef = app;

  }

  toggleMenu() {

    this._appRef.menu.toggle();

  }

  ngOnInit() {

    EmitterService.get(this.constructor.name).subscribe(value => this.title$ = value);

  }

};
