// Importables
import { Type } from '@angular/core';

// context
import { DFormComponent } from './dform.component';
import { DFormContextComponent } from './context';
import { DFormDynamicElementComponent } from './dform.element.component';
import { DFormVariantComponent } from './context';

// types
import { DFORM_TYPES_COMPONENTS } from './types';
import { DFORM_TYPES_TOKEN } from './dform.type';
import { DFormType } from './dform.type';

export * from './context';
export * from './dform.component.focus';
export * from './dform.component';
export * from './dform.element.abstract';
export * from './dform.element.component';
export * from './dform.element.events';
export * from './dform.element';
export * from './dform.service';
export * from './dform.type';

export const DFORM_TYPES_PROVIDER = {
  provide: DFORM_TYPES_TOKEN,
  useFactory: () => {
    return (type, option) => {
      return new DFormType(type, option);
    };
  },
};

export const DFORM_DIRECTIVES: Array<Type<any>> = [
  DFormComponent,
  DFormContextComponent,
  DFormDynamicElementComponent,
  DFormVariantComponent,

  ...DFORM_TYPES_COMPONENTS,
];
