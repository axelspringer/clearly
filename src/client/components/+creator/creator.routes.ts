// Importables
import { CreatorComponent } from './creator.component';
import { CreatorResolver } from './creator.resolver';
import { Routes } from '@angular/router';

// Components
import { AuthGuard } from '../../guards';

export const ROUTES: Routes = [
  {
    path: 'create',
    data: {
      title: 'Neuer Artikel',
      order: 1,
      isMenu: true,
    },
    canActivate: [
      AuthGuard,
    ],
    canDeactivate: [
    ],
    // canActivateChild: [CanActivateArticle],
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
