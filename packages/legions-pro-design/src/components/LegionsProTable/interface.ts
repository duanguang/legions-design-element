/*
 * @Author: duanguang
 * @Date: 2020-12-26 17:07:34
 * @LastEditTime: 2021-03-04 10:10:37
 * @LastEditors: duanguang
 * @Description:
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/LegionsProTable/interface.ts
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
import  {
  IViewModelProTableStore,
  ILocalViewModelProTableStore,
  ITableAutoQuery,
} from '../LegionsStoreTable/interface';
import LegionsStoreTable from '../LegionsStoreTable';
import { TableColumnConfig,TableRowSelection } from '../interface/antd';
import {  TableProps} from 'antd/lib/table/Table';
export interface ITableColumnConfig {
  /** 当传入的title不为string类型时，可传label作为checkbox的label展示 */
  label?: string;
  /** 默认不选中 不选中：true 选中：false */
  noChecked?: boolean;

  /**
   *
   * 开启后，文本将不换行，超出部分显示为省略号，并用 Tooltip 组件显示完整内容
   * @type {boolean}
   * @memberof ITableColumnConfig
   */
  tooltip?: boolean;

  /**
   *
   * 是否允许导出,默认导出
   * @type {boolean}
   * @memberof ITableColumnConfig
   */
  isExport?: boolean;
  /** 表格表单项类型 */
  /* formItemType?:TableFormColumnsType */
}

/**
 *
 *扩展table 列配置接口
 * @export
 * @interface ITableColumnConfigProps
 * @extends {TableColumnConfig<T>}
 * @extends {ITableColumnConfig}
 * @template T
 */
export interface ITableColumnConfigProps<T = {}>
  extends TableColumnConfig<T>,
    ITableColumnConfig {}

export interface IExportCsv {
  /**
   *
   * 文件名，默认为 table.csv
   * @type {string}
   * @memberof IExportCsv
   */
  filename: string;

  /**
   * 不显示表头，默认为 false
   *
   * @type {boolean}
   * @memberof IExportCsv
   */
  noHeader?: boolean;

  /**
   * 自定义导出的列数据
   *
   * @type {any[]}
   * @memberof IExportCsv
   */
  columns: any[];

  /**
   * 自定义导出的行数据
   *
   * @type {any[]}
   * @memberof IExportCsv
   */
  data: any[];

  /**
   * 添加此函数后，不会下载，而是返回数据
   *
   * @type {Function}
   * @memberof IExportCsv
   */
  callback?: Function;

  /**
   *
   * 数据分隔符，默认是逗号(,)
   * @type {string}
   * @memberof IExportCsv
   */
  separator?: string;

  /**
   * 每项数据是否加引号，默认为 false
   *
   * @type {boolean}
   * @memberof IExportCsv
   */
  quoted?: boolean;
}

export interface InstanceProTable {
  store: InstanceType<typeof LegionsStoreTable>;
  readonly uid: string;

  /**
   * 当前table实现双向绑定的数据对象，可以直接修改其值，会实时响应到table组件
   *
   * @type {IViewModelHLTable}
   * @memberof InstanceHlTable
   */
  viewModel: IViewModelProTableStore;
  /**
   *
   * 表单UI持久化数据模型
   *
   * 组件卸载后不会清理
   * @memberof InstanceHlTable
   */
  localViewModel: ILocalViewModelProTableStore;
  /**
   * 只读数据，请勿篡改
   *
   * uid 的值绝对唯一，且每次初始生成表单都是相同值
   *
   * 用于调取localViewModel 数据模型数据
   * @memberof InstanceHlTable
   */
  readonly freezeuid: string;
  /**
   * 只读数据，请勿篡改
   *
   * 未加密的freezeUid 值
   *
   * 有需要用到明文值时，可以使用
   * @memberof InstanceHlTable
   */
  readonly decryptionfreezeuid: string;
  /**
   * 暴露一些组件操作方法
   *
   * @memberof InstanceHlTable
   */
  methods?: IMethods;
}
interface IMethods {
  /**
     *
     *  将数据导出为 .csv 文件，不适应复杂表格的excel 文件生成 说明：
支持IE9~IE11、Edge、Chrome、Safari、Firefox 全系列浏览器。
IE9、Safari 需要手动修改后缀名为 .csv。
IE9暂时只支持英文，中文会显示为乱码。
 *说明：columns 和 data 需同时声明，声明后将导出指定的数据，建议列数据有自定义render时，可以根据需求自定义导出内容
     * @memberof IMethods
     */
  exportCsv: (prams?: Partial<IExportCsv>) => void;

  /**
   * 搜索函数
   *
   * @memberof IMethods
   */
  onSearch: (options?: {
    /**
     * 如果设置此值，页码以此为准
     *
     * 否则默认重置到第一页
     *
     * @type {number}
     */
    pageIndex?: number;
    isShowLoading?: boolean;
  }) => void;
  /**
   *
   * 控制开启或者取消行选中
   * @param {boolean} isOpenRowChange
   * @memberof IMethods
   */
  updateOpenRowChange: (isOpenRowChange: boolean) => void;

  /**
   * 同步容器宽度,主要用于当容器隐藏时，无法得到高度，在显示时，在触发同步
   *
   * @memberof IMethods
   */
  setTableContainerWidth: () => void;

  /**
   *
   *  打开自定义列
   * @memberof IMethods
   */
  openCustomColumns: () => void;
}

export declare type IViewModelProTable = IViewModelProTableStore;


export interface IProTableProps<TableRow = {},Model = {}> extends TableProps<TableRow> {
  readonly store?: InstanceType<typeof LegionsStoreTable>,
  pageSize?: number,

  /**
   *
   *如果传递autoQuery参数，则此数据可不传
   * @type {number}
   * @memberof IHLTableProps
   */
  total?: number,

  /**
   * 唯一数据主键名称，用于高亮选中
   *
   * @type {string}
   * @memberof IHLTableProps
   */
  uniqueKey: string
  dataSource?: Array<TableRow>

  /**
   * 分页事件(触发情况1：切换页码；情况2：切换每页条数)
   * 传递此函数则会启动分页
   *  isChangePageSize: 是否有改变页大小
   *
   * @memberof IHLTableProps
   */
  onPagingQuery?: (page: number,pageSize: number,isChangePageSize?: boolean) => void

  /**
   * 如果传递autoQuery参数，则此数据可不传
   *
   * @type {boolean}
   * @memberof IHLTableProps
   */
  loading?: boolean

  /**
   * 选中项发生变化的时的回调
   *
   * 传入此函数，会默认启用行选中数据
   * @memberof IHLTableProps
   */
  onRowChange?: (selectedRows: TableRow[]) => void


  /**
   * 指定选中项的 key 数组
   * 当你需要设置默认选中项，或者清空选中项时传递
   * 传递数据为唯一键(uniqueKey)信息列表
   * @type {string[]}
   * @memberof IHLTableProps
   */
  selectedRowKeys?: string[] | number[],

  /**
   * 表格行单击选中方式
   *
   * @type {('radio'|'check')}
   * @memberof IHLTableProps
   */
  rowSelectionClickType?: 'radio' | 'check',

  /**
   *
   * 表格行选中方式
   * @type {('checkbox'|'radio')}
   * @memberof IHLTableProps
   */
  type?: 'checkbox' | 'radio',

  /**
   *  组件constructor 执行
   *
   * @memberof IHLTableProps
   */
  onReady?: (instance: InstanceProTable) => void;

  /**
   * table 模块名称，如果设置此值，请保持绝对唯一
   * 
   * 如果不设置，则默认由系统生成的唯一值加用户id
   * 
   * 如果不设置，则系统自动生成，系统生成缺陷，当table 组件移动位置，值发生变化，之前缓存的信息就会自动失效
   * 
   * 要求唯一原因，会根据此名称生成hash用作自定义列缓存信息键名
   * 
   * @type {string}
   * @memberof IProps
   */
  tableModulesName?: string;


  /**
   * 分页条数限制
   *
   * @type {number[]}
   * @memberof IHLTableProps
   */
  pageSizeOptions?: string[];


  /**
   * 用于区分是展示大数据还是小量数据
   *
   * @type {any[]}
   * @memberof IHLTableProps
   */
  displayType?: 'smallData' | 'bigData';


  /**
   *导出全部数据方法,传入此方法会开启导出全部
   *
   * @memberof IHLTableProps
   */
  onExportAll?: () => void;


  /**
   * 传入此配置信息将自动托管请求接口
   *
   * 注意
   * 
   * 1: 如果传入此函数，搜索方法会自动挂载到 onReady 函数变量上接收
   * 
   * 2：将不需要onPagingQuery 函数
   * 
   * 3: 维护好搜索条件即可
   * 
   * 4: loading 不需要传递，total 传递0即可
   * 
   * 5: 默认会在HLTable组件构造函数触发搜索方法，可以通过设置isDefaultLoad = false 来手动控制触发时机
   * @type {ITableAutoQuery<Model>}
   * @memberof IHLTableProps
   */
  autoQuery?: ITableAutoQuery<Model>


  /**
   * 是否开启自定义列设置
   *
   * 注意：需要开启行选中才可以
   * 
   * 默认值true
   * @type {boolean}
   * @memberof IHLTableProps
   */
  isOpenCustomColumns?: boolean;


  /**
   *
   * 是否开启行单击选中
   * @type {boolean}
   * @memberof IHLTableProps
   */
  isOpenRowChange?: boolean;

  /** 是否开启行选中,只在初始化执行一次 */
  isOpenRowSelection?: boolean;

  /**
   * 是否显示导出当前页
   *
   * @type {boolean}
   * @memberof IHLTableProps
   */
  visibleExportLoacl?: boolean;

  /** 开启自定义列数据同步接口信息-局部配置(当全局和局部存在冲突时，优先局部配置数据)
     * 
     * 同步数据到服务端所需要的查询和保存接口地址信息 */
  customColumnsConfig?: ICustomColumnsConfig
  onLogRecord?: (params: {
      modulesPath?: string;
      type: string;
      content: string;
      modulesName?: string;
      userInfo: string;
      traceId: string;
      browserEnvironment: string;
  }) => void;
}
export interface ICustomColumnsConfig{
  /** 编辑自定义信息同步到服务端接口地址 */
  editApi: string;
  /** 从服务端查询自定义列信息接口地址 */
  queryApi: string;
}