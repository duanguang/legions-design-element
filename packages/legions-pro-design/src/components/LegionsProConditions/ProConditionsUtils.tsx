/*
 * @Author: duanguang
 * @Date: 2021-01-08 15:19:23
 * @LastEditTime: 2021-11-16 23:46:52
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/LegionsProConditions/ProConditionsUtils.tsx
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
import React from 'react';
import { getInjector } from 'legions/store';
import { IQueryCheckBoxProps, IQueryDateProps, IQueryGroupCheckBoxProps, IQueryProps, IQueryRadioButtonProps, IQueryRangePickerProps, IQuerySelectProps, IQueryTextAreaProps, IQueryTextNumberProps, IQueryTextProps } from './interface';
import { ColSize } from 'antd/lib/grid/col';
import { IViewQueryConditionStore } from '../LegionsStoreConditions/interface';
import { shortHash } from 'legions-lunar/object-hash';
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
    /** 单击时触发 */
    onClick?: (value: {
        uid: string,name: string;
    }) => void;
    style?: React.CSSProperties;
    className?: string;
    /** 只读 */
    readonly uuid?: string;
}

export class ConditionSelectModel {
    constructor(public containerProps: IContainerProps,
        public conditionsProps: IQuerySelectProps&IQueryProps,
        public jsonProperty: string) {

    }
}
export class ConditionTextNumberModel{
    constructor(public containerProps: IContainerProps,
        public conditionsProps: IQueryTextNumberProps&IQueryProps,
        public jsonProperty: string) {
    }
}
export class ConditionRadioButtonModel{
    constructor(public containerProps: IContainerProps,
        public conditionsProps: IQueryRadioButtonProps&IQueryProps,
        public jsonProperty: string) {
    }
}
export class ConditionTextAreaModel{
    constructor(public containerProps: IContainerProps,
        public conditionsProps: IQueryTextAreaProps&IQueryProps,
        public jsonProperty: string) {
    }
}
export class ConditionTextModel{
    constructor(public containerProps: IContainerProps,
        public conditionsProps: IQueryTextProps&IQueryProps,
        public jsonProperty: string) {
    }
}
export class ConditionDateModel{
    constructor(public containerProps: IContainerProps,
        public conditionsProps: IQueryDateProps&IQueryProps,
        public jsonProperty: string) {
    }
}
interface IQuerySearchConfigProps{
    /**查询按钮的文本 */
    searchText?: string;
    /** 重置按钮的文本*/
    resetText?: string;
    /**收起按钮的 render */
    readonly collapseRender?: (collapsed: boolean,showCollapseButton?: boolean,) => React.ReactNode
    /** 自定义操作栏 */
    /* optionRender?: ((searchConfig: IQuerySearchConfigProps) => React.ReactNode[]) | false */
    
    readonly onSearch:(params:any,viewEntity?: IViewQueryConditionStore)=>void
    readonly onReset?: (params: any,viewEntity?: IViewQueryConditionStore) => void
    readonly onRefresh?:(params: any,viewEntity?: IViewQueryConditionStore)=>void
}
export class ConditionSearchModel{
    constructor(
        public containerProps: IContainerProps,
        public conditionsProps: IQuerySearchConfigProps) {
    }
}
export class ConditionRangePickerModel{
    constructor(public containerProps: IContainerProps,
        public conditionsProps: IQueryRangePickerProps&IQueryProps,
        public jsonProperty: string) {
    }
}
export class ConditionCheckBoxModel{
    constructor(public containerProps: IContainerProps,
        public conditionsProps: IQueryCheckBoxProps&IQueryProps,
        public jsonProperty: string) {
    }
}
export class ConditionGroupCheckBoxModel{
    constructor(public containerProps: IContainerProps,
        public conditionsProps: IQueryGroupCheckBoxProps&Omit<IQueryProps,'label'>,
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
    private createUid(name:string) {
       const timeId = new Date().getTime()
        const uid = `${name}-${shortHash(`${timeId}${name}`)}`
        return uid;
    }
    private createContainerProps(props: IContainerProps) {
        const id = props.name;
        if (!this[id]) {
            return {...props,uuid:this.createUid(id)}
        }
        return this[id]['containerProps'];
    }
    getConditionsConfig(componentConfigKey: string): IProConditions['componentModel'] {
        return this[componentConfigKey]
    }
    renderSelectConfig(options: IRenderComponentParams<IQuerySelectProps>): ConditionSelectModel {
        const id = options.containerProps.name;
        this[id] = new ConditionSelectModel(this.createContainerProps(options.containerProps),options.conditionsProps,options.jsonProperty)
        return this[id];
    }
    renderTextNumberConfig(options: IRenderComponentParams<IQueryTextNumberProps>): ConditionTextNumberModel {
        const id = options.containerProps.name;
        this[id] = new ConditionTextNumberModel(this.createContainerProps(options.containerProps),options.conditionsProps,options.jsonProperty)
        return this[id];
    }
    renderRadioButtonConfig(options: IRenderComponentParams<IQueryRadioButtonProps>): ConditionRadioButtonModel {
        const id = options.containerProps.name;
        this[id] = new ConditionRadioButtonModel(this.createContainerProps(options.containerProps),options.conditionsProps,options.jsonProperty)
        return this[id];
    }
    renderTextAreaConfig(options: IRenderComponentParams<IQueryTextAreaProps>): ConditionTextAreaModel {
        const id = options.containerProps.name;
        this[id] = new ConditionTextAreaModel(this.createContainerProps(options.containerProps),options.conditionsProps,options.jsonProperty)
        return this[id];
    }
    renderTextConfig(options: IRenderComponentParams<IQueryTextProps>): ConditionTextModel {
        const id = options.containerProps.name;
        this[id] = new ConditionTextModel(this.createContainerProps(options.containerProps),options.conditionsProps,options.jsonProperty)
        return this[id];
    }
    renderDateConfig(options: IRenderComponentParams<IQueryDateProps>): ConditionDateModel {
        const id = options.containerProps.name;
        this[id] = new ConditionDateModel(this.createContainerProps(options.containerProps),options.conditionsProps,options.jsonProperty)
        return this[id];
    }
    renderRangePickerConfig(options: IRenderComponentParams<IQueryRangePickerProps>): ConditionRangePickerModel {
        const id = options.containerProps.name;
        this[id] = new ConditionRangePickerModel(this.createContainerProps(options.containerProps),options.conditionsProps,options.jsonProperty)
        return this[id];
    }
    renderCheckBoxConfig(options: IRenderComponentParams<IQueryCheckBoxProps>): ConditionCheckBoxModel {
        const id = options.containerProps.name;
        this[id] = new ConditionCheckBoxModel(this.createContainerProps(options.containerProps),options.conditionsProps,options.jsonProperty)
        return this[id];
    }
    renderGroupCheckBoxConfig(options: IRenderComponentParams<IQueryGroupCheckBoxProps>): ConditionGroupCheckBoxModel {
        const id = options.containerProps.name;
        this[id] = new ConditionGroupCheckBoxModel(this.createContainerProps(options.containerProps),options.conditionsProps,options.jsonProperty)
        return this[id];
    }
    renderSearchConfig(options: IRenderComponentBaseParams<IQuerySearchConfigProps>): ConditionSearchModel {
        const id = options.containerProps.name;
        this[id] = new ConditionSearchModel(this.createContainerProps(options.containerProps),options.conditionsProps)
        return this[id];
    }
}

