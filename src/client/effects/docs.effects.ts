// Importables
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { Store } from '@ngrx/store';
import { AppState } from '../components/app';
import { Actions } from '@ngrx/effects';
import { Effect } from '@ngrx/effects';
import { OnDestroy } from '@angular/core';

// Components
import { DocsActions } from '../actions';
import { DatabaseProvider } from '../commons';

@Injectable()
export class DocsEffects implements OnDestroy {

  @Effect() loadDocs$: Observable<Actions> = this.actions$
    .ofType(DocsActions.LOAD)
    .switchMap(action =>
      this.db.allDocs()
        .map(res => ({
          type: DocsActions.LOAD_SUCCESS,
          payload: res.rows
        }))
        .catch(err => Observable.of({
          type: 'LOAD_FAILURE',
          paylod: err
        }))
      );

  constructor(
    private actions$: Actions,
    private db: DatabaseProvider
  ) {

  }

  ngOnDestroy () {

  }

}
