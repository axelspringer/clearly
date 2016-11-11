// Importables
import { Routes } from '@angular/router';
import { PublisherComponent } from './publisher.component';

const routes: Routes = [
  {
    path: ':id/publish', // have the publish today
    component: PublisherComponent,
  },
];

export const routing: Routes = routes;
