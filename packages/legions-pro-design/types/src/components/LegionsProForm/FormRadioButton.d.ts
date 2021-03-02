import { WrappedFormUtils, IAntdProps, IAntdFormItemProps, IAntdRule, RadioButtonProps, RadioGroupProps, RadioProps } from '../interface/antd';
import AbstractForm from './AbstractForm';
import { InstanceFormElement } from './interface/formElement';
export declare class LabelWithRadioButtonModel {
    iAntdProps: IAntdProps;
    iFormProps: IFormRadioButtonProps;
    rules?: IAntdRule[];
    constructor(iAntdProps: IAntdProps, iFormProps: IFormRadioButtonProps, rules?: IAntdRule[]);
}
export interface LabelWithRadioButtonPartialModel {
    iAntdProps?: IAntdProps;
    iFormWithRadioButton?: IFormRadioButtonProps;
    rules?: IAntdRule[];
}
export interface IFormRadioButtonProps extends IAntdFormItemProps {
    radioButton?: {
        options: ({
            label: string;
            value: string;
        } & RadioButtonProps)[];
    };
    radio?: {
        options: ({
            label: string;
            value: string;
        } & RadioProps)[];
    };
    radioGroup?: RadioGroupProps;
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
export default class FormRadioButton extends AbstractForm<IFormWithRadioButton, ISate> {
    FormRadioButtonRef: InstanceFormElement;
    constructor(props: any);
    componentDidMount(): void;
    shouldComponentUpdate(nextProps: IFormWithRadioButton, nextState: any, context: any): boolean;
    render(): JSX.Element;
}
export {};
