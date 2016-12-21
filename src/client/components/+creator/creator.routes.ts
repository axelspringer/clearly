// Importables
import { CreatorComponent } from './creator.component';
import { CreatorResolver } from './creator.resolver';
import { Routes } from '../app';

// Components
//import { AuthGuard } from '../../guards';

export const ROUTES: Routes = [
  {
    path: '', // later move to a url
    component: CreatorComponent,
    resolve: {
      types: CreatorResolver,
    },
  },
];
