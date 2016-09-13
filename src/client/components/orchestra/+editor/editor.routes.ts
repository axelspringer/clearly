// Importables
import { ModuleWithProviders } from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';
import { Editor } from './editor.component';

const routes: Routes = [
  {
    path: ':id/edit',
    component: Editor
  }
];

export const routing: Routes = routes;
