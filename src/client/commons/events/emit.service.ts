// Importables
import {
  EventEmitter,
  Injectable
} from '@angular/core';

// Abstracts, classes, interfaces ...
export abstract class ComponentEvent {} // could inherit later from Evenr to capture in the browser

@Injectable()
export class EmitterService {

  private static _emitters: { [id: string]: EventEmitter<any>; } = {};

  static create(event: Object | String, isAsync?: boolean): EventEmitter<any> {
    const id = typeof event === 'string' ? event : event.constructor.name;
    if ( ! this._emitters[id] ) {
      this._emitters[id] = new EventEmitter();
    }
    this.log(id); return this._emitters[id];
  }

  static get(event: Object | String, isAsync?: boolean): EventEmitter<any> {
    return this.create(event, isAsync);
  }

  static log(ID: string) {

    console.group(`Event: ${ID}`);
    console.log(this._emitters[ID]);
    console.groupEnd();

  }

};
