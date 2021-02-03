import React, { Component } from 'react';
import { InstanceLegionsProModal } from '../LegionsProModal/interface';
import { ProTableStore } from '../store/pro.table';
interface IProps {
    /**
     * 列配置归属table表
     *
     * @type {string}
     * @memberof IProps
     */
    tableUid: string;
    store?: ProTableStore;
    /**
    *  组件componentWillMount 执行
    *
    * @memberof IHLTableProps
    */
    onReady?: (instance: InstanceLegionsProModal) => void;
    /** 本地数据同步到服务端的接口 */
    customColumnsConfig: {
        /** 编辑自定义信息同步到服务端接口地址 */
        editApi: string;
        /** 从服务端查询自定义列信息接口地址 */
        queryApi: string;
    };
}
interface IState {
    columns?: {
        dataIndex: string;
        title: string;
    }[];
}
export default class LegionsProTableCustomColumns extends Component<IProps, IState> {
    modalRef: InstanceLegionsProModal;
    constructor(props: any);
    componentDidMount(): void;
    get viewStore(): import("brain-store-utils").ViewModel<import("../store/pro.table/ProTableView").ProTableView> & {
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
        columns?: (import("antd/lib/table/Table").TableColumnConfig<{}> & import("../store/pro.table/interface").ITableColumnConfig)[];
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
        readonly computedRenderColumns: (import("antd/lib/table/Table").TableColumnConfig<{}> & import("../store/pro.table/interface").ITableColumnConfig)[];
        readonly tableXAutoWidth: React.ReactText;
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
    render(): JSX.Element;
}
export {};
