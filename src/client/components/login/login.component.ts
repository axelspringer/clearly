// Importables
import { Angular2Apollo } from 'angular2-apollo';
import { ApolloQueryObservable } from 'angular2-apollo';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TranslateService } from 'ng2-translate';

// We need this to parse graphql string
import gql from 'graphql-tag';

// Components
import { EventEmitProvider } from '../../core';
import { DocsActions } from '../../actions';
import { IAppState } from '../app';
import { getDocs } from '../app';
import { StatusTitleUpdate } from '../status';

@Component({
  selector: 'sg-dashboard',  // <sg-dashboard></sg-dashboard>
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

  // properties

  public i18nTitle = 'COMPONENT.DASHBOARD.TITLE';
  public ok: ApolloQueryObservable<any>;

  private articles$: Observable<any>;

  // TypeScript public modifiers
  constructor(
    private _translate: TranslateService,
    // legacy
    private store: Store<IAppState>,
    private docsActions: DocsActions,
    private apollo: Angular2Apollo,
  ) {

    this.ok = this.apollo.query({
      query: gql`
        query RootQuery {
          ok {
            status
          }
        }
      `,
    }) as ApolloQueryObservable<any>;

    // this.ok.then(res => this.ok = res.data.ok.status);

    this.articles$ = this.store.let(getDocs());
    this.store.dispatch(this.docsActions.load());

  }

  public ngOnInit() {
    console.log('hello `Dashboard` component');

    this._translate.get(this.i18nTitle).subscribe(translation => {
      EventEmitProvider.connect(StatusTitleUpdate.prototype.constructor.name).emit(translation);
    });

  }

}
