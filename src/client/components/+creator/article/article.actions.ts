// Importables
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

@Injectable()
export class ArticleActions {

  public static LOAD            = '[ARTICLE:LOAD]';
  public static LOAD_SUCCESS    = '[ARTICLE:LOAD_SUCCESS]';
  public static RESET           = '[ARTICLE:RESET]';

  public static UPDATE          = '[ARTICLE:UPDATE]';
  public static UPDATE_ARTICLE  = '[ARTICLE:UPDATE_ARTICLE]'

  public updateArticle(): Action {
    return {
      type: ArticleActions.UPDATE_ARTICLE,
    }
  }

  public update(newState: any): Action {
    return {
      type: ArticleActions.UPDATE,
      payload: newState
    }
  }

  public reset(): Action {
    return {
      type: ArticleActions.RESET,
    };
  }

}
