import React from 'react';
import { IProSelectProps, LabeledValue } from '../LegionsProSelect/interface';
import { AbstractSelectForm } from './AbstractForm';
import { InstanceFormElement } from './interface/formElement';
import { IFormSelectProps, IFormSelectWrapError, IFormWithSelectProps } from './interface/select';
export declare class HLSelectWrapError extends React.Component<IFormSelectProps & IProSelectProps & IFormSelectWrapError> {
    render(): JSX.Element;
}
interface IState {
    open?: boolean;
    /**
     *
     * 获得焦点时的样式名称
     *
     * 只在默认下拉框生效
     *
     * 排除mode: 'multiple' | 'tags' | 'combobox'
     * @type {string}
     * @memberof IState
     */
    styleClassFocus?: string;
}
export default class FormHLSelect extends AbstractSelectForm<IFormWithSelectProps, IState> {
    FormHLSelectRef: InstanceFormElement;
    constructor(props: any);
    /**
     *
     * 开启labelInValue 时检测当value 为空字符串或者null 时自动进行转换，防止select解析对象报错
     * @returns
     * @memberof FormHLSelect
     */
    checkSelectValue(): void;
    translabelInValue(value: any, options?: import("../interface/antd").IAntdSelectOption[]): LabeledValue[] | LabeledValue;
    componentDidMount(): void;
    componentWillUnmount(): void;
    bindCopyKeydown(): void;
    handleCopyKeydown(event: any): void;
    onFocus(): void;
    onBlur(): void;
    onSelect(value: any, option: any): void;
    onSearch(value: string): void;
    onClear: () => void;
    onChange(even: any): void;
    onPagingQuery: (pageIndex: number, pageSize: number, value?: string | string[] | number[] | LabeledValue | LabeledValue[]) => void;
    render(): JSX.Element;
}
export {};
