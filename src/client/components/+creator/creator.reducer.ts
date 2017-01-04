// Importables
import * as _ from 'lodash';

// interfaces
import * as fromCreatorActions from './creator.actions';

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

export default function (state = init, action: fromCreatorActions.Actions): ICreatorState  {

  switch (action.type) {

    case fromCreatorActions.ActionTypes.SELECT_TYPE: {
      return { ...state, selectedType: state.types[action.payload]
          ? action.payload
          : _.first(state.types) };
    }

    case fromCreatorActions.ActionTypes.LOAD: {
      return { ...state, loading: ++state.loading };
    }

    case fromCreatorActions.ActionTypes.LOAD_SUCCESS: {
      return { ...state, types: action.payload, loading: --state.loading };
    }

    case fromCreatorActions.ActionTypes.UPDATE: {
      return { ...state, ...action.payload };
    }

    default:
      return state;

  }

}

// slices
export const getTypes = (state: ICreatorState) => state.types;
export const getSelectedType   = (state: ICreatorState) => state.selectedType;
export const getArticleLoading  = (state: ICreatorState) => state.loading;
export const getArticleLoaded   = (state: ICreatorState) => state.loaded;
