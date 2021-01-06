/*
 * @Author: duanguang
 * @Date: 2020-12-26 17:57:29
 * @LastEditTime: 2020-12-26 17:59:23
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/LegionsProModal/interface.ts
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */

import { IViewModelModalStore } from '../store/pro.modal/interface';
import ProModalStore from '../store/pro.modal';
export interface InstanceLegionsProModal {
    store: ProModalStore;
    uid: string;
    viewModel: IViewModelModalStore
}