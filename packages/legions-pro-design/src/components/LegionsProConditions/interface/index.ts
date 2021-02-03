/*
 * @Author: duanguang
 * @Date: 2021-01-08 12:00:22
 * @LastEditTime: 2021-02-03 23:13:25
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


    /**
     * 设置一组指定元素value值
     *
     * @memberof IMethods
     */
    setFieldsValue: (fieldsValues: { fieldName: string,value: any }[]) => void
    /** 设置指定元素显示隐藏 */
    setFieldState: (fieldsStates: { name: string,state: IFieldsState }[]) => void
    /** 查询指定下拉组件数据项 */
    getQuerySelectOption: (/** 下拉组件name值，对应container.component.JsonProperty.name */name: string,/** 下拉选项key值*/optionKey: string) => { readonly item: HlLabeledValue,readonly options: Array<ISelectProps> };

    /** 指定下拉搜索函数
     * 主要用于下拉托管请求时，无法得到搜索函数 */
    onSelectSearch: (
        /** 下拉组件name值，对应container.component.JsonProperty.name */name: string,
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
    visable?: boolean
}
export interface IQueryConditionsInstance<Query = {}> {
    store: ProQueryConditionStore<Query>;
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


export interface IQueryTextProps extends IQueryProps,Weaken<InputProps,'onChange'> {
    onChange?: (even: React.ChangeEvent<HTMLInputElement>,value: any,viewStore:IViewQueryConditionStore) => void;
}
export interface IQueryTextAreaProps extends IQueryProps,TextAreaProps {
    maxlength?: number;
    placeholder?: string;
    onChange?: (even: React.ChangeEvent<HTMLInputElement>,value: any,viewStore: IViewQueryConditionStore) => void;
}
export interface IQueryRadioButtonProps extends IQueryProps,Weaken<RadioGroupProps,'onChange'> {
    onChange?: (event: React.FormEvent<any>,value: any,viewStore: IViewQueryConditionStore) => void;
}
export interface IQueryTextNumberProps extends IQueryProps,Weaken<InputNumberProps,'onChange'> {
    onChange?: (value: number,model: any,viewStore:IViewQueryConditionStore) => void;
}
export interface IQuerySelectProps extends IQueryProps,Weaken<IProSelectProps,'onChange'> {
    multiple: boolean,
    loading?: boolean,
    /** 自动托管下拉数据请求，在下拉框组件中使用,只支持一次性查询全部数据
     * 不支持远程根据关键词搜索
     */
    autoQuery?: ISelectAutoQuery;
    onChange?: (value: any,viewStore:IViewQueryConditionStore) => void;
}
export interface IQueryDateProps extends IQueryProps ,Weaken<DatePickerProps,'onChange'>{
    format: 'YYYY-MM-DD HH:mm:ss' | 'YYYY-MM-DD' | 'YYYY-MM-DD HH:mm'
    showTime: boolean | { format: 'HH:mm' }
    onChange?: (originValue: {
        date: moment.Moment, dateString: string
    },value: any,viewStore:IViewQueryConditionStore) => void;
}
export interface IQueryRangePickerProps extends IQueryProps, Weaken<RangePickerProps,'onChange'|'placeholder'>{
    placeholder?: [string,string]
    onChange?: (originValue: {
        date: [moment.Moment,moment.Moment], dateString: [string, string]
    },value: any,viewStore:IViewQueryConditionStore) => void;
}
export interface IQueryCheckBoxProps extends IQueryProps,Weaken<CheckboxProps,'onChange'>{
    onChange?: (even: React.ChangeEvent<HTMLInputElement>,value: any) => void;
}
export interface IQueryGroupCheckBoxProps extends Omit<IQueryProps,'label'>,Weaken<CheckboxGroupProps,'onChange'>{
    onChange?: (checkedValue: Array<CheckboxValueType>,value: any,viewStore:IViewQueryConditionStore) => void;
}

export interface IQueryProps {
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
     * @memberof IQueryProps
     */
    onReset?: <T extends {}>(fieldName: string,vlaue: T) => T;
    onPaste?: (event) => void;

    onEnter?: (value,viewEntity?: IViewQueryConditionStore) => void
    
}

