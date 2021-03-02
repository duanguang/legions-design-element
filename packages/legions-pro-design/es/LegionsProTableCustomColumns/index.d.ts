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
        selectedRowKeys: string[] | number[];
        _expandRow?: string;
        _type?: "radio" | "checkbox";
        _rowSelectionClickType?: "radio" | "check";
        columns?: (import("antd/lib/table/Table").TableColumnConfig<{}> & import("../store/pro.table/interface").ITableColumnConfig)[];
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
        readonly computedRenderColumns: (import("antd/lib/table/Table").TableColumnConfig<{}> & import("../store/pro.table/interface").ITableColumnConfig)[];
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
        updateOpenRowSelection: (isOpenRowSelection: boolean) => void;
    };
    render(): JSX.Element;
}
export {};
