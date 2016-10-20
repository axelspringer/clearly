// Importables
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { Store } from '@ngrx/store';
import { AppState } from '../components/app';
import { Actions } from '@ngrx/effects';
import { Effect } from '@ngrx/effects';
import { OnDestroy } from '@angular/core';
import * as R from 'ramda';

import { Angular2Apollo } from 'angular2-apollo';
import { ApolloQueryObservable } from 'angular2-apollo';
import { ApolloQueryResult } from 'apollo-client';

// We need this to parse graphql string
import gql from 'graphql-tag';

// Components
import { ArticleActions } from './article.actions';

// Queries, for now; could also be a function, or should be?
const articleQuery = () => {
  return gql`
    query RootQuery {
      articleType {
        name
        displayName,
        channels {
          name
          displayName
          metaData {
            name
            displayName
            formType,
            isRequired
          }
          content {
            name
            displayName
            formType,
            isRequired
          }
          isEnabled,
          isMaster
        }
      }
    }
  `;
};

@Injectable()
export class ArticleEffects implements OnDestroy {

  @Effect() loadArticle$: Observable<Actions> = this.actions$
    .ofType(ArticleActions.LOAD)
    .switchMap(action =>
      Observable.fromPromise(this.apollo.query({
        query: articleQuery()
      }))
        .map(res => res['data'].articleType) // should be sorted later
        .map(res => {
          return {
            type: ArticleActions.LOAD_SUCCESS,
            payload: res
          };
        })
        .catch(err => Observable.of({
          type: 'LOAD_FAILURE',
          paylod: err
        })));

  constructor(
    private actions$: Actions,
    private apollo: Angular2Apollo
  ) {

  }

  ngOnDestroy() {

  }

}
