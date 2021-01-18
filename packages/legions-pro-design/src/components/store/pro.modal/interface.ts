/*
 * @Author: duanguang
 * @Date: 2020-12-26 17:55:13
 * @LastEditTime: 2020-12-26 17:58:40
 * @LastEditors: duanguang
 * @Description:
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/store/pro.modal/interface.ts
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */

import { ModalView } from './modalView';
import { ViewModel } from 'brain-store-utils';
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
  direction?:
    | 'top'
    | 'upperLeft'
    | 'upperRight'
    | 'leftLower'
    | 'lowRight'
    | 'bottom'
    | 'left'
    | 'right'
    | '';
}
export type Proxify<T> = {
  [P in keyof T]: T[P];
  //[P in keyof T]: Proxy<T[P]>;
};
export declare type IViewModelModalStore = ViewModel<ModalView> &
  Proxify<ModalView>;
