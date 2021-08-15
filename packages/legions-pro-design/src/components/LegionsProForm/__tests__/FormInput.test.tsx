/*
 * @Author: duanguang
 * @Date: 2021-04-26 16:23:25
 * @LastEditTime: 2021-08-15 23:40:08
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/LegionsProForm/__tests__/FormInput.test.tsx
 * 「扫去窗上的尘埃，才可以看到窗外的美景。」
 */

import React from 'react';
import { mount,render,shallow,configure } from 'enzyme';
import { FormFields } from '../demoTest/model';
import LegionsProForm from '..';
import { InstanceProForm } from '../interface';
import { App ,Apps} from '../demoTest/app';
import FormInput from '../FormInput';
import { cwd } from 'process';
import { resolve,join } from 'path';
import { Form } from 'antd';
import {Input} from 'antd';
const { TextArea } = Input;
const FormItem = Form.Item;
const workDir=join(process.cwd(),'..')
class ProFormTest extends React.Component{
    formRef: InstanceProForm
    constructor(props) {
        super(props);
    }
    createConfig() {
        const rules = FormFields.initFormRules<FormFields,{that:ProFormTest}>(FormFields,{that:this})
        const formUtils = new LegionsProForm.ProFormUtils();
        
        formUtils.renderInputConfig({
            iAntdProps: formUtils.createAntdProps('text',1,),
            iFormProps: {
                ...formUtils.createLayout('文本框',5,7),
                maxLength: '50',
                type: 'text',
                onChange: (even) => {
                    const value = this.formRef.viewModel.InputDataModel as FormFields;
                    this.setState({
                        xssValue:value.text.value
                    })
                },
                onFocus: (even) => {
                    this.formRef.store.updateFormInputData(this.formRef.uid,{ text: { value: '聚焦' } })
                },
                onBlur: (even) => {
                    this.formRef.store.updateFormInputData(this.formRef.uid,{ text: { value: '失焦' } })
                }
            },
            rules: rules.text
        });
        
        return [
            formUtils.getFormConfig('text'),
        ]
    }
    render() {
        return <LegionsProForm
        <FormFields>
        InputDataModel={FormFields}
        onReady={(form,ref) => {
            this.formRef = Object.assign(ref,{ that: this });
            this.formRef.viewModel.enableEnterSwitch = true;
        }}
        mapPropsToFields={(props) => {
            return new FormFields(props)
        }}
        onFieldsChange={(props,formFields) => {
            this.formRef.store.updateFormInputData(this.formRef.uid,formFields)
           
        }}
        size="small"
        controls={this.createConfig()}
        colCount={2}
    ></LegionsProForm>
    }
}
describe('Form:Input',() => {
    const componet = mount(<ProFormTest></ProFormTest>,{
        wrappingComponent:App
    })
    const instance = componet.instance() as ProFormTest;
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    beforeAll(() => {
        jest.useFakeTimers();
    });
    afterAll(() => {
        jest.useRealTimers();
    });
    it("Form:formRef",() => {
        expect(instance.formRef).not.toBe(null)
    })
    it("Form:decryptionFreezeUid",() => {
        const filename = __filename.replace(`${workDir}/`,'')
        const decryptionFreezeUid = `${filename}/ProFormTest/LegionsProFormuid1`
        instance.formRef.methods.setFormStates<InstanceType<typeof LegionsProForm.LabelWithInputModel>>('text',(value) => {
            value.iFormProps.disabled = true
        })
        componet.find('input').simulate('change',{ target: { value: '111' } });
        const viewModel = instance.formRef.viewModel.InputDataModel as FormFields
        const formInputRef = componet.find(FormInput).instance() as FormInput
        expect(componet.find('input').getDOMNode().className.includes('ant-input-disabled')).toBe(true);
        expect(formInputRef.store).not.toBeNull()
        expect(viewModel.text.value).toEqual('111')
        expect(instance.formRef.decryptionFreezeUid).toEqual(decryptionFreezeUid)
        expect(componet.find(FormInput)).toHaveLength(1)
        expect(componet).not.toBe(null)
    })
    it("Form:input focus",() => {
        componet.find('input').simulate('focus')
        const viewModel = instance.formRef.viewModel.InputDataModel as FormFields
        expect(viewModel.text.value).toEqual('聚焦')
    })
    it("Form:input blur",() => {
        componet.find('input').simulate('blur')
        const viewModel = instance.formRef.viewModel.InputDataModel as FormFields
        expect(viewModel.text.value).toEqual('失焦')
    })
    it("Form: input FormItem",() => {
        const formItem = componet.find(FormInput).find(FormItem)
        instance.formRef.methods.setFormStates<InstanceType<typeof LegionsProForm.LabelWithInputModel>>('text',(value) => {
            value.iFormProps.colon = false
        })
        expect(formItem).toHaveLength(1)
        expect(formItem.getDOMNode().className.includes('ant-form-item-no-colon')).toBe(true)
    })
    it("Form: TextArea",() => {
        instance.formRef.methods.setFormStates<InstanceType<typeof LegionsProForm.LabelWithInputModel>>('text',(value) => {
            value.iFormProps.type = 'textarea'
        })
        expect(componet.getDOMNode().querySelector('textarea')).not.toEqual(null)
    })
})
