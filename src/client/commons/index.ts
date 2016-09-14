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
import { EventEmitterBus } from './events';
import {
  LogService,
  LOGGING_ERROR_HANDLER_PROVIDERS
} from './log';
import { DatabaseProvider } from './db';

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
    // Error
    LogService,
    ...LOGGING_ERROR_HANDLER_PROVIDERS,

    // Translation
    TranslateService,

    // Events
    EventEmitterBus,

    // Database
    DatabaseProvider,

    // Angular
    ...HTTP_PROVIDERS
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
export * from './events';
export * from './db';
export * from './log';
