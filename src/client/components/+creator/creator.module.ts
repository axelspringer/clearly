// Importables
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

// Components
import { CoreModule } from '../../core';
import { DFormModule } from '../dform';
import { EditorModule } from '../editor';
import { Creator } from './creator.component';
import { CREATOR_RESOLVER_PROVIDERS } from './creator.resolver';

const CREATOR_PROVIDERS = [
  ...CREATOR_RESOLVER_PROVIDERS
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CoreModule,
    DFormModule,
    EditorModule
  ],
  declarations: [
    Creator
    // DFormComponent,
    // DFormDynamicElement,
    // DFormTextComponent,
    // DFormTextAreaComponent
  ],
  exports: [
    CommonModule,
    CoreModule,
    Creator,
    // DFormComponent,
    // DFormDynamicElement,
    // DFormTextAreaComponent,
    // DFormTextComponent,
    ReactiveFormsModule
  ],
  providers: [
    ...CREATOR_PROVIDERS
  ]
})
export class CreatorModule { };
