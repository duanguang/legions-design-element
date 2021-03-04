/*
 * @Author: duanguang
 * @Date: 2021-03-03 16:30:27
 * @LastEditTime: 2021-03-04 15:40:12
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/LegionsCrossModule/index.ts
 * 「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
import { MasterGlobalStateStore,WorkerGlobalStateStore,IframePostMessage,subscribeLegionsProGlobal } from './cross-module';
const LegionsCrossModule = {
    MasterGlobalStateStore,
    WorkerGlobalStateStore,
    IframePostMessage,
    subscribeLegionsProGlobal
}
export default LegionsCrossModule