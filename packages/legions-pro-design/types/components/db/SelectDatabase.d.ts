import { Database } from './Database';
export declare class SelectDatabaseDB extends Database {
    selectItem: any;
    /**
     *Creates an instance of SelectDatabase.
     * @param {string} name 数据库名称
     * @param {string} tableName 表格名称
     * @memberof SelectDatabase
     */
    constructor(tableName: string);
}
