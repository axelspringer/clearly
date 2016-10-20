// Importables
import { Angular2Apollo } from 'angular2-apollo';
import { ApolloQueryObservable } from 'angular2-apollo';
import { ApolloQueryResult } from 'apollo-client';
import { Component } from '@angular/core';
import { Inject } from 'angular/core';
import { Store } from '@ngrx/store';
import { Title } from '@angular/platform-browser';
import { Actions } from '@ngrx/effects';
import { Observable } from 'rxjs';

// We need this to parse graphql string
import gql from 'graphql-tag';

// Components
import { EventEmitProvider } from '../../core';
import { ToolbarTitleUpdate } from '../toolbar';
import { DocsActions } from '../../actions';
import { AppState } from '../app';
import { getDocs } from '../app';
import { client } from './../app/app.apollo';

@Component({
  selector: 'dashboard',  // <dashboard></dashboard>
  styleUrls: ['./dashboard.style.css'],
  templateUrl: './dashboard.component.html'
})
export class Dashboard {

  public ok: ApolloQueryObservable<any>;

  private store$: any;
  private user$: any;
  private title$ = 'Übersicht';
  private pirate$ = '';
  private isPirate$: boolean = false;

  private articles$: Observable<any>;
  private actions: Actions;

  // TypeScript public modifiers
  constructor(
    private store: Store<AppState>,
    private title: Title,
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
    setTimeout(() => {
      this.store.dispatch(this.docsActions.load());
    }, 2500);

  }

  ngOnInit() {
    console.log('hello `Dashboard` component');
    this.title.setTitle(this.title$);

    EventEmitProvider.connect(ToolbarTitleUpdate.prototype.constructor.name).emit(this.title$);

    // this.db.allDocs()
    //   .subscribe(val => console.log(val));

  }

  isPirate(answer: boolean) {

    if (answer) {
      this.isPirate$ = answer;
      this.pirate$ = 'http://i.giphy.com/26tn1ToaMhpOEetkA.gif';
    }

  }

}
