// Dynamic Link Library

// Polyfills
export function polyfills(env?: any) {

  const deps = [
    // 'ie-shim'; // Internet Explorer 9 support


    // 'core-js/es6'; we include only the nessary parts
    'core-js/es6/symbol',
    'core-js/es6/object',
    'core-js/es6/function',
    'core-js/es6/parse-int',
    'core-js/es6/parse-float',
    'core-js/es6/number',
    'core-js/es6/math',
    'core-js/es6/string',
    'core-js/es6/date',
    'core-js/es6/array',
    'core-js/es6/regexp',
    'core-js/es6/map',
    'core-js/es6/set',
    'core-js/es6/weak-map',
    'core-js/es6/weak-set',
    'core-js/es6/typed',
    'core-js/es6/reflect',
    // see issue https://github.com/AngularClass/angular2-webpack-starter/issues/709
    // 'core-js/es6/promise';

    'core-js/es7/array',
    'core-js/es7/reflect',
    'zone.js/dist/zone',

    // Typescript emit helpers polyfill
    'ts-helpers',

  ];

  return 'production' === env ? deps.concat([
    'zone.js/dist/long-stack-trace-zone'
  ]) : deps;

}

// Vendor
export function vendors(env?: any) {

  return [
    '@angular/platform-browser',
    '@angular/platform-browser-dynamic',
    '@angular/core',
    '@angular/common',
    '@angular/forms',
    '@angular/http',
    '@angular/router',

  ];

}

// RxJS
export function rxjs(env?: any) {

  return [
    // RxJS
    'rxjs/add/observable/fromEvent',
    'rxjs/add/operator/debounceTime',
    'rxjs/add/operator/map',
    'rxjs/add/operator/mergeMap',
    'rxjs/add/operator/let',
    'rxjs/add/operator/switchMap', // these are extensions to the Observable
  ];

}
