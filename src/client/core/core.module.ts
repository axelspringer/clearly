// Importables
import { HTTP_PROVIDERS } from './http';
import { NgModule } from '@angular/core';
import { TranslateLoader } from 'ng2-translate/ng2-translate';
import { TranslatePipe } from 'ng2-translate/ng2-translate';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Components
import { DATABASE_PROVIDERS } from './db';
import { DatabaseProvider } from './db';
import { EventEmitProvider } from './events';
import { LOGGING_ERROR_HANDLER_PROVIDERS } from './log';
import { LogService } from './log';
import { NOTIFY_PROVIDERS } from './notify/notify.provider';
import { NotifyProvider } from './notify';
import { TranslateCustomLoader } from './i18n';
import { AtLeastValidatorDirective } from './forms';
import { IteratableObjectPipe } from './pipes';
import { LoadingComponent } from './loading';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
  ],
  exports: [
    TranslatePipe, // should be used
    AtLeastValidatorDirective,
    IteratableObjectPipe,
    LoadingComponent,
  ],
  declarations: [
    // Pipes
    TranslatePipe,
    IteratableObjectPipe,

    // Validators
    AtLeastValidatorDirective,

    // Components
    LoadingComponent,
  ],
  providers: [
    // Events
    EventEmitProvider,

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
    ...HTTP_PROVIDERS,
  ],
})
export class CoreModule {

  public static forRoot(languages: Object) {
    return {
      ngModule: CoreModule,
      providers: [{ // custom translation provider
        provide: TranslateLoader,
        useFactory: () => {
          return new TranslateCustomLoader(languages);
        },
      }],
    };
  }

};
