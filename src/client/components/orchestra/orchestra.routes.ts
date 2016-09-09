// Importables
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component
import { Orchestra } from './orchestra.component';

// Routing
import { routing as creatorRouting } from './creator';
import { routing as editorRouting } from './editor';
import { routing as publisherRouting } from './publisher';

const routes: Routes = [
  {
    path: 'orchestra',
    component: Orchestra,
    data: {
      title: 'Neue Story',
      order: 1,
      isMenu: true
    },
    children: [].concat(
      creatorRouting,
      editorRouting,
      publisherRouting
    )
  }
];

export const routing: ModuleWithProviders
  = RouterModule.forChild(routes);
