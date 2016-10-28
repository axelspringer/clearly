/*
 * Angular bootstraping
 */
import { ApplicationRef } from '@angular/core';
import { bootloader } from '@angularclass/hmr';
import { decorateModuleRef } from './client/environment';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// for later, with Web Worker
// import { platformWorkerAppDynamic } from '@angular/platform-webworker-dynamic';

/*
 * App Module
 * our top level module that holds all of our components
 */
import { AppModule } from './client';

/*
 * Bootstrap our Angular app with a top level NgModule
 */
export function main(): Promise<any> {
  // return platformBrowser().bootstrapModuleFactory(AppModulNgFactory)

  return platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .then(decorateModuleRef)
    .catch(err => console.error(err));

}

export function bootstrap(main) {
  if (document.readyState === 'complete') {
    main();
  } else {
    document.addEventListener('DOMContentLoaded', main);
  }
}

bootstrap(main);
