import React from 'react';
import { IQueryCheckBoxProps, IQueryDateProps, IQueryRadioButtonProps, IQueryRangePickerProps, IQuerySelectProps, IQueryTextAreaProps, IQueryTextNumberProps, IQueryTextProps } from './interface';
import { ColSize } from 'antd/lib/grid/col';
import { IViewQueryConditionStore } from '../store/pro.query.conditions/interface';
interface ColProps {
    className?: string;
    span?: number;
    order?: number;
    offset?: number;
    push?: number;
    pull?: number;
    /** 宽度<768px 响应式栅格，可为栅格数或一个包含其他属性的对象  */
    xs?: number | ColSize;
    /** 宽度≥768px 响应式栅格，可为栅格数或一个包含其他属性的对象 */
    sm?: number | ColSize;
    /** 宽度≥992px 响应式栅格，可为栅格数或一个包含其他属性的对象 */
    md: number | ColSize;
    /** 宽度≥1200px 响应式栅格，可为栅格数或一个包含其他属性的对象 */
    lg: number | ColSize;
    /** 宽度≥1600px 响应式栅格，可为栅格数或一个包含其他属性的对象 */
    xl: number | ColSize;
    prefixCls?: string;
    style?: React.CSSProperties;
}
interface IContainerProps {
    col: ColProps;
    name: string;
}
export declare class ConditionSelectModel {
    containerProps: IContainerProps;
    conditionsProps: IQuerySelectProps;
    jsonProperty: string;
    constructor(containerProps: IContainerProps, conditionsProps: IQuerySelectProps, jsonProperty: string);
}
export declare class ConditionTextNumberModel {
    containerProps: IContainerProps;
    conditionsProps: IQueryTextNumberProps;
    jsonProperty: string;
    constructor(containerProps: IContainerProps, conditionsProps: IQueryTextNumberProps, jsonProperty: string);
}
export declare class ConditionRadioButtonModel {
    containerProps: IContainerProps;
    conditionsProps: IQueryRadioButtonProps;
    jsonProperty: string;
    constructor(containerProps: IContainerProps, conditionsProps: IQueryRadioButtonProps, jsonProperty: string);
}
export declare class ConditionTextAreaModel {
    containerProps: IContainerProps;
    conditionsProps: IQueryTextAreaProps;
    jsonProperty: string;
    constructor(containerProps: IContainerProps, conditionsProps: IQueryTextAreaProps, jsonProperty: string);
}
export declare class ConditionTextModel {
    containerProps: IContainerProps;
    conditionsProps: IQueryTextProps;
    jsonProperty: string;
    constructor(containerProps: IContainerProps, conditionsProps: IQueryTextProps, jsonProperty: string);
}
export declare class ConditionDateModel {
    containerProps: IContainerProps;
    conditionsProps: IQueryDateProps;
    jsonProperty: string;
    constructor(containerProps: IContainerProps, conditionsProps: IQueryDateProps, jsonProperty: string);
}
interface IQuerySearchConfigProps {
    /**查询按钮的文本 */
    searchText?: string;
    /** 重置按钮的文本*/
    resetText?: string;
    /**收起按钮的 render */
    collapseRender?: (collapsed: boolean, showCollapseButton?: boolean) => React.ReactNode;
    /** 默认是否收起	 */
    defaultCollapsed?: boolean;
    /** 收起按钮的事件 */
    onCollapse?: (collapsed: boolean) => void;
    /** 自定义操作栏 */
    onSearch: (value: any, viewEntity?: IViewQueryConditionStore) => void;
    onReset?: (value: any, viewEntity?: IViewQueryConditionStore) => void;
}
export declare class ConditionSearchModel {
    containerProps: IContainerProps;
    conditionsProps: IQuerySearchConfigProps;
    constructor(containerProps: IContainerProps, conditionsProps: IQuerySearchConfigProps);
}
export declare class ConditionRangePickerModel {
    containerProps: IContainerProps;
    conditionsProps: IQueryRangePickerProps;
    jsonProperty: string;
    constructor(containerProps: IContainerProps, conditionsProps: IQueryRangePickerProps, jsonProperty: string);
}
export declare class ConditionCheckBoxModel {
    containerProps: IContainerProps;
    conditionsProps: IQueryCheckBoxProps;
    jsonProperty: string;
    constructor(containerProps: IContainerProps, conditionsProps: IQueryCheckBoxProps, jsonProperty: string);
}
interface IRenderComponentBaseParams<T> {
    /**
     *
     * 容器参数
     * @type {containerProps}
     * @memberof IRenderComponentParams
     */
    containerProps: IContainerProps;
    /**
     * 组件参数
     *
     * @type {T}
     * @memberof IRenderComponentParams
     */
    conditionsProps: T;
}
interface IRenderComponentParams<T> extends IRenderComponentBaseParams<T> {
    /**
     * 映射查询接口字段名
     *
     * @memberof IRenderComponentParams
     */
    jsonProperty: string;
}
export interface IProConditions {
    componentModel: ConditionSelectModel | ConditionTextNumberModel | ConditionRadioButtonModel | ConditionTextAreaModel | ConditionTextModel | ConditionDateModel | ConditionRangePickerModel | ConditionSearchModel;
}
export declare class ProConditions<Store, global = {}> {
    readonly global: global;
    readonly mobxStore: Store;
    constructor(options?: {
        store?: any;
        global?: global;
    });
    getConditionsConfig(componentConfigKey: string): IProConditions['componentModel'];
    renderSelectConfig(options: IRenderComponentParams<IQuerySelectProps>): ConditionSelectModel;
    renderTextNumberConfig(options: IRenderComponentParams<IQueryTextNumberProps>): ConditionTextNumberModel;
    renderRadioButtonConfig(options: IRenderComponentParams<IQueryRadioButtonProps>): ConditionRadioButtonModel;
    renderTextAreaConfig(options: IRenderComponentParams<IQueryTextAreaProps>): ConditionTextAreaModel;
    renderTextConfig(options: IRenderComponentParams<IQueryTextProps>): ConditionTextModel;
    renderDateConfig(options: IRenderComponentParams<IQueryDateProps>): ConditionDateModel;
    renderRangePickerConfig(options: IRenderComponentParams<IQueryRangePickerProps>): ConditionRangePickerModel;
    renderCheckBoxConfig(options: IRenderComponentParams<IQueryCheckBoxProps>): ConditionCheckBoxModel;
    renderSearchConfig(options: IRenderComponentBaseParams<IQuerySearchConfigProps>): ConditionSearchModel;
}
export {};
