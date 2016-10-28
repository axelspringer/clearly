// import { DataTransferEffect } from './dnd.module';
import { isString } from 'lodash';

export class DragImage {
  constructor(
    public imageElement: string | HTMLElement,
    public xOffset: number = 0,
    public yOffset: number = 0) {
    if (isString(this.imageElement)) {
      // Create real image from string source
      let imgScr: string = <string> this.imageElement;
      this.imageElement = new HTMLImageElement();
      (<HTMLImageElement> this.imageElement).src = imgScr;
    }
  }
}
