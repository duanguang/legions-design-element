/// <reference types="react" />
import { ObservableMap } from 'mobx';
import LegionsModels from '../../LegionsModels';
import { editTableColumns } from '../../services';
import { IProTable } from '../interface';
export interface IObservableMap<K, V> extends ObservableMap<K, V> {
}
export interface IObservableMap<K, V> extends ObservableMap<V> {
}
export interface IShowColumns {
    dataIndex: string;
    title: string;
}
export declare class ProTableView {
    userInfo: {
        userName: string;
        userUid: string;
        companyName?: string;
        companyUid?: string;
    };
    constructor(modulesName?: string, uid?: string, user?: any);
    private uid;
    get computedUid(): string;
    /**
     * table 页码
     *
     * @memberof ProTableView
     */
    pageIndex: number;
    /**
     * table 页大小
     *
     * @memberof ProTableView
     */
    pageSize: number;
    /**
     * 行选中数据
     *
     * @memberof ProTableView
     */
    selectedRowKeys: string[] | number[];
    /**
     *
     * 展开行数据
     * @memberof ProTableView
     */
    _expandRow?: string;
    /**
     *
     * 表格行选中方式
     * @memberof ProTableView
     */
    _type?: 'checkbox' | 'radio';
    /**
     * 表格行单击选中方式
     *
     * @memberof ProTableView
     */
    _rowSelectionClickType?: 'radio' | 'check';
    /**
     * 表格列配置
     *
     * @memberof ModalView
     */
    columns?: (IProTable['tableColumnConfig'])[];
    /**
     * 用于显示列信息列表  table组件内部处理，外部请勿修改数据
     *
     * @type {IShowColumns[]}
     * @memberof ProTableView
     */
    private showColumns;
    /**
     * 隐藏的列信息 ，不显示
     *
     * @private
     * @type {IShowColumns[]}
     * @memberof ProTableView
     */
    private unShowColumns;
    /**
     * 显示列缓存键名
     *
     * @private
     * @memberof ProTableView
     */
    private localStorageShowColumnsKeys;
    /**
     * 服务端存储列设置信息
     *
     * @private
     * @memberof ProTableView
     */
    _obTableListCustom: InstanceType<typeof LegionsModels.TableColumnsContainerEntity>;
    /**
     *
     * table 模块名称，如果设置此值，请保持绝对唯一
     * 要求唯一原因，会根据此名称生成hash用作自定义列缓存信息键名
     * @type {string}
     * @memberof ProTableView
     */
    private tableModulesName?;
    /**
     * table 列表数据渲染后的dom 高度，这个数据时根据真实数据得到，请勿人为修改
     *
     * @memberof ProTableView
     */
    tableBodyDomClientHeight: number;
    /**
     * 当外部组件跟table 处于同一容器组件，存储每个组件高度值
     *
     * @memberof ProTableView
     */
    bodyExternalContainer: IObservableMap<string, {
        height: number;
    }>;
    /**
     * table 高度是否自适应
     *
     * @memberof ProTableView
     */
    isAdaptiveHeight: boolean;
    bodyStyle: React.CSSProperties;
    /**
     * 存储动态添加表格行的数据
     *
     * @type {any[]}
     * @memberof ProTableView
     */
    tempDynamicAddData: any[];
    /**
     * 需要圈定的table 容器 高度 ，默认document.body.clientHeight 取，可以动态设置
     *
     * @memberof ProTableView
     */
    bodyContainerHeight: number;
    /**
     * 内部判定使用，私有变量，外部请勿修改
     *
     * @type {boolean}
     * @memberof ProTableView
     */
    _pagination: boolean;
    /**
     * 外部容器需要扣除的
     *
     * @memberof ProTableView
     */
    bodyExternalHeight: number;
    /**
     * 用于渲染的表格数据,私有变量，外部请勿操作
     *
     * @memberof ProTableView
     */
    _renderData: any[];
    private total;
    /**
     * 查询条件
     * @memberof ProTableView
     */
    queryParams: any;
    /**
     *
     * 是否开启行单击选中数据，内部私有数据，请勿调用
     *
     * 默认值 true(开启)
     * @memberof ProTableView
     */
    _isOpenRowChange: boolean;
    /** 是否开启行选中功能，比如开启checkbox ，radio */
    _isOpenRowSelection: boolean;
    /**
     * 表格容器宽度,私有变量
     *
     * @memberof ProTableView
     */
    _tableContainerWidth: number;
    _uniqueKey: string;
    /**
    * 行选中详细数据
    */
    get computedSelectedRows(): any[];
    get calculateBody(): {};
    /**
     * 显示列
     *
     * @readonly
     * @memberof ProTableView
     */
    get computedShowColumns(): IShowColumns[];
    /**
     * 隐藏列
     *
     * @readonly
     * @memberof ProTableView
     */
    get computedUnShowColumns(): IShowColumns[];
    /**
     *
     * 显示列缓存键名
     * @readonly
     * @memberof ProTableView
     */
    get computedStorageShowColumnsKeys(): string;
    /**
     * 需要显示的table 列信息
     *
     * @readonly
     * @memberof ProTableView
     */
    get computedRenderColumns(): (IProTable['tableColumnConfig'])[];
    /**
     * 表格x轴长度计算 scroll{x:计算}
     *
     * @readonly
     * @memberof ProTableView
     */
    get tableXAutoWidth(): string | number;
    get computedTotal(): number;
    /**
     *
     * 根据源数据对显示和隐藏列进行过滤
     * @memberof ProTableView
     */
    _filterColumns(): void;
    /**
     * 从显示列移除
     *
     * @param {string[]} Columns
     * @memberof ProTableView
     */
    _moveRightShowColumns(Columns: string[]): void;
    /**
     * 从显示列接收移除的列
     *
     * @param {string[]} Columns
     * @memberof ProTableView
     */
    _moveLeftShowColumns(Columns: string[]): void;
    /**
     * 对显示列进行排序
     *
     * @param {*} Columns
     * @memberof ProTableView
     */
    _orderSortRightShowColumns(Columns: string[]): void;
    /**
     *
     * 对隐藏列排序
     * @param {string[]} Columns
     * @memberof ProTableView
     */
    _orderSortLeftShowColumns(Columns: string[]): void;
    _setLocalStorageShowColumnsKeys(modulesName: string, uid: string): void;
    /**
     * 获取显示列缓存信息
     *
     * @memberof ProTableView
     */
    _getLocalStorageShowColumns(): IShowColumns[];
    /**
     *
     * 设置显示列缓存信息并同步到服务端
     * @memberof ProTableView
     */
    _setLocalStorageShowColumns(url: string): void;
    /**
     * 同步自定义列信息到服务端
     *
     * @param {string} modulesUid
     * @param {Parameters<typeof editTableColumns>[1]} customColumns
     * @memberof ProTableView
     */
    _editTableColumns(modulesUid: string, customColumns: Parameters<typeof editTableColumns>[1], url: any): Promise<void>;
    /**
     * 查询自定义列配置数据
     *
     * @param {string} modulesUid
     * @memberof ProTableView
     */
    _queryTableColumns(modulesUid: string, url: any): Promise<void>;
    setTotal(total: number): void;
    /**
     *
     * 开启或者取消单击行选中
     * @param {boolean} isOpenRowChange
     * @memberof ProTableView
     */
    updateOpenRowChange(isOpenRowChange: boolean): void;
    /**
     *
     * 开启或者取消行选中
     * @param {boolean} isOpenRowChange
     */
    updateOpenRowSelection(isOpenRowSelection: boolean): void;
}
