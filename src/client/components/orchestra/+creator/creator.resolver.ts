// Importables
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Resolve
} from '@angular/router';
import { Observable } from 'rxjs';

// Components
import { DBService } from '../../../services';

@Injectable()
export class CreatorResolver implements Resolve<DBService> {

  constructor(
    private db: DBService
  ) {

  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any>|Promise<any>|any {
    return this.db.create();
  }

}
