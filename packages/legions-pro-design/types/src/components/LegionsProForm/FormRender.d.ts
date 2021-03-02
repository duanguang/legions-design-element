import React from 'react';
import { WrappedFormUtils, IAntdProps, IAntdFormItemProps, IAntdRule } from '../interface/antd';
import { InstanceForm } from './interface/form';
/**
 * 使用Render模型自定义组件时，需要要主动用FormItem 包裹住自定义的组件
 *
 * @export
 * @class LabelWithRenderModel
 */
export declare class LabelWithRenderModel {
    iAntdProps: IAntdProps;
    iFormProps?: IFormRenderProps;
    rules?: IAntdRule[];
    /**
     * 使用Render模型自定义组件时，需要要主动用FormItem 包裹住自定义的组件
     *  示例：<HLFormItem {...IAntdProps} {...IFormRenderProps} form={form} rules={IAntdRule}  itemName={IAntdProps.name}  >
                   <自定义组件 values={value.value}></自定义组件>
               </HLFormItem>
     * @param {IAntdProps} iAntdProps
     * @param {IFormRenderProps} [iFormRender]
     * @param {IAntdRule[]} [rules]
     * @memberof LabelWithRenderModel
     */
    constructor(iAntdProps: IAntdProps, iFormProps?: IFormRenderProps, rules?: IAntdRule[]);
}
/**
 * 使用Render模型自定义组件时，需要要主动用FormItem 包裹住自定义的组件
 *
 * @export
 * @class LabelWithRenderModel
 */
export interface LabelWithRenderPartialModel {
    iAntdProps?: IAntdProps;
    iFormRender?: IFormRenderProps;
    rules?: IAntdRule[];
}
export interface IFormRenderProps extends IAntdFormItemProps {
    render: (form: WrappedFormUtils, iAntdProps?: IAntdProps, rules?: IAntdRule[], 
    /**
     * 主体表单实例信息
     *
     * @memberof IFormRenderProps
     */
    formRef?: InstanceForm) => JSX.Element;
}
interface IFormWithRenderProps {
    iAntdProps: IAntdProps;
    form?: WrappedFormUtils;
    rules?: IAntdRule[];
    iFormRender: IFormRenderProps;
    /**
     * 表单实例信息
     *
     * @type {string}
     * @memberof IFormWithInputProps
     */
    formRef: InstanceForm;
}
export default class FormRender extends React.Component<IFormWithRenderProps> {
    constructor(props: any);
    render(): JSX.Element;
}
export {};
