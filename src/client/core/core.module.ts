// Importables
import { HTTP_PROVIDERS } from './http';
import { NgModule } from '@angular/core';
import { TranslateLoader } from 'ng2-translate/ng2-translate';
import { TranslatePipe } from 'ng2-translate/ng2-translate';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Components
import { AtLeastValidatorDirective } from './forms';
import { DATABASE_PROVIDERS } from './db';
import { DatabaseProvider } from './db';
import { DFORM_DIRECTIVES } from './dform';
import { DFORM_TYPES_PROVIDER } from './dform';
import { EventEmitProvider } from './events';
import { IteratableObjectPipe } from './pipes';
import { LoadingComponent } from './loading';
import { LOGGING_ERROR_HANDLER_PROVIDERS } from './log';
import { LogService } from './log';
import { NOTIFY_PROVIDERS } from './notify/notify.provider';
import { NotifyProvider } from './notify';
import { SgFileDroppableDirective } from './forms';
import { TranslateCustomLoader } from './i18n';
import { UIModule } from './ui';
import { TranslateModule } from 'ng2-translate';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UIModule,
    TranslateModule,
  ],
  exports: [
    // TranslatePipe, // should be used
    AtLeastValidatorDirective,
    IteratableObjectPipe,
    LoadingComponent,
    SgFileDroppableDirective,
    UIModule,
    TranslateModule,

    // Dynamic Forms
    ...DFORM_DIRECTIVES,
  ],
  declarations: [
    // Pipes
    // TranslatePipe,
    IteratableObjectPipe,
    SgFileDroppableDirective,

    // Validators
    AtLeastValidatorDirective,

    // Components
    LoadingComponent,

    // Dynamic Forms
    // DFormAbstractComponent,
    ...DFORM_DIRECTIVES,
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

    // Dynamic Forms
    DFORM_TYPES_PROVIDER,

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
