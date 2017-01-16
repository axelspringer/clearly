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

// modules
import { UiModule } from '../../frameworks';
import { DFormModule } from '../../frameworks';

// components
import { CreatorEffects } from './creator.effects';
import { ArticleUtils } from './article';
import { CoreModule } from '../../frameworks';
import { CreatorComponent } from './creator.component';
import { ROUTES } from './creator.routes';
import { CREATOR_GUARD } from './creator.guard';
import { ClarityModule } from 'clarity-angular';

// providers
const CREATOR_PROVIDERS = [
  ArticleUtils,

  // guard
  CREATOR_GUARD,
];

@NgModule({
  imports: [
    ClarityModule,
    CommonModule,
    CoreModule,
    DFormModule,
    EffectsModule.run(CreatorEffects),
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES),
    TranslateModule,
    UiModule
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
