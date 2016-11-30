// Importables
import { Action } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { Angular2Apollo } from 'angular2-apollo';
import { Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import gql from 'graphql-tag';

// Components
import { CreatorActions } from './creator.actions';

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
    .switchMap(() =>
       this._apollo.query({
        query,
      })
      .map(res => res.data) // slice
      .map(res => ({
        type: CreatorActions.LOAD_SUCCESS,
        payload: res.articleTypes,
      }))
      .catch(error => Observable.of({
        type: CreatorActions.LOAD_FAILURE,
        paylod: error,
      })));

  constructor(
    private _actions: Actions,
    private _apollo: Angular2Apollo,
  ) {
  }

}
