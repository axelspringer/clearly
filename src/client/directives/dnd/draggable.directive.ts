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
import { DragImage } from './dnd.config';
import { DragDropService } from './dnd.service';
import { DndAbstractDirective } from './abstract.directive';
import {
  DragDropDefaults,
  DragDropEvent
} from './dnd.module';

@Directive({
  selector: '[dnd-draggable]'
})
export class DraggableDirective extends DndAbstractDirective {

  // is draggable?
  @Input('dnd-is-draggable') set draggable(value: boolean) {
    this.isDragEnabled = !!value;
  }

  // input draggable data
  @Input('dnd-drag-data') dragData: any;

  @Input('dnd-drop-zones') set dropzones(value: Array<string>) {
    this.dropZones = value;
  }

  @Input('dnd-allowed-effect') set effectallowed(value: string) {
    this.effectAllowed = value;
  }

  @Input('dnd-cursor-effect') set effectcursor(value: string) {
    this.effectCursor = value;
  }

  @Input() dragImage: string | DragImage | Function;


  @Input() cloneItem: boolean;


  @Output() onDragStart: EventEmitter<DragDropEvent> = new EventEmitter<DragDropEvent>();
  @Output() onDragEnd: EventEmitter<DragDropEvent> = new EventEmitter<DragDropEvent>();

  @Output('onDragSuccess') onDragSuccessCallback: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    elRef: ElementRef,
    dragDropService: DragDropService,
    changeRef: ChangeDetectorRef
  ) {

    super(elRef, dragDropService, changeRef);
    this._defaultCursor = this._el.style.cursor;
    this.isDragEnabled = true;
  }

  _onDragStartCallback(event: MouseEvent) {
    this.dragDropService.isDragged = true;
    this.dragDropService.dragData = this.dragData;
    this.dragDropService.onDragSuccessCallback = this.onDragSuccessCallback;
    this._el.classList.add(DragDropDefaults.onDragStartClass);
    this.onDragStart.emit({
      dragData: this.dragData,
      mouseEvent: event
    });
  }

  _onDragEndCallback(event: MouseEvent) {
    this.dragDropService.isDragged = false;
    this.dragDropService.dragData = null;
    this.dragDropService.onDragSuccessCallback = null;
    this._el.classList.remove(DragDropDefaults.onDragStartClass);
    this.onDragEnd.emit({
      dragData: this.dragData,
      mouseEvent: event
    });
  }
}
