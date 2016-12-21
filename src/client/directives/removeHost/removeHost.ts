// import
import { Directive } from '@angular/core';
import { ElementRef } from '@angular/core';
import { OnInit } from '@angular/core';

@Directive({
  selector: '[sgRemoveHost]',
})
export class RemoveHostDirective implements OnInit {

  constructor (
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
  }
};
