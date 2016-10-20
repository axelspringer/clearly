// Importables
import { ActivatedRouteSnapshot } from '@angular/router';
import { Inject } from '@angular/core';
import { Injectable } from '@angular/core';
import { forwardRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Resolve } from '@angular/router';
import { Router } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';

// Components
import { AppState } from '../app';
import { ArticleActions } from './article';
import { CreatorService } from './creator.service';
import { CreatorActions } from './creator.actions';
import { getChannels } from '../app';

export interface CreatorResolverOptions {
  title: string;
};

// put here to avoid side-effects
export const CREATOR_RESOLVER_OPTIONS: CreatorResolverOptions = {
  title: 'Ohne Titel' // should be a translation
};

@Injectable()
export class CreatorResolver implements Resolve<any> {

  private options: any;
  private creatorService: any;

  constructor(
    private router: Router,
    private creatorActions: CreatorActions,
    private store: Store<AppState>,
    private articleActions: ArticleActions,
    @Inject(forwardRef(() => CreatorService)) creatorService: CreatorService,
    @Inject(forwardRef(() => CREATOR_RESOLVER_OPTIONS)) options: CreatorResolverOptions,
  ) {
    this.options = options;
    this.creatorService = creatorService;
  }

  resolve(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    this.store.dispatch(this.articleActions.load());

    return new Promise(resolve => {
      this.store.let(getChannels())
        .switchMap(slice => {
          if (slice.length === 0) {
            return Observable.throw(new Error());
          }
          return Observable.of(slice);
        })
        .retryWhen(error => error.delay(16 * 10))
        .timeout(60 * 1000 * 2)
        .map(channels => channels)
        .subscribe(channels => {
          resolve(channels);
        },
        error => console.log(error)
        );
    });

  }

}

export const CREATOR_RESOLVER_PROVIDERS = [
  {
    provide: CREATOR_RESOLVER_OPTIONS,
    useValue: CREATOR_RESOLVER_OPTIONS
  },
  CreatorResolver
];
