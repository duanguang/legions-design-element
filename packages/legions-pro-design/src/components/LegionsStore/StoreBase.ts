/*
 * @Author: duanguang
 * @Date: 2020-12-26 11:23:17
 * @LastEditTime: 2021-07-20 01:26:30
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/LegionsStore/StoreBase.ts
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
/** @format */

import Store from 'legions/store';
// mobx.useStrict(true);
import { project } from './resourceEvent';
import { ISchedule } from './interface';
import { schedule as schedules } from 'legions-lunar/schedule';
import { History } from '../interface/history';
import { IStoreBaseMeta } from './interface';
interface IDispatchPrams {
  name: string;
  scope: string;
}
interface IContext {
  dispatch: (name: IDispatchPrams, payload: Object) => {};
  _manage: any;
}
function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o), r, ar = [], e;
  try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  }
  catch (error) { e = { error: error }; }
  finally {
      try {
          if (r && !r.done && (m = i["return"])) m.call(i);
      }
      finally { if (e) throw e.error; }
  }
  return ar;
}

function __spread() {
  for (var ar = [], i = 0; i < arguments.length; i++)
      ar = ar.concat(__read(arguments[i]));
  return ar;
}
export default class StoreBase<T = {}, P = {}> extends Store {
  static meta: IStoreBaseMeta = {
    ...Store.meta,
    namespace: project.name,
  };
  //@ts-ignore
  context: T & IContext;
  //@ts-ignore
  history: History = this.context._manage.history;

  /**
   *
   * 订阅数据，在数据变化时，可以处理一些副作用，当你不需要监听时，请及时调用取消调用进行销毁
   * @param {...Array<any>} funcs 数组内第一个参数一定为函数类型
   * @returns {Array<Function>}
   * @memberof StoreBase
   */
  schedule(): ISchedule {
    let funcs = [];
    for (let _i = 0; _i < arguments.length; _i++) {
        funcs[_i] = arguments[_i];
    }
    return   schedules.apply(void 0, __spread(funcs));
  }
}
