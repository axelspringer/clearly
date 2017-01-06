// imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';

// directives
import { CHECKBOX_DIRECTIVES } from './checkbox';
import { INPUT_DIRECTIVES } from './input';
import { LABEL_DIRECTIVES } from './label';
import { LAYOUT_DIRECTIVES } from './layout';
import { LOADINGBAR_DIRECTIVES } from './loadingBar';
import { TABS_DIRECTIVES } from './tabs';
import { TEXTAREA_DIRECTIVES } from './textArea';
import { TOAST_DIRECTIVES } from './toast';

// providers
import { TOAST_PROVIDERS } from './toast';
import { LAYOUT_PROVIDERS } from './layout';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    ...CHECKBOX_DIRECTIVES,
    ...INPUT_DIRECTIVES,
    ...LABEL_DIRECTIVES,
    ...LAYOUT_DIRECTIVES,
    ...LOADINGBAR_DIRECTIVES,
    ...TABS_DIRECTIVES,
    ...TEXTAREA_DIRECTIVES,
    ...TOAST_DIRECTIVES,
  ],
  declarations: [
    ...CHECKBOX_DIRECTIVES,
    ...INPUT_DIRECTIVES,
    ...LABEL_DIRECTIVES,
    ...LAYOUT_DIRECTIVES,
    ...LOADINGBAR_DIRECTIVES,
    ...TABS_DIRECTIVES,
    ...TEXTAREA_DIRECTIVES,
    ...TOAST_DIRECTIVES,
  ],
  providers: [
    TOAST_PROVIDERS,
    LAYOUT_PROVIDERS,
  ],
})
export class UiModule {
};
