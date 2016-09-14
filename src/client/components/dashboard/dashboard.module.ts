// Importables
import {
   NgModule
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Components
import { MdModule } from '../app/app.material';
import { Dashboard } from './dashboard.component';
import { ArticlesList } from './articles';

// Routes
import { Routing } from './dashboard.routes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MdModule,
    Routing
  ],
  exports: [
    Dashboard,
    ArticlesList
  ],
  declarations: [
    Dashboard,
    ArticlesList
  ],
  providers: [
  ]
})
export class DashboardModule {}
