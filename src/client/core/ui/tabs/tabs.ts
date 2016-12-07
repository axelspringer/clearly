import { AfterContentChecked } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { ContentChildren } from '@angular/core';
import { Input } from '@angular/core';
import { QueryList } from '@angular/core';

import { TabComponent } from './tab';
import { Group } from './group';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ui-tabs',
  templateUrl: './tabs.html',
  styleUrls: ['./tabs.scss'],
  providers: [Group],
})
export class TabsComponent implements AfterContentChecked {

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
  private _selectedTab: number = 0; // begin with no tab selected

  // DOM

  @ContentChildren(TabComponent) private _tabs: QueryList<TabComponent>;

  constructor(
    private _group: Group,
  ) {
  }

  // angular

  public ngAfterContentChecked(): void {
    this._tabs.changes.subscribe(children => {
      children.forEach((tab: TabComponent, index: number) => {
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

