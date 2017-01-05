// Importables
import { Angular2Apollo } from 'angular2-apollo';
import { ApolloQueryObservable } from 'angular2-apollo';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { TranslateService } from 'ng2-translate';

// We need this to parse graphql string
import gql from 'graphql-tag';

// Components
import { EventEmitProvider } from '../../frameworks/core';
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

  // TypeScript public modifiers
  constructor(
    private _translate: TranslateService,
    // legacy
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

  }

  public ngOnInit() {
    console.log('hello `Dashboard` component');

    this._translate.get(this.i18nTitle).subscribe(translation => {
      EventEmitProvider.connect(StatusTitleUpdate.prototype.constructor.name).emit(translation);
    });

  }

}
