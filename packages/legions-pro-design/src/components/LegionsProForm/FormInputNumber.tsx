import React from 'react'
import { Form, InputNumber } from 'antd';
import { WrappedFormUtils, InputNumberProps, IAntdProps, IAntdFormItemProps, IAntdRule } from '../interface/antd';
import AbstractForm from './AbstractForm';
import FormElement from './FormElement';
import {InstanceFormElement} from './interface/formElement'
const FormItem = Form.Item;
export class LabelWithInputNumberModel {
    constructor(public iAntdProps: IAntdProps,
        public iFormInput: IFormInputNumberProps,
        public rules?: IAntdRule[],//验证规则
    ) {

    }
}
export interface IFormInputNumberProps extends InputNumberProps, IAntdFormItemProps {
    render?: (form: WrappedFormUtils) => JSX.Element;
    onBlur?: () => void
    onFocus?:(e)=>void
}
interface IFormWithInputNumberProps {
    iAntdProps: IAntdProps;
    form?: WrappedFormUtils;
    rules?: IAntdRule[];
    iFormInput: IFormInputNumberProps;
    /**
     * 表单生成的唯一uid
     *
     * @type {string}
     * @memberof IFormWithInputProps
     */
    formUid:string;
    // children?: React.ReactNode;
}
export default class FormInputNumber extends AbstractForm<IFormWithInputNumberProps>{
    FormInputNumberRef:InstanceFormElement=null
    constructor(props) {
        super(props)
    }
    onFocus(e){
        const store= this.FormInputNumberRef.store.get(this.props.formUid)
        if(store){
            store.focusUid = this.FormInputNumberRef.uid
        }
        this.props.iFormInput&&this.props.iFormInput.onFocus&&this.props.iFormInput.onFocus(e)
    }
    render() {
        const { form, iAntdProps, iFormInput, children, rules } = this.props;
        const { getFieldDecorator, getFieldsError } = form;
        const { label,labelCol,wrapperCol,render,...props } = iFormInput
        let formItemProps = {};
        if ('colon' in props) {
            formItemProps['colon'] = props.colon;
        }
        return (
            <FormElement form={form} 
                onReady={(value)=>{
                    this.FormInputNumberRef = value
                }}
                elementKey={iAntdProps.name} 
                nextElementKey={iAntdProps.nextElementKey}
                elType={'input'}
                formUid={this.props.formUid}>
                <FormItem
                    {...formItemProps}
                    extra={iFormInput.extra}
                    className={iAntdProps.className}
                    label={iFormInput.label}
                    labelCol={iFormInput.labelCol}
                    wrapperCol={iFormInput.wrapperCol}
                >
                    {getFieldDecorator(iAntdProps.name, {
                        rules: rules,
                        normalize: (value: number, prevValue, allValues) => {
                            if (value !== void 0 && value !== null) {
                                return value.toString()
                            }
                            return value
                        },
                    })(
                        // @ts-ignore
                        <InputNumber
                            style={{ width: '100%' }}
                            placeholder={iAntdProps.placeholder}
                            {...props}
                            //@ts-ignore
                            onFocus={this.onFocus.bind(this)}
                        />
                    )}
                    {children}
                </FormItem>
            </FormElement>
        )
    }
}