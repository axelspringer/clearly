// importables
import { Action } from '@ngrx/store';
import { Actions } from '@ngrx/effects';

// interfaces
import { ActionType } from '../../app/app.util';

export const ActionTypes = {
  LOAD:           ActionType('[ARTICLE:LOAD]'),
  LOAD_SUCCESS:   ActionType('[ARTICLE:LOAD_SUCCES]'),

  UPDATE:         ActionType('[ARTICLE:UPDATE]'),
  UPDATE_ARTICLE: ActionType('[ARTICLE:UPDATE_ARTICLE]'),

  RESET:          ActionType('[ARTICLE:RESET]')
};

export class UpdateArticleAction implements Action {
  public type = ActionTypes.UPDATE_ARTICLE

  constructor(public payload: any) {}
}

export class UpdateAction implements Action {
  public type = ActionTypes.UPDATE

  constructor(public payload: any) {}
}
export class ResetAction implements Action {
  public type = ActionTypes.RESET
  public payload = null
}

export type Actions
  = UpdateArticleAction
  | UpdateAction
  | ResetAction;
