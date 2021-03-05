import React, { Component } from 'react'
import { Button, Row, Col, Card, Tooltip, message, Icon } from 'antd';
import LegionsProModal from  '../LegionsProModal';
import { InstanceProModal} from '../LegionsProModal/interface'
import LegionsStoreTable from '../LegionsStoreTable';
import { observer, bind } from 'legions/store-react'
import LegionsProDragger from '../LegionsProDragger';
import styles from './style/index.modules.less';
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
    onReady?: (instance: InstanceProModal) => void;
    /** 本地数据同步到服务端的接口 */
    
    customColumnsConfig: {
        /** 编辑自定义信息同步到服务端接口地址 */
        editApi: string;
        /** 从服务端查询自定义列信息接口地址 */
        queryApi: string;
    }
}
interface IState {
    columns?: { dataIndex: string; title: string }[]
}
@bind({ store: LegionsStoreTable })
@observer
export default class LegionsProTableCustomColumns extends Component<IProps, IState> {
    modalRef: InstanceProModal = null
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    componentDidMount(){
        document.body.ondrop = function (event) { // 禁用火狐拖拽自动打开新页签事件行为
            event.preventDefault();
            event.stopPropagation();
        }
    }
    get viewStore() {
        return this.props.store.get(this.props.tableUid)
    }
    render() {
        return (
            <div style={{ display: 'block' }}>
                <LegionsProModal
                    footer={null}
                    onReady={(value) => {
                        this.modalRef = value
                        this.modalRef.viewModel.width = 960
                        this.props.onReady&&this.props.onReady(value)
                    }}>
                    <Row>
                        <Col span={11}>
                            <Card style={{
                                width: '100%',
                                minHeight: '300px',
                                maxHeight: '500px',
                                overflow: 'scroll',
                            }} title={(<p>全部列<span style={{ color: 'red' }}>*需要显示的列拖动到右侧</span></p>)}>
                                {this.viewStore && <LegionsProDragger
                                    style={{ width: '100%', minHeight: '200px' }}
                                    options={{
                                        animation: 150,
                                        group: {
                                            name: 'shared',
                                            pull: true,
                                            put: true,
                                        },
                                        filter: `.disabled`,
                                        /* filter:`.${this.viewStore.computedStorageShowColumnsKeys}disabled`, */
                                        store: {
                                            /**
                                             * Get the order of elements. Called once during initialization.
                                             * @param   {Sortable}  sortable
                                             * @returns {Array}
                                             */
                                            get: (sortable) => {
                                                // const order = localStorage.getItem(sortable.options.group.name);
                                                /* const order = localStorage.getItem(this.viewStore.computedStorageShowColumnsKeys); */
                                                return this.viewStore._getLocalStorageShowColumns()
                                            },

                                            /**
                                             * Save the order of elements. Called onEnd (when the item is dropped).
                                             * @param {Sortable}  sortable
                                             */
                                            set: (sortable) => {
                                                // 从显示列往全部列拖动时触发
                                                /* let order = sortable.toArray(); */
                                                // localStorage.setItem(sortable.options.group.name,order.join('|'));
                                                this.viewStore._setLocalStorageShowColumns(this.props.customColumnsConfig.editApi)
                                            }
                                        }
                                    }}
                                    onChange={(items) => {
                                        /** 右侧区域在移动时不需要变化 ，则不执行任何数据处理*/
                                        if (this.viewStore.computedShowColumns.length === items.length) { // 表示在当前区域做排序处理
                                            // this.viewStore.orderSortLeftShowColumns(items)
                                        }
                                        else {
                                            // this.viewStore.moveLeftShowColumns(items)
                                        }
                                    }}
                                >
                                    {this.viewStore.computedUnShowColumns.map((item) => {
                                        const index = this.viewStore.computedShowColumns.findIndex((m) => m.dataIndex === item.dataIndex)
                                        /* const className = `${this.viewStore.computedStorageShowColumnsKeys}disabled` */
                                        const className = `disabled`
                                        return <Col style={{ marginBottom: '15px' }} className={index > -1 ? className : ''} span={8} data-id={item.dataIndex} key={item.dataIndex}>
                                           {/*  <Button type={index > -1 ? 'dashed' : 'primary'} style={{ width: '98%', height: '35px', paddingLeft: '2px', paddingRight: '2px' }}>
                                                <span style={{ display: 'block', whiteSpace: 'normal' }}>
                                                    {item.title}
                                                </span>
                                            </Button> */}

                                            <div className={`${styles.hlTableColumnsCol} ${index > -1 ? `${styles.hlTableColumnsColColor} ${styles.hlTableColumnsColCursor1}`:styles.hlTableColumnsColColorBlue}`}>
                                                <span style={{ display: 'inline-block', whiteSpace: 'normal',verticalAlign:'middle',lineHeight:'15px' }}>
                                                    {item.title}
                                                </span>
                                               
                                            </div>
                                        </Col>
                                    })}
                                </LegionsProDragger>
                                }
                            </Card>
                        </Col>
                        <Col span={12} style={{ marginLeft: '15px' }}>
                            <Card style={{
                                width: '100%',
                                minHeight: '300px',
                                maxHeight: '500px',
                                overflow: 'scroll',
                            }} title={(<p>显示列<span style={{ color: 'red' }}>*需要隐藏的列拖动到左侧</span></p>)}>

                                {this.viewStore && <LegionsProDragger
                                    style={{ width: '100%', minHeight: '200px' }}
                                    options={{
                                        animation: 150,
                                        group: {
                                            name: 'shared',
                                            pull: true,
                                            put: true,
                                        },
                                        /* filter: `.disabled`, */
                                    }}
                                    onChange={(items: string[],sort,evt) => {
                                        if (items.length > 0) { // 至少保留一项
                                            if (evt.item.attributes['data-id']) {
                                                const name = evt.item.innerText;
                                                const columnKey = evt.item.attributes['data-id'].value;
                                                const entity = this.viewStore.columns.find((item) => item.dataIndex === columnKey)
                                                if (entity) {
                                                    if (entity.hasOwnProperty('fixed')) { // 当用户移动的是固定列时，排序不执行
                                                        const currIndex = items.findIndex((item) => item === columnKey) 
                                                        if (entity['fixed'] === 'left' && currIndex > 0) {
                                                            /** 如果拖拽左侧固定列，则只能插入在最左侧位置 */
                                                            const newItem = this.viewStore.computedShowColumns[currIndex-1] || {}
                                                            if (newItem && !newItem.hasOwnProperty('fixed')) {
                                                                message.error(`${entity.title}列已固定在左侧，您无法移动至其他位置`,4)
                                                                return;
                                                            }
                                                        }
                                                        else if (entity['fixed'] === 'right') {
                                                            /**  如果右侧固定列取消显示即currIndex =-1,则不拦截 
                                                             *  如果右侧固定列拖拽显示，则只能移动到最右侧最后一个位置
                                                            */
                                                            if (currIndex>-1&&currIndex < items.length - 1) { 
                                                                message.error(`${name}列已固定在右侧，您无法移动至其他位置`,4)
                                                                return;
                                                            }
                                                        }
                                                    }
                                                    /** 当用户移动的不是固定列，而是把其他列插入左固定列前面或者右固定的后面时
                                                     * 首先查询出当前移动列后排完序的结果，并计算出数组位置下标值
                                                     * 通过下标值去历史列表中查询该下标的值，如果该值列信息是固定列，则直接return 不执行排序
                                                     */
                                                    else if (items.length === this.viewStore.computedShowColumns.length) {
                                                        const currIndex = items.findIndex((item) => item === columnKey)
                                                        const newItem = this.viewStore.computedShowColumns[currIndex] || {}
                                                        // @ts-ignore
                                                        const newentity = this.viewStore.columns.find((item) => item.dataIndex === newItem.dataIndex)
                                                        if (newentity && newentity.hasOwnProperty('fixed')) {
                                                            // @ts-ignore
                                                            message.warning(`${newItem.title}列已固定位置，您暂时无法移动`,4)
                                                            return;
                                                        }
                                                    }
                                                    else {
                                                        const currIndex = items.findIndex((item) => item === columnKey)
                                                        /** 当用户拖拽其他非固定列移动时，如果移动位置大于0，则判定上个位置是否右侧固定列，不是的话，可以移动
                                                         * 如果移动位置为0 ，则判定当前所占位置是否左侧固定列，如果不是则可以移动
                                                         */
                                                        const newItem = this.viewStore.computedShowColumns[currIndex>0?currIndex - 1:currIndex] || {}
                                                        // @ts-ignore
                                                        const newentity = this.viewStore.columns.find((item) => item.dataIndex === newItem.dataIndex)
                                                        if (newentity && newentity.hasOwnProperty('fixed')) {
                                                            if (currIndex > 0&&newentity.fixed==='right') {
                                                                // @ts-ignore
                                                                message.warning(`${newItem.title}列已固定位置，您暂时无法移动`,4)
                                                                return;
                                                            }
                                                            else if (currIndex === 0 && newentity.fixed === 'left') {
                                                                // @ts-ignore
                                                                message.warning(`${newItem.title}列已固定位置，您暂时无法移动`,4)
                                                                return;
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                            if (this.viewStore.computedShowColumns.length === items.length) { // 表示在当前区域做排序处理
                                               
                                                this.viewStore._orderSortRightShowColumns(items)
                                                this.viewStore._setLocalStorageShowColumns(this.props.customColumnsConfig.editApi)
                                                /* localStorage.setItem(this.viewStore.computedStorageShowColumnsKeys,JSON.stringify(this.viewStore.computedShowColumns)); */
                                            }
                                            else {
                                                this.viewStore._moveRightShowColumns(items)
                                            }
                                        } else {
                                            message.warning('至少保留一项')
                                        }
                                    }}
                                >
                                    {this.viewStore.computedShowColumns.map((item) => {
                                        /* const newitem = this.viewStore.columns.find((m) => m.dataIndex === item.dataIndex)
                                        let disabled = false;
                                        if (newitem&&newitem.hasOwnProperty('fixed')) {
                                            disabled = true;
                                        } */
                                         /* const className = `${this.viewStore.computedStorageShowColumnsKeys}disabled` */
                                         /* const className = `disabled` */
                                         
                                        return <Col span={8} style={{ marginBottom: '15px',display:'table' }}  data-id={item.dataIndex} key={item.dataIndex}>
                                            <div className={`${styles.hlTableColumnsCol}  ${styles.hlTableColumnsColCursor2}`} style={{ backgroundColor: '#108ee9',color:'#fff'}}>
                                                <span style={{ display: 'inline-block', whiteSpace: 'normal',verticalAlign:'middle',lineHeight:'15px' }}>
                                                    {item.title}
                                                </span>
                                               
                                            </div>

                                        </Col>
                                    })}
                                </LegionsProDragger>
                                }
                            </Card>
                        </Col>
                    </Row>
                </LegionsProModal>
            </div>
        )
    }
}
