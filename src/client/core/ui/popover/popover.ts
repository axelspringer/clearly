/* tslint:disable no-input-rename max-line-length */
import { Component, HostListener } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { Input } from '@angular/core';
import { AfterViewChecked } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Renderer } from '@angular/core';
import * as _ from 'lodash';

import { isElementInViewport } from '../helpers';
import { isRightOffset } from '../helpers';
import { toPx } from '../helpers';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'ui-popover',
  styleUrls: ['./popover.scss'],
  templateUrl: './popover.html',
})
export class PopoverComponent implements AfterViewChecked {

  // private

  private _show: boolean = false;

  constructor(
    private _elRef: ElementRef,
    private _renderer: Renderer,
  ) {}

  // inputs

  @Input() public icon: string = null;

  // listeners
  @HostListener('window:resize', ['$event'])
  public onResize() {
    this.position();
  }

  // angular

  public ngAfterViewChecked() {
    this.position();
  }

  // public

  public get show() {
    return !this._show;
  }

  public set show(newState) {
    this._show = !newState;
  }

  public toggle() {
    this.show = !this.show;
  }

  public get contentElement(): HTMLElement {
    console.log(this._elRef);
    return _.first(this._elRef.nativeElement.getElementsByClassName('ui-popover-content')) as HTMLElement;
  }

  public get iconElement(): HTMLElement {
    return _.first(this._elRef.nativeElement.getElementsByTagName('ui-font-icon')) as HTMLElement;
  }

  public position() {
    if (!!this.show) {
      return;
    }
    const iconRect = this.iconElement.getBoundingClientRect();
    const contentRect = this.contentElement.getBoundingClientRect();
    if (!isElementInViewport(this.contentElement)) {
      this._renderer.setElementStyle(this.contentElement, 'left', toPx(isRightOffset(this.contentElement)
        ? (contentRect.width - iconRect.width) - 10
        : (-contentRect.width + iconRect.width) + 10,
      )); // could be refactored
      this._renderer.setElementClass(this.contentElement, 'align-left', !isRightOffset(this.contentElement));
      this._renderer.setElementClass(this.contentElement, 'align-right', isRightOffset(this.contentElement));
    }
  }

}
