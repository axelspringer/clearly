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

  private _options: any;

  constructor(
    private _router: Router,
    private _db: DatabaseProvider,
    @Inject(forwardRef(() => CREATOR_RESOLVER_OPTIONS)) _options: CreatorResolverOptions,
  ) {
    this._options = _options;
  }

  resolve(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<DatabaseProvider> | boolean {

      const doc = {
        title: this._options.title
      };

      return this._db.create(doc)
        .toPromise()
        .then(res => res)
        .catch(err => {
           this._router.navigate(['/']);
            return false;
        });

  }

}

export var CREATOR_RESOLVER_PROVIDERS = [
  {
    provide: CREATOR_RESOLVER_OPTIONS,
    useValue: CREATOR_RESOLVER_OPTIONS
  },
  CreatorResolver
];
