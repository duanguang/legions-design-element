/*
 * @Author: duanguang
 * @Date: 2020-12-29 16:44:16
 * @LastEditTime: 2020-12-29 17:26:01
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/store/pro.query.conditions/index.ts
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
/** @format */

import StoreBase, { IStoreBaseMeta } from '../StoreBase';
import { observable, action } from 'legions/store';
import { observableViewModel, observablePromise } from 'legions/store-utils';
import { ViewModel } from 'brain-store-utils';
import { computed,ObservableMap } from 'mobx';
import {LegionsFetch} from '../../core'
import { cloneDeep } from 'lodash'
import { IAntdSelectOption } from '../../interface/antd';
import { HeadersPrams } from 'legions/fetch';
type Proxify<T> = { [P in keyof T]: T[P] };
// @ts-ignore
export interface IObservableMap<K,V> extends ObservableMap<K,V>{ } 
export interface IObservableMap<K,V> extends ObservableMap<V>{ } 

export interface ISelectOptions{
    keywords?: string,
    // @ts-ignore
    obData:observablePromise.PramsResult<any>
}
export interface ISelectAutoQuery<Model={}>{
    
    /**
     * 查询参数
     *
     * @memberof ISelectAutoQuery
     */
    params: (pageIndex: number,pageSize: number,keyWords: string,other?:Object) => Object & {
        
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
    requestBeforeTransformParams?:(value:ISelectAutoQuery['params'])=>Object

    /**
     * 请求接口
     *
     * @type {string}
     */
    ApiUrl: string;
    method: 'get' | 'post'
    
    /**
     * headers 参数
     *
     * @type {(HeadersPrams & Object)}
     * @memberof ISelectAutoQuery
     */
    options?: HeadersPrams & Object

    /**
     *
     * 数据模型
     * 
     * 一般用于定义接口返回结构
     * @type {Model}
     * @memberof ISelectAutoQuery
     */
    model: Model

    /**
     * 下拉数据绑定前转换绑定数据结构
     * 
     * 当外部数据不确定时，此时我们需要一个适配器转换从接口中取到的数据，用于绑定下拉选项
     * @memberof ISelectAutoQuery
     */
    transform:(value:observablePromise.PramsResult<any>)=>{total:number,data:IAntdSelectOption[]}
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
export class HlQueryConditionView<Query = {}> {
    /**
     * 查询条件
     *
     * @type {Object}
     * @memberof HlQueryConditionView
     */
    @observable private query: Query;


    /**
     *
     * 转换成接口所需数据
     * @type {Query}
     * @memberof HlQueryConditionView
     */
    @observable tranQuery:Query
    /**
     *
     * 搜索条件左侧组件集合
     * @private
     * @type {React.ReactNode[]}
     * @memberof HlQueryConditionView
     */
    @observable private queryLeftComponent: JSX.Element = null


    /**
     * 搜索条件右侧组件集合
     *
     * @private
     * @type {React.ReactNode[]}
     * @memberof HlQueryConditionView
     */
    @observable private queryRightComponent: JSX.Element = null

    /**
     * 动态排版区域组件
     *
     * @private
     * @type {JSX.Element}
     * @memberof HlQueryConditionView
     */
    @observable private queryContentComponent:JSX.Element = null
    /**
     * 组件在 dom 树的真实高度
     * 自动获取的
     *  请勿组件外部不要修改这个值
     *
     * @type {number}
     * @memberof HlQueryConditionView
     */
    @observable domHeight: number = 45;

    /**
     *
     * 容器宽度
     * @type {number}
     * @memberof HlQueryConditionView
     */
    @observable widthContainer:number =document.body.clientWidth


    /**
     *
     * 搜索条件组件数据模型
     * @private
     * @type {Object}
     * @memberof HlQueryConditionView
     */
    @observable.ref private vmModel: string = null

    @observable private size: 'small' | 'default' = 'default';

    @observable selectOptions:IObservableMap<string,ISelectOptions> = observable.map()
    @computed get computedQuery() {
        return this.query;
    }
    @computed get computedVmModel(){
        return JSON.parse(this.vmModel)
    }

    /**
     * 搜索条件右侧组件集合
     *
     * @readonly
     * @memberof HlQueryConditionView
     */
    @computed get computedLeftComponent() {
        return this.queryLeftComponent
    }

    /**
     * 动态排布区域组件
     *
     * @readonly
     * @memberof HlQueryConditionView
     */
    @computed get computedContentComponent() {
        return this.queryContentComponent
    }
    /**
     *
     * 搜索左侧组件集合
     * @readonly
     * @memberof HlQueryConditionView
     */
    @computed get computedRightComponent() {
        return this.queryRightComponent
    }
    @computed get computedSize(){
       return this.size
    }
    /**
     *  更新数据模型
     *
     * @param {Object} model
     * @memberof HlQueryConditionView
     */
    @action setVmModel(model: Object) {
        this.vmModel = JSON.stringify(model)
    }
    @action setLeftComponent(left: JSX.Element = null) {
        this.queryLeftComponent = left
    }
    @action setRightComponent(right: JSX.Element = null) {
        this.queryRightComponent = right
    }
    @action setContentComponent(content: JSX.Element = null) {
        this.queryContentComponent = content
    }
    @action setQuery(query:Query) {
        this.query= query
    }
    @action setSize(size: 'small' | 'default') {
        this.size = size;
    }
    @action dispatchRequest(name:string,autoQuery: ISelectAutoQuery,options: {
        pageIndex: number;
        pageSize?: number;
        keyWords?: string;
    }={pageIndex:1,pageSize:30}) {
        if (autoQuery) {
            const server = new LegionsFetch()
            /* const keyWords = options.keyWords || '' */
            const apiServer = () => {
                const {pageIndex, pageSize,keyWords='',...props} = options
                let params = cloneDeep(autoQuery.params(options.pageIndex,options.pageSize,keyWords,props))
                delete params.pageIndex;
                delete params.pageSize
                delete params.defaultKeyWords;
                if (autoQuery.requestBeforeTransformParams) {
                    params = autoQuery.requestBeforeTransformParams({...params,pageIndex:options.pageIndex,pageSize:options.pageSize})
                }
                if (autoQuery.method === 'post') {
                    return server.post<typeof autoQuery.model,any>({
                        url: autoQuery.ApiUrl,
                        parameter: params,
                        headerOption: { ...autoQuery.options,'api-cookie': autoQuery.token },
                        //@ts-ignore
                        model:autoQuery.model,
                    })
                }
                else if (autoQuery.method === 'get') {
                    return server.get<typeof autoQuery.model,any>({
                        url: autoQuery.ApiUrl,
                        parameter: params,
                        headerOption: { ...autoQuery.options,'api-cookie': autoQuery.token },
                        //@ts-ignore
                        model:autoQuery.model,
                    })
                }
            }
            this.selectOptions.set(name,{
                obData:observablePromise<{}>(apiServer()),
            })
        }
    }
}

export declare type IViewQueryConditionStore<Query = {}> = ViewModel<HlQueryConditionView<Query>> & Proxify<HlQueryConditionView<Query>>;
export default class ProQueryConditionStore<Query = {}> extends StoreBase {
    static meta: IStoreBaseMeta = {
        ...StoreBase.meta,
        className: 'ProQueryConditionStore',
    };
    constructor(context) {
        super(context);
    }
    @observable HlQueryConditionContainer = observable.map<ViewModel<HlQueryConditionView<Query>> & Proxify<HlQueryConditionView<Query>>>();

    @action add(uid: string) {
        this.HlQueryConditionContainer.set(uid, observableViewModel<HlQueryConditionView<Query>>(new HlQueryConditionView()));
    }
    @action delete(uid: string) {
        this.HlQueryConditionContainer.delete(uid);
    }
    @action get(uid: string) {
        return this.HlQueryConditionContainer.get(uid);
    }
}
