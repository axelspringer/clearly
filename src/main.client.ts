/*
 * Angular bootstraping
 */
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { bootloader } from './bootloader';

// for later, with Web Worker
// import { platformWorkerAppDynamic } from '@angular/platform-webworker-dynamic';

// require critical Css
import './boot.scss';

/*
 * App Module
 * our top level module that holds all of our components
 */
import { AppModule } from './client';

/*
 * Bootstrap our Angular app with a top level NgModule
 */
export function main() {
  platformBrowserDynamic().bootstrapModule(AppModule);
}

// use bootloader in case of async tag
bootloader(main);
