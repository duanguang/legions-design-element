import React from 'react';
import './style/index.less';
import { TableColumnConfig } from 'antd/lib/table/Table';
import { IViewModelProTableStore, ITableAutoQuery } from '../store/pro.table/interface';
import { SelectionDecorator } from '../interface/antd';
import { ITableColumnConfig, IExportCsv, IProTableProps, ICustomColumnsConfig } from './interface';
import { ISchedule } from '../store/interface';
import { InstanceLegionsProModal } from '../LegionsProModal/interface';
import { ProTableBaseClass } from './ProTableBaseClass';
interface IState {
}
export default class LegionsProTable<TableRow = {}, Model = {}> extends React.Component<IProTableProps<TableRow, Model>, IState> {
    timeId: number;
    uid: string;
    /**
     * uid 的值绝对唯一，且每次初始生成table都是相同值
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
        dataSource: any[];
        total: number;
        loading: boolean;
        displayType: string;
        isOpenCustomColumns: boolean;
        pageSizeOptions: string[];
    };
    /** 开启自定义列数据同步接口信息-全局配置(当全局和局部存在冲突时，优先局部配置数据)
     *
     * 同步数据到服务端所需要的查询和保存接口地址信息 */
    static customColumnsConfig: ICustomColumnsConfig;
    /** 开启自定义列数据同步接口信息-局部配置(当全局和局部存在冲突时，优先局部配置数据)
     *
     * 同步数据到服务端所需要的查询和保存接口地址信息 */
    customColumnsConfig: ICustomColumnsConfig;
    /**
     * 列表组件基类
     *
     * 包含常用方法，例如搜索，重置，搜索条件，列表列配置数据等
     * @export
     * @class ProTableBaseClass
     * @extends {React.Component<P, S>}
     * @template P props 类型约束
     * @template S state 类型约束
     * @template Columns 列配置类型约束
     * @template QueryParams 搜索条件对象类型约束结构 默认any类型
     */
    static ProTableBaseClass: typeof ProTableBaseClass;
    constructor(props: any);
    get uuid(): string;
    get getViewStore(): import("brain-store-utils").ViewModel<import("../store/pro.table/ProTableView").ProTableView> & {
        userInfo: {
            userName: string;
            userUid: string;
            companyName?: string;
            companyUid?: string;
        };
        readonly computedUid: string;
        pageIndex: number;
        pageSize: number;
        selectedRowKeys: string[] | number[];
        _expandRow?: string;
        _type?: "radio" | "checkbox";
        _rowSelectionClickType?: "radio" | "check";
        columns?: (TableColumnConfig<{}> & import("../store/pro.table/interface").ITableColumnConfig)[];
        _obTableListCustom: import("../models").TableColumnsContainerEntity;
        tableBodyDomClientHeight: number;
        bodyExternalContainer: import("../store/pro.table/interface").IObservableMap<string, {
            height: number;
        }>;
        isAdaptiveHeight: boolean;
        bodyStyle: React.CSSProperties;
        tempDynamicAddData: any[];
        bodyContainerHeight: number;
        _pagination: boolean;
        bodyExternalHeight: number;
        _renderData: any[];
        queryParams: any;
        _isOpenRowChange: boolean;
        _isOpenRowSelection: boolean;
        _tableContainerWidth: number;
        _uniqueKey: string;
        readonly computedSelectedRows: any[];
        readonly calculateBody: {};
        readonly computedShowColumns: import("../store/pro.table/interface").IShowColumns[];
        readonly computedUnShowColumns: import("../store/pro.table/interface").IShowColumns[];
        readonly computedStorageShowColumnsKeys: string;
        readonly computedRenderColumns: (TableColumnConfig<{}> & import("../store/pro.table/interface").ITableColumnConfig)[];
        readonly tableXAutoWidth: React.ReactText;
        readonly computedTotal: number;
        _filterColumns: () => void;
        _moveRightShowColumns: (Columns: string[]) => void;
        _moveLeftShowColumns: (Columns: string[]) => void;
        _orderSortRightShowColumns: (Columns: string[]) => void;
        _orderSortLeftShowColumns: (Columns: string[]) => void;
        _setLocalStorageShowColumnsKeys: (modulesName: string, uid: string) => void;
        _getLocalStorageShowColumns: () => import("../store/pro.table/interface").IShowColumns[];
        _setLocalStorageShowColumns: (url: string) => void;
        _editTableColumns: (modulesUid: string, customColumns: import("../models").TableListColumns[], url: any) => Promise<void>;
        _queryTableColumns: (modulesUid: string, url: any) => Promise<void>;
        setTotal: (total: number) => void;
        updateOpenRowChange: (isOpenRowChange: boolean) => void;
    };
    get getLocalViewStore(): import("brain-store-utils").ViewModel<import("../store/pro.table/ProTableLocalView").ProTableLocalView> & {
        obState: import("brain-store-utils").observablePromise.PramsResult<import("./pageListEntity").PageListEntity<any>>;
        loading: boolean;
        dispatchRequest: (autoQuery: ITableAutoQuery<{}>, options: {
            pageIndex: number;
            pageSize: number;
        }) => void;
    };
    consoleLog(type: string, logObj?: Object): void;
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
    inintSelectedRows(selectedRows?: string[] | number[]): void;
    initPagination(): void;
    private initProps;
    private onReady;
    componentWillMount(): void;
    destroyPortal(): void;
    private initCustomColumns;
    /** 是否设置自定义列服务端同步接口配置信息 */
    private isSettingColumnApiConfig;
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
