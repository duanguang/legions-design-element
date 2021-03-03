/*
 * @Author: duanguang
 * @Date: 2020-12-29 10:14:21
 * @LastEditTime: 2021-03-02 18:57:24
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/LegionsProForm/interface/formElement.ts
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
import LegionsStoreForm from '../../LegionsStoreForm'
export interface  InstanceFormElement{
    store: InstanceType<typeof LegionsStoreForm>;
    
    /**
     * FormElement 组件唯一UID 自动生成
     *
     * @type {string}
     * @memberof InstanceFormElement
     */
    uid:string;
}