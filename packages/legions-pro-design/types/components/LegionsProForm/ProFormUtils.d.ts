import React from 'react';
import { IAntdProps, IAntdRule, WrappedFormUtils, ColProps } from '../interface/antd';
import { IFormCheckboxProps, IFormDatePickerProps, IFormInputNumberProps, IFormInputProps, IFormMonthPickerProps, IFormRadioButtonProps, IFormRangePickerProps, IFormRenderProps, IFormSelectProps, IFormSwitchProps, IFormTextProps, IFormUploadProps, InstanceForm, LabelWithCheckboxModel, LabelWithDatePickerModel, LabelWithHLSelectModel, LabelWithInputModel, LabelWithInputNumberModel, LabelWithMonthPickerModel, LabelWithRadioButtonModel, LabelWithRangePickerModel, LabelWithRenderModel, LabelWithSwitchModel, LabelWithTextModel, LabelWithUploadModel } from './interface';
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
}
interface IProFormUtils {
    componentModel: LabelWithInputModel | LabelWithInputNumberModel | LabelWithDatePickerModel | LabelWithMonthPickerModel | LabelWithRangePickerModel | LabelWithUploadModel | LabelWithSwitchModel | LabelWithRadioButtonModel | LabelWithTextModel | LabelWithHLSelectModel;
}
export declare class ProFormUtils<Store, global = {}> {
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
    renderSelectConfig<T = {}>(options: IRenderComponentParams<IFormSelectProps & T>): LabelWithHLSelectModel;
    renderInputConfig<T = {}>(options: IRenderComponentParams<IFormInputProps & T>): LabelWithInputModel;
    renderTextConfig<T = {}>(options: IRenderComponentParams<IFormTextProps & T>): LabelWithTextModel;
    renderDatePickerConfig<T = {}>(options: IRenderComponentParams<IFormDatePickerProps & T>): LabelWithDatePickerModel;
    renderMonthPickerConfig<T = {}>(options: IRenderComponentParams<IFormMonthPickerProps & T>): LabelWithMonthPickerModel;
    renderRangePickerConfig<T = {}>(options: IRenderComponentParams<IFormRangePickerProps & T>): LabelWithRangePickerModel;
    renderInputNumberConfig<T = {}>(options: IRenderComponentParams<IFormInputNumberProps & T>): LabelWithInputNumberModel;
    renderRadioButtonConfig<T = {}>(options: IRenderComponentParams<IFormRadioButtonProps & T>): LabelWithRadioButtonModel;
    renderSwitchConfig<T = {}>(options: IRenderComponentParams<IFormSwitchProps & T>): LabelWithSwitchModel;
    renderUploadConfig<T = {}>(options: IRenderComponentParams<IFormUploadProps & T>): LabelWithUploadModel;
    /**
     * 自定义组件
     *
     * @template T
     * @param {(IRenderComponentParams<IFormUploadProps & T>)} options
     * @memberof HLFormUtils
     */
    renderCustomConfig<T = {}>(options: IRenderComponentParams<IFormRenderProps & T>): LabelWithRenderModel;
    renderCheckboxConfig<T = {}>(options: IRenderComponentParams<IFormCheckboxProps & T>): LabelWithCheckboxModel;
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
    createFormComponent(control: IProFormUtils['componentModel'], form: WrappedFormUtils, formUid: string, formRef: InstanceForm, key?: string | number): JSX.Element;
}
export {};
