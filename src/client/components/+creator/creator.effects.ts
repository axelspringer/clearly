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
import { CreatorActions } from './creator.actions';
import { getCreatorItems } from '../app';
import { DatabaseProvider } from '../../core';
import { AppState } from '../app';

@Injectable()
export class CreatorEffects {

  // @Effect() addItem = this.actions$
  //   .ofType(CreatorActions.ADD_ITEM)
  //   .map(action => this.action = action)
  //   .switchMap(action => {
  //     return this.store$;
  //   })
  //   .switchMap(state => this.db.save(this.action.payload['doc']['id'], state))
  //   .map(db => {
  //     console.log(db);
  //     return db;
  //   })
  // .distinctUntilChanged()
  // // .ofType(CreatorActions.ADD)
  // .switchMap(state => // get this from orchestraState; this describes the obj id
  //   this.db.save('013F785C-54CD-C5DB-B4E2-9B3030D8DC17', '5-da8be31fb166aa5ee38a729082cd86aa', state)
  //     .catch(err => { console.log(err); return err; })
  //     .retry(5) // TODO@sdoell: should be reasonable
  // )
  // .onErrorResumeNext() // ignore errors from the db, and do not pass along
  // .filter(payload => {
  //   console.log('UPDATES', payload);
  //   return false;
  // });

  private store$: Observable<any>;
  private action: Action;

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private databaseProvider: DatabaseProvider
  ) {

    // this.store$ = store.let(getCreatorState());
    // this.subscription = mergeEffects(this).subscribe(this.store$);

    this.store$ = store.let(getCreatorItems());

  }

}
