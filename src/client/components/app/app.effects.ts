// Importables
import {
  Injectable,
  OnDestroy
} from '@angular/core';
import {
  Actions,
  Effect,
  mergeEffects
} from '@ngrx/effects';
import { Subscription } from 'rxjs';
import {
  Action,
  Store
} from '@ngrx/store';

// Components
import { DBService } from '../../services';
import { DBConfig } from '../../config';

@Injectable()
export class AppEffects implements OnDestroy {

  subscription: Subscription;

  @Effect() openDB = this.db.open(DBConfig.NAME)
    .filter(() => false);

  constructor(
    private db: DBService
  ) {}

  ngOnDestroy() {

  }

}

export default [
  AppEffects
];

