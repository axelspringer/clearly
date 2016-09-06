import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { removeNgStyles, createNewHosts } from '@angularclass/hmr';
import { TranslateModule, TranslateLoader } from 'ng2-translate/ng2-translate';
import { TranslateCustomLoader } from '../../common';
import { AuthGuard } from '../../guards';
import { StoreModule } from '@ngrx/store';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { useLogMonitor, StoreLogMonitorModule } from '@ngrx/store-log-monitor';

import { EffectsModule } from '@ngrx/effects';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from '../../environment';
import { HTTP_PROVIDERS } from '../../common';
import { AppLocale } from '../../config';
import { ROUTES } from './app.routes';
// App is our top level component
import { App } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { Home } from '../home';
import { NoContent } from '../404';

import reducer from '../../reducers';
import { UserEffects } from '../../effects';
import { DBService } from '../../services';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  ...HTTP_PROVIDERS,
  AuthGuard,
  DBService,
  Title
];

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [
    App
  ],
  declarations: [
    App,
    Home,
    NoContent
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    HttpModule,
    EffectsModule.runAfterBootstrap(UserEffects),
    RouterModule.forRoot(ROUTES, {
      useHash: true,
      enableTracing: true
    }),
    TranslateModule.forRoot({ // custom translation provider
      provide: TranslateLoader,
      useFactory: () => {
        return new TranslateCustomLoader(AppLocale.languages);
      }
    }),
    StoreModule.provideStore(reducer),
    StoreDevtoolsModule.instrumentStore({ // store dev tools for debug
      maxAge: 5,
      monitor: useLogMonitor({
        visible: true, // first setting
        position: 'right'
      })
    }),
    StoreLogMonitorModule
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS
  ]
})
export class AppModule {

  constructor(
    public appRef: ApplicationRef
  ) {}

}
