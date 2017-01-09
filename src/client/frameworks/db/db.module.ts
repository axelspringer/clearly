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
export class DatabaseModule {

  public static forRoot(schema: IDBSchema): ModuleWithProviders {
    return {
      ngModule: DatabaseModule,
      providers: [
        {
          provide: IDB_SCHEMA,
          useValue: schema,
        },
      ],
    };
  }

  constructor(
    @Optional() @SkipSelf() parentModule: DatabaseModule,
  ) {
    if (parentModule) {
      throw new Error(`DatabaseModule already loaded! Import only in the root module.`);
    }
  }

};

export { DatabaseProvider } from './db.provider.ts';
