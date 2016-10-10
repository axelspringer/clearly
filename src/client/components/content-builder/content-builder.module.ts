import { NgModule } from '@angular/core';
import { ContentBuilderComponent } from './content-builder.component';
import { MdModule } from '../app/app.material';

@NgModule({
  imports: [
    MdModule
  ],
  exports: [
    ContentBuilderComponent
  ],
  declarations: [
    ContentBuilderComponent
  ]
})
export class ContentBuilderModule {}
