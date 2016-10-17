// Importables
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

// Components
import { CoreModule } from '../../core';
import { DFormComponent } from './dform.component';
import { DFormDynamicElement } from './dform.element';
import { DFormTextComponent } from './text';
import { DFormTextAreaComponent } from './textarea';
import { DFormMetaTextComponent } from './metaText';
import { MdModule } from '../app/app.material';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CoreModule
  ],
  declarations: [
    DFormComponent,
    DFormDynamicElement,
    DFormTextComponent,
    DFormTextAreaComponent,
    DFormMetaTextComponent
  ],
  exports: [
    CommonModule,
    CoreModule,
    DFormComponent,
    DFormDynamicElement,
    DFormTextAreaComponent,
    DFormTextComponent,
    ReactiveFormsModule,
    DFormMetaTextComponent
  ],
  providers: [
  ]
})
export class DFormModule { };
