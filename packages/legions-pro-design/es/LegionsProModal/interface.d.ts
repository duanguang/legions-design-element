import ModalStore from './store';
import { ViewModel } from 'brain-store-utils/types/create-view-model';
import { ModalProps } from '../interface/antd';
import { ModalView } from './store/modalView';
export declare type Proxify<T> = {
    [P in keyof T]: T[P];
};
declare type IViewModelModalStore = ViewModel<ModalView> & Proxify<ModalView>;
export interface IResizable {
    /**
     *
     * 拖拽缩放是否启用
     * 在按下鼠标左键时更改其值
     * @type {boolean}
     */
    enabled?: boolean;
    /**
     *
     * 鼠标落点位置
     *
     * 一般是用于确定鼠标在模态框边框线的位置
     *
     * 上，下，左，右，左上，右上，左下，右下
     * @type {('top'|'upperLeft'|'upperRight'|'leftLower'|'lowRight'|'bottom'|'left'|'right'|'')}
     */
    direction?: 'top' | 'upperLeft' | 'upperRight' | 'leftLower' | 'lowRight' | 'bottom' | 'left' | 'right' | '';
}
interface ILegionsProModalRef {
    store: InstanceType<typeof ModalStore>;
    uid: string;
    viewModel: IViewModelModalStore;
    methods: {
        watchVisibleChange: (callback: (visible: boolean) => void) => void;
    };
}
interface IdraggableOptions {
    minHeight?: number;
    minWidth?: number;
}
export interface ILegionsProModal {
    ref: ILegionsProModalRef;
    resizable: IResizable;
    viewModelStore: IViewModelModalStore;
}
export interface ILegionsProModalProps extends ModalProps {
    store?: InstanceType<typeof ModalStore>;
    onReady?: (ref: ILegionsProModal['ref']) => void;
    /**
     * 组件类型，默认modal，也可以设置Drawer 抽屉形式
     * fullscreen 支持手动全屏及还原
     *
     * @type {('Drawer'|'Modal')}
     * @memberof IProps
     */
    modalType?: 'drawer' | 'modal' | 'fullscreen';
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
    /** visible 改变时触发 */
    onVisibleChange?: (visible: boolean) => void;
}
export {};
