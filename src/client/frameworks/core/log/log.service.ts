/* tslint:disable max-classes-per-file */

// Importables
import { EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';

// Components
import { EventEmitProvider } from './../events';

export interface ILogEvent {
  level;
}

export class LogLevel {
  public static error: string = 'error';
  public static info: string = 'info';
  public static log: string = 'log';
  public static warn: string = 'warn';
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
  public abstract log(event: LogEvent): void;
  public abstract logError(event: LogEventError): void;
  public abstract logWarn(event: LogEventWarn): void;
  public abstract logInfo(event: LogEventInfo): void;
}

export interface ILogEmitter {};
export abstract class LogEmitter implements LogEmitter {};
export class ConsoleLogEmitter extends LogEmitter {};

export class LogSubjectConsole extends LogSubject {

  private _emitter$: EventEmitter<any>;

  constructor() {
    super();
    if (console && console.group && console.error) { // console statement
      this._emitter$ = EventEmitProvider.connect(new ConsoleLogEmitter());

      this.emitter.subscribe(event => {
        console.group(`Log Service`);
        console[event.level](event.message);
        console.groupEnd();
      });
    }
  }

  get emitter() {
    return this._emitter$;
  }

  public log(event: LogEventLog): void {
    this._log(event);
  }

  public logError(event: LogEventError): void {
    this._log(event);
  };

  public logWarn(event: LogEventWarn): void {
    this._log(event);
  };

  public logInfo(event: LogEventInfo): void {
    this._log(event);
  };

  public _log(event: any): void {
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
