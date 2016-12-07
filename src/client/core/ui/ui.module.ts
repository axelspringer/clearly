// Importables
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { BUTTON_DIRECTIVES } from './button';
import { ICON_DIRECTIVES } from './icon';
import { LABEL_DIRECTIVES } from './label';
import { LAYOUT_DIRECTIVES } from './layout';
import { TABS_DIRECTIVES } from './tabs';
import { TOOLBAR_DIRECTIVES } from './toolbar';

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
  ],
  declarations: [
    ...BUTTON_DIRECTIVES,
    ...ICON_DIRECTIVES,
    ...LABEL_DIRECTIVES,
    ...LAYOUT_DIRECTIVES,
    ...TABS_DIRECTIVES,
    ...TOOLBAR_DIRECTIVES,
  ],
  providers: [
  ],
})
export class UIModule {
};
