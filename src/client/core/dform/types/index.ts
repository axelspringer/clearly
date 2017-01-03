// imports
import { Type } from '@angular/core';

// components
import { DFormMetaTextComponent } from './metaText';
import { DFormDropDownComponent } from './dropDown';

// types
export const DFORM_TYPES_COMPONENTS: Array<Type<any>> = [
  DFormMetaTextComponent,
  // DFormContextComponent,
  DFormDropDownComponent,
  // DFormDynamicElementComponent,
  // DFormMainTextComponent,
  // DFormMetaTextComponent,
  // DFormPictureComponent,
  // DFormSocialVideoComponent,
  // DFormTextComponent,
  // DFormVariantComponent,
];

// exports
// export * from './checkBox';
// export * from './dropDown';
// export * from './mainText';
export * from './metaText';
// export * from './picture';
// export * from './socialVideo';
// export * from './text';
// export * from './textarea';
// export * from './unknown';
