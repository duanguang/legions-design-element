import React from 'react';
import { WrappedFormUtils, InputProps, IAntdProps, IAntdFormItemProps, IAntdRule, TextAreaProps } from '../interface/antd';
import { IErrorView } from './interface';
import AbstractForm from './AbstractForm';
import { InstanceFormElement } from './interface/formElement';
import { TooltipProps } from 'antd/lib/tooltip';
import { InstanceProForm } from './interface/form';
export declare class LabelWithInputModel {
    iAntdProps: IAntdProps;
    iFormProps: IFormInputProps;
    rules?: IAntdRule[];
    constructor(iAntdProps: IAntdProps, iFormProps: IFormInputProps, rules?: IAntdRule[]);
}
export interface LabelWithInputPartialModel {
    iAntdProps?: IAntdProps;
    iFormInput?: IFormInputProps;
    rules?: IAntdRule[];
}
export interface IFormInputProps extends Omit<InputProps, 'onChange'>, TextAreaProps, IAntdFormItemProps {
    render?: (form: WrappedFormUtils, iAntdProps?: IAntdProps, rules?: IAntdRule[], 
    /**
     * 主体表单实例信息
     *
     * @memberof IFormRenderProps
     */
    formRef?: InstanceProForm) => JSX.Element;
    type?: 'textarea' | 'text' | 'number' | 'password';
    onChange?: (value: string) => void;
}
interface IFormWithInputProps {
    iAntdProps: IAntdProps;
    form?: WrappedFormUtils;
    rules?: IAntdRule[];
    iFormInput: IFormInputProps;
    /**
     * 表单生成的唯一uid
     *
     * @type {string}
     * @memberof IFormWithInputProps
     */
    formUid?: string;
    /**
     * 表单实例信息
     *
     * @type {string}
     * @memberof IFormWithInputProps
     */
    formStore?: InstanceProForm;
}
interface IForm {
    form: WrappedFormUtils;
    formItemName: string;
    type?: string;
    valueLen: number;
    FormInputRef: InstanceFormElement;
    inputType: 'textarea' | 'text' | 'number' | 'password';
    formUid: string;
    onIgnoreError?: (item: IErrorView) => void;
}
interface ITooltipInputProps extends InputProps, TextAreaProps, TooltipProps, IForm {
}
export declare class TooltipInput extends React.Component<ITooltipInputProps, {}> {
    constructor(props: any);
    handleOnChange(even: any): void;
    render(): JSX.Element;
}
export default class FormInput extends AbstractForm<IFormWithInputProps> {
    FormInputRef: InstanceFormElement;
    constructor(props: any);
    get store(): import("brain-store-utils/types/create-view-model").ViewModel<import("../LegionsStoreForm/proFormStore").HlFormView> & {
        _elementList: import("../LegionsStoreForm/interface").IObservableMap<string, import("../LegionsStoreForm/interface").IElementList>;
        focusUid: string;
        enableEnterSwitch: boolean;
        renderNodeQueue: import("../LegionsStoreForm/interface").IObservableMap<string, string>;
        _errorListView: import("../LegionsStoreForm/interface").IObservableMap<string, IErrorView[]>;
        readonly computedAllElementList: string[];
        readonly computedFormFields: (LabelWithInputModel | import("./FormInputNumber").LabelWithInputNumberModel | import("./interface").LabelWithSelectModel | import("./FormDatePicker").LabelWithDatePickerModel | import("./FormMonthPicker").LabelWithMonthPickerModel | import("./FormRangePicker").LabelWithRangePickerModel | import("./FormUpload").LabelWithUploadModel | import("./FormSwitch").LabelWithSwitchModel | import("./FormRadioButton").LabelWithRadioButtonModel | import("./FormText").LabelWithTextModel | import("./FormCascader").LabelWithCascaderModel | import("./FormCheckbox").LabelWithCheckboxModel)[];
        readonly computedAllFormFields: (LabelWithInputModel | import("./FormInputNumber").LabelWithInputNumberModel | import("./interface").LabelWithSelectModel | import("./FormDatePicker").LabelWithDatePickerModel | import("./FormMonthPicker").LabelWithMonthPickerModel | import("./FormRangePicker").LabelWithRangePickerModel | import("./FormUpload").LabelWithUploadModel | import("./FormSwitch").LabelWithSwitchModel | import("./FormRadioButton").LabelWithRadioButtonModel | import("./FormText").LabelWithTextModel | import("./FormCascader").LabelWithCascaderModel | import("./FormCheckbox").LabelWithCheckboxModel)[];
        readonly computedFormSize: "default" | "table" | "small";
        updateFormSize: (size: "default" | "table" | "small") => void;
        _addAllElementKeys: (keys: string) => void;
        getFormItemField: <T extends LabelWithInputModel | import("./FormInputNumber").LabelWithInputNumberModel | import("./interface").LabelWithSelectModel | import("./FormDatePicker").LabelWithDatePickerModel | import("./FormMonthPicker").LabelWithMonthPickerModel | import("./FormRangePicker").LabelWithRangePickerModel | import("./FormUpload").LabelWithUploadModel | import("./FormSwitch").LabelWithSwitchModel | import("./FormRadioButton").LabelWithRadioButtonModel | import("./FormText").LabelWithTextModel | import("./FormCascader").LabelWithCascaderModel | import("./FormCheckbox").LabelWithCheckboxModel>(key: string) => {
            value: T;
            type: "normal" | "custom";
        };
        removeFormItem: (key: string) => boolean;
        clearFormItem: () => void;
        _initFormItemField: (key: string, value: LabelWithInputModel | import("./FormInputNumber").LabelWithInputNumberModel | import("./interface").LabelWithSelectModel | import("./FormDatePicker").LabelWithDatePickerModel | import("./FormMonthPicker").LabelWithMonthPickerModel | import("./FormRangePicker").LabelWithRangePickerModel | import("./FormUpload").LabelWithUploadModel | import("./FormSwitch").LabelWithSwitchModel | import("./FormRadioButton").LabelWithRadioButtonModel | import("./FormText").LabelWithTextModel | import("./FormCascader").LabelWithCascaderModel | import("./FormCheckbox").LabelWithCheckboxModel, type?: "normal" | "custom") => void;
    } & import("../LegionsStoreForm/proFormStore").IOtherView;
    componentDidMount(): void;
    onChange(even: any): void;
    onPressEnter(even: any): void;
    onFocus(e: any): void;
    onBlur(even: any): void;
    shouldComponentUpdate(nextProps: IFormWithInputProps, nextState: any, context: any): boolean;
    render(): JSX.Element;
}
export {};
