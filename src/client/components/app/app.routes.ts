// Importables
import { Routes } from '@angular/router';

// Components
import { AuthGuard } from '../../guards';
import { BootGuard } from '../../guards';
import { DashboardComponent } from '../dashboard';
import { NoContentComponent } from '../404';
import { SettingsComponent } from '../settings';

export const ROUTES: Routes = [
  {
    canActivate: [
      BootGuard,
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
