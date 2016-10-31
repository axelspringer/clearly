// Importables
// import { CanActivate } from '@angular/router';
// import { CanActivateArticle } from './creator.guard';
// import { Observable } from 'rxjs';
import { CreatorComponent } from './creator.component';
import { CreatorResolver } from './creator.resolver';
import { Routes } from '@angular/router';

export const ROUTES: Routes = [
  {
    path: 'create',
    data: {
      title: 'Neuer Artikel',
      order: 1,
      isMenu: true,
    },
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
          channels: CreatorResolver,
        },
        // canActivate: [CreatorGuard],
        // canDeactivate: [CreatorGuard]
      },
    ],
  },
];
