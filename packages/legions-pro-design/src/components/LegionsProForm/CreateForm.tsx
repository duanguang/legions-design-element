import React from 'react'
import FormInput, { LabelWithInputModel } from './FormInput';
import { WrappedFormUtils } from '../interface/antd';
import FormSelect, { LabelWithSelectModel, IFormSelectProps } from './FormSelect';
import FormRender, { IFormRenderProps, LabelWithRenderModel } from './FormRender';
import FormDatePicker, { LabelWithDatePickerModel, IFormDatePickerProps } from './FormDatePicker';
import FormMonthPicker, { LabelWithMonthPickerModel } from './FormMonthPicker';
import FormRangePicker, { LabelWithRangePickerModel } from './FormRangePicker';
import FormUpload, { LabelWithUploadModel } from './FormUpload';
import FormHLSelect from './FormHLSelect';
import {LabelWithHLSelectModel} from './interface'
import FormInputNumber, { LabelWithInputNumberModel } from './FormInputNumber';
import { InstanceForm } from './interface';
import FormSwitch, { LabelWithSwitchModel } from './FormSwitch';
import FormRadioButton, { LabelWithRadioButtonModel } from './FormRadioButton';
/* import FormHLTable, { LabelWithHLTableModel } from './FormHLTable'; */
import FormText,{ LabelWithTextModel } from './FormText';
import FormCheckbox, { LabelWithCheckboxModel } from './FormCheckbox';
export default abstract class CreateForm<Props, State> extends React.Component<Props, State> {
    protected createFormInput(key: number|string, control: LabelWithInputModel, form: WrappedFormUtils, formUid: string,formRef: InstanceForm) {
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
    protected createFormInputNumber(key: number|string, control: LabelWithInputNumberModel, form: WrappedFormUtils, formUid: string,formRef: InstanceForm) {
        const { iAntdProps, iFormInput, rules } = control;
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
    protected createFormSelect(key: number|string, control: LabelWithSelectModel|LabelWithHLSelectModel, form: WrappedFormUtils, formUid: string,formRef: InstanceForm) {
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
        )
    }
    protected createFormRender(key: number|string,control: LabelWithRenderModel,form: WrappedFormUtils,formRef: InstanceForm) {
        let { iAntdProps, rules, iFormRender } = control;
        return (
            <FormRender
                iAntdProps={iAntdProps}
                form={form}
                rules={rules}
                key={key}
                formRef={formRef}
                iFormRender={iFormRender}
            >

            </FormRender>
        )
    }
    protected createFormDatePicker(key: number|string, control: LabelWithDatePickerModel, form: WrappedFormUtils, formUid: string,formRef: InstanceForm) {
        let { iAntdProps, rules, iFormDatePicker } = control;
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
    protected createFormMonthPicker(key: number|string, control: LabelWithMonthPickerModel, form: WrappedFormUtils, formUid: string,formRef: InstanceForm) {
        let { iAntdProps, rules, iFormMonthPicker } = control;
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
    protected createFormRangePicker(key: number|string, control: LabelWithRangePickerModel, form: WrappedFormUtils, formUid: string,formRef: InstanceForm) {
        let { iAntdProps, rules, iFormRangePicker } = control;
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
    protected createFormUpload(key: number|string, control: LabelWithUploadModel, form: WrappedFormUtils, formUid: string,formRef: InstanceForm) {
        let { iAntdProps, rules, iFormWithUpload } = control;
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
    protected createFormSwitch(key: number|string, control: LabelWithSwitchModel, form: WrappedFormUtils, formUid: string,formRef: InstanceForm) {
        let { iAntdProps, rules, iFormWithSwitch } = control;
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
    protected createFormRadioButton(key: number|string, control: LabelWithRadioButtonModel, form: WrappedFormUtils, formUid: string,formRef: InstanceForm) {
        let { iAntdProps, rules, iFormWithRadioButton } = control;
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
    protected createFormText(key: number|string, control: LabelWithTextModel, form: WrappedFormUtils, formUid: string,formRef: InstanceForm) {
        let { iAntdProps, rules,iFormText } = control;
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
    protected createFormCheckbox(key: number|string, control: LabelWithCheckboxModel, form: WrappedFormUtils, formUid: string,formRef: InstanceForm) {
        let { iAntdProps, rules, iFormWithCheckbox } = control;
        return (
            <FormCheckbox
                iAntdProps={iAntdProps}
                form={form}
                rules={rules}
                key={key}
                formUid={formUid}
                iFormWithCheckbox={iFormWithCheckbox}
            >

            </FormCheckbox>
        )
    }
}