// TranslateProvider
import { Injectable } from '@angular/core';
import { TranslateLoader } from 'ng2-translate/ng2-translate';
import { Observable } from 'rxjs/Rx';

// provided
export class TranslateCustomLoader implements TranslateLoader {

  private _langs: {};

  constructor(public languages: {}) {
    console.log(languages); // have some debug
    this._langs = languages;
  }

  getTranslation(lang: string): Observable<any> {
    return Observable.of(this._langs[lang]);
  }

}
