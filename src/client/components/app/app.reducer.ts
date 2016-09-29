// Importables
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

const init = [];

export default function (state = init, action: Action)  {

  switch (action.type) {

    default:
      return state;

  }

}
