// Importables
import { Routes } from '@angular/router';
import { Creator } from './creator.component';
import { Observable } from 'rxjs';
import { CreatorGuard } from './creator.guard';
import { CreatorResolver } from './creator.resolver';

export const ROUTES: Routes = [
  {
    path: 'article',
    data: {
      title: 'Neuer Artikel',
      order: 1,
      isMenu: true
    },
    children: [
      {
        path: ':id',
        component: Creator,
      },
      {
        path: '',
        component: Creator,
        resolve: {
          channels: CreatorResolver
        },
        // canActivate: [CreatorGuard],
        // canDeactivate: [CreatorGuard]
      }
    ]
  },
];
