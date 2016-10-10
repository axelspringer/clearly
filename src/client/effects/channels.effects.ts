// Importables
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { Store } from '@ngrx/store';
import { AppState } from '../components/app';
import { Actions } from '@ngrx/effects';
import { Effect } from '@ngrx/effects';
import { OnDestroy } from '@angular/core';

import { Angular2Apollo } from 'angular2-apollo';
import { ApolloQueryObservable } from 'angular2-apollo';
import { ApolloQueryResult } from 'apollo-client';

// We need this to parse graphql string
import gql from 'graphql-tag';

// Components
import { ChannelsActions } from '../actions';

@Injectable()
export class ChannelsEffects implements OnDestroy {

  @Effect() loadChannels$: Observable<Actions> = this.actions$
    .ofType(ChannelsActions.LOAD)
    .switchMap(action =>
      Observable.fromPromise(this.apollo.query({
        query: gql`
          query RootQuery {
            channels {
              template {
                id,
                name,
                displayName,
                contentTypes {
                  id,
                  name,
                  displayName,
                  formType,
                },
                metaDataTypes {
                  id,
                  name,
                  displayName,
                  formType
                },
                isEnabled
              }
            }
          }
        `,
      }))
      .map(res => {
        return {
          type: ChannelsActions.LOAD_SUCCESS,
          payload: res.data.channels
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

  ngOnDestroy () {

  }

}
