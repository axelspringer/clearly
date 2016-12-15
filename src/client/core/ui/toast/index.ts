import { Type } from '@angular/core';

import { ToastComponent } from './toast';
import { Toasty } from './toast';
import { TOASTY_TYPE } from './toast';

export const TOAST_DIRECTIVES: Array<Type<any>> = [
  ToastComponent,
];

export { Toasty };
export { TOASTY_TYPE };
