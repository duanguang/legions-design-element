/*
 * @Author: duanguang
 * @Date: 2021-01-08 15:19:23
 * @LastEditTime: 2021-02-03 23:01:40
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/LegionsProConditions/ProConditionsUtils.tsx
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
import React from 'react';
import { getInjector } from 'legions/store';
import {
    IAntdProps,
    IAntdRule,
    WrappedFormUtils,
} from '../interface/antd';
import { BaseFormFields } from 'legions-lunar/model';
import { ClassOf } from 'legions-lunar/types/api/typescript';
import { createFormRule } from 'legions-decorator/async.validator'; 
import { IQueryCheckBoxProps, IQueryDateProps, IQueryGroupCheckBoxProps, IQueryRadioButtonProps, IQueryRangePickerProps, IQuerySelectProps, IQueryTextAreaProps, IQueryTextNumberProps, IQueryTextProps } from './interface';
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
interface IContainerProps{
    col: ColProps;
    name: string;
    uuid?: string;
}

export class ConditionSelectModel {
    constructor(public containerProps: IContainerProps,
        public conditionsProps: IQuerySelectProps,
        public jsonProperty: string) {

    }
}
export class ConditionTextNumberModel{
    constructor(public containerProps: IContainerProps,
        public conditionsProps: IQueryTextNumberProps,
        public jsonProperty: string) {
    }
}
export class ConditionRadioButtonModel{
    constructor(public containerProps: IContainerProps,
        public conditionsProps: IQueryRadioButtonProps,
        public jsonProperty: string) {
    }
}
export class ConditionTextAreaModel{
    constructor(public containerProps: IContainerProps,
        public conditionsProps: IQueryTextAreaProps,
        public jsonProperty: string) {
    }
}
export class ConditionTextModel{
    constructor(public containerProps: IContainerProps,
        public conditionsProps: IQueryTextProps,
        public jsonProperty: string) {
    }
}
export class ConditionDateModel{
    constructor(public containerProps: IContainerProps,
        public conditionsProps: IQueryDateProps,
        public jsonProperty: string) {
    }
}
interface IQuerySearchConfigProps{
    /**查询按钮的文本 */
    searchText?: string;
    /** 重置按钮的文本*/
    resetText?: string;
    /**收起按钮的 render */
    collapseRender?: (collapsed: boolean,showCollapseButton?: boolean,) => React.ReactNode
    /** 默认是否收起	 */
    defaultCollapsed?: boolean;
    /** 收起按钮的事件 */
    onCollapse?: (collapsed: boolean) => void;
    /** 自定义操作栏 */
    /* optionRender?: ((searchConfig: IQuerySearchConfigProps) => React.ReactNode[]) | false */
    
    onSearch:(value:any,viewEntity?: IViewQueryConditionStore)=>void
    onReset?:(value:any,viewEntity?: IViewQueryConditionStore)=>void
}
export class ConditionSearchModel{
    constructor(
        public containerProps: IContainerProps,
        public conditionsProps: IQuerySearchConfigProps) {
    }
}
export class ConditionRangePickerModel{
    constructor(public containerProps: IContainerProps,
        public conditionsProps: IQueryRangePickerProps,
        public jsonProperty: string) {
    }
}
export class ConditionCheckBoxModel{
    constructor(public containerProps: IContainerProps,
        public conditionsProps: IQueryCheckBoxProps,
        public jsonProperty: string) {
    }
}
export class ConditionGroupCheckBoxModel{
    constructor(public containerProps: IContainerProps,
        public conditionsProps: IQueryGroupCheckBoxProps,
        public jsonProperty: string) {
    }
}
interface IRenderComponentBaseParams<T> {

    /**
     *
     * 容器参数
     * @type {containerProps}
     * @memberof IRenderComponentParams
     */
    containerProps: IContainerProps,

    /**
     * 组件参数
     *
     * @type {T}
     * @memberof IRenderComponentParams
     */
    conditionsProps: T

}
interface IRenderComponentParams<T> extends IRenderComponentBaseParams<T> {

    /**
     * 映射查询接口字段名
     *
     * @memberof IRenderComponentParams
     */
    jsonProperty: string;
}
interface IRangTimeComponentParams<T> extends IRenderComponentBaseParams<T> {

    /**
     * 映射查询接口字段名
     *
     * @memberof IRangTimeComponentParams
     */
    jsonProperty: {
        startTime: string;
        endTime: string;
    };
}
export interface IProConditions {
    componentModel: ConditionSelectModel | ConditionTextNumberModel | ConditionRadioButtonModel | ConditionTextAreaModel |
    ConditionTextModel | ConditionDateModel | ConditionRangePickerModel |ConditionSearchModel|ConditionGroupCheckBoxModel
}
export class ProConditions<Store,global = {}>{

    readonly global: global = null
    readonly mobxStore: Store = null
    constructor(options?: {
        store?: any,
        global?: global
    }) {
        // super()
        if (options) {
            if (options.global) {
                this.global = options.global
            }
            if (options.store) {

            }
            if (typeof options.store === 'function' && options.store.meta) {
                const stores = getInjector()
                this.mobxStore = stores.getState(options.store);
            }
        }

    }
    getConditionsConfig(componentConfigKey: string): IProConditions['componentModel'] {
        return this[componentConfigKey]
    }
    renderSelectConfig(options: IRenderComponentParams<IQuerySelectProps>): ConditionSelectModel {
        const id = options.containerProps.name;
        this[id] = new ConditionSelectModel(options.containerProps,options.conditionsProps,options.jsonProperty)
        return this[id];
    }
    renderTextNumberConfig(options: IRenderComponentParams<IQueryTextNumberProps>): ConditionTextNumberModel {
        const id = options.containerProps.name;
        this[id] = new ConditionTextNumberModel(options.containerProps,options.conditionsProps,options.jsonProperty)
        return this[id];
    }
    renderRadioButtonConfig(options: IRenderComponentParams<IQueryRadioButtonProps>): ConditionRadioButtonModel {
        const id = options.containerProps.name;
        this[id] = new ConditionRadioButtonModel(options.containerProps,options.conditionsProps,options.jsonProperty)
        return this[id];
    }
    renderTextAreaConfig(options: IRenderComponentParams<IQueryTextAreaProps>): ConditionTextAreaModel {
        const id = options.containerProps.name;
        this[id] = new ConditionTextAreaModel(options.containerProps,options.conditionsProps,options.jsonProperty)
        return this[id];
    }
    renderTextConfig(options: IRenderComponentParams<IQueryTextProps>): ConditionTextModel {
        const id = options.containerProps.name;
        this[id] = new ConditionTextModel(options.containerProps,options.conditionsProps,options.jsonProperty)
        return this[id];
    }
    renderDateConfig(options: IRenderComponentParams<IQueryDateProps>): ConditionDateModel {
        const id = options.containerProps.name;
        this[id] = new ConditionDateModel(options.containerProps,options.conditionsProps,options.jsonProperty)
        return this[id];
    }
    renderRangePickerConfig(options: IRenderComponentParams<IQueryRangePickerProps>): ConditionRangePickerModel {
        const id = options.containerProps.name;
        this[id] = new ConditionRangePickerModel(options.containerProps,options.conditionsProps,options.jsonProperty)
        return this[id];
    }
    renderCheckBoxConfig(options: IRenderComponentParams<IQueryCheckBoxProps>): ConditionCheckBoxModel {
        const id = options.containerProps.name;
        this[id] = new ConditionCheckBoxModel(options.containerProps,options.conditionsProps,options.jsonProperty)
        return this[id];
    }
    renderGroupCheckBoxConfig(options: IRenderComponentParams<IQueryGroupCheckBoxProps>): ConditionGroupCheckBoxModel {
        const id = options.containerProps.name;
        this[id] = new ConditionGroupCheckBoxModel(options.containerProps,options.conditionsProps,options.jsonProperty)
        return this[id];
    }
    renderSearchConfig(options: IRenderComponentBaseParams<IQuerySearchConfigProps>): ConditionSearchModel {
        const id = options.containerProps.name;
        this[id] = new ConditionSearchModel(options.containerProps,options.conditionsProps)
        return this[id];
    }
}

