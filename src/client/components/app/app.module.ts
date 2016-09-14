// Importables
import { AuthGuard } from '../../guards';
import { BrowserModule, Title } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule, ApplicationRef, ErrorHandler } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {
  Store,
  StoreModule
} from '@ngrx/store';
import { useLogMonitor, StoreLogMonitorModule } from '@ngrx/store-log-monitor';
import { MdModule } from './app.material';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';

// Modules
import { CommonsModule } from '../../commons';
import { DashboardModule } from '../dashboard';
import { OrchestraModule } from '../orchestra';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from '../../environment';
import { DATABASE_PROVIDER_OPTIONS } from '../../commons';
import {
  AppConfig,
  AppLocale
} from '../../config';
import { ROUTES } from './app.routes';
// App is our top level component
import { App } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';


import { NoContent } from '../404';
import { Toolbar } from '../toolbar';
import { Menu } from '../menu';
import { Settings } from '../settings';

import AppStore from './app.store';
import { AppEffects } from './app.effects';
import { DBService } from '../../services';
import { DBConfig } from './../../config/db.config';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  {
    provide: DATABASE_PROVIDER_OPTIONS,
    useValue: {
      name: DBConfig.NAME
    }
  },
  AuthGuard,
  DBService,
  Title
];

class NullLoggingErrorHandler implements ErrorHandler {
  public handleError(error: any): void {}
}

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [
    App
  ],
  declarations: [
    App,
    NoContent,
    Toolbar,
    Menu,
    Settings
  ],
  imports: [
    // Angular
    BrowserModule,
    FormsModule,
    HttpModule,

    // Routing
    RouterModule.forRoot(ROUTES, {
      useHash: true,
      enableTracing: AppConfig.DEBUG
    }),

    // @ngrx
    EffectsModule.run(AppEffects),
    StoreModule.provideStore(AppStore),
    StoreDevtoolsModule.instrumentStore({ // store dev tools for debug
      maxAge: 5,
      monitor: useLogMonitor({
        visible: AppConfig.DEBUG, // init
        position: 'right'
      })
    }),
    StoreLogMonitorModule,

    // Materila
    MdModule.forRoot(), // here is the magic,

    // Custom Modules
    OrchestraModule,
    DashboardModule,
    CommonsModule.forRoot(AppLocale.languages)
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ...ENV_PROVIDERS,
    ...APP_PROVIDERS
  ]
})
export class AppModule {

  constructor(
    public appRef: ApplicationRef,
    private store: Store<any>
  ) { }

  hmrOnInit(store) {
    if (!store || !store.rootState) return;

    // restore state by dispatch a SET_ROOT_STATE action
    if (store.rootState) {
      this.store.dispatch({
        type: 'RESET_STATE',
        payload: store.rootState
      });
    }

    if ('restoreInputValues' in store) { store.restoreInputValues(); }
    this.appRef.tick()
    Object.keys(store).forEach(prop => delete store[prop]);
  }

  hmrOnDestroy(store) {
    const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    this.store.take(1).subscribe(s => store.rootState = s);
    store.disposeOldHosts = createNewHosts(cmpLocation);
    store.restoreInputValues = createInputTransfer();
    removeNgStyles()
  }

  hmrAfterDestroy(store) {
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

}
