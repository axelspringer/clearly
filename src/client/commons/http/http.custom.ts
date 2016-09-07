// Custom Http
import { Injectable } from '@angular/core';
import {
  ConnectionBackend,
  Http,
  Request,
  RequestOptions,
  RequestOptionsArgs,
  Response
} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { AppConfig } from '../../config';


// service
@Injectable()
export class CustomHttp extends Http {

  constructor(
    private backend: ConnectionBackend,
    private defaultOptions: RequestOptions
    /* Error should go here */
  ) {
    super(backend, defaultOptions); // call to Http^
  }

  // wrap to functions
  post( url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
    return this.factory('post', url, body, options);
  }

  // factory
  private factory(method: string = 'get', ...args) {
    // default methods
    return [
      'post',
      'put'
    ].includes(method) ? super[method](...args)
    // retry & timeout etc.
    // .retryWhen(err => err.delay(AppConfig.HTTP.DELAY))
    // .timeout(AppConfig.HTTP.TIMEOUT, 'Timeout has occured')
    .map(res => res.json())
    .catch(err => {
      if (err.status === 400 || err.status === 422) {
        return Observable.throw(err);
      } else {
        // push to error service ;-)
        console.log('Should go to ErroService ...');
      }
    })
    .finally(() => {
      console.log('After the request ... cleanup ...');
    }) : Observable.throw(''); //
  }

}
