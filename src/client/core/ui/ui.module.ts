// Importables
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { BUTTON_DIRECTIVES } from './button';
import { ICON_DIRECTIVES } from './icn';
import { LABEL_DIRECTIVES } from './label';
import { LAYOUT_DIRECTIVES } from './layout';
import { TABS_DIRECTIVES } from './tabs';
import { TOOLBAR_DIRECTIVES } from './toolbar';
import { LOADINGBAR_DIRECTIVES } from './loadingBar';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    ...BUTTON_DIRECTIVES,
    ...ICON_DIRECTIVES,
    ...LABEL_DIRECTIVES,
    ...LAYOUT_DIRECTIVES,
    ...TABS_DIRECTIVES,
    ...TOOLBAR_DIRECTIVES,
    ...LOADINGBAR_DIRECTIVES,
  ],
  declarations: [
    ...BUTTON_DIRECTIVES,
    ...ICON_DIRECTIVES,
    ...LABEL_DIRECTIVES,
    ...LAYOUT_DIRECTIVES,
    ...TABS_DIRECTIVES,
    ...TOOLBAR_DIRECTIVES,
    ...LOADINGBAR_DIRECTIVES,
  ],
  providers: [
  ],
})
export class UIModule {
};
