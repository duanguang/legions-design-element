import { IProSelectProps } from '../../LegionsProSelect/interface';
import { WrappedFormUtils, IAntdProps, IAntdFormItemProps, IAntdRule, IAntdSelectOption } from '../../interface/antd';
import { InstanceFormElement } from './formElement';
import { IErrorView, InstanceProForm } from './form';
export interface IFormSelectProps extends IProSelectProps, IAntdFormItemProps {
    /**
     *
     * select 需要绑定的数据
     * @type {IAntdSelectOption[]}
     * @memberof IFormSelectProps
     */
    options?: IAntdSelectOption[];
    optGroups?: Array<IOptGroupProps>;
    firstActiveValue?: string[] | string;
}
export declare class LabelWithSelectModel {
    iAntdProps: IAntdProps;
    iFormProps: IFormSelectProps;
    rules?: IAntdRule[];
    constructor(iAntdProps: IAntdProps, iFormProps: IFormSelectProps, rules?: IAntdRule[]);
}
export interface IOptGroupProps {
    label: string | JSX.Element;
    key?: string;
}
export interface IFormWithSelectProps {
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
    formStore?: InstanceProForm;
}
export interface IFormSelectWrapError {
    formItemName: string;
    formHLSelectRef: InstanceFormElement;
    formUid: string;
    onIgnoreError?: (item: IErrorView) => void;
}
