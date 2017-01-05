// imports
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Inject } from '@angular/core';

// interface
import { IAuthProviderOptions } from './auth.interface';
import { AuthProviderOptions } from './auth.interface';

// components

// put here to avoid side-effects
export const AUTH_PROVIDER_OPTIONS: IAuthProviderOptions = {
};

@Injectable()
export class AuthProvider {

  // properties

  public isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    @Inject(AUTH_PROVIDER_OPTIONS) public options: AuthProviderOptions,
  ) {
    console.log('Instantiating `AuthProvider`');
    console.log(this.options);
  }

  // public

  public login(): Observable<boolean> {
    this.isAuthenticated.next(true);
    return this.isAuthenticated;
  }

};

export const AUTH_PROVIDERS = [
  {
    provide: AUTH_PROVIDER_OPTIONS,
    useValue: AUTH_PROVIDER_OPTIONS,
  },
  {
    provide: AuthProvider,
    useClass: AuthProvider,
  },
];
