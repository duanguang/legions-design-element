/// <reference types="react" />
import { ValidateCallback } from 'antd/lib/form/Form';
import { LegionsLabeledValue } from 'legions-lunar/model';
import { ILocalViewModelHlFormStore, IViewModelHlFormStore, IErrorView, IProFormFields } from '../../LegionsStoreForm/interface';
import LegionsStoreForm from '../../LegionsStoreForm';
export type { IErrorView };
export interface InstanceProForm {
    store: InstanceType<typeof LegionsStoreForm>;
    /**
     * 只读数据，请勿篡改
     *
     * 表单临时数据UID
     *
     * 根据时间戳生成，每次初始化表单组件都会产生新的值
     * @type {string}
     * @memberof InstanceForm
     */
    readonly uid: string;
    /**
     * 表单UI临时数据
     *
     * 组件卸载时清理
     *
     * 与uid绑定，即通过uid查询得到
     * @type {IViewModelHlFormStore}
     * @memberof InstanceForm
     */
    viewModel: IViewModelHlFormStore;
    /**
     *
     * 表单UI持久化数据模型
     *
     * 组件卸载后不会清理
     * @memberof InstanceForm
     */
    localViewModel: ILocalViewModelHlFormStore;
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
    onIgnoreError?: (item: IErrorView) => void;
    /**
     * 暴露一些组件操作方法
     *
     * @memberof InstanceHlTable
     */
    methods?: IMethods;
    that?: React.Component;
    /** 校验并获取一组输入域的值与 Error */
    validateFields?(callback: ValidateCallback): any;
}
interface IMethods {
    /**
     * 下拉远程搜索函数
     *
     * @memberof IMethods
     */
    onSelectSearch?: (
    /**
     * 下拉组件name 值 (IAntdProps.name)
     *
     */
    name: string, params: {
        pageIndex: number;
        pageSize?: number;
        keywords?: string;
    } & Object) => void;
    /** 表格表单变更数据行编辑及保存状态
     * 表格表单中使用 */
    updateRecordEditData?: (record: Object) => void;
    addEditRecord?: (record: Object, isRecordEdit?: boolean) => void;
    deleteEditRecord?: (rowKey: string | number) => void;
    /** 设置表格表单列表数据源数据 */
    setTableFormDataSource?: (data: any[]) => void;
    /** 查询指定下拉组件数据项 */
    getQuerySelectOption?: (
    /** 下拉组件name值，对应container.component.JsonProperty.name */ name: string, 
    /** 下拉选项key值*/ optionKey: string) => {
        readonly option: LegionsLabeledValue;
    };
    setFormStates: <T extends IProFormFields['componentModel']>(name: string, callback: (state: T) => void) => void;
    /** 添加新的表单项 */
    addFormItem: (list: Array<IProFormFields['componentModel']>) => void;
    /** 清空表单选项 */
    clearFormItem: () => void;
}
export interface IFormState {
    /**
     *
     * 组件是否可见，一般用来控制组件显隐，默认值true 可见，false不可见 组件移除
     * @type {Boolean}
     * @memberof IFormState
     */
    visible?: boolean;
    /**
     *
     * 组件是否可见，一般用来控制组件显隐，默认值true 可见，false不可见
     * 注意此隐藏只是隐藏dom 设置display:'none'，元素依然存在只是不可见，如果元素有附加验证规则，则
     * @type {Boolean}
     * @memberof IFormState
     */
    display?: boolean;
    /**
     * 组件可编辑状态 false 可编辑， 否则不可编辑
     *
     * @type {boolean}
     * @memberof IFormState
     */
    disabled?: boolean;
}
export interface IGroup {
    /**
     * 分组名称
     *
     * @type {string}
     * @memberof IGroup
     */
    name: string | React.ReactNode;
    /**
     * 分组唯一标识ID
     *
     * @type {string}
     * @memberof IGroup
     */
    id: number;
    active: boolean;
    /**
     * 分组是否折叠
     *
     * @type {boolean}
     * @memberof IGroup
     */
    isFolding: boolean;
    className?: string;
    /**
     * 标题行是否显示设置主题风格图标 默认不显示 true 显示
     *
     * @type {boolean}
     * @memberof IGroup
     */
    isShowSizeIcon?: boolean;
}
