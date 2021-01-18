/*
 * @Author: duanguang
 * @Date: 2021-01-13 11:06:29
 * @LastEditTime: 2021-01-14 09:49:28
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/LegionsProTable/ProTableBaseClass.tsx
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
import React from 'react';
import { IQuery } from '../LegionsProQueryConditions/interface';
import { observable,action,StoreModules, } from 'legions/store';
import { ObservableMap,toJS } from 'mobx';
import * as mobx from 'mobx';
import { TableColumnConfig } from '../interface/antd';
import { InstanceProTable } from './interface';
import { PageListEntity } from './pageListEntity';
import { ClassOf } from 'legions-lunar/types/api/typescript';
/**
 * 列表组件基类
 *
 * 包含常用方法，例如搜索，重置，搜索条件，列表列配置数据等                   
 * @export
 * @class ProTableBaseClass
 * @extends {React.Component<P, S>}
 * @template P props 类型约束
 * @template S state 类型约束
 * @template Columns 列配置类型约束
 * @template QueryParams 搜索条件对象类型约束结构 默认any类型
 */
export class ProTableBaseClass<P,S,Columns = {},QueryParams = any> extends React.Component<P,S>{
    static pageListEntity = PageListEntity;
    tableRef: InstanceProTable = null;
    //@ts-ignore
    queryPrams: QueryParams = {}
    @observable private queryDataMap = observable.map<string,IQuery>();
    @observable private columnsDataMap = observable.map<string,TableColumnConfig<Columns>>();
    @observable queryData: Array<IQuery> = [];
    @observable columnsData: Array<TableColumnConfig<Columns>> = [];
    constructor(props:P) { 
        super(props)
        this.queryDataMap.observe(chan => {
            if (mobx['useStrict']) {
                // @ts-ignore
                if (this.queryDataMap.values().length) {
                    //@ts-ignore
                    this.queryData = this.queryDataMap.values()
                }
            } else if (mobx['configure']) { 
                const values:IQuery[] = [];
                this.queryDataMap.forEach((item, key) => {
                  values.push(item);
                });
                this.queryData = values;
            }
        })
        this.columnsDataMap.observe(chan => {
            if (mobx['useStrict']) {
                // @ts-ignore
                if (this.columnsDataMap.values().length) {
                    //@ts-ignore
                    this.columnsData = toJS(this.columnsDataMap.values())
                }
            } else if (mobx['configure']) { 
                const values:TableColumnConfig<Columns>[] = [];
                this.columnsDataMap.forEach((item, key) => {
                  values.push(item);
                });
                this.columnsData = toJS(values);
            }
        })
    }

    /**
     * 添加表格列数据
     * 
     * 主要在初始化列数据时使用
     *
     * @param {string} key column.dataIndex 或者 column.key 
     * @memberof ProTableBaseClass
     */
    @action pushColumns(key:string,column:TableColumnConfig<Columns>) {
        if (!this.columnsDataMap.has(key)) {
            if (!column['key']) {
                column['key'] = key;
            }
            if (!column['dataIndex']) {
                column['dataIndex'] = key;
            }
            this.columnsDataMap.set(key,column);
        }
    }
    /**
     * 更新表格列数据信息
     *
     * @param {string} key
     * @param {TableColumnConfig<Columns>} column
     * @memberof ProTableBaseClass
     */
    @action updateColumns(key: string,column: TableColumnConfig<Columns>) {
        if (this.columnsDataMap.has(key)) {
            const old = this.columnsDataMap.get(key);
            this.columnsDataMap.set(key,{...old,...column});
        }
    }
    @action pushQuery(key:string,query:IQuery) {
        if (!this.queryDataMap.has(key)) {
            this.queryDataMap.set(key,query);
        }
    }
    @action updateQuery(key: string,query:IQuery) {
        if (this.queryDataMap.has(key)) {
            const old = this.queryDataMap.get(key);
            this.queryDataMap.set(key,{...old,...query});
        }
    }
    /**
     * 刷新表格项数据
     * 
     * 主要应用于表格列配置项自定义render需要更新时，需要强刷表格
     * @param columnKey  指定刷新表格项字段
     * @param callback 执行某个数据更新后，需要刷新表格项
     */
    @action refreshColumns(columnKey:string,callback: () => void) {
        if (typeof callback === 'function') {
            callback();
            this.updateColumns(columnKey,{});
        }
    }
    /**
     * 搜索查询
     * @param value 
     * @param options 
     */
    handleSearch = (value: QueryParams,options?: {
        onBeforeSearch?:(value:QueryParams)=>QueryParams
    }) => {
        let val = value;
        if (options) {
            if (typeof options.onBeforeSearch === 'function') {
                val = options.onBeforeSearch(val);
            }
        } 
        this.queryPrams = {
          ...this.queryPrams,
          ...val,
        };
        this.tableRef.methods.onSearch();
    };
    /**
     *  重置搜索结果
     *
     * @memberof ProTableBaseClass
     */
    handleReset = (value:QueryParams,options?: {
        onBeforeReset?:(value:QueryParams)=>QueryParams
    }) => {
        let val = value;
        if (options) {
            if (typeof options.onBeforeReset === 'function') {
                val = options.onBeforeReset(val);
            }
        } 
        this.handleSearch(val);
    };
    onOpenCustomColumns = () => {
        this.tableRef.methods.openCustomColumns();
    };
    /* createModel<Model>(model:Model) {
        const models: PageListEntity<Model> = new PageListEntity({
            model,
            filtersListData: (value) => {
                return value['result']
            }
       })
    } */
}