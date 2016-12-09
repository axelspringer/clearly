/* tslint:disable max-classes-per-file no-input-rename */
import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, BehaviorSubject } from 'rxjs';
import { OnInit } from '@angular/core';
import { TranslateService } from 'ng2-translate';

// Components
import { IAppState } from '../app';
import { getAppStatus } from '../app';
import { EventEmitProvider } from '../../core';
import { Event } from '../../core';

export class StatusTitleUpdate extends Event {}

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
export class StatusComponent implements OnInit {

  // properties

  public title = new BehaviorSubject(null);

  // constructor

  constructor(
    private _store: Store<IAppState>,
    private _translate: TranslateService,
  ) {
  }

  // inputs

  // ouputs

  // angular

  public ngOnInit() {
    EventEmitProvider
      .connect(StatusTitleUpdate.prototype.constructor.name)
      .subscribe(this.title);
  }

  // public
  public get subject(): Observable<{}> {
    return Observable.combineLatest(
      this._store.let(getAppStatus()).distinctUntilChanged(),
      this.title,
    )
    .switchMap(arr => arr[0] !== 0
      ? this._translate.get(`COMPONENT.STATUS.TYPE.${arr[0]}`)
      : this.title);
  }

}
