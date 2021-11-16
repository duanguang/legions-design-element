/*
 * @Author: duanguang
 * @Date: 2021-01-29 10:57:31
 * @LastEditTime: 2021-11-16 23:49:24
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/LegionsProModalForm/interface/index.ts
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
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