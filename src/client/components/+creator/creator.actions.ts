// Importables
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

// Components
// import { CreatorState } from './creator.reducer';

@Injectable()
export class CreatorActions {

  public static ADD_ITEM       = '[CREATOR:ADD_ITEM]';
  public static UPDATE_ITEMS   = '[CREATOR:UPDATE_ITEMS]';
  public static RESET          = '[CREATOR:RESET]';

  public addItem(newItem: any): Action {
    return {
      type: CreatorActions.ADD_ITEM,
      payload: newItem,
    };
  }

  public update(newState: Object): Action {
    return {
      type: CreatorActions.UPDATE_ITEMS,
      payload: newState,
    };
  }

  public reset(): Action {
    return {
      type: CreatorActions.RESET,
    };
  }

}
