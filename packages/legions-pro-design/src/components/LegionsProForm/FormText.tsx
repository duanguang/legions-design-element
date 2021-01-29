import React from 'react'
import { Form,Tooltip } from 'antd';
import { WrappedFormUtils,IAntdProps,IAntdFormItemProps,IAntdRule,TextAreaProps } from '../interface/antd';
import AbstractForm from './AbstractForm';
import FormElement from './FormElement';
import { InstanceFormElement } from './interface/formElement';
import LegionsProErrorReportShow from '../LegionsProErrorReportShow'
const FormItem = Form.Item;
import classNames from 'classnames';
import { TooltipProps } from 'antd/lib/tooltip'
/* import { debounce as debounces } from 'lodash' */
export class LabelWithTextModel {
    constructor(public iAntdProps: IAntdProps,
        public iFormProps: IFormTextProps,
        public rules?: IAntdRule[],//验证规则
    ) {

    }
}
export interface LabelWithTextPartialModel {
    iAntdProps?: IAntdProps,
         iFormText?: IFormTextProps,
         rules?: IAntdRule[],//验证规则
}
export interface IFormTextProps extends IAntdFormItemProps {
    maxlen?: number
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
    formItemName: string
    value: string;
    FormTextRef: InstanceFormElement;
    inputType: 'span',
    maxlen?: number,
    formUid: string;
}
export class TooltipText extends React.Component<TooltipProps & IForm>{
    constructor(props) {
        super(props)
    }
    render() {
        const { form,FormTextRef,inputType,...props } = this.props;
        let isShowErrorView = false;
        if (FormTextRef && this.props.formUid) {
            const viewStore = FormTextRef.store.get(this.props.formUid)
            if (viewStore.computedErrorReactNodeList.has(this.props.formItemName)) {
                const uid = viewStore.computedErrorReactNodeList.get(this.props.formItemName).uid
                isShowErrorView = viewStore.errorListView.has(uid)
            }
        }
        const { getFieldDecorator,getFieldsError,setFieldsValue } = form;
        let iconStyle = {}
        isShowErrorView && (iconStyle = { marginRight: '18px' })
        return (
            <LegionsProErrorReportShow
                code={this.props.formItemName}
                formUid={this.props.formUid}
                errorClassName={
                    classNames({
                        [`tip-icon-input`]: true,
                        [`tip-icon-right-0`]: (this.props.value) ? true : false,
                    })}>
                <Tooltip
                    trigger={'click'}
                    title={this.props.value}
                    placement="topLeft"
                    overlayStyle={{ wordWrap: 'break-word' }}
                >
                    <span style={{
                        overflow: 'hidden',width: '100%',textOverflow: 'ellipsis',whiteSpace: 'nowrap',display: 'block'
                    }}>{this.props.value}</span>
                </Tooltip>
            </LegionsProErrorReportShow>
        )
    }
}
export default class FormText extends AbstractForm<IFormWithTextProps>{
    FormTextRef: InstanceFormElement = null
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        this.didMountClearNodeQueue(this.FormTextRef,this.props.formUid,this.props.iAntdProps.name)
    }
    shouldComponentUpdate(nextProps:IFormWithTextProps,nextState,context) {
       return this.isShouldComponentUpdate(this.FormTextRef,this.props.formUid,nextProps.iAntdProps.name)
    }
    render() {
        const { form,iAntdProps,iFormText,children,rules } = this.props;
        const { getFieldDecorator,getFieldsError,setFieldsValue } = form;
        const { label,labelCol,wrapperCol,...props } = iFormText
        let formItemProps = {};
        if ('colon' in props) {
            formItemProps['colon'] = props.colon;
        }
        return (
            <FormElement form={form} 
                onReady={(value)=>{
                    this.FormTextRef = value
                }}
                nextElementKey={iAntdProps.nextElementKey}
                elementKey={iAntdProps.name} 
                formUid={this.props.formUid}>
            <FormItem
                {...formItemProps}
                extra={iFormText.extra}
                className={iAntdProps.className}
                label={iFormText.label}
                labelCol={iFormText.labelCol}
                wrapperCol={iFormText.wrapperCol}
            >
                {getFieldDecorator(iAntdProps.name,{
                    rules: rules,
                    normalize: (value: any,prevValue,allValues) => {
                        return value && value.toString()
                    },
                })(
                    <TooltipText
                        {...props}
                        formUid={this.props.formUid}
                        FormTextRef={this.FormTextRef}
                        value={form.getFieldValue(iAntdProps.name)}
                        formItemName={iAntdProps.name}
                        form={form}
                        inputType={'span'}>

                    </TooltipText>
                )}
                {children}
            </FormItem>
            </FormElement>
        )
    }
}
