// Importables
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

// Components
import { getCreatorItems } from '../app';
import { IAppState } from '../app';

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
  //   this.db.save('013F785C-54CD-C5DB-B4E2-9B3030D8DC17',
  // '5-da8be31fb166aa5ee38a729082cd86aa', state)
  //     .catch(err => { console.log(err); return err; })
  //     .retry(5) // TODO@sdoell: should be reasonable
  // )
  // .onErrorResumeNext() // ignore errors from the db, and do not pass along
  // .filter(payload => {
  //   console.log('UPDATES', payload);
  //   return false;
  // });

  private store$: Observable<any>;

  constructor(
    private store: Store<IAppState>,
  ) {

    // this.store$ = store.let(getCreatorState());
    // this.subscription = mergeEffects(this).subscribe(this.store$);

    this.store$ = this.store.let(getCreatorItems());

  }

}
