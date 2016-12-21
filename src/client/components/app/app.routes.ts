// Importables
import { Routes } from './index';

// Components
import { AuthGuard } from '../../guards';
import { DashboardComponent } from '../dashboard';
import { NoContentComponent } from '../404';

export const ROUTES: Routes = [
  {
    canActivate: [
      AuthGuard,
    ],
    canDeactivate: [],
    component: DashboardComponent, // TODO@sdoell: move to module
    path: '',
    menu: {
      title: 'Dashboard',
      show: true,
      order: 0,
      icon: 'home',
    },
  },
  {
    path: '**',
    component: NoContentComponent,
  },
];
