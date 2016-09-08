import {
  async,
  inject,
  TestBed
} from '@angular/core/testing';

// Load the implementations that should be tested
import { App } from './app.component';
import { TranslateModule, TranslateLoader } from 'ng2-translate/ng2-translate';
import { TranslateCustomLoader } from '../../commons';
import { AppConfig } from '../../config';
import { Title } from '@angular/platform-browser';
import { DBService } from '../../services';


// bootstrap testing
describe('Sanity Test', () => {

  it('Should test matchers', () => {

    let _undefined, _defined = true;

    expect('a' + 'b').toBe('ab');

    expect(_undefined).toBeUndefined();
    expect(_defined).toBeDefined();

    expect(!_defined).toBeFalsy();
    expect(_defined).toBeTruthy();
    expect(null).toBeNull();

    expect(1 + 1).toEqual(2);
    expect(5).toBeGreaterThan(4);
    expect(5).toBeLessThan(6);

    expect('abcdbca').toContain('bcd');
    expect([4, 5, 6]).toContain(5);
    expect('abcdefgh').toMatch(/efg/);

    expect('abcdbca').not.toContain('xyz');
    expect('abcdefgh').not.toMatch(/123/);
  });

});

describe('App', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      App,
      Title,
      DBService
    ],
    imports: [
      TranslateModule.forRoot({
        provide: TranslateLoader,
        useFactory: () => {
          return new TranslateCustomLoader({
            'de': {
              'HELLOWORLD': 'Hello World'
            }
          });
        }
      })
    ]
  }));

  it('should be constructable', inject([App], (app) => {
    expect(app).not.toBeUndefined;
  }));

  it('should have configured initial title', async(() => {
    inject([App, Title], (app, title) => {
      expect(app.title$).not.toBeUndefined;
      expect(title.getTitle()).toBe(AppConfig.HTML5_TITLE);
    });
  }));

});
