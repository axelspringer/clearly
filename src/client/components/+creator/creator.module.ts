// Importables
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Components
import { ArticleActions } from './article';
import { ArticleComponent } from './article';
import { ArticleContentComponent } from './article';
import { ArticleMetaComponent } from './article';
import { ArticleService } from './article';
import { CanActivateArticle } from './creator.guard';
import { ChannelsDialogComponent } from './dialogs';
import { CoreModule } from '../../core';
import { CREATOR_RESOLVER_PROVIDERS } from './creator.resolver';
import { CreatorActions } from './creator.actions';
import { CreatorComponent } from './creator.component';
import { CreatorService } from './creator.service';
import { MdModule } from '../app/app.material';
import { QuickAccessComponent } from './quickAccess';
import { QuickWrite } from './quickWrite';
import { QuickWriteComponent } from './quickWrite';
import { ROUTES } from './creator.routes';

// providers
const CREATOR_PROVIDERS = [
  ArticleActions,
  ArticleService,
  CanActivateArticle,
  CreatorActions,
  CreatorActions,
  CreatorService,
  QuickWrite,

  ...CREATOR_RESOLVER_PROVIDERS,
];

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    MdModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES),
  ],
  declarations: [
    ArticleComponent,
    ArticleContentComponent,
    ArticleMetaComponent,
    ChannelsDialogComponent,
    CreatorComponent,
    QuickAccessComponent,
    QuickWriteComponent,
  ],
  entryComponents: [
    ChannelsDialogComponent,
  ],
  exports: [
    ArticleComponent,
    ArticleContentComponent,
    ArticleMetaComponent,
    CommonModule,
    CoreModule,
    CreatorComponent,
    QuickAccessComponent,
    QuickWriteComponent,
    ReactiveFormsModule,
  ],
  providers: [
    ...CREATOR_PROVIDERS,
  ],
})
export class CreatorModule { };
