/// <reference types="react" />
import { ProQueryConditionStore } from '../../store/pro.query.conditions';
import { IViewQueryConditionStore, ISelectAutoQuery } from '../../store/pro.query.conditions/interface';
import { HlLabeledValue } from 'legions-lunar/model';
import { Weaken } from '../../interface';
import { InputProps, DatePickerProps, RangePickerProps, InputNumberProps, RadioGroupProps, TextAreaProps, CheckboxProps } from '../../interface/antd';
import { IProSelectProps } from '../../LegionsProSelect/interface';
export interface ISelectProps {
    value: string;
    key: string;
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
    setFieldsValue: (fieldsValues: {
        fieldName: string;
        value: any;
    }[]) => void;
    /** 设置指定元素显示隐藏 */
    setFieldState: (fieldsStates: {
        name: string;
        state: IFieldsState;
    }[]) => void;
    /** 查询指定下拉组件数据项 */
    getQuerySelectOption: (/** 下拉组件name值，对应container.component.JsonProperty.name */ name: string, /** 下拉选项key值*/ optionKey: string) => {
        readonly item: HlLabeledValue;
        readonly options: Array<ISelectProps>;
    };
    /** 指定下拉搜索函数
     * 主要用于下拉托管请求时，无法得到搜索函数 */
    onSelectSearch: (
    /** 下拉组件name值，对应container.component.JsonProperty.name */ name: string, params: {
        pageIndex: number;
        pageSize?: number;
        keyWords?: string;
    } & Object) => void;
}
export interface IQueryProps {
    width?: number;
    span?: number;
    title?: string;
    maxlength?: string;
    placeholder?: string;
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
    onReset?: <T extends {}>(fieldName: string, vlaue: T) => T;
    onPaste?: (event: any) => void;
    onEnter?: (value: any, viewEntity?: IViewQueryConditionStore) => void;
}
export interface IFieldsState {
    /**
     *
     * 组件是否可见，一般用来控制组件显隐，默认值true 可见，false不可见
     * 注意此隐藏只是隐藏dom ，元素依然存在只是不可见
     * @type {Boolean}
     * @memberof IFieldsState
     */
    display?: boolean;
    visable?: boolean;
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
    methods?: IMethods;
}
interface IJsonProperty {
    name: string;
    /**
     * 废弃属性，请勿使用
     *
     * @type {(string|[]|any[])}
     * @memberof IJsonProperty
     */
    value?: string | [] | any[];
    queryPrams: string;
    uuid?: string;
}
export interface IQuery {
    container: {
        width?: number;
        span?: number;
        position: 'left' | 'content' | 'right';
        component: IComponent;
    };
}
interface IEmit {
    name: 'onChange' | 'onEnter' | 'onSearch' | 'onReset' | 'onResize' | 'onToggle' | 'onRefresh';
    handle: (value: any, viewEntity?: IViewQueryConditionStore) => any;
}
interface IComponent {
    type?: 'daterange' | 'text' | 'number' | 'select' | 'checkBox' | 'date' | 'daterange' | 'radioButton' | 'textArea';
    props?: IQueryTextProps | IQuerySelectProps | IQueryDateProps | IQueryRangePickerProps | IQueryTextNumberProps | IQueryRadioButtonProps | IQueryTextAreaProps;
    JsonProperty?: IJsonProperty;
    data?: Array<ISelectProps> | Array<IRadioButtonProps>;
    label?: string;
    defaultValue?: any;
    hooks?: Array<IEmit>;
    render?: Function;
    regex?: RegExp;
}
export interface IQueryTextProps extends IQueryProps, InputProps {
}
export interface IQueryTextAreaProps extends Weaken<IQueryProps, 'maxlength'>, TextAreaProps {
    maxlength?: number;
}
export interface IQueryRadioButtonProps extends IQueryProps, RadioGroupProps {
}
export interface IQueryTextNumberProps extends IQueryProps, InputNumberProps {
}
export interface IQuerySelectProps extends IQueryProps, IProSelectProps {
    multiple: boolean;
    loading?: boolean;
    /** 自动托管下拉数据请求，在下拉框组件中使用,只支持一次性查询全部数据
     * 不支持远程根据关键词搜索
     */
    autoQuery?: ISelectAutoQuery;
}
export interface IQueryDateProps extends IQueryProps, DatePickerProps {
    format: 'YYYY-MM-DD HH:mm:ss' | 'YYYY-MM-DD' | 'YYYY-MM-DD HH:mm';
    showTime: boolean | {
        format: 'HH:mm';
    };
}
export interface IQueryRangePickerProps extends RangePickerProps, Weaken<IQueryProps, 'placeholder'> {
    placeholder?: [string, string];
}
export interface IQueryCheckBoxProps extends IQueryProps, Weaken<CheckboxProps, 'onChange'> {
    onChange?: (even: React.ChangeEvent<HTMLInputElement>, value: any) => void;
}
interface IRadioButtonProps {
    value: string;
    label: string;
    disabled?: boolean;
}
export interface IQueryProps {
    width?: number;
    label: string;
    labelSpan?: number;
    span?: number;
    title?: string;
    maxlength?: string;
    placeholder?: string;
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
    onReset?: <T extends {}>(fieldName: string, vlaue: T) => T;
    onPaste?: (event: any) => void;
    onEnter?: (value: any, viewEntity?: IViewQueryConditionStore) => void;
}
export {};
