// Importables
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Backpack } from './backpack.component';

const routes: Routes = [
  {
    path: 'backpack',
    component: Backpack,
    data: {
      title: 'Backback',
      order: 1,
      isMenu: true
    }
  }
];

export const routing: ModuleWithProviders
  = RouterModule.forChild(routes);
