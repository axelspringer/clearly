// Request
import {
  BaseRequestOptions,
  Headers
} from '@angular/http';
import { AppConfig } from '../../config';

// Extension
export class HttpRequestOptions extends BaseRequestOptions {

  headers: Headers = new Headers(AppConfig.HTTP.REQUEST || {});

}
