import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Dashboard } from '../dashboard';
import { NoContent } from '../404';
import { Settings } from '../settings';
import { AuthGuard } from '../../guards';
import { routing as creatorRouting } from '../+creator';
import { ContentBuilderComponent } from '../content-builder';

export const ROUTES: Routes = [
  {
    canActivate: [
      AuthGuard
    ],
    path: '',
    component: Dashboard, // TODO@sdoell: move to module
  },
  {
    path: 'article',
    children: creatorRouting,
    data: {
      title: 'Neuer Artikel',
      order: 1,
      isMenu: true
    },
  },
  {
    path: 'settings',
    component: Settings,
  },
  {
    path: 'content-builder',
    component: ContentBuilderComponent,
    data: {
      title: 'Content Builder',
      isMenu: true
    }
  },
  {
    path: '**',
    component: NoContent,
  }
];
