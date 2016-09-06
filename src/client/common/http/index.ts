// Http
import { HttpRequestOptions } from './http.request';
import { HttpResponseOptions } from './http.response';
import {
  Http,
  XHRBackend,
  RequestOptions,
  ResponseOptions
} from '@angular/http';
import { CustomHttp } from './http.custom';

export * from './http.request';
export * from './http.response';

export const HTTP_PROVIDERS: any[] = [
  {
    provide: Http,
    useFactory: (
      backend: XHRBackend,
      defaultOptions: RequestOptions
    ) => {
      return new CustomHttp(backend, defaultOptions);
    },
    deps: [
      XHRBackend,
      RequestOptions
    ]
  },
  {
    provide: RequestOptions,
    useClass: HttpRequestOptions,
  },
  {
    provide: ResponseOptions,
    useClass: HttpResponseOptions
  }
];

