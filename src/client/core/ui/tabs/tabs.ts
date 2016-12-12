// Importables
import { AfterContentChecked } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { ContentChildren } from '@angular/core';
import { Input } from '@angular/core';
import { QueryList } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Renderer } from '@angular/core';

import { TabComponent } from './tab';
import { Group } from './group';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'ui-tabs',
  templateUrl: './tabs.html',
  styleUrls: ['./tabs.scss'],
  providers: [Group],
})
export class TabsComponent implements AfterContentChecked, AfterViewInit {

  // DOM

  @ContentChildren(TabComponent) public tabs: QueryList<TabComponent>;
  @ViewChild('uiTabsContainer') public uiTabsContainer: ElementRef;
  @ViewChild('uiTabs') public uiTabs: ElementRef;

  // input outputs

  @Input() set selectedTab(value: number) {
    this._selectedTab = value;
  }
  get selectedTab(): number {
    return this._selectedTab;
  }
  private _selectedTab: number = 0; // begin with no tab selected

  constructor(
    private _group: Group,
    private _renderer: Renderer,
  ) {
  }

  // angular

  public ngAfterViewInit(): void {
    const rect = this.uiTabsContainer.nativeElement.getBoundingClientRect();
    this._renderer.setElementStyle(this.uiTabsContainer.nativeElement, 'position', 'fixed');
    this._renderer.setElementStyle(this.uiTabsContainer.nativeElement, 'top', `${rect.top}px`);
    this._renderer.setElementStyle(this.uiTabs.nativeElement, 'padding-top', `${rect.height}px`);
  }

  public ngAfterContentChecked(): void {
    this.tabs.changes.subscribe(children => {
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

