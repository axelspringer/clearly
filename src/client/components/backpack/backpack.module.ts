// Backpack Module
import {
   NgModule,
   ModuleWithProviders
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Backpack } from './backpack.component';
import { FormsModule } from '@angular/forms';
import { routing as RoutingModule } from './backpack.routes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RoutingModule
  ],
  exports: [
    Backpack
  ],
  declarations: [
    Backpack
  ]
})
export class BackpackModule {}
