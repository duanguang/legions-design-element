import React,{ Component } from 'react'
import ReactDOM from 'react-dom'
import { Table } from 'antd'
import throttle from 'lodash.throttle'
import LegionsProTable from '../LegionsProTable';
import {IProTableProps} from '../LegionsProTable/interface';
import {InstanceProTable,ITableColumnConfig} from '../LegionsProTable/interface'
import {
    compare,sort
} from 'legions-utils-tool/object.utils';
import { shortHash } from 'legions-lunar/object-hash'
import { observer,bind } from 'legions/store-react'
import {
    TableColumnConfig,
} from '../interface/antd';
import { ISchedule} from '../store/interface';
import LegionsProLineOverflow from '../LegionsProLineOverflow';
import { observable,runInAction } from 'mobx';
interface IState {
    startIndex: number;
    visibleRowCount: number;
    thresholdCount: number;
    rowHeight: number;
    topBlankHeight: number;
    bottomBlankHeight: number;
    maxTotalHeight: number;
    columns: (TableColumnConfig<{}> & ITableColumnConfig)[];
    data: any[];
}
interface IFillNode {
    height: number;
    marginTop?: number;
    marginBottom?: number;
    uid: string
}

/**
 * 应对展示大量数据时，对性能的优化,主要用于报表展示，
 * 请勿开启左右固定列设置,行高也请固定，否则会计算错误
 *
 * @class HlVirtualTable
 * @extends {Component<IHLTableProps, IState>}
 */
@observer
export default class LegionsProVirtualTable extends Component<IProTableProps,IState> {
    FillNode(options: IFillNode) {
        let { height,marginTop,marginBottom,uid } = options
        marginTop = marginTop || 0
        marginBottom = marginBottom || 0
        height = height || 0
        return (
            <div id={uid}><div style={{ height: `${height}px`,marginTop: `${marginTop}px`,marginBottom: `${marginBottom}px` }}></div></div>
        )
    }
    @observable total = 0
    @observable loading = false
    timeId = new Date().getTime()
    uid = `VirtualTable${shortHash(this.timeId)}`
    refScroll: Element = null
    listenEvent = null
    refTable: Element = null
    tabelRef: InstanceProTable = null
    refLeftTable: Element = null
    lastSlideUpHeight = 0;
    sameSlideHeightCount = 0;
    subscription: ISchedule = null;
    /* lodaMore = debounce(() => {
        const { data } = this.props
        this.handleScroll((data || []).length)
    },100) */
    constructor(props) {
        super(props)
        this.state = {
            startIndex: 0,
            visibleRowCount: 0,
            thresholdCount: 40,
            rowHeight: 0,
            topBlankHeight: 0,
            bottomBlankHeight: 0,
            maxTotalHeight: 15000000,
            columns: this.tranMapColumns(),
            data: this.props.dataSource,
        }
    }
    ticking = false; // rAF 触发锁
    tranMapColumns(columns: (TableColumnConfig<{}> & ITableColumnConfig)[] = this.props.columns) {
        return columns.map((item) => {
            let newItem = { sorter: true,key: item.dataIndex,...item };
            if (!item.render) {
                newItem = {
                    ...newItem,render: (text,record) => {
                        return <LegionsProLineOverflow width={item.width} text={record[item.dataIndex]}></LegionsProLineOverflow>
                    }
                }
            }
            return newItem;
        })
    }
    throttleWithRAF = (fn) => {
        let running = false;

        return () => {
            if (running) return;

            running = true;

            window.requestAnimationFrame(() => {
                // @ts-ignore
                fn.apply(this,arguments);

                running = false;
            });
        };
    }
    log = (n) => {
        if (this.tabelRef && this.props.autoQuery && this.tabelRef.localViewModel && this.tabelRef.localViewModel.obState.isPending) {
            runInAction(() => {
                this.loading = true;
            })
        }
        if (this.tabelRef && this.tabelRef.localViewModel && !this.tabelRef.localViewModel.obState.isPending && this.props.autoQuery && this.loading) {
            const data = this.props.autoQuery.transform(this.tabelRef.localViewModel.obState);
            if (data) {
                this.setState({ data: data.data,thresholdCount: 40 },() => {
                    this.refScroll.scrollTop = 0
                    console.log(data)
                    this.handleScroll(data.data.length)
                })
                runInAction(() => {
                    this.total = data.total
                    this.loading = false;
                })
            }

        }
    }
    componentWillMount() {
    }
    componentDidMount() {
        this.refScroll = ReactDOM.findDOMNode(this).getElementsByClassName('ant-table-body')[0]
        // this.refInnerScroll = ReactDOM.findDOMNode(this).getElementsByClassName('ant-table-body-inner')[0]
        this.listenEvent = throttle(this.handleScrollEvent,50)
        /* this.listenEvent =  this.throttleWithRAF(this.handleScrollEvent) */
        if (this.refScroll) {
            /* if (typeof window !== 'undefined' && 'requestAnimationFrame' in window) {
                this.refScroll.addEventListener('scroll',this.listenEvent,false)
            } */
            /* this.refScroll.addEventListener('scroll',this.listenEvent) */
            this.refScroll.addEventListener('scroll',this.listenEvent)
        }
        this.createTopFillNode()
        this.createBottomFillNode()
        // 初始化设置滚动条
        this.setRowHeight()
        this.handleScrollEvent()
        if (this.tabelRef && this.props.autoQuery && this.tabelRef.localViewModel) {
            if (this.props.autoQuery.isDefaultLoad === void 0 || this.props.autoQuery.isDefaultLoad) {
                this.tabelRef.methods.onSearch()
            }
            this.subscription = this.tabelRef.store.schedule([this.log.bind(this)])
        }
    }
    componentWillReceiveProps(nextProps) {
        const { data } = nextProps
        const { dataSource: tdataSource } = this.props
        if (data && data !== tdataSource && !this.props.autoQuery) {
            this.setState({ data: data,thresholdCount: 40 },() => {
                this.refScroll.scrollTop = 0
                this.handleScroll(data.length)
            })
        }
        if (this.props.columns !== nextProps.columns) {
            this.setState({ columns: this.tranMapColumns(nextProps.columns) })
        }
    }
    componentWillUpdate() {
    }
    componentDidUpdate() {
        this.setRowHeight()
    }
    componentWillUnmount() {
        if (this.refScroll) {
            this.refScroll.removeEventListener('scroll',this.listenEvent)
        }
        this.subscription && this.subscription.unsubscribe()
    }

    createTopFillNode() {
        if (this.refScroll) {
            const ele = document.getElementById(`${this.uid}topBlank`)
            this.refScroll.insertBefore(ele,this.refScroll.firstChild)
        }
    }

    createBottomFillNode() {
        if (this.refScroll) {
            const ele = document.getElementById(`${this.uid}bottomBlank`)
            this.refScroll.appendChild(ele)
        }
    }
    createLeftTopFillNode() {
        if (this.refScroll) {
            const ele = document.getElementById(`${this.uid}topBlank`)
            this.refScroll.insertBefore(ele,this.refScroll.firstChild)
        }
    }

    createLeftBottomFillNode() {
        if (this.refScroll) {
            const ele = document.getElementById(`${this.uid}bottomBlank`)
            this.refScroll.appendChild(ele)
        }
    }
    setRowHeight() {
        this.refTable = this.refScroll.getElementsByTagName('table')[0]
        if (this.refTable) {
            const rows = this.refTable['rows'];
            let rowHeight = 0
            if (rows.length) {
                const tr = rows[0]
                rowHeight = (tr && tr.clientHeight) || 0
            }
            if (this.state.rowHeight === 0 && this.state.rowHeight !== rowHeight) {
                // this.setState({rowHeight})
                // @ts-ignore
                this.state['rowHeight'] = rowHeight
            }
        }
    }

    handleScrollEvent = (even?) => {
        const { dataSource } = this.props
        this.handleScroll((this.props.autoQuery ? this.state.data : dataSource || []).length)
        /* this.lodaMore() */
        // this.ticking =false
    }

    handleScroll = (length) => {
        const { rowHeight,maxTotalHeight } = this.state
        if (rowHeight && length) {
            if (length) {
                const visibleHeight = this.refScroll.clientHeight // 显示的table body高度
                const scrollHeight = this.refScroll.scrollHeight;
                const scrollTop = this.refScroll.scrollTop // 滑动的距离
                this.handleBlankHeight(length,rowHeight,maxTotalHeight,visibleHeight,scrollTop)
            }
        } else {
            this.setRowHeight()
        }
    }

    getIndexByScrollTop(rowHeight: number,scrollTop: number) {
        const index = (scrollTop - scrollTop % rowHeight) / rowHeight
        return index
    }

    handleBlankHeight(length: number,rowHeight: number,maxTotalHeight: number,visibleHeight: number,scrollTop: number) {
        let oriRowHeight = rowHeight
        let totalHeight = length * rowHeight // 总高度 data * 行高度
        let isBigData = false
        if (totalHeight > maxTotalHeight) {
            isBigData = true
            totalHeight = maxTotalHeight
            rowHeight = totalHeight / length
            scrollTop = scrollTop > maxTotalHeight ? maxTotalHeight : scrollTop

        }
        if (length >= 10000) {
            isBigData = true
        }
        let topBlankHeight,bottomBlankHeight,startIndex,visibleRowCount
        startIndex = this.getIndexByScrollTop(rowHeight,scrollTop)

        visibleRowCount = Math.ceil(visibleHeight / oriRowHeight) // 计算固定高度所能显示的行数量 例如 300/31 10行
        topBlankHeight = rowHeight * startIndex
        topBlankHeight = this.getValidValue(topBlankHeight,0,totalHeight)
        bottomBlankHeight = totalHeight - topBlankHeight - visibleHeight
        bottomBlankHeight = bottomBlankHeight > 0 ? bottomBlankHeight : 0

        const slideUpHeight = Math.abs(topBlankHeight - this.state.topBlankHeight)

        const slideDownHeight = Math.abs(bottomBlankHeight - this.state.bottomBlankHeight)

        if (!this.lastSlideUpHeight) {
            this.sameSlideHeightCount = 0
            this.lastSlideUpHeight = slideUpHeight
        } else if (this.lastSlideUpHeight === slideUpHeight) {
            this.sameSlideHeightCount++
        } else {
            this.lastSlideUpHeight = slideUpHeight
            this.sameSlideHeightCount = 0
        }
        // console.log('===================')
        // console.log('oriRowHeight', oriRowHeight)
        // console.log('rowHeight', rowHeight)
        // console.log('totalHeight', totalHeight)
        // console.log('visibleHeight', visibleHeight)
        // console.log('scrollTop', scrollTop)
        // console.log('topBlankHeight', topBlankHeight)
        // console.log('bottomBlankHeight', bottomBlankHeight)
        // console.log('startIndex', startIndex)
        // console.log('visibleRowCount', visibleRowCount)
        // console.log('slideUpHeight', slideUpHeight)
        // console.log('slideDownHeight', slideDownHeight)
        // console.log('lastSlideUpHeight', this.lastSlideUpHeight)

        let isValid = slideUpHeight >= rowHeight
        isValid = isValid || slideDownHeight >= rowHeight
        isValid = isValid || startIndex === 0
        if (isValid) {
            startIndex = startIndex - 5
            visibleRowCount = visibleRowCount + 5
            this.setState({
                startIndex,
                visibleRowCount,
                topBlankHeight,
                bottomBlankHeight
            })
            if (isBigData && this.sameSlideHeightCount >= 1) { // 防止大数据持续滚动期间出现空白的问题
                this.refScroll.scrollTop = scrollTop
                this.sameSlideHeightCount = 0
                // console.log('set this.refScroll.scrollTop=', scrollTop)
            }
        }

    }

    checkValidIntervalTime(timeKey,interval = 100) {
        const cur = Date.now()
        if (!this[timeKey] || cur - this[timeKey] >= interval) {
            this[timeKey] = cur
            return true
        }
        return false
    }

    getValidValue(val,min = 0,max = 40) {
        if (val < min) {
            return min
        } else if (val > max) {
            return max
        }
        return val
    }
    onReady(value: InstanceProTable) {
        this.tabelRef = value;
        if (this.props.autoQuery) {
            this.tabelRef.methods.onSearch = (options?: {
                pageIndex?: number;
            }) => {
                if (options && options.pageIndex) {
                    value.viewModel.pageIndex = options.pageIndex;
                } else {
                    value.viewModel.pageIndex = 1;
                }
                value.localViewModel.dispatchRequest(this.props.autoQuery,Object.assign({
                    pageIndex: value.viewModel.pageIndex,
                    pageSize: value.viewModel.pageSize,
                },options))
            }
        }
        this.props.onReady && this.props.onReady(value)
    }
    getSorterFn = (sortOrder: string,sorter) => {
        return (a,b) => {
            const result = sorter(a,b);
            if (result !== 0) {
                return (sortOrder === 'descend') ? -result : result;
            }
            return 0;
        };
    }
    onPagingQuery = (pageIndex: number,pageSize: number,isChangePageSize?: boolean) => {
        this.props.onPagingQuery && this.props.onPagingQuery(pageIndex,pageSize,isChangePageSize)
        if (this.props.autoQuery && this.tabelRef) {
            this.tabelRef.methods.onSearch({ pageIndex })
        }
    }
    render() {
        const { autoQuery,...rest } = this.props;
        const { data } = this.state;
        const { topBlankHeight,bottomBlankHeight,startIndex,visibleRowCount,rowHeight,thresholdCount } = this.state
        const { length } = data || []
        let startCount = length - visibleRowCount
        startCount = startCount > 0 ? startCount : length
        let startIn = this.getValidValue(startIndex,0,startCount)
        let endIn = startIndex + visibleRowCount
        if (!endIn) { // 初始化渲染数据
            endIn = length > thresholdCount ? thresholdCount : length
        }
        endIn = this.getValidValue(endIn,startIndex,length)
        const dataSource = (data || []).slice(startIn,endIn)
        if (this.tabelRef) {
            this.tabelRef.viewModel._renderData = [...dataSource]
        }
        return (
            <div className={this.uid}>
                {this.FillNode({ height: topBlankHeight,uid: `${this.uid}topBlank` })}

                <LegionsProTable
                    {...rest}
                    loading={this.props.autoQuery ? this.loading : rest.loading}
                    total={this.props.autoQuery ? this.total : rest.total}
                    columns={this.state.columns}
                    displayType="bigData"
                    onPagingQuery={this.onPagingQuery}
                    onReady={this.onReady.bind(this)}
                    pageSizeOptions={['100','500','1000','2000','3000','5000','10000']}
                    dataSource={this.props.autoQuery ? this.state.data : this.props.dataSource}
                    //@ts-ignore
                    onChange={(pagination,filters,sorter: { column: { sorter: boolean | ((a: any,b: any) => number) }; columnKey: string; field: string; order: "ascend" | "descend" }) => {
                        if (sorter.column && sorter.column.sorter && typeof sorter.column.sorter === 'boolean') {
                            const sorterFn = this.getSorterFn(sorter.order,(a,b) => {
                                return compare(a[sorter.columnKey],b[sorter.columnKey]);
                            });
                            const data = this.state.data;
                            this.setState({
                                data: data.sort(sorterFn)
                            })
                        }
                    }}
                ></LegionsProTable>
                {this.FillNode({ height: bottomBlankHeight,uid: `${this.uid}bottomBlank` })}
            </div>
        )
    }
}

