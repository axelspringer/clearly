// Importables
import { AfterContentChecked, HostListener } from '@angular/core';
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
  @ViewChild('uiTabs') public uiTabs: ElementRef;
  @ViewChild('uiTab') public uiTab: ElementRef;

  @HostListener('window:resize', ['$event'])
  public onResize() {
    this._setHeight(this.uiTab.nativeElement, this.uiTabs.nativeElement);
  }

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
    // this._fixPos(this.uiTabs.nativeElement);
    this._setHeight(this.uiTab.nativeElement, this.uiTabs.nativeElement);
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

  // private
  public get _setHeight() {
    return (el, __?, ___?) => {
      const rect = __.getBoundingClientRect();
      const height = ___ || window.innerHeight;
      this._renderer.setElementStyle(el, 'height', `${height - rect.height - rect.top}px`);
    };
  }

  // public get _fixPos() {
  //   return (__) => {
  //     const rect = __.getBoundingClientRect();
  //     this._renderer.setElementStyle(__, 'top', `${rect.top}px`);
  //   };
  // }

}

