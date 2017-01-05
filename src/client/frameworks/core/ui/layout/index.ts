import { Type } from '@angular/core';

import { SideNavLayoutComponent } from './layout';
import { SideNavComponent } from './sidenav';
import { SideNav } from './state';

export const LAYOUT_DIRECTIVES: Array<Type<any>> = [
  SideNavLayoutComponent,
  SideNavComponent,
];

export const LAYOUT_PROVIDERS: Array<Type<any>> = [
  SideNav,
];

export * from './layout';
export * from './sidenav';
export * from './state';
