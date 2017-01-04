// imports
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

// interfaces
import { IAppState } from '../components';
import { fromStore } from '../components';

import { Store } from '@ngrx/store';

@Injectable()
export class BootGuard implements CanActivate {

  constructor(
    private location: Location,
    private router: Router,
    private store: Store<IAppState>,
  ) {}

  public waitForAppBooting(): Observable<any> {
    return this.store.select(fromStore.getIsBooting)
      .take(1);
  }

  public canActivate(): Observable<any> {
    return this.waitForAppBooting()
      .do(isBooting => {
        if (isBooting) {
          this.location.replaceState('/');
          this.router.navigate(['boot']);
        }
      })
      .map(isBooting => {
        return !isBooting;
      });
  }

  public CanDeactivate() {
    console.log('can be deactived');
    // this should be done when nothing more to be done
  }

}
