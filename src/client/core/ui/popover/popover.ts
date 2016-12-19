/* tslint:disable no-input-rename max-line-length */
import { AfterViewChecked } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { ElementRef } from '@angular/core';
import { HostListener } from '@angular/core';
import { Input } from '@angular/core';
import { Renderer } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

import { FontIconComponent } from '../icn/font';
import { isElementInViewport } from '../helpers';
import { isRightOffset } from '../helpers';
import { Overlay } from '../overlay';
import { OverlayRef } from '../overlay';
import { toPx } from '../helpers';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'ui-popover',
  styleUrls: ['./popover.scss'],
  templateUrl: './popover.html',
})
export class PopoverComponent implements AfterViewChecked {

  // Dom
  @ViewChild('uiPopoverContent') public uiPopoverContent: ElementRef;
  @ViewChild('uiPopoverIcon') public uiPopoverIcon: FontIconComponent;

  // inputs

  @Input() public icon: string = null;

  // private

  private _show: boolean = false;
  private _overlayRef: OverlayRef = null;

  constructor(
    private _renderer: Renderer,
    private _overlay: Overlay,
  ) {
    this._overlayRef = this._overlay.create();
  }

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
    return this.uiPopoverContent.nativeElement;
  }

  public get iconElement(): HTMLElement {
    return this.uiPopoverIcon.elRef.nativeElement;
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
