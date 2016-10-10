// Importables
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

// Actions
import { ChannelsActions } from '../actions';

export interface ChannelsState {
  loaded: boolean;
  loading: number;
  channels: Array<any>;
}

const init: ChannelsState = {
  loaded: false,
  loading: 0,
  channels: []
};

export default function (state = init, action: Action): ChannelsState  {

  switch (action.type) {

    case ChannelsActions.LOAD: {
      return Object.assign({}, state, {
        loading: ++state.loading
      });
    }

    case ChannelsActions.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        channels: action.payload,
        loading: --state.loading
      });
    }

    default:
      return state;

  }

}

export function getChannels() {
  return (state$: Observable<ChannelsState>) => state$
    .map(s => s.channels);
}

export function getChannelsLoading() {
  return (state$: Observable<ChannelsState>) => state$
    .map(s => s.loading);
}

export function getChannelsLoaded() {
  return (state$: Observable<ChannelsState>) => state$
    .map(s => s.loaded);
}
