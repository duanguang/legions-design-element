import { ObservableMap } from 'mobx';
import { ObservablePromiseModel } from 'legions/store-utils';
import { ViewModel } from 'brain-store-utils/types/create-view-model';
import { IAntdSelectOption } from '../../interface/antd';
import { ConditionView } from '../conditionView';
import LegionsModels from '../../LegionsModels';
declare type Proxify<T> = {
    [P in keyof T]: T[P];
};
export interface IObservableMap<K, V> extends ObservableMap<K, V> {
}
export interface IObservableMap<K, V> extends ObservableMap<V> {
}
export interface ISelectOptions {
    keywords?: string;
    obData: ObservablePromiseModel<any>;
}
declare type HeadersPrams = {
    'Content-Type'?: 'application/json' | 'application/x-www-form-urlencoded';
};
export interface ISelectAutoQuery<Model = {}> {
    /**
     * 查询参数
     *
     * @memberof ISelectAutoQuery
     */
    params: (pageIndex: number, pageSize: number, keyWords: string, other?: Object) => Object & {
        /**
         * 表单下拉组件通过此参数获取页码
         *
         * 传入到接口时，会自动移除
         *
         * @type {number}
         */
        pageIndex: number;
        /**
         * 表单下拉组件通过此参数获取页大小
         *
         * 传入到接口时，会自动移除
         *
         * @type {number}
         */
        pageSize: number;
        /**
         *
         * 默认搜索关键词
         *
         * 只在表单组件初次装载有效
         * @type {string}
         */
        defaultKeyWords?: string;
    };
    /**
     *  发送请求前转换条件函数
     *
     * @memberof ISelectAutoQuery
     */
    requestBeforeTransformParams?: (value: ISelectAutoQuery['params']) => Object;
    /**
     * 请求接口
     *
     * @type {string}
     */
    ApiUrl: string;
    method: 'get' | 'post';
    /**
     * headers 参数
     *
     * @type {(HeadersPrams & Object)}
     * @memberof ISelectAutoQuery
     */
    options?: HeadersPrams & Object;
    /**
         * 转换服务端数据
         *
         *
         * 如果不想写model,则通过此函数先把数据转换成约定结构，在由底层固定model去转换
         */
    mappingEntity: (that: InstanceType<typeof LegionsModels.SelectKeyValue>, responseData: any) => InstanceType<typeof LegionsModels.KeyValue>[];
    /**
     * 下拉数据绑定前转换绑定数据结构
     *
     * 当外部数据不确定时，此时我们需要一个适配器转换从接口中取到的数据，用于绑定下拉选项
     * @memberof ISelectAutoQuery
     */
    transform: (value: ObservablePromiseModel<InstanceType<typeof LegionsModels.SelectKeyValue>>) => {
        total: number;
        data: IAntdSelectOption[];
    };
    /**
     *
     * 授权信息令牌
     *
     * 一般用作权限验证
     * @type {string}
     * @memberof ISelectAutoQuery
     */
    token?: string | (() => string);
    /**
    * 在下拉组件装载时是否默认自动发送请求
    *
    * 不传入或者等于true 时发送请求
    */
    isInitialize?: boolean;
}
export declare type IViewQueryConditionStore<Query = {}> = ViewModel<ConditionView<Query>> & Proxify<ConditionView<Query>>;
export {};
