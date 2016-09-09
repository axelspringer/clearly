// Importables
import { ModuleWithProviders } from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';
import { Creator } from './creator.component';

const routes: Routes = [
  {
    path: ':id',
    component: Creator
  },
  {
    path: '',
    component: Creator
  },
  {
    path: 'edit',
    component: Creator
  }
];

export const routing: Routes = routes;
