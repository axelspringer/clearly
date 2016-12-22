// imports
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { OnDestroy } from '@angular/core';
import { AsyncSubject } from 'rxjs';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

// components
import { AuthProvider } from '../core/auth';

@Injectable()
export class AuthGuard implements CanActivate, OnDestroy {

  private _sub: Subscription = null;
  private _isAuthenticated: boolean = false;

  constructor(
    private _location: Location,
    private _router: Router,
    private _auth: AuthProvider,
  ) {
    this._sub = this._auth.isAuthenticated.subscribe(grant => this._isAuthenticated = grant);
  }

  public canActivate(
    // next: ActivatedRouteSnapshot,
    // state: RouterStateSnapshot,
  ): AsyncSubject<boolean> {
    console.log(`Authenticating route ...`);

    if (!this._isAuthenticated) {
      this._location.replaceState('/');
      this._router.navigate(['login']);
    }

    const subject = new AsyncSubject();

    setTimeout(() => {
      subject.next(true);
      subject.complete();
    }, 1500);

    return subject;
  }

  public CanDeactivate() {
    console.log('can be deactived');
    // this should be done when nothing more to be done
  }

  /**
   *
   * - we should have a workflow component that guides the process
   * - passes along the data?
   * - guarding the Routes
   * - passing the data
   * - should have outlets per view
   * - loading mechanism for loadign; with backdrop
   */

  public ngOnDestroy(): void {
    if (this._sub != null) {
      this._sub.unsubscribe();
    }
  }

}
