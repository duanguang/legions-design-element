import React,{ Component } from 'react'
import { findDOMNode,unstable_renderSubtreeIntoContainer,unmountComponentAtNode } from 'react-dom'
import { Modal,message } from 'antd';
import { bind,observer } from 'legions/store-react'
import {ProModalStore  } from '../store/pro.modal';
import { ILegionsProModalProps } from './interface';
import { IViewModelModalStore } from '../store/pro.modal/interface';
import { ISchedule } from '../store/interface';
import { shortHash } from 'legions-lunar/object-hash';
import styles from './style/index.modules.less';
import './style/index.less';
import { runInAction,autorun } from 'mobx';
import { LegionsProModalContext } from './LegionsProModalContext';
const maximizeSrc = 'https://gitee.com/duanguang/figure-bed/raw/master/oss/maximize.png'
const undoSrc = 'https://gitee.com/duanguang/figure-bed/raw/master/oss/undo.png'
const antPrefix = 'ant';


interface IProps extends ILegionsProModalProps {
    children?: React.ReactNode
}
interface IState {

}
export declare type ButtonType = 'primary' | 'ghost' | 'dashed' | 'danger';

const placement = {
    right: {
        marginRight: '0px',
        top: '0px',
        height: '100%'
    },
    left: {
        marginLeft: '0px',
        top: '0px',
        height: '100%'
    },
    top: {
        top: '0px',
        width: '100%'
    },
    bottom: {
        bottom: '0px',
        width: '100%',
        position: 'absolute',
    }
}
const on = (function () {
    if (document.addEventListener) {
        return function (element,event,handler,useCapture = false) {
            if (element && event && handler) {
                element.addEventListener(event,handler,useCapture);
            }
        };
    } else {
        return function (element,event,handler) {
            if (element && event && handler) {
                element.attachEvent('on' + event,handler);
            }
        };
    }
})();
const off = (function () {
    if (document.removeEventListener) {
        return function (element,event,handler,useCapture = false) {
            if (element && event) {
                element.removeEventListener(event,handler,useCapture);
            }
        };
    } else {
        return function (element,event,handler) {
            if (element && event) {
                element.detachEvent('on' + event,handler);
            }
        };
    }
})();
const DrawerPositionWrap = {
    top: 'legions-pro-modal-DrawerPositionX',
    bottom: 'legions-pro-modal-DrawerPositionBottom',
    left: 'legions-pro-modal-drawerPositionY',
    right: 'legions-pro-modal-drawerPositionY',
}

@bind({ store: ProModalStore })
@observer
 class ProModal extends Component<IProps,IState> {
    timeId = new Date().getTime()
    uid = ''
    modalContent: Element = null;

    /**
     * 是否绑定拖拽移动事件
     */
    isBinddraggableEven = false;

    /** 是否绑定拖拽缩放事件 */
    isBindResizableEven = false;

    /** * 方案二防止重复绑定DOM数据*/
    isBindingDom = false;
    contentResizableNode: Element = null;
    nodeMaximize: Element = null;
    subscription: ISchedule = null;
    subscriptionVisible: ISchedule = null;
    /**
     * antd-content 坐标轴 *
     */
    // @ts-ignore
    topLocation: {
        /** 模态框左侧边框线距离body左侧距离 */
        left: number,
        /** 模态框顶部边框线距离顶部距离 */
        top: number,
        /** 模态框最右侧边框线距离body左侧距离 */
        right: number,
        /** 底部边框线距离顶部距离 */
        bottom: number,
    } = {
            left: null,
            top: null,
            right: null,
        }
    draggableDirection: 'left' | 'right' | 'bottom' | '';
    draggableLocationLeftY: number = null;
    clientHeight = 0;
    clientWidth = 0;
    viewStore: IViewModelModalStore = null;
    getModalDOM: Element = null;
    static defaultProps = {
        modalType: 'modal',
        placement: 'left',
        draggable: false,
        resizable: false,
    }
    static LegionsProModalContext = LegionsProModalContext
    constructor(props) {
        super(props)
        this.handleCancel = this.handleCancel.bind(this);
        this.handleOnOk = this.handleOnOk.bind(this);
    }
    log = (n) => {
        /** 拖拽移动方案一: 设置ant-content 居中样式margin:o auto 为margin:0px,通过手动left来决定显示时居左距离
         * 拖动时更改modal style属性值来设置x,y坐标
         */
        if (this.viewStore.visible && this.props.draggable && this.viewStore.dragData.x === null) {
            const timeId = setTimeout(() => {
                this.viewStore.resetDragLocationData()
                clearTimeout(timeId);
            },0)
        }
    }
    
    watchVisibleChange = (n) => {
        const visible = this.viewStore.visible;
        this.props.onVisibleChange && this.props.onVisibleChange(visible);
    }
    get getModalContentDOM() {
        if (this.getModalDOM) {
            return this.getModalDOM.querySelector(`.${antPrefix}-modal-content`)
        }
        return null;
    }
    get getModalHeaderDOM() {
        if (this.getModalDOM) {
            return this.getModalDOM.querySelector(`.${antPrefix}-modal-header`)
        }
        return null;
    }
    /** 设置模态框根节点值 */
    setModalDOM() {
        this.getModalDOM = document.querySelector(`.${this.uid}`);
    }
    /** 取消拖拽缩放模态框尺寸事件 */
    unbindingResizableEven() {
        const modalDOM = this.getModalDOM;
        if (modalDOM) {
            if (this.getModalContentDOM) {
                off(this.getModalContentDOM,'mousemove',this.handleResizableMousemove);
                /* on(modalAntd,'mouseout',this.handleMouseOut) */
                off(this.getModalContentDOM,'mousedown',this.handleResizableMouseStart)
            }
        }
    }
    unbindingDraggableMousemoveEven() {
        off(window,'mousemove',this.handleDraggableMoveMove);
    }
    unbindingDraggableMouseupEven() {
        off(window,'mouseup',this.handleDraggableMoveEnd);
    }
    bindingDraggableMousemoveEven() {
        on(window,'mousemove',this.handleDraggableMoveMove);
    }
    bindingDraggableMouseupEven() {
        on(window,'mouseup',this.handleDraggableMoveEnd);
    }
    /** window对象上绑定拖拽缩放 鼠标移动事件
     * 在触发handleResizableMouseStart即 mousedown 鼠标键在modal-content区域移动时进行绑定事件
     */
    bindingResizableMoveMoveEven() {
        on(window,'mousemove',this.handleResizableMoveMove);
    }
    /** window对象上绑定拖拽缩放 鼠标按键释放事件,
     * 在触发handleResizableMouseStart即 mousedown 鼠标键在modal-content区域按下时进行绑定事件*/
    bindingResizableMouseupEven() {
        on(window,'mouseup',this.handleResizableMoveEnd);
    }
    /** 模态框头部绑定拖拽移动事件 */
    bindingDraggableHeaderMousedownEven() {
        if (!this.isBinddraggableEven && this.props.draggable && this.viewStore.operaModel !== 'maximize') {
            if (this.getModalContentDOM && this.getModalHeaderDOM) {
                const rect = this.getModalContentDOM.getBoundingClientRect();
                if (this.draggableLocationLeftY === null) {
                    this.draggableLocationLeftY = rect.left;
                }
                this.getModalHeaderDOM.addEventListener('mousedown',this.handleDraggableMoveStart.bind(this))
                /* modalFooter&&modalFooter.addEventListener('mousedown',this.handleMoveStart.bind(this)) */
                this.isBinddraggableEven = true;
            }
        }
        this.coverOverfolwTranformAutoOverflow();
    }
    /** 在modal-content 节点绑定拖拽缩放鼠标移动和鼠标按键按下事件 */
    bindingResizableContentEven() {
        if (this.getModalDOM && this.props.resizable && this.viewStore.operaModel !== 'maximize') {
            this.setAntdContentLocation({ modalDOM: this.getModalDOM,modalContent: this.getModalContentDOM })
            if (!this.isBindResizableEven) {
                on(this.getModalContentDOM,'mousemove',this.handleResizableMousemove);
                /* on(modalAntd,'mouseout',this.handleMouseOut) */
                on(this.getModalContentDOM,'mousedown',this.handleResizableMouseStart)
                this.isBindResizableEven = true
            }
            /* modalContent.addEventListener('mouseover',this.handleMousemove.bind(this)) */
        }
    }
    componentWillMount() {
        this.uid = `m${this.props.store.ModalContainer.size}${shortHash(`${this.timeId}${this.props.store.ModalContainer.size}`)}`
        if (this.props.store.ModalContainer.has(this.uid)) {
            this.timeId = new Date().getTime()
            this.uid = `m${this.props.store.ModalContainer.size}${shortHash(`${this.timeId}${this.props.store.ModalContainer.size}`)}`
        }
        this.props.store.add(this.uid)
        this.viewStore = this.props.store.ModalContainer.get(this.uid)
        this.viewStore.placement = this.props.placement;
        const view = this.props.store.ModalContainer.get(this.uid)
        if (this.props.draggable) {
            this.subscription = this.props.store.schedule([this.log.bind(this)])
        }
        this.subscriptionVisible = this.props.store.schedule([this.watchVisibleChange.bind(this)])
        this.props.onReady && this.props.onReady({ store: this.props.store,uid: this.uid,viewModel: view });
        this.viewStore._modalType = this.props.modalType;
    }
    componentDidMount() {
        this.setModalDOM()
        this.setModalContentInsertMaximize();
        this.clientHeight = document.body.clientHeight;
        this.clientWidth = document.body.clientWidth;
        this.bindingDraggableHeaderMousedownEven();
        this.bindingResizableContentEven();
        this.props.footer === null ? (this.viewStore._footerHeight = 0) : (this.viewStore._footerHeight = 53)
    }
    componentWillReceiveProps(nextProps: IProps) {
        if (this.props.placement !== nextProps.placement && this.viewStore && nextProps.placement) {
            this.viewStore.placement = nextProps.placement;
        }
    }
    componentDidUpdate() {
        this.setModalDOM();
        this.setModalContentInsertMaximize();
        this.renderMaximize();
        /** 拖拽移动方案二： 通过埋点，往埋点处动态挂载react node 节点，并把ant-content dom 元素移动到动态节点下
         * 方案二缺陷，频繁操作dom,在隐藏模态框时会造成元素抖动,影响体验
         * 需要在render 写上一行废代码let styles = this.viewStore.computedContentStyles来保证拖拽过程触发render
         *  */
        /* const modalDOM = document.querySelector(`.${this.uid}`);
        if(modalDOM){
            const antModal = modalDOM.querySelector('.ant-modal');
            if (!this.isBindingDom) {
                const div = document.createElement('div');
                div.setAttribute('class',`legions-pro-modal-content-drag`);
                this.node = div;
                antModal.appendChild(div)
            }
            this.renderModalContent();
            if (!this.isBindingDom) {
                const antModalClass = modalDOM.querySelector('.ant-modal-content-drag');
                if (antModalClass) {
                    antModalClass.appendChild(modalDOM.querySelector('.ant-modal-content'))
                    this.isBindingDom = true;
                }
            }
        } */
        this.bindingDraggableHeaderMousedownEven();
        this.bindingResizableContentEven();
        this.props.footer === null ? (this.viewStore._footerHeight = 0) : (this.viewStore._footerHeight = 53)
    }
    componentWillUnmount() {
        this.props.store.delete(this.uid);
        this.subscription && this.subscription.unsubscribe();
        this.subscriptionVisible && this.subscriptionVisible.unsubscribe();
        this.destroyPortal();
        this.unbindingResizableEven();
        if (this.getModalHeaderDOM) {
            this.getModalHeaderDOM.removeEventListener('mousedown',this.handleDraggableMoveStart.bind(this));
        }
    }
    /** 销毁最大化按钮节点 */
    destroyPortal() {
        if (this.nodeMaximize) {
            unmountComponentAtNode(this.nodeMaximize);
        }
    }
    /** 插入最大化按钮dom */
    setModalContentInsertMaximize() {
        if (!this.nodeMaximize && this.props.modalType === 'fullscreen') { // 如果开启了全屏模式
            if (this.getModalDOM && this.getModalContentDOM) {
                /* this.modalContent = this.getModalContentDOM; */
                const button = document.createElement('botton');
                button.setAttribute('class',styles.modalMaximize);
                this.nodeMaximize = button;
                this.getModalContentDOM.insertBefore(this.nodeMaximize,this.getModalContentDOM.firstChild)
                this.renderMaximize() // 插入全屏操作按钮
                /* button.innerHTML = `
                   <img src=${maximizeSrc} />                   
                `; */
                /*
                this.modalContent.insertBefore(button,this.modalContent.firstChild) */
            }
        }
    }

    /** * 渲染全屏和还原按钮 */
    renderMaximize() {
        if (this.nodeMaximize) {
            let styles = {};
            unstable_renderSubtreeIntoContainer(
                this, //代表当前组件
                <img src={this.viewStore.operaModel === 'maximize' ? undoSrc : maximizeSrc} onClick={(even) => {
                    runInAction(() => {
                        if (this.viewStore.operaModel === 'maximize') {
                            this.viewStore.operaModel = 'reduction' // 还原
                        }
                        else {
                            this.viewStore.operaModel = 'maximize'; // 全屏
                        }
                        if (this.viewStore.operaModel === 'reduction') {
                            const timeid = setTimeout(() => {
                                this.setAntdContentLocation()
                                clearTimeout(timeid)
                            },100)
                        }
                        even.stopPropagation()
                    })
                }} />,// 塞进传送门的JSX
                this.nodeMaximize // 传送门另一端的DOM node
            )
        }
    }
    renderModalContent() {
        let styles = {};
        if (this.props.draggable) {
            styles = this.viewStore.computedDraggableContentStyles
        }
        unstable_renderSubtreeIntoContainer(
            this, //代表当前组件
            <div className="ant-modal-content-resizableData" style={Object.assign(this.props.style || {},styles,{ width: `${this.viewStore.width}px` })}></div>,// 塞进传送门的JSX
            this.contentResizableNode // 传送门另一端的DOM node
        )
    }
    /** 往模态框ant-modal-content节点插入元素 */
    setModadlContentInsertElement() {
        if (this.getModalDOM && !this.contentResizableNode) {
            const antModal = this.getModalDOM.querySelector(`.${antPrefix}-modal`);
            if (!this.isBindingDom) {
                const div = document.createElement('div');
                div.setAttribute('class',`antd-modal-resizableData`);
                this.contentResizableNode = div;
                antModal.appendChild(div)
            }
            this.renderModalContent();
            if (!this.isBindingDom) {
                const antModalClass = this.getModalDOM.querySelector(`.${antPrefix}-modal-content-resizableData`);
                if (antModalClass) {
                    antModalClass.appendChild(this.getModalContentDOM)
                    this.isBindingDom = true;
                }
            }
        }
    }
    /** 同步回an-modal-content节点元素坐标轴数据 */
    setAntdContentLocation(options?: {
        modalDOM: Element,
        modalContent: Element,
    }) {
        let modalDOM: Element = null;
        let modalContent: Element = null;
        if (options) {
            if (options.modalDOM) {
                modalDOM = options.modalDOM
            }
            if (options.modalContent) {
                modalContent = options.modalContent
            }
        }
        else {
            modalDOM = this.getModalDOM;
        }

        if (modalDOM) {
            modalContent = this.getModalContentDOM;
            if (modalContent) {
                const rect = modalContent.getBoundingClientRect();
                this.topLocation.left = rect.left;
                this.topLocation.right = rect.right;
                this.topLocation.top = rect.y;
                this.topLocation.bottom = rect.bottom;
            }
            /* off(modalAntd,'mousemove',this.handleMousemove);
            off(modalAntd,'mousedown',this.handleResizableMouseStart) */
        }
    }


    /**
     * 拖拽移动开始事件
     *
     * @param {MouseEvent} event
     * @memberof HLModal
     */
    handleDraggableMoveStart(event: MouseEvent) {
        if (this.getModalDOM && this.viewStore.operaModel !== 'maximize') {
            if (this.getModalContentDOM) {
                const rect = this.getModalContentDOM.getBoundingClientRect();
                runInAction(() => {
                    this.viewStore.dragData.x = rect.x || rect.left;
                    this.viewStore.dragData.y = rect.y || rect.top;
                    const distance = {
                        x: event.clientX,
                        y: event.clientY
                    };
                    this.viewStore.dragData.dragX = distance.x;
                    this.viewStore.dragData.dragY = distance.y;
                    this.viewStore.dragData.dragging = true;
                    this.viewStore.operaModel = 'draggable';
                })
                this.bindingDraggableMousemoveEven();
                this.bindingDraggableMouseupEven();
            }
        }
        event.stopPropagation()
    }

    /*** 拖拽移动 移动事件 */
    //@ts-ignore
    handleDraggableMoveMove = (event: MouseEvent) => {
        /* runInAction(() => {
            this.viewStore.dragData.dragging = true;
        }) */
        if (!this.viewStore.dragData.dragging) return false;
        runInAction(() => {
            const distance = {
                x: event.clientX,
                y: event.clientY
            };
            const diff_distance = {
                x: distance.x - this.viewStore.dragData.dragX,
                y: distance.y - this.viewStore.dragData.dragY
            };
            if (this.getModalContentDOM) {
                const rect = this.getModalContentDOM.getBoundingClientRect();
                const bottomMargin = this.clientHeight - rect.top;
                const rightMargin = this.clientWidth - rect.left;
                /* if (rect.left >  this.draggableLocationLeftY) {
                    console.log('往右')
                }
                else if(rect.left<=this.draggableLocationLeftY) {
                    console.log('往左')
                } */
                if (rect.top < 0) {
                    this.viewStore.dragData.y = 0;
                }
                else if (bottomMargin < 48) { // 到达底部回弹
                    this.viewStore.dragData.y = rect.top - 48;
                }
                else if (rect.right < 85) { // 到达左边界极限
                    this.viewStore.dragData.x = rect.left + 10;
                }
                else if (rightMargin < 85) { // 到达又边界极限
                    this.viewStore.dragData.x = rect.left - 10;
                }
                else {
                    this.viewStore.dragData.y += diff_distance.y;
                    this.viewStore.dragData.x += diff_distance.x;
                }
                /* this.viewStore.dragData.x += diff_distance.x; */
                this.viewStore.dragData.dragX = distance.x;
                this.viewStore.dragData.dragY = distance.y;
            }
        })
        event.stopPropagation()
    }
    /**  * 拖拽移动结束事件 */
    handleDraggableMoveEnd = () => {
        runInAction(() => {
            this.viewStore.dragData.dragging = false;
            this.viewStore.asyncResizableData()
            /* this.viewStore.operaModel = ''; */
        })
        if (this.getModalContentDOM) {
            const rect = this.getModalContentDOM.getBoundingClientRect();
            this.draggableLocationLeftY = rect.left;
        }
        this.unbindingDraggableMousemoveEven();
        this.unbindingDraggableMouseupEven();
    }
    /** 拖拽缩放移动事件,在modal-content监听事件 */
    handleResizableMousemove = (event: MouseEvent) => {
        const distance = {
            x: event.clientX,
            y: event.clientY
        };
        if (this.viewStore.computedResizable.enabled) { // 在移动或缩放过程中，如果窗口正在被缩放中，缩放坐标样式不发生变化
            return;
        }
        /* if (((distance.y - this.topLocation.top) < 1) ||
            ((distance.x - this.topLocation.left) < 1) ||
            ((this.topLocation.right - distance.x) < 1) ||
            ((this.topLocation.bottom-distance.y)<=1||(this.topLocation.bottom-distance.y)===0)) {
            
        }  */
        /** 左上角 */
        const upperLeftX = distance.x - this.topLocation.left
        const upperLeftY = distance.y - this.topLocation.top
        /** 顶部 */
        const top = distance.y - this.topLocation.top
        const topLeft = distance.x - this.topLocation.left
        const topRight = this.topLocation.right - distance.x
        /** 右上角 */
        const upperRightX = this.topLocation.right - distance.x
        const upperRightY = distance.y - this.topLocation.top

        /** 底部 */
        const bottom = this.topLocation.bottom - distance.y
        const bottomLeft = distance.x - this.topLocation.left
        const bottomRight = this.topLocation.right - distance.x

        /** 左下角 */
        const leftLowerX = distance.x - this.topLocation.left
        const leftLowerY = distance.y - this.topLocation.bottom

        /** 右下角 */
        const lowRightX = this.topLocation.right - distance.x
        const lowRightY = distance.y - this.topLocation.bottom

        /** 左部 */
        const left = distance.x - this.topLocation.left
        const LeftMin = distance.y - this.topLocation.top
        const leftMax = this.topLocation.bottom - distance.y

        /** 右部 */
        const right = this.topLocation.right - distance.x
        const rightMin = distance.y - this.topLocation.top
        const rightMax = this.topLocation.bottom - distance.y
        /* if (top>-15&&top<10&&topLeft>15&&topRight>15){ // top 方向
            this.viewStore.updateEnabledResizable({
                enabled: true,
                direction:'top',
            });
        } */
        /* console.log(left,this.topLocation,distance,event) */
        if (left > -15 && left < 15 && LeftMin > 15 && leftMax > 15) {  // 左部
            console.log('左边界极限');
            this.viewStore.updateEnabledResizable({
                enabled: false,
                direction: 'left',
            });
        }
        else if (right > -15 && right < 15 && rightMin > 15 && rightMax > 15) {  // 右部
            this.viewStore.updateEnabledResizable({
                enabled: false,
                direction: 'right',
            });
        }
        /* else if (upperLeftX > - 10 && upperLeftX < 10 && (upperLeftY < 10 && upperLeftY > -10)) {  // 左上角
            this.viewStore.updateEnabledResizable({
                enabled: true,
                direction:'upperLeft',
            });
        }
        else if (upperRightX>-10&&upperRightX<10&& (upperRightY < 10 && upperRightY > -10)) {  // 右上角
            this.viewStore.updateEnabledResizable({
                enabled: true,
                direction:'upperRight',
            });
        } */
        else if (bottom > -15 && bottom < 10 && bottomLeft > 15 && bottomRight > 15) {  // 底部
            this.viewStore.updateEnabledResizable({
                enabled: false,
                direction: 'bottom',
            });
        }
        /* else if (leftLowerX > - 10 && leftLowerX < 10 && (leftLowerY < 10 && leftLowerY > -10)) {  // 左下角
            this.viewStore.updateEnabledResizable({
                enabled: true,
                direction:'leftLower',
            });
        }
        else if (lowRightX>-10&&lowRightX<10&& (lowRightY < 10 && lowRightY > -10)) {  // 右下角
            this.viewStore.updateEnabledResizable({
                enabled: true,
                direction:'lowRight',
            });
        } */ else {
            this.viewStore.updateEnabledResizable({
                direction: '',
            });
        }
    }
    /** 移出元素范围之外触发 */
    handleResizableMouseOut = (event: MouseEvent) => {
        const distance = {
            x: event.clientX,
            y: event.clientY
        };
        if (!this.viewStore.resizableData.resizable) {
            this.viewStore.updateEnabledResizable({
                enabled: false,
                direction: '',
            });
        }

    }

/**  拖拽缩放移动坐标轴，触发在window对象*/
    //@ts-ignore
    handleResizableMoveMove = (event: MouseEvent) => {
        runInAction(() => {
            this.viewStore.resizableData.resizable = true;
        })
        if (!this.viewStore.resizableData.resizable) return false;
        runInAction(() => {
            const distance = {
                x: event.clientX,
                y: event.clientY
            };
            const diff_distance = {
                x: distance.x - this.viewStore.resizableData.resizableX,
                y: distance.y - this.viewStore.resizableData.resizableY
            };
            /*  console.log('准备拖拽缩放移动坐标轴====satrt====')
             console.log('this.viewStore.resizableData',this.viewStore.resizableData)
             console.log('this.topLocation',this.topLocation)
             console.log('准备拖拽缩放移动坐标轴====end====') */
            this.viewStore.resizableData.x += diff_distance.x;
            this.viewStore.resizableData.y += diff_distance.y;
            this.viewStore.resizableData.resizableX = distance.x;
            this.viewStore.resizableData.resizableY = distance.y;
            if (this.viewStore.computedResizable.direction === 'bottom') {
                this.viewStore.resizableData.top = this.topLocation.top;
            }
            if (this.viewStore.computedResizable.direction === 'top') {
                this.viewStore.resizableData.top = this.viewStore.resizableData.y;
                this.viewStore.resizableData.bottom = this.topLocation.bottom;
            }
            if (this.viewStore.computedResizable.direction === 'left') {// 左侧缩放，则固定右侧坐标轴
                this.viewStore.resizableData.right = this.topLocation.right;
                /* console.log('拖拽缩放移动坐标轴====satrt====')
                console.log('this.viewStore.resizableData',this.viewStore.resizableData)
                console.log('this.topLocation',this.topLocation)
                console.log('拖拽缩放移动坐标轴====end====') */
            }
            if (this.viewStore.computedResizable.direction === 'right') {
                this.viewStore.resizableData.left = this.topLocation.left;
            }
            this.viewStore.asyncResizableBodyStyle({
                modalType: this.props.modalType,
                placement: this.props.placement,
            })
        })
    }

    /** * 结束拖拽缩放，鼠标释放。window触发*/
    handleResizableMoveEnd = () => {
        runInAction(() => {
            this.viewStore.resizableData.resizable = false;
        })
        this.setAntdContentLocation();
        this.viewStore.updateEnabledResizable({
            enabled: false,
            direction: '',
        });
        off(window,'mousemove',this.handleResizableMoveMove);
        off(window,'mouseup',this.handleResizableMoveEnd);

    }

    /**
     *  拖拽缩放开始 在modal-content监听事件触发
     */
    handleResizableMouseStart = (event: MouseEvent) => {
        if (this.viewStore.operaModel !== 'maximize') { // 最大化时也就是全屏不允许缩放
            if (this.getModalContentDOM) {
                const rect = this.getModalContentDOM.getBoundingClientRect();
                runInAction(() => {
                    this.viewStore.resizableData.x = rect.x || rect.left;
                    this.viewStore.resizableData.y = rect.y || rect.top;
                    const distance = {
                        x: event.clientX,
                        y: event.clientY
                    };
                    this.viewStore.resizableData.resizableX = distance.x;
                    this.viewStore.resizableData.resizableY = distance.y;
                    /* console.log('开始缩放====satrt====')
                    console.log('this.viewStore.resizableData',this.viewStore.resizableData)
                    console.log('this.topLocation',this.topLocation)
                    console.log('distance',distance)
                    console.log('rect',rect)
                    console.log('开始缩放====end====') */
                    
                    this.viewStore.operaModel = 'resizable';
                    this.viewStore.computedResizable.enabled = true;
                })
                this.bindingResizableMoveMoveEven();
                this.bindingResizableMouseupEven();
            }
        }
    }
    /**在进行拖拽移动时 覆盖原有overfolw:hidden行为
     * 具体进行此操作原因忘记了
     */
    coverOverfolwTranformAutoOverflow() {
        if (this.props.draggable && this.viewStore.visible) {
            const modalbody = document.querySelector('body');
            let classNames = modalbody.getAttribute('class') || ''
            if (this.viewStore.visible && classNames.indexOf('legions-pro-modal-body-autoOverflow') < 0) {
                modalbody.setAttribute('class',`${classNames} legions-pro-modal-body-autoOverflow`);
            }
        }
    }
    handleCancel(even) {
        const instance = this.props.store.ModalContainer.get(this.uid)
        if (instance.cancelConfirm) {
            const ref = Modal.confirm({
                title: '提示',
                content: <h5>数据正在编辑状态，是否继续关闭？</h5>,
                okText: '确认关闭',
                okType: 'danger',
                cancelText: '取消',
                onOk: () => {
                    this.props.store.close(this.uid);
                    this.props.onCancel && this.props.onCancel(even)
                    ref.destroy()
                },
            });
        }
        else {
            /** 方案二代码： 取消时，回归坐标值，此方法会造成元素抖动 */
            /* runInAction(() => {
                this.viewStore.dragData = {
                    x: null,
                    y: null,
                    dragX: null,
                    dragY: null,
                    dragging:false,
                }
            }) */
            this.props.store.close(this.uid);
            this.props.onCancel && this.props.onCancel(even)
        }

    }
    handleOnOk(even) {
        const { onOk } = this.props;
        onOk && onOk(even)
    }
    render() {
        const instance = this.viewStore;
        const DrawerBodyHeight = this.props.footer === null ? '94%' : '89%';
        let draggingMouseStyles = ''  // 拖拽移动鼠标样式
        let draggableStyles = {}
        let draggableMaskProps = {}
        let drawerMaskProps = {}
        if (this.props.draggable && this.viewStore.operaModel !== 'maximize') {
            draggableStyles = this.viewStore.computedDraggableContentStyles
            draggableMaskProps = {
                mask: false,
                maskClosable: false,
            }
            draggingMouseStyles = this.viewStore.dragData.dragging ? 'legions-pro-modal-content-dragging' : 'legions-pro-modal-content-drag'
        }
        if (this.props.modalType === 'drawer' && this.props.resizable) {
            drawerMaskProps = {
                maskClosable: false,
            }
        }
        const drawerStyles: React.CSSProperties = Object.assign({ ...this.props.style },{ paddingBottom: '0px' },placement[this.props.placement],this.viewStore.computedResizableContentStyles)
        return (
            this.props.modalType === 'drawer' ? <Modal
                width={(this.props.placement === 'top' || this.props.placement === 'bottom') ? '100%' : this.viewStore.width}
                {...this.props}
                {...drawerMaskProps}
                bodyStyle={{ ...{ height: DrawerBodyHeight,overflow: 'auto' },...this.viewStore.computedMaximizeBodyStyle }}
                style={drawerStyles}
                wrapClassName={`${this.uid} ${DrawerPositionWrap[this.props.placement]} ${this.props.wrapClassName || ''} ${this.viewStore.computedResizableClasses}`}
                title={this.viewStore.title}
                visible={this.viewStore.visible}
                onCancel={this.handleCancel}
                onOk={this.handleOnOk}
                okText={this.viewStore.okText}
                cancelText={this.viewStore.cancelText}
                confirmLoading={this.viewStore.confirmLoading}
            >
                {this.props.children}
            </Modal> :
                <Modal
                    width={(this.viewStore.operaModel === 'maximize') ? '100%' : this.viewStore.width}
                    {...this.props}
                    {...draggableMaskProps}
                    style={Object.assign(this.props.style || {},
                        draggableStyles,
                        this.viewStore.computedMaximizeContentStyles,
                        this.viewStore.computedResizableContentStyles,
                    )}
                    bodyStyle={Object.assign(this.props.bodyStyle || {},this.viewStore.computedMaximizeBodyStyle)}
                    wrapClassName={`${this.uid} ${this.props.wrapClassName || ''} ${draggingMouseStyles} ${this.viewStore.computedResizableClasses}`}
                    title={this.viewStore.title}
                    visible={this.viewStore.visible}
                    onCancel={this.handleCancel}
                    onOk={this.handleOnOk}
                    okText={this.viewStore.okText}
                    cancelText={this.viewStore.cancelText}
                    confirmLoading={this.viewStore.confirmLoading}
                >
                    {this.props.children}
                </Modal>
        )
    }
}

const LegionsProModal = (props: IProps) => {
    const { children,...prop} = props;
    return <ProModal.LegionsProModalContext content={<React.Fragment>
        {children}
    </React.Fragment>}>
        <ProModal
         {...prop}
        ></ProModal>
    </ProModal.LegionsProModalContext>
}
export default LegionsProModal;