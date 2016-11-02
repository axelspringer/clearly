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
import { CanActivateArticle } from './creator.guard';
import { ChannelsDialogComponent } from './dialogs';
import { CoreModule } from '../../core';
import { CREATOR_RESOLVER_PROVIDERS } from './creator.resolver';
import { CreatorActions } from './creator.actions';
import { CreatorComponent } from './creator.component';
import { CreatorService } from './creator.service';
import { MdModule } from '../app/app.material';
import { QuickAccessComponent } from './quickAccess';
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
    ReactiveFormsModule,
  ],
  providers: [
    ...CREATOR_PROVIDERS,
  ],
})
export class CreatorModule { };
