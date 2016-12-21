// components
import { AuthGuard } from '../../guards';
import { MainComponent } from '../main';
import { NoContentComponent } from '../404';
import { DashboardComponent } from '../dashboard';

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
        menu: {
          title: 'Dashboard',
          show: true,
          order: 0,
          icon: 'home',
        },
      },
      {
        path: 'create',
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
    path: '**',
    component: NoContentComponent,
  },
];
