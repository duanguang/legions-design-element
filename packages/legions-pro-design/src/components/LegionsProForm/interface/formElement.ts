/*
 * @Author: duanguang
 * @Date: 2020-12-29 10:14:21
 * @LastEditTime: 2021-01-21 14:30:00
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/LegionsProForm/interface/formElement.ts
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
import {ProFormStore} from '../../store/pro.form'
export interface  InstanceFormElement{
    store: ProFormStore;
    
    /**
     * FormElement 组件唯一UID 自动生成
     *
     * @type {string}
     * @memberof InstanceFormElement
     */
    uid:string;
}