// imports
import { OpaqueToken } from '@angular/core';

// interfaces
import { ILang } from '../frameworks';

// tokens
export const CONFIG_HTTP    = new OpaqueToken('CONFIG_HTTP');
export const CONFIG_API     = new OpaqueToken('CONFIG_API');
export const CONFIG_DEBUG   = new OpaqueToken('CONFIG_DEBUG');
export const CONFIG_VERSION = new OpaqueToken('CONFIG_VERSION');

// Application Configuration
export class AppConfig {

  public static VERSION: string = '0.0.1-alpha.0'; // TODO@sebastian should be dynamic

  public static DEFAULT_LANGUAGE: string = 'de';

  public static HTML5_BASE: string = '/';

  public static HTML5_TITLE: string = 'Blackbeard';

  public static LANGUAGES: ILang[] = [
    {
      code: 'de',
      default: true,
      name: 'Deutsch',
    },
  ];

  public static HTTP = {
    TIMEOUT: 2000,
    DELAY: 500,
    REQUEST: {
    },
  };

  public static DEBUG: boolean = __DEV__;

  public static API_BASE: string = __PROD__
    ? 'http://editor.test.tortuga.cloud:5012/'
    : 'https://localhost:8080';

};

export const CONFIG_PROVIDERS = [
  {
    provide: CONFIG_API,
    useValue: AppConfig.API_BASE,
  },
  {
    provide: CONFIG_VERSION,
    useValue: AppConfig.VERSION,
  },
  {
    provide: CONFIG_DEBUG,
    useValue: AppConfig.DEBUG,
  },
  {
    provide: CONFIG_HTTP,
    useValue: AppConfig.HTTP,
  },
];
