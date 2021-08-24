/*
 * @Author: duanguang
 * @Date: 2021-04-26 16:23:25
 * @LastEditTime: 2021-08-23 23:06:45
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/LegionsProForm/__tests__/FormSelect.test.tsx
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
import FormSelect from '../FormSelect';
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
        
        formUtils.renderSelectConfig({
            iAntdProps: formUtils.createAntdProps('selectedItem',1),
            iFormProps: {
                ...formUtils.createLayout('普通下拉',5,7),
                options: [{
                    value: '订单',
                    label: '订单1',
                    key: '1',
                    extendedField: '222',
                   /*  disabled: true, */
                },
                {
                    value: '工单',
                    label: '工单1',
                    key: '2',
                }]
            },
            rules: rules.numberText
        })
        return [
            formUtils.getFormConfig('selectedItem'),
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
    
    
    it("Form: Select",() => {
        const componet = mount(<ProFormTest></ProFormTest>,{
            wrappingComponent:App
        })
        const instance = componet.instance() as ProFormTest;
        const instanceFormSelect = componet.find(FormSelect).instance() as ProFormTest;
        instance.formRef.methods.setFormStates<InstanceType<typeof LegionsProForm['LabelWithSelectModel']>>('selectedItem',(value) => {
            value.iFormProps.colon = false
        })
        expect(instanceFormSelect).not.toEqual(null)
        expect(componet.find(FormSelect).find(FormItem).getDOMNode().className.includes('ant-form-item-no-colon')).toBe(true)
       /*  const viewModel = instance.formRef.viewModel.InputDataModel as FormFields
        expect(viewModel.numberText.value).toEqual('') */
        componet.unmount()
    })
    it('Form: chanage',() => {
        const componet = mount(<ProFormTest></ProFormTest>,{
            wrappingComponent:App
        })
        const instance = componet.instance() as ProFormTest;
        instance.formRef.methods.setFormStates<InstanceType<typeof LegionsProForm['LabelWithSelectModel']>>('text',(value) => {
            value.iFormProps.mode='combobox'
        })
        componet.find(FormSelect).simulate('change',{ target: { value: '111' } });
        console.log(componet.find(FormSelect).html());
    })
    it("Form:input focus",() => {
        const componet = mount(<ProFormTest></ProFormTest>,{
            wrappingComponent:App
        })
        
        componet.find('.ant-select').simulate('click')
       
    })
})
