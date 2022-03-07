/*
 * @Author: duanguang
 * @Date: 2021-01-07 16:49:31
 * @LastEditTime: 2022-03-07 16:29:14
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/LegionsProConditions/store/conditionView.ts
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */

import { observable,action,StoreModules } from 'legions/store';
import { observableViewModel,observablePromise,ObservablePromiseModel } from 'legions/store-utils';
import { computed,ObservableMap } from 'mobx';
import LegionsCore from '../../LegionsCore'
import { cloneDeep } from 'lodash'
import { IProConditions } from '../ProConditionsUtils';
import LegionsModels from '../../LegionsModels';
import { runScriptsSdk } from 'legions-thirdparty-plugin';
import { setStorageItems,getStorageItem } from 'legions-utils-tool/storage'
import { ProSelect } from '../../LegionsProSelect/interface'
import {ProConditions} from '../interface'



export interface ISelectFetchData {
    keywords?: string,
     /** 列表数据 */
    data: ProSelect['options'][],
     /** 总数量 */
    total?: number,
}
// @ts-ignore
export interface IObservableMap<K,V> extends ObservableMap<K,V> { }
export interface IObservableMap<K,V> extends ObservableMap<V> { }
export class ConditionView<Query = {}> {
    constructor(uid: string = '') {
        this.uid = uid;
    }
    @observable private uid = ''
    /**
     * 查询条件
     *
     * @type {Object}
     * @memberof ConditionView
     */
    @observable private query: IObservableMap<string,IProConditions['componentModel']> = observable.map();
    /**
     *
     * 转换成接口所需数据
     * @type {Query}
     * @memberof ConditionView
     */
    @observable tranQuery: Query

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
    @observable widthContainer: number = document.body.clientWidth


    /**
     *
     * 搜索条件组件数据模型
     * @private
     * @type {Object}
     * @memberof ConditionView
     */
    @observable.ref private vmModel: any = null

    @observable private size: 'small' | 'default' = 'default';

    /** 下拉选择器接口请求数据 */
    @observable _select_data: IObservableMap<string,ISelectFetchData> = observable.map()
    @computed get computedQuery(): Array<IProConditions['componentModel']> {
        const value: Array<IProConditions['componentModel']> = [];
        for (let item of this.query.values()) {
            value.push(item);
        }
        return value
    }
    @computed get computedVmModel() {
        return JSON.parse(this.vmModel)
    }

    @computed get computedSize() {
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
    @action _clearQuery() {
        this.query.clear();
    }
    @action _firstInitQuery(query: Array<IProConditions['componentModel']>) {
        let caches: string[] = JSON.parse(getStorageItem(this.uid,'[]'))
        console.log(caches,'caches');
        const newQuery: Array<IProConditions['componentModel']> = [];
        query.map((item) => {
            newQuery.push(void 0)
        })
        if (caches.length) {
            caches = caches.filter((item) => query.find((id) => id.container.uuid == item));
            caches.map((item,_index) => {
                const itmIndex = query.findIndex((w) => item === w.container.uuid);
                if (_index === itmIndex) {
                    newQuery[_index] = query[_index]
                }
                else {
                    if (itmIndex > -1) {
                        const cacheQueryItem = query[itmIndex]
                        if (cacheQueryItem) {
                            newQuery[_index] = cacheQueryItem;

                        }
                    }
                }
            })
        }
    }
    @action _initQuery(query: Array<IProConditions['componentModel']>,options?: {
        isCache: boolean;

    }) {
        const caches: string[] = []
        query.map((item) => {
            const id = item.container.uuid;
            if (!this.query.has(id)) {
                this.query.set(id,item);
            }
        })
        if (options && options.isCache) {
            if (!runScriptsSdk.plugins.dexie) {
                setStorageItems(this.uid,JSON.stringify(caches))
            }
        }
    }
    /** 改变搜索条件配置数据 */
    @action _setQueryState<T extends IProConditions['componentModel']>(name: string,callback: (value: T) => void) {
        const item = this._getQueryItem(name);
        if (item) {
            //@ts-ignore
            callback && callback(item)
            if (this.query.has(item.container.uuid)) {
                this.query.set(item.container.uuid,cloneDeep(item))
            }
        }
    }
    @action private _getQueryItem(name: string) {
        let item = this.computedQuery.find((item) => item.container.name === name);
        if (item) {
            return this.query.get(item.container.uuid)
        } else {
            if (this.query.has(name)) {
                return this.query.get(name)
            }
        }
        return null
    }
    @action _setSize(size: 'small' | 'default') {
        this.size = size;
    }
    /** 移除指定搜索条件项  */
    @action _removeQuery(uuid: string) {
        return this.query.delete(uuid);
    }
    /** 设置下拉数据 */
    @action _setSelectData(key:string,value:ISelectFetchData) {
        this._select_data.set(key,value)
    }
}