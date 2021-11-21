import React from 'react';
import { IAntdProps, IAntdRule, WrappedFormUtils, ColProps } from '../interface/antd';
import { IFormCheckboxProps, IFormDatePickerProps, IFormInputNumberProps, IFormInputProps, IFormMonthPickerProps, IFormRadioButtonProps, IFormRangePickerProps, IFormRenderProps, IFormSelectProps, IFormSwitchProps, IFormTextProps, IFormUploadProps, InstanceProForm, LabelWithCheckboxModel, LabelWithDatePickerModel, LabelWithSelectModel, LabelWithInputModel, LabelWithInputNumberModel, LabelWithMonthPickerModel, LabelWithRadioButtonModel, LabelWithRangePickerModel, LabelWithRenderModel, LabelWithSwitchModel, LabelWithTextModel, LabelWithUploadModel, LabelWithCascaderModel } from './interface';
import { ClassOf } from 'legions-lunar/api/typescript';
import { IFormCascaderProps } from './FormCascader';
interface IRenderComponentParams<T> {
    /**
     *
     * 基础参数
     * @type {IAntdProps}
     * @memberof IRenderComponentParams
     */
    iAntdProps: IAntdProps;
    /**
     * 组件参数
     *
     * @type {T}
     * @memberof IRenderComponentParams
     */
    iFormProps: T;
    /**
     * 规则
     *
     * @type {IAntdRule[]}
     * @memberof IRenderComponentParams
     */
    rules?: IAntdRule[];
    /** 表单组件实例
     *
     * 可选参数，在自定义表单组件时，需要传入此数据，用于初始化表单组件项数据
     */
    formRef?: InstanceProForm;
}
interface IProFormUtils {
    componentModel: LabelWithInputModel | LabelWithInputNumberModel | LabelWithDatePickerModel | LabelWithMonthPickerModel | LabelWithRangePickerModel | LabelWithUploadModel | LabelWithSwitchModel | LabelWithRadioButtonModel | LabelWithTextModel | LabelWithSelectModel | LabelWithCheckboxModel | LabelWithCascaderModel;
}
export declare const size: {
    default: {
        formItemLayOut: string;
    };
    small: {
        formItemLayOut: string;
    };
    table: {
        formItemLayOut: string;
    };
};
export declare const formClasses: {
    itemRowHeight: string;
    tableError: string;
    tableNotEror: string;
    itemDefaultError: string;
};
export declare class ProFormUtils<Store, global = {}> {
    static LabelWithInputNumberModel: typeof LabelWithInputNumberModel;
    static LabelWithHLSelectModel: typeof LabelWithSelectModel;
    static LabelWithRenderModel: typeof LabelWithRenderModel;
    static LabelWithDatePickerModel: typeof LabelWithDatePickerModel;
    static LabelWithMonthPickerModel: typeof LabelWithMonthPickerModel;
    static LabelWithRangePickerModel: typeof LabelWithRangePickerModel;
    static LabelWithUploadModel: typeof LabelWithUploadModel;
    static LabelWithSwitchModel: typeof LabelWithSwitchModel;
    static LabelWithRadioButtonModel: typeof LabelWithRadioButtonModel;
    static LabelWithTextModel: typeof LabelWithTextModel;
    static LabelWithInputModel: typeof LabelWithInputModel;
    static LabelWithCheckboxModel: typeof LabelWithCheckboxModel;
    static isFormHasError(getFieldsError: () => any): boolean;
    readonly global: global;
    readonly mobxStore: Store;
    constructor(options?: {
        store?: any;
        global?: global;
    });
    createAntdProps(name: string, groupId: number, placeholder?: string, params?: Omit<IAntdProps, 'id' | 'name' | 'placeholder'>): IAntdProps;
    createLayout(label: React.ReactNode, labelCol: number, wrapperCol: number, params?: {
        labelCol?: ColProps;
        wrapperCol?: ColProps;
    }): {
        labelCol: ColProps | {
            span: number;
        };
        wrapperCol: ColProps | {
            span: number;
        };
        label: React.ReactNode;
    };
    getFormConfig(componentConfigKey: string): IProFormUtils['componentModel'];
    private chkRenderConfig;
    private initFromState;
    private createUid;
    private transformAntdProps;
    renderSelectConfig(options: IRenderComponentParams<IFormSelectProps>): LabelWithSelectModel;
    renderInputConfig<T extends IFormInputProps>(options: IRenderComponentParams<T>): LabelWithInputModel;
    renderTextConfig<T extends IFormTextProps>(options: IRenderComponentParams<T>): LabelWithTextModel;
    renderDatePickerConfig(options: IRenderComponentParams<IFormDatePickerProps>): LabelWithDatePickerModel;
    renderMonthPickerConfig(options: IRenderComponentParams<IFormMonthPickerProps>): LabelWithMonthPickerModel;
    renderRangePickerConfig(options: IRenderComponentParams<IFormRangePickerProps>): LabelWithRangePickerModel;
    renderInputNumberConfig(options: IRenderComponentParams<IFormInputNumberProps>): LabelWithInputNumberModel;
    renderRadioButtonConfig(options: IRenderComponentParams<IFormRadioButtonProps>): LabelWithRadioButtonModel;
    renderSwitchConfig(options: IRenderComponentParams<IFormSwitchProps>): LabelWithSwitchModel;
    renderUploadConfig(options: IRenderComponentParams<IFormUploadProps>): LabelWithUploadModel;
    /**
     * 自定义组件
     *
     * @template T
     * @param {(IRenderComponentParams<IFormUploadProps>)} options
     * @memberof HLFormUtils
     */
    renderCustomConfig(options: IRenderComponentParams<IFormRenderProps>): LabelWithRenderModel;
    renderCheckboxConfig(options: IRenderComponentParams<IFormCheckboxProps>): LabelWithCheckboxModel;
    renderCascaderConfig(options: IRenderComponentParams<IFormCascaderProps>): LabelWithCascaderModel;
    /**
     * 生成一个表单基础组件
     * 应用场景一般自定义组件由很多比如input,select等组成，可以通过此方法快速创建一个组件
     *
     * @param {IHLFormUtils['componentModel']} control
     * @param {WrappedFormUtils} form
     * @param {string} formUid
     * @param {InstanceForm} formRef
     * @param {(string|number)} [key]
     * @returns
     * @memberof HLFormUtils
     */
    createFormComponent(controls: IProFormUtils['componentModel'], form: WrappedFormUtils, formUid: string, formRef: InstanceProForm, key?: string | number): JSX.Element;
}
declare type IFormRules<FormRules> = {
    [P in keyof FormRules]: IAntdRule[];
};
export declare class ProFormFields {
    constructor();
    /** 初始化表单规则 */
    static initFormRules<Form, P>(FormFields: ClassOf<Form>, props: P): IFormRules<Form>;
    /**
  *
  * 服务端数据同步到表单数据
  *
  * @static
  * @template Form
  * @template
  * @param {Form} formFields 表单实体
  * @param {any} data 服务端数据
  */
    static responseBodyToFormFields<Form>(formFields: Form | ClassOf<Form>, data: any): Form;
    /**
   * 表单数据生成表单服务端接口可用数据
   *
   *
   * @static
   * @template Form 表单实体模型
   * @template RepuestBody 表单提交接口所需接口数据
   * @param {Form} values 表单数据
   * @returns {RepuestBody}
   * @memberof
   */
    static formFieldsToRepuestBody<Form, RepuestBody = Form>(values: Form): RepuestBody;
}
export {};
