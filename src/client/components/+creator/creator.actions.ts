// Importables
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

// Components
// import { CreatorState } from './creator.reducer';

@Injectable()
export class CreatorActions {

  public static LOAD          = '[CREATOR:LOAD]';
  public static LOAD_SUCCESS  = '[CREATOR:LOAD_SUCCESS]';
  public static LOAD_FAILURE  = '[CREATOR:LOAD_FAILURE]';

  public static RESET         = '[CREATOR:RESET]';
  public static UPDATE        = '[CREATOR:UPDATE]';

  public static SELECT_TYPE   = '[CREATOR:SELECT_TYPE]';

  public selectType(id: number): Action {
    return {
      type: CreatorActions.SELECT_TYPE,
      payload: id,
    };
  }

  public load(): Action { // do not do any query now
    return {
      type: CreatorActions.LOAD,
    };
  }

  public update(newState: any): Action {
    return {
      type: CreatorActions.UPDATE,
      payload: newState,
    };
  }

  public reset(): Action {
    return {
      type: CreatorActions.RESET,
    };
  }

}
