// imports
import { CreatorComponent } from './creator.component';

// others
import { Routes } from '../app';
import { CreatorGuard } from './creator.guard';

// exports
export const ROUTES: Routes = [
  {
    path: '', // later move to a url
    component: CreatorComponent,
    canActivate: [
      CreatorGuard,
    ],
  },
];
