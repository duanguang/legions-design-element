import { ViewModel } from 'brain-store-utils/types/create-view-model';
import { ModalView } from './modalView';
export interface IResizable {
    /**
     *
     * 拖拽缩放是否启用
     * 在按下鼠标左键时更改其值
     * @type {boolean}
     * @memberof IResizable
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
     * @memberof IResizable
     */
    direction?: 'top' | 'upperLeft' | 'upperRight' | 'leftLower' | 'lowRight' | 'bottom' | 'left' | 'right' | '';
}
export declare type Proxify<T> = {
    [P in keyof T]: T[P];
};
export declare type IViewModelModalStore = ViewModel<ModalView> & Proxify<ModalView>;
