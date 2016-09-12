import { DataTransferEffect } from './dnd.module';

export class DragImage {
  constructor(
    public imageElement: string | HTMLElement,
    public x_offset: number = 0,
    public y_offset: number = 0) {
    if (_.isString(this.imageElement)) {
      // Create real image from string source
      let imgScr: string = <string>this.imageElement;
      this.imageElement = new HTMLImageElement();
      (<HTMLImageElement>this.imageElement).src = imgScr;
    }
  }
}
