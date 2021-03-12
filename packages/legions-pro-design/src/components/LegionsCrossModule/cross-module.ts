/*
 * @Author: duanguang
 * @Date: 2021-01-04 11:22:33
 * @LastEditTime: 2021-03-02 16:55:05
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/LegionsCore/cross-module/index.ts
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
export { MasterGlobalStateStore } from './masterGlobalStateStore';
export { default as WorkerGlobalStateStore } from './workerGlobalStateStore';
export { IframePostMessage,subscribeLegionsProGlobal } from './globalStateEven';