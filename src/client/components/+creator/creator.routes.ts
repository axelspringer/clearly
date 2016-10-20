// Importables
import { CanActivateArticle } from './creator.guard';
import { Creator } from './creator.component';
import { CreatorResolver } from './creator.resolver';
import { Observable } from 'rxjs';
import { Routes, CanActivate } from '@angular/router';

export const ROUTES: Routes = [
  {
    path: 'create',
    data: {
      title: 'Neuer Artikel',
      order: 1,
      isMenu: true
    },
    // canActivateChild: [CanActivateArticle],
    children: [
      {
        path: ':id',
        component: Creator
      },
      {
        path: '', // later move to a url
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
