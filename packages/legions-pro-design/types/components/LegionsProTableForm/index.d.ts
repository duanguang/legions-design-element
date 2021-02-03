import React from 'react';
import { IAntdRule, TableColumnConfig, WrappedFormUtils } from '../interface/antd';
import { Weaken } from '../interface';
import { IProTableProps, ITableColumnConfig } from '../LegionsProTable/interface';
import LegionsProForm from '../LegionsProForm';
import { InstanceForm } from '../LegionsProForm/interface';
import { IProFormProps } from '../LegionsProForm/HlForm';
/** 分割符，用于给表单字段添加下标时使用 */
export declare const HLTableFormSeparator = "___";
interface IHlFormConfig<F> extends Partial<IProFormProps<F>>, Weaken<Partial<IProFormProps<F>>, 'controls' | 'onGetForm'> {
    /**
    * 获取表单数据模型
    * form  即将废弃，请formRef.viewModel.form 获取
    *
    * @memberof IHLFormProps
    */
    onGetForm?: (
    /**即将废弃，请formRef.viewModel.form 获取 */
    form: WrappedFormUtils, formRef?: InstanceForm) => void;
    controls: any[];
    /** 表单验证规则函数类 */
    ruleClassDeclaration?: Function;
    /** 表单实体函数类 */
    formFieldsClassDeclaration?: Function;
}
export declare class ProTableFormProps<T = {}, F = {}> {
    /**
     * hlForm配置，只需要传入controls，组件会根据表单字段名称自动匹配并生成可编辑表格
     * 无需配置mapPropsToFields和onFieldsChange，本组件已托管
     * 暂不支持select下拉请求托管
     * @type {Partial<IHLFormProps<F>>}
     * @memberof HLTableFormProps
     */
    proFormConfig: IHlFormConfig<F>;
    /**
     * hlTable配置
     * @type {Partial<IHLTableProps<T>>}
     * @memberof HLTableFormProps
     */
    proTableConfig: IProTableProps<T>;
    /**
     * 容器样式
     * @type {React.CSSProperties}
     * @memberof HLTableFormProps
     */
    style?: React.CSSProperties;
    /**
     * 容器类名
     * @type {string}
     * @memberof HLTableFormProps
     */
    className?: string;
    /**
     * 数据变化监听
     * @memberof HLTableFormProps
     */
    onChange?: (dataList: T[]) => void;
}
declare type IFormRules<FormRules> = {
    [P in keyof FormRules]: IAntdRule[];
};
interface IState<T = {}> {
    data: T[];
    recordEditData: Map<string, boolean>;
}
export default class LegionsProTableForm<T = {}, F = {}> extends LegionsProForm.CreateForm<ProTableFormProps<T, F>, IState<T>> {
    static defaultProps: Object;
    /** 用于缓存上一次onFieldsChange中改变的状态，除了value */
    fieldsOtherCache: Map<any, any>;
    /** 行缓存, 避免表格render多次执行导致表单各种行为异常 */
    recordCache: Map<any, any>;
    /** 表单实体 */
    formRef: InstanceForm;
    rules: IFormRules<any>;
    /** 行唯一id */
    get uniqueKey(): string;
    constructor(props: ProTableFormProps<T, F>);
    updateRecordEditData: (record: Object) => void;
    tranformData(data: T[]): ({
        isRecordEdit: boolean;
    } & T)[];
    componentWillReceiveProps(nextProps: ProTableFormProps<T, F>): void;
    renderComponent(column: TableColumnConfig<T> & ITableColumnConfig): void;
    createControl: (control: any, key: number, formRef: InstanceForm) => JSX.Element;
    /** 创建行表单 */
    createTable: () => (import("../LegionsProForm/FormInput").LabelWithInputModel | import("../LegionsProForm/FormInputNumber").LabelWithInputNumberModel | import("../LegionsProForm/FormDatePicker").LabelWithDatePickerModel | import("../LegionsProForm/FormMonthPicker").LabelWithMonthPickerModel | import("../LegionsProForm/FormRangePicker").LabelWithRangePickerModel | import("../LegionsProForm/FormUpload").LabelWithUploadModel | import("../LegionsProForm/FormSwitch").LabelWithSwitchModel | import("../LegionsProForm/FormRadioButton").LabelWithRadioButtonModel | import("../LegionsProForm/FormText").LabelWithTextModel | import("../LegionsProForm/interface").LabelWithSelectModel)[];
    /** 数据转化，列表数据转化为表单数据 */
    listToFormData: (data?: T[]) => {};
    /** 数据转化，表单数据转列表数据 */
    formDataToList: (data: T[], fields: Partial<F>) => T[];
    render(): JSX.Element;
}
export {};
