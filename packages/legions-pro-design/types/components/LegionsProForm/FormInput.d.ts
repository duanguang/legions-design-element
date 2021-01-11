import React from 'react';
import { WrappedFormUtils, InputProps, IAntdProps, IAntdFormItemProps, IAntdRule, TextAreaProps } from '../interface/antd';
import { IErrorView } from './interface';
import AbstractForm from './AbstractForm';
import { InstanceFormElement } from './interface/formElement';
import { TooltipProps } from 'antd/lib/tooltip';
import { InstanceForm } from './interface/form';
export declare class LabelWithInputModel {
    iAntdProps: IAntdProps;
    iFormInput: IFormInputProps;
    rules?: IAntdRule[];
    constructor(iAntdProps: IAntdProps, iFormInput: IFormInputProps, rules?: IAntdRule[]);
}
export interface IFormInputProps extends Omit<InputProps, 'onChange'>, TextAreaProps, IAntdFormItemProps {
    render?: (form: WrappedFormUtils, iAntdProps?: IAntdProps, rules?: IAntdRule[], 
    /**
     * 主体表单实例信息
     *
     * @memberof IFormRenderProps
     */
    formRef?: InstanceForm) => JSX.Element;
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
    formStore?: InstanceForm;
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
export declare class TooltipInput extends React.Component<InputProps & TextAreaProps & TooltipProps & IForm, {
    value: string;
}> {
    constructor(props: any);
    onChanges: () => void;
    handleOnChange(even: any): void;
    componentWillReceiveProps(nextProps: any): void;
    render(): JSX.Element;
}
export default class FormInput extends AbstractForm<IFormWithInputProps> {
    FormInputRef: InstanceFormElement;
    constructor(props: any);
    get store(): import("brain-store-utils").ViewModel<import("../store/pro.form/proFormStore").HlFormView> & {
        elementList: import("../store/pro.form/interface").IObservableMap<string, import("../store/pro.form/interface").IElementList>;
        focusUid: string;
        enableEnterSwitch: boolean;
        nodeCount: number;
        controls: any[];
        errorReactNodeList: import("../store/pro.form/interface").IObservableMap<string, import("brain-store-utils").ViewModel<import("../store/pro.form/proFormStore").ErrorViewModel> & {
            uid: string;
            validateStatus: "" | "error";
        }>;
        errorListView: import("../store/pro.form/interface").IObservableMap<string, IErrorView[]>;
        readonly computedErrorReactNodeList: import("../store/pro.form/interface").IObservableMap<string, import("brain-store-utils").ViewModel<import("../store/pro.form/proFormStore").ErrorViewModel> & {
            uid: string;
            validateStatus: "" | "error";
        }>;
        readonly computedAllElementList: string[];
        readonly computedErrorListView: IErrorView[];
        readonly styleSize: "default" | "small" | "table";
        readonly computedFormState: import("../store/pro.form/interface").IObservableMap<string, import("../store/pro.form/proFormStore").IFormState>;
        updateStyleSize: (size: "default" | "small" | "table") => void;
        collectErrorReactNode: (componentCode: string, errorUid: string) => void;
        setErrorErrorReactNodeList: (componentCode: string, errorListView: IErrorView[]) => void;
        handleIgnore: (componentCode: string, id: number) => void;
        addAllElementKeys: (keys: string) => void;
        initFormState: (name: string) => void;
        setFormState: (name: string, state: import("../store/pro.form/proFormStore").IFormState) => void;
    } & import("../store/pro.form/proFormStore").IOtherView;
    onChange(even: any): void;
    onPressEnter(even: any): void;
    onFocus(e: any): void;
    onBlur(even: any): void;
    render(): JSX.Element;
}
export {};
