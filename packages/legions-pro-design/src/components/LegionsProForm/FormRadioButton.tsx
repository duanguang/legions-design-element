/**
 * Created by xiaoduan on 2016/12/1.
 */
import React from 'react';
import { Form, Radio, Button, Icon } from 'antd';
import { WrappedFormUtils, IAntdProps, IAntdFormItemProps, IAntdRule,RadioButtonProps, RadioGroupProps, RadioProps } from '../interface/antd';
import AbstractForm from './AbstractForm';
import FormElement from './FormElement';
import { InstanceFormElement } from './interface/formElement'
const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
export class LabelWithRadioButtonModel {
    constructor(public iAntdProps: IAntdProps,
        public iFormProps: IFormRadioButtonProps,
        public rules?: IAntdRule[],
    ) {

    }
}
export interface LabelWithRadioButtonPartialModel {
    iAntdProps?: IAntdProps,
    iFormWithRadioButton?: IFormRadioButtonProps,
    rules?: IAntdRule[],
}
export interface IFormRadioButtonProps extends IAntdFormItemProps {
    radioButton?: {
        options: ({ label: string, value: string } & RadioButtonProps)[]
    },
    radio?: {
        options: ({ label: string, value: string } & RadioProps)[]
    }
    radioGroup?: RadioGroupProps,
}

interface IFormWithRadioButton {
    iAntdProps: IAntdProps;
    form: WrappedFormUtils;
    rules?: IAntdRule[];
    iFormWithRadioButton: IFormRadioButtonProps;
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
export default class FormRadioButton extends AbstractForm<IFormWithRadioButton, ISate>{
    FormRadioButtonRef: InstanceFormElement = null
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentDidMount() {
        this.didMountClearNodeQueue(this.FormRadioButtonRef,this.props.formUid,this.props.iAntdProps.name)
    }
    shouldComponentUpdate(nextProps:IFormWithRadioButton,nextState,context) {
       return this.isShouldComponentUpdate(this.FormRadioButtonRef,this.props.formUid,nextProps.iAntdProps.name)
    }
    public render() {
        const { form, iAntdProps, iFormWithRadioButton, children, rules } = this.props;
        const { getFieldsError, getFieldDecorator } = form;
        const { label,labelCol,wrapperCol,radioGroup,radioButton,radio,...props } = iFormWithRadioButton
        let formItemProps = {};
        if ('colon' in props) {
            formItemProps['colon'] = props.colon;
        }
        return (
            <FormElement form={form}
                onReady={(value) => {
                    this.FormRadioButtonRef = value
                }}
                elType="input"
                nextElementKey={iAntdProps.nextElementKey}
                elementKey={iAntdProps.name} formUid={this.props.formUid}>
                <FormItem
                    {...formItemProps}
                    className={iAntdProps.className}
                    label={label} labelCol={labelCol} wrapperCol={wrapperCol}
                >
                    {getFieldDecorator(iAntdProps.name, {
                        rules: rules,
                        /* valuePropName: 'checked', */
                    })(
                        <RadioGroup {...radioGroup}>
                            {radioButton && radioButton.options.map((item, index) => {
                                return <RadioButton key={`${item.value}${index}`} value={item.value}
                                    {...item}
                                >{item.label}</RadioButton>
                            })}
                            {radio && radio.options.map((item, index) => {
                                return <Radio {...item} key={`${item.value}${index}`} value={item.value}>{item.label}</Radio>
                            })}
                        </RadioGroup>
                    )}


                    {children}
                </FormItem>
            </FormElement>
        )
    }
}
