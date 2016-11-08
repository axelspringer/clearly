// Importables
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

@Injectable()
export class DocsActions {

  public static LOAD         = '[DOCS:LOAD]';
  public static LOAD_SUCCESS = '[DOCS:LOAD_SUCCESS]';
  public static RESET        = '[DOCS:RESET]';

  public load(query: string = ''): Action { // do not do any query now
    return {
      type: DocsActions.LOAD,
      payload: query,
    };
  }

  public reset(): Action {
    return {
      type: DocsActions.RESET,
    };
  }

}
