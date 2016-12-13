// Importables
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';

// Components
import { BUTTON_DIRECTIVES } from './button';
import { INPUT_DIRECTIVES } from './input';
import { TEXTAREA_DIRECTIVES } from './textArea';
import { ICON_DIRECTIVES } from './icn';
import { LABEL_DIRECTIVES } from './label';
import { LAYOUT_DIRECTIVES } from './layout';
import { TABS_DIRECTIVES } from './tabs';
import { TOOLBAR_DIRECTIVES } from './toolbar';
import { LOADINGBAR_DIRECTIVES } from './loadingBar';
import { POPOVER_DIRECTIVES } from './popover';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    ...INPUT_DIRECTIVES,
    ...TEXTAREA_DIRECTIVES,
    ...BUTTON_DIRECTIVES,
    ...ICON_DIRECTIVES,
    ...LABEL_DIRECTIVES,
    ...LAYOUT_DIRECTIVES,
    ...LOADINGBAR_DIRECTIVES,
    ...POPOVER_DIRECTIVES,
    ...TABS_DIRECTIVES,
    ...TOOLBAR_DIRECTIVES,
  ],
  declarations: [
    ...INPUT_DIRECTIVES,
    ...TEXTAREA_DIRECTIVES,
    ...BUTTON_DIRECTIVES,
    ...ICON_DIRECTIVES,
    ...LABEL_DIRECTIVES,
    ...LAYOUT_DIRECTIVES,
    ...LOADINGBAR_DIRECTIVES,
    ...POPOVER_DIRECTIVES,
    ...TABS_DIRECTIVES,
    ...TOOLBAR_DIRECTIVES,
  ],
  providers: [
  ],
})
export class UIModule {
};
