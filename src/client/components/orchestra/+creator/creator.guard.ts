// Authentication Guard
import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanDeactivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  ActivatedRoute
} from '@angular/router';
import { DBService } from '../../../services';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, getDoc } from '../../app';
import { CreatorActions } from './creator.actions';
import { FormGroup } from '@angular/forms';

export interface CanComponentDeactive {
  canActivate: () => Observable<boolean> | Promise<boolean> | boolean;
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
  form: FormGroup;
}

@Injectable()
export class CreatorGuard implements CanActivate {

  private store$: any;

  constructor(
    private router: Router,
    private db: DBService,
    private store: Store<AppState>,
    private creatorActions: CreatorActions
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {

    console.log(`Guarding the activation to ${route.url} ...`);

    return true || false;

  }

  canDeactivate(
    component: CanComponentDeactive,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    console.log(`Guarding the deactivation to ${route.url} ...`);

    return component['form'] ?
      this.db.save(component['doc']['id'], component.form.value)
        .then(res => {
          return true;
        })
        .catch(err => false) : true;
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
