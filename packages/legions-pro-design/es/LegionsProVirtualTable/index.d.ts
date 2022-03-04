import React, { Component } from 'react';
import { IProTableProps } from '../LegionsProTable/interface';
import { IProTable } from '../LegionsProTable/interface';
import { legionsStoreInterface } from '../LegionsStore/interface';
interface IState {
    startIndex: number;
    visibleRowCount: number;
    thresholdCount: number;
    rowHeight: number;
    topBlankHeight: number;
    bottomBlankHeight: number;
    maxTotalHeight: number;
    columns: (IProTable['tableColumnConfig'])[];
    data: any[];
}
interface IFillNode {
    height: number;
    marginTop?: number;
    marginBottom?: number;
    uid: string;
}
/**
 * 应对展示大量数据时，对性能的优化,主要用于报表展示，
 * 请勿开启左右固定列设置,行高也请固定，否则会计算错误
 *
 * @class
 */
export default class LegionsProVirtualTable extends Component<IProTableProps, IState> {
    FillNode(options: IFillNode): JSX.Element;
    total: number;
    loading: boolean;
    timeId: number;
    uid: string;
    refScroll: Element;
    listenEvent: any;
    refTable: Element;
    tabelRef: IProTable['ref'];
    refLeftTable: Element;
    lastSlideUpHeight: number;
    sameSlideHeightCount: number;
    subscription: legionsStoreInterface['schedule'];
    constructor(props: any);
    ticking: boolean;
    tranMapColumns(columns?: (IProTable['tableColumnConfig'])[]): {
        title?: import("react").ReactNode;
        key: string;
        dataIndex?: string;
        render?: (text: any, record: import("../LegionsProTable/interface").IProTableFormColumnConfigGenProps, index: number) => import("react").ReactNode;
        filters?: {
            text: string;
            value: string;
            children?: any[];
        }[];
        onFilter?: (value: any, record: import("../LegionsProTable/interface").IProTableFormColumnConfigGenProps) => boolean;
        filterMultiple?: boolean;
        filterDropdown?: import("react").ReactNode;
        filterDropdownVisible?: boolean;
        onFilterDropdownVisibleChange?: (visible: boolean) => void;
        sorter: boolean | ((a: any, b: any) => number);
        colSpan?: number;
        width?: React.ReactText;
        className?: string;
        fixed?: boolean | "left" | "right";
        filterIcon?: import("react").ReactNode;
        filteredValue?: any[];
        sortOrder?: boolean | "ascend" | "descend";
        children?: import("antd/lib/table/Column").ColumnProps<import("../LegionsProTable/interface").IProTableFormColumnConfigGenProps>[];
        onCellClick?: (record: import("../LegionsProTable/interface").IProTableFormColumnConfigGenProps, event: any) => void;
        label?: string;
        noChecked?: boolean;
        tooltip?: boolean;
        isExport?: boolean;
    }[];
    throttleWithRAF: (fn: any) => () => void;
    componentWillMount(): void;
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: any): void;
    componentWillUpdate(): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    createTopFillNode(): void;
    createBottomFillNode(): void;
    createLeftTopFillNode(): void;
    createLeftBottomFillNode(): void;
    setRowHeight(): void;
    handleScrollEvent: (even?: any) => void;
    handleScroll: (length: any) => void;
    getIndexByScrollTop(rowHeight: number, scrollTop: number): number;
    handleBlankHeight(length: number, rowHeight: number, maxTotalHeight: number, visibleHeight: number, scrollTop: number): void;
    checkValidIntervalTime(timeKey: any, interval?: number): boolean;
    getValidValue(val: any, min?: number, max?: number): any;
    onReady(value: IProTable['ref']): void;
    getSorterFn: (sortOrder: string, sorter: any) => (a: any, b: any) => any;
    onPagingQuery: (pageIndex: number, pageSize: number, isChangePageSize?: boolean) => void;
    render(): JSX.Element;
}
export {};
