/*
 * @Author: duanguang
 * @Date: 2021-01-29 10:57:31
 * @LastEditTime: 2021-01-29 16:02:29
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/LegionsProTabsForm/interface/index.ts
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
import { ClassOf } from 'legions-lunar/types/api/typescript';
import { ProFormStore } from '../../store/pro.form';
import  {
    ITabsFormViewModelStore,
  } from '../../store/pro.form/interface';
export interface InstanceTabsForm<Model> {
  
  
    /**
     * 表单UI数据
     *
     * 
     *
     * 与uid绑定，即通过uid查询得到
     * @type {IViewModelHlFormStore}
     * @memberof InstanceForm
     */
    viewModel: ITabsFormViewModelStore;
  
    /**
     * 只读数据，请勿篡改
     *
     * uid 的值绝对唯一，且每次初始生成表单都是相同值
     *
     * 用于调取localViewModel 数据模型数据
     * @memberof HLForm
     */
    readonly freezeUid: string;
    /**
     * 只读数据，请勿篡改
     *
     * 未加密的freezeUid 值
     *
     * 有需要用到明文值时，可以使用
     * @memberof HLForm
     */
    readonly decryptionFreezeUid: string;
    /**
     * 暴露一些组件操作方法
     *
     * @memberof InstanceHlTable
     */
    methods?: IMethods<Model>;
    that?: React.Component;
}
interface IMethods<Model> {
    validateFields: () => boolean;
    submit: (callback?: (value: (Model)[]) => void) => void;
    getFormFields: (key: string) => Model;
    /** 添加表单按钮事件 */
    onTabAdd: () => string;
}