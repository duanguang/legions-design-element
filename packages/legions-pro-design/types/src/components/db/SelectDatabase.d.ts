import { Database } from './Database';
import Dexie from 'dexie';
export declare class SelectDatabaseDB extends Database {
    selectItem: Dexie.Table;
    /**
     *Creates an instance of SelectDatabase.
     * @param {string} name 数据库名称
     * @param {string} tableName 表格名称
     * @memberof SelectDatabase
     */
    constructor(tableName: string);
}
