// importables
import { AfterViewInit } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

// interfaces
import { IAppState } from '../app';
import { fromAppActions } from '../app';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'sg-boot',  // <sg-boot></sg-boot>
  styleUrls: ['./boot.component.scss'],
  templateUrl: './boot.component.html',
})
export class BootComponent implements OnInit, AfterViewInit {

  public message: BehaviorSubject<string> = new BehaviorSubject('COMPONENT.BOOT.MESSAGE.INIT');

  constructor(
    private _store: Store<IAppState>,
    private _location: Location,
    private _router: Router,
  ) {
  }

  public ngOnInit() {
    console.log(`Initializing 'BootComponent' ...`);
  }

  public ngAfterViewInit() {
    setTimeout(() => {
      this._store.dispatch(new fromAppActions.HasBootedAction());
      this.message.next('COMPONENT.BOOT.MESSAGE.READY');
      setTimeout(() => {
        this._location.replaceState('/');
        this._router.navigate(['']);
      }, 1000);
    }, 2500);
  }

}
