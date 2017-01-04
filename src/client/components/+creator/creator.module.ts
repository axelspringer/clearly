// Importables
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// Components
import { ArticleActions } from './article';
import { ArticleComponent } from './article';
import { ArticleContentComponent } from './article';
import { ArticleEffects } from './article';
import { ArticleMetaComponent } from './article';
import { ArticleService } from './article';
import { CoreModule } from '../../core';
import { CREATOR_RESOLVER_PROVIDERS } from './creator.resolver';
import { CreatorComponent } from './creator.component';
import { QuickAccessComponent } from './quickAccess';
import { QuickWrite } from './quickWrite';
import { QuickWriteComponent } from './quickWrite';
import { ROUTES } from './creator.routes';

// providers
const CREATOR_PROVIDERS = [
  ArticleActions,
  ArticleService,
  QuickWrite,

  ...CREATOR_RESOLVER_PROVIDERS,
];

@NgModule({
  imports: [
    CoreModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES),
    EffectsModule.run(ArticleEffects),
  ],
  declarations: [
    ArticleComponent,
    ArticleContentComponent,
    ArticleMetaComponent,
    CreatorComponent,
    QuickAccessComponent,
    QuickWriteComponent,
  ],
  entryComponents: [
  ],
  exports: [
    ArticleComponent,
    ArticleContentComponent,
    ArticleMetaComponent,
    CreatorComponent,
    QuickAccessComponent,
    QuickWriteComponent,
    ReactiveFormsModule,
    RouterModule,
  ],
  providers: [
    ...CREATOR_PROVIDERS,
  ],
})
export class CreatorModule { };
