// Importables
import { ApolloQueryObservable } from 'angular2-apollo';
import { ApolloQueryResult } from 'apollo-client';
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
import { AppState, getDoc } from '../../app';
import { DatabaseProvider } from '../../core';

export interface CreatorResolverOptions {
  title: string;
};

// put here to avoid side-effects
export var CREATOR_RESOLVER_OPTIONS: CreatorResolverOptions = {
  title: 'Ohne Titel' // should be a translation
};

@Injectable()
export class CreatorResolver implements Resolve<any> {

  private options: any;

  constructor(
    private router: Router,
    private db: DatabaseProvider,
    @Inject(forwardRef(() => CREATOR_RESOLVER_OPTIONS)) options: CreatorResolverOptions,
  ) {
    this.options = options;
  }

  resolve(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<DatabaseProvider> | boolean {

      return true || false;

      // const doc = {
      //   title: this._options.title
      // };

      // return this.db.create(doc)
      //   .toPromise()
      //   .then(res => res)
      //   .catch(err => {
      //      this.router.navigate(['/']);
      //       return false;
      //   });

  }

}

export var CREATOR_RESOLVER_PROVIDERS = [
  {
    provide: CREATOR_RESOLVER_OPTIONS,
    useValue: CREATOR_RESOLVER_OPTIONS
  },
  CreatorResolver
];
