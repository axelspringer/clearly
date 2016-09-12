// Drag & Drop Module
import {
   NgModule,
   ModuleWithProviders
} from '@angular/core';
import { CommonModule } from '@angular/common';

// TODO@sdoell: move to module
import { DraggableDirective } from './draggable.directive';
import { DroppableDirective } from './droppable.directive';
import { DragDropService } from './dnd.service';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    DraggableDirective,
    DroppableDirective
  ],
  declarations: [
    DraggableDirective,
    DroppableDirective
  ],
  providers: [
    DragDropService
  ]
})
export class DndModule {}

// interfaces
export interface DragDropEvent {
  dragData: any;
  mouseEvent: MouseEvent;
}

export class DataTransferEffect {
  static COPY: string = 'copy';
  static LINK: string = 'link';
  static MOVE: string = 'move';
  static NONE: string = 'none';
}

export class DragDropDefaults {
  static onDragStartClass: string     = 'dnd-drag-start';
  static onDragEnterClass: string     = 'dnd-drag-enter';
  static onDragOverClass: string      = 'dnd-drag-over';
  static onSortableDragClass: string  = 'dnd-sortable-drag';

  static dragEffect: string = DataTransferEffect.COPY;
  static dropEffect: string = DataTransferEffect.COPY;
  static dragCursor: string = DataTransferEffect.MOVE;
  // public dragImage: DragImage;
}
