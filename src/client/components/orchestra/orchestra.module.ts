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
import {
  Dragabble,
  Highlight
} from '../../directives';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RoutingModule,
    MdModule
  ],
  exports: [
    Orchestra
  ],
  declarations: [
    Orchestra,
    Creator,
    Editor,
    Publisher,
    Dragabble,
    Highlight
  ]
})
export class OrchestraModule {}
