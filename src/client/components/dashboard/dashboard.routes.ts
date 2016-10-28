// Importables
import { ModuleWithProviders } from '@angular/core';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';

// Component
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: {
      title: 'Übersicht',
      order: 0,
      isMenu: true,
    },
    children: [].concat([]),
  },
];

export const Routing: ModuleWithProviders
  = RouterModule.forChild(routes);
