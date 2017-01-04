// Importables
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Resolve } from '@angular/router';
import { Store } from '@ngrx/store';

// Components
import { IAppState } from '../app';
import { fromStore } from '../app';
import * as fromCreatorActions from './creator.actions';

export interface ICreatorResolverOptions {
};

// put here to avoid side-effects
export const CREATOR_RESOLVER_OPTIONS: ICreatorResolverOptions = {
};

@Injectable()
export class CreatorResolver implements Resolve<any> {

  constructor(
    private store: Store<IAppState>,
  ) {
  }

  public waitForTypesLoaded(): Observable<any> {
    return this.store.select(fromStore.getCreatorTypes)
      .distinctUntilChanged()
      .filter(types => types.length > 0)
      .map(types => types)
      .take(1);
  }

  public resolve(): Observable<any> | any {
    // dispatch resolution
    this.store.dispatch(new fromCreatorActions.LoadAction());
    return this.waitForTypesLoaded();
  }

}

export const CREATOR_RESOLVER_PROVIDERS = [
  {
    provide: CREATOR_RESOLVER_OPTIONS,
    useValue: CREATOR_RESOLVER_OPTIONS,
  },
  CreatorResolver,
];
