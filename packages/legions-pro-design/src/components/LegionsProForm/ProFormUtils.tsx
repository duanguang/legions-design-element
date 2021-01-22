/*
 * @Author: duanguang
 * @Date: 2021-01-08 15:19:23
 * @LastEditTime: 2021-01-22 09:42:41
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
import { IFormCheckboxProps, IFormDatePickerProps, IFormInputNumberProps, IFormInputProps, IFormMonthPickerProps, IFormRadioButtonProps, IFormRangePickerProps, IFormRenderProps, IFormSelectProps, IFormState, IFormSwitchProps, IFormTextProps, IFormUploadProps, InstanceForm, LabelWithCheckboxModel, LabelWithDatePickerModel, LabelWithHLSelectModel, LabelWithInputModel, LabelWithInputNumberModel, LabelWithMonthPickerModel, LabelWithRadioButtonModel, LabelWithRangePickerModel, LabelWithRenderModel, LabelWithSelectModel, LabelWithSwitchModel, LabelWithTextModel, LabelWithUploadModel } from './interface';
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
import { BaseFormFields } from 'legions-lunar/model';
import { ClassOf } from 'legions-lunar/types/api/typescript';
import { createFormRule } from 'legions-decorator/async.validator'; 
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
    rules?: IAntdRule[];
    /** 表单组件实例
     * 
     * 可选参数，在自定义表单组件时，需要传入此数据，用于初始化表单组件项数据
     */
    formRef?: InstanceForm;
}
interface IProFormUtils {
    componentModel: LabelWithInputModel | LabelWithInputNumberModel | LabelWithDatePickerModel | LabelWithMonthPickerModel |
    LabelWithRangePickerModel | LabelWithUploadModel | LabelWithSwitchModel |
    LabelWithRadioButtonModel | LabelWithTextModel | LabelWithHLSelectModel
}
export const COMPONENT_TYPE = ['iFormInput','iFormText','iFormWithSelect','iFormDatePicker','iFormMonthPicker','iFormRangePicker','iFormWithRadioButton','iFormWithSwitch',]
export class ProFormUtils<Store,global = {}>{
    static LabelWithInputNumberModel = LabelWithInputNumberModel;
    static LabelWithSelectModel = LabelWithSelectModel;
    static LabelWithHLSelectModel = LabelWithHLSelectModel;
    static LabelWithRenderModel = LabelWithRenderModel;
    static LabelWithDatePickerModel = LabelWithDatePickerModel;
    static LabelWithMonthPickerModel = LabelWithMonthPickerModel;
    static LabelWithRangePickerModel = LabelWithRangePickerModel;
    static LabelWithUploadModel = LabelWithUploadModel;
    static LabelWithSwitchModel = LabelWithSwitchModel;
    static LabelWithRadioButtonModel = LabelWithRadioButtonModel;
    static LabelWithTextModel = LabelWithTextModel;
    static LabelWithInputModel = LabelWithInputModel;
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
    private initFromState(key: string,formRef: InstanceForm,iFormItemProps:IProFormUtils['componentModel']) {
        if (formRef && key) {
            const wc = COMPONENT_TYPE.find((cc) => iFormItemProps['hasOwnProperty'](cc))
            let defaultValue: IFormState = null;
            if (wc) {
                const wItem = iFormItemProps[wc]
                if (wItem['hasOwnProperty']('defaultVisible')) {
                    defaultValue={visible:wItem['defaultVisible']}
                }
                if (wItem['hasOwnProperty']('disabled')) {
                    defaultValue= defaultValue || {}
                    defaultValue={...defaultValue,disabled:wItem['disabled']}
                }
            }
            const storeView = formRef.store.get(formRef.uid);
            storeView.initFormState(key,defaultValue);
            storeView.dispatchAction(() => {
                storeView.customFormFields.set(key,iFormItemProps)
            })
        }
    }
    renderSelectConfig(options: IRenderComponentParams<IFormSelectProps>): LabelWithHLSelectModel {
        this.chkRenderConfig(options.iAntdProps.id)
        this[options.iAntdProps.id] = new LabelWithHLSelectModel(options.iAntdProps,options.iFormProps,options.rules || [])
        return this[options.iAntdProps.id];
    }
    renderInputConfig<T extends IFormInputProps>(options: IRenderComponentParams<T>): LabelWithInputModel {
        this.chkRenderConfig(options.iAntdProps.id)
        return this[options.iAntdProps.id] = new LabelWithInputModel(options.iAntdProps,options.iFormProps,options.rules || []);
    }
    renderTextConfig<T extends IFormTextProps>(options: IRenderComponentParams<T>): LabelWithTextModel {
        this.chkRenderConfig(options.iAntdProps.id)
        this[options.iAntdProps.id] = new LabelWithTextModel(options.iAntdProps,options.iFormProps,options.rules || [])
        return this[options.iAntdProps.id];
    }
    renderDatePickerConfig(options: IRenderComponentParams<IFormDatePickerProps>): LabelWithDatePickerModel {
        this.chkRenderConfig(options.iAntdProps.id)
        this[options.iAntdProps.id] = new LabelWithDatePickerModel(options.iAntdProps,options.iFormProps,options.rules || [])
        return this[options.iAntdProps.id];
    }
    renderMonthPickerConfig(options: IRenderComponentParams<IFormMonthPickerProps>): LabelWithMonthPickerModel {
        this.chkRenderConfig(options.iAntdProps.id)
        return this[options.iAntdProps.id] = new LabelWithMonthPickerModel(options.iAntdProps,options.iFormProps,options.rules || []);
    }
    renderRangePickerConfig(options: IRenderComponentParams<IFormRangePickerProps>): LabelWithRangePickerModel {
        this.chkRenderConfig(options.iAntdProps.id)
        return this[options.iAntdProps.id] = new LabelWithRangePickerModel(options.iAntdProps,options.iFormProps,options.rules || []);
    }
    renderInputNumberConfig(options: IRenderComponentParams<IFormInputNumberProps>): LabelWithInputNumberModel {
        this.chkRenderConfig(options.iAntdProps.id)
        return this[options.iAntdProps.id] = new LabelWithInputNumberModel(options.iAntdProps,options.iFormProps,options.rules || []);
    }
    renderRadioButtonConfig(options: IRenderComponentParams<IFormRadioButtonProps>): LabelWithRadioButtonModel {
        this.chkRenderConfig(options.iAntdProps.id)
        return this[options.iAntdProps.id] = new LabelWithRadioButtonModel(options.iAntdProps,options.iFormProps,options.rules || []);
    }
    renderSwitchConfig(options: IRenderComponentParams<IFormSwitchProps>): LabelWithSwitchModel {
        this.chkRenderConfig(options.iAntdProps.id)
        return this[options.iAntdProps.id] = new LabelWithSwitchModel(options.iAntdProps,options.iFormProps,options.rules || []);
    }
    renderUploadConfig(options: IRenderComponentParams<IFormUploadProps>): LabelWithUploadModel {
        this.chkRenderConfig(options.iAntdProps.id)
        return this[options.iAntdProps.id] = new LabelWithUploadModel(options.iAntdProps,options.iFormProps,options.rules || []);
    }

    /**
     * 自定义组件
     *
     * @template T
     * @param {(IRenderComponentParams<IFormUploadProps>)} options
     * @memberof HLFormUtils
     */
    renderCustomConfig(options: IRenderComponentParams<IFormRenderProps>): LabelWithRenderModel {
        this.chkRenderConfig(options.iAntdProps.id)
        return this[options.iAntdProps.id] = new LabelWithRenderModel(options.iAntdProps,options.iFormProps,options.rules || []);
    }
    renderCheckboxConfig(options: IRenderComponentParams<IFormCheckboxProps>): LabelWithCheckboxModel {
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
        const storeView = formRef.store.get(formRef.uid);
        let formState=storeView.getFormState(control.iAntdProps.id)
        if (!formState) {
            this.initFromState(control.iAntdProps.id,formRef,control);
            formState = storeView.getFormState(control.iAntdProps.id)
        }
        if (!formState.visible) {
            return null;
        }
        if (control instanceof LabelWithInputModel) {
            const { iAntdProps,iFormInput,rules } = control;
            iFormInput['disabled'] = formState.disabled;
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
            iFormInput['disabled'] = formState.disabled;
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
            iFormWithSelect['disabled'] = formState.disabled;
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
            iFormDatePicker['disabled'] = formState.disabled;
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
            iFormMonthPicker['disabled'] = formState.disabled;
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
            iFormRangePicker['disabled'] = formState.disabled;
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
            iFormWithUpload['disabled'] = formState.disabled;
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
            iFormWithSwitch['disabled'] = formState.disabled;
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
            iFormWithRadioButton['disabled'] = formState.disabled;
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

type IFormRules<FormRules> = {
    [P in keyof FormRules]: IAntdRule[];
}
export class ProFormFields<T> extends BaseFormFields{
    constructor() {
        super();
    }
    /** 初始化表单规则 */
   static initFormRules<Form,P>(FormFields: ClassOf<Form>,props: P):IFormRules<Form> {
    //@ts-ignore
       return createFormRule(FormFields,new FormFields(),{props})
    }
}