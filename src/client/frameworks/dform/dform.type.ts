// imports
import { OpaqueToken } from '@angular/core';

// components
// import { dform } from './dform.element';
import { DFormMetaText } from './types';

// interface
import { IDFormType } from './dform.interface';

// put here to avoid side-effects
export class DFormType implements IDFormType {

  public static types = {
    metaText: DFormMetaText,
  };

  private _type: string = null;
  private _class: Object = null;
  private _options: any = {};

  constructor(type: string, options) {
    this._type = type;
    this._options = options || this._options;
  }

  public get type() {
    return this._type;
  }

  public get class() {
    return this._class;
  }

  public toClass() {
    if (!this._class) {
      this._class = new DFormType.types[this._type](this._options);
    }
    return this._class;
  }

};

export const DFORM_TYPES_TOKEN = new OpaqueToken('DFORM_TYPES');
