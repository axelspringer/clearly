export interface IDBStore {
  primaryKey?: string;
  autoIncrement?: boolean;
}

export interface IDBSchema {
  name: string;
  version: number;
  stores: {[storename: string]: IDBStore};
}

export const IDB_COMPLETE = 'complete';
export const IDB_ERROR = 'error';
export const IDB_SUCCESS = 'success';
export const IDB_UPGRADE_NEEDED = 'upgradeneeded';

export const IDB_TXN_READ = 'readonly';
export const IDB_TXN_READWRITE = 'readwrite';
