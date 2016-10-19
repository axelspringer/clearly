// Importables
import { ActivatedRoute } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { CanActivate } from '@angular/router';
import { CanDeactivate } from '@angular/router';
import { CreatorActions } from './creator.actions';
import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';

// Components
import { AppState } from '../app';

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

    // return component['form'] ?
    //   this.db.save(component['doc']['id'], component.form.value)
    //     .then(res => {
    //       return true;
    //     })
    //     .catch(err => false) : true;
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
