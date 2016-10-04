// Importables
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';

// Components
import { AppState } from '../app';
import { EditorActions } from './editor.actions';
import { getEditorItems } from '../app';
import { LogEventError } from '../../core';
import { LogEventInfo } from '../../core';
import { LogEventLog } from '../../core';
import { LogService } from '../../core';

import { EventEmitProvider } from '../../core';
import { Event } from '../../core';

@Injectable()
export class EditorService implements OnInit, OnDestroy {

  private _items$: Observable<any>;

  constructor(
    private _store: Store<AppState>,
    private _actions: EditorActions,
    private _logging: LogService
  ) {}

  ngOnInit() {
    this._items$ = this._store.let(getEditorItems());
  }

  reset() {
    this._store.dispatch(this._actions.reset());
  }

  ngOnDestroy() {
    // if so described to, then unsubscribe
  }

}
