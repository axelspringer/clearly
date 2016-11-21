// Importables
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { forwardRef } from '@angular/core';
import { Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

import { isBooting } from '../components/app/app.store';
import { IAppState } from '../components';

@Injectable()
export class BootGuard implements CanActivate {

  constructor(
    private router: Router,
    @Inject(forwardRef(() => Store)) private store: Store<IAppState>,
  ) {}

  public canActivate(
    // next: ActivatedRouteSnapshot,
    // state: RouterStateSnapshot,
  ) {
    console.log(`Guarding boot ...`);

    return true;

    // return this.store.let(isBooting())
    //   .do(isBooting => {
    //     if (isBooting) {
    //       this.router.navigate(['boot']);
    //     }
    //   })
    //   .map(isBooting => !isBooting);

  }

  public CanDeactivate() {
    console.log('can be deactived');
    // this should be done when nothing more to be done
  }

}
