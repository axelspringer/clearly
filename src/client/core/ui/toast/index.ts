// imports
import { Type } from '@angular/core';

// componts
import { ToastComponent } from './toast';
import { Toaster } from './toaster';

// directives
export const TOAST_DIRECTIVES: Array<Type<any>> = [
  ToastComponent,
];

// providers
export const TOAST_PROVIDERS: Array<Type<any>> = [
  Toaster,
];

export * from './interface';
export * from './toaster';
