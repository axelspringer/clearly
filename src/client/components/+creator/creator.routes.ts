// Importables
import { CreatorComponent } from './creator.component';
import { CreatorResolver } from './creator.resolver';
import { Routes } from '../app';

// Components
import { AuthGuard } from '../../guards';

export const ROUTES: Routes = [
  {
    path: 'create',
    menu: {
      title: 'Neuer Artikel',
      show: true,
      order: 1,
    },
    canActivate: [
      AuthGuard,
    ],
    canDeactivate: [
    ],
    children: [
      {
        path: ':id',
        component: CreatorComponent,
      },
      {
        path: '', // later move to a url
        component: CreatorComponent,
        resolve: {
          types: CreatorResolver,
        },
      },
    ],
  },
];
