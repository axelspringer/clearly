// Importables
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

@Injectable()
export class AppActions {

  public static BOOT             = '[CONFIG:BOOT]';
  public static BOOT_SUCCESS     = '[CONFIG:BOOT_SUCESS]';

  public static UPDATE_STATUS    = '[APP:UPDATE_STATUS]';

  public boot(): Action { // do not do any query now
    return {
      type: AppActions.BOOT,
    };
  };

  public bootSuccess(): Action {
    return {
      type: AppActions.BOOT_SUCCESS,
      payload: true,
    };
  };

}
