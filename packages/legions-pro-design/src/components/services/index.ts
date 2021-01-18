/*
 * @Author: duanguang
 * @Date: 2020-12-26 11:55:33
 * @LastEditTime: 2021-01-18 14:18:06
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/services/index.ts
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */

import {
    TableColumnsContainerEntity,
    TableListColumns,
  } from '../models';
import {LegionsFetch} from '../core'
/**
 *
 * 编辑自定义table列信息
 * @export
 * @returns
 */
export async function editTableColumns(
    modulesUid: string,
    customColumns: TableListColumns[],
    url: string,
) {
    const httpClient = new LegionsFetch();
    return httpClient.post<TableColumnsContainerEntity,{ modulesUid: string; customColumns: TableListColumns[]}>({
        url,
        parameter: { modulesUid,customColumns },
        model:TableColumnsContainerEntity,
    }).then(result => {
        return result;
    })
}

export async function queryTableColumns(modulesUid: string,url:string) {
    const httpClient = new LegionsFetch();
    return httpClient.get<TableColumnsContainerEntity,{modulesUid: string;}>({
        url,
        parameter: { modulesUid },
        model:TableColumnsContainerEntity
    }).then(result => {
        return result;
    })
}