import React from 'react';
import './style/index.less';
import { TableColumnConfig } from 'antd/lib/table/Table';
import { IViewModelProTableStore, ITableAutoQuery } from '../store/pro.table/interface';
import { SelectionDecorator } from '../interface/antd';
import { ITableColumnConfig, IExportCsv, IProTableProps } from './interface';
import { ISchedule } from '../store/interface';
import { InstanceLegionsProModal } from '../LegionsProModal/interface';
import { LoggerManager } from 'legions-lunar/legion.plugin.sdk';
import { ProTableBaseClass } from './ProTableBaseClass';
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
    /** 开启自定义列，同步数据到服务端所需要的查询和保存接口地址信息 */
    static customColumnsConfig: {
        /** 编辑自定义信息同步到服务端接口地址 */
        editApi: string;
        /** 从服务端查询自定义列信息接口地址 */
        queryApi: string;
    };
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
        selectedRows: any[];
        expandRow?: string;
        type?: "checkbox" | "radio";
        rowSelectionClickType?: "radio" | "check";
        columns?: (TableColumnConfig<{}> & import("../store/pro.table/interface").ITableColumnConfig)[];
        obTableListCustom: import("../models").TableColumnsContainerEntity;
        tableBodyDomClientHeight: number;
        bodyExternalContainer: import("../store/pro.table/interface").IObservableMap<string, {
            height: number;
        }>;
        isAdaptiveHeight: boolean;
        scroll: import("../store/pro.table/interface").IScroll;
        bodyStyle: React.CSSProperties;
        tempDynamicAddData: any[];
        bodyContainerHeight: number;
        pagination: boolean;
        bodyExternalHeight: number;
        renderData: any[];
        queryParams: any;
        isOpenRowChange: boolean;
        isOpenRowSelection: boolean;
        _tableContainerWidth: number;
        readonly calculateBody: {};
        readonly computedShowColumns: import("../store/pro.table/interface").IShowColumns[];
        readonly computedUnShowColumns: import("../store/pro.table/interface").IShowColumns[];
        readonly computedStorageShowColumnsKeys: string;
        readonly computedRenderColumns: (TableColumnConfig<{}> & import("../store/pro.table/interface").ITableColumnConfig)[];
        readonly tableXAutoWidth: import("antd/lib/checkbox/Group").CheckboxValueType;
        readonly computedTotal: number;
        filterColumns: () => void;
        moveRightShowColumns: (Columns: string[]) => void;
        moveLeftShowColumns: (Columns: string[]) => void;
        orderSortRightShowColumns: (Columns: string[]) => void;
        orderSortLeftShowColumns: (Columns: string[]) => void;
        setLocalStorageShowColumnsKeys: (modulesName?: string) => void;
        getLocalStorageShowColumns: () => import("../store/pro.table/interface").IShowColumns[];
        setLocalStorageShowColumns: (url: string) => void;
        editTableColumns: (modulesUid: string, customColumns: import("../models").TableListColumns[], url: any) => Promise<void>;
        queryTableColumns: (modulesUid: string, url: any) => Promise<void>;
        setTableModulesName: (tableModulesName: string) => void;
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
