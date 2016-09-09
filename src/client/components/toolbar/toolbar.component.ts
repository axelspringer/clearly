// Preamble
import { ComponentEvent } from '../../commons';

// the init specifities
// interface ToolbarTitleUpdateEventInit extends EventInit {
//   title: string; // we want a title
// }

// the event itself
export class ToolbarTitleUpdate extends ComponentEvent {

  // constructor(typeArg: string, eventInit: ToolbarTitleUpdateEventInit) {
  //   super(typeArg, eventInit);
  // }

}

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

    EmitterService.create(new ToolbarTitleUpdate()).subscribe(value => this.title$ = value);

  }

};
