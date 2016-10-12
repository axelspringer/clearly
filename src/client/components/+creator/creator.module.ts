// Importables
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

// Components
import { CoreModule } from '../../core';
import { MdModule } from '../app/app.material';
import { DFormModule } from '../dform';
import { EditorModule } from '../editor';
import { Creator } from './creator.component';
import { ArticleActions } from '../../actions';
import { CREATOR_RESOLVER_PROVIDERS } from './creator.resolver';
import { ChannelsDialog } from './dialogs';
import { QuickAccess } from './quickAccess';

const CREATOR_PROVIDERS = [
  ...CREATOR_RESOLVER_PROVIDERS,
  ArticleActions
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CoreModule,
    FormsModule,
    DFormModule,
    EditorModule,
    MdModule
  ],
  declarations: [
    Creator,
    ChannelsDialog,
    QuickAccess
    // DFormComponent,
    // DFormDynamicElement,
    // DFormTextComponent,
    // DFormTextAreaComponent
  ],
  entryComponents: [
    ChannelsDialog
  ],
  exports: [
    CommonModule,
    CoreModule,
    Creator,
    QuickAccess,
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
