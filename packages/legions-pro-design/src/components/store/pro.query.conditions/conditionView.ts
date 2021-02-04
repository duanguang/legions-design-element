/*
 * @Author: duanguang
 * @Date: 2021-01-07 16:49:31
 * @LastEditTime: 2021-02-04 18:21:30
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/store/pro.query.conditions/conditionView.ts
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */

import { observable, action, StoreModules } from 'legions/store';
import { observableViewModel, observablePromise } from 'legions/store-utils';
import { ViewModel } from 'brain-store-utils';
import { computed,ObservableMap } from 'mobx';
import {LegionsFetch} from '../../core'
import { IObservableMap,ISelectAutoQuery,ISelectOptions } from './interface';
import { cloneDeep } from 'lodash'
import { IProConditions } from '../../LegionsProConditions/ProConditionsUtils';
import { SelectKeyValue } from '../../models';
export class ConditionView<Query = {}> {
    /**
     * 查询条件
     *
     * @type {Object}
     * @memberof ConditionView
     */
    @observable private query:  IObservableMap<string,IProConditions['componentModel']> = observable.map();
    /**
     *
     * 转换成接口所需数据
     * @type {Query}
     * @memberof ConditionView
     */
    @observable tranQuery:Query

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
     * @memberof ConditionView
     */
    @observable widthContainer:number =document.body.clientWidth


    /**
     *
     * 搜索条件组件数据模型
     * @private
     * @type {Object}
     * @memberof ConditionView
     */
    @observable.ref private vmModel: any = null

    @observable private size: 'small' | 'default' = 'default';

    @observable selectOptions: IObservableMap<string,ISelectOptions> = observable.map()
    @computed get computedQuery():Array<IProConditions['componentModel']> {
        const value: Array<IProConditions['componentModel']> = [];
        for (let item of this.query.values()) {
          value.push(item);
        }
        return value
    }
    @computed get computedVmModel(){
        return JSON.parse(this.vmModel)
    }

    @computed get computedSize(){
       return this.size
    }
    /**
     * xs: 宽度<768px 响应式栅格，可为栅格数或一个包含其他属性的对象 
     * 
     * sm:宽度≥768px 响应式栅格，可为栅格数或一个包含其他属性的对象 
     * 
     * md: 宽度≥992px 响应式栅格，可为栅格数或一个包含其他属性的对象
     * 
     * lg: 宽度≥1200px 响应式栅格，可为栅格数或一个包含其他属性的对象
     * 
     * xl:宽度≥1600px 响应式栅格，可为栅格数或一个包含其他属性的对象
     */
    @computed get compuedResolution(): 'xs' | 'sm' | 'md' | 'lg' | 'xl' {
        const width = this.widthContainer;
        if (width >= 1600) {/** 宽度≥1600px 响应式栅格，可为栅格数或一个包含其他属性的对象 */
            return 'xl'
        }
        else if (width >= 1200 && width < 1600) { /**宽度≥1200px 响应式栅格，可为栅格数或一个包含其他属性的对象 */
            return 'lg'
        }
        else if (width >= 992 && width < 1200) {/**宽度≥992px 响应式栅格，可为栅格数或一个包含其他属性的对象 */
            return 'md'
        }
        else if (width >= 768 && width < 992) {/**宽度≥768px 响应式栅格，可为栅格数或一个包含其他属性的对象 */
            return 'sm';
        }
        else if (width < 768) {
            return 'xs'
        }
        return null;
    }
    /**
     *  更新数据模型
     *
     * @param {Object} model
     * @memberof HlQueryConditionView
     */
    @action _setVmModel(model: Object) {
        this.vmModel = JSON.stringify(model)
    }
    @action _initQuery(query:Array<IProConditions['componentModel']>) {
        query.map((item) => {
            const id = item.containerProps.uuid;
            if (!this.query.has(id)) {
                this.query.set(id,item);
            }
        })
    }
    /** 改变搜索条件配置数据 */
    @action _setQueryState(name:string,callback: (value: IProConditions['componentModel']) => void) {
        const item = this._getQueryItem(name);
        if (item) {
            callback && callback(item)
            if (this.query.has(item.containerProps.uuid)) {
                this.query.set(item.containerProps.uuid,cloneDeep(item))
            }
        }
    }
    @action private _getQueryItem(name:string) {
        const item = this.computedQuery.find((item) => item.containerProps.name === name);
        if (item) {
           return this.query.get(item.containerProps.uuid)
        }
        return null
    }
    @action _setSize(size: 'small' | 'default') {
        this.size = size;
    }
    @action _dispatchRequest(name:string,autoQuery: ISelectAutoQuery,options: {
        pageIndex: number;
        pageSize?: number;
        keyWords?: string;
        /** 接口请求完成触发 */
      callback?: (value:any) => void;
    } = { pageIndex: 1,pageSize: 30 }) {
        if (autoQuery) {
            const server = new LegionsFetch()
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
                let model = {
                    onBeforTranform: (value) => {
                      options.callback && options.callback(value);
                      return {
                        responseData: value,
                        mappingEntity:autoQuery.mappingEntity,
                      }
                    },
                  }
                if (autoQuery.method === 'post') {
                    return server.post<any,any>({
                        url: autoQuery.ApiUrl,
                        parameter: params,
                        headers: { ...autoQuery.options,'api-cookie': autoQuery.token },
                        model: SelectKeyValue,
                        ...model,
                    })
                }
                else if (autoQuery.method === 'get') {
                    return server.get<any,any>({
                        url: autoQuery.ApiUrl,
                        parameter: params,
                        headers: { ...autoQuery.options,'api-cookie': autoQuery.token },
                        model:SelectKeyValue,
                        ...model,
                    })
                }
            }
            this.selectOptions.set(name,{
                obData:observablePromise<{}>(apiServer()),
            })
        }
    }
}