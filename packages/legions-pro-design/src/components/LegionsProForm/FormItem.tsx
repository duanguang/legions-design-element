import React from 'react'
import { Form, Input } from 'antd';
import { WrappedFormUtils, IAntdFormItemProps, IAntdRule } from '../interface/antd';
import AbstractForm from './AbstractForm';
const FormItem = Form.Item;
export interface IFormItemProps extends IAntdFormItemProps {
    form: WrappedFormUtils;
    className?:string
    itemName:string,
    rules:IAntdRule[];
}
export default class HLFormItem extends AbstractForm<IFormItemProps>{
    constructor(props) {
        super(props)
    }
    render() {
        const { form, extra, children, className ,label,labelCol,wrapperCol,itemName,rules} = this.props;
        const { getFieldDecorator,getFieldsError } = form;
        const hasError = super.isFormHasError(getFieldsError)
        return (
            <FormItem 
                extra={extra}
                className={className}
                label={label}
                labelCol={labelCol}
                wrapperCol={wrapperCol}
            >
                {getFieldDecorator(itemName, {
                    rules: rules,
                })(
                    children
                )}
                
            </FormItem>
        )
    }
}