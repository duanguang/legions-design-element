import React from 'react'

import { Form,Input } from 'antd';
import { WrappedFormUtils,IAntdProps,IAntdFormItemProps,IAntdRule } from '../interface/antd';
import { InstanceForm } from './interface/form';


/**
 * 使用Render模型自定义组件时，需要要主动用FormItem 包裹住自定义的组件
 *
 * @export
 * @class LabelWithRenderModel
 */
export class LabelWithRenderModel {

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
    constructor(public iAntdProps: IAntdProps,
        public iFormProps?: IFormRenderProps,
        public rules?: IAntdRule[],//验证规则
    ) {

    }
}
/**
 * 使用Render模型自定义组件时，需要要主动用FormItem 包裹住自定义的组件
 *
 * @export
 * @class LabelWithRenderModel
 */
export interface LabelWithRenderPartialModel {

    iAntdProps?: IAntdProps,
    iFormRender?: IFormRenderProps,
    rules?: IAntdRule[],//验证规则
}
export interface IFormRenderProps extends IAntdFormItemProps {
    render: (
        form: WrappedFormUtils,
        iAntdProps?: IAntdProps,
        rules?: IAntdRule[],
        /**
         * 主体表单实例信息
         *
         * @memberof IFormRenderProps
         */
        formRef?: InstanceForm) => JSX.Element
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
    // children?: React.ReactNode;
}
export default class FormRender extends React.Component<IFormWithRenderProps>{
    constructor(props) {
        super(props)
    }
    render() {
        const { form,iAntdProps,iFormRender,children,rules } = this.props;

        const { getFieldDecorator } = form;
        return iFormRender.render(form,iAntdProps,rules,this.props.formRef)
    }
}
