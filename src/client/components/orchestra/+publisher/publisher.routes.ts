// Importables
import { ModuleWithProviders } from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';
import { Publisher } from './publisher.component';

const routes: Routes = [
  {
    path: ':id/publish', // have the publish today
    component: Publisher
  }
];

export const routing: Routes = routes;
