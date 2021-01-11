import { Component } from 'react';
import { ModalProps } from '../interface/antd';
import { ProModalStore } from '../store/pro.modal';
import { InstanceLegionsProModal } from './interface';
import { IViewModelModalStore } from '../store/pro.modal/interface';
import { ISchedule } from '../store/interface';
import './style/index.less';
interface IdraggableOptions {
    minHeight?: number;
    minWidth?: number;
}
interface IProps extends ModalProps {
    store?: ProModalStore;
    onReady: (instance: InstanceLegionsProModal) => void;
    /**
     * 组件类型，默认modal，也可以设置Drawer 抽屉形式
     * fullscreen 支持手动全屏及还原
     *
     * @type {('Drawer'|'Modal')}
     * @memberof IProps
     */
    modalType?: 'Drawer' | 'Modal' | 'fullscreen';
    /**
     *
     * 抽屉方向
     * @type {('left'|'right')}
     * @memberof IProps
     */
    placement?: 'left' | 'right' | 'top' | 'bottom';
    /**
     *
     * 是否可以拖拽移动
     *
     * 会自动关闭mask及maskClosable
     * @type {boolean}
     * @memberof IProps
     */
    draggable?: boolean;
    /**
     *
     * 拖拽参数设置
     * @type {IdraggableOptions}
     * @memberof IProps
     */
    draggableOptions?: IdraggableOptions;
    /**
     * 拖拽位置
     *
     * @type {('body'|'header')}
     * @memberof IProps
     */
    /**
     * 是否可以调整模态框大小
     * 如果开启此参数，请务必同步开启draggable 拖拽移动参数
     * @type {boolean}
     * @memberof IProps
     */
    resizable?: boolean;
}
interface IState {
}
export declare type ButtonType = 'primary' | 'ghost' | 'dashed' | 'danger';
export default class LegionsProModal extends Component<IProps, IState> {
    timeId: number;
    uid: string;
    modalContent: Element;
    /**
     * 是否绑定拖拽移动事件
     */
    isBinddraggableEven: boolean;
    /** 是否绑定拖拽缩放事件 */
    isBindResizableEven: boolean;
    /** * 方案二防止重复绑定DOM数据*/
    isBindingDom: boolean;
    contentResizableNode: Element;
    nodeMaximize: Element;
    subscription: ISchedule;
    /**
     * antd-content 坐标轴 *
     */
    topLocation: {
        /** 模态框左侧边框线距离body左侧距离 */
        left: number;
        /** 模态框顶部边框线距离顶部距离 */
        top: number;
        /** 模态框最右侧边框线距离body左侧距离 */
        right: number;
        /** 底部边框线距离顶部距离 */
        bottom: number;
    };
    draggableDirection: 'left' | 'right' | 'bottom' | '';
    draggableLocationLeftY: number;
    clientHeight: number;
    clientWidth: number;
    viewStore: IViewModelModalStore;
    getModalDOM: Element;
    static defaultProps: {
        modalType: string;
        placement: string;
        draggable: boolean;
        resizable: boolean;
    };
    constructor(props: any);
    log: (n: any) => void;
    get getModalContentDOM(): Element;
    get getModalHeaderDOM(): Element;
    /** 设置模态框根节点值 */
    setModalDOM(): void;
    /** 取消拖拽缩放模态框尺寸事件 */
    unbindingResizableEven(): void;
    unbindingDraggableMousemoveEven(): void;
    unbindingDraggableMouseupEven(): void;
    bindingDraggableMousemoveEven(): void;
    bindingDraggableMouseupEven(): void;
    /** window对象上绑定拖拽缩放 鼠标移动事件
     * 在触发handleResizableMouseStart即 mousedown 鼠标键在modal-content区域移动时进行绑定事件
     */
    bindingResizableMoveMoveEven(): void;
    /** window对象上绑定拖拽缩放 鼠标按键释放事件,
     * 在触发handleResizableMouseStart即 mousedown 鼠标键在modal-content区域按下时进行绑定事件*/
    bindingResizableMouseupEven(): void;
    /** 模态框头部绑定拖拽移动事件 */
    bindingDraggableHeaderMousedownEven(): void;
    /** 在modal-content 节点绑定拖拽缩放鼠标移动和鼠标按键按下事件 */
    bindingResizableContentEven(): void;
    componentWillMount(): void;
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: IProps): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    /** 销毁最大化按钮节点 */
    destroyPortal(): void;
    /** 插入最大化按钮dom */
    setModalContentInsertMaximize(): void;
    /** * 渲染全屏和还原按钮 */
    renderMaximize(): void;
    renderModalContent(): void;
    /** 往模态框ant-modal-content节点插入元素 */
    setModadlContentInsertElement(): void;
    /** 同步回an-modal-content节点元素坐标轴数据 */
    setAntdContentLocation(options?: {
        modalDOM: Element;
        modalContent: Element;
    }): void;
    /**
     * 拖拽移动开始事件
     *
     * @param {MouseEvent} event
     * @memberof HLModal
     */
    handleDraggableMoveStart(event: MouseEvent): void;
    /*** 拖拽移动 移动事件 */
    handleDraggableMoveMove: (event: MouseEvent) => boolean;
    /**  * 拖拽移动结束事件 */
    handleDraggableMoveEnd: () => void;
    /** 拖拽缩放移动事件,在modal-content监听事件 */
    handleResizableMousemove: (event: MouseEvent) => void;
    /** 移出元素范围之外触发 */
    handleResizableMouseOut: (event: MouseEvent) => void;
    /**  拖拽缩放移动坐标轴，触发在window对象*/
    handleResizableMoveMove: (event: MouseEvent) => boolean;
    /** * 结束拖拽缩放，鼠标释放。window触发*/
    handleResizableMoveEnd: () => void;
    /**
     *  拖拽缩放开始 在modal-content监听事件触发
     */
    handleResizableMouseStart: (event: MouseEvent) => void;
    /**在进行拖拽移动时 覆盖原有overfolw:hidden行为
     * 具体进行此操作原因忘记了
     */
    coverOverfolwTranformAutoOverflow(): void;
    handleCancel(even: any): void;
    handleOnOk(even: any): void;
    render(): JSX.Element;
}
export {};
