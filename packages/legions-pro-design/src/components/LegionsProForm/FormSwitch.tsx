/**
 * Created by xiaoduan on 2016/12/1.
 */
import React from 'react';
import { Form, Switch, Button, Icon } from 'antd';
import { WrappedFormUtils, IAntdProps, IAntdFormItemProps, IAntdRule,SwitchProps } from '../interface/antd';
import AbstractForm from './AbstractForm';
import FormElement from './FormElement';
import { InstanceFormElement } from './interface/formElement';
const FormItem = Form.Item;

export class LabelWithSwitchModel {
    constructor(public iAntdProps: IAntdProps,
        public iFormProps: IFormSwitchProps,
        public rules?: IAntdRule[],
    ) {

    }
}
export interface LabelWithSwitchPartialModel {
    iAntdProps?: IAntdProps,
         iFormWithSwitch?: IFormSwitchProps,
         rules?: IAntdRule[],
}
export interface IFormSwitchProps extends SwitchProps, IAntdFormItemProps {
}

interface IFormWithSwitch {
    iAntdProps: IAntdProps;
    form: WrappedFormUtils;
    rules?: IAntdRule[];
    iFormWithSwitch: IFormSwitchProps;
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
export default class FormSwitch extends AbstractForm<IFormWithSwitch, ISate>{
    FormSwitchRef: InstanceFormElement = null
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentDidMount() {
        this.didMountClearNodeQueue(this.FormSwitchRef,this.props.formUid,this.props.iAntdProps.name)
    }
    shouldComponentUpdate(nextProps:IFormWithSwitch,nextState,context) {
       return this.isShouldComponentUpdate(this.FormSwitchRef,this.props.formUid,nextProps.iAntdProps.name)
    }
    public render() {
        const { form, iAntdProps, iFormWithSwitch, children, rules } = this.props;
        const { getFieldsError, getFieldDecorator } = form;
        const { label,labelCol,wrapperCol,...props } = iFormWithSwitch
        let formItemProps = {};
        if ('colon' in props) {
            formItemProps['colon'] = props.colon;
        }
        return (
            <FormElement form={form}
                onReady={(value) => {
                    this.FormSwitchRef = value
                }}
                nextElementKey={iAntdProps.nextElementKey}
                elType="button"
                elementKey={iAntdProps.name} formUid={this.props.formUid}>
                <FormItem
                    {...formItemProps}
                    className={iAntdProps.className}
                    label={label} labelCol={labelCol} wrapperCol={wrapperCol}
                >
                    {getFieldDecorator(iAntdProps.name, {
                        rules: rules,
                        valuePropName: 'checked',
                    })(
                        <Switch
                            {...props}
                        >
                        </Switch>
                    )}


                    {children}
                </FormItem>
            </FormElement>
        )
    }
}
