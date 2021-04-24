/**
 * Created by xiaoduan on 2016/12/1.
 */
import React from 'react';
import { Form,Upload,Button,Icon,Cascader } from 'antd';
import { WrappedFormUtils,IAntdProps,IAntdFormItemProps,IAntdRule } from '../interface/antd';
import AbstractForm from './AbstractForm';
import FormElement from './FormElement';
import { InstanceFormElement } from './interface/formElement';
import { CascaderProps } from 'antd/lib/cascader';
const FormItem = Form.Item;

export class LabelWithCascaderModel {
    constructor(public iAntdProps: IAntdProps,
        public iFormProps: IFormCascaderProps,
        public rules?: IAntdRule[],
    ) {

    }
}
export interface LabelWithCascaderPartialModel {
    iAntdProps?: IAntdProps,
    iFormProps?: IFormCascaderProps,
    rules?: IAntdRule[],
}
export interface IFormCascaderProps extends CascaderProps,IAntdFormItemProps {
}

interface IFormWithCascader {
    iAntdProps: IAntdProps;
    form: WrappedFormUtils;
    rules?: IAntdRule[];
    iFormWithCascader: IFormCascaderProps;
    /**
     * 表单生成的唯一uid
     *
     * @type {string}
     * @memberof IFormWithInputProps
     */
    formUid: string;
}
interface ISate {
    previewImage: string
    fileList: IFileList[],
}
interface IFileList {
    uid: number
    name: string
    status: string
    url: string
}
export default class FormCascader extends AbstractForm<IFormWithCascader,ISate>{
    FormUploadRef: InstanceFormElement = null
    constructor(props) {
        super(props);
    }
    handlePreview = (file) => {

    }
    componentDidMount() {
        this.didMountClearNodeQueue(this.FormUploadRef,this.props.formUid,this.props.iAntdProps.name)
    }
    shouldComponentUpdate(nextProps:IFormWithCascader,nextState,context) {
       return this.isShouldComponentUpdate(this.FormUploadRef,this.props.formUid,nextProps.iAntdProps.name)
    }
    public render() {
        const { form,iAntdProps,iFormWithCascader,children,rules } = this.props;
        const { getFieldsError,getFieldDecorator } = form;
        const { label,labelCol,wrapperCol,...props } = iFormWithCascader
        let formItemProps = {};
        if ('colon' in props) {
            formItemProps['colon'] = props.colon;
        }
        return (
            <FormElement form={form}
                onReady={(value) => {
                    this.FormUploadRef = value
                }}
                elType=""
                nextElementKey={iAntdProps.nextElementKey}
                elementKey={iAntdProps.name} formUid={this.props.formUid}>
                <FormItem
                    {...formItemProps}
                    className={iAntdProps.className}
                    label={label} labelCol={labelCol} wrapperCol={wrapperCol}
                >
                    {getFieldDecorator(iAntdProps.name,{
                        rules: rules,
                    })(
                        <Cascader
                            {...props}
                        >
                        </Cascader>
                    )}


                    {children}
                </FormItem>
            </FormElement>
        )
    }
}
