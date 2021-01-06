/*
 * @Author: duanguang
 * @Date: 2020-12-26 10:40:08
 * @LastEditTime: 2020-12-31 10:52:37
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/interface/pro.store/index.ts
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */


export interface ISchedule {
    /**
     * 取消数据订阅
     *
     * @memberof ISchedule
     */
    unsubscribe: () => void | Function;
}
export type { IPanes,IRouter } from './layout';
