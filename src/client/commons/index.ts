// Common
import {
  NgModule,
  ModuleWithProviders
} from '@angular/core';
import { HTTP_PROVIDERS } from './http';
import {
  TranslateModule,
  TranslateLoader,
  TranslateService,
  TranslatePipe
} from 'ng2-translate/ng2-translate';
import { TranslateCustomLoader } from './i18n';

@NgModule({
  imports: [
  ],
  exports: [
    TranslatePipe // should be used
  ],
  declarations: [
    TranslatePipe
  ],
  providers: [
    ...HTTP_PROVIDERS,
    TranslateService
  ]
})
export class CommonsModule {

  static forRoot(languages: Object) {
    return {
      ngModule: CommonsModule,
      providers: [{ // custom translation provider
        provide: TranslateLoader,
        useFactory: () => {
          return new TranslateCustomLoader(languages);
        }
      }]
    };
  }

}

export * from './i18n';
export * from './http';
