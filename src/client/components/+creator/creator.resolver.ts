// Importables
// import { ActivatedRouteSnapshot } from '@angular/router';
import { Inject } from '@angular/core';
import { Injectable } from '@angular/core';
import { forwardRef } from '@angular/core';
import { Observable, AsyncSubject } from 'rxjs';
import { Resolve } from '@angular/router';
import { Store } from '@ngrx/store';

// Components
import { IAppState } from '../app';
import { CreatorActions } from './creator.actions';
import { CreatorService } from './creator.service';
import { getArticleTypes } from '../app';

export interface ICreatorResolverOptions {
  title: string;
};

// put here to avoid side-effects
export const CREATOR_RESOLVER_OPTIONS: ICreatorResolverOptions = {
  title: 'Ohne Titel', // should be a translation
};

@Injectable()
export class CreatorResolver implements Resolve<any> {

  private options: any;
  private creatorService: any;

  constructor(
    private store: Store<IAppState>,
    private creatorActions: CreatorActions,
    @Inject(forwardRef(() => CreatorService)) creatorService: CreatorService,
    @Inject(forwardRef(() => CREATOR_RESOLVER_OPTIONS)) options: ICreatorResolverOptions,
  ) {
    this.options = options;
    this.creatorService = creatorService;
  }

  public resolve(): Observable<any> | any {

    // subject to emit
    const subject = new AsyncSubject();

    // dispatch resolution
    this.store.dispatch(this.creatorActions.load());

    // subscribe to store and forward
    this.store
      .let(getArticleTypes())
      .map(types => types)
      .subscribe(types => {
        if (types.length > 0) {
          subject.next(types);
          subject.complete();
        }
      });

    // observe changes
    return subject.asObservable();

  }

}

export const CREATOR_RESOLVER_PROVIDERS = [
  {
    provide: CREATOR_RESOLVER_OPTIONS,
    useValue: CREATOR_RESOLVER_OPTIONS,
  },
  CreatorResolver,
];
