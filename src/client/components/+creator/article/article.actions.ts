// Importables
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

@Injectable()
export class ArticleActions {

  public static LOAD             = '[ARTICLE:LOAD]';
  public static LOAD_SUCCESS     = '[ARTICLE:LOAD_SUCCESS]';
  public static RESET            = '[ARTICLE:RESET]';
  public static UPDATE           = '[ARTICLE:UPDATE]';
  public static CHANNELS_UPDATE  = '[ARTICLE:CHANNELS_UPDATE]';

  public load(): Action { // do not do any query now
    return {
      type: ArticleActions.LOAD,
    };
  };

  public update(newState: any): Action {
    return {
      type: ArticleActions.UPDATE,
      payload: newState,
    };
  };

  public updateChannels(channelsUpdate: any): Action {
    return {
      type: ArticleActions.CHANNELS_UPDATE,
      payload: channelsUpdate,
    };
  }

  public reset(): Action {
    return {
      type: ArticleActions.RESET,
    };
  }

}


