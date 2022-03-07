import React from 'react';
import './style/index.less';
import { SelectProps } from '../interface/antd';
import { SelectValue } from 'antd/lib/select';
import { IProSelectProps, ProSelect, LabeledValue } from './interface';
interface IState {
    value: string | any[] | LabeledValue | LabeledValue[];
    keyWords: string;
    pageIndex: number;
    data?: Map<string, ProSelect['options'][]>;
    total?: number;
}
declare function transformlabelInValue(value: SelectValue, props: IProSelectProps, options?: ProSelect['options'][]): LabeledValue[] | LabeledValue;
export default class LegionsProSelect extends React.Component<IProSelectProps, IState> {
    static defaultProps: {
        maxTagCount: number;
        defaultOpen: boolean;
        mode: string;
        paging: boolean;
        remote: boolean;
    };
    static transformlabelInValue: typeof transformlabelInValue;
    antdSelectRef: any;
    timeId: number;
    uid: string;
    SelectInputUid: string;
    MaxTagPlaceholderUid: string;
    pageSize: number;
    copyIconNode: Element;
    maxTagPlaceholderNode: Element;
    localSearch: () => void;
    constructor(props: any);
    componentWillMount(): void;
    /** 是否远程搜索 */
    isRemoteSearch(): boolean;
    /**
     *  本地搜索时通过选中词得出所选内容所在页码位置
     *
     * @memberof HLSelect
     */
    queryLocalPageIndexByKeyWords(): void;
    /**
     * 触发分页数据初始化条件
     *
     * 1. 失去焦点，且state.data数据为0时
     *
     * 2. 初始化组件时，触发
     *
     * 3. 组件options数据更新时
     */
    initPageData(datas?: import("./interface").IOptions[], total?: number, pageIndex?: number, paging?: boolean): void;
    getLabel(): string;
    renderIconCopyPortal(props: any): void;
    destroyIconCopyPortal(): void;
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: IProSelectProps): void;
    componentDidUpdate(): void;
    renderMaxTagPlaceholderPortal(): void;
    appendMaxTagDom(): void;
    createMaxTagPlaceholder(): HTMLLIElement;
    creatPageDom(): HTMLDivElement;
    handleChangePage(pageIndex: number, pageSize: number): void;
    onNextPage: () => void;
    onPrePage: () => void;
    /**
     *
     *
     */
    antdSelectedValueDom(): void;
    appendPageDom(): void;
    removeEventListener(): void;
    componentWillUnmount(): void;
    onBlur(): void;
    onFocus(): void;
    onGeneralSearch(props: IProSelectProps, val: any): void;
    onSearch(value: string): void;
    onDeselect(value: SelectProps['value']): void;
    onSelect(value: SelectProps['value'], option: Object): void;
    translabelInValue(value: SelectValue, options?: import("./interface").IOptions[]): LabeledValue[] | LabeledValue;
    setValue(value: SelectValue, options?: import("./interface").IOptions[], callback?: (values: LabeledValue[] | LabeledValue) => void): LabeledValue | LabeledValue[];
    onChange: (value: SelectValue) => void;
    renderOption(): JSX.Element[];
    copyText(value: any): void;
    renderSelelt(): JSX.Element;
    render(): JSX.Element;
}
export {};
