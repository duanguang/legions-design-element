import { WrappedFormUtils, InputNumberProps, IAntdProps, IAntdFormItemProps, IAntdRule } from '../interface/antd';
import AbstractForm from './AbstractForm';
import { InstanceFormElement } from './interface/formElement';
export declare class LabelWithInputNumberModel {
    iAntdProps: IAntdProps;
    iFormInput: IFormInputNumberProps;
    rules?: IAntdRule[];
    constructor(iAntdProps: IAntdProps, iFormInput: IFormInputNumberProps, rules?: IAntdRule[]);
}
export interface IFormInputNumberProps extends InputNumberProps, IAntdFormItemProps {
    render?: (form: WrappedFormUtils) => JSX.Element;
    onBlur?: () => void;
    onFocus?: (e: any) => void;
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
    formUid: string;
}
export default class FormInputNumber extends AbstractForm<IFormWithInputNumberProps> {
    FormInputNumberRef: InstanceFormElement;
    constructor(props: any);
    onFocus(e: any): void;
    render(): JSX.Element;
}
export {};
