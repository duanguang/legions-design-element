import React from 'react';
import { Form, Select } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const OptGroup = Select.OptGroup;
import {
    WrappedFormUtils,
    InputProps,
    IAntdProps,
    IAntdFormItemProps,
    IAntdRule,
    SelectProps,
    IAntdSelectOption
} from '../interface/antd';
import AbstractForm from './AbstractForm';
import FormElement from './FormElement';
import { InstanceFormElement } from './interface/formElement'
export class LabelWithSelectModel {
    constructor(public iAntdProps: IAntdProps,
        public iFormWithSelect: IFormSelectProps,
        public rules?: IAntdRule[]) {

    }
}

export interface IFormSelectProps extends SelectProps, IAntdFormItemProps {

    /**
     *
     * select 需要绑定的数据
     * @type {IAntdSelectOption[]}
     * @memberof IFormSelectProps
     */
    options: IAntdSelectOption[]
    optGroups?: Array<IOptGroupProps>
    firstActiveValue?: string[] | string
}
export interface IOptGroupProps {
    label: string | JSX.Element;
    key?: string
}
interface IFormWithSelectProps {
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
    formUid:string;
}

export default class FormSelect extends AbstractForm<IFormWithSelectProps>{
    FormSelectRef:InstanceFormElement=null
    constructor(props) {
        super(props)
    }
    renderOption(): JSX.Element[] {
        const { optGroups, options } = this.props.iFormWithSelect
        if (optGroups) {
            return optGroups.map((item, index) => {
                const option = options.filter((entity) => entity.group === item.label)
                return <OptGroup label={item.label} key={`${item.label}${index}`}>
                    {option.map((option, key) => {
                        <Option
                            {...option}
                            value={option.key}
                            disabled={option.disabled}
                            key={`${key.toString()}${option.value}`}

                        >
                            {option.value}
                        </Option>
                    })}
                </OptGroup>
            })
        }
        return options.map((option, key) => {
            return <Option
                {...option}
                disabled={option.disabled}
                value={option.key}
                key={`${key.toString()}${option.value}`}

            >
                {option.value}
            </Option>
        })
    }
    onFocus(){
        const store= this.FormSelectRef.store.get(this.props.formUid)
        if(store){
            store.focusUid = this.FormSelectRef.uid
        }
        this.props.iFormWithSelect&&this.props.iFormWithSelect.onFocus&&this.props.iFormWithSelect.onFocus()
    }
    public render() {
        const { form, iAntdProps, iFormWithSelect, children, rules } = this.props;
        const { getFieldDecorator, getFieldsError } = form;
        const { label, labelCol, wrapperCol, ...props } = iFormWithSelect
        return (
            <FormElement form={form} 
                onReady={(value)=>{
                    this.FormSelectRef = value
                }}
                nextElementKey={iAntdProps.nextElementKey}
                elementKey={iAntdProps.name} 
                formUid={this.props.formUid}>
                <FormItem
                    extra={iFormWithSelect.extra}
                    className={iAntdProps.className}
                    label={iFormWithSelect.label}
                    labelCol={iFormWithSelect.labelCol}
                    wrapperCol={iFormWithSelect.wrapperCol}
                >
                    {getFieldDecorator(iAntdProps.name, {
                        rules: rules,
                    })(
                        <Select
                        size="small"
                            {...props}
                            onFocus={this.onFocus.bind(this)}
                        >
                            {this.renderOption()}
                        </Select>
                    )}
                    {children}
                </FormItem>
            </FormElement>
        )
    }
}
