import { WrappedFormUtils, IAntdProps, IAntdFormItemProps, IAntdRule, MonthPickerProps } from '../interface/antd';
import AbstractForm from './AbstractForm';
import { InstanceFormElement } from './interface/formElement';
export declare class LabelWithMonthPickerModel {
    iAntdProps: IAntdProps;
    iFormMonthPicker: IFormMonthPickerProps;
    rules?: IAntdRule[];
    constructor(iAntdProps: IAntdProps, iFormMonthPicker: IFormMonthPickerProps, rules?: IAntdRule[]);
}
export interface IFormMonthPickerProps extends MonthPickerProps, IAntdFormItemProps {
}
export interface IFormWithMonthPickerProps {
    form: WrappedFormUtils;
    iAntdProps: IAntdProps;
    rules?: IAntdRule[];
    iFormMonthPicker: IFormMonthPickerProps;
    /**
     * 表单生成的唯一uid
     *
     * @type {string}
     * @memberof IFormWithInputProps
     */
    formUid: string;
}
export default class FormMonthPicker extends AbstractForm<IFormWithMonthPickerProps> {
    FormMonthPickerRef: InstanceFormElement;
    constructor(props: any);
    onOpenChange(status: any): void;
    render(): JSX.Element;
}
