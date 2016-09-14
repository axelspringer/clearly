// User effects
import { Injectable } from '@angular/core';
import {
  Actions,
  Effect
} from '@ngrx/effects';
import { DBService } from '../services';
import { DBConfig } from '../config';

@Injectable()
export class AppEffects {

  @Effect() openDB = this.db.open(DBConfig.NAME)
    .filter(() => false);

  constructor(
    private db: DBService
  ) { }

}
