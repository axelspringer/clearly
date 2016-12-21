// Importables
import { Route } from '@angular/router';

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

// App
export * from './app.module';
export * from './app.component';
export * from './app.store';
export * from './app.actions';


