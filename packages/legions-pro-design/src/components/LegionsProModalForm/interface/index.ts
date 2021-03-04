/*
 * @Author: duanguang
 * @Date: 2021-01-29 10:57:31
 * @LastEditTime: 2021-03-02 19:06:18
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/LegionsProModalForm/interface/index.ts
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
import { ClassOf } from 'legions-lunar/types/api/typescript';
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