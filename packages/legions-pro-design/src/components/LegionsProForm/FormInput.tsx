import React from 'react'
import { Form,Input,Tooltip,Icon,message } from 'antd';
import {
    WrappedFormUtils,
    InputProps,
    IAntdProps,
    IAntdFormItemProps,
    IAntdRule,
    TextAreaProps,
} from '../interface/antd';
import { IErrorView } from './interface';
import AbstractForm from './AbstractForm';
import { getStringLen } from 'legions-utils-tool/format.string'
/* import { debounce } from 'hoolinks/property' */
import { debounce } from 'legions-utils-tool/debounce'
import LegionsProNumericInput from '../LegionsProNumericInput';
import FormElement from './FormElement';
import {InstanceFormElement} from './interface/formElement'
import LegionsProErrorReportShow from '../LegionsProErrorReportShow'
const FormItem = Form.Item;
const { TextArea } = Input;
import Styles from './style/index.modules.less'
import classNames from 'classnames';
import { TooltipProps } from 'antd/lib/tooltip'
/* import { debounce as debounces } from 'lodash' */
import { InstanceForm } from './interface/form';
export class LabelWithInputModel {
    constructor(public iAntdProps: IAntdProps,
        public iFormInput: IFormInputProps,
        public rules?: IAntdRule[],//验证规则
    ) {

    }
}
export interface IFormInputProps extends Omit<InputProps,'onChange'>,TextAreaProps,IAntdFormItemProps {
    render?: (form: WrappedFormUtils,iAntdProps?: IAntdProps,
        rules?: IAntdRule[],
        /**
         * 主体表单实例信息
         *
         * @memberof IFormRenderProps
         */
        formRef?: InstanceForm) => JSX.Element,
    type?: 'textarea' | 'text' | 'number' | 'password',
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
    // children?: React.ReactNode;
}
interface IForm {
    form: WrappedFormUtils;
    formItemName: string
    type?: string;
    valueLen: number;
    FormInputRef: InstanceFormElement;
    inputType: 'textarea' | 'text' | 'number' | 'password',
    formUid: string;
    onIgnoreError?: (item: IErrorView) => void
}
export class TooltipInput extends React.Component<InputProps & TextAreaProps & TooltipProps & IForm,{ value: string }>{
    constructor(props) {
        super(props)
        this.state = {
            value: this.props.form.getFieldValue(this.props.formItemName),
        }
    }
    /* onChanges = (() => {
        let updb = this.props.onChange;
        if (200 >= 0) {
            updb = debounces((even,value) => {
                const event = 
                even.target = {value}
            console.log(even,value,even.target)    
            this.props.onChange&&this.props.onChange(value);
          }, 200);
        }
        return updb;
    })(); */
    onChanges = debounce((even,value) => {
        // @ts-ignore
        this.props.onChange && this.props.onChange(value);
    },200);
    handleOnChange(even) {
        const { target: { value } } = even;
        this.setState({ value });
        //@ts-ignore
        this.onChanges(even,value);
    };
    componentWillReceiveProps(nextProps) {
        if (this.props.value !== nextProps.value && typeof nextProps.value !== 'object') {
            this.setState({ value: nextProps.value })
        }
    }
    render() {
        const { form,name,valueLen,FormInputRef,inputType,type,...props } = this.props;
        let isShowErrorView = false;
        if (FormInputRef && this.props.formUid) {
            const viewStore = FormInputRef.store.get(this.props.formUid)
            if (viewStore.computedErrorReactNodeList.has(this.props.formItemName)) {
                const uid = viewStore.computedErrorReactNodeList.get(this.props.formItemName).uid
                isShowErrorView = viewStore.errorListView.has(uid)
            }
        }
        const { getFieldDecorator,getFieldsError,setFieldsValue } = form;
        let iconStyle = {}
        isShowErrorView && (iconStyle = { marginRight: '18px' })
        const theProps = {
            ...props,
            ...this.state,
        };
        theProps.onChange = this.handleOnChange.bind(this);
        const maxlen = parseInt(this.props.maxLength)
        return (
            <LegionsProErrorReportShow
                code={this.props.formItemName}
                formUid={this.props.formUid}
                onIgnoreError={this.props.onIgnoreError}
                errorClassName={
                    classNames({
                        [`${Styles.tipIconInput}`]: true,
                        [`${Styles['tipIcon-right-0']}`]: (this.state.value && !this.props.disabled) ? true : false,
                    })}>
                {this.props.inputType === 'number' ? <LegionsProNumericInput
                    {...theProps}></LegionsProNumericInput> : <Tooltip
                        /* trigger={'click'} */
                        mouseEnterDelay={1}
                        title={valueLen >= maxlen - 10 ? this.state.value : ''}
                        placement="topLeft"
                        overlayStyle={{ wordWrap: 'break-word' }}
                    >
                        <Input
                            {...theProps}
                            type={type}
                            suffix={(
                                <div>
                                    {(this.state.value && !this.props.disabled) && <Icon
                                        style={iconStyle}
                                        type="close-circle" onClick={() => {
                                            this.setState({
                                                value: '',
                                            })
                                            let fileName = {}
                                            fileName[this.props.formItemName] = ''
                                            setFieldsValue(fileName);
                                            form.validateFields([this.props.formItemName],{ force: true },() => void 0);
                                        }} />}

                                </div>
                            )} />
                    </Tooltip>}
            </LegionsProErrorReportShow>
        )
    }
}
export default class FormInput extends AbstractForm<IFormWithInputProps>{
    FormInputRef: InstanceFormElement = null
    constructor(props) {
        super(props)
    }
    get store() {
        if (this.props.formStore) {
            return this.props.formStore.store.get(this.props.formStore.uid)
        }
        return null
    }
    onChange(even) {
        const value = typeof even === 'object' ? even.target.value : even;
        this.props.iFormInput.onChange && this.props.iFormInput.onChange(value)
        if (this.FormInputRef && this.props.formUid) {
            const viewStore = this.FormInputRef.store.get(this.props.formUid)
            const view = viewStore.computedErrorReactNodeList.get(this.props.iAntdProps.name)
            if (view) {
                view.validateStatus = ''
            }
        }
    }
    onPressEnter(even) {
        const { form,iAntdProps,iFormInput,children,rules } = this.props;
        iFormInput && iFormInput.onPressEnter && iFormInput.onPressEnter(even)
    }
    onFocus(e) {
        const store = this.FormInputRef.store.get(this.props.formUid)
        if (store) {
            store.focusUid = this.FormInputRef.uid
        }
        /* const el = document.querySelector(`.${this.FormInputRef.uid}`); */
        const even = e.target
        even.select()
        this.props.iFormInput && this.props.iFormInput.onFocus && this.props.iFormInput.onFocus(e)
    }
    onBlur(even) {
        if (this.props.form && this.store && this.store.styleSize === 'table') {
            const error = this.props.form.getFieldError(this.props.iAntdProps.name)
            error && message.error(error,5)
        }
        this.props.iFormInput.onBlur && this.props.iFormInput.onBlur(even)
    }
    render() {
        const { form,iAntdProps,iFormInput,children,rules } = this.props;
        const { getFieldDecorator,getFieldsError,setFieldsValue } = form;
        let disabled = iFormInput && iFormInput.disabled;
        let addonAfter = iFormInput && iFormInput.addonAfter;
        let addonBefore = iFormInput && iFormInput.addonBefore;
        const { label,labelCol,wrapperCol,render,...props } = iFormInput
        const valueLen = getStringLen(form.getFieldValue(iAntdProps.name))
        const maxLength = iFormInput.maxLength ? parseInt(iFormInput.maxLength) : 50
        const placeholder = iAntdProps.placeholder || ''
        let formItemProps = {};
        if ('colon' in props) {
            formItemProps['colon'] = props.colon;
        }
        return (
            <FormElement form={form}
                onReady={(value) => {
                    this.FormInputRef = value
                }}
                elType={iFormInput.type === 'textarea' ? 'textarea' : 'input'}
                elementKey={iAntdProps.name}
                nextElementKey={iAntdProps.nextElementKey}
                formUid={this.props.formUid}>
                <FormItem
                    {...formItemProps}
                    extra={iFormInput.extra}
                    className={iAntdProps.className}
                    label={iFormInput.label}
                    labelCol={iFormInput.labelCol}
                    wrapperCol={iFormInput.wrapperCol}
                >
                    {getFieldDecorator(iAntdProps.name,{
                        rules: rules,
                        normalize: (value: any,prevValue,allValues) => {
                            return value && value.toString()
                        },
                    })(
                        iFormInput.type === 'textarea' ?
                            // @ts-ignore
                            <TextArea
                                {...props}
                                autosize={iFormInput.autosize === void 0 ? { minRows: 1,maxRows: 2 } : iFormInput.autosize}
                                onPressEnter={this.onPressEnter.bind(this)}
                                title={form.getFieldValue(iAntdProps.name)}
                                onFocus={this.onFocus.bind(this)}
                                maxLength={iFormInput.maxLength ? parseInt(iFormInput.maxLength) : 200}
                                placeholder={iFormInput.disabled ? '' : placeholder} /> :
                            <TooltipInput
                                type={iAntdProps.type}
                                {...props}
                                onIgnoreError={this.props.formStore && this.props.formStore.onIgnoreError}
                                formUid={this.props.formUid}
                                FormInputRef={this.FormInputRef}
                                value={form.getFieldValue(iAntdProps.name)}
                                maxLength={maxLength.toString()}
                                valueLen={valueLen}
                                formItemName={iAntdProps.name}
                                form={form}
                                inputType={iFormInput.type}
                                onPressEnter={this.onPressEnter.bind(this)}
                                disabled={disabled}
                                placeholder={iFormInput.disabled ? '' : placeholder}
                                onFocus={this.onFocus.bind(this)}
                                onChange={this.onChange.bind(this)}
                                addonAfter={addonAfter}
                                onBlur={this.onBlur.bind(this)}
                                addonBefore={addonBefore}>

                            </TooltipInput>

                    )}
                    {children}
                </FormItem>
            </FormElement>

        )
    }
}