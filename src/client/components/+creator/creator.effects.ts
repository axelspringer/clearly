// Importables
import { Action } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { Angular2Apollo } from 'angular2-apollo';
import { Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApolloQueryObservable } from 'angular2-apollo';
import gql from 'graphql-tag';
import * as articleQuery from './creator.graphql';

// Components
import { CreatorActions } from './creator.actions';

console.log('TEST1', articleQuery);

const query = gql`
  query rootQuery {
    articleTypes {
      name,
      displayName,
      channels {
        id,
        name,
        displayName,
        isEnabled
      },
      contexts {
        id,
        name,
        displayName,
        formType {
          name,
          options {
            required,
            type,
            channels
          }
        }
      }
    }
  }
`;

@Injectable()
export class CreatorEffects {

  @Effect() public loadArticleTypes$: Observable<Action> = this._actions
    .ofType(CreatorActions.LOAD)
    .switchMap(() => {
      if (this._query !== null) {
        this._query.refetch();
      }
      this._query = this._apollo.watchQuery({ query });
      return Observable.from(this._query)
        .map(res => res.data)
        .map(res => ({
          type: CreatorActions.LOAD_SUCCESS,
          payload: res.articleTypes,
        }))
        .catch(error => Observable.of({
          type: CreatorActions.LOAD_FAILURE,
          paylod: error,
        }));
    });

  private _query: ApolloQueryObservable<any> = null;

  constructor(
    private _actions: Actions,
    private _apollo: Angular2Apollo,
  ) {
  }

}
