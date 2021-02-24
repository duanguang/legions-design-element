import React from 'react';
import { IProSelectProps, LabeledValue } from '../LegionsProSelect/interface';
import AbstractForm from './AbstractForm';
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
export default class FormSelect extends AbstractForm<IFormWithSelectProps, IState> {
    FormHLSelectRef: InstanceFormElement;
    constructor(props: any);
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
    shouldComponentUpdate(nextProps: IFormWithSelectProps, nextState: any, context: any): boolean;
    render(): JSX.Element;
}
export {};
