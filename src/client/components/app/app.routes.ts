// Importables
import { Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard';
import { NoContentComponent } from '../404';
import { SettingsComponent } from '../settings';
import { AuthGuard } from '../../guards';

export const ROUTES: Routes = [
  {
    canActivate: [
      AuthGuard,
    ],
    path: '',
    component: DashboardComponent, // TODO@sdoell: move to module
  },
  {
    path: 'settings',
    component: SettingsComponent,
  },
  {
    path: '**',
    component: NoContentComponent,
  },
];
