// Importables
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

// Components
import { CommonsModule } from '../../commons';
import { DFormComponent } from './dform.component';
import { DFormDynamicElement } from './dform.element';
import { DFormTextComponent } from './text';
import { DFormTextAreaComponent } from './textarea';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CommonsModule
  ],
  declarations: [
    DFormComponent,
    DFormDynamicElement,
    DFormTextComponent,
    DFormTextAreaComponent
  ],
  exports: [
    CommonModule,
    CommonsModule,
    DFormComponent,
    DFormDynamicElement,
    DFormTextAreaComponent,
    DFormTextComponent,
    ReactiveFormsModule
  ],
  providers: [
  ]
})
export class DFormModule { };
