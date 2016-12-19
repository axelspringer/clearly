/* tslint:disable no-input-rename */
import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'ui-loading-bar',
  styleUrls: ['./loadingBar.scss'],
  templateUrl: './loadingBar.html',
})
export class LoadingBarComponent {

  private _progress = 0;
  private _timer = 500;
  private _interval = null;

  // input

  @Input()
  public set progress(newProgress: number) {
    this._progress = newProgress || this._progress;
  }

  public get progress(): number {
    return this._progress;
  }

  @Input()
  public set interval(newInterval: number) {
    this._interval = newInterval;
  }

  public get interval() {
    return this._interval;
  }

  // public

  public start(progress?: number) {
    this.stop();
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
  }

  public complete() {
    this.progress = 100;
    this.stop();
  }

}
