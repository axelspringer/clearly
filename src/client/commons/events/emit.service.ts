import {
  EventEmitter,
  Injectable
} from '@angular/core';

@Injectable()
export class EmitterService {

  private static _emitters: { [ID: string]: EventEmitter<any> } = {};

  static get(ID: string): EventEmitter<any> {

    if (!this._emitters[ID]) {
      this._emitters[ID] = new EventEmitter();
    }
    this.log(ID); return this._emitters[ID];

  }

  static log(ID: string) {

    console.group(`Event: ${ID}`);
    console.log(this._emitters[ID]);
    console.groupEnd();

  }

};
