// Angular 2 Material
// https://github.com/angular/material2

import { NgModule, ModuleWithProviders } from '@angular/core';

import { MdButtonToggleModule } from '@angular2-material/button-toggle';
import { MdButtonModule } from '@angular2-material/button';
import { MdCheckboxModule } from '@angular2-material/checkbox';
import { MdRadioModule } from '@angular2-material/radio';
import { MdSlideToggleModule } from '@angular2-material/slide-toggle';
import { MdSliderModule } from '@angular2-material/slider';
import { MdSidenavModule } from '@angular2-material/sidenav';
import { MdListModule } from '@angular2-material/list';
import { MdGridListModule } from '@angular2-material/grid-list';
import { MdCardModule } from '@angular2-material/card/card';
import { MdIconModule } from '@angular2-material/icon';
import { MdProgressCircleModule } from '@angular2-material/progress-circle';
import { MdProgressBarModule } from '@angular2-material/progress-bar';
import { MdInputModule } from '@angular2-material/input/input';
import { MdTabsModule } from '@angular2-material/tabs/tabs';
import { MdToolbarModule } from '@angular2-material/toolbar/toolbar';
import { MdTooltipModule } from '@angular2-material/tooltip/tooltip';
import { MdRippleModule } from '@angular2-material/core/ripple/ripple';
// import { PortalModule } from '@angular2-material/core/portal/portal-directives';
// import { OverlayModule } from '@angular2-material/core/overlay/overlay-directives';
import { MdMenuModule } from '@angular2-material/menu';
// import { MdDialogModule } from '@angular2-material/dialog';
// import { RtlModule } from '@angular2-material/core/rtl/dir';
// import { MdLiveAnnouncer } from '@angular2-material/core/a11y/live-announcer';
import { MdCoreModule } from '@angular2-material/core';

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
  MdCoreModule
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
    // MdDialogModule.forRoot(),
    MdIconModule.forRoot(),
    MdMenuModule.forRoot(),
    MdRadioModule.forRoot(),
    MdTooltipModule.forRoot(),
    MdCoreModule.forRoot()
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

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MdRootModule
    };
  }

}
