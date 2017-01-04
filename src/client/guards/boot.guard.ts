// imports
import { AsyncSubject } from 'rxjs';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { OnDestroy }  from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

// interfaces
import { IAppState } from '../components';
import { getIsBooting } from '../components';

import { Store } from '@ngrx/store';

@Injectable()
export class BootGuard implements CanActivate, OnDestroy {

  private _sup: Subscription;

  constructor(
    private _location: Location,
    private _router: Router,
    private _store: Store<IAppState>,
  ) {}

  public canActivate(): AsyncSubject<boolean> {
    console.log(`Checking Boot ...`);

    const subject = new AsyncSubject();
    this._sup = this._store
      .let(getIsBooting())
      .subscribe(isBooting => {
        if (isBooting) { // immediatly redirect on not booted
          this._location.replaceState('/');
          this._router.navigate(['boot']);
        }
        subject.next(!isBooting);
        subject.complete();
      });

    return subject;

  }

  public CanDeactivate() {
    console.log('can be deactived');
    // this should be done when nothing more to be done
  }

  public ngOnDestroy(): void {
    if (this._sup != null) {
      this._sup.unsubscribe();
    }
  }

}
