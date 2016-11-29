// Importables
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

// Actions
import { CreatorActions } from './creator.actions';

export interface ICreatorState {
  loaded: boolean;
  loading: number;
  types: any[];
  selectedType: number | undefined;
}

const init: ICreatorState = {
  loaded: false, // means to load data
  loading: 0,
  types: [],
  selectedType: undefined,
};

export default function (state = init, action: Action): ICreatorState  {

  switch (action.type) {

    case CreatorActions.SELECT_TYPE: {
      return Object.assign({}, state, {
        selectedType: state.types[action.payload]
          ? action.payload
          : _.first(state.types)
        });
    }

    case CreatorActions.LOAD: {
      return Object.assign({}, state, {
        loading: ++state.loading,
      });
    }

    case CreatorActions.LOAD_SUCCESS: {
      return Object.assign({}, state, {types: action.payload}, {loading: --state.loading});
    }

    case CreatorActions.UPDATE: {
      return Object.assign({}, state, action.payload);
    }

    default:
      return state;

  }

}

// selectors
export function getTypes() {
  return (state$: Observable<ICreatorState>) => state$
    .map(s => s.types);
}

export function getSelectedType() {
  return (state$: Observable<ICreatorState>) => state$
    .map(s => s.types[s.selectedType] || _.first(s.types));
}

export function getType(id: number) {
  return (state$: Observable<ICreatorState>) => state$
    .map(s => s.types[id] || []);
}

export function getArticleLoading() {
  return (state$: Observable<ICreatorState>) => state$
    .map(s => s.loading);
}

export function getArticleLoaded() {
  return (state$: Observable<ICreatorState>) => state$
    .map(s => s.loaded);
}
