/* tslint:disable no-input-rename */
import { Component } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { Renderer } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'ui-loading-bar',
  styleUrls: ['./loadingBar.scss'],
  templateUrl: './loadingBar.html',
})
export class LoadingBarComponent implements OnInit {

  private _progress = 0;
  private _height = 2;
  private _visible = true;
  private _timer = 500;
  private _interval = null;

  constructor(
    private _elRef: ElementRef,
    private _renderer: Renderer,
  ) { }

  // input

  @Input()
  public set progress(newProgress: number) {
    this._progress = newProgress || this._progress;
    this._setWidth(this._progress);
  }

  public get progress(): number {
    return this._progress;
  }

  @Input()
  public set height(newHeight: number) {
    this._height = newHeight;
    this._setHeight(this._height);
  }

  @Input()
  public set visible(newValue: boolean) {
    this._visible = newValue;
    this._setVisibility(this._visible);
  }

  public get visible() {
    return this._visible;
  }

  @Input()
  public set interval(newInterval: number) {
    this._interval = newInterval;
  }

  public get interval() {
    return this._interval;
  }

  // angular

  public ngOnInit() {
    this._setHeight(this._height);
  }

  // public

  public start(progress?: number) {
    this.stop();
    this.visible = true;
    this.progress = progress || this.progress;
    this._interval = setInterval(() => {
      this.progress++;
      if (this.progress === 100) {
        this.complete();
      }
    }, this._timer);
  }

  public stop() {
    if (this._interval) {
      clearInterval(this._interval);
    }
  }

  public reset() {
    this.stop();
    this.progress = 0;
  }

  public error() {
    this.progress = 100;
    this.stop();
    this._setColor('rgba(208, 2, 27, 1)');
  }

  public complete() {
    this.progress = 100;
    this.stop();
    setTimeout(() => { // TODO@sdoell: refactor to other pattern
      this.visible = false;
      setTimeout(() => {
        this.progress = 0;
      }, 1000);
    }, 1000);
  }

  // private

  private get _setWidth() {
    return (__: number) => {
      this._renderer.setElementStyle(this._progressBar, 'width', `${this._progress}%`);
    };
  }

  private get _setHeight() {
    return (__: number) => {
      this._renderer.setElementStyle(this._elRef.nativeElement, 'height', '${__}px');
    };
  }

  private get _setVisibility() {
    return (__: boolean) => {
      this._renderer.setElementStyle(this._progressBar, 'opacity', this._visible ? '1' : '0');
    };
  }

  private get _progressBar() {
    return this._elRef.nativeElement.querySelector('.ui-loading-bar-progress');
  }

  private get _setColor() {
    return (__: string) => {
      this._renderer.setElementStyle(this._progressBar, 'background-color', __);
    };
  }

}
