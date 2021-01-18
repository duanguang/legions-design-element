import { WrappedFormUtils, IAntdProps, IAntdFormItemProps, IAntdRule, SwitchProps } from '../interface/antd';
import AbstractForm from './AbstractForm';
import { InstanceFormElement } from './interface/formElement';
export declare class LabelWithSwitchModel {
    iAntdProps: IAntdProps;
    iFormWithSwitch: IFormSwitchProps;
    rules?: IAntdRule[];
    constructor(iAntdProps: IAntdProps, iFormWithSwitch: IFormSwitchProps, rules?: IAntdRule[]);
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
export default class FormSwitch extends AbstractForm<IFormWithSwitch, ISate> {
    FormUploadRef: InstanceFormElement;
    constructor(props: any);
    render(): JSX.Element;
}
export {};
