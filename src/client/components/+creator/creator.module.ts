// Importables
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Components
import { Article } from './article';
import { ArticleActions } from './article';
import { ArticleContent } from './article';
import { ArticleMeta } from './article';
import { CanActivateArticle } from './creator.guard';
import { ChannelsDialog } from './dialogs';
import { CoreModule } from '../../core';
import { Creator } from './creator.component';
import { CREATOR_RESOLVER_PROVIDERS } from './creator.resolver';
import { CreatorActions } from './creator.actions';
import { CreatorService } from './creator.service';
import { DFormModule } from '../dform';
import { MdModule } from '../app/app.material';
import { QuickAccess } from './quickAccess';
import { ROUTES } from './creator.routes';

// providers
const CREATOR_PROVIDERS = [
  ...CREATOR_RESOLVER_PROVIDERS,
  ArticleActions,
  CreatorActions,
  CreatorService,
  CanActivateArticle,
  CreatorActions,
];

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    DFormModule,
    FormsModule,
    MdModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    Article,
    ArticleContent,
    ArticleMeta,
    ChannelsDialog,
    Creator,
    QuickAccess,
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
    ReactiveFormsModule
  ],
  providers: [
    ...CREATOR_PROVIDERS,
  ]
})
export class CreatorModule { };
