import { IRouter } from '../../interface/router';
import { MenuEntity } from '../../models';
import { StoreSpace } from 'brain-store';
export interface IStoreBaseMeta extends StoreSpace.PramsMeta {
}
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
    menuList?: Array<MenuEntity>;
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
