// Importables
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

@Injectable()
export class ArticleActions {

  static LOAD             = '[ARTICLE:LOAD]';
  static LOAD_SUCCESS     = '[ARTICLE:LOAD_SUCCESS]';
  static RESET            = '[ARTICLE:RESET]';
  static UPDATE           = '[ARTICLE:UPDATE]';
  static CHANNELS_UPDATE  = '[ARTICLE:CHANNELS_UPDATE]';

  load(): Action { // do not do any query now
    return {
      type: ArticleActions.LOAD
    };
  };

  update(newState: any): Action {
    return {
      type: ArticleActions.UPDATE,
      payload: newState
    };
  };

  updateChannels(channelsUpdate: any): Action {
    return {
      type: ArticleActions.CHANNELS_UPDATE,
      payload: channelsUpdate
    }
  }

  reset(): Action {
    return {
      type: ArticleActions.RESET
    };
  }

}


