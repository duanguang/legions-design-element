/*
 * @Author: duanguang
 * @Date: 2020-12-29 10:09:16
 * @LastEditTime: 2022-02-25 17:25:57
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/LegionsProForm/interface/select.ts
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
import { IProSelectProps,LabeledValue } from '../../LegionsProSelect/interface';
import {  ObservablePromiseModel } from 'legions/store-utils'
import {
    WrappedFormUtils,
    InputProps,
    IAntdProps,
    IAntdFormItemProps,
    IAntdRule,
    SelectProps,
    IAntdSelectOption
} from '../../interface/antd';
import { InstanceFormElement } from './formElement';
import { IErrorView,InstanceProForm } from './form';
//@ts-ignore
export interface IFormSelectProps extends IProSelectProps,IAntdFormItemProps {

    /**
     *
     * select 需要绑定的数据
     * @type {IAntdSelectOption[]}
     * @memberof IFormSelectProps
     */
    options?: IAntdSelectOption[]
    optGroups?: Array<IOptGroupProps>
    firstActiveValue?: string[] | string
}
export class LabelWithSelectModel {
    constructor(public iAntdProps: IAntdProps,
        public iFormProps: IFormSelectProps,
        public rules?: IAntdRule[]) {

    }
}


export interface IOptGroupProps {
    label: string | JSX.Element;
    key?: string
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
    formItemName: string
    formHLSelectRef: InstanceFormElement,
    formUid: string;
    onIgnoreError?: (item: IErrorView) => void
}