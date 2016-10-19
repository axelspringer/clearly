// Importables
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

// Components
import { Article } from './article';
import { ArticleActions } from '../../actions';
import { ArticleContent } from './article';
import { ArticleMeta } from './article';
import { ChannelsDialog } from './dialogs';
import { CoreModule } from '../../core';
import { Creator } from './creator.component';
import { CREATOR_RESOLVER_PROVIDERS } from './creator.resolver';
import { CreatorActions } from './creator.actions';
import { CreatorService } from './creator.service';
import { DFormModule } from '../dform';
import { MdModule } from '../app/app.material';
import { QuickAccess } from './quickAccess';

// providers
const CREATOR_PROVIDERS = [
  ...CREATOR_RESOLVER_PROVIDERS,
  ArticleActions,
  CreatorActions,
  CreatorService
];

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    DFormModule,
    FormsModule,
    MdModule,
    ReactiveFormsModule
  ],
  declarations: [
    Article,
    ArticleContent,
    ArticleMeta,
    ChannelsDialog,
    Creator,
    QuickAccess,
    // DFormComponent,
    // DFormDynamicElement,
    // DFormTextComponent,
    // DFormTextAreaComponent
  ],
  entryComponents: [
    ChannelsDialog
  ],
  exports: [
    Article,
    ArticleContent,
    ArticleMeta,
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
