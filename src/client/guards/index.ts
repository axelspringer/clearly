// Exportables
import { Type } from '@angular/core';

import { AuthGuard } from './auth.guard';

export const GUARDS: Array<Type<any>> = [
  AuthGuard,
];

export * from './auth.guard';
