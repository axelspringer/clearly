// Exportables
import { Type } from '@angular/core';

import { AuthGuard } from './auth.guard';
import { BootGuard } from './boot.guard';

export const GUARDS: Array<Type<any>> = [
  AuthGuard,
  BootGuard,
];

export * from './auth.guard';
export * from './boot.guard';
