import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer
} from '@angular/core';

@Directive({
  selector: '[myHighlight]'
})
export class Highlight {

  @Input('myHighlight') highlightColor: string;

  private _defaultColor = 'red';

  constructor(
    private el: ElementRef,
    private renderer: Renderer
  ) {
    console.log('HIGHTLIGHT');
  }

}
