import { WrappedFormUtils, InputNumberProps, IAntdProps, IAntdFormItemProps, IAntdRule } from '../interface/antd';
import AbstractForm from './AbstractForm';
import { InstanceFormElement } from './interface/formElement';
export declare class LabelWithInputNumberModel {
    iAntdProps: IAntdProps;
    iFormProps: IFormInputNumberProps;
    rules?: IAntdRule[];
    constructor(iAntdProps: IAntdProps, iFormProps: IFormInputNumberProps, rules?: IAntdRule[]);
}
export interface LabelWithInputNumberPartialModel {
    iAntdProps?: IAntdProps;
    iFormInput?: IFormInputNumberProps;
    rules?: IAntdRule[];
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
    componentDidMount(): void;
    shouldComponentUpdate(nextProps: IFormWithInputNumberProps, nextState: any, context: any): boolean;
    render(): JSX.Element;
}
export {};
