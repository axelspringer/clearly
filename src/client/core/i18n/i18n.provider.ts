// TranslateProvider
import { TranslateLoader } from 'ng2-translate/ng2-translate';
import { Observable } from 'rxjs/Rx';

// provided
export class TranslateCustomLoader implements TranslateLoader {

  private _langs: {};

  constructor(public languages: {}) {
    this._langs = languages;
  }

  public getTranslation(lang: string): Observable<any> {
    return Observable.of(this._langs[lang]);
  }

}
