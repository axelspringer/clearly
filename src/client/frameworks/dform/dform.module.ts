// imports
import { ClarityModule } from 'clarity-angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModuleWithProviders } from '@angular/core';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from 'ng2-translate';
import { Type } from '@angular/core';

// components
import { UiModule } from '../ui';
import { CoreModule } from '../core';
import { DFORM_TYPES_COMPONENTS } from './types';
import { DFORM_TYPES_TOKEN } from './dform.type';
import { DFormType } from './dform.type';

// context
import { DFormComponent } from './dform.component';
import { DFormContextComponent } from './context';
import { DFormDynamicElementComponent } from './dform.element.component';
import { DFormVariantComponent } from './context';

const DFORM_TYPES_PROVIDER = {
  provide: DFORM_TYPES_TOKEN,
  useFactory: () => {
    return (type, option) => {
      return new DFormType(type, option);
    };
  },
};

const DFORM_DIRECTIVES: Array<Type<any>> = [
  DFormComponent,
  DFormContextComponent,
  DFormDynamicElementComponent,
  DFormVariantComponent,

  ...DFORM_TYPES_COMPONENTS,
];

@NgModule({
  imports: [
    ClarityModule,
    CommonModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    UiModule,
  ],
  exports: [
    // Dynamic Forms
    ...DFORM_DIRECTIVES,
  ],
  declarations: [
    // Dynamic Forms
    ...DFORM_DIRECTIVES,
  ],
  providers: [
    // Dynamic Forms
    DFORM_TYPES_PROVIDER,
  ],
})
export class DFormModule {

  public static forRoot(configuredProviders: any[]): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: configuredProviders,
    };
  }

};
