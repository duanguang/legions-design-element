/*
 * @Author: duanguang
 * @Date: 2021-04-26 16:23:25
 * @LastEditTime: 2021-08-16 23:46:09
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/LegionsProForm/__tests__/FormNumberInput.test.tsx
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
            iAntdProps: formUtils.createAntdProps('numberText',1),
            iFormProps: {
                ...formUtils.createLayout('数字文本',5,7),
                maxLength: '50',
                type: 'number',
            },
            rules: rules.numberText
        })
        return [
            formUtils.getFormConfig('numberText'),
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
    
    beforeAll(() => {
        jest.useFakeTimers();
    });
    afterAll(() => {
        jest.useRealTimers();
    });
    
    
    it("Form: NumberInput",() => {
        const componet = mount(<ProFormTest></ProFormTest>,{
            wrappingComponent:App
        })
        const instance = componet.instance() as ProFormTest;
        componet.find('input').simulate('change',{ target: { value: '11s' } });
        const viewModel = instance.formRef.viewModel.InputDataModel as FormFields
        expect(viewModel.numberText.value).toEqual('')
    })
})
