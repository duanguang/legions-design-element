import { WrappedFormUtils, IAntdProps, IAntdFormItemProps, IAntdRule, RangePickerProps } from '../interface/antd';
import AbstractForm from './AbstractForm';
import { InstanceFormElement } from './interface/formElement';
export declare class LabelWithRangePickerModel {
    iAntdProps: IAntdProps;
    iFormProps: IFormRangePickerProps;
    rules?: IAntdRule[];
    constructor(iAntdProps: IAntdProps, iFormProps: IFormRangePickerProps, rules?: IAntdRule[]);
}
export interface LabelWithRangePickerPartialModel {
    iAntdProps?: IAntdProps;
    iFormRangePicker?: IFormRangePickerProps;
    rules?: IAntdRule[];
}
export interface IFormRangePickerProps extends RangePickerProps, IAntdFormItemProps {
}
export interface IFormWithRangePickerProps {
    form: WrappedFormUtils;
    iAntdProps: IAntdProps;
    rules?: IAntdRule[];
    iFormRangePicker: IFormRangePickerProps;
    /**
     * 表单生成的唯一uid
     *
     * @type {string}
     * @memberof IFormWithInputProps
     */
    formUid: string;
}
export default class FormRangePicker extends AbstractForm<IFormWithRangePickerProps> {
    FormRangePickerRef: InstanceFormElement;
    constructor(props: any);
    onOpenChange(status: any): void;
    componentDidMount(): void;
    shouldComponentUpdate(nextProps: IFormWithRangePickerProps, nextState: any, context: any): boolean;
    render(): JSX.Element;
}
