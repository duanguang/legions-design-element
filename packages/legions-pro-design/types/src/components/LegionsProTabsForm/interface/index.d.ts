/// <reference types="react" />
import { ITabsFormViewModelStore } from '../../LegionsStoreForm/interface';
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
export {};
