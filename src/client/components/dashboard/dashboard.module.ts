// Importables
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Components
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
    Routing,
  ],
  exports: [
    DashboardComponent,
    ArticlesListComponent,
  ],
  declarations: [
    ArticlesListComponent,
    DashboardComponent,
  ],
})
export class DashboardModule {}
