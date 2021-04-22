import { WrappedFormUtils, IAntdProps, IAntdFormItemProps, IAntdRule } from '../interface/antd';
import AbstractForm from './AbstractForm';
import { InstanceFormElement } from './interface/formElement';
import { CascaderProps } from 'antd/lib/cascader';
export declare class LabelWithCascaderModel {
    iAntdProps: IAntdProps;
    iFormProps: IFormCascaderProps;
    rules?: IAntdRule[];
    constructor(iAntdProps: IAntdProps, iFormProps: IFormCascaderProps, rules?: IAntdRule[]);
}
export interface LabelWithCascaderPartialModel {
    iAntdProps?: IAntdProps;
    iFormProps?: IFormCascaderProps;
    rules?: IAntdRule[];
}
export interface IFormCascaderProps extends CascaderProps, IAntdFormItemProps {
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
    previewImage: string;
    fileList: IFileList[];
}
interface IFileList {
    uid: number;
    name: string;
    status: string;
    url: string;
}
export default class FormCascader extends AbstractForm<IFormWithCascader, ISate> {
    FormUploadRef: InstanceFormElement;
    constructor(props: any);
    handlePreview: (file: any) => void;
    componentDidMount(): void;
    shouldComponentUpdate(nextProps: IFormWithCascader, nextState: any, context: any): boolean;
    render(): JSX.Element;
}
export {};
