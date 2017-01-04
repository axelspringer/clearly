// import
import { Action } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { Angular2Apollo } from 'angular2-apollo';
import { Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApolloQueryObservable } from 'angular2-apollo';

// interface
import * as query from './creator.graphql';
import * as fromCreatorActions from './creator.actions';

@Injectable()
export class CreatorEffects {

  @Effect() public loadArticleTypes$: Observable<Action> = this.actions$
    .ofType(fromCreatorActions.ActionTypes.LOAD)
    .switchMap(() => {
      if (this.query !== null) {
        this.query.refetch();
      }
      this.query = this.apollo.watchQuery({ query });
      return Observable.from(this.query)
        .map(res => res.data)
        .map(res => ({
          type: fromCreatorActions.ActionTypes.LOAD_SUCCESS,
          payload: res.articleTypes,
        }))
        .catch(error => Observable.of({
          type: fromCreatorActions.ActionTypes.LOAD_FAILURE,
          paylod: error,
        }));
    });

  private query: ApolloQueryObservable<any> = null;

  constructor(
    private actions$: Actions,
    private apollo: Angular2Apollo,
  ) {
  }

}
