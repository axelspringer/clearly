// Injectables
import { Http } from '@angular/http';
import { XHRBackend } from '@angular/http';
import { RequestOptions } from '@angular/http';
import { ResponseOptions } from '@angular/http';

// Components
import { CustomHttp } from './http.custom';
import { HttpRequestOptions } from './http.request';
import { HttpResponseOptions } from './http.response';

export * from './http.request';
export * from './http.response';

export const HTTP_PROVIDERS: any[] = [
  {
    provide: Http,
    useFactory: (
      backend: XHRBackend,
      defaultOptions: RequestOptions,
    ) => {
      return new CustomHttp(backend, defaultOptions);
    },
    deps: [
      XHRBackend,
      RequestOptions,
    ],
  },
  {
    provide: RequestOptions,
    useClass: HttpRequestOptions,
  },
  {
    provide: ResponseOptions,
    useClass: HttpResponseOptions,
  },
];
