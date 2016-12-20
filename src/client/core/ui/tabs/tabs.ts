// Importables
// import { AfterContentChecked } from '@angular/core';
import { HostListener } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { ContentChildren } from '@angular/core';
import { QueryList } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Renderer } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OnInit } from '@angular/core';
import { AfterContentChecked } from '@angular/core';
// import { OnInit } from '@angular/core';

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
export class TabsComponent implements AfterViewInit, AfterContentChecked, OnInit {

  // dom

  @ContentChildren(TabComponent) public _tabs: QueryList<TabComponent>;
  @ViewChild('uiTabs') public uiTabs: ElementRef;
  @ViewChild('uiTab') public uiTab: ElementRef;

  public tabs: BehaviorSubject<any> = new BehaviorSubject([]);
  public selectedTab: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(
    private _group: Group,
    private _renderer: Renderer,
  ) {
  }

  @HostListener('window:resize', ['$event'])
  public onResize() {
    this._setHeight(this.uiTab.nativeElement, this.uiTabs.nativeElement);
  }

// angular

  public ngOnInit() {
    this._group.selectedTab.subscribe(this.selectedTab);
  }

  public ngAfterViewInit(): void {
    // this._fixPos(this.uiTabs.nativeElement);
    this.tabs.next(this._groupBy(this._tabs));
  }

  public ngAfterContentChecked(): void {
    this._setHeight(this.uiTab.nativeElement, this.uiTabs.nativeElement);
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

  public get _groupBy() {
    return (tabs) => {
      const groups = {};
      tabs.forEach(tab => groups[tab['tabGroup']] = [].concat(groups[tab['tabGroup']] || [], tab));
      return Object.keys(groups).map(key => ({ key, tabs: groups[key] }));
    };
  }

}

