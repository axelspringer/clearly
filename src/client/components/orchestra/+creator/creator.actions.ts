// Importables
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

// Components
// import { CreatorState } from './creator.reducer';

@Injectable()
export class CreatorActions {

  static ADD_ITEM       = '[CREATOR:ADD_ITEM]';
  static UPDATE_ITEMS   = '[CREATOR:UPDATE_ITEMS]';
  static RESET          = '[CREATOR:RESET]';

  addItem(newItem: any): Action {

    return {
      type: CreatorActions.ADD_ITEM,
      payload: newItem
    };

  }

  update(newState: Object): Action {

    return {
      type: CreatorActions.UPDATE_ITEMS,
      payload: newState
    };

  }

  reset(): Action {

    return {
      type: CreatorActions.RESET
    };

  }

}


