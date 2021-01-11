import { ObservableMap } from 'mobx';
import { observablePromise } from 'legions/store-utils';
import { ViewModel } from 'brain-store-utils';
import { HeadersPrams } from 'legions/fetch';
import { IAntdSelectOption } from '../../../interface/antd';
import { HlQueryConditionView } from '../HlQueryConditionView';
declare type Proxify<T> = {
    [P in keyof T]: T[P];
};
export interface IObservableMap<K, V> extends ObservableMap<K, V> {
}
export interface IObservableMap<K, V> extends ObservableMap<V> {
}
export interface ISelectOptions {
    keywords?: string;
    obData: observablePromise.PramsResult<any>;
}
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
     *
     * 数据模型
     *
     * 一般用于定义接口返回结构
     * @type {Model}
     * @memberof ISelectAutoQuery
     */
    model: Model;
    /**
     * 下拉数据绑定前转换绑定数据结构
     *
     * 当外部数据不确定时，此时我们需要一个适配器转换从接口中取到的数据，用于绑定下拉选项
     * @memberof ISelectAutoQuery
     */
    transform: (value: observablePromise.PramsResult<any>) => {
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
    token: string;
    /**
    * 在下拉组件装载时是否默认自动发送请求
    *
    * 不传入或者等于true 时发送请求
    */
    isInitialize?: boolean;
}
export declare type IViewQueryConditionStore<Query = {}> = ViewModel<HlQueryConditionView<Query>> & Proxify<HlQueryConditionView<Query>>;
export {};
