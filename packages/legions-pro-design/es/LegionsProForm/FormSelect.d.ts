import { WrappedFormUtils, IAntdProps, IAntdFormItemProps, IAntdRule, SelectProps, IAntdSelectOption } from '../interface/antd';
import AbstractForm from './AbstractForm';
import { InstanceFormElement } from './interface/formElement';
export declare class LabelWithSelectModel {
    iAntdProps: IAntdProps;
    iFormWithSelect: IFormSelectProps;
    rules?: IAntdRule[];
    constructor(iAntdProps: IAntdProps, iFormWithSelect: IFormSelectProps, rules?: IAntdRule[]);
}
export interface IFormSelectProps extends SelectProps, IAntdFormItemProps {
    /**
     *
     * select 需要绑定的数据
     * @type {IAntdSelectOption[]}
     * @memberof IFormSelectProps
     */
    options: IAntdSelectOption[];
    optGroups?: Array<IOptGroupProps>;
    firstActiveValue?: string[] | string;
}
export interface IOptGroupProps {
    label: string | JSX.Element;
    key?: string;
}
interface IFormWithSelectProps {
    iAntdProps: IAntdProps;
    form: WrappedFormUtils;
    rules?: IAntdRule[];
    iFormWithSelect: IFormSelectProps;
    /**
     * 表单生成的唯一uid
     *
     * @type {string}
     * @memberof IFormWithInputProps
     */
    formUid: string;
}
export default class FormSelect extends AbstractForm<IFormWithSelectProps> {
    FormSelectRef: InstanceFormElement;
    constructor(props: any);
    renderOption(): JSX.Element[];
    onFocus(): void;
    render(): JSX.Element;
}
export {};
