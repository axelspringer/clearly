// importables
// import { Inject, EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';
// import { Observable, BehaviorSubject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';

// interface
import { IAuthProviderOptions } from './auth.interface';

// components
// import { EventEmitProvider } from '../events';
// import { LogEventError } from '../log';
// import { LogEventLog } from '../log';
// import { LogService } from '../log';

// put here to avoid side-effects
export const AUTH_PROVIDER_OPTIONS: IAuthProviderOptions = {
};

@Injectable()
export class AuthProvider {

  // properties

  public isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject(false);

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
