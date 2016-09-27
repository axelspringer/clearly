// Importables
import { HTTP_PROVIDERS } from './http';
import { ModuleWithProviders } from '@angular/core';
import { NgModule } from '@angular/core';
import { TranslateLoader } from 'ng2-translate/ng2-translate';
import { TranslateModule } from 'ng2-translate/ng2-translate';
import { TranslatePipe } from 'ng2-translate/ng2-translate';
import { TranslateService } from 'ng2-translate/ng2-translate';

// Components
import { DATABASE_PROVIDERS } from './db';
import { DatabaseProvider } from './db';
import { EventEmitterProvider } from './events';
import { LOGGING_ERROR_HANDLER_PROVIDERS } from './log';
import { LogService } from './log';
import { NOTIFY_PROVIDERS } from './notify/notify.provider';
import { NotifyProvider } from './notify';
import { TranslateCustomLoader } from './i18n';

@NgModule({
  imports: [
  ],
  exports: [
    TranslatePipe, // should be used
  ],
  declarations: [
    TranslatePipe
  ],
  providers: [
    // Events
    EventEmitterProvider,

    // Database
    DatabaseProvider,
    ...DATABASE_PROVIDERS,

    // NotifyEvent
    NotifyProvider,
    ...NOTIFY_PROVIDERS,

    // Error
    LogService,
    ...LOGGING_ERROR_HANDLER_PROVIDERS,

    // Translation
    TranslateService,

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

};
