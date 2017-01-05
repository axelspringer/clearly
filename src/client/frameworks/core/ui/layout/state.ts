// imports
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SideNav {

  // properties

  public opened: BehaviorSubject<boolean>; // default to false
  private _opened = false;

  // public

  constructor() {
    this.opened = new BehaviorSubject(this._opened); // default to false
  }

  public open() {
    this._opened = true;
    this._update();
  }

  public close() {
    this._opened = false;
    this._update();
  }

  public toggle() {
    this._opened = !this._opened;
    this._update();
  }

  private _update() {
    this.opened.next(this._opened);
  }

};
