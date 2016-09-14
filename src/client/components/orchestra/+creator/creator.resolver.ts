// Authentication Guard
import { Injectable } from '@angular/core';
import { DBService } from '../../../services';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, getDoc } from '../../app';
import { OrchestraActions } from '../orchestra.actions';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class CreatorResolver implements Resolve<any> {

  private store$: any;

  constructor(
    private router: Router,
    private db: DBService,
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<DBService> | boolean {

    return this.db.create().toPromise()
      .then(res => {
        return res;
      })
      .catch(err => {
        this.router.navigate(['/']);
        return false;
      });

  }

}
