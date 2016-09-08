import { ILang } from '../commons';

// Application Configuration
export class AppConfig {

  static VERSION: string = '0.0.1-alpha.0'; // TODO@sebastian should be dynamic

  static DEFAULT_LANGUAGE: string = 'de';

  static HTML5_BASE: string = '/';

  static HTML5_TITLE: string = 'Blackbeard';

  static LANGUAGES: Array<ILang> = [
    {
      code: 'de',
      default: true,
      name: 'Deutsch'
    }
  ];

  static HTTP = {
    TIMEOUT: 2000,
    DELAY: 500,
    REQUEST: {
    }
  };

  static API_BASE: string = 'https://localhost:8080';

};
