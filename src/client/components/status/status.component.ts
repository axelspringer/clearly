/* tslint:disable no-input-rename */
import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

// Components
import { IAppState } from '../app';
import { getAppStatus } from '../app';

export enum StatusComponentType {
  IDLE,
  LOADING,
  SAVING,
  ERROR,
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'sg-status', // <sg-status></sg-status>
  styleUrls: ['./status.component.scss'],
  templateUrl: './status.component.html',
})
export class StatusComponent {

  constructor(
    private _store: Store<IAppState>,
  ) {

  }

  // inputs

  // ouputs

  // angular

  // public
  public get title(): Observable<string> {
    return this._store.let(getAppStatus())
      .distinctUntilChanged()
      .map(type => `COMPONENT.STATUS.TYPE.${type}`);
  }

}
