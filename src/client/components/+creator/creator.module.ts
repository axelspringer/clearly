// Importables
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

// Components
import { CoreModule } from '../../core';
import { MdModule } from '../app/app.material';
import { DFormModule } from '../dform';
import { EditorModule } from '../editor';
import { Creator } from './creator.component';
import { ChannelsActions } from '../../actions';
import { CREATOR_RESOLVER_PROVIDERS } from './creator.resolver';

const CREATOR_PROVIDERS = [
  ...CREATOR_RESOLVER_PROVIDERS,
  ChannelsActions
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CoreModule,
    DFormModule,
    EditorModule,
    MdModule
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
    ...CREATOR_PROVIDERS,
  ]
})
export class CreatorModule { };
