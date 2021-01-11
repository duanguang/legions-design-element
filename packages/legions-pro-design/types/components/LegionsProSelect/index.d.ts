import React from 'react';
import './style/index.less';
import { SelectProps } from '../interface/antd';
import { IProSelectProps, ISelectProps, LabeledValue } from './interface';
interface IState {
    value: string | any[] | LabeledValue | LabeledValue[];
    keyWords: string;
    pageIndex: number;
    data?: Map<string, ISelectProps[]>;
    total?: number;
}
export declare class AbstractSelect<P = {}, S = {}> extends React.Component<P, S> {
    transformlabelInValue(value: any, props: P, options?: any[]): LabeledValue[] | LabeledValue;
}
export default class LegionsProSelect extends AbstractSelect<IProSelectProps, IState> {
    static defaultProps: {
        maxTagCount: number;
        defaultOpen: boolean;
        mode: string;
        paging: boolean;
        remote: boolean;
    };
    antdSelectRef: any;
    timeId: number;
    uid: string;
    SelectInputUid: string;
    MaxTagPlaceholderUid: string;
    pageSize: number;
    node: Element;
    maxTagPlaceholderNode: Element;
    search: () => void;
    localSearch: () => void;
    constructor(props: any);
    componentWillMount(): void;
    consoleLog(type: string, logObj?: Object): void;
    /**
     *  本地搜索时通过选中词得出所选内容所在页码位置
     *
     * @memberof HLSelect
     */
    queryLocalPageIndexByKeyWords(): void;
    initPageData(datas?: ISelectProps[], total?: number, pageIndex?: number, paging?: boolean): void;
    renderPortal(props: any): void;
    destroyPortal(): void;
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
     * @memberof HLSelect
     */
    antdSelectedValueDom(): void;
    appendPageDom(): void;
    removeEventListener(): void;
    componentWillUnmount(): void;
    onBlur(): void;
    onFocus(): void;
    onSearch(value: string): void;
    onDeselect(value: SelectProps['value']): void;
    onSelect(value: SelectProps['value'], option: Object): void;
    translabelInValue(value: any, options?: ISelectProps[]): LabeledValue[] | LabeledValue;
    setValue(value: any, options?: ISelectProps[], callback?: (values: LabeledValue[] | LabeledValue) => void): LabeledValue | LabeledValue[];
    onChange: (value: any) => void;
    renderOption(): JSX.Element[];
    copyText(value: any): void;
    getLegionsPlugins(): any;
    renderSelelt(): JSX.Element;
    render(): JSX.Element;
}
export {};
