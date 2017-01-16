// imports
import { Injectable } from '@angular/core';
import { Type } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Inject } from '@angular/core';

// others
import { IAppState } from '../app';
import { fromStore } from '../app';
import { CONFIG_HTTP } from '../../config';
import * as fromCreatorActions from './creator.actions';

@Injectable()
export class CreatorGuard {

  constructor(
    private store: Store<IAppState>,
    @Inject(CONFIG_HTTP) public configHttp,
  ) { }

   public waitForTypesLoaded(): Observable<boolean> {
    return this.store
      .select(fromStore.getCreatorTypes)
      .timeout(5000) // timeout route change
      .skipWhile((x: any[]) => x.length === 0)
      .switchMap(() => Observable.of(true)); // parse first type to article
  }

  public canActivate(): Observable<boolean> {
    // load types from backend
    this.store.dispatch(new fromCreatorActions.LoadAction());
    // return the waiting
    return this.waitForTypesLoaded();
  }

}

export const CREATOR_GUARD: Type<any> = CreatorGuard;
