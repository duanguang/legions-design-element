import React from 'react';
import './style/index.less';
import moment from 'moment';
import { ProConditionsProps, ProConditions } from './interface';
import { ConditionCheckBoxModel, ConditionDateModel, ConditionGroupCheckBoxModel, ConditionRadioButtonModel, ConditionRangePickerModel, ConditionSearchModel, ConditionSelectModel, ConditionTextAreaModel, ConditionTextModel, ConditionTextNumberModel, IProConditions, ProConditionsBase } from './ProConditionsUtils';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
interface IProps extends ProConditionsProps {
}
interface IState {
    collapsed: boolean;
}
export default class LegionsProConditions<Query = {}> extends React.Component<IProps, IState> {
    static ProConditionsBase: typeof ProConditionsBase;
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
    get viewStore(): import("brain-store-utils/types/create-view-model").ViewModel<import("./store/conditionView").ConditionView<unknown>> & {
        tranQuery: unknown;
        domHeight: number;
        widthContainer: number;
        _select_data: import("./store/conditionView").IObservableMap<string, import("./store/conditionView").ISelectFetchData>;
        readonly computedQuery: (ConditionSelectModel | ConditionTextNumberModel | ConditionRadioButtonModel | ConditionTextAreaModel | ConditionTextModel | ConditionDateModel | ConditionSearchModel | ConditionRangePickerModel | ConditionGroupCheckBoxModel)[];
        readonly computedVmModel: any;
        readonly computedSize: "default" | "small";
        readonly compuedResolution: "xs" | "sm" | "md" | "lg" | "xl";
        _setVmModel: (model: Object) => void;
        _clearQuery: () => void;
        _firstInitQuery: (query: (ConditionSelectModel | ConditionTextNumberModel | ConditionRadioButtonModel | ConditionTextAreaModel | ConditionTextModel | ConditionDateModel | ConditionSearchModel | ConditionRangePickerModel | ConditionGroupCheckBoxModel)[]) => void;
        _initQuery: (query: (ConditionSelectModel | ConditionTextNumberModel | ConditionRadioButtonModel | ConditionTextAreaModel | ConditionTextModel | ConditionDateModel | ConditionSearchModel | ConditionRangePickerModel | ConditionGroupCheckBoxModel)[], options?: {
            isCache: boolean;
        }) => void;
        _setQueryState: <T extends ConditionSelectModel | ConditionTextNumberModel | ConditionRadioButtonModel | ConditionTextAreaModel | ConditionTextModel | ConditionDateModel | ConditionSearchModel | ConditionRangePickerModel | ConditionGroupCheckBoxModel>(name: string, callback: (value: T) => void) => void;
        _setSize: (size: "default" | "small") => void;
        _removeQuery: (uuid: string) => boolean;
        _setSelectData: (key: string, value: import("./store/conditionView").ISelectFetchData) => void;
    };
    get vmModel(): any;
    static defaultProps: {
        size: string;
        col: number;
        defaultCollapsed: boolean;
    };
    componentWillMount(): void;
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: IProps): void;
    componentWillUnmount(): void;
    componentDidUpdate(): void;
    _dispatchFetch(props: ProConditions['component_props']['select'], params?: any): Promise<{
        data: import("../LegionsProSelect/interface").IOptions[];
        total?: number;
    }>;
    dispatchRequest(query?: (ConditionSelectModel | ConditionTextNumberModel | ConditionRadioButtonModel | ConditionTextAreaModel | ConditionTextModel | ConditionDateModel | ConditionSearchModel | ConditionRangePickerModel | ConditionGroupCheckBoxModel)[]): Promise<Promise<void>[]>;
    onDidMount(): void;
    setFieldsValues<T extends IProConditions['componentModel']>(name: string, callback: (value: T) => void): void;
    mapPrams(item: Exclude<IProConditions['componentModel'], ConditionSearchModel>, data: any, prams: {}): {};
    initVModel(query?: (ConditionSelectModel | ConditionTextNumberModel | ConditionRadioButtonModel | ConditionTextAreaModel | ConditionTextModel | ConditionDateModel | ConditionSearchModel | ConditionRangePickerModel | ConditionGroupCheckBoxModel)[]): void;
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
    handleChangeSelect(component: ConditionSelectModel, value: any, packingValue: any): void;
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
    renderLabel(component: IProConditions['componentModel']): JSX.Element;
    getQueryItemSpan(item: IProConditions['componentModel']): any;
    renderSearchComponent(): JSX.Element[];
    renderShowComponent(hide: IProConditions['componentModel'][]): JSX.Element[];
    renderCollapsed(list: IProConditions['componentModel'][]): JSX.Element[];
    renderQueryComponent(list: IProConditions['componentModel'][]): JSX.Element[];
    renderContent(): JSX.Element;
    render(): JSX.Element;
}
export {};
