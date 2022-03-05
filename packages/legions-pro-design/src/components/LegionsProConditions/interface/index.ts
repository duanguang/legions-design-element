/*
 * @Author: duanguang
 * @Date: 2021-01-08 12:00:22
 * @LastEditTime: 2022-03-05 21:56:08
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/LegionsProConditions/interface/index.ts
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
import {StoreConditions} from '../store';
import { LegionsLabeledValue } from 'legions-lunar/model';
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
    IAntdSelectOption,
} from '../../interface/antd';
import {IProSelectProps} from '../../LegionsProSelect/interface'
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { IProConditions } from '../ProConditionsUtils';
import { IProDraggerProps } from '../../LegionsProDragger/interface';
import { ColSize } from 'antd/lib/grid/col';
import LegionsModels from '../../LegionsModels';
import { ObservablePromiseModel } from 'legions/store-utils';
import { ViewModel } from 'brain-store-utils/types/create-view-model';
import { ConditionView } from '../store/conditionView';
type Proxify<T> = { [P in keyof T]: T[P] };
export declare type IViewQueryConditionStore<Query = {}> = ViewModel<ConditionView<Query>> & Proxify<ConditionView<Query>>;
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
type HeadersPrams = {
    'Content-Type'?: 'application/json' | 'application/x-www-form-urlencoded';
};
export interface ISelectAutoQuery<Model = {}> {

    /**
     * 查询参数
     *
     * @memberof ISelectAutoQuery
     */
    params: (pageIndex: number,pageSize: number,keyWords: string,other?: Object) => Object & {

        /**
         * 表单下拉组件通过此参数获取页码
         * 
         * 传入到接口时，会自动移除
         *
         * @type {number}
         */
        pageIndex: number;
        /**
         * 表单下拉组件通过此参数获取页大小
         * 
         * 传入到接口时，会自动移除
         *
         * @type {number}
         */
        pageSize: number;
        /**
         *
         * 默认搜索关键词
         * 
         * 只在表单组件初次装载有效
         * @type {string}
         */
        defaultKeyWords?: string;
    };

    /**
     *  发送请求前转换条件函数
     *
     * @memberof ISelectAutoQuery
     */
    requestBeforeTransformParams?: (value: ISelectAutoQuery['params']) => Object

    /**
     * 请求接口
     *
     * @type {string}
     */
    ApiUrl: string;
    method: 'get' | 'post'

    /**
     * headers 参数
     *
     * @type {(HeadersPrams & Object)}
     * @memberof ISelectAutoQuery
     */
    options?: HeadersPrams & { [key: string]: string }
    /**
         * 转换服务端数据
         *
         * 
         * 如果不想写model,则通过此函数先把数据转换成约定结构，在由底层固定model去转换
         */
    mappingEntity: (that: InstanceType<typeof LegionsModels.SelectKeyValue>,responseData: any) => InstanceType<typeof LegionsModels.KeyValue>[];

    /**
     * 下拉数据绑定前转换绑定数据结构
     * 
     * 当外部数据不确定时，此时我们需要一个适配器转换从接口中取到的数据，用于绑定下拉选项
     * @memberof ISelectAutoQuery
     */
    transform: (value: ObservablePromiseModel<InstanceType<typeof LegionsModels.SelectKeyValue>>) => { total: number,data: IAntdSelectOption[] }
    /**
     *
     * 授权信息令牌
     * 
     * 一般用作权限验证
     * @type {string}
     * @memberof ISelectAutoQuery
     */
    token?: string | (() => string);
    /**
    * 在下拉组件装载时是否默认自动发送请求
    *
    * 不传入或者等于true 时发送请求
    */
    isInitialize?: boolean;
}
interface ISelectProps {
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

    setFieldsValues?:<T extends IProConditions['componentModel']>(name: string,callback: (value: T) => void)=>void
    /** 查询指定下拉组件数据项 */
    getQuerySelectOption: (/** 下拉组件name值 */name: string,/** 下拉选项key值*/optionKey: string) => { readonly item: LegionsLabeledValue,readonly options: Array<ISelectProps> };

    /** 下拉远程搜索
     * 主要同于手动触发下拉组件搜索函数 */
    onRrmoteSearch: (
        /** 下拉组件name值 */name: string,
        params: {
            pageIndex: number;
            pageSize?: number;
            keyWords?: string;
        } & Object) => void;
    /** 添加新的搜索条件项 */
    addQuery: (list: Array<IProConditions['componentModel']>) => void;
    /** 移除指定搜索条件项 */
    removeQuery: (uuid: string) => boolean;
}

interface IFieldsState {
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
interface ProConditionsRef<Query = {}> {
    store: InstanceType<typeof StoreConditions>;
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

interface IQueryTextProps extends IQueryProps,Weaken<InputProps,'onChange'> {
   readonly onChange?: (even: React.ChangeEvent<HTMLInputElement>,data:IData,viewStore:IViewQueryConditionStore) => void;
}
interface IQueryTextAreaProps extends IQueryProps,TextAreaProps {
    maxlength?: number;
    placeholder?: string;
    readonly onChange?: (even: React.ChangeEvent<HTMLInputElement>,value: IData,viewStore: IViewQueryConditionStore) => void;
}
interface IQueryRadioButtonProps extends IQueryProps,Weaken<RadioGroupProps,'onChange'> {
    readonly onChange?: (event: React.FormEvent<any>,value: IData,viewStore: IViewQueryConditionStore) => void;
}
interface IQueryTextNumberProps extends IQueryProps,Weaken<InputNumberProps,'onChange'> {
    readonly onChange?: (value: number,model: IData,viewStore:IViewQueryConditionStore) => void;
}
interface IQuerySelectProps extends IQueryProps,Weaken<IProSelectProps,'onChange'> {
    multiple?: boolean,
    loading?: boolean,
    /** 自动托管下拉数据请求，在下拉框组件中使用,只支持一次性查询全部数据
     * 不支持远程根据关键词搜索
     */
    readonly  autoQuery?: ISelectAutoQuery;
    readonly onChange?: (value: IData,viewStore:IViewQueryConditionStore) => void;
}
interface IQueryDateProps extends IQueryProps ,Weaken<DatePickerProps,'onChange'>{
    format: 'YYYY-MM-DD HH:mm:ss' | 'YYYY-MM-DD' | 'YYYY-MM-DD HH:mm'
    showTime: boolean | { format: 'HH:mm' }
    /** 只读 */
    readonly  onChange?: (originValue: {
        date: moment.Moment, dateString: string
    },value: IData,viewStore:IViewQueryConditionStore) => void;
}
interface IQueryRangePickerProps extends IQueryProps, Weaken<RangePickerProps,'onChange'|'placeholder'>{
    placeholder?: [string,string]
    /** 取值时对日期进行格式化 参数详情见moment.js官方文档: http://momentjs.cn/docs/#/displaying/format/ */
    transformFormat?: string
    /** 只读 */
    readonly onChange?: (originValue: {
        date: [moment.Moment,moment.Moment], dateString: [string, string]
    },value: IData,viewStore:IViewQueryConditionStore) => void;
}
interface IQueryCheckBoxProps extends IQueryProps,Weaken<CheckboxProps,'onChange'>{
    /** 只读 */
    readonly onChange?: (even: React.ChangeEvent<HTMLInputElement>,value: IData,viewStore:IViewQueryConditionStore) => void;
}
interface IQueryGroupCheckBoxProps extends Omit<IQueryProps,'label'>,Weaken<CheckboxGroupProps,'onChange'>{
    /** 只读 */
    readonly onChange?: (checkedValue: Array<CheckboxValueType>,value: IData,viewStore:IViewQueryConditionStore) => void;
}
export interface IQuerySearchConfigProps{
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
interface IQueryProps extends IFieldsState {
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
interface IConfigParams<T> {
    /**
     *
     * 容器参数
     * @type {containerProps}
     * @memberof IRenderComponentParams
     */
     container: IContainerProps,

     /**
      * 组件参数
      *
      * @type {T}
      */
    props: T
    /** 映射查询接口字段名 */
    jsonProperty?: string;
}
export interface ProConditions{
    ref: ProConditionsRef;
    selectAutoQuery: ISelectAutoQuery;
    component_props: {
        text: IQueryTextProps;
        checkBox: IQueryCheckBoxProps;
        groupCheckBox: IQueryGroupCheckBoxProps;
        rangePicker: IQueryRangePickerProps;
        date: IQueryDateProps;
        select: IQuerySelectProps;
        textNumber: IQueryTextNumberProps;
        radioButton: IQueryRadioButtonProps;
        textArea: IQueryTextAreaProps;
        search: IQuerySearchConfigProps;
    }
    configs: {
        text: IConfigParams<IQueryTextProps>;
        checkBox: IConfigParams<IQueryCheckBoxProps>;
        groupCheckBox: IConfigParams<IQueryGroupCheckBoxProps>;
        rangePicker: IConfigParams<IQueryRangePickerProps>;
        date: IConfigParams<IQueryDateProps>;
        select: IConfigParams<IQuerySelectProps>;
        textNumber: IConfigParams<IQueryTextNumberProps>;
        radioButton: IConfigParams<IQueryRadioButtonProps>;
        textArea: IConfigParams<IQueryTextAreaProps>;
        search: IConfigParams<IQuerySearchConfigProps>;
    }
    config_container:IConfigParams<any>['container']
}
export interface ProConditionsProps{
    query: Array<IProConditions['componentModel']>,
    store?: InstanceType<typeof StoreConditions>,
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
        height: number,

        /**
         *
         * 组件唯一UID
         * @type {string}
         */
        uid: string
    }) => void,
    /**
      *  组件componentWillMount 执行
      */
    onReady?: (ref: ProConditionsRef) => void;

    size?: 'default' | 'small';

    /**
     * 默认是否展开 折叠区域内容
     *
     * @type {boolean}
     * @memberof IProps
     */
    defaultCollapsed?: boolean;
    /**
     * 主要用于当父组件中存在多个搜索组件时，标记key 来保证父级组件中搜索组件唯一
     * 持久化查询输入值时，保证值绝对唯一，生成hash 存入数据库，并且作为查询主键
     * 如果不传，则系统默认生成，此时如果在数据库持久化查询条件，则需要保证搜索组件唯一，及父级组件路径不能产生变化
     * @type {string}
     * @memberof IProps
     */
    uniqueKeys?: string;
    /** 是否拖拽排序 */
    isDragSort?: boolean;

    /** 拖拽移动组件props */
    draggerProps?:IProDraggerProps
    /** 收起按钮的事件 */
    onCollapse?: (collapsed: boolean,viewEntity?: IViewQueryConditionStore) => void;
    debugger?:boolean
}

