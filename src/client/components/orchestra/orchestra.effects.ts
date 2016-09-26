  // Importables
import { Action } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { mergeEffects } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

// Components
import { AppState } from '../app';
import { getCreatorState } from '../app';
import { OrchestraActions } from '../';

@Injectable()
export class OrchestraEffects {

  subscription: Subscription;

  @Effect() newDoc = this.actions$
    .ofType(OrchestraActions.NEW_DOC)
    .map(action => {
      console.log(action);
      return action;
    })
    .switchMap(action => {
      return this.db.newDoc()
        .map(res => {
          console.log(res);
        })
        .catch(() => Observable.of({ type: 'NEW_FAILED'}));
    })
    .filter(test => {
      console.log('EFFECT', test);
      return false;
    });

  // @Effect() save = this.store
  //   .distinctUntilChanged()
  //   .map(state => state)
  //   // .ofType(CreatorActions.ADD)
  //   .switchMap(state => // get this from orchestraState; this describes the obj id
  //     this.db.save('013F785C-54CD-C5DB-B4E2-9B3030D8DC17', '5-da8be31fb166aa5ee38a729082cd86aa', state)
  //       .catch(err => { console.log(err); return err; })
  //       .retry(5) // TODO@sdoell: should be reasonable
  //   )
  //   .onErrorResumeNext() // ignore errors from the db, and do not pass along
  //   .filter(payload => {
  //     console.log('UPDATES', payload);
  //     return false;
  //   });

  private store$: any;

  constructor(
    private actions$: Actions,
    private store: Store<AppState>
  ) {

    console.log(`Entering 'creator' component ...`);

    // this.store$ = store.let(getCreatorState());
    // this.subscription = mergeEffects(this).subscribe(this.store$);

  }

}
