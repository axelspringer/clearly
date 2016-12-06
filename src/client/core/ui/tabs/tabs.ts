import { AfterContentChecked } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { ContentChildren } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { forwardRef } from '@angular/core';
import { Input } from '@angular/core';
import { Output } from '@angular/core';
import { QueryList } from '@angular/core';
import { ViewContainerRef } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { Injectable } from '@angular/core';

import { Tab } from './tab';
import { Group } from './group';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None, // so that we address the view from a root
  selector: 'ui-tabs',
  templateUrl: './tabs.html',
  styleUrls: ['./tabs.scss'],
  providers: [Group],
})
export class Tabs implements AfterContentChecked {

  public get tabs() {
    return this._tabs;
  }

  // input outputs

  @Input() set selectedTab(value: number) {
    this._selectedTab = value;
  }
  get selectedTab(): number {
    return this._selectedTab;
  }
  @Output() public onSelectTab = new EventEmitter();
  private _selectedTab: number = 0; // begin with no tab selected

  // DOM

  @ContentChildren(Tab) private _tabs: QueryList<Tab>;

  constructor(
    private _viewRef: ViewContainerRef,
    private _group: Group,
  ) {
    console.log('tabs', this._viewRef);
  }

  // angular

  public ngAfterContentChecked(): void {
    this._tabs.changes.subscribe(children => {
      children.forEach((tab: Tab, index: number) => {
        if (tab.tabSelected) {
          this.selectedTab = index;
        }
      });
    });
  }

  // public

  public selectTab(newTab: number) {
    this._group.selectTab(newTab);
  }

}

