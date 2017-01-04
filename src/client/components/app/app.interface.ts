// imports
import { Route } from '@angular/router';

// exports
export interface IMenu {
  title: string;
  show: true;
  order?: number;
  icon?: string;
}

export interface IRoute extends Route {
  menu?: IMenu;
}

export type Routes = IRoute[];
