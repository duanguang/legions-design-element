/*
checkbox 表单组件
 * @Author: duanguang 
 * @Date: 2020-08-04 09:33:48 
 * @Last Modified by:   duanguang 
 * @Last Modified time: 2020-08-04 09:33:48 
 */
import React from 'react';
import { Form,Switch,Button,Icon,Checkbox } from 'antd';
import { WrappedFormUtils,IAntdProps,IAntdFormItemProps,IAntdRule, CheckboxGroupProps,CheckboxProps } from '../interface/antd';
import { Weaken} from '../interface'
import AbstractForm from './AbstractForm';
import FormElement from './FormElement';
import {InstanceFormElement} from './interface/formElement'
const FormItem = Form.Item;
export class LabelWithCheckboxModel {
    constructor(public iAntdProps: IAntdProps,
        public iFormWithCheckbox: IFormCheckboxProps,
        public rules?: IAntdRule[],
    ) {

    }
}
export interface IFormCheckboxProps extends Weaken<CheckboxGroupProps,'options'>,CheckboxGroupProps,IAntdFormItemProps {
    options: {
        label: string;
        value: string;
        disabled?: boolean;
    }[]
}

interface IFormWithCheckbox {
    iAntdProps: IAntdProps;
    form: WrappedFormUtils;
    rules?: IAntdRule[];
    iFormWithCheckbox: IFormCheckboxProps;
    /**
     * 表单生成的唯一uid
     *
     * @type {string}
     * @memberof IFormWithInputProps
     */
    formUid: string;
}
interface ISate {

}
export default class FormCheckbox extends AbstractForm<IFormWithCheckbox,ISate>{
    FormCheckboxRef: InstanceFormElement = null
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    public render() {
        const { form,iAntdProps,iFormWithCheckbox,children,rules } = this.props;
        const { getFieldsError,getFieldDecorator } = form;
        const { label,labelCol,wrapperCol,options,...props } = iFormWithCheckbox;
        let formItemProps = {};
        if ('colon' in props) {
            formItemProps['colon'] = props.colon;
        }
        return (
            <FormElement form={form}
                onReady={(value) => {
                    this.FormCheckboxRef = value
                }}
                nextElementKey={iAntdProps.nextElementKey}
                elType="button"
                elementKey={iAntdProps.name} formUid={this.props.formUid}>
                <FormItem
                    {...formItemProps}
                    className={iAntdProps.className}
                    label={label} labelCol={labelCol} wrapperCol={wrapperCol}
                >
                    {getFieldDecorator(iAntdProps.name,{
                        rules: rules,
                    })(
                        <Checkbox.Group {...props}>
                            {
                                options.map((item) => {
                                    const disabled = {};
                                    if ('disabled' in item) {
                                        disabled['disabled'] = item.disabled;
                                    }
                                    return <Checkbox {...disabled} value={item.value}>{item.label}</Checkbox>
                                })
                            }
                        </Checkbox.Group>
                    )}
                </FormItem>
            </FormElement>
        )
    }
}
