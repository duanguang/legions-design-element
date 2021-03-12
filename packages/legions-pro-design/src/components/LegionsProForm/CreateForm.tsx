import React from 'react'
import FormInput, { LabelWithInputModel } from './FormInput';
import { WrappedFormUtils } from '../interface/antd';
import FormRender, { IFormRenderProps, LabelWithRenderModel } from './FormRender';
import FormDatePicker, { LabelWithDatePickerModel, IFormDatePickerProps } from './FormDatePicker';
import FormMonthPicker, { LabelWithMonthPickerModel } from './FormMonthPicker';
import FormRangePicker, { LabelWithRangePickerModel } from './FormRangePicker';
import FormUpload, { LabelWithUploadModel } from './FormUpload';
import FormSelect from './FormSelect';
import {LabelWithSelectModel} from './interface'
import FormInputNumber, { LabelWithInputNumberModel } from './FormInputNumber';
import { InstanceProForm } from './interface';
import FormSwitch, { LabelWithSwitchModel } from './FormSwitch';
import FormRadioButton, { LabelWithRadioButtonModel } from './FormRadioButton';
/* import FormHLTable, { LabelWithHLTableModel } from './FormHLTable'; */
import FormText,{ LabelWithTextModel } from './FormText';
import FormCheckbox, { LabelWithCheckboxModel } from './FormCheckbox';
export default abstract class CreateForm<Props, State> extends React.Component<Props, State> {
    protected createFormInput(key: number|string, control: LabelWithInputModel, form: WrappedFormUtils, formUid: string,formRef: InstanceProForm) {
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
    protected createFormInputNumber(key: number|string, control: LabelWithInputNumberModel, form: WrappedFormUtils, formUid: string,formRef: InstanceProForm) {
        const { iAntdProps, iFormProps, rules } = control;
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
    protected createFormSelect(key: number|string, control: LabelWithSelectModel, form: WrappedFormUtils, formUid: string,formRef: InstanceProForm) {
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
        )
    }
    protected createFormRender(key: number|string,control: LabelWithRenderModel,form: WrappedFormUtils,formRef: InstanceProForm) {
        let { iAntdProps, rules, iFormProps } = control;
        return (
            <FormRender
                iAntdProps={iAntdProps}
                form={form}
                rules={rules}
                key={key}
                formRef={formRef}
                iFormRender={iFormProps}
            >

            </FormRender>
        )
    }
    protected createFormDatePicker(key: number|string, control: LabelWithDatePickerModel, form: WrappedFormUtils, formUid: string,formRef: InstanceProForm) {
        let { iAntdProps, rules, iFormProps } = control;
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
    protected createFormMonthPicker(key: number|string, control: LabelWithMonthPickerModel, form: WrappedFormUtils, formUid: string,formRef: InstanceProForm) {
        let { iAntdProps, rules, iFormProps } = control;
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
    protected createFormRangePicker(key: number|string, control: LabelWithRangePickerModel, form: WrappedFormUtils, formUid: string,formRef: InstanceProForm) {
        let { iAntdProps, rules, iFormProps } = control;
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
    protected createFormUpload(key: number|string, control: LabelWithUploadModel, form: WrappedFormUtils, formUid: string,formRef: InstanceProForm) {
        let { iAntdProps, rules, iFormProps } = control;
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
    protected createFormSwitch(key: number|string, control: LabelWithSwitchModel, form: WrappedFormUtils, formUid: string,formRef: InstanceProForm) {
        let { iAntdProps, rules, iFormProps } = control;
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
    protected createFormRadioButton(key: number|string, control: LabelWithRadioButtonModel, form: WrappedFormUtils, formUid: string,formRef: InstanceProForm) {
        let { iAntdProps, rules, iFormProps } = control;
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
    protected createFormText(key: number|string, control: LabelWithTextModel, form: WrappedFormUtils, formUid: string,formRef: InstanceProForm) {
        let { iAntdProps, rules,iFormProps } = control;
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

    /* protected createFormHlTable(key:number,control:LabelWithHLTableModel,form:WrappedFormUtils,formUid:string){
        let {iAntdProps,rules,iFormWithTable}=control;
        return(
            <FormHLTable
                iAntdProps={iAntdProps}
                form={form}
                rules={rules}
                key={key}
                formUid={formUid}
                iFormWithTable={iFormWithTable}
            >

            </FormHLTable>
        )
    } */
    protected createFormCheckbox(key: number|string, control: LabelWithCheckboxModel, form: WrappedFormUtils, formUid: string,formRef: InstanceProForm) {
        let { iAntdProps, rules, iFormProps } = control;
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
}