/*
 * @Author: duanguang
 * @Date: 2021-01-07 16:23:39
 * @LastEditTime: 2021-03-02 18:12:09
 * @LastEditors: duanguang
 * @Description:
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/LegionsStore/interface/index.ts
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
import { IRouter } from '../../interface/router';
import LegionsModels from '../../LegionsModels';
import { StoreSpace } from 'brain-store';
export interface IStoreBaseMeta extends StoreSpace.PramsMeta {}
export interface IResourceEvent<T> {
  /**
   * 事件名称
   *
   * @type {string}
   * @memberof IResourceEvent
   */
  name: string;

  /**
   * 事件作用域
   *
   * @type {string}
   * @memberof IResourceEvent
   */
  scope: string;

  /**
   * 派发数据对象
   *
   * @type {T}
   * @memberof IResourceEvent
   */
  payload: T;
}
export interface ITriggerEventPrams {
  collapsed?: boolean;
  menuList?: Array<InstanceType<typeof LegionsModels.MenuEntity>>;
  router?: Array<IRouter>;
}

export interface ISchedule {
    /**
     * 取消数据订阅
     *
     * @memberof ISchedule
     */
    unsubscribe: () => void | Function;
}