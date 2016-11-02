// Importables
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Effect } from '@ngrx/effects';

// Components
import { DocsActions } from '../actions';
import { DatabaseProvider } from '../core';

@Injectable()
export class DocsEffects {

  @Effect() public loadDocs$: Observable<Action> = this.actions$
    .ofType(DocsActions.LOAD)
    .switchMap(action =>
      this.db.allDocs()
        .map(res => ({
          type: DocsActions.LOAD_SUCCESS,
          payload: res.rows,
        }))
        .catch(err => Observable.of({
          type: 'LOAD_FAILURE',
          paylod: err,
        })),
      );

  constructor(
    private actions$: Actions,
    private db: DatabaseProvider,
  ) {}

}
