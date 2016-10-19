import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Dashboard } from '../dashboard';
import { NoContent } from '../404';
import { Settings } from '../settings';
import { AuthGuard } from '../../guards';
import { routing as creatorRouting } from '../+creator';

export const ROUTES: Routes = [
  {
    canActivate: [
      AuthGuard
    ],
    path: '',
    component: Dashboard, // TODO@sdoell: move to module
  },
  {
    path: 'settings',
    component: Settings,
  },
  {
    path: '**',
    component: NoContent,
  }
];
