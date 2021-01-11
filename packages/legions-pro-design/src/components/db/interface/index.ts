/*
 * @Author: duanguang
 * @Date: 2021-01-06 16:56:11
 * @LastEditTime: 2021-01-06 16:56:19
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/models/interface/index.ts
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
export interface ISelectDatabaseDB {
    id?: number;
    modulesKeys: string;
    keywords: string;
    pageIndex: number;
    value: string;
    total: number;
  }