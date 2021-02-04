import React from 'react';
import { IQuery } from '../LegionsProConditions/interface';
import { TableColumnConfig } from '../interface/antd';
import { InstanceProTable } from './interface';
import { PageListEntity } from './pageListEntity';
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
export declare class ProTableBaseClass<P, S, Columns = {}, QueryParams = any> extends React.Component<P, S> {
    static pageListEntity: typeof PageListEntity;
    tableRef: InstanceProTable;
    queryPrams: QueryParams;
    private queryDataMap;
    private columnsDataMap;
    queryData: Array<IQuery>;
    columnsData: Array<TableColumnConfig<Columns>>;
    constructor(props: P);
    /**
     * 添加表格列数据
     *
     * 主要在初始化列数据时使用
     *
     * @param {string} key column.dataIndex 或者 column.key
     * @memberof ProTableBaseClass
     */
    pushColumns(key: string, column: TableColumnConfig<Columns>): void;
    /**
     * 更新表格列数据信息
     *
     * @param {string} key
     * @param {TableColumnConfig<Columns>} column
     * @memberof ProTableBaseClass
     */
    updateColumns(key: string, column: TableColumnConfig<Columns>): void;
    pushQuery(key: string, query: IQuery): void;
    updateQuery(key: string, query: IQuery): void;
    /**
     * 刷新表格项数据
     *
     * 主要应用于表格列配置项自定义render需要更新时，需要强刷表格
     * @param columnKey  指定刷新表格项字段
     * @param callback 执行某个数据更新后，需要刷新表格项
     */
    refreshColumns(columnKey: string, callback: () => void): void;
    /**
     * 搜索查询
     * @param value
     * @param options
     */
    handleSearch: (value: QueryParams, options?: {
        onBeforeSearch?: (value: QueryParams) => QueryParams;
    }) => void;
    /**
     *  重置搜索结果
     *
     * @memberof ProTableBaseClass
     */
    handleReset: (value: QueryParams, options?: {
        onBeforeReset?: (value: QueryParams) => QueryParams;
    }) => void;
    onOpenCustomColumns: () => void;
}
