import { InstanceProForm } from '../../LegionsProForm/interface';
import { ILegionsProModal } from '../../LegionsProModal/interface';
export interface ILegionsModalForm {
    /** 表单实例  */
    form_ref: InstanceProForm;
    /** 对话框实例 */
    modal_ref: ILegionsProModal['ref'];
}
