import { Type } from '@angular/core';

import { OverlayContainer } from './container';
import { Overlay } from './overlay';

export const OVERLAY_PROVIDERS: Array<Type<any>> = [
  OverlayContainer,
  Overlay,
];

export * from './overlay';
export * from './ref';
