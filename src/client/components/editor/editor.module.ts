// Importables
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

// Components
import { CoreModule } from '../../core';
// import { DFormComponent } from './dform.component';
// import { DFormDynamicElement } from './dform.element';
// import { DFormTextComponent } from './text';
// import { DFormTextAreaComponent } from './textarea';

import { EditorService } from '../editor';
import { EditorActions } from '../editor';
import { Editor } from './editor.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CoreModule
  ],
  declarations: [
    Editor
    // DFormComponent,
    // DFormDynamicElement,
    // DFormTextComponent,
    // DFormTextAreaComponent
  ],
  exports: [
    CommonModule,
    CoreModule,
    Editor,
    // DFormComponent,
    // DFormDynamicElement,
    // DFormTextAreaComponent,
    // DFormTextComponent,
    ReactiveFormsModule
  ],
  providers: [
    EditorService,
    EditorActions
  ]
})
export class EditorModule { };
