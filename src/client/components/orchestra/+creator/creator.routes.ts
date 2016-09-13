// Importables
import {
  Routes,
  RouterModule
} from '@angular/router';
import { Creator } from './creator.component';
import { CreatorResolver } from './creator.resolver';

const routes: Routes = [
  {
    path: ':id',
    component: Creator,
  },
  {
    path: '',
    component: Creator,
    resolve: {
      _id: CreatorResolver
    }
  },
  {
    path: 'edit',
    component: Creator,
  }
];

export const routing: Routes = routes;
