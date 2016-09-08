import { Routes, RouterModule } from '@angular/router';
import { Dashboard } from '../dashboard';
import { NoContent } from '../404';
import { AuthGuard } from '../../guards';

import { DataResolver } from './app.resolver';


export const ROUTES: Routes = [
  {
    canActivate: [
      AuthGuard
    ],
    path: '',
    component: Dashboard // TODO@sdoell: move to module
  },
  {
    path: 'dashboard',
    component: Dashboard,
    data: {
      title: 'Dashboard',
      order: 0,
      isMenu: true
    }
  },
  {
    path: '**',
    component: NoContent
  },
];
