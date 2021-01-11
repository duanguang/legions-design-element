import React from 'react';
import ReactDOM from 'react-dom'
import { Table,Row,Col,Button,Icon,Input,message,Menu,Dropdown } from 'antd';
import './style/index.less';
import { TableColumnConfig,TableProps,TableRowSelection } from 'antd/lib/table/Table';
import { observer,bind } from 'legions/store-react';
import {ProTableStore} from '../store/pro.table';
import { IViewModelProTableStore,ILocalViewModelProTableStore,ITableAutoQuery } from '../store/pro.table/interface';
import {
    compare,
} from 'legions-utils-tool/object.utils';
import { warning,warningOnce } from 'legions-utils-tool';
import { shortHash } from 'legions-lunar/object-hash'
import { findDOMNode,unstable_renderSubtreeIntoContainer,unmountComponentAtNode } from 'react-dom'
import { debounce } from 'legions-utils-tool/debounce'
import {
    SelectionDecorator,
    PaginationProps
} from '../interface/antd';
import { ITableColumnConfig,IExportCsv, IProTableProps } from './interface';
import {ISchedule} from '../store/interface'
import moment from 'moment';
import LegionsProTableCustomColumns from '../LegionsProTableCustomColumns';
import LegionsProLineOverflow from '../LegionsProLineOverflow';
import throttle from 'lodash.throttle';
/* import {OpenModal,OpenConfirm } from 'legions-lunar/antd-toolkit'; */
import LegionsProModal  from '../LegionsProModal';
import { InstanceLegionsProModal } from '../LegionsProModal/interface';
import { observable,runInAction,toJS,isObservable } from 'mobx'
import { observableViewModel } from 'legions/store-utils'
import { legionsThirdpartyPlugin } from 'legions-thirdparty-plugin';
import { legionsPlugins,LoggerManager } from 'legions-lunar/legion.plugin.sdk';
import { cloneDeep } from 'lodash';
import { InstanceProTable } from './interface';
const serialize = require('serialize-javascript');
const baseCls = `legions-pro-table`



interface IState {

    /**
         * 指定选中项的 key 数组
         *
         * @type {string[]}
         * @memberof IState
         */
    selectedRowKeys: string[],
    taskName?: string
}

/* class Calculate{
     @observable  test=1

     @observable.ref userlist =[]
     @observable title={a:1}
    @computed
    get usersCount() {
        return this.userlist.length
    }
} */
class ViewUI {
    @observable taskName = ''
}
const errorMessage = {
    uniqueKey: 'Each record in table should have a unique `uniqueKey` prop,' + 'or set `uniqueKey` to an unique primary key.',
    Repeat: 'uniqueKey[接口数据作为唯一字段不可靠，建议前端自己生成唯一字段。开发环境检测，如果用的接口数据字段作为唯一值，也请确保绝对唯一]:存在相同数据,请认真检查数据是否绝对唯一，否则会引发部分功能异常'
}
@bind({ store: ProTableStore })
@observer
export default class LegionsProTable<TableRow = {},Model = {}> extends React.Component<IProTableProps<TableRow,Model>,IState>{
    timeId = new Date().getTime()
    uid = ''
    /**
     * uid 的值绝对唯一，且每次初始生成表单都是相同值
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
    viewUI = observableViewModel<ViewUI>(new ViewUI());
    modalRef: InstanceLegionsProModal = null;
    customColumnsModalRef: InstanceLegionsProModal = null;
    selections: SelectionDecorator[] = [];
    /** 全链路监控跟踪id */
    traceId: string = '';
    log = (uid) => {
        if (this.getLocalViewStore && this.props.autoQuery && this.getLocalViewStore.obState.isPending) {
            this.getLocalViewStore.loading = true;
        }
        if (this.getLocalViewStore && !this.getLocalViewStore.obState.isPending && this.props.autoQuery && this.getLocalViewStore.loading) {
            runInAction(() => {
                const data = this.props.autoQuery.transform(this.getLocalViewStore.obState);
                if (data) {
                    this.props.store.HlTableContainer.get(uid).renderData = data.data.slice();
                    this.props.store.HlTableContainer.get(uid).setTotal(data.total)
                    /* this.forceUpdate&&this.forceUpdate() */
                }
                this.getLocalViewStore.loading = false;
            })
            this.consoleLog('hlTable-watchData',{ uid });
            this.logger('hlTable-watchData',{
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
    /* lodaMore = debounce(() => {
        const end = this.getViewStore.flag + 100;
        const data = this.props.data.slice(this.getViewStore.flag,end);
        if (data.length) {
            data.map((item) => {
                const index = this.getViewStore.renderData.findIndex((entity) => entity[this.props.uniqueKey] === item[this.props.uniqueKey])
                if (index < 0) {
                    this.getViewStore.renderData.push(item);
                }
            })
            this.getViewStore.renderData = [... this.getViewStore.renderData]
            this.getViewStore.flag = end;
        }
    },500) */
    /* viewTodo=observableViewModel<Calculate>(new Calculate()) */
    /* lodaMore = debounce((mode: 'next' | 'pre') => {
        const totalPage = parseInt(((this.props.total + this.viewModel.pageSize - 1) / this.viewModel.pageSize).toString())
        if (mode === 'next') {
            if (this.viewModel.pageIndex < totalPage) {
                this.viewModel.pageIndex = this.viewModel.pageIndex + 1;
                this.props.onPagingQuery && this.props.onPagingQuery(this.viewModel.pageIndex,this.viewModel.pageSize,false);
            }
        }
        if (mode === 'pre') {
            if (this.viewModel.pageIndex > 1 && this.viewModel.pageIndex <= totalPage) {
                this.viewModel.pageIndex = this.viewModel.pageIndex - 1;
                this.props.onPagingQuery && this.props.onPagingQuery(this.viewModel.pageIndex,this.viewModel.pageSize,false);
            }
        }

    },500) */
    static defaultProps = {
        rowSelectionClickType: 'radio',
        isOpenRowSelection: true,
        type: 'checkbox',
        data: [],
        total: 0,
        loading: false,
        displayType: 'smallData',
        isOpenCustomColumns: true,
        pageSizeOptions: ['5','10','20','40','60','80','100','200','500'],
    }
    constructor(props) {
        super(props)
        this.state = {
            selectedRowKeys: [],
            taskName: '',
        };
        this.uid = `table${this.props.store.HlTableContainer.size}${shortHash(`${this.timeId}${this.props.store.HlTableContainer.size}`)}`
        if (this.props.store.HlTableContainer.has(this.freezeuid)) {
            this.timeId = new Date().getTime()
            this.uid = `table${this.props.store.HlTableContainer.size}${shortHash(`${this.timeId}${this.props.store.HlTableContainer.size}`)}`
        }
        this.traceId = this.uid;
        this.freezeuid = this.uid;
        this.tableThead = `table-thead${this.uid}`
        if (this.props['uniqueUid']) {
            this.decryptionfreezeuid = `${this.props['uniqueUid']}`
            this.freezeuid = shortHash(this.decryptionfreezeuid)
            this.props.store.add(this.freezeuid,this.props.tableModulesName,this.uid)
            if (!this.props.store.HlTableLocalStateContainer.has(this.freezeuid)) {
                this.props.store._addLocalState(this.freezeuid)
            }
            if (this.props.autoQuery && this.getLocalViewStore && (this.props.autoQuery.isDefaultLoad === void 0 || this.props.autoQuery.isDefaultLoad)) {
                this.getLocalViewStore.dispatchRequest(this.props.autoQuery,{
                    pageIndex: this.getViewStore.pageIndex,
                    pageSize: this.getViewStore.pageSize,
                })
            }
        }
        if (!this.props.store.HlTableContainer.has(this.freezeuid)) {
            this.props.store.add(this.freezeuid,this.props.tableModulesName,this.uid)
        }
        this.consoleLog('hlTable-constructor');
    }
    get getViewStore() {
        return this.props.store.HlTableContainer.get(this.freezeuid)
    }
    get getLocalViewStore() {
        return this.props.store.HlTableLocalStateContainer.get(this.freezeuid)
    }
    consoleLog(type: Parameters<typeof LoggerManager['report']>[0]['type'],logObj?: Object) {
        const obj = logObj || {}
        const logConent = {
            storeView: { ...this.getViewStore },
            ...obj,
            store: this.props.store,
            that: toJS(this),
            props: toJS(this.props),
        }
        LoggerManager.consoleLog({
            type,
            logConent,
            methodsName: 'onHLTableCycle',
        })

    }
    logger(type: Parameters<LegionsProTable['consoleLog']>[0],logObj?: Object) {
        if (typeof this.props.onLogRecord === 'function') {
            const obj = logObj || {}
            const viewStoreKeys = ['calculateBody','bodyContainerHeight',
                'bodyExternalHeight','computedRenderColumns','_tableContainerWidth','renderData','tableBodyDomClientHeight','tableXAutoWidth']
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
                /* props: cloneDeep(toJS(props)), */
            }
            LoggerManager.report({
                type,
                content: serialize(logConent,{ ignoreFunction: false }),
                traceId: this.traceId,
                modulesName: this.props.tableModulesName,
                modulesPath: this.props['uniqueUid'],
            },this.props.onLogRecord)
        }

    }
    search(options?: {
        pageIndex?: number;
    }) {
        if (this.props.autoQuery && this.getLocalViewStore) {
            if (options && options.pageIndex) { /** 如果主动设置页码，则以主动设置为准 */
                this.getViewStore.pageIndex = options.pageIndex;
            } else {
                this.getViewStore.pageIndex = 1;
            }
            this.setState({
                selectedRowKeys: [],/**  切换页大小 初始化行选择数据*/
            },() => {
                this.getViewStore.selectedRows = [];
                this.getLocalViewStore.dispatchRequest(this.props.autoQuery,Object.assign({
                    pageIndex: this.getViewStore.pageIndex,
                    pageSize: this.getViewStore.pageSize,
                },options))
            })

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
                datas = this.props.data
            } else {
                datas = this.viewModel.renderData.map((item) => {
                    return item
                });
            }
        }
        let newColumns = columns.filter((item) => { return item.isExport !== false });
        /* exportCsv({
            ...prams,
            filename: prams.filename,
            columns: newColumns,
            data: datas,
        }) */
        /* const newArr = [];
        datas.map((item) => {
            let dataItem = {}
            for(let key in item){
                const newItem = newColumns.filter((entity) => entity['dataIndex'] === key)
                if (newItem&&newItem.length) {
                    dataItem[newItem[0]['title']] = item[key]
                }
            }
            if (dataItem) {
              newArr.push(dataItem)
            }
        }) */
        legionsThirdpartyPlugin.plugins.excel.exportJsonToExcel({ data: datas,columns: newColumns,filename: prams.filename,autoWidth: true })

        // @ts-ignore
        // excel.export_json_to_excel({data:newArr,key:newColumns.map((item)=>item['title']),filename:prams.filename,autoWidth:true})
    }
    //@ts-ignore
    tranMapColumns(columns: (TableColumnConfig<{}> & ITableColumnConfig)[] = this.props.columns) {
        /* return columns.map((item) => {
            let newItem = { key: item.dataIndex, ...item };
            if (!item.render) {
                newItem = {
                    ...newItem, render: (text, record) => {
                        return <HlLineOverflow width={item.width} text={record[item.dataIndex]}></HlLineOverflow>
                    }
                }
            }
            return newItem;
        }) */
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
            div.setAttribute('class','hlTable-header-inner');
            ele.firstElementChild.insertBefore(div,ele.firstElementChild.firstElementChild)
        }
    }
    initPagination() {
        const paginationProps: PaginationProps | boolean = this.props.pagination
        const store = this.props.store.HlTableContainer.get(this.freezeuid)
        if ((typeof paginationProps === 'boolean')) {
            store.pagination = paginationProps
        }
        else if (this.props.autoQuery) {
            store.pagination = true
        }
        else if (this.props.onPagingQuery && paginationProps === void 0) {
            store.pagination = true;
        }
        else if (!this.props.onPagingQuery && paginationProps === void 0) {
            store.pagination = false;
        }

    }
    componentWillMount() {
        const store = this.props.store.HlTableContainer.get(this.freezeuid)
        store.pageIndex = 1
        store.pageSize = this.props.pageSize || store.pageSize
        this.initPagination()
        if ((typeof this.props.isOpenRowChange === 'boolean' && !this.props.isOpenRowChange)) {
            store.isOpenRowChange = false
        }
        if (!this.props.onRowChange && this.props.isOpenRowChange === void 0) { /** 历史问题， 当行选择函数没有传递时，表示关闭行选择 */
            store.isOpenRowChange = false;
            console.log(store.isOpenRowChange);
        }
        if ((typeof this.props.isOpenRowSelection === 'boolean' && !this.props.isOpenRowSelection)) {
            store.isOpenRowSelection = false
        }
        if (!this.props.onRowChange && this.props.isOpenRowSelection === void 0) {
            store.isOpenRowSelection = false;
        }
        this.viewModel = store;
        this.viewModel.scroll = this.props.scroll;
        this.viewModel.bodyStyle = Object.assign({},this.props.bodyStyle)
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
                //@ts-ignore
                onSearch: (options?: {
                    pageIndex: number;
                    pageSize: number;
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
        if (this.props.autoQuery) {
            this.subscription = this.props.store.schedule([this.log.bind(this,this.freezeuid)])
        }
        this.consoleLog('hlTable-componentWillMount')
        /* this.subscription.unsubscribe() */
    }
    destroyPortal() {
        5
        if (this.node) {
            unmountComponentAtNode(this.node);
        }
    }
    componentWillUnmount() {
        /* this.props.store.delete(this.freezeuid); */
        if (this.props.tableModulesName) {
            this.props.store.deleteTableModules(this.props.tableModulesName)
        }
        window.removeEventListener && window.removeEventListener('resize',this.resize.bind(this))
        this.subscription && this.subscription.unsubscribe()
        this.destroyPortal()
        this.consoleLog('hlTable-componentWillUnmount')
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
        if (this.props.tableModulesName && this.props.isOpenCustomColumns) {
            this.viewModel.setLocalStorageShowColumnsKeys(this.props.tableModulesName)
            await this.viewModel.queryTableColumns(this.viewModel.computedStorageShowColumnsKeys,this.props.customColumnsConfig.queryApi)
            if (!this.viewModel.obTableListCustom.result || (this.viewModel.obTableListCustom.result && this.viewModel.obTableListCustom.result.customColumns.length === 0)) {
                this.getViewStore.filterColumns();
                const body = this.viewModel.computedShowColumns.map((item) => {
                    return { dataIndex: item.dataIndex,title: item.title }
                })
                if (body.length) {
                    await this.viewModel.editTableColumns(this.viewModel.computedStorageShowColumnsKeys,body,this.props.customColumnsConfig.editApi)
                }
            }
            if (this.props.isOpenCustomColumns) {
                this.selections.push({
                    key: 'custom-columns',
                    text: this.renderButtonCusttomColumns(),
                    onSelect: (changeableRowKeys) => {
                    },
                })
            }
            this.getViewStore.filterColumns();
        }
        if (this.props.visibleExportLoacl) {
            this.selections.push({
                key: 'export-excel',
                text: <Button size="small" >导出当页<Icon type="download" /></Button>,
                onSelect: (changeableRowKeys) => {
                    this.exportCsv({ filename: `${moment().format('YYYYMMDDHHmmss')}-${this.viewModel.pageIndex}` })
                },
            })
        }
        if (this.props.onExportAll) { // 兼容历史问题，之前是onExportAll 传入此方法开启导出当页和全部，现在需要导出当页分开控制
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
            this.selections.push({
                key: 'export-all-excel',
                text: <Button size="small" >导出全部<Icon type="download" /></Button>,
                onSelect: (changeableRowKeys) => {
                    /* OpenConfirm({
                        title:'导出数据',
                        content:(((taskName:string) => <Input value={taskName} onChange={(value) => {
                             this.setState({taskName:value.target.value})
                             
                        }}></Input>)(this.state.taskName))
                    }) */
                    this.modalRef.viewModel.title = '导出数据'
                    this.modalRef.viewModel.visible = true;
                    //this.props.onExportAll(this.viewModel.computedStorageShowColumnsKeys);

                },
            })
        }
        window.addEventListener && window.addEventListener('resize',this.resize.bind(this))
        if (findDOMNode(this).getElementsByClassName('ant-table-body')) {
            /* const refScroll = findDOMNode(this).getElementsByClassName('ant-table-body')[0];
            this.props.scroll && refScroll.addEventListener('scroll',(even) => {

                // @ts-ignore
                const scrollHeight = even.target.scrollHeight;
                // @ts-ignore
                const scrollTop = even.target.scrollTop;
                // @ts-ignore
                const offsetHeight = even.target.offsetHeight;
                if (this.props.data.length === this.viewModel.renderData.length&&this.props.displayType==='smallData'&&this.props.onPagingQuery) {
                    if ((offsetHeight >= (scrollHeight - scrollTop))&&scrollTop) { // 滚动到底部
                       this.lodaMore('next');
                    }
                    if(scrollTop===0&&offsetHeight&&scrollHeight){
                        this.lodaMore('pre');

                    }
                }
            }) */
        }
        this.setTableContainerWidth();
        const data = this.props.data;
        if (this.props.autoQuery) {
            // @ts-ignore
            data = this.getLocalViewStore.obData;
        }
        if (data) {
            /* this.getViewStore.renderData = this.props.data.map((item,index) => {
                return {...item,uniqueKey:`${this.viewModel.pageIndex}${index+1}`}
            }) */
            if (this.props.displayType === 'smallData') {
                /* this.getViewStore.renderData = [...this.props.data] */
                this.getViewStore.renderData = [...data]
                this.getViewStore.setTotal(this.props.total || 0)
            }
            if (this.getViewStore.renderData.length) {
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
                const RootContainer = this.getViewStore.isOpenRowSelection && this.props.type === 'checkbox' ? '.ant-table-selection-down' : 'span'
                const spanth = thead.querySelector('th').querySelector(RootContainer);
                if (spanth) {
                    spanth.appendChild(this.node)
                    this.renderPortal();
                }
            }
        }
        this.consoleLog('hlTable-componentDidMount');
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
                {(this.props.isOpenCustomColumns && this.props.tableModulesName) && <Menu.Item key="3">{this.renderButtonCusttomColumns()}</Menu.Item>}
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
        this.consoleLog('hlTable-componentDidUpdate')
    }
    //@ts-ignore
    componentWillReceiveProps(nextProps: IProTableProps) {
        if (this.props.selectedRowKeys && this.props.selectedRowKeys !== nextProps.selectedRowKeys) {
            let data = []
            if (this.props.autoQuery && this.props.displayType === 'smallData') {
                data = (this.getViewStore.renderData && this.getViewStore.renderData.length) ? this.getViewStore.renderData : [];
            }
            else {
                data = (nextProps.data && nextProps.data.length) ? nextProps.data : []
            }
            // @ts-ignore
            let newSelectedRows = data.filter(v => nextProps.selectedRowKeys.includes(v[this.props.uniqueKey]))
            let newSelectedRowKeys = newSelectedRows.map((item) => item[this.props.uniqueKey])
            const selectedRowKeys = [...newSelectedRowKeys]
            this.setState({ selectedRowKeys })
        }
        if (this.props.scroll && !this.deepComparisonObject(this.props.scroll,nextProps.scroll)) {
            this.viewModel.scroll = nextProps.scroll
        }
        if (this.props.bodyStyle && !this.deepComparisonObject(this.props.bodyStyle,nextProps.bodyStyle)) {
            this.viewModel.bodyStyle = nextProps.bodyStyle
        }
        if (nextProps.data !== this.props.data && nextProps.data && !this.props.autoQuery) {
            /* this.getViewStore.renderData = nextProps.data.map((item,index) => {
                return {...item,uniqueKey:`${this.viewModel.pageIndex}${index+1}`}
            }) */
            /**  主要解决当渲染数据和传入数据不一致时，无需通过传入数据值来刷新渲染数据 */
            if (this.props.displayType === 'smallData') {
                this.getViewStore.renderData = [...this.props.autoQuery ? [] : nextProps.data]
            }
            if (this.getViewStore.renderData.length) {
                const UniqueKey = this.isHasUniqueKeyData()
                const Repeat = this.isChkRepeatUniqueKeyData()
                warningOnce(UniqueKey,errorMessage.uniqueKey)
                warningOnce(!Repeat,errorMessage.Repeat)
            }
        }
        /* if (nextProps.total !== this.props.total&&!this.props.autoQuery) {
           this.getViewStore.setTotal(nextProps.total)
        } */
        if (this.props.columns !== nextProps.columns) {
            this.getViewStore.columns = this.tranMapColumns(nextProps.columns);
        }
        this.consoleLog('hlTable-componentWillReceiveProps');
        /* if (this.props.total !== nextProps.total) {
            console.log(this.props.total, nextProps.total)
            const totalPage = parseInt(((nextProps.total + this.viewModel.pageSize - 1) / this.viewModel.pageSize).toString());
            if (this.viewModel.pageIndex > totalPage) {
                this.viewModel.pageIndex = totalPage
            }
        } */
        /* if(this.props.pageIndex!==nextProps.pageIndex){ 暂时取消
            this.setState({pageIndex:nextProps.pageIndex})
        } */

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
        const result = this.viewModel.renderData.every((item) => this.props.uniqueKey in item);
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
        for (var i = 0; i < this.viewModel.renderData.length; i++) {
            if (this.viewModel.renderData[i][this.props.uniqueKey] in obj) {
                isSame = true;
                break;
            } else {
                obj[this.viewModel.renderData[i][this.props.uniqueKey]] = this.viewModel.renderData[i][this.props.uniqueKey];
            }
        }
        return isSame
    }
    onSelectChange = (selectedRowKeys,selectedRows) => {
        let dataleng = this.props.data ? this.props.data.length : 0;
        if (this.props.autoQuery) {
            dataleng = this.getViewStore.renderData.length
        }
        if (this.getViewStore.renderData.length === dataleng) {
            this.setState({ selectedRowKeys },() => {
                this.props.store.get(this.freezeuid).selectedRows = selectedRows
                this.props.onRowChange && this.props.onRowChange(selectedRows)
            });
        }
    }
    onRowClick(record,index,event) {
        if (this.getViewStore.isOpenRowChange) {
            this.selectRow(record)
            this.props.onRowClick && this.props.onRowClick(record,index,event)
        }
    }
    onRowClassName(record,index): string {
        const RowIndex = this.state.selectedRowKeys.findIndex((item) => item === record[this.props.uniqueKey]);
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
        let selectedRows = [...this.props.store.get(this.freezeuid).selectedRows];
        let selectedRowKeys = [...this.state.selectedRowKeys]
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
        this.setState({ selectedRowKeys });
        this.props.store.get(this.freezeuid).selectedRows = selectedRows
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
            else if (this.getLocalViewStore && this.getLocalViewStore.obState.isResolved && this.getViewStore.renderData.length === 0) {
                if (!this.getLocalViewStore.obState.value.success && this.getLocalViewStore.obState.value.message) {
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
        const { selectedRowKeys } = this.state
        const store = this.props.store.get(this.freezeuid)
        const alreadyRowsLen = store.selectedRows.length
        const { onRowChange } = this.props
        let locale = null
        if (this.props.autoQuery) {
            locale = {
                locale: this.renderlocale(),
            }
        }
        this.consoleLog('hlTable-render');
        //@ts-ignore
        const rowSelection: TableRowSelection<{}> = (this.getViewStore.isOpenRowSelection) && {
            ...this.props.rowSelection,
            selectedRowKeys,
            hideDefaultSelections: true,
            type: this.props.type,
            selections: this.selections as SelectionDecorator[],
            onChange: this.onSelectChange.bind(this),
            onSelectAll: (selected,selectedRows,changeRows) => {
                if (this.getViewStore.renderData.length <= this.props.data.length) { // 主要用于大数据table 性能问题，每次只加载部分数据，这时全选时自动选择全部数据
                    if (selected) {
                        const newData = this.props.data.filter((item) => {
                            const getCheckboxPropsItem = this.getCheckboxPropsItem(item)
                            return ((!getCheckboxPropsItem || (getCheckboxPropsItem && !getCheckboxPropsItem['disabled'])))
                        })
                        const selectedRowKey = newData.map((item) => item[this.props.uniqueKey])
                        this.setState({ selectedRowKeys: selectedRowKey },() => {
                            const data = [...newData]
                            this.getViewStore.selectedRows = data
                            this.props.onRowChange && this.props.onRowChange(this.getViewStore.selectedRows)
                        });
                    }
                    else {
                        this.setState({ selectedRowKeys: [] },() => {
                            this.getViewStore.selectedRows = []
                            this.props.onRowChange && this.props.onRowChange(this.getViewStore.selectedRows)
                        });
                    }
                }
            },
            onSelectInvert: () => {
                this.setState({ selectedRowKeys: [] },() => {
                    this.getViewStore.selectedRows = []
                })
            },
        };
        const paginationProps: PaginationProps | boolean = this.props.pagination
        const pagination: PaginationProps | boolean = {
            pageSizeOptions: this.props.pageSizeOptions,
            /* total: this.props.total, */
            total: this.props.autoQuery ? this.getViewStore.computedTotal : this.props.total,
            current: store.pageIndex,
            showQuickJumper: true,
            pageSize: store.pageSize,
            showSizeChanger: true,
            size: (paginationProps && typeof paginationProps === 'object') ? paginationProps.size : '',
            onChange: (pageIndex,pageSize) => {
                this.setState({
                    selectedRowKeys: [],/**  切换页码 初始化行选择数据*/
                })
                this.props.store.get(this.freezeuid).pageIndex = pageIndex
                this.props.store.get(this.freezeuid).pageSize = pageSize
                this.props.store.get(this.freezeuid).selectedRows = []
                this.props.onPagingQuery && this.props.onPagingQuery(pageIndex,pageSize,false)
                if (this.props.autoQuery && this.getLocalViewStore) {
                    this.getLocalViewStore.dispatchRequest(this.props.autoQuery,{
                        pageIndex,
                        pageSize,
                    })
                }
            },
            onShowSizeChange: (current: number,pageSize) => {
                this.setState({
                    selectedRowKeys: [],/**  切换页大小 初始化行选择数据*/
                })
                this.props.store.get(this.freezeuid).pageIndex = current
                this.props.store.get(this.freezeuid).pageSize = pageSize
                this.props.store.get(this.freezeuid).selectedRows = []
                this.props.onPagingQuery && this.props.onPagingQuery(current,pageSize,true)
                if (this.props.autoQuery && this.getLocalViewStore) {
                    this.getLocalViewStore.dispatchRequest(this.props.autoQuery,{
                        pageIndex: current,
                        pageSize,
                    })
                }
            },
            showTotal: total => `${alreadyRowsLen > 0 ? `已选择${alreadyRowsLen}条数据` : ''} 共 ${total} 条数据`
        }
        /* console.log(this.getViewStore.renderData) */
        /* const bodyStyle = (this.viewModel.isAdaptiveHeight && this.getViewStore.renderData && this.getViewStore.renderData.length > 0) ? { ...this.viewModel.bodyStyle,...this.viewModel.calculateBody } : this.viewModel.bodyStyle */
        const bodyStyle = (this.viewModel.isAdaptiveHeight && this.getViewStore.renderData && this.getViewStore.renderData.length > 0) ? { ...this.viewModel.bodyStyle,...this.viewModel.calculateBody } : this.viewModel.bodyStyle
        return <Row className={baseCls}>
            <Col>
                <div className={`containers ${this.uid} ${this.viewModel.isAdaptiveHeight ? 'adaptiveHeight' : ''}`}>
                    <Table
                        /* size="small" */
                        {...locale}
                        {...this.props}
                        scroll={this.viewModel.scroll}
                        columns={this.viewModel.computedRenderColumns}
                        bordered
                        bodyStyle={bodyStyle}
                        rowClassName={this.onRowClassName.bind(this)}
                        pagination={(this.getViewStore.pagination) ? pagination : false}
                        loading={{ tip: 'loading',spinning: this.props.autoQuery ? this.getLocalViewStore.loading : this.props.loading }}
                        rowKey={this.props.uniqueKey}
                        // locale={{emptyText:<span>2222</span>}}
                        onRowClick={this.onRowClick.bind(this)}
                        rowSelection={rowSelection}
                        dataSource={[...this.getViewStore.renderData]}
                        onChange={(pagination,filters,sorter: { column: { sorter: boolean | ((a: any,b: any) => number) }; columnKey: string; field: string; order: "ascend" | "descend" }) => {
                            if (sorter.column && sorter.column.sorter && typeof sorter.column.sorter === 'boolean' && this.props.displayType === 'smallData') {
                                const sorterFn = this.getSorterFn(sorter.order,(a,b) => {
                                    return compare(a[sorter.columnKey],b[sorter.columnKey]);
                                });
                                const data = this.viewModel.renderData.map((item) => { return item });
                                this.viewModel.renderData = [...data.sort(sorterFn)]
                            }
                            this.props.onChange && this.props.onChange(pagination,filters,sorter)
                        }}
                    />
                </div>
            </Col>
            <LegionsProModal
                onOk={() => {
                    if (!this.viewUI.taskName) {
                        message.warning('请输入任务名称')
                        return;
                    }
                    this.props.onExportAll && this.props.onExportAll(this.props.tableModulesName,this.viewUI.taskName)
                    this.modalRef.viewModel.visible = false;
                }}
                onReady={(value) => {
                    this.modalRef = value;
                }}>
                <Input value={this.viewUI.taskName} placeholder="请输入任务名称" onChange={(value) => {
                    this.viewUI.taskName = value.target.value
                }}></Input>
            </LegionsProModal>
            {this.props.isOpenCustomColumns && <LegionsProTableCustomColumns
                customColumnsConfig={this.props.customColumnsConfig}
                tableUid={this.freezeuid}
                onReady={(value) => {
                    this.customColumnsModalRef = value;
                }}
            ></LegionsProTableCustomColumns>}
        </Row>
    }
}
