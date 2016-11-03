// Importables
import { Injectable } from '@angular/core';
import { Injector } from '@angular/core';

@Injectable()
export class QuickWrite {
  constructor(
    private _injector: Injector,
  ) {}
};

// Exportables
export * from './quickWrite.component';
