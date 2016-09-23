/*
 * Angular bootstraping
 */
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { decorateModuleRef } from './client/environment';
import { ApplicationRef } from '@angular/core';
import { bootloader } from '@angularclass/hmr';

// for later, with Web Worker
// import { platformWorkerAppDynamic } from '@angular/platform-webworker-dynamic';

// saved for later
// import { platformBrowser } from '@angular/platform-browser';
// import { AppModulNgFactory } from './main.client.factory';

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

bootloader(main);
