/*
 * @Author: duanguang
 * @Date: 2021-01-29 10:57:31
 * @LastEditTime: 2022-03-04 09:52:23
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/LegionsProModalForm/interface/index.ts
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
import { InstanceProForm } from '../../LegionsProForm/interface';
import { InstanceProModal } from '../../LegionsProModal/interface';

export interface ILegionsModalForm {
    /** 表单实例  */
    form_ref: InstanceProForm;

    /** 对话框实例 */
    modal_ref: InstanceProModal;
}