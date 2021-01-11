import React from 'react';
import { WrappedFormUtils, IAntdProps, IAntdFormItemProps, IAntdRule } from '../interface/antd';
import AbstractForm from './AbstractForm';
import { InstanceFormElement } from './interface/formElement';
import { TooltipProps } from 'antd/lib/tooltip';
export declare class LabelWithTextModel {
    iAntdProps: IAntdProps;
    iFormText: IFormTextProps;
    rules?: IAntdRule[];
    constructor(iAntdProps: IAntdProps, iFormText: IFormTextProps, rules?: IAntdRule[]);
}
export interface IFormTextProps extends IAntdFormItemProps {
    maxlen?: number;
}
interface IFormWithTextProps {
    iAntdProps: IAntdProps;
    form?: WrappedFormUtils;
    rules?: IAntdRule[];
    iFormText: IFormTextProps;
    /**
     * 表单生成的唯一uid
     *
     * @type {string}
     * @memberof IFormWithInputProps
     */
    formUid?: string;
}
interface IForm {
    form: WrappedFormUtils;
    formItemName: string;
    value: string;
    FormTextRef: InstanceFormElement;
    inputType: 'span';
    maxlen?: number;
    formUid: string;
}
export declare class TooltipText extends React.Component<TooltipProps & IForm> {
    constructor(props: any);
    render(): JSX.Element;
}
export default class FormText extends AbstractForm<IFormWithTextProps> {
    FormTextRef: InstanceFormElement;
    constructor(props: any);
    render(): JSX.Element;
}
export {};
