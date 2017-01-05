// Importables
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { Optional } from '@angular/core';
import { SkipSelf } from '@angular/core';

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
export class DashboardModule {

  constructor(@Optional() @SkipSelf() parentModule: DashboardModule) {
    if (parentModule) {
      throw new Error('CreatorModile already loaded; Only import it once.');
    }
  }

}
