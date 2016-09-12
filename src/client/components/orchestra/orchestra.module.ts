// Orchestra Module
import {
   NgModule,
   ModuleWithProviders
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Orchestra } from './orchestra.component';
import { FormsModule } from '@angular/forms';
import { routing as RoutingModule } from './orchestra.routes';
import { MdModule } from '../app/app.material';

// Components
import { Creator } from './creator';
import { Editor } from './editor';
import { Publisher } from './publisher';

// TODO@sdoell: move to module
import { Highlight } from '../../directives';
import { DndModule } from '../../directives/dnd';
import { DFormModule } from '../dform';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RoutingModule,
    MdModule,
    DndModule,
    DFormModule
  ],
  exports: [
    Orchestra
  ],
  declarations: [
    Orchestra,
    Creator,
    Editor,
    Publisher,
    Highlight
  ],
  providers: [
  ]
})
export class OrchestraModule {}
