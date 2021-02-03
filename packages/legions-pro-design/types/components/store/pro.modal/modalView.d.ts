/// <reference types="react" />
import { IResizable } from './interface';
export declare class ModalView {
    /**
     * 模态框标题
     *
     * @memberof ModalView
     */
    title: string | React.ReactNode;
    /**
     * 模态框是否可见
     *
     * @memberof ModalView
     */
    visible: boolean;
    /**
     * 模态框宽度
     *
     * @memberof ModalView
     */
    width: number;
    /**
     *
     *确认按钮文字
     * @memberof ModalView
     */
    okText: string;
    /**
     *
     * 取消按钮文字
     * @memberof ModalView
     */
    cancelText: string;
    /**
     * 是否启用取消确认按钮
     *
     * @memberof ModalView
     */
    cancelConfirm: boolean;
    /**
     *确定按钮 loading
     *
     * @memberof ModalView
     */
    confirmLoading: boolean;
    dragData: {
        /**模态框左侧边框线距离body左侧距离 */
        x: number;
        /** 模态框顶部边框线距离顶部距离 */
        y: number;
        dragX: number;
        dragY: number;
        dragging: boolean;
    };
    /**
     * 启用或者禁用拖拽
     *
     * @private
     * @type {boolean}
     * @memberof ModalView
     */
    private resizable;
    resizableData: {
        /**模态框左侧边框线距离body左侧距离 */
        x: number;
        /** 模态框顶部边框线距离顶部距离 */
        y: number;
        /**当前鼠标距离body左侧距离 */
        resizableX: number;
        /** 当前鼠标点距离顶部距离 */
        resizableY: number;
        resizable: boolean;
        /** 模态框顶部边框线距离顶部距离 */
        top: number;
        /** 底部边框线距离顶部距离 */
        bottom: number;
        /** 模态框最右侧边框线距离body左侧距离 */
        right: number;
        /** 模态框左侧边框线距离body左侧距离 */
        left: number;
    };
    /** 拖拽缩放时产生的高度在modal-body生效的样式 */
    private oldResizableBodyStyle;
    private oldResizableContentStyle;
    /**
     *
     * 模态框操作模式，
     * 拖拽，缩放，最大化，还原
     */
    operaModel: 'null' | 'resizable' | 'draggable' | 'maximize' | 'reduction';
    placement?: 'left' | 'right' | 'top' | 'bottom';
    /**
     * 底部高度，组件外部请勿直接修改其值
     *
     * @memberof ModalView
     */
    _footerHeight: number;
    /** 拖拽移动样式信息 */
    get computedDraggableContentStyles(): {};
    get computedResizable(): IResizable;
    /**
     * 模态框大小缩放时 ，body 内容区样式值
     *
     * @readonly
     * @memberof ModalView
     */
    get computedBodyStyle(): any;
    /** 模态框最大化时样式数据 */
    get computedMaximizeContentStyles(): React.CSSProperties;
    /**
     * 模态框大小缩放时，上边距样式值
     */
    get computedResizableContentTopStyles(): any;
    /** 模态框拖拽缩放大小样式数据 */
    get computedResizableContentStyles(): React.CSSProperties;
    /**** 模态框最大化时模态框内部body部分样式数据 */
    get computedMaximizeBodyStyle(): React.CSSProperties;
    /**
     * 拖拽缩放图标样式
     *
     * @readonly
     * @type {string}
     * @memberof ModalView
     */
    get computedResizableClasses(): string;
    asyncResizableBodyStyle(options?: {
        modalType?: 'drawer' | 'modal' | 'fullscreen';
        placement?: 'left' | 'right' | 'top' | 'bottom';
    }): void;
    /**
     * 当执行拖拽时需要把坐标同步到缩放坐标数据
     * 在拖拽移动结束时触发
     */
    asyncResizableData(): void;
    updateEnabledResizable(resizable: IResizable): void;
    /**
     * 重置模态框位置，回到居中状态
     *
     * @memberof ModalView
     */
    resetDragLocationData(): void;
}
