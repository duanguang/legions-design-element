/*
 * @Author: duanguang
 * @Date: 2020-12-26 11:55:33
 * @LastEditTime: 2021-03-02 17:53:40
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/services/index.ts
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */

import LegionsModels from '../LegionsModels';
import LegionsCore from '../LegionsCore'
/**
 *
 * 编辑自定义table列信息
 * @export
 * @returns
 */
export async function editTableColumns(
    modulesUid: string,
    customColumns: InstanceType<typeof LegionsModels.TableListColumns>[],
    url: string,
) {
    const httpClient = new LegionsCore.LegionsFetch();
    return httpClient.post<InstanceType<typeof LegionsModels.TableColumnsContainerEntity>,{ modulesUid: string; customColumns: InstanceType<typeof LegionsModels.TableListColumns>[]}>({
        url,
        parameter: { modulesUid,customColumns },
        model:LegionsModels.TableColumnsContainerEntity,
    }).then(result => {
        return result;
    })
}

export async function queryTableColumns(modulesUid: string,url:string) {
    const httpClient = new LegionsCore.LegionsFetch();
    return httpClient.get<InstanceType<typeof LegionsModels.TableColumnsContainerEntity>,{modulesUid: string;}>({
        url,
        parameter: { modulesUid },
        model:LegionsModels.TableColumnsContainerEntity
    }).then(result => {
        return result;
    })
}