/**
 * Created by xiaoduan on 2016/12/1.
 */
import React from 'react';
import { Form,Upload,Button,Icon } from 'antd';
import { WrappedFormUtils,IAntdProps,IAntdFormItemProps,IAntdRule } from '../interface/antd';
import AbstractForm from './AbstractForm';
import FormElement from './FormElement';
import { InstanceFormElement } from './interface/formElement';
import LegionsProUpload from '../LegionsProUpload';
import {IProUploadProps} from '../LegionsProUpload/interface'
const FormItem = Form.Item;

export class LabelWithUploadModel {
    constructor(public iAntdProps: IAntdProps,
        public iFormWithUpload: IFormUploadProps,
        public rules?: IAntdRule[],
    ) {

    }
}
export interface IFormUploadProps extends IProUploadProps,IAntdFormItemProps {
}

interface IFormWithUpload {
    iAntdProps: IAntdProps;
    form: WrappedFormUtils;
    rules?: IAntdRule[];
    iFormWithUpload: IFormUploadProps;
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
export default class FormUpload extends AbstractForm<IFormWithUpload,ISate>{
    FormUploadRef: InstanceFormElement = null
    constructor(props) {
        super(props);
        this.state = {
            previewImage: '',
            fileList: [{
                uid: -1,
                name: 'xxx.png',
                status: 'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            }]
        }
    }
    handlePreview = (file) => {

    }
    draggerThem() {

    }
    public render() {
        const { form,iAntdProps,iFormWithUpload,children,rules } = this.props;
        const { getFieldsError,getFieldDecorator } = form;
        const { label,labelCol,wrapperCol,...props } = iFormWithUpload
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
                        <LegionsProUpload
                            {...props}
                        >
                        </LegionsProUpload>
                    )}


                    {children}
                </FormItem>
            </FormElement>
        )
    }
}
