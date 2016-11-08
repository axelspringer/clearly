// Importables
import { BaseRequestOptions } from '@angular/http';
import { Headers } from '@angular/http';

// Components
import { AppConfig } from '../../config';

// Extension
export class HttpRequestOptions extends BaseRequestOptions {

  headers: Headers = new Headers(AppConfig.HTTP.REQUEST || {});

}
