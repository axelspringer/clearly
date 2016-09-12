import {
  ElementRef,
  EventEmitter,
  Injectable
} from '@angular/core';

import { DragDropEvent } from './dnd.module';

@Injectable()
export class DragDropService {
  allowedDropZones: Array<string> = [];
  onDragSuccessCallback: EventEmitter<DragDropEvent>;
  dragData: any;
  isDragged: boolean;
}
