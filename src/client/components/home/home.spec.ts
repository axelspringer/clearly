import {
  inject,
  async,
  TestBed,
} from '@angular/core/testing';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  BaseRequestOptions,
  ConnectionBackend,
  Http
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { StoreModule } from '@ngrx/store';

// Load the implementations that should be tested
import { Home } from './home.component';
import reducer from '../../reducers';
import { UserActions } from '../../actions';

describe('Home', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      BaseRequestOptions,
      MockBackend,
      {
        provide: Http,
        useFactory: function(backend: ConnectionBackend, defaultOptions: BaseRequestOptions) {
          return new Http(backend, defaultOptions);
        },
        deps: [MockBackend, BaseRequestOptions]
      },
      Home,
      Title,
      UserActions
    ],
    imports: [
      StoreModule.provideStore(reducer)
    ]
  }));

  it('should have default data', async(() => {
    inject([ Home ], (home) => {
      expect(home.user$).toEqual({userId: ''});
    });
  }));

  it('should have a title', async(() => {
    inject([ Home, Title ], (home, title) => {
      expect(!!home.title$).toEqual(true);
      expect(title.getTitle()).toEqual(home.title$);
    });
  }));

  it('should log ngOnInit', inject([ Home ], (home) => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    home.ngOnInit();
    expect(console.log).toHaveBeenCalled();
  }));

});
