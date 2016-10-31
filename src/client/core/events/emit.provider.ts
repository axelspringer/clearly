// Exportables
import { EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';

// Abstracts, classes, interfaces ...
export abstract class Event {

  private _payload: any;

  constructor(payload: any = {}) {
    this._payload = payload;
  }

  get payload() {
    return this._payload;
  }

}; // could inherit later from Evenr to capture in the browser

@Injectable()
export class EventEmitProvider {

  public static connect(event: Object, isAsync?: boolean): EventEmitter<any> {
    const id = typeof event === 'string' ? event : event.constructor.name;
    if (!this.emitters$[id]) {
      this.emitters$[id] = new EventEmitter(); // EventEmitter -> Observable
    }
    this.log(id); return this.emitters$[id];
  }

  public static log(id: string): void {
    console.group(`Event: ${id}`);
    console.log(this.emitters$[id]);
    console.groupEnd();
  }

  private static emitters$: { [id: string]: EventEmitter<any>; } = {};

};
