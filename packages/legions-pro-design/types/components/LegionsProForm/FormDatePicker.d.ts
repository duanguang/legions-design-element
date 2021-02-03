import { WrappedFormUtils, IAntdProps, IAntdFormItemProps, IAntdRule, DatePickerProps } from '../interface/antd';
import AbstractForm from './AbstractForm';
import { InstanceFormElement } from './interface/formElement';
export declare class LabelWithDatePickerModel {
    iAntdProps: IAntdProps;
    iFormProps: IFormDatePickerProps;
    rules?: IAntdRule[];
    constructor(iAntdProps: IAntdProps, iFormProps: IFormDatePickerProps, rules?: IAntdRule[]);
}
export interface LabelWithDatePickerPartialModel {
    iAntdProps?: IAntdProps;
    iFormDatePicker?: IFormDatePickerProps;
    rules?: IAntdRule[];
}
export interface IFormDatePickerProps extends DatePickerProps, IAntdFormItemProps {
}
export interface IFormWithDatePickerProps {
    form: WrappedFormUtils;
    iAntdProps: IAntdProps;
    rules?: IAntdRule[];
    iFormDatePicker: IFormDatePickerProps;
    /**
     * 表单生成的唯一uid
     *
     * @type {string}
     * @memberof IFormWithInputProps
     */
    formUid: string;
}
export default class FormDatePicker extends AbstractForm<IFormWithDatePickerProps> {
    FormDatePickerRef: InstanceFormElement;
    constructor(props: any);
    onOpenChange(status: boolean): void;
    componentDidMount(): void;
    shouldComponentUpdate(nextProps: IFormWithDatePickerProps, nextState: any, context: any): boolean;
    render(): JSX.Element;
}
