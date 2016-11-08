// Authentication Guard
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
// import { CanDeactivate } from '@angular/router';
// import { Router } from '@angular/router';
// import { ActivatedRouteSnapshot } from '@angular/router';
// import { RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  public canActivate(
    // next: ActivatedRouteSnapshot,
    // state: RouterStateSnapshot,
  ) {
    console.log(`Authenticating route ...`);

    return true || false; // this is foo -> bar
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

}
