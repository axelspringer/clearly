// Importables
import { ModuleWithProviders } from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';

// Component
import { Dashboard } from './dashboard.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: Dashboard,
    data: {
      title: 'Übersicht',
      order: 0,
      isMenu: true
    },
    children: [].concat([])
  }
];

export const Routing: ModuleWithProviders
  = RouterModule.forChild(routes);
