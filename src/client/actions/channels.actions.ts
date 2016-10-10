// Importables
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

@Injectable()
export class ChannelsActions {

  static LOAD             = '[CHANNELS:LOAD]';
  static LOAD_SUCCESS     = '[CHANNELS:LOAD_SUCCESS]';
  static RESET            = '[CHANNELS:RESET]';
  static UPDATE_CHANNELS  = '[CHANELS:UPDATE]';

  load(): Action { // do not do any query now
    return {
      type: ChannelsActions.LOAD
    };
  };

  updateChannels(updates: any): Action {
    return {
      type: ChannelsActions.UPDATE_CHANNELS,
      payload: updates
    };
  };

  reset(): Action {
    return {
      type: ChannelsActions.RESET
    };
  }

}


