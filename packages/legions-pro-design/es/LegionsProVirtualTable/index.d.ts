import React, { Component } from 'react';
import { IProTableProps } from '../LegionsProTable/interface';
import { InstanceProTable, ITableColumnConfig } from '../LegionsProTable/interface';
import { TableColumnConfig } from '../interface/antd';
import { ISchedule } from '../LegionsStore/interface';
interface IState {
    startIndex: number;
    visibleRowCount: number;
    thresholdCount: number;
    rowHeight: number;
    topBlankHeight: number;
    bottomBlankHeight: number;
    maxTotalHeight: number;
    columns: (TableColumnConfig<{}> & ITableColumnConfig)[];
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
 * @class HlVirtualTable
 * @extends {Component<IHLTableProps, IState>}
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
    tabelRef: InstanceProTable;
    refLeftTable: Element;
    lastSlideUpHeight: number;
    sameSlideHeightCount: number;
    subscription: ISchedule;
    constructor(props: any);
    ticking: boolean;
    tranMapColumns(columns?: (TableColumnConfig<{}> & ITableColumnConfig)[]): {
        title?: React.ReactNode;
        key: string;
        dataIndex?: string;
        render?: (text: any, record: {}, index: number) => React.ReactNode;
        filters?: {
            text: string;
            value: string;
            children?: any[];
        }[];
        onFilter?: (value: any, record: {}) => boolean;
        filterMultiple?: boolean;
        filterDropdown?: React.ReactNode;
        filterDropdownVisible?: boolean;
        onFilterDropdownVisibleChange?: (visible: boolean) => void;
        sorter: boolean | ((a: any, b: any) => number);
        colSpan?: number;
        width?: string | number;
        className?: string;
        fixed?: boolean | "left" | "right";
        filterIcon?: React.ReactNode;
        filteredValue?: any[];
        sortOrder?: boolean | "ascend" | "descend";
        children?: import("antd/lib/table/Column").ColumnProps<{}>[];
        onCellClick?: (record: {}, event: any) => void;
        label?: string;
        noChecked?: boolean;
        tooltip?: boolean;
        isExport?: boolean;
    }[];
    throttleWithRAF: (fn: any) => () => void;
    log: (n: any) => void;
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
    onReady(value: InstanceProTable): void;
    getSorterFn: (sortOrder: string, sorter: any) => (a: any, b: any) => any;
    onPagingQuery: (pageIndex: number, pageSize: number, isChangePageSize?: boolean) => void;
    render(): JSX.Element;
}
export {};
