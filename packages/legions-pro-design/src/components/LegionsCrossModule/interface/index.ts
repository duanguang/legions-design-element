/*
 * @Author: duanguang
 * @Date: 2022-02-28 17:00:55
 * @LastEditTime: 2022-02-28 17:00:55
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/LegionsCrossModule/interface/index.ts
 * 「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
interface GlobalStateEvent{
    name: string;
    scope: string;
  }
export interface legionsCrossModuleInterface{
    GlobalStateEvent:GlobalStateEvent
}