// Importables
import {
  ErrorHandler,
  forwardRef,
  Inject,
  Injectable
} from '@angular/core';

// Components
import { LogService } from './log.service';
import { LogEventError } from './log.service';

export interface LoggingErrorHandlerOptions {
  sinkError: boolean;
  rethrowError: boolean;
  unwrapError: boolean;
};

export var LOGGING_ERROR_HANDLER_OPTIONS: LoggingErrorHandlerOptions = {
  sinkError: true,
  rethrowError: false,
  unwrapError: false
};

@Injectable()
export class LoggingErrorHandler implements ErrorHandler {

  private _logService: LogService;
  private _options: LoggingErrorHandlerOptions;

  constructor(
    logService: LogService,
    @Inject(LOGGING_ERROR_HANDLER_OPTIONS) options: LoggingErrorHandlerOptions
  ) {

    this._logService = logService;
    this._options = options;

  }

  public handleError(error: any): void {

    // to sink of error
    if (!this._options.sinkError) {
      try {

        console.group(`ErrorHandler`);
        console.error(error.message);
        console.error(error.stack);
        console.groupEnd();

      } catch (handlingError) {

        this.catchDispatchError(handlingError, this.constructor.name);

      }

    }

    // Send to the error-logging service.
    try {

      this._options.unwrapError
        ? this._logService.log(new LogEventError(this.findOriginalError(error)))
        : this._logService.log(new LogEventError(error));

    } catch (loggingError) {

      this.catchDispatchError(loggingError, this._logService);

    }

    if (this._options.rethrowError) {

      throw (error);

    }

  }

  private findOriginalError(error: any): any {

    while (error && error.originalError) {
      error = error.originalError;
    }

    return (error);

  }

  private catchDispatchError(error: any, to: any) {

    console.group(to);
    console.warn(`Error when trying to log error to ${to}`);
    console.error(error);
    console.groupEnd();

  }

};


export var LOGGING_ERROR_HANDLER_PROVIDERS = [
  {
    provide: LOGGING_ERROR_HANDLER_OPTIONS,
    useValue: LOGGING_ERROR_HANDLER_OPTIONS
  },
  {
    provide: ErrorHandler,
    useClass: LoggingErrorHandler
  }
];
