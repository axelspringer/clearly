/*
 * Angular bootstraping
 */
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

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
platformBrowserDynamic().bootstrapModule(AppModule);
