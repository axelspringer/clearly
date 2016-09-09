// Orchestra Module
import {
   NgModule,
   ModuleWithProviders
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Orchestra } from './orchestra.component';
import { FormsModule } from '@angular/forms';
import { routing as RoutingModule } from './orchestra.routes';

// Components
import { Creator } from './creator';
import { Editor } from './editor';
import { Publisher } from './publisher';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RoutingModule
  ],
  exports: [
    Orchestra
  ],
  declarations: [
    Orchestra,
    Creator,
    Editor,
    Publisher
  ]
})
export class OrchestraModule {}
