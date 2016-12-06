// Importables
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TABS_DIRECTIVES } from './tabs';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    ...TABS_DIRECTIVES,
  ],
  declarations: [
    ...TABS_DIRECTIVES,
  ],
  providers: [
  ],
})
export class UIModule {
};
