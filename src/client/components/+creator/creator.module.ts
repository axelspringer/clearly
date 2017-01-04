// Importables
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// Components
import { ArticleActions } from './article';
import { ArticleEffects } from './article';
import { ArticleService } from './article';
import { CoreModule } from '../../core';
import { CREATOR_RESOLVER_PROVIDERS } from './creator.resolver';
import { CreatorComponent } from './creator.component';
import { ROUTES } from './creator.routes';

// providers
const CREATOR_PROVIDERS = [
  ArticleActions,
  ArticleService,

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
    CreatorComponent,
  ],
  entryComponents: [
  ],
  exports: [
    CreatorComponent,
    ReactiveFormsModule,
    RouterModule,
  ],
  providers: [
    ...CREATOR_PROVIDERS,
  ],
})
export class CreatorModule { };
