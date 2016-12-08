// Importables
import { Injectable } from '@angular/core';
import { Observable, AsyncSubject } from 'rxjs';
import { Resolve } from '@angular/router';
import { Store } from '@ngrx/store';

// Components
import { IAppState } from '../app';
import { CreatorActions } from './creator.actions';
import { getCreatorTypes } from '../app';

export interface ICreatorResolverOptions {
};

// put here to avoid side-effects
export const CREATOR_RESOLVER_OPTIONS: ICreatorResolverOptions = {
};

@Injectable()
export class CreatorResolver implements Resolve<any> {

  constructor(
    private store: Store<IAppState>,
    private creatorActions: CreatorActions,
  ) {
  }

  public resolve(): Observable<any> | any {

    // subject to emit
    const subject = new AsyncSubject();

    // dispatch resolution
    this.store.dispatch(this.creatorActions.load());

    // subscribe to store and forward
    this.store
      .let(getCreatorTypes())
      .distinctUntilChanged()
      .filter(types => types.length > 0)
      .map(types => types)
      .subscribe(types => {
        subject.next(types);
        subject.complete();
      });

    // observe changes
    return subject;

  }

}

export const CREATOR_RESOLVER_PROVIDERS = [
  {
    provide: CREATOR_RESOLVER_OPTIONS,
    useValue: CREATOR_RESOLVER_OPTIONS,
  },
  CreatorResolver,
];
