// importables
import { Injectable } from '@angular/core';

// components
import { OverlayContainer } from './container';
import { OverlayRef } from './ref';

@Injectable()
export class Overlay {

  constructor(
    private _overlayContainer: OverlayContainer,
  ) {}

  // public

  public create(): OverlayRef {
    return this._createOverlayRef();
  }

  // private

  private _createOverlayRef(): OverlayRef {
    return new OverlayRef(this._createOverlayContainer());
  }

  private _createOverlayContainer(): HTMLElement {
    return this._overlayContainer.element;
  }

};
