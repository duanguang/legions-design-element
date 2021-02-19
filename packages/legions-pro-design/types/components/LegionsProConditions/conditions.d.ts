import React from 'react';
import './style/index.less';
import moment from 'moment';
import { ProQueryConditionStore } from '../store/pro.query.conditions';
import { IViewQueryConditionStore, ISelectAutoQuery } from '../store/pro.query.conditions/interface';
import { IQueryConditionsInstance } from './interface';
import { ConditionCheckBoxModel, ConditionDateModel, ConditionGroupCheckBoxModel, ConditionRadioButtonModel, ConditionRangePickerModel, ConditionSearchModel, ConditionSelectModel, ConditionTextAreaModel, ConditionTextModel, ConditionTextNumberModel, IProConditions, ProConditions } from './ProConditionsUtils';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
interface IProps {
    query: Array<IProConditions['componentModel']>;
    store?: ProQueryConditionStore;
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
      */
    onReady?: (instance: IQueryConditionsInstance) => void;
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
    /** 收起按钮的事件 */
    onCollapse?: (collapsed: boolean, viewEntity?: IViewQueryConditionStore) => void;
}
interface IState {
    collapsed: boolean;
}
export default class LegionsProConditions<Query = {}> extends React.Component<IProps, IState> {
    static ProConditions: typeof ProConditions;
    static ConditionSelectModel: typeof ConditionSelectModel;
    static ConditionTextNumberModel: typeof ConditionTextNumberModel;
    static ConditionRadioButtonModel: typeof ConditionRadioButtonModel;
    static ConditionTextAreaModel: typeof ConditionTextAreaModel;
    static ConditionTextModel: typeof ConditionTextModel;
    static ConditionDateModel: typeof ConditionDateModel;
    static ConditionSearchModel: typeof ConditionSearchModel;
    static ConditionRangePickerModel: typeof ConditionRangePickerModel;
    static ConditionCheckBoxModel: typeof ConditionCheckBoxModel;
    static ConditionGroupCheckBoxModel: typeof ConditionGroupCheckBoxModel;
    resize: () => void;
    timeId: number;
    uid: string;
    queryPrams: {};
    constructor(props: any);
    get viewStore(): import("brain-store-utils").ViewModel<import("../store/pro.query.conditions/conditionView").ConditionView<{}>> & {
        tranQuery: {};
        domHeight: number;
        widthContainer: number;
        selectOptions: import("../store/pro.query.conditions/interface").IObservableMap<string, import("../store/pro.query.conditions/interface").ISelectOptions>;
        readonly computedQuery: (ConditionSelectModel | ConditionTextNumberModel | ConditionRadioButtonModel | ConditionTextAreaModel | ConditionTextModel | ConditionDateModel | ConditionSearchModel | ConditionRangePickerModel | ConditionGroupCheckBoxModel)[];
        readonly computedVmModel: any;
        readonly computedSize: "small" | "default";
        readonly compuedResolution: "xs" | "sm" | "md" | "lg" | "xl";
        _setVmModel: (model: Object) => void;
        _clearQuery: () => void;
        _firstInitQuery: (query: (ConditionSelectModel | ConditionTextNumberModel | ConditionRadioButtonModel | ConditionTextAreaModel | ConditionTextModel | ConditionDateModel | ConditionSearchModel | ConditionRangePickerModel | ConditionGroupCheckBoxModel)[]) => void;
        _initQuery: (query: (ConditionSelectModel | ConditionTextNumberModel | ConditionRadioButtonModel | ConditionTextAreaModel | ConditionTextModel | ConditionDateModel | ConditionSearchModel | ConditionRangePickerModel | ConditionGroupCheckBoxModel)[], options?: {
            isCache: boolean;
        }) => void;
        _setQueryState: (name: string, callback: (value: ConditionSelectModel | ConditionTextNumberModel | ConditionRadioButtonModel | ConditionTextAreaModel | ConditionTextModel | ConditionDateModel | ConditionSearchModel | ConditionRangePickerModel | ConditionGroupCheckBoxModel) => void) => void;
        _setSize: (size: "small" | "default") => void;
        _dispatchRequest: (name: string, autoQuery: ISelectAutoQuery<{}>, options?: {
            pageIndex: number;
            pageSize?: number;
            keyWords?: string;
            callback?: (value: any) => void;
        }) => void;
    };
    get vmModel(): any;
    static defaultProps: {
        size: string;
        defaultCollapsed: boolean;
    };
    consoleLog(type: string, logObj?: Object): void;
    componentWillMount(): void;
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: IProps): void;
    componentWillUnmount(): void;
    componentDidUpdate(): void;
    dispatchRequest(): void;
    onDidMount(): void;
    setFieldsValues(name: string, callback: (value: IProConditions['componentModel']) => void): void;
    initVModel(): void;
    /**
     * 把组件元素结果映射至查询条件
     *
     * @memberof QueryConditions
     */
    mapQueryValue(): void;
    reset(): void;
    handleChangeDate(component: ConditionDateModel | ConditionRangePickerModel, datas: moment.Moment | [moment.Moment, moment.Moment], dateString: string): void;
    handleChangeChx(component: ConditionCheckBoxModel, even: React.ChangeEvent<HTMLInputElement>): void;
    handleSelectSearch(component: ConditionSelectModel, value: any): void;
    handleChangeSelect(component: ConditionSelectModel, even: any): void;
    /**
     * 重置数据
     *
     * @memberof QueryConditions
     */
    handleReset(): void;
    /**
     * 搜索事件
     *
     * @memberof QueryConditions
     */
    handleSearch(): void;
    /**
     * 回车搜索
     *
     * @param {Function} onEnter
     * @memberof QueryConditions
     */
    handleEnter(com: IProConditions['componentModel']): void;
    handleToggle(): void;
    formatTrim(str: any): any;
    handleChange(component: ConditionTextModel | ConditionTextAreaModel | ConditionRadioButtonModel | ConditionTextNumberModel, even: any): void;
    handleGroupChxBox(component: ConditionGroupCheckBoxModel, checkedValue: Array<CheckboxValueType>): void;
    renderComponent(component: IProConditions['componentModel']): JSX.Element;
    renderGroupChxBox(component: ConditionGroupCheckBoxModel): JSX.Element;
    renderInput(component: ConditionTextModel): JSX.Element;
    renderInputTextArea(component: ConditionTextAreaModel): JSX.Element;
    renderSelect(component: ConditionSelectModel): JSX.Element;
    renderDate(component: ConditionDateModel): JSX.Element;
    renderDateRange(component: ConditionRangePickerModel): JSX.Element;
    renderChxBox(component: ConditionCheckBoxModel): JSX.Element;
    renderInputNumber(component: ConditionTextNumberModel): JSX.Element;
    renderRadioButton(component: ConditionRadioButtonModel): JSX.Element;
    renderSearch(component: ConditionSearchModel): JSX.Element;
    renderLabel(component: IProConditions['componentModel'], labelSpan: number): JSX.Element;
    getQueryItemSpan(item: IProConditions['componentModel']): number;
    renderSearchComponent(): JSX.Element[];
    renderShowComponent(hide: IProConditions['componentModel'][]): JSX.Element[];
    renderCollapsed(list: IProConditions['componentModel'][]): JSX.Element[];
    renderQueryComponent(list: IProConditions['componentModel'][]): JSX.Element[];
    renderContent(): JSX.Element;
    render(): JSX.Element;
}
export {};
