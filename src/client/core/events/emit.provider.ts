// Importables
import { EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';

// Abstracts, classes, interfaces ...
export abstract class Event {

  constructor(
    private __payload: any = {},
  ) { }

  public get payload() {
    return this.__payload;
  }

};

@Injectable()
export class EventEmitProvider {

  // public

  public static connect(event: Object): EventEmitter<any> {
    const id = typeof event === 'string'
      ? event
      : event.constructor.name;
    if (!this.__emitters$[id]) {
      this.__emitters$[id] = new EventEmitter(); // EventEmitter -> Observable
    }
    this.log(id); return this.__emitters$[id];
  }

  public static log(id: string): void {
    console.group(`Event: ${id}`);
    console.log(this.__emitters$[id]);
    console.groupEnd();
  }

  // private

  private static __emitters$: { [id: string]: EventEmitter<any>; } = {};

};
