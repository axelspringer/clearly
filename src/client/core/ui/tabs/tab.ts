/* tslint:disable no-input-rename */
import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';

import { Group } from './group';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ui-tab',
  templateUrl: './tab.html',
})
export class Tab implements OnInit {

  @Input('label') public tabLabel = '';
  @Input('selected') public tabSelected = null;

  public showTab: Observable<boolean>;

  constructor(
    private _group: Group,
  ) {
    this._group.addTab(this);
  }

  // angular

  public ngOnInit() {
    this.showTab = this._group.selectedTab
      .map(tab => Object.is(tab, this));
  }

}
