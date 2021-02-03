import { WrappedFormUtils, IAntdProps, IAntdFormItemProps, IAntdRule } from '../interface/antd';
import AbstractForm from './AbstractForm';
import { InstanceFormElement } from './interface/formElement';
import { IProUploadProps } from '../LegionsProUpload/interface';
export declare class LabelWithUploadModel {
    iAntdProps: IAntdProps;
    iFormProps: IFormUploadProps;
    rules?: IAntdRule[];
    constructor(iAntdProps: IAntdProps, iFormProps: IFormUploadProps, rules?: IAntdRule[]);
}
export interface LabelWithUploadPartialModel {
    iAntdProps?: IAntdProps;
    iFormWithUpload?: IFormUploadProps;
    rules?: IAntdRule[];
}
export interface IFormUploadProps extends IProUploadProps, IAntdFormItemProps {
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
    previewImage: string;
    fileList: IFileList[];
}
interface IFileList {
    uid: number;
    name: string;
    status: string;
    url: string;
}
export default class FormUpload extends AbstractForm<IFormWithUpload, ISate> {
    FormUploadRef: InstanceFormElement;
    constructor(props: any);
    handlePreview: (file: any) => void;
    componentDidMount(): void;
    shouldComponentUpdate(nextProps: IFormWithUpload, nextState: any, context: any): boolean;
    render(): JSX.Element;
}
export {};
