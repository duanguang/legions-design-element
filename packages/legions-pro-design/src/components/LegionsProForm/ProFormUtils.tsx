/*
 * @Author: duanguang
 * @Date: 2021-01-08 15:19:23
 * @LastEditTime: 2022-02-28 10:07:41
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
import { IFormCheckboxProps,IFormDatePickerProps,IFormInputNumberProps,IFormInputProps,IFormMonthPickerProps,IFormRadioButtonProps,IFormRangePickerProps,IFormRenderProps,IFormSelectProps,IFormState,IFormSwitchProps,IFormTextProps,IFormUploadProps,InstanceProForm,LabelWithCheckboxModel,LabelWithDatePickerModel,LabelWithSelectModel,LabelWithInputModel,LabelWithInputNumberModel,LabelWithMonthPickerModel,LabelWithRadioButtonModel,LabelWithRangePickerModel,LabelWithRenderModel,LabelWithSwitchModel,LabelWithTextModel,LabelWithUploadModel,LabelWithCascaderModel } from './interface';
import FormInput from './FormInput';
import FormInputNumber from './FormInputNumber';
import FormSelect from './FormSelect';
import FormDatePicker from './FormDatePicker';
import FormMonthPicker from './FormMonthPicker';
import FormRangePicker from './FormRangePicker';
import FormUpload from './FormUpload';
import FormSwitch from './FormSwitch';
import FormRadioButton from './FormRadioButton';
import FormText from './FormText';
import { ClassOf } from 'legions-lunar/api/typescript';
import { createFormRule,getFormMetaProperty } from 'legions-decorator/async.validator';
import { shortHash } from 'legions-lunar/object-hash';
import FormCheckbox from './FormCheckbox';
import FormCascader,{ IFormCascaderProps } from './FormCascader';
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
    formRef?: InstanceProForm;
}
interface IProFormUtils {
    componentModel: LabelWithInputModel | LabelWithInputNumberModel | LabelWithDatePickerModel | LabelWithMonthPickerModel |
    LabelWithRangePickerModel | LabelWithUploadModel | LabelWithSwitchModel |
    LabelWithRadioButtonModel | LabelWithTextModel | LabelWithSelectModel | LabelWithCheckboxModel | LabelWithCascaderModel
}
export const size = {
    'default': {
        formItemLayOut: 'form-item-default',
    },'small': {
        formItemLayOut: 'form-item-small',
    },'table': {
        formItemLayOut: 'form-item-table',
    }
}
export const formClasses = {
    itemRowHeight: `form-item-row-height`,
    tableError: 'table-error',
    tableNotEror: 'table-not-error',
    itemDefaultError: 'form-item-default-error',
}
export class ProFormUtils<Store,global = {}>{
    static LabelWithInputNumberModel = LabelWithInputNumberModel;
    static LabelWithHLSelectModel = LabelWithSelectModel;
    static LabelWithRenderModel = LabelWithRenderModel;
    static LabelWithDatePickerModel = LabelWithDatePickerModel;
    static LabelWithMonthPickerModel = LabelWithMonthPickerModel;
    static LabelWithRangePickerModel = LabelWithRangePickerModel;
    static LabelWithUploadModel = LabelWithUploadModel;
    static LabelWithSwitchModel = LabelWithSwitchModel;
    static LabelWithRadioButtonModel = LabelWithRadioButtonModel;
    static LabelWithTextModel = LabelWithTextModel;
    static LabelWithInputModel = LabelWithInputModel;
    static LabelWithCheckboxModel = LabelWithCheckboxModel;
    static isFormHasError(getFieldsError: () => any) {
        let error = getFieldsError && getFieldsError()
        let has = false
        for (let key in error) {
            if (error[key]) {
                has = true
                break;
            }
        }
        return has
    }
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
    private initFromState(key: string,formRef: InstanceProForm,iFormItemProps: IProFormUtils['componentModel']) {
        if (formRef && key) {
            const storeView = formRef.store.get(formRef.uid);
            storeView._initFormItemField(key,iFormItemProps,'custom')
        }
    }
    private createUid(name: string) {
        const timeId = new Date().getTime()
        const uid = `${name}-${shortHash(`${timeId}${name}`)}`
        return uid;
    }
    private transformAntdProps(props: IAntdProps) {
        const id = props.id;
        if (!this[id]) {
            return { ...props,uuid: this.createUid(id) }
        }
        return this[id]['iAntdProps'];
    }
    renderSelectConfig(options: IRenderComponentParams<IFormSelectProps>): LabelWithSelectModel {
        this.chkRenderConfig(options.iAntdProps.id)
        this[options.iAntdProps.id] = new LabelWithSelectModel(this.transformAntdProps(options.iAntdProps),options.iFormProps,options.rules || [])
        return this[options.iAntdProps.id];
    }
    renderInputConfig<T extends IFormInputProps>(options: IRenderComponentParams<T>): LabelWithInputModel {
        this.chkRenderConfig(options.iAntdProps.id)
        return this[options.iAntdProps.id] = new LabelWithInputModel(this.transformAntdProps(options.iAntdProps),options.iFormProps,options.rules || []);
    }
    renderTextConfig<T extends IFormTextProps>(options: IRenderComponentParams<T>): LabelWithTextModel {
        this.chkRenderConfig(options.iAntdProps.id)
        this[options.iAntdProps.id] = new LabelWithTextModel(this.transformAntdProps(options.iAntdProps),options.iFormProps,options.rules || [])
        return this[options.iAntdProps.id];
    }
    renderDatePickerConfig(options: IRenderComponentParams<IFormDatePickerProps>): LabelWithDatePickerModel {
        this.chkRenderConfig(options.iAntdProps.id)
        this[options.iAntdProps.id] = new LabelWithDatePickerModel(this.transformAntdProps(options.iAntdProps),options.iFormProps,options.rules || [])
        return this[options.iAntdProps.id];
    }
    renderMonthPickerConfig(options: IRenderComponentParams<IFormMonthPickerProps>): LabelWithMonthPickerModel {
        this.chkRenderConfig(options.iAntdProps.id)
        return this[options.iAntdProps.id] = new LabelWithMonthPickerModel(this.transformAntdProps(options.iAntdProps),options.iFormProps,options.rules || []);
    }
    renderRangePickerConfig(options: IRenderComponentParams<IFormRangePickerProps>): LabelWithRangePickerModel {
        this.chkRenderConfig(options.iAntdProps.id)
        return this[options.iAntdProps.id] = new LabelWithRangePickerModel(this.transformAntdProps(options.iAntdProps),options.iFormProps,options.rules || []);
    }
    renderInputNumberConfig(options: IRenderComponentParams<IFormInputNumberProps>): LabelWithInputNumberModel {
        this.chkRenderConfig(options.iAntdProps.id)
        return this[options.iAntdProps.id] = new LabelWithInputNumberModel(this.transformAntdProps(options.iAntdProps),options.iFormProps,options.rules || []);
    }
    renderRadioButtonConfig(options: IRenderComponentParams<IFormRadioButtonProps>): LabelWithRadioButtonModel {
        this.chkRenderConfig(options.iAntdProps.id)
        return this[options.iAntdProps.id] = new LabelWithRadioButtonModel(this.transformAntdProps(options.iAntdProps),options.iFormProps,options.rules || []);
    }
    renderSwitchConfig(options: IRenderComponentParams<IFormSwitchProps>): LabelWithSwitchModel {
        this.chkRenderConfig(options.iAntdProps.id)
        return this[options.iAntdProps.id] = new LabelWithSwitchModel(this.transformAntdProps(options.iAntdProps),options.iFormProps,options.rules || []);
    }
    renderUploadConfig(options: IRenderComponentParams<IFormUploadProps>): LabelWithUploadModel {
        this.chkRenderConfig(options.iAntdProps.id)
        return this[options.iAntdProps.id] = new LabelWithUploadModel(this.transformAntdProps(options.iAntdProps),options.iFormProps,options.rules || []);
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
    renderCascaderConfig(options: IRenderComponentParams<IFormCascaderProps>): LabelWithCascaderModel {
        this.chkRenderConfig(options.iAntdProps.id)
        return this[options.iAntdProps.id] = new LabelWithCascaderModel(options.iAntdProps,options.iFormProps,options.rules || []);
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
    createFormComponent(controls: IProFormUtils['componentModel'],form: WrappedFormUtils,formUid: string,formRef: InstanceProForm,key?: string | number) {
        let control = controls;
        if (key === void 0) {
            key = control.iAntdProps.id
        }
        this.initFromState(control.iAntdProps.id,formRef,controls)
        if (formRef) {
            const storeView = formRef.store.get(formRef.uid);
            const item = storeView.getFormItemField(control.iAntdProps.id)
            if (item) {
                control = item.value
            }

            const formSize = storeView.computedFormSize;
            const hasError = ProFormUtils.isFormHasError(form.getFieldsError)
            const error = form.getFieldError(control.iAntdProps.id)
            control['iFormProps']['size'] = formSize
            if (control.iAntdProps.className) {
                control.iAntdProps.className = control.iAntdProps.className && control.iAntdProps.className.replace(size['table'].formItemLayOut,'').replace(formClasses.tableError,'').replace(formClasses.tableNotEror,'').replace(formClasses.itemRowHeight,'')
                control.iAntdProps.className = control.iAntdProps.className && control.iAntdProps.className.replace(size['small'].formItemLayOut,'').replace(formClasses.itemRowHeight,'')
                control.iAntdProps.className = control.iAntdProps.className && control.iAntdProps.className.replace(size['default'].formItemLayOut,'').replace(formClasses.itemDefaultError,'')
            }
            if (formSize === 'table') {
                control.iAntdProps.className = `${control.iAntdProps.className || ''} ${size[formSize].formItemLayOut} ${error ? formClasses.tableError : formClasses.tableNotEror} ${formClasses.itemRowHeight}` /**  表单间距调小*/
                control['iFormProps']['size'] = 'small'
            }
            else if (formSize === 'small') {
                control.iAntdProps.className = `${control.iAntdProps.className || ''} ${size[formSize].formItemLayOut} ${formClasses.itemRowHeight}`
            }
            else {
                control.iAntdProps.className = `${control.iAntdProps.className || ''} ${size[formSize].formItemLayOut} ${hasError ? '' : size[formSize].formItemLayOut} ${error ? formClasses.itemDefaultError : ''}` /**  表单间距调小*/
            }
        }


        /* console.log(control,'controlcus'); */
        if (control.iFormProps.visible === false) {
            return null;
        }
        if (control instanceof LabelWithInputModel) {
            const { iAntdProps,iFormProps,rules } = control;
            return (
                <FormInput iAntdProps={iAntdProps}
                    form={form}
                    key={key}
                    rules={rules}
                    formUid={formUid}
                    formStore={formRef}
                    iFormInput={iFormProps}
                >
                </FormInput>
            );
        }
        else if (control instanceof LabelWithInputNumberModel) {
            const { iAntdProps,iFormProps,rules } = control;
            return (
                <FormInputNumber iAntdProps={iAntdProps}
                    form={form}
                    key={key}
                    rules={rules}
                    formUid={formUid}
                    iFormInput={iFormProps}
                >

                </FormInputNumber>
            );
        }
        else if (control instanceof LabelWithSelectModel) {
            let { iAntdProps,rules,iFormProps } = control;
            return (
                <FormSelect
                    iAntdProps={iAntdProps}
                    form={form}
                    rules={rules}
                    key={key}
                    formStore={formRef}
                    formUid={formUid}
                    iFormWithSelect={iFormProps}
                >

                </FormSelect>
            );
        }
        else if (control instanceof LabelWithDatePickerModel) {
            let { iAntdProps,rules,iFormProps } = control;
            return (
                <FormDatePicker iAntdProps={iAntdProps}
                    form={form}
                    rules={rules}
                    key={key}
                    formUid={formUid}
                    iFormDatePicker={iFormProps}
                >
                </FormDatePicker>
            );
        }
        else if (control instanceof LabelWithMonthPickerModel) {
            let { iAntdProps,rules,iFormProps } = control;
            return (
                <FormMonthPicker iAntdProps={iAntdProps}
                    form={form}
                    rules={rules}
                    key={key}
                    formUid={formUid}
                    iFormMonthPicker={iFormProps}
                >
                </FormMonthPicker>
            );
        }
        else if (control instanceof LabelWithRangePickerModel) {
            let { iAntdProps,rules,iFormProps } = control;
            return (
                <FormRangePicker iAntdProps={iAntdProps}
                    form={form}
                    rules={rules}
                    key={key}
                    formUid={formUid}
                    iFormRangePicker={iFormProps}
                >
                </FormRangePicker>
            );
        }
        else if (control instanceof LabelWithUploadModel) {
            let { iAntdProps,rules,iFormProps } = control;
            return (
                <FormUpload
                    iAntdProps={iAntdProps}
                    form={form}
                    rules={rules}
                    key={key}
                    formUid={formUid}
                    iFormWithUpload={iFormProps}
                >

                </FormUpload>
            )
        }
        else if (control instanceof LabelWithSwitchModel) {
            let { iAntdProps,rules,iFormProps } = control;
            return (
                <FormSwitch
                    iAntdProps={iAntdProps}
                    form={form}
                    rules={rules}
                    key={key}
                    formUid={formUid}
                    iFormWithSwitch={iFormProps}
                >

                </FormSwitch>
            )
        }
        else if (control instanceof LabelWithRadioButtonModel) {
            let { iAntdProps,rules,iFormProps } = control;
            return (
                <FormRadioButton
                    iAntdProps={iAntdProps}
                    form={form}
                    rules={rules}
                    key={key}
                    formUid={formUid}
                    iFormWithRadioButton={iFormProps}
                >

                </FormRadioButton>
            )
        }
        else if (control instanceof LabelWithTextModel) {
            let { iAntdProps,rules,iFormProps } = control;
            return (
                <FormText
                    iAntdProps={iAntdProps}
                    form={form}
                    rules={rules}
                    key={key}
                    formUid={formUid}
                    iFormText={iFormProps}
                >

                </FormText>
            )
        }
        else if (control instanceof LabelWithCheckboxModel) {
            let { iAntdProps,rules,iFormProps } = control;
            return (
                <FormCheckbox
                    iAntdProps={iAntdProps}
                    form={form}
                    rules={rules}
                    key={key}
                    formUid={formUid}
                    iFormWithCheckbox={iFormProps}
                >

                </FormCheckbox>
            )
        }
        else if (control instanceof LabelWithCascaderModel) {
            let { iAntdProps,rules,iFormProps } = control;
            return <FormCascader
                iAntdProps={iAntdProps}
                form={form}
                rules={rules}
                key={key}
                formUid={formUid}
                iFormWithCascader={iFormProps}
            ></FormCascader>;
        }
        else {
            throw new Error(`HLFormUtils: Unknown control. control = ${JSON.stringify(control)}`);
        }
    }
}

type IFormRules<FormRules> = {
    [P in keyof FormRules]: IAntdRule[];
}
export class ProFormFields {
    constructor() {

    }
    /** 初始化表单规则 */
    static initFormRules<Form,P>(FormFields: ClassOf<Form>,props: P): IFormRules<Form> {
        //@ts-ignore
        return createFormRule(FormFields,new FormFields(),{ props })
    }
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
    static responseBodyToFormFields<Form>(
        formFields: Form | ClassOf<Form>,
        data: any,
    ): Form {
        // @ts-ignore
        const result: Form = {};
        let model = formFields
        if (typeof formFields === 'function') {
            // @ts-ignore
            model = new formFields()
        }
        Object.keys(model).forEach(key => {
            // @ts-ignore
            const meta = getFormMetaProperty<Form>(model,key)
            const requestKey = meta && meta.requestKey || key;
            if (
                meta && meta['beforeDataToFormFields'] &&
                typeof meta['beforeDataToFormFields'] === 'function'
            ) {
                result[key] = meta['beforeDataToFormFields'](
                    data[requestKey],
                    data
                );
            } else {
                result[key] = data[requestKey];
            }
        });
        return result;
    }
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
    static formFieldsToRepuestBody<Form,RepuestBody=Form>(
        values: Form
    ): RepuestBody {
        // @ts-ignore
        const result: RepuestBody = {};
        Object.keys(values).forEach(key => {
            // @ts-ignore
            const meta = getFormMetaProperty<Form>(values,key)
            const requestKey = meta && meta.requestKey || key;
            let ignore = false;
            if (meta && meta.hasOwnProperty('ignore')) {
                ignore = meta.ignore
            }
            if (ignore === true) {
                return;
            }
            if (
                meta && meta['submitBeforeTransform'] &&
                typeof meta['submitBeforeTransform'] === 'function'
            ) {
                result[requestKey] = meta['submitBeforeTransform'](
                    values[key],
                    values
                );
            } else {
                result[requestKey] = values[key] || '';
            }
        });
        return result;
    }
}