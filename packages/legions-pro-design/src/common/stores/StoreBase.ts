/** @format */

import Store from 'legions/store';
import { autorun } from 'mobx';
// mobx.useStrict(true);
import { StaticMeta } from 'brain-store/types/api/meta';
import { IResourceEvent } from './event/resourceEvent';
import { schedule } from 'legions-lunar/schedule';
import { History } from '../typings/history';
import { project } from '../containers/config';
interface IDispatchPrams {
  name: string;
  scope: string;
}
export interface ISchedule {
  /**
   * 取消数据订阅
   *
   * @memberof ISchedule
   */
  unsubscribe: () => void | Function;
}
interface IContext {
  dispatch: (name: IDispatchPrams, payload: Object) => {};
  _manage: any;
}
export interface IStoreBaseMeta extends StaticMeta {}
export default class StoreBase<T = {}, P = {}> extends Store {
  static meta: IStoreBaseMeta = {
    ...Store.meta,
    namespace: project.name,
  };
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
