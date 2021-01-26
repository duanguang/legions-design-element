import React from 'react'
import { Form, DatePicker } from 'antd';
import { WrappedFormUtils, IAntdProps, IAntdFormItemProps, IAntdRule ,DatePickerProps,RangePickerProps} from '../interface/antd';
import AbstractForm from './AbstractForm';
import FormElement from './FormElement';
import { InstanceFormElement } from './interface/formElement';
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
export class LabelWithRangePickerModel {
    constructor(public iAntdProps: IAntdProps,
        public iFormProps: IFormRangePickerProps,
        public rules?: IAntdRule[],//验证规则

    ) {
    }
}
export interface LabelWithRangePickerPartialModel {
    iAntdProps?: IAntdProps,
     iFormRangePicker?: IFormRangePickerProps,
     rules?: IAntdRule[],//验证规则
}
export interface IFormRangePickerProps extends RangePickerProps, IAntdFormItemProps {
}
export interface IFormWithRangePickerProps {
    form: WrappedFormUtils;
    iAntdProps: IAntdProps;
    rules?: IAntdRule[];
    iFormRangePicker: IFormRangePickerProps;
    /**
     * 表单生成的唯一uid
     *
     * @type {string}
     * @memberof IFormWithInputProps
     */
    formUid:string;
}
export default class FormRangePicker extends AbstractForm<IFormWithRangePickerProps>{
    FormRangePickerRef:InstanceFormElement=null
    constructor(props) {
        super(props)
    }
    onOpenChange(status){
        const store= this.FormRangePickerRef.store.get(this.props.formUid)
        if(store){
            store.focusUid = this.FormRangePickerRef.uid
        }
        this.props.iFormRangePicker&&this.props.iFormRangePicker.onOpenChange&&this.props.iFormRangePicker.onOpenChange(status)
    }
    componentDidMount() {
        this.didMountClearNodeQueue(this.FormRangePickerRef,this.props.formUid,this.props.iAntdProps.name)
    }
    shouldComponentUpdate(nextProps:IFormWithRangePickerProps,nextState,context) {
       return this.isShouldComponentUpdate(this.FormRangePickerRef,this.props.formUid,nextProps.iAntdProps.name)
    }
    render() {
        const { form, iAntdProps, iFormRangePicker, children, rules } = this.props;
        const { getFieldsError, isFieldValidating, getFieldDecorator } = form;
        const { label,labelCol,wrapperCol,...props } = iFormRangePicker
        let formItemProps = {};
        if ('colon' in props) {
            formItemProps['colon'] = props.colon;
        }
        return (
            <FormElement form={form} 
                onReady={(value)=>{
                    this.FormRangePickerRef = value
                }}
                elementKey={iAntdProps.name} 
                nextElementKey={iAntdProps.nextElementKey}
                formUid={this.props.formUid}>
                <FormItem
                    {...formItemProps}
                    extra={iFormRangePicker.extra}
                    className={iAntdProps.className}
                    label={iFormRangePicker.label}
                    labelCol={iFormRangePicker.labelCol}
                    wrapperCol={iFormRangePicker.wrapperCol}
                >
                    {getFieldDecorator(iAntdProps.name, {
                        rules: rules,
                    })(
                        <RangePicker
                            {...props}
                            onOpenChange={this.onOpenChange.bind(this)}
                            format={iFormRangePicker.format}

                        ></RangePicker>
                    )}

                </FormItem>
            </FormElement>
        )
    }
}