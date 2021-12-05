/*
 * @Author: duanguang
 * @Date: 2020-12-29 10:21:54
 * @LastEditTime: 2021-12-04 21:48:29
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/db/SelectDatabase.ts
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
import { Database } from './Database';
import { runScriptsSdk } from 'legions-thirdparty-plugin';
import Dexie from 'dexie';
export class SelectDatabaseDB extends Database {
  //@ts-ignore Dexie.Table<ISelectDatabaseDB, number>;
  public selectItem: Dexie.Table; // id is number in this case

  /**
   *Creates an instance of SelectDatabase.
   * @param {string} name 数据库名称
   * @param {string} tableName 表格名称
   * @memberof SelectDatabase
   */
  public constructor(tableName: string) {
    super();
    if (!runScriptsSdk.plugins.dexie) {
      runScriptsSdk.subscribe('dexie',() => {
        // @ts-ignore
        const db = runScriptsSdk.plugins.dexie.getInstanceDexie(
          tableName
        );
        if (db && db.db) {
          this.selectItem = db.db.table('selectData');
        }
      });
    } else {
      // @ts-ignore
      const db = runScriptsSdk.plugins.dexie.getInstanceDexie(
        tableName
      );
      if (db && db.db) {
        this.selectItem = db.db.table('selectData');
      }
    }
  }
}
