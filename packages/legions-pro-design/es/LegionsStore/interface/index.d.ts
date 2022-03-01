import { StaticMeta } from 'brain-store/types/api/meta';
interface storeBaseMeta extends StaticMeta {
}
interface resourceEvent<T> {
    /**
     * 事件名称
     *
     * @type {string}
     */
    name: string;
    /**
     * 事件作用域
     *
     * @type {string}
     */
    scope: string;
    /**
     * 派发数据对象
     *
     * @type {T}
     */
    payload: T;
}
interface schedule {
    /**
     * 取消数据订阅
     *
     * @memberof ISchedule
     */
    unsubscribe: () => void | Function;
}
interface operation {
    name: string;
    scope: string;
}
interface resource {
    created: operation;
    events: string[];
    name: string;
    removed: operation;
    updated: operation;
}
export declare type legionsStoreInterface<ResourceEvent = {}> = {
    resource: resource;
    schedule: schedule;
    resourceEvent: resourceEvent<ResourceEvent>;
    storeBaseMeta: storeBaseMeta;
};
export {};
