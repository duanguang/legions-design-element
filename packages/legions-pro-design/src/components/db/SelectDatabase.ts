/*
 * @Author: duanguang
 * @Date: 2020-12-29 10:21:54
 * @LastEditTime: 2021-01-19 15:46:22
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/db/SelectDatabase.ts
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
import { Database } from './Database';
import { legionsThirdpartyPlugin } from 'legions-thirdparty-plugin';
import {ISelectDatabaseDB} from './interface'
//
// Declare Database
//
export class SelectDatabaseDB extends Database {
  //@ts-ignore Dexie.Table<ISelectDatabaseDB, number>;
  public selectItem: any; // id is number in this case

  /**
   *Creates an instance of SelectDatabase.
   * @param {string} name 数据库名称
   * @param {string} tableName 表格名称
   * @memberof SelectDatabase
   */
  public constructor(tableName: string) {
    super();
    if (!legionsThirdpartyPlugin.plugins.dexie) {
      legionsThirdpartyPlugin.subscribe('dexie',() => {
        const db = legionsThirdpartyPlugin.plugins.dexie.getInstanceDexie(
          tableName
        );
        if (db && db.db) {
          this.selectItem = db.db.table('selectData');
        }
      });
    } else {
      
      const db = legionsThirdpartyPlugin.plugins.dexie.getInstanceDexie(
        tableName
      );
      if (db && db.db) {
        this.selectItem = db.db.table('selectData');
      }
    }
  }
}
