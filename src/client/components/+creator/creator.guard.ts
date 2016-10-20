// Importables
import { ActivatedRoute } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { CanActivateChild } from '@angular/router';
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
}

@Injectable()
export class CanActivateArticle implements CanActivateChild {

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return Observable.of(true);
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
