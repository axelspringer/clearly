// Importables
import {
   NgModule,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Components
import { MdModule } from '../app/app.material';
import { DashboardComponent } from './dashboard.component';
import { ArticlesListComponent } from './articles';
import { CoreModule } from '../../core';

// Routes
import { Routing } from './dashboard.routes';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    MdModule,
    Routing,
  ],
  exports: [
    DashboardComponent,
    ArticlesListComponent,
  ],
  declarations: [
    DashboardComponent,
    ArticlesListComponent,
  ],
})
export class DashboardModule {}
