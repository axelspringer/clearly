// Importables
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

@Injectable()
export class DocsActions {

  static LOAD         = '[DOCS:LOAD]';
  static LOAD_SUCCESS = '[DOCS:LOAD_SUCCESS]';
  static RESET        = '[DOCS:RESET]';

  load(query: string = ''): Action { // do not do any query now
    return {
      type: DocsActions.LOAD,
      payload: query
    };
  }

  reset(): Action {
    return {
      type: DocsActions.RESET
    };
  }

}


