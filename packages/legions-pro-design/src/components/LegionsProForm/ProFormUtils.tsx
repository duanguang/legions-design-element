/*
 * @Author: duanguang
 * @Date: 2021-01-08 15:19:23
 * @LastEditTime: 2021-01-08 15:25:12
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/LegionsProForm/ProFormUtils.tsx
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
import React from 'react';
import { getInjector } from 'legions/store';
import {
    IAntdProps,
    IAntdRule,
    WrappedFormUtils,
    ColProps
} from '../interface/antd';
import { IFormCheckboxProps, IFormDatePickerProps, IFormInputNumberProps, IFormInputProps, IFormMonthPickerProps, IFormRadioButtonProps, IFormRangePickerProps, IFormRenderProps, IFormSelectProps, IFormSwitchProps, IFormTextProps, IFormUploadProps, InstanceForm, LabelWithCheckboxModel, LabelWithDatePickerModel, LabelWithHLSelectModel, LabelWithInputModel, LabelWithInputNumberModel, LabelWithMonthPickerModel, LabelWithRadioButtonModel, LabelWithRangePickerModel, LabelWithRenderModel, LabelWithSwitchModel, LabelWithTextModel, LabelWithUploadModel } from './interface';
import FormInput from './FormInput';
import FormInputNumber from './FormInputNumber';
import FormHLSelect from './FormHLSelect';
import FormDatePicker from './FormDatePicker';
import FormMonthPicker from './FormMonthPicker';
import FormRangePicker from './FormRangePicker';
import FormUpload from './FormUpload';
import FormSwitch from './FormSwitch';
import FormRadioButton from './FormRadioButton';
import FormText from './FormText';
interface IRenderComponentParams<T> {

    /**
     *
     * 基础参数
     * @type {IAntdProps}
     * @memberof IRenderComponentParams
     */
    iAntdProps: IAntdProps,

    /**
     * 组件参数
     *
     * @type {T}
     * @memberof IRenderComponentParams
     */
    iFormProps: T

    /**
     * 规则
     *
     * @type {IAntdRule[]}
     * @memberof IRenderComponentParams
     */
    rules?: IAntdRule[]
}
interface IProFormUtils {
    componentModel: LabelWithInputModel | LabelWithInputNumberModel | LabelWithDatePickerModel | LabelWithMonthPickerModel |
    LabelWithRangePickerModel | LabelWithUploadModel | LabelWithSwitchModel |
    LabelWithRadioButtonModel | LabelWithTextModel | LabelWithHLSelectModel
}
export class ProFormUtils<Store,global = {}>{
    readonly global: global = null
    readonly mobxStore: Store = null
    constructor(options?: {
        store?: any,
        global?: global
    }) {
        // super()
        if (options) {
            if (options.global) {
                this.global = options.global
            }
            if (options.store) {

            }
            if (typeof options.store === 'function' && options.store.meta) {
                const stores = getInjector()
                this.mobxStore = stores.getState(options.store);
            }
        }

    }
    createAntdProps(name: string,groupId: number,placeholder = '',params?: Omit<IAntdProps,'id' | 'name' | 'placeholder'>): IAntdProps {
        return {
            id: name,
            name,
            placeholder: placeholder || '',
            groupId,
            ...params,
        } as IAntdProps
    }
    createLayout(label: React.ReactNode,labelCol: number,wrapperCol: number,params?: { labelCol?: ColProps,wrapperCol?: ColProps }) {
        return {
            label,
            labelCol: {
                span: labelCol
            },
            wrapperCol: {
                span: wrapperCol
            },
            ...params,
        }
    }
    getFormConfig(componentConfigKey: string): IProFormUtils['componentModel'] {
        return this[componentConfigKey]
    }
    private chkRenderConfig(key: string) {
        if (this[key]) {
            //console.warn(`【${key}】:Configuration information, will be covered`)
        }
    }
    renderSelectConfig<T = {}>(options: IRenderComponentParams<IFormSelectProps & T>): LabelWithHLSelectModel {
        this.chkRenderConfig(options.iAntdProps.id)
        this[options.iAntdProps.id] = new LabelWithHLSelectModel(options.iAntdProps,options.iFormProps,options.rules || [])
        return this[options.iAntdProps.id];
    }
    renderInputConfig<T = {}>(options: IRenderComponentParams<IFormInputProps & T>): LabelWithInputModel {
        this.chkRenderConfig(options.iAntdProps.id)
        return this[options.iAntdProps.id] = new LabelWithInputModel(options.iAntdProps,options.iFormProps,options.rules || []);
    }
    renderTextConfig<T = {}>(options: IRenderComponentParams<IFormTextProps & T>): LabelWithTextModel {
        this.chkRenderConfig(options.iAntdProps.id)
        this[options.iAntdProps.id] = new LabelWithTextModel(options.iAntdProps,options.iFormProps,options.rules || [])
        return this[options.iAntdProps.id];
    }
    renderDatePickerConfig<T = {}>(options: IRenderComponentParams<IFormDatePickerProps & T>): LabelWithDatePickerModel {
        this.chkRenderConfig(options.iAntdProps.id)
        this[options.iAntdProps.id] = new LabelWithDatePickerModel(options.iAntdProps,options.iFormProps,options.rules || [])
        return this[options.iAntdProps.id];
    }
    renderMonthPickerConfig<T = {}>(options: IRenderComponentParams<IFormMonthPickerProps & T>): LabelWithMonthPickerModel {
        this.chkRenderConfig(options.iAntdProps.id)
        return this[options.iAntdProps.id] = new LabelWithMonthPickerModel(options.iAntdProps,options.iFormProps,options.rules || []);
    }
    renderRangePickerConfig<T = {}>(options: IRenderComponentParams<IFormRangePickerProps & T>): LabelWithRangePickerModel {
        this.chkRenderConfig(options.iAntdProps.id)
        return this[options.iAntdProps.id] = new LabelWithRangePickerModel(options.iAntdProps,options.iFormProps,options.rules || []);
    }
    renderInputNumberConfig<T = {}>(options: IRenderComponentParams<IFormInputNumberProps & T>): LabelWithInputNumberModel {
        this.chkRenderConfig(options.iAntdProps.id)
        return this[options.iAntdProps.id] = new LabelWithInputNumberModel(options.iAntdProps,options.iFormProps,options.rules || []);
    }
    renderRadioButtonConfig<T = {}>(options: IRenderComponentParams<IFormRadioButtonProps & T>): LabelWithRadioButtonModel {
        this.chkRenderConfig(options.iAntdProps.id)
        return this[options.iAntdProps.id] = new LabelWithRadioButtonModel(options.iAntdProps,options.iFormProps,options.rules || []);
    }
    renderSwitchConfig<T = {}>(options: IRenderComponentParams<IFormSwitchProps & T>): LabelWithSwitchModel {
        this.chkRenderConfig(options.iAntdProps.id)
        return this[options.iAntdProps.id] = new LabelWithSwitchModel(options.iAntdProps,options.iFormProps,options.rules || []);
    }
    renderUploadConfig<T = {}>(options: IRenderComponentParams<IFormUploadProps & T>): LabelWithUploadModel {
        this.chkRenderConfig(options.iAntdProps.id)
        return this[options.iAntdProps.id] = new LabelWithUploadModel(options.iAntdProps,options.iFormProps,options.rules || []);
    }

    /**
     * 自定义组件
     *
     * @template T
     * @param {(IRenderComponentParams<IFormUploadProps & T>)} options
     * @memberof HLFormUtils
     */
    renderCustomConfig<T = {}>(options: IRenderComponentParams<IFormRenderProps & T>): LabelWithRenderModel {
        this.chkRenderConfig(options.iAntdProps.id)
        return this[options.iAntdProps.id] = new LabelWithRenderModel(options.iAntdProps,options.iFormProps,options.rules || []);
    }
    renderCheckboxConfig<T = {}>(options: IRenderComponentParams<IFormCheckboxProps & T>): LabelWithCheckboxModel {
        this.chkRenderConfig(options.iAntdProps.id)
        return this[options.iAntdProps.id] = new LabelWithCheckboxModel(options.iAntdProps,options.iFormProps,options.rules || []);
    }
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
    createFormComponent(control: IProFormUtils['componentModel'],form: WrappedFormUtils,formUid: string,formRef: InstanceForm,key?: string | number) {
        if (key === void 0) {
            key = control.iAntdProps.id
        }
        if (control instanceof LabelWithInputModel) {
            const { iAntdProps,iFormInput,rules } = control;
            return (
                <FormInput iAntdProps={iAntdProps}
                    form={form}
                    key={key}
                    rules={rules}
                    formUid={formUid}
                    formStore={formRef}
                    iFormInput={iFormInput}
                >
                </FormInput>
            );
        }
        else if (control instanceof LabelWithInputNumberModel) {
            const { iAntdProps,iFormInput,rules } = control;
            return (
                <FormInputNumber iAntdProps={iAntdProps}
                    form={form}
                    key={key}
                    rules={rules}
                    formUid={formUid}
                    iFormInput={iFormInput}
                >

                </FormInputNumber>
            );
        }
        else if (control instanceof LabelWithHLSelectModel) {
            let { iAntdProps,rules,iFormWithSelect } = control;
            return (
                <FormHLSelect
                    iAntdProps={iAntdProps}
                    form={form}
                    rules={rules}
                    key={key}
                    formStore={formRef}
                    formUid={formUid}
                    iFormWithSelect={iFormWithSelect}
                >

                </FormHLSelect>
            );
        }
        else if (control instanceof LabelWithDatePickerModel) {
            let { iAntdProps,rules,iFormDatePicker } = control;
            return (
                <FormDatePicker iAntdProps={iAntdProps}
                    form={form}
                    rules={rules}
                    key={key}
                    formUid={formUid}
                    iFormDatePicker={iFormDatePicker}
                >
                </FormDatePicker>
            );
        }
        else if (control instanceof LabelWithMonthPickerModel) {
            let { iAntdProps,rules,iFormMonthPicker } = control;
            return (
                <FormMonthPicker iAntdProps={iAntdProps}
                    form={form}
                    rules={rules}
                    key={key}
                    formUid={formUid}
                    iFormMonthPicker={iFormMonthPicker}
                >
                </FormMonthPicker>
            );
        }
        else if (control instanceof LabelWithRangePickerModel) {
            let { iAntdProps,rules,iFormRangePicker } = control;
            return (
                <FormRangePicker iAntdProps={iAntdProps}
                    form={form}
                    rules={rules}
                    key={key}
                    formUid={formUid}
                    iFormRangePicker={iFormRangePicker}
                >
                </FormRangePicker>
            );
        }
        else if (control instanceof LabelWithUploadModel) {
            let { iAntdProps,rules,iFormWithUpload } = control;
            return (
                <FormUpload
                    iAntdProps={iAntdProps}
                    form={form}
                    rules={rules}
                    key={key}
                    formUid={formUid}
                    iFormWithUpload={iFormWithUpload}
                >

                </FormUpload>
            )
        }
        else if (control instanceof LabelWithSwitchModel) {
            let { iAntdProps,rules,iFormWithSwitch } = control;
            return (
                <FormSwitch
                    iAntdProps={iAntdProps}
                    form={form}
                    rules={rules}
                    key={key}
                    formUid={formUid}
                    iFormWithSwitch={iFormWithSwitch}
                >

                </FormSwitch>
            )
        }
        else if (control instanceof LabelWithRadioButtonModel) {
            let { iAntdProps,rules,iFormWithRadioButton } = control;
            return (
                <FormRadioButton
                    iAntdProps={iAntdProps}
                    form={form}
                    rules={rules}
                    key={key}
                    formUid={formUid}
                    iFormWithRadioButton={iFormWithRadioButton}
                >

                </FormRadioButton>
            )
        }
        else if (control instanceof LabelWithTextModel) {
            let { iAntdProps,rules,iFormText } = control;
            return (
                <FormText
                    iAntdProps={iAntdProps}
                    form={form}
                    rules={rules}
                    key={key}
                    formUid={formUid}
                    iFormText={iFormText}
                >

                </FormText>
            )
        }
        else {
            throw new Error(`HLFormUtils: Unknown control. control = ${JSON.stringify(control)}`);
        }
    }
}