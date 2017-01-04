// guards
import { AuthGuard } from '../../guards';
import { BootGuard } from '../../guards';

// components
import { MainComponent } from '../main';
import { NoContentComponent } from '../404';
import { DashboardComponent } from '../dashboard';
import { LoginComponent } from '../login';
import { BootComponent } from '../boot';

export const ROUTES: any = [
  {
    canActivate: [
      BootGuard,
      AuthGuard,
    ],
    path: '',
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
    path: 'boot',
    name: 'Boot',
    canActivate: [],
    canDeactivate: [],
    component: BootComponent,
  },
  {
    path: 'login',
    name: 'Login',
    canActivate: [
      BootGuard,
    ],
    canDeactivate: [],
    component: LoginComponent,
  },
  {
    path: '**',
    component: NoContentComponent,
  },
];
