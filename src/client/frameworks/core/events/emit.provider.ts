/* tslint:disable: max-classes-per-file */
// Importables
import { EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';

@Injectable()
export class EventEmitProvider {
  // public
  public static connect(event: Object): EventEmitter<any> {
    const id = typeof event === 'string'
      ? event
      : event.constructor.name;
    if (!this._emitters$[id]) {
      this._emitters$[id] = new EventEmitter(); // EventEmitter -> Observable
    }
    this.log(id); return this._emitters$[id];
  }

  public static log(id: string): void {
    console.group(`Event: ${id}`);
    console.log(this._emitters$[id]);
    console.groupEnd();
  }

  // private

  private static _emitters$: { [id: string]: EventEmitter<any>; } = {};

};
