/**
 * Created by xiaoduan on 2016/12/1.
 */
import React from 'react';
import { Form, Switch, Button, Icon } from 'antd';
import { WrappedFormUtils,IAntdProps,IAntdFormItemProps,IAntdRule } from '../interface/antd';
import {Weaken,Omit} from '../interface'
import { SwitchProps } from '../interface/antd';
import AbstractForm from './AbstractForm';
import FormElement from './FormElement';
import { InstanceFormElement} from './interface/formElement'
import {IProTableProps} from '../LegionsProTable/interface'
const FormItem = Form.Item;

export class LabelWithHLTableModel {
    constructor(public iAntdProps: IAntdProps,
        public iFormWithTable: IFormHLTableProps,
        public rules?: IAntdRule[],
    ) {

    }
}
export interface IFormHLTableProps extends Partial<Pick<IProTableProps, 'uniqueKey' | 'total' | 'onPagingQuery' | 'loading'>>, Omit<IProTableProps, 'uniqueKey' | 'total' | 'onPagingQuery' | 'loading'>, IAntdFormItemProps {

}

interface IFormWithSwitch {
    iAntdProps: IAntdProps;
    form: WrappedFormUtils;
    rules?: IAntdRule[];
    iFormWithTable: IFormHLTableProps;
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
export default class FormHLTable extends AbstractForm<IFormWithSwitch, ISate>{
    FormUploadRef: InstanceFormElement = null
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    public render() {
        const { form, iAntdProps, iFormWithTable, children, rules } = this.props;
        const { getFieldsError, getFieldDecorator } = form;
        const { label, labelCol, wrapperCol, ...props } = iFormWithTable
        return (
            <FormElement form={form}
                onReady={(value) => {
                    this.FormUploadRef = value
                }}
                elType="button"
                elementKey={iAntdProps.name} formUid={this.props.formUid}>
                {/* <FormItem
                    className={iAntdProps.className}
                    label={label} labelCol={labelCol} wrapperCol={wrapperCol}
                >
                    {getFieldDecorator(iAntdProps.name, {
                        rules: rules,
                        valuePropName: 'checked',
                    })(
                        <HLTable
                            loading={false}
                            {...props}
                        >
                        </HLTable>
                    )}


                    {children}
                </FormItem> */}
            </FormElement>
        )
    }
}
