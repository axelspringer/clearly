/* tslint:disable:max-line-length */
// Importables
import { ChangeDetectorRef } from '@angular/core';
import { DragDropDefaults } from './dnd.module';
import { DragDropService } from './dnd.service';
import { DragImage } from './dnd.config';
import { ElementRef } from '@angular/core';
import { Injectable } from '@angular/core';

// Directive
@Injectable()
export abstract class DndAbstractDirective {

  // drop
  public dropEnabled: boolean = false;
  public effectAllowed: string;
  public effectCursor: string;

  public allowDrop: (dropData: any) => boolean;
  public dropZones: string[] = [];

  public dragImage: string | DragImage | Function;
  public cloneItem: boolean = false;

   // private properties
  public _el: HTMLElement; // native ElementRef
  public _dragHelper: HTMLElement; // to clone an node
  public _defaultCursor: string;

  // let this control only from the class
  private _isDragEnabled: boolean = false;

  set isDragEnabled(enabled: boolean) {
    this._isDragEnabled = !!enabled;
    this._el.draggable = this._isDragEnabled;
  }

  get isDragEnabled(): boolean {
    return this._isDragEnabled;
  }

  constructor(
    elRef: ElementRef,
    public dragDropService: DragDropService,
    private changeRef: ChangeDetectorRef,
  ) {

    // get the element
    this._el = elRef.nativeElement;

    // drag & drop elements
    this._el.ondragenter = (event: Event) => {
      this._onDragEnter(event);
    };

    this._el.ondragover = (event: DragEvent) => {
      this._onDragOver(event);
      if (event.dataTransfer != null) {
        event.dataTransfer.dropEffect = DragDropDefaults.dropEffect.toString();
      }
      return false;
    };

    this._el.ondragleave = (event: Event) => {
      this._onDragLeave(event);
    };

    this._el.ondragstart = (event: DragEvent) => {
      // console.log('ondragstart', event.target);
      this._onDragStart(event);
      //
      if (event.dataTransfer != null) {
        event.dataTransfer.setData('text', '');
        // Change drag effect
        event.dataTransfer.effectAllowed = this.effectAllowed || DragDropDefaults.dragEffect;
        // // Change drag image
        // if (!_.isUndefined(this.dragImage)) {
        //   if (_.isString(this.dragImage)) {
        //     (<any>event.dataTransfer).setDragImage(createImage(<string>this.dragImage));
        //   } else if (_.isFunction(this.dragImage)) {
        //     (<any>event.dataTransfer).setDragImage(_.curry(<Function>this.dragImage));
        //   } else {
        //     let img: DragImage = <DragImage>this.dragImage;
        //     (<any>event.dataTransfer).setDragImage(img.imageElement, img.x_offset, img.y_offset);
        //   }
        // } else if (!_.isUndefined(this.config.dragImage)) {
        //   let dragImage: DragImage = this.config.dragImage;
        //   (<any>event.dataTransfer).setDragImage(dragImage.imageElement, dragImage.x_offset, dragImage.y_offset);
        // } else if (this.cloneItem) {
        //   this._dragHelper = <HTMLElement>this._el.cloneNode(true);
        //   this._dragHelper.classList.add('dnd-drag-item');
        //   this._dragHelper.style.position = "absolute";
        //   this._dragHelper.style.top = "0px";
        //   this._dragHelper.style.left = "-1000px";
        //   this._el.parentElement.appendChild(this._dragHelper);
        //   (<any>event.dataTransfer).setDragImage(this._dragHelper, event.offsetX, event.offsetY);
        // }
        // Change drag cursor
        if (this._isDragEnabled) {
          this._el.style.cursor = this.effectCursor ?
            this.effectCursor : DragDropDefaults.dragCursor;
        } else {
          this._el.style.cursor = this._defaultCursor;
        }
      }
    };
    this._el.ondragend = (event: Event) => {
      if (this._el.parentElement && this._dragHelper) {
        this._el.parentElement.removeChild(this._dragHelper);
      }
      // console.log('ondragend', event.target);
      this._onDragEnd(event);
      // Restore style of dragged element
      this._el.style.cursor = this._defaultCursor;
    };

    this._el.ondrop = (event: Event) => {
      this._onDrop(event);
    };

  }

  public detectChanges() {
    this.changeRef.markForCheck();
  }

  public _onDragEnterCallback(event: Event) {
    console.log(event);
  }
  public _onDragOverCallback(event: Event) {
    console.log(event);
  }
  public _onDragLeaveCallback(event: Event) {
    console.log(event);
  }
  public _onDropCallback(event: Event) {
    console.log(event);
  }

  public _onDragStartCallback(event: Event) {
    console.log(event);
  }
  public _onDragEndCallback(event: Event) {
    console.log(event);
  }

  private _onDragEnter(event: Event): void {
    if (this._isDropAllowed) {
      // event.preventDefault();
      this._onDragEnterCallback(event);
    }
  }

  private _onDragOver(event: Event) {
    if (this._isDropAllowed) {
      if (event.preventDefault) {
        event.preventDefault();
      }

      this._onDragOverCallback(event);
    }
  }

  private _onDragLeave(event: Event): void {
    if (this._isDropAllowed) {
      // event.preventDefault();
      this._onDragLeaveCallback(event);
    }
  }

  private _onDrop(event: Event): void {
    if (this._isDropAllowed) {
      if (event.preventDefault) {
        event.preventDefault();
      }

      if (event.stopPropagation) {
        event.stopPropagation();
      }

      this._onDropCallback(event);

      this.detectChanges();
    }
  }

  private get _isDropAllowed(): boolean {
    if (this.dragDropService.isDragged && this.dropEnabled) {
      // First, if `allowDrop` is set, call it to determine whether the
      // dragged element can be dropped here.
      if (this.allowDrop) {
        return this.allowDrop(this.dragDropService.dragData);
      }

      if (this.dropZones.length === 0 && this.dragDropService.allowedDropZones.length === 0) {
        return true;
      }
      for (let i: number = 0; i < this.dragDropService.allowedDropZones.length; i++) {
        let dragZone: string = this.dragDropService.allowedDropZones[i];
        if (this.dropZones.indexOf(dragZone) !== -1) {
          return true;
        }
      }
    }
    return false;
  }

  private _onDragStart(event: Event): void {
    if (this._isDragEnabled) {
      this.dragDropService.allowedDropZones = this.dropZones;
      this._onDragStartCallback(event);
    }
  }

  private _onDragEnd(event: Event): void {
    this.dragDropService.allowedDropZones = [];
    this._onDragEndCallback(event);
  }

}
