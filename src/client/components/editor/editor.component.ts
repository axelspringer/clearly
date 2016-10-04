// Impotables
import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { Output } from '@angular/core';

// Components
import { EditorService } from './editor.service';
import { EditorActions } from './editor.actions';
import { LogEventError } from '../../core';
import { LogEventInfo } from '../../core';
import { LogEventLog } from '../../core';
import { LogService } from '../../core';

import { EventEmitProvider } from '../../core';
import { Event } from '../../core';

@Component({
  selector: 'editor',  // <editor></editor>
  styleUrls: ['./editor.style.scss'],
  templateUrl: './editor.component.html'
})
export class Editor implements OnInit, OnDestroy {

  constructor(
    private _logging: LogService,
    private _service: EditorService
  ) {
    this._logging.log(new LogEventLog(`Initializing ${this.constructor.name}`));
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this._service.reset();
  }

};
