// Angular 2 Material
// https://github.com/angular/material2

import { NgModule, ModuleWithProviders } from '@angular/core';

import { MdButtonToggleModule } from '@angular/material';
import { MdButtonModule } from '@angular/material';
import { MdCheckboxModule } from '@angular/material';
import { MdRadioModule } from '@angular/material';
import { MdSlideToggleModule } from '@angular/material';
import { MdSliderModule } from '@angular/material';
import { MdSidenavModule } from '@angular/material';
import { MdListModule } from '@angular/material';
import { MdGridListModule } from '@angular/material';
import { MdCardModule } from '@angular/material';
import { MdIconModule } from '@angular/material';
import { MdProgressCircleModule } from '@angular/material';
import { MdProgressBarModule } from '@angular/material';
import { MdInputModule } from '@angular/material';
import { MdTabsModule } from '@angular/material';
import { MdToolbarModule } from '@angular/material';
import { MdTooltipModule } from '@angular/material';
import { MdRippleModule } from '@angular/material';
import { MdDialogModule } from '@angular/material';
// import { PortalModule } from '@angular2-material/core/portal/portal-directives';
// import { OverlayModule } from '@angular2-material/core/overlay/overlay-directives';
import { MdMenuModule } from '@angular/material';
// import { MdDialogModule } from '@angular2-material/dialog';
// import { RtlModule } from '@angular2-material/core/rtl/dir';
// import { MdLiveAnnouncer } from '@angular2-material/core/a11y/live-announcer';
import { MdCoreModule } from '@angular/material';

const MATERIAL_MODULES = [
  MdButtonModule,
  MdButtonToggleModule,
  MdCardModule,
  MdCheckboxModule,
  // MdDialogModule,
  MdGridListModule,
  MdIconModule,
  MdInputModule,
  MdListModule,
  MdMenuModule,
  MdProgressBarModule,
  MdProgressCircleModule,
  MdRadioModule,
  MdRippleModule,
  MdSidenavModule,
  MdSliderModule,
  MdSlideToggleModule,
  MdTabsModule,
  MdToolbarModule,
  MdTooltipModule,
  MdCoreModule,
  MdDialogModule,
  // OverlayModule,
  // PortalModule,
  // RtlModule,
];

@NgModule({

  imports: [
    MdButtonModule.forRoot(),
    MdCardModule.forRoot(),
    MdCheckboxModule.forRoot(),
    MdGridListModule.forRoot(),
    MdInputModule.forRoot(),
    MdListModule.forRoot(),
    MdProgressBarModule.forRoot(),
    MdProgressCircleModule.forRoot(),
    MdRippleModule.forRoot(),
    MdSidenavModule.forRoot(),
    MdSliderModule.forRoot(),
    MdSlideToggleModule.forRoot(),
    MdTabsModule.forRoot(),
    MdToolbarModule.forRoot(),
    // PortalModule,
    // RtlModule,

    // These modules include providers.
    MdButtonToggleModule.forRoot(),

    MdIconModule.forRoot(),
    MdMenuModule.forRoot(),
    MdRadioModule.forRoot(),
    MdTooltipModule.forRoot(),
    MdCoreModule.forRoot(),
    MdDialogModule.forRoot(),
    // OverlayModule.forRoot(),
  ],

  exports: MATERIAL_MODULES,
  // providers: [MdLiveAnnouncer]

})
export class MdRootModule { }

@NgModule({
  imports: MATERIAL_MODULES,
  exports: MATERIAL_MODULES,
})
export class MdModule {

  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: MdRootModule,
    };
  }

}
