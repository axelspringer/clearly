// Importables
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

// Component
import { OrchestraActions } from './orchestra.actions';

export interface OrchestraState {
  docId: string;
  docRev: string;
}

let init: OrchestraState = {
  docId: '0', // identifiert for the data base, have a side effect for that
  docRev: '0'
};

export default function (state = init, action: Action) {

  switch (action.type) {

    case OrchestraActions.UPDATE_DOC: {
      return Object.assign({}, state, action.payload);
    }

    default:
      return state;

  }

}

export function getDoc() {
  return (state$: Observable<any>) => state$
    .select(s => { const { docId, docRev } = s; return { docId, docRev }; });
}
