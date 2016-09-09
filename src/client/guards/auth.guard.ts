// Authentication Guard
import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanDeactivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {

    console.log(`Authenticating route ...`);

    return true || false; // this is foo -> bar

  }

  CanDeactivate() {
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

}
