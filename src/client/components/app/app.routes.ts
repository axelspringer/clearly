// components
import { AuthGuard } from '../../guards';
import { MainComponent } from '../main';
import { NoContentComponent } from '../404';
import { DashboardComponent } from '../dashboard';
import { LoginComponent } from '../login';

export const ROUTES: any = [
  {
    canActivate: [
      AuthGuard,
    ],
    path: '',
    canDeactivate: [],
    component: MainComponent, // TODO@sdoell: move to module
    children: [
      {
        path: '',
        component: DashboardComponent,
        name: 'Dashboard',
        menu: {
          title: 'Dashboard',
          show: true,
          order: 0,
          icon: 'home',
        },
      },
      {
        path: 'create',
        name: 'Creator',
        menu: {
          title: 'Neuer Artikel',
          show: true,
          order: 1,
          icon: 'document',
        },
        canActivate: [
          AuthGuard,
        ],
        canDeactivate: [
        ],
        loadChildren: '../+creator/creator.module#CreatorModule',
      },
    ],
  },
  {
    path: 'login',
    name: 'Login',
    canActivate: [],
    canDeactivate: [],
    component: LoginComponent,
  },
  {
    path: '**',
    component: NoContentComponent,
  },
];
