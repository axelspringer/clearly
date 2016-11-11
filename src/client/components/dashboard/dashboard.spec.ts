import { inject } from '@angular/core/testing';
import { async } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { BaseRequestOptions } from '@angular/http';
import { ConnectionBackend } from '@angular/http';
import { Http } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { StoreModule } from '@ngrx/store';

// Load the implementations that should be tested
import { DashboardComponent } from './dashboard.component';
import reducer from '../../reducers';

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
        deps: [MockBackend, BaseRequestOptions],
      },
      DashboardComponent,
      Title,
    ],
    imports: [
      StoreModule.provideStore(reducer),
    ],
  }));

  it('should have default data', async(() => {
    inject([ DashboardComponent ], (dashboard) => {
      expect(dashboard.user$).toEqual({userId: ''});
    });
  }));

  it('should have a title', async(() => {
    inject([ DashboardComponent, Title ], (dashboard, title) => {
      expect(!!dashboard.title$).toEqual(true);
      expect(title.getTitle()).toEqual(dashboard.title$);
    });
  }));

  it('should log ngOnInit', inject([ DashboardComponent ], (dashboard) => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    dashboard.ngOnInit();
    expect(console.log).toHaveBeenCalled();
  }));

});
