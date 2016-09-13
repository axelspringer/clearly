import { Routes, RouterModule } from '@angular/router';
import { Dashboard } from '../dashboard';
import { NoContent } from '../404';
import { Settings } from '../settings';
import { AuthGuard } from '../../guards';


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
      title: 'Übersicht',
      order: 0,
      isMenu: true
    }
  },
  {
    path: 'settings',
    component: Settings
  },
  {
    path: '**',
    component: NoContent
  },
];
