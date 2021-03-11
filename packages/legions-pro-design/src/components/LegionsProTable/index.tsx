import React from 'react';
import ReactDOM from 'react-dom'
import { Table,Row,Col,Button,Icon,Input,message,Menu,Dropdown } from 'antd';
import './style/index.less';
import { TableColumnConfig,TableProps,TableRowSelection } from 'antd/lib/table/Table';
import { observer,bind } from 'legions/store-react';
import LegionsStoreTable from '../LegionsStoreTable';
import { IViewModelProTableStore,ILocalViewModelProTableStore,ITableAutoQuery } from '../LegionsStoreTable/interface';
import {
    compare,
} from 'legions-utils-tool/object.utils';
import { warning,warningOnce } from 'legions-utils-tool';
import { shortHash } from 'legions-lunar/object-hash';
import { findDOMNode,unstable_renderSubtreeIntoContainer,unmountComponentAtNode } from 'react-dom';
import { debounce } from 'legions-utils-tool/debounce';
import {
    SelectionDecorator,
    PaginationProps
} from '../interface/antd';
import { ITableColumnConfig,IExportCsv, IProTableProps, ICustomColumnsConfig } from './interface';
import { ISchedule } from '../LegionsStore/interface';
import moment from 'moment';
import LegionsProTableCustomColumns from '../LegionsProTableCustomColumns';
import LegionsProLineOverflow from '../LegionsProLineOverflow';
import throttle from 'lodash.throttle';
import { InstanceProModal } from '../LegionsProModal/interface';
import { observable,runInAction,toJS,isObservable } from 'mobx'
import { observableViewModel } from 'legions/store-utils'
import { legionsThirdpartyPlugin } from 'legions-thirdparty-plugin';
import { legionsPlugins,LoggerManager } from 'legions-lunar/legion.plugin.sdk';
import { cloneDeep } from 'lodash';
import { InstanceProTable } from './interface';
import { ProTableBaseClass } from './ProTableBaseClass';
import invariant from 'invariant';
const serialize = require('serialize-javascript');
const baseCls = `legions-pro-table`



interface IState {

}
const errorMessage = {
    uniqueKey: 'Each record in table should have a unique `uniqueKey` prop,' + 'or set `uniqueKey` to an unique primary key.',
    Repeat: 'uniqueKey[接口数据作为唯一字段不可靠，建议前端自己生成唯一字段。开发环境检测，如果用的接口数据字段作为唯一值，也请确保绝对唯一]:存在相同数据,请认真检查数据是否绝对唯一，否则会引发部分功能异常'
}

@bind({ store: LegionsStoreTable })
@observer
export default class LegionsProTable<TableRow = {},Model = {}> extends React.Component<IProTableProps<TableRow,Model>,IState>{
    timeId = new Date().getTime()
    uid = ''
    /**
     * uid 的值绝对唯一，且每次初始生成table都是相同值
     *
     * @memberof HLForm
     */
    freezeuid = ''
    /**
     * 
     * 未加密的freezeuid 值
     * @memberof HLForm
     */
    decryptionfreezeuid = '';
    viewModel: IViewModelProTableStore = null;
    tableThead = `table-thead${this.uid}`;
    clientHeight = document.body.clientHeight;
    modalRef: InstanceProModal = null;
    customColumnsModalRef: InstanceProModal = null;
    selections: SelectionDecorator[] = [];
    /** 全链路监控跟踪id */
    traceId: string = '';
    log = (uid) => {
        if (this.getLocalViewStore && !this.getLocalViewStore.obState.isPending && this.props.autoQuery&&this.getLocalViewStore.computedRequest==='pending') {
            runInAction(() => {
                this.getLocalViewStore._setLoadingState(false);
                this.getLocalViewStore._setRequestState('complete');
                const data = this.props.autoQuery.transform(this.getLocalViewStore.obState);
                if (data) {
                    const newData = data.data.slice();
                    this.getLocalViewStore._obStateMap.set(this.getViewStore.pageIndex.toString(),{
                        data: newData,
                        total:data.total,
                    });
                    this.props.store.HlTableContainer.get(uid)._renderData = newData;
                    this.props.store.HlTableContainer.get(uid).setTotal(data.total)
                }
            })
            this.consoleLog('watchData',{ uid });
            this.logger('watchData',{
                uid,apiResult: toJS(this.getLocalViewStore.obState),
                apiParams: this.props.autoQuery.params(this.getViewStore.pageIndex,this.getViewStore.pageSize),
                },
            );
        }
    }
    subscription: ISchedule = null;
    node: Element = null;
    resize = debounce(() => {
        this.viewModel.bodyContainerHeight = document.body.clientHeight
    },500)
    static defaultProps = {
        rowSelectionClickType: 'radio',
        isOpenRowSelection: true,
        type: 'checkbox',
        dataSource: [],
        total: 0,
        loading: false,
        displayType: 'smallData',
        isOpenCustomColumns: true,
        pageSizeOptions: ['5','10','20','40','60','80','100','200','500'],
    }
    /** 开启自定义列数据同步接口信息-全局配置(当全局和局部存在冲突时，优先局部配置数据)
     * 
     * 同步数据到服务端所需要的查询和保存接口地址信息 */
    static customColumnsConfig: ICustomColumnsConfig = {
        editApi: '',
        queryApi:'',
    }
    /** 开启自定义列数据同步接口信息-局部配置(当全局和局部存在冲突时，优先局部配置数据)
     * 
     * 同步数据到服务端所需要的查询和保存接口地址信息 */
    customColumnsConfig: ICustomColumnsConfig = {
        editApi: '',
        queryApi:'',
    }
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
    static ProTableBaseClass = ProTableBaseClass;
    constructor(props) {
        super(props)
        this.uid = this.uuid;
        if (this.props.store.HlTableContainer.has(this.freezeuid)) {
            this.timeId = new Date().getTime()
            this.uid = this.uuid;
        }
        this.traceId = this.uid;
        this.freezeuid = this.uid;
        this.tableThead = `table-thead${this.uid}`;
        const keys= 'uniqueUid'
        invariant(this.props[keys],`[legionsProTable]:props.${keys} cannot be empty`);
        if (this.props[keys]) {
            this.decryptionfreezeuid = `${this.props[keys]}`
            this.freezeuid = shortHash(this.decryptionfreezeuid)
            this.props.store.add(this.freezeuid,this.props.tableModulesName,this.uid)
            if (!this.props.store.HlTableLocalStateContainer.has(this.freezeuid)) {
                this.props.store._addLocalState(this.freezeuid)
            }
            if (!this.props.store.HlTableContainer.has(this.freezeuid)) {
                this.props.store.add(this.freezeuid,this.props.tableModulesName,this.uid)
            }
            let isShowLoading = false;
            if (this.getLocalViewStore && this.getLocalViewStore.obState && this.getLocalViewStore.obState.state === 'none') {
                isShowLoading = true;
            }
            if (this.props.autoQuery &&this.getLocalViewStore && (this.props.autoQuery.isDefaultLoad === void 0 || this.props.autoQuery.isDefaultLoad)) {
                this.getLocalViewStore.dispatchRequest(this.props.autoQuery,{
                    pageIndex: this.getViewStore.pageIndex,
                    pageSize: this.getViewStore.pageSize,
                    isShowLoading,
                })
            }
        }
        
        this.initPagination();
        this.initProps();
        this.onReady();
        this.inintSelectedRows()
        this.consoleLog('constructor');
    }
    get uuid() {
        return `table${this.props.store.HlTableContainer.size}${shortHash(`${this.timeId}${this.props.store.HlTableContainer.size}`)}`
    }
    get getViewStore() {
        return this.props.store.HlTableContainer.get(this.freezeuid)
    }
    get getLocalViewStore() {
        return this.props.store.HlTableLocalStateContainer.get(this.freezeuid)
    }
    consoleLog(type: string,logObj?: Object) {
        const obj = logObj || {}
        const logConent = {
            storeView: { ...this.getViewStore },
            ...obj,
            store: this.props.store,
            that: toJS(this),
            props: toJS(this.props),
        }
        LoggerManager.consoleLog({
            //@ts-ignore
            type:`LegionsProTable-${type}`,
            logConent,
            methodsName: 'onHLTableCycle',
        })

    }
    logger(type: Parameters<LegionsProTable['consoleLog']>[0],logObj?: Object) {
        if (typeof this.props.onLogRecord === 'function') {
            const obj = logObj || {}
            const viewStoreKeys = ['calculateBody','bodyContainerHeight',
                'bodyExternalHeight','computedRenderColumns','_tableContainerWidth','_renderData','tableBodyDomClientHeight','tableXAutoWidth']
            const viewStore = {}
            viewStoreKeys.map((item) => {
                if (isObservable(this.getViewStore[item])) {
                    viewStore[item] = cloneDeep(toJS(this.getViewStore[item]));
                } else {
                    viewStore[item] = cloneDeep(this.getViewStore[item]);
                }
            })
            const { store,columns,...props } = this.props
            const logConent = {
                ...viewStore,
                ...obj,
            }
            /* LoggerManager.report({
                //@ts-ignore
                type,
                content: serialize(logConent,{ ignoreFunction: false }),
                traceId: this.traceId,
                modulesName: this.props.tableModulesName,
                modulesPath: this.props['uniqueUid'],
            },this.props.onLogRecord) */
        }

    }
    search(options?: {
        pageIndex?: number;
        isShowLoading?: boolean;
    }) {
        if (this.props.autoQuery && this.getLocalViewStore) {
            let isShowLoading = true;
            if (options) { 
                if (options.pageIndex) {/** 如果主动设置页码，则以主动设置为准 */
                    this.getViewStore.pageIndex = options.pageIndex;
                }
                if (typeof options.isShowLoading === 'boolean') {
                    isShowLoading = options.isShowLoading;
                }
            } else {
                this.getViewStore.pageIndex = 1;
            }
            this.getViewStore.selectedRowKeys = [];
            this.getLocalViewStore.dispatchRequest(this.props.autoQuery,Object.assign({
                pageIndex: this.getViewStore.pageIndex,
                pageSize: this.getViewStore.pageSize,
                isShowLoading,
            },options))
        }
    }
    /**
     *
     * 导出表格数据
     * @param {Partial<Parameters<typeof exportCsv>[0]>} prams
     * @memberof HLTable
     */
    exportCsv(prams: Partial<IExportCsv> = {}) {
        if (!legionsThirdpartyPlugin.plugins.excel) {
            message.warning('Plugin is not ready to excel, Please install at the entrance(legionsThirdpartyPlugin.use({name:"excel",url:"xxxx"}))');
            return;
        }
        let columns = [];
        let datas = []
        if (prams.columns && prams.data) {
            columns = prams.columns;
            datas = prams.data;
        }
        else {
            columns = this.viewModel.computedRenderColumns;
            /* columns = this.viewModel.computedRenderColumns; */
            if (this.props.displayType === 'bigData') {
                datas = this.props.dataSource
            } else {
                datas = this.viewModel._renderData.map((item) => {
                    return item
                });
            }
        }
        let newColumns = columns.filter((item) => { return item.isExport !== false });
        legionsThirdpartyPlugin.plugins.excel.exportJsonToExcel({ data: datas,columns: newColumns,filename: prams.filename,autoWidth: true })
    }
    //@ts-ignore
    tranMapColumns(columns: (TableColumnConfig<{}> & ITableColumnConfig)[] = this.props.columns) {
        return columns.map((item) => {
            if (!item.render && item.tooltip) {
                let newItem = { key: item.dataIndex,...item };
                newItem = {
                    ...newItem,render: (text,record) => {
                        return <LegionsProLineOverflow width={item.width} text={record[item.dataIndex]}></LegionsProLineOverflow>
                    }
                }
                return newItem;
            }
            return item;
        })
    }
    createHeaderInnerNode() {
        const ele = ReactDOM.findDOMNode(this).getElementsByClassName('ant-table-scroll')[0]
        if (ele && ele.firstElementChild && ele.firstElementChild.firstElementChild) {
            const div = document.createElement('div');
            div.setAttribute('class','proTable-header-inner');
            ele.firstElementChild.insertBefore(div,ele.firstElementChild.firstElementChild)
        }
    }
    inintSelectedRows(selectedRows:string[]|number[]=this.props.selectedRowKeys) {
        if (Array.isArray(selectedRows) && selectedRows.length) {
            const store = this.getViewStore;
            store.selectedRowKeys = [];
            selectedRows.forEach((item:string|number) => {
                if (typeof item === 'string' || typeof item === 'number') {
                    //@ts-ignore
                    store.selectedRowKeys.push(item);
                }
            })
        }
    }
    initPagination() {
        const paginationProps: PaginationProps | boolean = this.props.pagination
        const store = this.getViewStore
        store.pageIndex = 1
        store.pageSize = this.props.pageSize || store.pageSize
        if ((typeof paginationProps === 'boolean')) {
            store._pagination = paginationProps
        }
        else if (this.props.autoQuery) {
            store._pagination = true
        }
        else if (this.props.onPagingQuery && paginationProps === void 0) {
            store._pagination = true;
        }
        else if (!this.props.onPagingQuery && paginationProps === void 0) {
            store._pagination = false;
        }

    }
    private initProps() {
        const store = this.getViewStore
        if ((typeof this.props.isOpenRowChange === 'boolean' && !this.props.isOpenRowChange)) {
            store._isOpenRowChange = false
        }
        if ((typeof this.props.isOpenRowSelection === 'boolean' && !this.props.isOpenRowSelection)) {
            store._isOpenRowSelection = false
        }
        this.viewModel = store;
        store._uniqueKey = this.props.uniqueKey;
        this.viewModel.bodyStyle = Object.assign({},this.props.bodyStyle)
        const customColumnsConfig = this.props.customColumnsConfig;

        if (customColumnsConfig && customColumnsConfig.editApi && customColumnsConfig.queryApi) {
            this.customColumnsConfig = customColumnsConfig;
        } else if (LegionsProTable.customColumnsConfig.editApi && LegionsProTable.customColumnsConfig.queryApi) {
            this.customColumnsConfig = LegionsProTable.customColumnsConfig;
        }
    }
    private onReady() {
        const store = this.getViewStore
        this.props.onReady && this.props.onReady({
            store: this.props.store,
            uid: this.freezeuid,
            viewModel: store,
            localViewModel: this.getLocalViewStore,
            freezeuid: this.freezeuid,
            decryptionfreezeuid: this.decryptionfreezeuid,
            methods: {
                exportCsv: (prams: Partial<IExportCsv>) => {
                    this.exportCsv(prams)
                },
                onSearch: (options?: {
                    pageIndex: number;
                    isShowLoading?: boolean;
                }) => {
                    this.search(options)
                },
                updateOpenRowChange: (isOpenRowChange: boolean) => {
                    this.getViewStore.updateOpenRowChange(isOpenRowChange);
                },
                setTableContainerWidth: () => {
                    this.setTableContainerWidth()
                },
                openCustomColumns: () => {
                    if (this.customColumnsModalRef) {
                        this.customColumnsModalRef.viewModel.visible = true
                    }
                }
            }
        })
    }
    componentWillMount() {
        
        if (this.props.autoQuery) {
            this.subscription = this.props.store.schedule([this.log.bind(this,this.freezeuid)])
        }
        this.consoleLog('componentWillMount')
        /* this.subscription.unsubscribe() */
    }
    destroyPortal() {
        5
        if (this.node) {
            unmountComponentAtNode(this.node);
        }
    }
    private async initCustomColumns() {
        if (this.props.isOpenCustomColumns) {
            this.selections.push({
                key: 'custom-columns',
                text: this.renderButtonCusttomColumns(),
                onSelect: (changeableRowKeys) => {
                },
            })
            this.viewModel._setLocalStorageShowColumnsKeys(this.props.tableModulesName,this.freezeuid);
            if (this.isSettingColumnApiConfig()) {
                await this.viewModel._queryTableColumns(this.viewModel.computedStorageShowColumnsKeys,this.customColumnsConfig.queryApi);
                if (this.viewModel._obTableListCustom) {
                    if (!this.viewModel._obTableListCustom.result || (this.viewModel._obTableListCustom.result && this.viewModel._obTableListCustom.result.customColumns.length === 0)) {
                        this.getViewStore._filterColumns();
                        const body = this.viewModel.computedShowColumns.map((item) => {
                            return { dataIndex: item.dataIndex,title: item.title }
                        })
                        if (body.length) {
                            await this.viewModel._editTableColumns(this.viewModel.computedStorageShowColumnsKeys,body,this.customColumnsConfig.editApi)
                        }
                    }
                }
            } 
            this.getViewStore._filterColumns();
        }
    }
    /** 是否设置自定义列服务端同步接口配置信息 */
    private isSettingColumnApiConfig() {
        if (this.customColumnsConfig.editApi && this.customColumnsConfig.queryApi) {
            return true;
        }
        return false;
    }
    private isSmallData() {
        if (this.props.displayType === 'smallData') {
            return true;
        }
        return false;
    }
    componentWillUnmount() {
        /* this.props.store.delete(this.freezeuid); */
        if (this.props.tableModulesName) {
            this.props.store.deleteTableModules(this.props.tableModulesName)
        }
        window.removeEventListener && window.removeEventListener('resize',this.resize.bind(this))
        this.subscription && this.subscription.unsubscribe()
        this.destroyPortal()
        this.consoleLog('componentWillUnmount')
    }
    async componentDidMount() {
        const table = document.querySelector(`.${this.uid}`);
        if (!table) {
            return;
        }
        this.createHeaderInnerNode()
        if (this.viewModel.isAdaptiveHeight) {
            this.setTableThead()
            this.setTabletBody()
        }
        this.getViewStore.columns = this.tranMapColumns();
        await this.initCustomColumns();
        if (this.props.visibleExportLoacl === void 0 || this.props.visibleExportLoacl) {
            const _index = this.selections.findIndex((item) => item.key === 'export-excel');
            if (_index < 0) {
                this.selections.push({
                    key: 'export-excel',
                    text: <Button size="small" >导出当页<Icon type="download" /></Button>,
                    onSelect: (changeableRowKeys) => {
                        this.exportCsv({ filename: `${moment().format('YYYYMMDDHHmmss')}-${this.viewModel.pageIndex}` })
                    },
                })
            }
        }
        if (this.props.onExportAll) { // 兼容历史问题，之前是onExportAll 传入此方法开启导出当页和全部，现在需要导出当页分开控制
            this.selections.push({
                key: 'export-all-excel',
                text: <Button size="small" >导出全部<Icon type="download" /></Button>,
                onSelect: (changeableRowKeys) => {
                    this.props.onExportAll()
                },
            })
        }
        
        window.addEventListener && window.addEventListener('resize',this.resize.bind(this))
        if (findDOMNode(this).getElementsByClassName('ant-table-body')) {
        }
        this.setTableContainerWidth();
        const data = this.props.dataSource;
        if (this.props.autoQuery) {
            if (this.getLocalViewStore && this.getViewStore) {
                const keys = this.getViewStore.pageIndex.toString();
                if (this.getLocalViewStore._obStateMap.has(keys)) {
                    const result = this.getLocalViewStore._obStateMap.get(keys)
                    //@ts-ignore
                    data = result.data;
                    this.getViewStore.setTotal(result.total);
                }
            }
        }
        else {
            if (this.isSmallData()) {
                this.getViewStore.setTotal(this.props.total || 0)
            }
        }
        if (data) {
            if (this.isSmallData()) {
                this.getViewStore._renderData = [...data]
            }
            if (this.getViewStore._renderData.length) {
                const UniqueKey = this.isHasUniqueKeyData()
                const Repeat = this.isChkRepeatUniqueKeyData()
                warningOnce(UniqueKey,errorMessage.uniqueKey)
                warningOnce(!Repeat,errorMessage.Repeat)
            }
        }
        const anttablefixed = table.querySelector('.ant-table-fixed-left')
        let thead = null
        if (anttablefixed) {
            thead = anttablefixed.querySelector('thead');
        } else {
            thead = table.querySelector('thead');
        }
        if (thead && this.selections.length) {
            const span = document.createElement('span');
            this.node = span;
            if (thead.querySelector('th')) {
                const RootContainer = this.getViewStore._isOpenRowSelection && this.props.type === 'checkbox' ? '.ant-table-selection-down' : 'span'
                const spanth = thead.querySelector('th').querySelector(RootContainer);
                if (spanth) {
                    spanth.appendChild(this.node)
                    this.renderPortal();
                }
            }
        }
        this.consoleLog('componentDidMount');
    }

    setTableContainerWidth() {
        if (findDOMNode(this).getElementsByClassName('ant-table-body')) {
            const tableBody = findDOMNode(this).getElementsByClassName('ant-table-body');
            if (tableBody && tableBody instanceof HTMLCollection && tableBody.length) {
                const width = tableBody[0].clientWidth;
                this.viewModel._tableContainerWidth = width;
            }
        }
    }
    /**
     * 导出当页数据
     *
     * @memberof HLTable
     */
    exportCurrPageData = () => {
        this.exportCsv({ filename: `${moment().format('YYYYMMDDHHmmss')}-${this.viewModel.pageIndex}` })
    }
    exportAllData = () => {
        this.modalRef.viewModel.title = '导出数据'
        this.modalRef.viewModel.visible = true;
    }
    renderPortal() {
        const index = this.selections.findIndex((item) => item.key === 'export-excel')
        const menu = (
            <Menu>
                {(this.props.isOpenCustomColumns) && <Menu.Item key="3">{this.renderButtonCusttomColumns()}</Menu.Item>}
                {index > -1 && <Menu.Item key="1"><Button size="small" onClick={this.exportCurrPageData}>导出当页<Icon type="download" /></Button></Menu.Item>}
                {this.props.onExportAll && <Menu.Item key="2"><Button size="small" onClick={this.exportAllData}>导出全部<Icon type="download" /></Button></Menu.Item>}

            </Menu>
        );
        unstable_renderSubtreeIntoContainer(
            this, //代表当前组件
            <Dropdown overlay={menu}>
                <Icon type="appstore-o" style={{ color: 'red' }} />
            </Dropdown>
            ,
            this.node // 传送门另一端的DOM node
        )
    }
    renderButtonCusttomColumns() {
        return <Button size="small" onClick={() => {
            this.customColumnsModalRef.viewModel.visible = true;
            this.customColumnsModalRef.viewModel.title =
                <p>表格列自定义显示及排序<span style={{ color: 'red' }}>(请拖动列名进行操作)</span></p>

        }}>自定义列<Icon type="bars" /></Button>
    }
    /**
     * 设置表格列头高度
     *
     * @memberof HLTable
     */
    setTableThead() {
        const table = document.querySelector(`.${this.uid}`);
        if (table) {
            const tableThead = table.querySelector('.ant-table-thead')
            const store = this.props.store.HlTableContainer.get(this.freezeuid)
            const tr = findDOMNode(tableThead.querySelector('tr'))
            if (tableThead && tr) {
                if (store.bodyExternalContainer.get(this.tableThead) && tr.clientHeight !== store.bodyExternalContainer.get(this.tableThead).height) {// 当存在时，对比两次数据变化，不一致，在重新set
                    store.bodyExternalContainer.set(this.tableThead,{ height: findDOMNode(tableThead.querySelector('tr')).clientHeight })
                }
                else {
                    // 不存在时直接set
                    store.bodyExternalContainer.set(this.tableThead,{ height: findDOMNode(tableThead.querySelector('tr')).clientHeight })
                }
            }
        }
    }

    /**
     * 设置table 行数据dom 总高度
     *
     * @memberof HLTable
     */
    setTabletBody() {
        const table = document.querySelector(`.${this.uid}`);
        if (table) {
            const tabletBody = table.querySelector('.ant-table-tbody')
            const store = this.props.store.HlTableContainer.get(this.freezeuid)
            if (tabletBody && store.tableBodyDomClientHeight !== findDOMNode(tabletBody).clientHeight) {
                store.tableBodyDomClientHeight = findDOMNode(tabletBody).clientHeight
            }
        }
    }

    componentDidUpdate() {
        if (this.viewModel.isAdaptiveHeight) {
            this.setTableThead()
            this.setTabletBody()
        }
        this.node && this.renderPortal();
        this.consoleLog('componentDidUpdate')
    }
    //@ts-ignore
    componentWillReceiveProps(nextProps: IProTableProps) {
        if (this.props.selectedRowKeys && this.props.selectedRowKeys !== nextProps.selectedRowKeys) {
            let data = []
            if (this.props.autoQuery && this.props.displayType === 'smallData') {
                data = (this.getViewStore._renderData && this.getViewStore._renderData.length) ? this.getViewStore._renderData : [];
            }
            else {
                data = (nextProps.dataSource && nextProps.dataSource.length) ? nextProps.dataSource : []
            }
            // @ts-ignore
            let newSelectedRows = data.filter(v => nextProps.selectedRowKeys.includes(v[this.props.uniqueKey]))
            let newSelectedRowKeys = newSelectedRows.map((item) => item[this.props.uniqueKey])
            const selectedRowKeys = [...newSelectedRowKeys]
            this.getViewStore.selectedRowKeys = selectedRowKeys;
        }
        if (this.props.bodyStyle && !this.deepComparisonObject(this.props.bodyStyle,nextProps.bodyStyle)) {
            this.viewModel.bodyStyle = nextProps.bodyStyle
        }
        if (nextProps.dataSource !== this.props.dataSource && nextProps.dataSource && !this.props.autoQuery) {
            
            /**  主要解决当渲染数据和传入数据不一致时，无需通过传入数据值来刷新渲染数据 */
            if (this.props.displayType === 'smallData') {
                this.getViewStore._renderData = [...this.props.autoQuery ? [] : nextProps.dataSource]
            }
            if (this.getViewStore._renderData.length) {
                const UniqueKey = this.isHasUniqueKeyData()
                const Repeat = this.isChkRepeatUniqueKeyData()
                warningOnce(UniqueKey,errorMessage.uniqueKey)
                warningOnce(!Repeat,errorMessage.Repeat)
            }
        }
        if (this.props.columns !== nextProps.columns) {
            this.getViewStore.columns = this.tranMapColumns(nextProps.columns);
        }
        this.consoleLog('componentWillReceiveProps');
    }

    /**
     *
     * 对象值深比较
     * @param {*} obj
     * @param {*} obj1
     * @returns
     * @memberof HLTable
     */
    deepComparisonObject(obj,obj1) {
        return JSON.stringify(obj) === JSON.stringify(obj1)
    }

    /**
     * 判定唯一键信息在数据列表项中是否存在
     *
     * @returns {boolean}
     * @memberof HLTable
     */
    isHasUniqueKeyData(): boolean {
        const result = this.viewModel._renderData.every((item) => this.props.uniqueKey in item);
        return result
    }
    /**
     *
     * 判定唯一键值是否存在相同数据
     * @returns
     * @memberof HLTable
     */
    isChkRepeatUniqueKeyData(): boolean {
        let isSame = false;
        let obj = {};
        for (var i = 0; i < this.viewModel._renderData.length; i++) {
            if (this.viewModel._renderData[i][this.props.uniqueKey] in obj) {
                isSame = true;
                break;
            } else {
                obj[this.viewModel._renderData[i][this.props.uniqueKey]] = this.viewModel._renderData[i][this.props.uniqueKey];
            }
        }
        return isSame
    }
    onSelectChange = (selectedRowKeys,selectedRows) => {
        let dataleng = this.props.dataSource ? this.props.dataSource.length : 0;
        if (this.props.autoQuery) {
            dataleng = this.getViewStore._renderData.length
        }
        if (this.getViewStore._renderData.length === dataleng) {
            this.getViewStore.selectedRowKeys = selectedRowKeys;
            this.props.onRowChange && this.props.onRowChange(selectedRows)
        }
    }
    onRowClick(record,index,event) {
        if (this.getViewStore._isOpenRowChange) {
            this.selectRow(record)
            this.props.onRowClick && this.props.onRowClick(record,index,event)
        }
    }
    onRowClassName(record,index): string {
        const RowIndex = this.getViewStore.selectedRowKeys.findIndex((item) => item === record[this.props.uniqueKey]);
        const getCheckboxPropsItem = this.getCheckboxPropsItem(record)
        if (RowIndex > -1) {
            return 'row-color'
        }
        else if (getCheckboxPropsItem && getCheckboxPropsItem['disabled']) {
            return 'disabled-color';
        }
        return record['className'] || ''
    }
    getCheckboxPropsItem(record: TableRow = null) {
        if (this.props.rowSelection && this.props.rowSelection.getCheckboxProps && typeof this.props.rowSelection.getCheckboxProps === 'function' && record) {
            const getCheckboxPropsItem = this.props.rowSelection.getCheckboxProps(record)
            if (Object.prototype.toString.call(getCheckboxPropsItem) === '[object Object]') {
                return getCheckboxPropsItem
            }
        }
        return null
    }
    selectedRowsCheck(record) {
        let selectedRows = [...this.getViewStore.computedSelectedRows];
        let selectedRowKeys = [...this.getViewStore.selectedRowKeys]
        const selectedRow = selectedRows.find((item) => item[this.props.uniqueKey] === record[this.props.uniqueKey])
        if (selectedRowKeys.indexOf(record[this.props.uniqueKey]) >= 0) {
            selectedRowKeys.splice(selectedRowKeys.indexOf(record[this.props.uniqueKey]),1);
        } else {
            if (this.props.rowSelectionClickType === 'radio') {
                selectedRowKeys = []
            }
            selectedRowKeys.push(record[this.props.uniqueKey]);
        }
        if (selectedRow) {
            const index = selectedRows.findIndex((item) => item[this.props.uniqueKey] === record[this.props.uniqueKey])
            selectedRows.splice(index,1);
        } else {
            if (this.props.rowSelectionClickType === 'radio') {
                selectedRows = []
            }
            selectedRows.push(record);
        }
        this.getViewStore.selectedRowKeys = selectedRowKeys as string[]|number[];
        this.props.onRowChange && this.props.onRowChange(selectedRows)
    }
    selectRow = record => {
        const getCheckboxPropsItem = this.getCheckboxPropsItem(record)
        if (getCheckboxPropsItem && getCheckboxPropsItem['disabled']) {
            return;
        }
        this.selectedRowsCheck(record)
    };

    getSorterFn = (sortOrder: string,sorter) => {
        return (a,b) => {
            const result = sorter(a,b);
            if (result !== 0) {
                return (sortOrder === 'descend') ? -result : result;
            }
            return 0;
        };
    }
    //@ts-ignore
    renderlocale() {
        if (this.props.autoQuery) {
            if (this.getLocalViewStore && this.props.autoQuery.isDefaultLoad === false) {
                return {
                    emptyText: <div className="no-data-tip"><Icon style={{ color: '#95cef9',fontSize: '20px',paddingRight: '5px',verticalAlign: 'middle' }} type="search" />
                    初次打开页面不加载数据，请组合条件进行搜索</div>
                }
            }
            else if (this.getLocalViewStore && this.getLocalViewStore.obState.isResolved && this.getViewStore._renderData.length === 0) {
                if (this.getLocalViewStore.obState.value&&!this.getLocalViewStore.obState.value.success && this.getLocalViewStore.obState.value.message) {
                    return {
                        emptyText: <div className="no-data-tip"><Icon style={{ color: '#95cef9',fontSize: '20px',paddingRight: '5px',verticalAlign: 'middle' }} type="search" />
                            {this.getLocalViewStore.obState.value.message}</div>
                    }
                }
                return {
                    emptyText: <div className="no-data-tip"><Icon style={{ color: '#95cef9',fontSize: '20px',paddingRight: '5px',verticalAlign: 'middle' }} type="search" />
                    没有符合条件的数据，请尝试其他搜索条件</div>
                }
            }
            else {
                return {
                    emptyText: <div className="no-data-tip"><Icon style={{ color: '#95cef9',fontSize: '20px',paddingRight: '5px',verticalAlign: 'middle' }} type="search" />
                    暂无数据</div>
                }
            }
        }
    }
    render() {
        const store = this.getViewStore;
        const { selectedRowKeys } = store;
        const alreadyRowsLen = store.computedSelectedRows.length
        let locale = null
        if (this.props.autoQuery) {
            locale = {
                locale: this.renderlocale(),
            }
        }
        
        this.consoleLog('render');
        const rowSelection: TableRowSelection<{}> = (this.getViewStore._isOpenRowSelection) ? {
            ...this.props.rowSelection,
            selectedRowKeys:[...selectedRowKeys] as string[]|number[],
            hideDefaultSelections: true,
            type: this.props.type,
            selections: this.selections as SelectionDecorator[],
            onChange: this.onSelectChange.bind(this),
            onSelectAll: (selected,selectedRows,changeRows) => {
                if (this.getViewStore._renderData.length <= this.props.dataSource.length) { // 主要用于大数据table 性能问题，每次只加载部分数据，这时全选时自动选择全部数据
                    if (selected) {
                        const newData = this.props.dataSource.filter((item) => {
                            const getCheckboxPropsItem = this.getCheckboxPropsItem(item)
                            return ((!getCheckboxPropsItem || (getCheckboxPropsItem && !getCheckboxPropsItem['disabled'])))
                        })
                        const selectedRowKey = newData.map((item) => item[this.props.uniqueKey])
                        store.selectedRowKeys = selectedRowKey;
                        this.props.onRowChange && this.props.onRowChange(this.getViewStore.computedSelectedRows)
                    }
                    else {
                        store.selectedRowKeys = [];
                        this.props.onRowChange && this.props.onRowChange(this.getViewStore.computedSelectedRows)
                    }
                }
            },
            onSelectInvert: () => {
                store.selectedRowKeys = [];
            },
        }:null;
        const paginationProps: PaginationProps | boolean = this.props.pagination
        const pagination: PaginationProps | boolean = {
            pageSizeOptions: this.props.pageSizeOptions,
            total: this.props.autoQuery ? this.getViewStore.computedTotal : this.props.total,
            current: store.pageIndex,
            showQuickJumper: true,
            pageSize: store.pageSize,
            showSizeChanger: true,
            size: (paginationProps && typeof paginationProps === 'object') ? paginationProps.size : '',
            onChange: (pageIndex,pageSize) => {
                store.selectedRowKeys = [];/**  切换页码 初始化行选择数据*/
                this.props.store.get(this.freezeuid).pageIndex = pageIndex
                this.props.store.get(this.freezeuid).pageSize = pageSize
                this.props.onPagingQuery && this.props.onPagingQuery(pageIndex,pageSize,false)
                if (this.props.autoQuery && this.getLocalViewStore) {
                    let isShowLoading = true;
                    const result = this.getLocalViewStore._obStateMap.get(this.getViewStore.pageIndex.toString())
                    if (result) {
                        isShowLoading = false;
                        this.getViewStore._renderData = [...result.data];
                        this.getViewStore.setTotal(result.total);
                    }
                    this.getLocalViewStore.dispatchRequest(this.props.autoQuery,{
                        pageIndex,
                        pageSize,
                        isShowLoading,
                    })
                }
            },
            onShowSizeChange: (current: number,pageSize) => {
                store.selectedRowKeys = [];/**  切换页大小 初始化行选择数据*/
                this.props.store.get(this.freezeuid).pageIndex = current
                this.props.store.get(this.freezeuid).pageSize = pageSize
                this.props.onPagingQuery && this.props.onPagingQuery(current,pageSize,true)
                if (this.props.autoQuery && this.getLocalViewStore) {
                    this.getLocalViewStore.dispatchRequest(this.props.autoQuery,{
                        pageIndex: current,
                        pageSize,
                        isShowLoading:true,
                    })
                }
            },
            showTotal: total => `${alreadyRowsLen > 0 ? `已选择${alreadyRowsLen}条数据` : ''} 共 ${total} 条数据`
        }
        /* const bodyStyle = (this.viewModel.isAdaptiveHeight && this.getViewStore._renderData && this.getViewStore._renderData.length > 0) ? { ...this.viewModel.bodyStyle,...this.viewModel.calculateBody } : this.viewModel.bodyStyle */
        const bodyStyle = (this.viewModel.isAdaptiveHeight && this.getViewStore._renderData && this.getViewStore._renderData.length > 0) ? { ...this.viewModel.bodyStyle,...this.viewModel.calculateBody } : this.viewModel.bodyStyle
        return <Row className={baseCls}>
            <Col>
                <div className={`containers ${this.uid} ${this.viewModel.isAdaptiveHeight ? 'adaptiveHeight' : ''}`}>
                    <Table
                        /* size="small" */
                        {...locale}
                        {...this.props}
                        scroll={{...{
                            x: store.tableXAutoWidth,
                            y: 300,
                        },...this.props.scroll}}
                        columns={this.viewModel.computedRenderColumns}
                        bordered
                        bodyStyle={bodyStyle}
                        rowClassName={this.onRowClassName.bind(this)}
                        pagination={(this.getViewStore._pagination) ? pagination : false}
                        loading={{ tip: 'loading',spinning: this.props.autoQuery ? this.getLocalViewStore.computedLoading : this.props.loading }}
                        rowKey={this.props.uniqueKey}
                        // locale={{emptyText:<span>2222</span>}}
                        onRowClick={this.onRowClick.bind(this)}
                        rowSelection={rowSelection}
                        dataSource={[...this.getViewStore._renderData]}
                        onChange={(pagination,filters,sorter: { column: { sorter: boolean | ((a: any,b: any) => number) }; columnKey: string; field: string; order: "ascend" | "descend" }) => {
                            if (sorter.column && sorter.column.sorter && typeof sorter.column.sorter === 'boolean' && this.props.displayType === 'smallData') {
                                const sorterFn = this.getSorterFn(sorter.order,(a,b) => {
                                    return compare(a[sorter.columnKey],b[sorter.columnKey]);
                                });
                                const data = this.viewModel._renderData.map((item) => { return item });
                                this.viewModel._renderData = [...data.sort(sorterFn)]
                            }
                            this.props.onChange && this.props.onChange(pagination,filters,sorter)
                        }}
                    />
                </div>
            </Col>
           
            {this.props.isOpenCustomColumns && <LegionsProTableCustomColumns
                customColumnsConfig={{
                    queryApi: LegionsProTable.customColumnsConfig.queryApi,
                    editApi:LegionsProTable.customColumnsConfig.editApi,
                }}
                tableUid={this.freezeuid}
                onReady={(value) => {
                    this.customColumnsModalRef = value;
                }}
            ></LegionsProTableCustomColumns>}
        </Row>
    }
}
