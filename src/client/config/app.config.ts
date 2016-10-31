import { ILang } from '../core';

// Application Configuration
export class AppConfig {

  public static VERSION: string = '0.0.1-alpha.0'; // TODO@sebastian should be dynamic

  public static DEFAULT_LANGUAGE: string = 'de';

  public static HTML5_BASE: string = '/';

  public static HTML5_TITLE: string = 'Blackbeard';

  public static LANGUAGES: Array<ILang> = [
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

  public static DEBUG: boolean = 'production' !== ENV;

  public static API_BASE: string = 'https://localhost:8080';

};
