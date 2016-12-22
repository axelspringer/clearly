import { Type } from '@angular/core';

import { SideNavLayoutComponent } from './layout';
import { SideNavComponent } from './sidenav';

export const LAYOUT_DIRECTIVES: Array<Type<any>> = [
  SideNavLayoutComponent,
  SideNavComponent,
];

export * from './layout';
export * from './sidenav';
