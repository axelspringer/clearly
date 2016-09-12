// Importables
import {
  NgModule,
  ModuleWithProviders
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Components
import { DFormComponent } from './dform.component';
import { DFormDynamicElement } from './dform.element';
// import { DFormService } from './dform.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    DFormComponent,
    DFormDynamicElement
  ],
  exports: [
    DFormComponent,
    DFormDynamicElement,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [

  ]
})
export class DFormModule { };
