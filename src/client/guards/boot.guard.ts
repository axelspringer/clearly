// Importables
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { forwardRef } from '@angular/core';
import { Inject } from '@angular/core';

import { Boot } from '../components';
// import { CanDeactivate } from '@angular/router';
// import { Router } from '@angular/router';
// import { ActivatedRouteSnapshot } from '@angular/router';
// import { RouterStateSnapshot } from '@angular/router';

@Injectable()
export class BootGuard implements CanActivate {

  constructor(
    @Inject(forwardRef(() => Boot)) public boot: Boot,
  ) {}

  public canActivate(
    // next: ActivatedRouteSnapshot,
    // state: RouterStateSnapshot,
  ) {
    console.log(`Guarding boot ...`);

    return this.boot.init$;
  }

  public CanDeactivate() {
    console.log('can be deactived');
    // this should be done when nothing more to be done
  }

}
