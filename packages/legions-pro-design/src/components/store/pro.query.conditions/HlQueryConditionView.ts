/*
 * @Author: duanguang
 * @Date: 2021-01-07 16:49:31
 * @LastEditTime: 2021-01-07 18:01:29
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/store/pro.query.conditions/HlQueryConditionView.ts
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */

import { observable, action, StoreModules } from 'legions/store';
import { observableViewModel, observablePromise } from 'legions/store-utils';
import { ViewModel } from 'brain-store-utils';
import { computed,ObservableMap } from 'mobx';
import {LegionsFetch} from '../../core'
import { IObservableMap,ISelectAutoQuery,ISelectOptions } from './interface';
import { cloneDeep } from 'lodash'
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
            //@ts-ignore
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