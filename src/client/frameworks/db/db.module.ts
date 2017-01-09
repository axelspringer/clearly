// imports
import { ModuleWithProviders } from '@angular/core';
import { NgModule } from '@angular/core';
import { Optional } from '@angular/core';
import { SkipSelf } from '@angular/core';

// database provider
import { DatabaseProvider } from './db.provider';
import { getIDBFactory } from './db.provider';
import { IDB_FACTORY } from './db.provider';
import { IDB_SCHEMA } from './db.provider';
import { IDBSchema } from './db.interface';

export const DATABASE_PROVIDER = [
  DatabaseProvider,
  {
    provide: IDB_FACTORY,
    useFactory: getIDBFactory,
  },
];

@NgModule({
  providers: [
    ...DATABASE_PROVIDER,
  ],
})
export class DbModule {

  public static forRoot(schema: IDBSchema): ModuleWithProviders {
    return {
      ngModule: DbModule,
      providers: [
        {
          provide: IDB_SCHEMA,
          useValue: schema,
        },
      ],
    };
  }

  constructor(
    @Optional() @SkipSelf() parentModule: DbModule,
  ) {
    if (parentModule) {
      throw new Error(`DbModule already loaded; Import in root module only`);
    }
  }

};

export { DatabaseProvider } from './db.provider.ts';
