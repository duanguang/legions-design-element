/*
 * @Author: duanguang
 * @Date: 2021-01-08 12:00:22
 * @LastEditTime: 2021-02-04 18:29:55
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/LegionsProConditions/interface/index.ts
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
import { ProQueryConditionStore } from '../../store/pro.query.conditions';
import { IViewQueryConditionStore,ISelectAutoQuery } from '../../store/pro.query.conditions/interface';
import { HlLabeledValue } from 'legions-lunar/model';
import { Weaken } from '../../interface'
import {
    InputProps,
    SelectProps,
    DatePickerProps,
    RangePickerProps,
    InputNumberProps,
    RadioGroupProps,
    RadioButtonProps,
    TextAreaProps,
    CheckboxGroupProps,
    CheckboxProps,
} from '../../interface/antd';
import {IProSelectProps} from '../../LegionsProSelect/interface'
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { IProConditions } from '../ProConditionsUtils';
export interface ISelectProps {
    value: string
    key: string
}
interface IMethods {


    /**
     * 重置搜索条件
     *
     * @memberof IMethods
     */
    reset: () => void;

    setFieldsValues?:(name: string,callback: (value: IProConditions['componentModel']) => void)=>void
    /** 查询指定下拉组件数据项 */
    getQuerySelectOption: (/** 下拉组件name值 */name: string,/** 下拉选项key值*/optionKey: string) => { readonly item: HlLabeledValue,readonly options: Array<ISelectProps> };

    /** 下拉远程搜索
     * 主要同于手动触发下拉组件搜索函数 */
    onRrmoteSearch: (
        /** 下拉组件name值 */name: string,
        params: {
            pageIndex: number;
            pageSize?: number;
            keyWords?: string;
        } & Object) => void
}

export interface IFieldsState {
    /**
     *
     * 组件是否可见，一般用来控制组件显隐，默认值true 可见，false不可见 
     * 注意此隐藏只是隐藏dom ，元素依然存在只是不可见
     * @type {Boolean}
     * @memberof IFieldsState
     */
    display?: boolean
    /**组件是否可见，一般用来控制组件显隐，默认值true 可见，false不可见   */
    visable?: boolean
}
export interface IQueryConditionsInstance<Query = {}> {
    store: ProQueryConditionStore<Query>;
    /** 只读 */
    readonly uid: string;

    /**
     * 当前table实现双向绑定的数据对象，可以直接修改其值，会实时响应到table组件
     *
     * @type {IViewModelHLTable}
     * @memberof InstanceHlTable
     */
    viewModel: IViewQueryConditionStore<Query>;

    /**
     * 暴露一些组件操作方法
     *
     * @memberof InstanceHlTable
     */
    methods?: IMethods
}
interface IData{
    /** 组件内部值 */
    viewState: any;
    /** 查询条件对象 */
    parameter: any;
}

export interface IQueryTextProps extends IQueryProps,Weaken<InputProps,'onChange'> {
   readonly onChange?: (even: React.ChangeEvent<HTMLInputElement>,data:IData,viewStore:IViewQueryConditionStore) => void;
}
export interface IQueryTextAreaProps extends IQueryProps,TextAreaProps {
    maxlength?: number;
    placeholder?: string;
    readonly onChange?: (even: React.ChangeEvent<HTMLInputElement>,value: IData,viewStore: IViewQueryConditionStore) => void;
}
export interface IQueryRadioButtonProps extends IQueryProps,Weaken<RadioGroupProps,'onChange'> {
    readonly onChange?: (event: React.FormEvent<any>,value: IData,viewStore: IViewQueryConditionStore) => void;
}
export interface IQueryTextNumberProps extends IQueryProps,Weaken<InputNumberProps,'onChange'> {
    readonly onChange?: (value: number,model: IData,viewStore:IViewQueryConditionStore) => void;
}
export interface IQuerySelectProps extends IQueryProps,Weaken<IProSelectProps,'onChange'> {
    multiple?: boolean,
    loading?: boolean,
    /** 自动托管下拉数据请求，在下拉框组件中使用,只支持一次性查询全部数据
     * 不支持远程根据关键词搜索
     */
    readonly  autoQuery?: ISelectAutoQuery;
    readonly onChange?: (value: IData,viewStore:IViewQueryConditionStore) => void;
}
export interface IQueryDateProps extends IQueryProps ,Weaken<DatePickerProps,'onChange'>{
    format: 'YYYY-MM-DD HH:mm:ss' | 'YYYY-MM-DD' | 'YYYY-MM-DD HH:mm'
    showTime: boolean | { format: 'HH:mm' }
    /** 只读 */
    readonly  onChange?: (originValue: {
        date: moment.Moment, dateString: string
    },value: IData,viewStore:IViewQueryConditionStore) => void;
}
export interface IQueryRangePickerProps extends IQueryProps, Weaken<RangePickerProps,'onChange'|'placeholder'>{
    placeholder?: [string,string]
    /** 只读 */
    readonly onChange?: (originValue: {
        date: [moment.Moment,moment.Moment], dateString: [string, string]
    },value: IData,viewStore:IViewQueryConditionStore) => void;
}
export interface IQueryCheckBoxProps extends IQueryProps,Weaken<CheckboxProps,'onChange'>{
    /** 只读 */
    readonly onChange?: (even: React.ChangeEvent<HTMLInputElement>,value: IData,viewStore:IViewQueryConditionStore) => void;
}
export interface IQueryGroupCheckBoxProps extends Omit<IQueryProps,'label'>,Weaken<CheckboxGroupProps,'onChange'>{
    /** 只读 */
    readonly onChange?: (checkedValue: Array<CheckboxValueType>,value: IData,viewStore:IViewQueryConditionStore) => void;
}

export interface IQueryProps extends IFieldsState {
    label: string;
    labelSpan?: number;
    /**
     *是否允许重置 TRUE 不重置
     *
     * @type {boolean}
     * @memberof IQueryProps
     */
    isNotReset?: boolean;

    /**
     *
     * 自定义重置方法,返回一个新值
     * 
     * 只读
     * @memberof IQueryProps
     */
    readonly onReset?: <T extends {}>(fieldName: string,vlaue: T) => T;
    /** 只读 */
    readonly onPaste?: (event) => void;
/** 只读 */
    readonly onEnter?: (value,viewEntity?: IViewQueryConditionStore) => void
    
}

