// Importables
import { Routes } from '@angular/router';
import { Creator } from './creator.component';
import { Observable } from 'rxjs';
import { CreatorGuard } from './creator.guard';
import { CreatorResolver } from './creator.resolver';

const routes: Routes = [
  {
    path: ':id',
    component: Creator,
  },
  {
    path: '',
    component: Creator,
    resolve: {
      doc: CreatorResolver
    },
    // canActivate: [CreatorGuard],
    // canDeactivate: [CreatorGuard]
  }
];

export const routing: Routes = routes;
