import { InstanceForm } from '../../LegionsProForm/interface';
import { InstanceLegionsProModal } from '../../LegionsProModal/interface';
export interface InstanceLegionsModalForm<Model> {
    formInstance: InstanceForm;
    modalInstance: InstanceLegionsProModal;
    /**
     * 暴露一些组件操作方法
     *
     * @memberof LegionsInstanceModalForm
     */
    methods?: IMethods<Model>;
}
interface IMethods<Model> {
}
export {};
