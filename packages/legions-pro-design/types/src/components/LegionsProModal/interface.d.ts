import { IViewModelModalStore } from '../LegionsStoreModal/interface';
import LegionsStoreModal from '../LegionsStoreModal';
import { ModalProps } from '../interface/antd';
export interface InstanceLegionsProModal {
    store: InstanceType<typeof LegionsStoreModal>;
    uid: string;
    viewModel: IViewModelModalStore;
}
interface IdraggableOptions {
    minHeight?: number;
    minWidth?: number;
}
export interface ILegionsProModalProps extends ModalProps {
    store?: InstanceType<typeof LegionsStoreModal>;
    onReady?: (instance: InstanceLegionsProModal) => void;
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
