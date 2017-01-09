// Importables
import { ApplicationRef } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { PreloadAllModules } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Type } from '@angular/core';
// import { WorkerAppModule } from '@angular/platform-webworker';

// @ngrx
import { EffectsModule } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';

// Clarity
import { ClarityModule } from 'clarity-angular';

// Apollo
import { ApolloModule } from 'angular2-apollo';
import { Client } from './app.apollo.ts';

// Aot
// import { getPlatform } from '@angular/core';

import { TranslateModule } from 'ng2-translate';
import { TranslateLoader } from 'ng2-translate/ng2-translate';
import { translateCustomLoaderFactory } from '../../frameworks';

// Modules
import { CoreModule } from '../../frameworks/core';
import { DashboardModule } from '../dashboard';
import { UiModule } from '../../frameworks';
import { DbModule } from '../../frameworks';

// Environment
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppComponent } from './app.component';
import { AppConfig } from '../../config';
import { AppLocale } from '../../config';
// import { DBConfig } from './../../config/db.config';
import { ROUTES } from './app.routes';

// Components
import { AvatarComponent } from '../avatar';
import { BootComponent } from '../boot';
import { LoginComponent } from '../login';
import { MainComponent } from '../main';
import { MenuComponent } from '../menu';
import { NoContentComponent } from '../404';
import { NotificationsComponent } from '../notifications';
import { StatusComponent } from '../status';
import { ToolbarComponent } from '../toolbar';

export const COMPONENTS: Array<Type<any>> = [
  AvatarComponent,
  BootComponent,
  LoginComponent,
  MainComponent,
  MenuComponent,
  NoContentComponent,
  NotificationsComponent,
  StatusComponent,
  ToolbarComponent,
];

// Guards
import { GUARDS } from '../../guards';

// Store
import AppStore from './app.store';
import { CreatorEffects } from '../+creator';
import { AppEffects } from './app.effects';
import { CreatorResolver } from '../+creator';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,

  // Guards
  ...GUARDS,

  // Others
  Title,
  CreatorResolver,
];

// class NullLoggingErrorHandler implements ErrorHandler {
//   public handleError(error: any): void { }
// }

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [
    AppComponent,
  ],
  declarations: [
    AppComponent,
    ...COMPONENTS,
  ],
  entryComponents: [
    AppComponent,
  ],
  imports: [
    // Angular
    BrowserModule,
    FormsModule,
    HttpModule,

    // Clarity
    ClarityModule,

    // Routing
    RouterModule.forRoot(ROUTES, {
      useHash: true,
      enableTracing: AppConfig.DEBUG,
      preloadingStrategy: PreloadAllModules,
    }),

    // Apollo
    ApolloModule.withClient(Client),

    // ng2-translate
    TranslateModule.forRoot({ // custom translation provider
      provide: TranslateLoader,
      useFactory: translateCustomLoaderFactory(AppLocale.languages),
    }),

    // @ngrx
    EffectsModule.runAfterBootstrap(CreatorEffects),
    EffectsModule.run(AppEffects),
    StoreModule.provideStore(AppStore),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),

    // Custom Modules
    DashboardModule,
    UiModule,
    DbModule.forRoot({
      name: 'blackbeardDB',
      version: 2,
      stores: {
        documents: {
          autoIncrement: true,
        },
      },
    }),

    // Core Module,
    CoreModule.forRoot([]),
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    // ...ENV_PROVIDERS,
    ...APP_PROVIDERS,
  ],
})
export class AppModule {
  private _appRef: ApplicationRef;
  private _store$: Store<any>;

  constructor(
    appRef: ApplicationRef,
    store$: Store<any>,
  ) {
    this._appRef = appRef;
    this._store$ = store$;
  }
}
