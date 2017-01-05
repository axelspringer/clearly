// Importables
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { Optional } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SkipSelf } from '@angular/core';
import { TranslateModule } from 'ng2-translate';

// Components
import { ArticleActions } from './article';
import { ArticleEffects } from './article';
import { ArticleService } from './article';
import { CoreModule } from '../../frameworks';
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
    CommonModule,
    CoreModule,
    EffectsModule.run(ArticleEffects),
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES),
    TranslateModule,
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
export class CreatorModule {

  constructor(@Optional() @SkipSelf() parentModule: CreatorModule) {
    if (parentModule) {
      throw new Error('CreatorModile already loaded; Only import it once.');
    }
  }

};
