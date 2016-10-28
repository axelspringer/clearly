// Custom Http
import { ConnectionBackend } from '@angular/http';
import { Http } from '@angular/http';
import { HTTP_STATUS_CODES } from './index';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RequestOptions } from '@angular/http';
import { RequestOptionsArgs } from '@angular/http';

// inject
@Injectable()
export class CustomHttp extends Http {

  constructor(
    public backend: ConnectionBackend,
    public defaultOptions: RequestOptions,
  ) {
    super(backend, defaultOptions);
  }

  public post( url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
    return this.factory('post', url, body, options);
  }

  private factory(method: string = 'get', ...args) {
    return [
      'post',
      'put',
    ].includes(method) ? super[method](...args)
    // retry & timeout etc.
    // .retryWhen(err => err.delay(AppConfig.HTTP.DELAY))
    // .timeout(AppConfig.HTTP.TIMEOUT, 'Timeout has occured')
    .map(res => res.json())
    .catch(err => {
      if (err.status === HTTP_STATUS_CODES.BAD_REQUEST
        || err.status === HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY ) {
        return Observable.throw(err);
      } else {
        // push to error service ;-)
        console.log('Should go to ErroService ...');
      }
    })
    .finally(() => {
      console.log('After the request ... cleanup ...');
    }) : Observable.throw('');
  }

}
