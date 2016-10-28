import { Directive } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Input } from '@angular/core';
import { Renderer } from '@angular/core';

@Directive({
  selector: '[myHighlight]',
})
export class HighlightDirective {

  @Input() public highlightColor: string;

  private _defaultColor = 'red';

  constructor(
    private el: ElementRef,
    private renderer: Renderer,
  ) {
  }

}
