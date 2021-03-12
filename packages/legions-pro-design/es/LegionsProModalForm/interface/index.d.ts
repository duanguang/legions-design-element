import { InstanceProForm } from '../../LegionsProForm/interface';
import { InstanceProModal } from '../../LegionsProModal/interface';
export interface InstanceLegionsModalForm<Model> {
    formInstance: InstanceProForm;
    modalInstance: InstanceProModal;
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
