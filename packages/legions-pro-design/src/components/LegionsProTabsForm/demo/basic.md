---
order: 0
title:
  zh-CN: 页签表单基本使用
  en-US: 页签表单基本使用
---

## zh-CN

页签表单基本使用

## en-US

```jsx
import create from '../../../common/components/render.tsx';
import { JsonProperty } from 'json-mapper-object';
import { Button, Row } from 'antd';
import React from 'react';
import { bind, observer } from 'legions/store-react';
import { LegionsProTable,LegionsProTabsForm,LegionsProForm, LegionsProPageContainer } from 'legions-pro-design';
import {FormFields} from '../demoTest/model'; // 具体使用请看底部


interface IProps {}
class LegionsProTabsFormDemo extends React.Component<IProps,{}> {
    formRef: InstanceTabsForm<FormFields>
  constructor(props: IProps) {
    super(props);
  }
  createConfig() {
        const rules = FormFields.initFormRules<FormFields,{}>(FormFields,{})
        const formUtils = new LegionsProForm.ProFormUtils();
        formUtils.renderInputConfig({
            iAntdProps: formUtils.createAntdProps('text',null),
            iFormProps: {
                ...formUtils.createLayout('文本框',5,7),
                maxLength: '50',
                type: 'text',
                /* visible:false, */
            /* disabled: true, */
                onChange: () => {
                    console.log(this.formRef);
                }
            },
            rules: rules.text
        });
        formUtils.renderInputConfig({
            iAntdProps: formUtils.createAntdProps('textarea',null),
            iFormProps: {
                ...formUtils.createLayout('多行文本',5,7),
                maxLength: '50',
                type: 'textarea',
            },
            rules: rules.textarea
        });
        formUtils.renderInputConfig({
            iAntdProps: formUtils.createAntdProps('password',null),
            iFormProps: {
                ...formUtils.createLayout('密码',5,7),
                maxLength: '50',
                type: 'password',

            },
            rules: rules.password
        })
        formUtils.renderInputConfig({
            iAntdProps: formUtils.createAntdProps('numberText',null),
            iFormProps: {
                ...formUtils.createLayout('数字文本',5,7),
                maxLength: '50',
                type: 'number',

            },
            rules: rules.numberText
        })
        formUtils.renderInputNumberConfig({
            iAntdProps: formUtils.createAntdProps('numbers',null),
            iFormProps: {
                ...formUtils.createLayout('数字',5,7),

            },
            rules: rules.numbers
        })
        formUtils.renderSelectConfig({
            iAntdProps: formUtils.createAntdProps('selectedItem',null,'请选择'),
            iFormProps: {
                ...formUtils.createLayout('普通下拉',5,1 * 7),
                options: [{
                    value: '订单',
                    label: '订单1',
                    key: '1',
                    keyValue: '222',
                    disabled: true,
                },
                {
                    value: '工单',
                    label: '工单1',
                    key: '2',
                }],
                size: 'default',
                labelInValue: true,
                onFocus: () => {
                }
            },
            rules: rules.selectedItem,
        })
        return [
            formUtils.getFormConfig('text'),
            formUtils.getFormConfig('textarea'),
            formUtils.getFormConfig('password'),
            formUtils.getFormConfig('numberText'),
            formUtils.getFormConfig('numbers'),
            formUtils.getFormConfig('selectedItem'),
        ]
    }
  render() {
    return (
      <Row>
        <Row style={{ marginBottom: '10px' }}> 
          <Button  type="primary" htmlType="submit" onClick={() => {
                        console.log(this.formRef.methods.validateFields());
                       
              }}>检验</Button>
          <Button style={{ marginLeft: '10px' }} type="primary" htmlType="submit" onClick={() => {
                    this.formRef.methods.submit((values) => {
                        console.log(values);
                    })
                    
                }}>提交</Button>
        </Row>
        <LegionsProTabsForm
            <FormFields>
            InputDataModel={FormFields}
            controls={this.createConfig()}
            tabPaneProps={
                {
                    tab: (key,index) => {
                        return <div>销售订单{index+1}</div>
                    }
                }
            }
            onReady={(formref) => {
                this.formRef = formref;
            }}
        ></LegionsProTabsForm>
      </Row>
    );
  }
}
const root = props => {
  return <LegionsProTabsFormDemo></LegionsProTabsFormDemo>;
};
const app = create();
ReactDOM.render(React.createElement(app.start(root)), mountNode);
```
