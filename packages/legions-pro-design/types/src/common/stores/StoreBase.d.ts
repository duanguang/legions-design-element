/** @format */
import Store from 'legions/store';
import { StaticMeta } from 'brain-store/types/api/meta';
import { History } from '../typings/history';
export interface ISchedule {
    /**
     * 取消数据订阅
     *
     * @memberof ISchedule
     */
    unsubscribe: () => void | Function;
}
export interface IStoreBaseMeta extends StaticMeta {
}
export default class StoreBase<T = {}, P = {}> extends Store {
    static meta: IStoreBaseMeta;
    history: History;
    /**
     *
     * 订阅数据，在数据变化时，可以处理一些副作用，当你不需要监听时，请及时调用取消调用进行销毁
     * @param {...Array<any>} funcs 数组内第一个参数一定为函数类型
     * @returns {Array<Function>}
     * @memberof StoreBase
     */
    schedule(...funcs: Array<any>): ISchedule;
}
