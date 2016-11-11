// Importables
import { Action } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { Angular2Apollo } from 'angular2-apollo';
import { Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import gql from 'graphql-tag';

// Components
import { ArticleActions } from './article.actions';

const query = gql`
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
}`;

@Injectable()
export class ArticleEffects {

  @Effect() public loadArticle$: Observable<Action> = this.actions$
    .ofType(ArticleActions.LOAD)
    .switchMap(() =>
       this.apollo.query({
        query: query,
      })
      .map(res => res['data'].articleType) // should be sorted later
      .map(res => {
        return {
          type: ArticleActions.LOAD_SUCCESS,
          payload: res,
        };
      })
      .catch(err => Observable.of({
        type: 'LOAD_FAILURE',
        paylod: err,
      })));

  constructor(
    private actions$: Actions,
    private apollo: Angular2Apollo,
  ) {
  }

}
