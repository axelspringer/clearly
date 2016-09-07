// Database service
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/RX';
import PouchDB = require('pouchdb');

import { DBConfig } from '../config';

@Injectable()
export class DBService {

  private db;

  constructor() {

    this.initDB();

  }

  initDB() {
    this.db = new PouchDB(DBConfig.NAME); // defaults to idb
  }

}
