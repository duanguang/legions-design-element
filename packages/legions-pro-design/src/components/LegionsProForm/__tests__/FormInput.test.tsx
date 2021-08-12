/*
 * @Author: duanguang
 * @Date: 2021-04-26 16:23:25
 * @LastEditTime: 2021-08-12 23:58:47
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
                    console.log(value,even,'value');
                    this.setState({
                        xssValue:value.text.value
                    })
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
            console.log(this.formRef.decryptionFreezeUid,this.formRef.freezeUid);
            this.formRef.viewModel.enableEnterSwitch = true;
        }}
        isDragSort
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
        expect(instance.formRef.decryptionFreezeUid).toEqual(decryptionFreezeUid)
        expect(componet.find(FormInput)).toHaveLength(1)
        expect(componet).not.toBe(null)
    })
})
