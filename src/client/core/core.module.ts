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
import { DForm } from './dform';
import { DFormAbstractComponent } from './dform';
import { DFormComponent } from './dform';
import { DFormDropDownComponent } from './dform';
import { DFormDynamicElementComponent } from './dform';
import { DFormElementEventsDirective } from './dform';
import { DFormMainTextComponent } from './dform';
import { DFormMetaBarComponent } from './dform';
import { DFormMetaTextComponent } from './dform';
import { DFormQuickEditComponent } from './dform';
import { DFormSocialVideoComponent } from './dform';
import { DFormTextAreaComponent } from './dform';
import { DFormQuickBarComponent } from './dform';
import { DFormTextComponent } from './dform';
import { EventEmitProvider } from './events';
import { IteratableObjectPipe } from './pipes';
import { LoadingComponent } from './loading';
import { LOGGING_ERROR_HANDLER_PROVIDERS } from './log';
import { LogService } from './log';
import { MdModule } from '../components/app/app.material';
import { NOTIFY_PROVIDERS } from './notify/notify.provider';
import { NotifyProvider } from './notify';
import { TranslateCustomLoader } from './i18n';
import { DFormPictureComponent } from './dform';
import { SgFileDroppableDirective } from './forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MdModule,
    ReactiveFormsModule,
  ],
  exports: [
    TranslatePipe, // should be used
    AtLeastValidatorDirective,
    IteratableObjectPipe,
    LoadingComponent,
    SgFileDroppableDirective,

    // Dynamic Forms
    DFormAbstractComponent,
    DFormComponent,
    DFormDropDownComponent,
    DFormDynamicElementComponent,
    DFormElementEventsDirective,
    DFormMainTextComponent,
    DFormMetaBarComponent,
    DFormMetaTextComponent,
    DFormPictureComponent,
    DFormQuickBarComponent,
    DFormQuickEditComponent,
    DFormSocialVideoComponent,
    DFormTextAreaComponent,
    DFormTextComponent,
  ],
  declarations: [
    // Pipes
    TranslatePipe,
    IteratableObjectPipe,
    SgFileDroppableDirective,

    // Validators
    AtLeastValidatorDirective,

    // Components
    LoadingComponent,

    // Dynamic Forms
    DFormAbstractComponent,
    DFormComponent,
    DFormDropDownComponent,
    DFormDynamicElementComponent,
    DFormElementEventsDirective,
    DFormMainTextComponent,
    DFormMetaBarComponent,
    DFormMetaTextComponent,
    DFormPictureComponent,
    DFormQuickBarComponent,
    DFormQuickEditComponent,
    DFormSocialVideoComponent,
    DFormTextAreaComponent,
    DFormTextComponent,
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
    DForm,

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
