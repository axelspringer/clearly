// importables
import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { ViewChild } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationStart } from '@angular/router';
import { NavigationEnd } from '@angular/router';
import { NavigationCancel } from '@angular/router';
import { ElementRef } from '@angular/core';

// compponents
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'sg-main',
  templateUrl: './main.component.html',
})
export class MainComponent implements OnInit {

  @ViewChild('menu') public menu;
  @ViewChild('progressBar') public progressBar;

  public opened = true;

  constructor(
    private _router: Router,
    private _el: ElementRef,
  ) {
  }

  public ngOnInit() {
    const nativeElement: HTMLElement = this._el.nativeElement;
    const parentElement: HTMLElement = nativeElement.parentElement;

    while (nativeElement.firstChild) {
      parentElement.insertBefore(nativeElement.firstChild, nativeElement);
    }
    parentElement.removeChild(nativeElement);
    this._router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.progressBar.start(25);
      }
      if (event instanceof NavigationEnd) {
        this.progressBar.complete();
      }
      if (event instanceof NavigationCancel) {
        this.progressBar.error();
      }
    });
  }

}
