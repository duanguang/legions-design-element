import React from 'react';
import './style/index.less';
import { InputProps, DatePickerProps, RangePickerProps, InputNumberProps, RadioGroupProps, TextAreaProps } from '../interface/antd';
import { Weaken } from '../interface';
import { IProSelectProps } from '../LegionsProSelect/interface';
import { ProQueryConditionStore } from '../store/pro.query.conditions';
import { IViewQueryConditionStore, ISelectAutoQuery } from '../store/pro.query.conditions/interface';
import { IFieldsState, IQueryConditionsInstance, IQueryProps, ISelectProps } from './interface';
interface IProps<Query = {}> {
    query: Array<IQuery>;
    store?: ProQueryConditionStore<Query>;
    /**
     *
     * 组件完成渲染时执行，有DOM结构，执行的钩子函数
     * @memberof IProps
     */
    onDidMount?: (value: {
        /**
         *
         * 组件真实高度
         * @type {number}
         */
        height: number;
        /**
         *
         * 组件唯一UID
         * @type {string}
         */
        uid: string;
    }) => void;
    /**
      *  组件componentWillMount 执行
      *
      * @memberof IHLTableProps
      */
    onReady?: (instance: IQueryConditionsInstance<Query>) => void;
    size?: 'default' | 'small';
    /**
     * 默认是否展开 折叠区域内容
     *
     * @type {boolean}
     * @memberof IProps
     */
    defaultToggle: boolean;
    /**
     * 主要用于当父组件中存在多个搜索组件时，标记key 来保证父级组件中搜索组件唯一
     * 持久化查询输入值时，保证值绝对唯一，生成hash 存入数据库，并且作为查询主键
     * 如果不传，则系统默认生成，此时如果在数据库持久化查询条件，则需要保证搜索组件唯一，及父级组件路径不能产生变化
     * @type {string}
     * @memberof IProps
     */
    uniqueKeys?: string;
    ondragger?: (item: any[], key: string) => React.ReactElement;
}
interface IQueryTextProps extends IQueryProps, InputProps {
}
interface IQueryTextAreaProps extends Weaken<IQueryProps, 'maxlength'>, TextAreaProps {
    maxlength?: number;
}
interface IQueryRadioButtonProps extends IQueryProps, RadioGroupProps {
}
interface IQueryTextNumberProps extends IQueryProps, InputNumberProps {
}
interface IQuerySelectProps extends IQueryProps, IProSelectProps {
    multiple: boolean;
    loading?: boolean;
    /** 自动托管下拉数据请求，在下拉框组件中使用,只支持一次性查询全部数据
     * 不支持远程根据关键词搜索
     */
    autoQuery?: ISelectAutoQuery;
}
interface IQueryDateProps extends IQueryProps, DatePickerProps {
    format: 'YYYY-MM-DD HH:mm:ss' | 'YYYY-MM-DD' | 'YYYY-MM-DD HH:mm';
    showTime: boolean | {
        format: 'HH:mm';
    };
}
interface IQueryRangePickerProps extends RangePickerProps, Weaken<IQueryProps, 'placeholder'> {
    placeholder?: [string, string];
}
interface IRadioButtonProps {
    value: string;
    label: string;
    disabled?: boolean;
}
interface IEmit {
    name: 'onChange' | 'onEnter' | 'onSearch' | 'onReset' | 'onResize' | 'onToggle' | 'onRefresh';
    handle: (value: any, viewEntity?: IViewQueryConditionStore) => any;
}
export interface IQuery {
    container: {
        width?: number;
        span?: number;
        position: 'left' | 'content' | 'right';
        component: IComponent;
    };
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
interface IState {
    vmModel: any;
    queryPrams: any;
    fieldsStates: {
        name: string;
        state: IFieldsState;
    }[];
}
export default class LegionsProQueryConditions<Query = {}> extends React.Component<IProps<Query>, IState> {
    resize: () => void;
    timeId: number;
    uid: string;
    constructor(props: any);
    get viewStore(): any;
    static defaultProps: {
        size: string;
        defaultToggle: boolean;
    };
    consoleLog(type: string, logObj?: Object): void;
    componentWillMount(): void;
    componentDidMount(): void;
    onDidMount(): void;
    componentWillReceiveProps(nextProps: IProps): void;
    componentWillUnmount(): void;
    componentDidUpdate(): void;
    dispatchRequest(): void;
    /**
     * 设置指定元素value值
     *
     * @template T value 类型
     * @param {string} fieldName JsonProperty.name
     * @param {T} value
     * @memberof QueryConditions
     */
    setFieldsValue(fieldsValues: {
        fieldName: string;
        value: any;
    }[]): void;
    /**
     * 设置指定元素显示隐藏
     *
     * @template T state 类型
     * @param {string} name JsonProperty.name
     * @param {T} state
     * @memberof QueryConditions
     */
    setFieldState(fieldsStates: {
        name: string;
        state: IFieldsState;
    }[]): void;
    initVModel(): void;
    /**
     * 把组件元素结果映射至查询条件
     *
     * @memberof QueryConditions
     */
    mapQueryValue(): void;
    reset(): void;
    /**
     * 搜索事件
     *
     * @param {*} handle
     * @memberof QueryConditions
     */
    handleSearch(handle: any): void;
    /**
     * 重置数据
     *
     * @param {Function} handle
     * @memberof QueryConditions
     */
    handleReset(handle: Function): void;
    handleChangeChx(option: any, even: any): void;
    handleChangeDate(option: any, even: any, dateString: string): void;
    handleSelectSearch(option: any, value: any): void;
    handleChangeSelect(option: any, even: any): void;
    handleChange(option: any, even: any): void;
    formatTrim(str: any): any;
    /**
      * 获取传入参数
      *
      * @param {any} component
      * @returns
      * @memberof FilterSearchWrap
      */
    changeOptions(component: IComponent): {
        handle: (value: any, viewEntity?: IViewQueryConditionStore<{}>) => any;
        JsonProperty: IJsonProperty;
        regex: RegExp;
        type: "number" | "select" | "text" | "date" | "radioButton" | "daterange" | "checkBox" | "textArea";
        props: IQueryTextProps | IQueryTextAreaProps | IQueryRadioButtonProps | IQueryTextNumberProps | IQuerySelectProps | IQueryDateProps | IQueryRangePickerProps;
        data: ISelectProps[] | IRadioButtonProps[];
    };
    /**
     * 获取搜索区域钩子事件列表
     *
     * @returns
     * @memberof QueryConditions
     */
    searchEmit(): IEmit[];
    /**
     * 回车搜索
     *
     * @param {Function} onEnter
     * @memberof QueryConditions
     */
    handleEnter(onEnter: Function): void;
    renderLabel(label: any, component: IComponent): JSX.Element;
    renderComponent(component: IComponent): any;
    renderInputTextArea(component: IComponent): JSX.Element;
    renderRadioButton(component: IComponent): JSX.Element;
    renderInputNumber(component: IComponent): JSX.Element;
    renderChxBox(component: IComponent): JSX.Element;
    renderDate(component: IComponent): JSX.Element;
    renderDateRange(component: IComponent): JSX.Element;
    renderSelect(component: IComponent): JSX.Element;
    renderInput(component: IComponent): JSX.Element;
    renderContent(position: string, query?: IQuery[]): JSX.Element;
    queryEmit(hooks: IEmit['name'], position?: IQuery['container']['position']): (value: any, height: number) => void;
    /**
     * 搜索按钮及重置按钮
     *
     * @returns
     * @memberof QueryConditions
     */
    renderRight(query?: IQuery[]): JSX.Element;
    render(): JSX.Element;
}
export {};
