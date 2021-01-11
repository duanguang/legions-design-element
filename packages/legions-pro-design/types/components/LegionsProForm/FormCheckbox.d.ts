import { WrappedFormUtils, IAntdProps, IAntdFormItemProps, IAntdRule, CheckboxGroupProps } from '../interface/antd';
import { Weaken } from '../interface';
import AbstractForm from './AbstractForm';
import { InstanceFormElement } from './interface/formElement';
export declare class LabelWithCheckboxModel {
    iAntdProps: IAntdProps;
    iFormWithCheckbox: IFormCheckboxProps;
    rules?: IAntdRule[];
    constructor(iAntdProps: IAntdProps, iFormWithCheckbox: IFormCheckboxProps, rules?: IAntdRule[]);
}
export interface IFormCheckboxProps extends Weaken<CheckboxGroupProps, 'options'>, CheckboxGroupProps, IAntdFormItemProps {
    options: {
        label: string;
        value: string;
        disabled?: boolean;
    }[];
}
interface IFormWithCheckbox {
    iAntdProps: IAntdProps;
    form: WrappedFormUtils;
    rules?: IAntdRule[];
    iFormWithCheckbox: IFormCheckboxProps;
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
export default class FormCheckbox extends AbstractForm<IFormWithCheckbox, ISate> {
    FormCheckboxRef: InstanceFormElement;
    constructor(props: any);
    render(): JSX.Element;
}
export {};
