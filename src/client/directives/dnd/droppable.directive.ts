// Importables
import {
  ChangeDetectorRef,
  Directive,
  ElementRef,
  EventEmitter,
  Injectable,
  Input,
  Output
} from '@angular/core';

// Components
import { DndAbstractDirective } from './abstract.directive';
import { DragDropDefaults } from './dnd.module';
import { DragDropService } from './dnd.service';

// Interfaces
import { DragDropEvent } from './dnd.module';

@Directive({
  selector: '[dnd-droppable]'
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
  @Output() onDropSuccess: EventEmitter<DragDropEvent> = new EventEmitter<DragDropEvent>();
  @Output() onDragEnter: EventEmitter<DragDropEvent> = new EventEmitter<DragDropEvent>();
  @Output() onDragOver: EventEmitter<DragDropEvent> = new EventEmitter<DragDropEvent>();
  @Output() onDragLeave: EventEmitter<DragDropEvent> = new EventEmitter<DragDropEvent>();

  constructor(
    elRef: ElementRef,
    dragDropService: DragDropService,
    changeRef: ChangeDetectorRef) {

    super(elRef, dragDropService, changeRef);

    this.dropEnabled = true; // by default enable dro
  }

  _onDragEnterCallback(event: MouseEvent) {
    if (this.dragDropService.isDragged) {
      this._el.classList.add(DragDropDefaults.onDragEnterClass);
      this.onDragEnter.emit({
        dragData: this.dragDropService.dragData,
        mouseEvent: event
      });
    }
  }

  _onDragOverCallback(event: MouseEvent) {
    if (this.dragDropService.isDragged) {
      this._el.classList.add(DragDropDefaults.onDragOverClass);
      this.onDragOver.emit({
        dragData: this.dragDropService.dragData, mouseEvent: event
      });
    }
  };

  _onDragLeaveCallback(event: MouseEvent) {
    if (this.dragDropService.isDragged) {
      this._el.classList.remove(DragDropDefaults.onDragOverClass);
      this._el.classList.remove(DragDropDefaults.onDragEnterClass);
      this.onDragLeave.emit({
        dragData: this.dragDropService.dragData,
        mouseEvent: event
      });
    }
  };

  _onDropCallback(event: MouseEvent) {
    if (this.dragDropService.isDragged) {
      this.onDropSuccess.emit({ dragData: this.dragDropService.dragData, mouseEvent: event });
      if (this.dragDropService.onDragSuccessCallback) {
        this.dragDropService.onDragSuccessCallback.emit({
          dragData: this.dragDropService.dragData, mouseEvent: event
        });
      }
      this._el.classList.remove(DragDropDefaults.onDragOverClass);
      this._el.classList.remove(DragDropDefaults.onDragEnterClass);
    }
  }
}
