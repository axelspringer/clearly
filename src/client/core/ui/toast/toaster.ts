// Importables
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as _ from 'lodash';

// interface
import { Toasty } from './interface';

@Injectable()
export class Toaster {

  // properties
  public toasties: BehaviorSubject<Toasty> = new BehaviorSubject(null);
  private _queue: Toasty[] = [];

  // public

  public push(toasty: Toasty) {
    this._queue.unshift(toasty);
    this.next();
  }

  public pop() {
    this._queue.shift();
    this.next();
  }

  public next() {
    this.toasties.next(_.first(this._queue));
  }

};
