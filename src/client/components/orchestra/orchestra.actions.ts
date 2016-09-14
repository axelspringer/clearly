// Importables
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

// Components
import { OrchestraState } from './orchestra.reducer';

@Injectable()
export class OrchestraActions {

  static UPDATE_DOC      = '[CREATOR:ADD_ITEM]';
  static NEW_DOC         = '[CREATOR:NEW_DOC]';

  newDoc(newDoc?: Object): Action {

    return {
      type: OrchestraActions.NEW_DOC,
      payload: newDoc
    };

  }

  updateDoc(docId: string, docRev: string): Action {

    return {
      type: OrchestraActions.UPDATE_DOC,
      payload: {docId, docRev}
    };

  }

}


