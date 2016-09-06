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
import { Dashboard } from './dashboard.component';
import reducer from '../../reducers';
import { UserActions } from '../../actions';

describe('Dashboard', () => {
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
      Dashboard,
      Title,
      UserActions
    ],
    imports: [
      StoreModule.provideStore(reducer)
    ]
  }));

  it('should have default data', async(() => {
    inject([ Dashboard ], (Dashboard) => {
      expect(Dashboard.user$).toEqual({userId: ''});
    });
  }));

  it('should have a title', async(() => {
    inject([ Dashboard, Title ], (Dashboard, title) => {
      expect(!!Dashboard.title$).toEqual(true);
      expect(title.getTitle()).toEqual(Dashboard.title$);
    });
  }));

  it('should log ngOnInit', inject([ Dashboard ], (Dashboard) => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    Dashboard.ngOnInit();
    expect(console.log).toHaveBeenCalled();
  }));

});
