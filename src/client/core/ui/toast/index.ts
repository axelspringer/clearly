// imports
import { Type } from '@angular/core';

// componts
import { ToastComponent } from './toast';

// exports
export const TOAST_DIRECTIVES: Array<Type<any>> = [
  ToastComponent,
];
export * from './interface';
export * from './toaster';
