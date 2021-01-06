/*
 * @Author: duanguang
 * @Date: 2020-12-26 11:23:17
 * @LastEditTime: 2020-12-26 11:27:25
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/store/StoreBase.ts
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
/** @format */

import Store from 'legions/store';
// mobx.useStrict(true);
import { project } from '../core';
import { StoreSpace } from 'brain-store';
import { ISchedule } from '../interface/pro.store';
import { schedule } from 'legions-lunar/schedule';
import { History } from '../interface/history';
interface IDispatchPrams {
  name: string;
  scope: string;
}
interface IContext {
  dispatch: (name: IDispatchPrams, payload: Object) => {};
  _manage: any;
}
export interface IStoreBaseMeta extends StoreSpace.PramsMeta {}
export default class StoreBase<T = {}, P = {}> extends Store {
  static meta: IStoreBaseMeta = {
    ...Store.meta,
    namespace: project.name,
  };
  //@ts-ignore
  context: T & IContext;
  history: History = this.context._manage.history;

  /**
   *
   * 订阅数据，在数据变化时，可以处理一些副作用，当你不需要监听时，请及时调用取消调用进行销毁
   * @param {...Array<any>} funcs 数组内第一个参数一定为函数类型
   * @returns {Array<Function>}
   * @memberof StoreBase
   */
  schedule(...funcs: Array<any>): ISchedule {
    return schedule(...funcs);
  }
}
