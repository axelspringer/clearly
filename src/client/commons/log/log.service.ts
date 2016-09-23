// Importables
import { EventEmitter } from '@angular/core';
import { Inject } from '@angular/core';
import { Injectable } from '@angular/core';

// Components
import { EventEmitterProvider } from './../events';

export interface ILogEvent {
  level;
}

export class LogLevel {
  static error: string = 'error';
  static info: string = 'info';
  static log: string = 'log';
  static warn: string = 'warn';
}

export abstract class LogEvent {

  private _level: LogLevel;
  private _message: Error | any;

  constructor(level: LogLevel, message?: any) {
    this._level = level;
    this._message = message;
  }

  get level() {
    return this._level;
  }

  get message() {
    return this._message;
  }

}

export class LogEventError extends LogEvent {
  constructor(message?: any) {
    super(LogLevel.error, message);
  }
}

export class LogEventWarn extends LogEvent {
  constructor(message?: any) {
    super(LogLevel.warn, message);
  }
}

export class LogEventInfo extends LogEvent {
  constructor(message?: any) {
    super(LogLevel.info, message);
  }
}

export class LogEventLog extends LogEvent {
  constructor(message?: any) {
    super(LogLevel.log, message);
  }
}

export interface ILogSubject {
  name;
}

export abstract class LogSubject implements ILogSubject {
  get name() {
    return this.constructor.name;
  };
  abstract log(event: LogEvent): void;
  abstract logError(event: LogEventError): void;
  abstract logWarn(event: LogEventWarn): void;
  abstract logInfo(event: LogEventInfo): void;
}

export interface ILogEmitter {};
export abstract class LogEmitter implements LogEmitter {};
export class ConsoleLogEmitter extends LogEmitter {};

export class LogSubjectConsole extends LogSubject {

  private _emitter$: EventEmitter<any>;

  constructor() {

    super();

    if (console && console.group && console.error) { // console statement
      this._emitter$ = EventEmitterProvider.create(new ConsoleLogEmitter());

      this.emitter.subscribe(event => {
        console.group(`Log Service`);
        console[event.level](event.message);
        console.groupEnd();
      });
    }

  }

  get emitter() {

    return this._emitter$.asObservable();

  }

  log(event: LogEventLog): void {

    this._log(event);

  }

  logError(event: LogEventError): void {

    this._log(event);

  };

  logWarn(event: LogEventWarn): void {

    this._log(event);

  };

  logInfo(event: LogEventInfo): void {

    this._log(event);

  };

  _log(event: any): void {

    this._emitter$.next(event);

  }

}


@Injectable()
export class LogService {

  private _emitters$: Array<any> = [];

  constructor() {

    this._emitters$ = this._emitters$.concat(this._emitters$.length ||
      new LogSubjectConsole());

  }

  public log(error: any): void {

    this._emitters$.forEach(subject => subject.log(error));

  }

};
