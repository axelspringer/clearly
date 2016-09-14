// Orchestra Module
import {
   NgModule,
   ModuleWithProviders
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Orchestra } from './orchestra.component';
import { FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';

// Components
import { Creator } from './+creator';
import { Editor } from './+editor';
import { Publisher } from './+publisher';
import { routing as RoutingModule } from './orchestra.routes';
import { MdModule } from '../app/app.material';

// TODO@sdoell: move to module
import { Highlight } from '../../directives';
import { DndModule } from '../../directives/dnd';
import { DFormModule } from '../dform';

import { CreatorEffects } from './+creator';
import {
  CreatorGuard,
  CreatorActions
} from './+creator';
import { CreatorResolver } from './+creator';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RoutingModule,
    MdModule,
    DndModule,
    DFormModule,
    EffectsModule.runAfterBootstrap(CreatorEffects)
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
    CreatorActions,
    CreatorGuard,
    CreatorResolver
  ]
})
export class OrchestraModule {}
