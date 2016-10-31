import { EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';
import { IDragDropEvent } from './dnd.module';

@Injectable()
export class DragDropService {
  public allowedDropZones: Array<string> = [];
  public onDragSuccessCallback: EventEmitter<IDragDropEvent>;
  public dragData: any;
  public isDragged: boolean;
}
