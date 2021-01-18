import React from 'react'
import { Form, DatePicker } from 'antd';
import { WrappedFormUtils, IAntdProps, IAntdFormItemProps, IAntdRule,DatePickerProps,MonthPickerProps } from '../interface/antd';
import AbstractForm from './AbstractForm';
import FormElement from './FormElement';
import { InstanceFormElement } from './interface/formElement'
const FormItem = Form.Item;
const { MonthPicker } = DatePicker;
export class LabelWithMonthPickerModel {
    constructor(public iAntdProps: IAntdProps,
        public iFormMonthPicker: IFormMonthPickerProps,
        public rules?: IAntdRule[],//验证规则

    ) {
    }
}
export interface IFormMonthPickerProps extends MonthPickerProps, IAntdFormItemProps {
}
export interface IFormWithMonthPickerProps {
    form: WrappedFormUtils;
    iAntdProps: IAntdProps;
    rules?: IAntdRule[];
    iFormMonthPicker: IFormMonthPickerProps;
    /**
     * 表单生成的唯一uid
     *
     * @type {string}
     * @memberof IFormWithInputProps
     */
    formUid:string;
}
export default class FormMonthPicker extends AbstractForm<IFormWithMonthPickerProps>{
    FormMonthPickerRef:InstanceFormElement=null
    constructor(props) {
        super(props)
    }
    onOpenChange(status){
        const store= this.FormMonthPickerRef.store.get(this.props.formUid)
        if(store){
            store.focusUid = this.FormMonthPickerRef.uid
        }
        this.props.iFormMonthPicker&&this.props.iFormMonthPicker.onOpenChange&&this.props.iFormMonthPicker.onOpenChange(status)
    }
    render() {
        const { form, iAntdProps, iFormMonthPicker, children, rules } = this.props;
        const { getFieldError, isFieldValidating, getFieldDecorator, getFieldsError } = form;
        const { label,labelCol,wrapperCol,...props } = iFormMonthPicker
        let formItemProps = {};
        if ('colon' in props) {
            formItemProps['colon'] = props.colon;
        }
        return (
            <FormElement form={form} 
                onReady={(value)=>{
                    this.FormMonthPickerRef = value
                }}
                nextElementKey={iAntdProps.nextElementKey}
                elementKey={iAntdProps.name}
                elType={'input'} 
                formUid={this.props.formUid}>
                <FormItem
                    {...formItemProps}
                    extra={iFormMonthPicker.extra}
                    className={iAntdProps.className}
                    label={iFormMonthPicker.label}
                    labelCol={iFormMonthPicker.labelCol}
                    wrapperCol={iFormMonthPicker.wrapperCol}
                >
                    {getFieldDecorator(iAntdProps.name, {
                        rules: rules,
                    })(
                        <MonthPicker
                            {...props}
                            onOpenChange={this.onOpenChange.bind(this)}
                            placeholder={iAntdProps.placeholder}
                            format={iFormMonthPicker.format}

                        ></MonthPicker>
                    )}

                </FormItem>
            </FormElement>
        )
    }
}