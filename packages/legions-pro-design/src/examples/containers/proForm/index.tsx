import { Button,Row } from 'antd';
import React from 'react';
import { bind,observer } from 'legions/store-react';
import { LegionsProForm,LegionsProPageContainer } from '../../../components';
import { InstanceProTable } from '../../../components/LegionsProTable/interface';
import { observablePromise } from 'legions/store-utils';
import { observable } from 'legions/store';
import { runInAction } from 'mobx'
import { HttpConfig } from '../../constants/httpConfig';
import {InstanceForm} from '../../../components/LegionsProForm/interface'
import { FormFields } from './model';
import { IProFormProps } from 'components/LegionsProForm/HlForm';
interface IProps { }

@observer
export class ProForm extends React.Component<IProps,{}> {
  formRef:InstanceForm
  @observable status = {
    color: 'red'
  }
  
  constructor(props: IProps) {
      super(props)
  }
  createConfig() {
      const rules = FormFields.initFormRules<FormFields,{}>(FormFields,{})
      const formUtils = new LegionsProForm.ProFormUtils();
      formUtils.renderInputConfig({
          iAntdProps: formUtils.createAntdProps('uniqueKey',null),
          iFormProps: {
              ...formUtils.createLayout('文本框',5,7),
              maxLength: '50',
              type:'text',
          },
          rules:rules.uniqueKey
      })
      return [
        formUtils.getFormConfig('uniqueKey')
      ]
  }
  render() {
    return (<LegionsProPageContainer
      query={null}
      content={
        <Row>
              <LegionsProForm
                <FormFields>
                  {...this.formRef && this.formRef.viewModel.InputDataModel}
                  InputDataModel={FormFields}
                  onGetForm={(form,ref) => {
                      this.formRef = Object.assign(ref,{ that: this });
                  }}
                  mapPropsToFields={(props) => {
                    return new FormFields(props)
                  }}
                  onFieldsChange={(props,formFields) => {
                      this.formRef.store.updateFormInputData(this.formRef.uid,formFields)
                  }}
                  controls={this.createConfig()}
              ></LegionsProForm>
         
        </Row>
      }
    ></LegionsProPageContainer>)
  }
}

