// Importables
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

// Components
import { CoreModule } from '../../core';
import { DFormComponent } from './dform.component';
import { DFormDynamicElementComponent } from './dform.element';
import { DFormTextComponent } from './text';
import { DFormTextAreaComponent } from './textarea';
import { DFormMetaTextComponent } from './metaText';
import { MdModule } from '../app/app.material';
import { DFormService } from './dform.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CoreModule,
    FormsModule,
    MdModule,
  ],
  declarations: [
    DFormComponent,
    DFormDynamicElementComponent,
    DFormTextComponent,
    DFormTextAreaComponent,
    DFormMetaTextComponent,
  ],
  exports: [
    CommonModule,
    CoreModule,
    DFormComponent,
    DFormDynamicElementComponent,
    DFormTextAreaComponent,
    DFormTextComponent,
    ReactiveFormsModule,
    DFormMetaTextComponent,
  ],
  providers: [
    DFormService,
  ],
})
export class DFormModule { };
