import { AuthGuard } from '../../guards';
import { BrowserModule, Title } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule, ApplicationRef } from '@angular/core';
import { removeNgStyles, createNewHosts } from '@angularclass/hmr';
import { RouterModule } from '@angular/router';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { TranslateCustomLoader } from '../../commons';
// import { TranslateModule, TranslateLoader } from 'ng2-translate/ng2-translate';
import { useLogMonitor, StoreLogMonitorModule } from '@ngrx/store-log-monitor';
import { MdModule } from './app.material';

import { CommonsModule } from '../../commons';

import {
  TranslateModule,
  TranslateLoader
} from 'ng2-translate/ng2-translate';

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
import { Dashboard } from '../dashboard';
import { NoContent } from '../404';
import { Toolbar } from '../toolbar';

// Modules
import { BackpackModule } from '../backpack';

import reducer from '../../reducers';
import { UserEffects } from '../../effects';
import { DBService } from '../../services';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  // ...HTTP_PROVIDERS,
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
    Dashboard,
    NoContent,
    Toolbar,
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    HttpModule,
    CommonsModule.forRoot(AppLocale.languages),
    EffectsModule.runAfterBootstrap(UserEffects),
    RouterModule.forRoot(ROUTES, {
      useHash: true,
      enableTracing: true
    }),
    // TranslateModule.forRoot({ // custom translation provider
    //   provide: TranslateLoader,
    //   useFactory: () => {
    //     return new TranslateCustomLoader(AppLocale.languages);
    //   }
    // }),
    StoreModule.provideStore(reducer),
    StoreDevtoolsModule.instrumentStore({ // store dev tools for debug
      maxAge: 5,
      monitor: useLogMonitor({
        visible: true, // first setting
        position: 'right'
      })
    }),
    StoreLogMonitorModule,
    MdModule.forRoot(), // here is the magic,
    BackpackModule
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
