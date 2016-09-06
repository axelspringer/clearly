import { Routes, RouterModule } from '@angular/router';
import { Home } from '../home';
import { NoContent } from '../404';
import { AuthGuard } from '../../guards';

import { DataResolver } from './app.resolver';


export const ROUTES: Routes = [
  {
    canActivate: [
      AuthGuard
    ],
    path: '',
    component: Home
  },
  { path: 'home',  component: Home },
  { path: '**',    component: NoContent },
];
