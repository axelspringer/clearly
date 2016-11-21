// Importables
import { ApplicationRef } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MdModule } from './app.material';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreLogMonitorModule } from '@ngrx/store-log-monitor';
import { StoreModule } from '@ngrx/store';
import { useLogMonitor } from '@ngrx/store-log-monitor';
// import { WorkerAppModule } from '@angular/platform-webworker';

// Apollo
import { ApolloModule } from 'angular2-apollo';
import { client } from './app.apollo.ts';

// Aot
// import { getPlatform } from '@angular/core';

// Modules
import { CoreModule } from '../../core';
import { DashboardModule } from '../dashboard';
import { CreatorModule } from '../+creator';

// Environment
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppConfig } from '../../config';
import { AppLocale } from '../../config';
import { DATABASE_PROVIDER_OPTIONS } from '../../core';
import { DBConfig } from './../../config/db.config';
// import { ENV_PROVIDERS } from '../../environment';
import { ROUTES } from './app.routes';

// Components
import { AvatarComponent } from '../avatar';
import { MenuComponent } from '../menu';
import { NoContentComponent } from '../404';
import { SettingsComponent } from '../settings';
import { ToolbarComponent } from '../toolbar';
import { AuthGuard } from '../../guards';
import { BootGuard } from '../../guards';
import { BootComponent } from '../boot';
import { Boot } from '../boot';

// Store
import AppStore from './app.store';
import { DocsEffects } from '../../effects';
import { ArticleEffects } from '../+creator/article';
import { AppEffects } from './app.effects';
import { DocsActions } from '../../actions';
import { MainComponent } from '../main/main.component';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  {
    provide: DATABASE_PROVIDER_OPTIONS,
    useValue: {
      name: DBConfig.NAME,
    },
  },
  AuthGuard,
  BootGuard,
  Title,
  DocsActions,
  Boot,
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
    AvatarComponent,
    MenuComponent,
    NoContentComponent,
    SettingsComponent,
    ToolbarComponent,
    BootComponent,
    MainComponent,
  ],
  entryComponents: [
    AppComponent,
    BootComponent,
    MainComponent,
  ],
  imports: [
    // Angular
    BrowserModule,
    FormsModule,
    HttpModule,

    // Routing
    RouterModule.forRoot(ROUTES, {
      useHash: true,
      enableTracing: AppConfig.DEBUG,
    }),

    // Apollo
    ApolloModule.withClient(client),

    // @ngrx
    EffectsModule.runAfterBootstrap(DocsEffects),
    EffectsModule.runAfterBootstrap(ArticleEffects),
    EffectsModule.run(AppEffects),
    StoreModule.provideStore(AppStore),
    StoreDevtoolsModule.instrumentStore({ // store dev tools for debug
      maxAge: 5,
      monitor: useLogMonitor({
        visible: AppConfig.DEBUG, // init
        position: 'right',
      }),
    }),
    StoreLogMonitorModule,

    // Material
    MdModule.forRoot(), // here is the magic,

    // Custom Modules
    DashboardModule,
    CreatorModule,
    CoreModule.forRoot(AppLocale.languages),
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
