// Authentication Guard
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AsyncSubject } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

  public canActivate(
    // next: ActivatedRouteSnapshot,
    // state: RouterStateSnapshot,
  ) {
    console.log(`Authenticating route ...`);

    const subject = new AsyncSubject();

    setTimeout(() => {
      subject.next(true);
      subject.complete();
    }, 4500);

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

}
