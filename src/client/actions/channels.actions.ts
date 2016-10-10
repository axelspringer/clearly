// Importables
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

@Injectable()
export class ChannelsActions {

  static LOAD         = '[CHANNELS:LOAD]';
  static LOAD_SUCCESS = '[CHANNELS:LOAD_SUCCESS]';
  static RESET        = '[CHANNELS:RESET]';

  load(): Action { // do not do any query now
    return {
      type: ChannelsActions.LOAD
    };
  }

  reset(): Action {
    return {
      type: ChannelsActions.RESET
    };
  }

}


