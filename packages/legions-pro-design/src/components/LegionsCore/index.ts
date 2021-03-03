
/*
 * @Author: duanguang
 * @Date: 2020-12-18 16:08:25
 * @LastEditTime: 2021-03-02 16:56:21
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/LegionsCore/index.ts
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
import { LegionsFetch } from './legionsFetch';
import { project } from './constant.project';
import * as StorageKeysDataSet from './constant.storageKeys';
import { MasterGlobalStateStore,WorkerGlobalStateStore,IframePostMessage,subscribeLegionsProGlobal } from './cross-module';
const LegionsCore = {
    LegionsFetch,
    project,
    StorageKeysDataSet,
    MasterGlobalStateStore,
    WorkerGlobalStateStore,
    IframePostMessage,
    subscribeLegionsProGlobal
}

export default LegionsCore;