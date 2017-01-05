/* tslint:disable max-line-length no-input-rename max-classes-per-file */
import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { OnInit } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Renderer } from '@angular/core';

// components
import { SideNav } from './state';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'ui-sidenav',
  template: '<ng-content></ng-content>',
})
export class SideNavComponent implements OnInit {

  private sup: Subscription;

  constructor(
    private _sideNav: SideNav,
    private _elRef: ElementRef,
    private _renderer: Renderer,
  ) {}

  public ngOnInit() {
    this.sup = this._sideNav.opened
      .subscribe(opened => {
        if (opened) {
          this._renderer.setElementStyle(this._elRef.nativeElement, 'visibility', 'inherit');
        }
        if (!opened) {
          this._renderer.setElementStyle(this._elRef.nativeElement, 'visibility', 'hidden');
        }
      });
  }

}
