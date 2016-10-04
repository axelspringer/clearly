// Importables
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

@Injectable()
export class EditorActions {

  static ADD_ITEM       = '[EDITOR:ADD_ITEM]';
  static REMOVE_ITEM    = '[EDITOR:REMOVE_ITEM]';
  static UPDATE_ITEMS   = '[EDITOR:UPDATE_ITEMS]';
  static RESET          = '[EDITOR:RESET]';

  addItem(newItem: any): Action {
    return {
      type: EditorActions.ADD_ITEM,
      payload: newItem
    };
  }

  update(newState: Object): Action {
    return {
      type: EditorActions.UPDATE_ITEMS,
      payload: newState
    };
  }

  reset(): Action {
    return {
      type: EditorActions.RESET
    };
  }

}


