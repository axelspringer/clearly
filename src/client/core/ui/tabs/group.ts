import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Tab } from './tab';

@Injectable()
export class Group {

  private _tabs: Tab[] = [];
  private _tab: BehaviorSubject<Tab> = new BehaviorSubject(null);

  public addTab(tab: Tab) {
    return this._tabs.push(tab); // return length
  }

  public selectTab(tabIndex: number) {
    this._tab.next(this._tabs[tabIndex]);
  }

  public get selectedTab () {
    return this._tab.asObservable();
  }

};
