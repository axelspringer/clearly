// Importables
import { Directive } from '@angular/core';
import { Input } from '@angular/core';

@Directive({
  selector: '[sgMyHighlight]',
})
export class HighlightDirective {

  @Input() public highlightColor: string;

}
