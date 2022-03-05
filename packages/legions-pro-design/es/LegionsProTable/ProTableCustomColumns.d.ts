import React, { Component } from 'react';
import { ILegionsProModal } from '../LegionsProModal/interface';
import LegionsStoreTable from './store';
import './style/index.less';
interface IProps {
    /**
     * 列配置归属table表
     *
     * @type {string}
     * @memberof IProps
     */
    tableUid: string;
    store?: InstanceType<typeof LegionsStoreTable>;
    /**
    *  组件componentWillMount 执行
    *
    * @memberof IHLTableProps
    */
    onReady?: (ref: ILegionsProModal['ref']) => void;
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
    modalRef: ILegionsProModal['ref'];
    constructor(props: any);
    componentDidMount(): void;
    get viewStore(): import("brain-store-utils/types/create-view-model").ViewModel<import("./store/ProTableView").ProTableView> & {
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
        _type?: "checkbox" | "radio";
        _rowSelectionClickType?: "radio" | "check";
        columns?: import("./interface").ITableColumnConfigProps<{}>[];
        _obTableListCustom: import("../LegionsModels/pro.table.model").TableColumnsContainerEntity;
        tableBodyDomClientHeight: number;
        bodyExternalContainer: import("./store/ProTableView").IObservableMap<string, {
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
        readonly computedShowColumns: import("./store/ProTableView").IShowColumns[];
        readonly computedUnShowColumns: import("./store/ProTableView").IShowColumns[];
        readonly computedStorageShowColumnsKeys: string;
        readonly computedRenderColumns: import("./interface").ITableColumnConfigProps<{}>[];
        readonly tableXAutoWidth: React.ReactText;
        readonly computedTotal: number;
        _filterColumns: () => void;
        _moveRightShowColumns: (Columns: string[]) => void;
        _moveLeftShowColumns: (Columns: string[]) => void;
        _orderSortRightShowColumns: (Columns: string[]) => void;
        _orderSortLeftShowColumns: (Columns: string[]) => void;
        _setLocalStorageShowColumnsKeys: (modulesName: string, uid: string) => void;
        _getLocalStorageShowColumns: () => import("./store/ProTableView").IShowColumns[];
        _setLocalStorageShowColumns: (url: string) => void;
        _editTableColumns: (modulesUid: string, customColumns: import("../LegionsModels/pro.table.model").TableListColumns[], url: any) => Promise<void>;
        _queryTableColumns: (modulesUid: string, url: any) => Promise<void>;
        setTotal: (total: number) => void;
        updateOpenRowChange: (isOpenRowChange: boolean) => void;
        updateOpenRowSelection: (isOpenRowSelection: boolean) => void;
    };
    render(): JSX.Element;
}
export {};
