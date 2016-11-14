// Importables
import { ChangeDetectorRef } from '@angular/core';
import { Directive } from '@angular/core';
import { ElementRef } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Input } from '@angular/core';
import { Output } from '@angular/core';

// Components
import { DndAbstractDirective } from './abstract.directive';
import { DragDropDefaults } from './dnd.module';
import { DragDropService } from './dnd.service';

// Interfaces
import { IDragDropEvent } from './dnd.module';

@Directive({
  selector: '[sgDndDroppable]',
})
export class DroppableDirective extends DndAbstractDirective {

  // droppable?
  @Input('dnd-is-droppable') set droppable(value: boolean) {
    this.dropEnabled = !!value;
  }

  @Input('dnd-allow-drop') set allowdrop(value: (dropData: any) => boolean) {
    this.allowDrop = value;
  }

  // allowed zones
  @Input('dnd-drop-zones') set dropzones(value: Array<string>) {
    this.dropZones = value;
  }

  // limit the effect
  @Input('dnd-allowed-effect') set effectallowed(value: string) {
    this.effectAllowed = value;
  }

  // cursor
  @Input('dnd-cursor-effect') set effectcursor(value: string) {
    this.effectCursor = value;
  }

  // subscrible events
  @Output() public onDropSuccess: EventEmitter<IDragDropEvent> = new EventEmitter<IDragDropEvent>();
  @Output() public onDragEnter: EventEmitter<IDragDropEvent> = new EventEmitter<IDragDropEvent>();
  @Output() public onDragOver: EventEmitter<IDragDropEvent> = new EventEmitter<IDragDropEvent>();
  @Output() public onDragLeave: EventEmitter<IDragDropEvent> = new EventEmitter<IDragDropEvent>();

  constructor(
    elRef: ElementRef,
    dragDropService: DragDropService,
    changeRef: ChangeDetectorRef) {

    super(elRef, dragDropService, changeRef);

    this.dropEnabled = true; // by default enable dro
  }

  public _onDragEnterCallback(event: MouseEvent) {
    if (this.dragDropService.isDragged) {
      this._el.classList.add(DragDropDefaults.onDragEnterClass);
      this.onDragEnter.emit({
        dragData: this.dragDropService.dragData,
        mouseEvent: event,
      });
    }
  }

  public _onDragOverCallback(event: MouseEvent) {
    if (this.dragDropService.isDragged) {
      this._el.classList.add(DragDropDefaults.onDragOverClass);
      this.onDragOver.emit({
        dragData: this.dragDropService.dragData, mouseEvent: event,
      });
    }
  };

  public _onDragLeaveCallback(event: MouseEvent) {
    if (this.dragDropService.isDragged) {
      this._el.classList.remove(DragDropDefaults.onDragOverClass);
      this._el.classList.remove(DragDropDefaults.onDragEnterClass);
      this.onDragLeave.emit({
        dragData: this.dragDropService.dragData,
        mouseEvent: event,
      });
    }
  };

  public _onDropCallback(event: MouseEvent) {
    if (this.dragDropService.isDragged) {
      this.onDropSuccess.emit({ dragData: this.dragDropService.dragData, mouseEvent: event });
      if (this.dragDropService.onDragSuccessCallback) {
        this.dragDropService.onDragSuccessCallback.emit({
          dragData: this.dragDropService.dragData, mouseEvent: event,
        });
      }
      this._el.classList.remove(DragDropDefaults.onDragOverClass);
      this._el.classList.remove(DragDropDefaults.onDragEnterClass);
    }
  }
}
