// Importables
import { ApplicationRef } from '@angular/core';
import { AuthGuard } from '../../guards';
import { BrowserModule, Title } from '@angular/platform-browser';
import { createInputTransfer } from '@angularclass/hmr';
import { createNewHosts } from '@angularclass/hmr';
import { EffectsModule } from '@ngrx/effects';
import { ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MdModule } from './app.material';
import { NgModule } from '@angular/core';
import { removeNgStyles } from '@angularclass/hmr';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreLogMonitorModule } from '@ngrx/store-log-monitor';
import { StoreModule } from '@ngrx/store';
import { useLogMonitor } from '@ngrx/store-log-monitor';
import { WorkerAppModule } from '@angular/platform-webworker';

import { getPlatform } from '@angular/core';

// Modules
import { CoreModule } from '../../core';
import { DashboardModule } from '../dashboard';
import { OrchestraModule } from '../orchestra';

/*
 * Platform and Environment providers/directives/pipes
 */
import { App } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppConfig } from '../../config';
import { AppLocale } from '../../config';
import { DATABASE_PROVIDER_OPTIONS } from '../../core';
import { DBConfig } from './../../config/db.config';
import { ENV_PROVIDERS } from '../../environment';
import { ROUTES } from './app.routes';

// Components
import { Avatar } from '../avatar';
import { Menu } from '../menu';
import { NoContent } from '../404';
import { Settings } from '../settings';
import { Toolbar } from '../toolbar';
import { Loading } from '../loading';

import AppStore from './app.store';
import { DocsEffects } from '../../effects';
import { AppEffects } from './app.effects';
import { DocsActions } from '../../actions';


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
  Title,
  DocsActions
];

// Effects
const EFFECTS = [
  DocsEffects
];

class NullLoggingErrorHandler implements ErrorHandler {
  public handleError(error: any): void { }
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
    Avatar,
    Loading,
    Menu,
    NoContent,
    Settings,
    Toolbar
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
    EffectsModule.runAfterBootstrap(DocsEffects),
    // EffectsModule.run(AppEffects),
    StoreModule.provideStore(AppStore),
    StoreDevtoolsModule.instrumentStore({ // store dev tools for debug
      maxAge: 5,
      monitor: useLogMonitor({
        visible: !AppConfig.DEBUG, // init
        position: 'right'
      })
    }),
    StoreLogMonitorModule,

    // Materila
    MdModule.forRoot(), // here is the magic,

    // Custom Modules
    OrchestraModule,
    DashboardModule,
    CoreModule.forRoot(AppLocale.languages)
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ...ENV_PROVIDERS,
    ...APP_PROVIDERS
  ]
})
export class AppModule {

  private _appRef: ApplicationRef;
  private _store$: Store<any>;

  constructor(
    appRef: ApplicationRef,
    store$: Store<any>
  ) {

    this._appRef = appRef;
    this._store$ = store$;

  }

  hmrOnInit(store: any) {

    if (!store || !store.rootState) return;

    // restore state by dispatch a SET_ROOT_STATE action
    if (store.rootState) {
      this._store$.dispatch({
        type: 'RESET_STATE',
        payload: store.rootState
      });
    }

    if ('restoreInputValues' in store) {
      store.restoreInputValues();
    }
    this._appRef.tick();
    Object.keys(store).forEach(prop => delete store[prop]);

  }

  hmrOnDestroy(store: any) {

    const cmpLocation = this._appRef.components.map(cmp => cmp.location.nativeElement);
    this._store$.take(1).subscribe(s => store.rootState = s);
    store.disposeOldHosts = createNewHosts(cmpLocation);
    store.restoreInputValues = createInputTransfer();
    removeNgStyles();

  }

  hmrAfterDestroy(store: any) {

    store.disposeOldHosts();
    delete store.disposeOldHosts;

  }

}
