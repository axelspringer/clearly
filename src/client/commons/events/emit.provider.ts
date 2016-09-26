// Exportables
import { EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';

// Abstracts, classes, interfaces ...
export abstract class ComponentEvent { } // could inherit later from Evenr to capture in the browser

@Injectable()
export class EventEmitterProvider {

  private static emitters$: { [id: string]: EventEmitter<any>; } = {};

  static create(event: Object | string, isAsync?: boolean): EventEmitter<any> {
    const id = typeof event === 'string' ? event : event.constructor.name;
    if (!this.emitters$[id]) {
      this.emitters$[id] = new EventEmitter(); // EventEmitter -> Observable
    }
    this.log(id); return this.emitters$[id];
  }

  static get(event: Object | string, isAsync?: boolean): EventEmitter<any> { // harvest
    return this.create(event, isAsync);
  }

  static log(id: string): void {

    console.group(`Event: ${id}`);
    console.log(this.emitters$[id]);
    console.groupEnd();

  }

};
