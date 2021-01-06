import React from 'react'
import { Form, Input, DatePicker } from 'antd';
import { WrappedFormUtils, IAntdProps, IAntdFormItemProps, IAntdRule,DatePickerProps } from '../interface/antd';
import AbstractForm from './AbstractForm';
import FormElement from './FormElement';
import {InstanceFormElement} from './interface/formElement'
const FormItem = Form.Item;

export class LabelWithDatePickerModel {
    constructor(public iAntdProps: IAntdProps,
        public iFormDatePicker: IFormDatePickerProps,
        public rules?: IAntdRule[],//验证规则

    ) {
    }
}
export interface IFormDatePickerProps extends DatePickerProps, IAntdFormItemProps {
}
export interface IFormWithDatePickerProps {
    form: WrappedFormUtils;
    iAntdProps: IAntdProps;
    rules?: IAntdRule[];
    iFormDatePicker: IFormDatePickerProps;
    /**
     * 表单生成的唯一uid
     *
     * @type {string}
     * @memberof IFormWithInputProps
     */
    formUid:string;
}
export default class FormDatePicker extends AbstractForm<IFormWithDatePickerProps>{
    FormDatePickerRef:InstanceFormElement = null
    constructor(props) {
        super(props)
    }
    onOpenChange(status:boolean){
        const store= this.FormDatePickerRef.store.get(this.props.formUid)
        if(store){
            store.focusUid = this.FormDatePickerRef.uid
            if (!status &&store.enableEnterSwitch) {
                this.FormDatePickerRef.store.nextElement(this.FormDatePickerRef.uid,this.props.formUid)
            }
        }
        this.props.iFormDatePicker&&this.props.iFormDatePicker.onOpenChange&&this.props.iFormDatePicker.onOpenChange(status)
    }
    render() {
        const { form, iAntdProps, iFormDatePicker, children, rules,formUid } = this.props;
        const { getFieldError, isFieldValidating, getFieldDecorator, getFieldsError } = form;
        const { label,labelCol,wrapperCol,...props } = iFormDatePicker
        let formItemProps = {};
        if ('colon' in props) {
            formItemProps['colon'] = props.colon;
        }
        return (
            <FormElement form={form} 
                elementKey={iAntdProps.name} 
                nextElementKey={iAntdProps.nextElementKey}
                elType={'input'}
                onReady={(value)=>{
                    this.FormDatePickerRef = value
                }}
                formUid={formUid}>
                <FormItem
                    {...formItemProps}
                    extra={iFormDatePicker.extra}
                    className={iAntdProps.className}
                    label={iFormDatePicker.label}
                    labelCol={iFormDatePicker.labelCol}
                    wrapperCol={iFormDatePicker.wrapperCol}
                >
                    {getFieldDecorator(iAntdProps.name, {
                        rules: rules,
                    })(
                        <DatePicker
                            style={{ width: '100%' }}
                            {...props}
                            onOpenChange={this.onOpenChange.bind(this)}
                            placeholder={iAntdProps.placeholder}
                            format={iFormDatePicker.format}

                        ></DatePicker>
                    )}

                </FormItem>
            </FormElement>

        )
    }
}