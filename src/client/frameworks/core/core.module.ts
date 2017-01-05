// Importables
import { ClarityModule } from 'clarity-angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HTTP_PROVIDERS } from './http';
import { ModuleWithProviders } from '@angular/core';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from 'ng2-translate';

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
import { UIModule } from './ui';

// providers
import { AUTH_PROVIDERS } from './auth';

@NgModule({
  imports: [
    ClarityModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UIModule,
    TranslateModule,
  ],
  exports: [
    AtLeastValidatorDirective,
    IteratableObjectPipe,
    LoadingComponent,
    SgFileDroppableDirective,
    UIModule,

    // Dynamic Forms
    ...DFORM_DIRECTIVES,
  ],
  declarations: [
    // Pipes
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
    // Auth
    ...AUTH_PROVIDERS,

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

    // Dynamic Forms
    DFORM_TYPES_PROVIDER,

    // Angular
    ...HTTP_PROVIDERS,
  ],
})
export class CoreModule {

  public static forRoot(configuredProviders: any[]): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: configuredProviders,
    };
  }

};
