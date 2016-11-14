// Importables
import { ChangeDetectorRef } from '@angular/core';
import { Directive } from '@angular/core';
import { ElementRef } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Input } from '@angular/core';
import { Output } from '@angular/core';
import { DragImage } from './dnd.config';
import { DragDropService } from './dnd.service';
import { DndAbstractDirective } from './abstract.directive';
import { DragDropDefaults } from './dnd.module';
import { IDragDropEvent } from './dnd.module';

@Directive({
  selector: '[sgDndDraggable]',
})
export class DraggableDirective extends DndAbstractDirective {

  // is draggable?
  @Input('dnd-is-draggable') set draggable(value: boolean) {
    this.isDragEnabled = !!value;
  }

  // input draggable data
  @Input('dndDragData') public dragData: any;

  @Input('dnd-drop-zones') set dropzones(value: Array<string>) {
    this.dropZones = value;
  }

  @Input('dnd-allowed-effect') set effectallowed(value: string) {
    this.effectAllowed = value;
  }

  @Input('dnd-cursor-effect') set effectcursor(value: string) {
    this.effectCursor = value;
  }

  @Input() public dragImage: string | DragImage | Function;
  @Input() public cloneItem: boolean;ts

  @Output() public onDragStart: EventEmitter<IDragDropEvent> = new EventEmitter<IDragDropEvent>();
  @Output() public onDragEnd: EventEmitter<IDragDropEvent> = new EventEmitter<IDragDropEvent>();

  @Output('onDragSuccess') public onDragSuccessCallback: EventEmitter<any>
    = new EventEmitter<any>();

  constructor(
    elRef: ElementRef,
    dragDropService: DragDropService,
    changeRef: ChangeDetectorRef,
  ) {
    super(elRef, dragDropService, changeRef);
    this._defaultCursor = this._el.style.cursor;
    this.isDragEnabled = true;
  }

  public _onDragStartCallback(event: MouseEvent) {
    this.dragDropService.isDragged = true;
    this.dragDropService.dragData = this.dragData;
    this.dragDropService.onDragSuccessCallback = this.onDragSuccessCallback;
    this._el.classList.add(DragDropDefaults.onDragStartClass);
    this.onDragStart.emit({
      dragData: this.dragData,
      mouseEvent: event,
    });
  }

  public _onDragEndCallback(event: MouseEvent) {
    this.dragDropService.isDragged = false;
    this.dragDropService.dragData = null;
    this.dragDropService.onDragSuccessCallback = null;
    this._el.classList.remove(DragDropDefaults.onDragStartClass);
    this.onDragEnd.emit({
      dragData: this.dragData,
      mouseEvent: event,
    });
  }
}
