import React from 'react';
import './style/index.less';
import { TableColumnConfig } from 'antd/lib/table/Table';
import { IViewModelProTableStore } from '../store/pro.table/interface';
import { SelectionDecorator } from '../interface/antd';
import { ITableColumnConfig, IExportCsv, IProTableProps } from './interface';
import { ISchedule } from '../store/interface';
import { InstanceLegionsProModal } from '../LegionsProModal/interface';
import { LoggerManager } from 'legions-lunar/legion.plugin.sdk';
interface IState {
    /**
         * 指定选中项的 key 数组
         *
         * @type {string[]}
         * @memberof IState
         */
    selectedRowKeys: string[];
    taskName?: string;
}
declare class ViewUI {
    taskName: string;
}
export default class LegionsProTable<TableRow = {}, Model = {}> extends React.Component<IProTableProps<TableRow, Model>, IState> {
    timeId: number;
    uid: string;
    /**
     * uid 的值绝对唯一，且每次初始生成表单都是相同值
     *
     * @memberof HLForm
     */
    freezeuid: string;
    /**
     *
     * 未加密的freezeuid 值
     * @memberof HLForm
     */
    decryptionfreezeuid: string;
    viewModel: IViewModelProTableStore;
    tableThead: string;
    clientHeight: number;
    viewUI: import("brain-store-utils").ViewModel<ViewUI> & import("brain-store-utils").Proxify<ViewUI>;
    modalRef: InstanceLegionsProModal;
    customColumnsModalRef: InstanceLegionsProModal;
    selections: SelectionDecorator[];
    /** 全链路监控跟踪id */
    traceId: string;
    log: (uid: any) => void;
    subscription: ISchedule;
    node: Element;
    resize: () => void;
    static defaultProps: {
        rowSelectionClickType: string;
        isOpenRowSelection: boolean;
        type: string;
        data: any[];
        total: number;
        loading: boolean;
        displayType: string;
        isOpenCustomColumns: boolean;
        pageSizeOptions: string[];
    };
    constructor(props: any);
    get getViewStore(): any;
    get getLocalViewStore(): any;
    consoleLog(type: Parameters<typeof LoggerManager['report']>[0]['type'], logObj?: Object): void;
    logger(type: Parameters<LegionsProTable['consoleLog']>[0], logObj?: Object): void;
    search(options?: {
        pageIndex?: number;
    }): void;
    /**
     *
     * 导出表格数据
     * @param {Partial<Parameters<typeof exportCsv>[0]>} prams
     * @memberof HLTable
     */
    exportCsv(prams?: Partial<IExportCsv>): void;
    tranMapColumns(columns?: (TableColumnConfig<{}> & ITableColumnConfig)[]): (TableColumnConfig<{}> & ITableColumnConfig)[];
    createHeaderInnerNode(): void;
    initPagination(): void;
    componentWillMount(): void;
    destroyPortal(): void;
    componentWillUnmount(): void;
    componentDidMount(): Promise<void>;
    setTableContainerWidth(): void;
    /**
     * 导出当页数据
     *
     * @memberof HLTable
     */
    exportCurrPageData: () => void;
    exportAllData: () => void;
    renderPortal(): void;
    renderButtonCusttomColumns(): JSX.Element;
    /**
     * 设置表格列头高度
     *
     * @memberof HLTable
     */
    setTableThead(): void;
    /**
     * 设置table 行数据dom 总高度
     *
     * @memberof HLTable
     */
    setTabletBody(): void;
    componentDidUpdate(): void;
    componentWillReceiveProps(nextProps: IProTableProps): void;
    /**
     *
     * 对象值深比较
     * @param {*} obj
     * @param {*} obj1
     * @returns
     * @memberof HLTable
     */
    deepComparisonObject(obj: any, obj1: any): boolean;
    /**
     * 判定唯一键信息在数据列表项中是否存在
     *
     * @returns {boolean}
     * @memberof HLTable
     */
    isHasUniqueKeyData(): boolean;
    /**
     *
     * 判定唯一键值是否存在相同数据
     * @returns
     * @memberof HLTable
     */
    isChkRepeatUniqueKeyData(): boolean;
    onSelectChange: (selectedRowKeys: any, selectedRows: any) => void;
    onRowClick(record: any, index: any, event: any): void;
    onRowClassName(record: any, index: any): string;
    getCheckboxPropsItem(record?: TableRow): Object;
    selectedRowsCheck(record: any): void;
    selectRow: (record: any) => void;
    getSorterFn: (sortOrder: string, sorter: any) => (a: any, b: any) => any;
    renderlocale(): {
        emptyText: JSX.Element;
    };
    render(): JSX.Element;
}
export {};
