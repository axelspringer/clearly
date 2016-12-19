// imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';

// directives
import { BUTTON_DIRECTIVES } from './button';
import { CHECKBOX_DIRECTIVES } from './checkbox';
import { ICON_DIRECTIVES } from './icn';
import { INPUT_DIRECTIVES } from './input';
import { LABEL_DIRECTIVES } from './label';
import { LAYOUT_DIRECTIVES } from './layout';
import { LOADINGBAR_DIRECTIVES } from './loadingBar';
import { POPOVER_DIRECTIVES } from './popover';
import { TABS_DIRECTIVES } from './tabs';
import { TEXTAREA_DIRECTIVES } from './textArea';
import { TOAST_DIRECTIVES } from './toast';
import { TOOLBAR_DIRECTIVES } from './toolbar';

// providers
import { TOAST_PROVIDERS } from './toast';
import { OVERLAY_PROVIDERS } from './overlay';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    ...BUTTON_DIRECTIVES,
    ...CHECKBOX_DIRECTIVES,
    ...ICON_DIRECTIVES,
    ...INPUT_DIRECTIVES,
    ...LABEL_DIRECTIVES,
    ...LAYOUT_DIRECTIVES,
    ...LOADINGBAR_DIRECTIVES,
    ...POPOVER_DIRECTIVES,
    ...TABS_DIRECTIVES,
    ...TEXTAREA_DIRECTIVES,
    ...TOAST_DIRECTIVES,
    ...TOOLBAR_DIRECTIVES,
  ],
  declarations: [
    ...BUTTON_DIRECTIVES,
    ...CHECKBOX_DIRECTIVES,
    ...ICON_DIRECTIVES,
    ...INPUT_DIRECTIVES,
    ...LABEL_DIRECTIVES,
    ...LAYOUT_DIRECTIVES,
    ...LOADINGBAR_DIRECTIVES,
    ...POPOVER_DIRECTIVES,
    ...TABS_DIRECTIVES,
    ...TEXTAREA_DIRECTIVES,
    ...TOAST_DIRECTIVES,
    ...TOOLBAR_DIRECTIVES,
  ],
  providers: [
    OVERLAY_PROVIDERS,
    TOAST_PROVIDERS,
  ],
})
export class UIModule {
};
