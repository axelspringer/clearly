/* tslint:disable max-classes-per-file */
// imports
import { Action } from '@ngrx/store';
import { Actions } from '@ngrx/effects';

// interfaces
import { ActionType } from '../app/app.util';

export const ActionTypes = {
  LOAD:         ActionType('[CREATOR:LOAD]'),
  LOAD_SUCCESS: ActionType('[CREATOR:LOAD_SUCCESS]'),
  LOAD_FAILURE: ActionType('[CREATOR:LOAD_FAILURE]'),

  RESET:        ActionType('[CREATOR:RESET]'),
  UPDATE:       ActionType('[CREATOR:UPDATE]'),

  SELECT_TYPE:  ActionType('[CREATOR:SELECT_TYPE]'),
};

export class SelectTypeAction implements Action {
  public type = ActionTypes.SELECT_TYPE;

  constructor(public payload: number) {}
}

export class LoadAction implements Action {
  public type = ActionTypes.LOAD;
  public payload = null;
};

export class UpdateAction implements Action {
  public type = ActionTypes.UPDATE;

  constructor(public payload: any) {}
}

export class ResetAction implements Action {
  public type = ActionTypes.RESET;
  public payload = null;
}

export type Actions
  = SelectTypeAction
  | LoadAction
  | UpdateAction
  | ResetAction;
