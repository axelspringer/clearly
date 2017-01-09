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
import { EventEmitProvider } from './events';
import { IteratableObjectPipe } from './pipes';
import { LOGGING_ERROR_HANDLER_PROVIDERS } from './log';
import { LogService } from './log';
import { SgFileDroppableDirective } from './forms';

// providers
import { AUTH_PROVIDERS } from './auth';

@NgModule({
  imports: [
    ClarityModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  exports: [
    AtLeastValidatorDirective,
    IteratableObjectPipe,
    SgFileDroppableDirective,
  ],
  declarations: [
    // Pipes
    IteratableObjectPipe,
    SgFileDroppableDirective,

    // Validators
    AtLeastValidatorDirective,
  ],
  providers: [
    // Auth
    ...AUTH_PROVIDERS,

    // Events
    EventEmitProvider,

    // Error
    LogService,
    ...LOGGING_ERROR_HANDLER_PROVIDERS,

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
