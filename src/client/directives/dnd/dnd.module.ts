// Drag & Drop Module
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// TODO@sdoell: move to module
import { DraggableDirective } from './draggable.directive';
import { DroppableDirective } from './droppable.directive';
import { DragDropService } from './dnd.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    DraggableDirective,
    DroppableDirective,
  ],
  declarations: [
    DraggableDirective,
    DroppableDirective,
  ],
  providers: [
    DragDropService,
  ],
})
export class DndModule {}

// interfaces
export interface IDragDropEvent {
  dragData: any;
  mouseEvent: MouseEvent;
}

export class DataTransferEffect {
  public static COPY: string = 'copy';
  public static LINK: string = 'link';
  public static MOVE: string = 'move';
  public static NONE: string = 'none';
}

export class DragDropDefaults {
  public static onDragStartClass: string     = 'dnd-drag-start';
  public static onDragEnterClass: string     = 'dnd-drag-enter';
  public static onDragOverClass: string      = 'dnd-drag-over';
  public static onSortableDragClass: string  = 'dnd-sortable-drag';

  public static dragEffect: string = DataTransferEffect.COPY;
  public static dropEffect: string = DataTransferEffect.COPY;
  public static dragCursor: string = DataTransferEffect.MOVE;
  // public dragImage: DragImage;
}
