// Importables
import { ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Resolve } from '@angular/router';
import { Router } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';

// Components
import { AppState, getDoc } from '../../app';
import { DatabaseProvider } from '../../../commons';
import { OrchestraActions } from '../orchestra.actions';

@Injectable()
export class CreatorResolver implements Resolve<any> {

  private store$: any;

  private _router: Router;
  private _db: DatabaseProvider;

  constructor(
    router: Router,
    db: DatabaseProvider,
  ) {

    this._db = db;
    this._router = router;

  }

  resolve(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<DatabaseProvider> | boolean {

      return this._db.create()
        .toPromise()
        .then(res => res)
        .catch(err => {
           this._router.navigate(['/']);
            return false;
        });

  }

}
