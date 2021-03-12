---
order: 0
title:
  zh-CN: 基础表单
  en-US: 基础表单
---

## zh-CN

一个基础表单使用配置示例

> 表单字段 [FormFields](#Model)

## en-US

```tsx
import create from '../../../common/components/render.tsx';
import { JsonProperty } from 'json-mapper-object';
import { Button, Row ,Col,Form} from 'antd';
import React from 'react';
import { bind, observer } from 'legions/store-react';
import { LegionsProForm, LegionsProPageContainer } from 'legions-pro-design';
import { UploadChangeParam } from 'antd/lib/upload/interface';
import { FormRuleProperty } from 'legions-decorator/async.validator';
import { IBaseFormFields,HlLabeledValue } from 'legions-lunar/model';
import { ClassOf } from 'legions-lunar/types/api/typescript';
import { legionsThirdpartyPlugin } from 'legions-thirdparty-plugin';
import { legionsThirdpartyMap } from './constants/legionsConfig';
const FormItem = Form.Item;
import {FormFields} from '../demoTest/model'; // 具体使用请看底部

legionsThirdpartyPlugin.use([
    {
        name: 'dexie',
        url:'https://qa-zy.hoolinks.com/static/plugin/dexie.min.js'
    }
]);
interface IFormFieldUserRenderInput1{
    currency:string,
    number:number
}

interface IProps {}
interface IState{
  visibleText:boolean;
  visible:boolean;
  disabledText:boolean
}
class ProFormDemo extends React.Component<IProps,IState> {
  formRef: InstanceForm
  constructor(props: IProps) {
    super(props);
    this.state={
      visibleText: false,
      disabledText:true,
      visible:true,
    }
  }
  createConfig() {
        const rules = FormFields.initFormRules<FormFields,{}>(FormFields,{})
        const formUtils = new LegionsProForm.ProFormUtils();
        console.log(rules,'rules');
        formUtils.renderInputConfig({
            iAntdProps: formUtils.createAntdProps('text',1,null),
            iFormProps: {
                ...formUtils.createLayout('文本框',5,15),
                maxLength: '50',
                type: 'text',
                disabled: true,
            },
            rules: rules.text
        });
        formUtils.renderInputConfig({
            iAntdProps: formUtils.createAntdProps('textarea',1,null),
            iFormProps: {
                ...formUtils.createLayout('多行文本',5,15),
                maxLength: '50',
                type: 'textarea'
            },
            rules: rules.textarea
        });
        formUtils.renderInputConfig({
            iAntdProps: formUtils.createAntdProps('password',null),
            iFormProps: {
                ...formUtils.createLayout('密码',5,15),
                maxLength: '50',
                type: 'password',

            },
            rules: rules.password
        })
        formUtils.renderInputConfig({
            iAntdProps: formUtils.createAntdProps('numberText',1,null),
            iFormProps: {
                ...formUtils.createLayout('数字文本',5,15),
                maxLength: '50',
                type: 'number',

            },
            rules: rules.numberText
        })
        formUtils.renderInputNumberConfig({
            iAntdProps: formUtils.createAntdProps('numbers',1,null),
            iFormProps: {
                ...formUtils.createLayout('数字',5,15),

            },
            rules: rules.numbers
        })
        formUtils.renderSelectConfig({
            iAntdProps: formUtils.createAntdProps('selectedItem',2,null,'请选择'),
            iFormProps: {
                ...formUtils.createLayout('普通下拉',5,1 * 15),
                options: [{
                    value: '订单',
                    label: '订单1',
                    key: '1',
                    keyValue: '222',
                    disabled:true,
                },
                {
                    value: '工单',
                    label: '工单1',
                    key:'2',
                }],
                size: 'default',
                labelInValue: true,
            },
            rules: rules.selectedItem,
        })
        formUtils.renderSelectConfig({
            iAntdProps: formUtils.createAntdProps('selectedItemRemote',2,null,'请选择'),
            iFormProps: {
                ...formUtils.createLayout('远程下拉',5,1 * 15),
                allowClear: true,
                remote: true,
                pageSize: 30,
                autoQuery: {
                    params:(pageIndex,pageSize,keywords) => {
                        return {
                            keyword: keywords,
                            current: pageIndex,
                            size: 30,
                            templateCode: 'Country',
                            pageIndex: 1,
                            pageSize,
                            defaultKeyWords: '',
                        }
                    },
                    ApiUrl: 'https://gateway.hoolinks.com/api/gateway',
                    method: 'post',
                    token: 'SESSION=0cef87fd-a1c3-4d32-8273-45402da62d56;',
                    options: {
                        'api-target':'https://qa-scm.hoolinks.com//jg/basic/cusinfo/search.json'
                    },
                    mappingEntity: (that,res) => {
                        that.total = res['total'];
                        that.current = res['current'];
                        that.pageSize = res['size'];
                        const data= res['data'] as []||[]
                        return data.map((item) => {
                            return {
                                key: item['code'],
                                value:item['name'],
                            }
                        });
                    },
                    transform: (value) => {
                        let arr = value.value ? value.value.result : []
                        return {
                            data: arr.map((item) => {
                                return {
                                    key: item.key,
                                    value: '(' + item.key + ')' + item.value,
                                }
                            }),
                            total: value.value ? value.value.total : 0,
                        }
                    },
                },
                paging: true,
                size: 'default',
                labelInValue: true,
            },
            rules: rules.selectedItem,
        })
        formUtils.renderSelectConfig({
            iAntdProps: formUtils.createAntdProps('selectedItemMultiple',2,'下拉多选'),
            iFormProps: {
                ...formUtils.createLayout('下拉多选',5,1*15),
                allowClear: true,
                options: [
                    {
                        value: 'react',
                        key: '2',
                    },
                    {
                        value: 'angular',
                        key: '1',
                    },
                    {
                        value: 'vue',
                        key: '3',
                    },
                ],
                maxTagCount: 2,
                labelInValue:true,
                mode: 'multiple',
            },
            rules: rules.selectedItemMultiple,
        })
        formUtils.renderUploadConfig({
            iAntdProps: formUtils.createAntdProps('upload',2,'文件上传'),
            iFormProps: {
                ...formUtils.createLayout('文件上传',5,15),
                maxFileCount: 1,
                isDragger: true,
                prompt: (<p>扫去窗上的尘埃，才可以看到窗外的美景</p>),
            },
            rules: rules.upload,
        })
        formUtils.renderCustomConfig({
            // 自定义组件容器div属性设置 {span:24} 单独占一行 
            // 此属性定义是标识整个容器组件
            iAntdProps: formUtils.createAntdProps('customRenderInput',3,''),
            iFormProps: {
                render: (form,antdProps,rule,formRef) => {
                    const jsxInput = formUtils.renderInputConfig({
                        iAntdProps: formUtils.createAntdProps('customRenderInput1',null,'自定义文本组件'),
                        iFormProps: {
                            ...formUtils.createLayout('自定义组件',5,15),
                            type: 'password',
                        },
                        rules:rules.customRenderInput1
                    })
                    return formUtils.createFormComponent(jsxInput,form,formRef.uid,formRef)
                },
            },
        })
        formUtils.renderCustomConfig({
            iAntdProps: formUtils.createAntdProps('customRender',3,''),
            iFormProps: {
                render: (form,antdProps,rule,formRef) => {
                    const JsxSelect = formUtils.renderSelectConfig({
                        iAntdProps: {
                            ...formUtils.createAntdProps('priceType',null,'请选择'),
                            className: antdProps.className,
                        },
                        iFormProps: {
                            ...formUtils.createLayout('价格',10,2 * 6),
                            options: [{ key: 'rmb',value: 'RMB' },{ key: 'dollar',value: 'Dollar' }],
                        },
                        rules: rules.priceType,
                    })
                    const JsxInput = formUtils.renderInputConfig({
                        iAntdProps: formUtils.createAntdProps('price',null,'价格'),
                        iFormProps: {
                            maxLength: '70',
                        },
                        rules: rules.price,
                    })

                    return (
                        <Row className="selectAndInput">
                            <Col span={6 + 6}>
                                {
                                    formUtils.createFormComponent(JsxSelect,form,formRef.uid,formRef)
                                }
                            </Col>
                            <Col span={7} offset={1}>
                                {
                                    formUtils.createFormComponent(JsxInput,form,formRef.uid,formRef)
                                }
                            </Col>
                        </Row>
                    )
                },
            },
        })
        return [
            formUtils.getFormConfig('text'),
            formUtils.getFormConfig('textarea'),
            formUtils.getFormConfig('password'),
            formUtils.getFormConfig('numberText'),
            formUtils.getFormConfig('numbers'),
            formUtils.getFormConfig('selectedItem'),
            formUtils.getFormConfig('selectedItemRemote'),
            formUtils.getFormConfig('selectedItemMultiple'),
            formUtils.getFormConfig('customRenderInput'),
            formUtils.getFormConfig('customRender'),
            formUtils.getFormConfig('upload'),
        ]
    }
  render() {
    return (
      <Row>
        
         <LegionsProForm
          <FormFields>
          {...this.formRef && this.formRef.viewModel.InputDataModel}
          InputDataModel={FormFields}
          onReady={(form,ref) => {
              this.formRef = Object.assign(ref,{ that: this });
          }}
          mapPropsToFields={(props) => {
              return new FormFields(props)
          }}
          onFieldsChange={(props,formFields) => {
              this.formRef.store.updateFormInputData(this.formRef.uid,formFields)
          }}
          group={[{
                name:'文本输入',
                id: 1,
                active: true,
                isFolding:true,
            },{
                name:'下拉框',
                id: 2,
                active: true,
                isFolding:true,
            },{
                name:'自定义',
                id: 3,
                active: true,
                isFolding:true,
          }]}
          controls={this.createConfig()}
          uniqueUid="demo/proForm/one"
          colCount={2}
      ></LegionsProForm>
      <FormItem
          wrapperCol={{ span: 12, offset: 1 }}
        >
          <Button type="primary" htmlType="submit" onClick={()=>{
                  this.formRef && this.formRef.viewModel.form.validateFields((err,values: FormFields) => {

                        if (!err) {
                            /*  console.log(values,this.props.store.obFormFields) */
                        }
                        else {
                           
                        }
                        console.log(values,err,'values');
                    })
                }}>提交</Button>
          <Button style={{marginLeft:'10px'}} type="primary" htmlType="submit" onClick={()=>{
                    const item = this.formRef.viewModel.getFormItemField<InstanceType<typeof LegionsProForm.LabelWithInputModel>>('text');
                    if (item) {
                        const disabled = item.value.iFormProps.disabled
                        this.setState({
                            disabledText: !disabled
                        })
                        this.formRef.methods.setFormStates<InstanceType<typeof LegionsProForm.LabelWithInputModel>>('text',(value) => {
                            value.iFormProps.disabled=!disabled
                        })
                    }
                }}>{!this.state.disabledText?'禁用文本框输入':'启用文本框输入'}</Button>
         <Button style={{marginLeft:'10px'}} type="primary" htmlType="submit" onClick={()=>{
                  const item = this.formRef.viewModel.getFormItemField('text');
                  if (item&&item.value) {
                        let visibleText = item.value.iFormProps.visible;
                        if (visibleText === void 0) {
                            visibleText = true;
                        }
                            this.setState({
                            visibleText:!visibleText
                        })
                        this.formRef.methods.setFormStates('text',(value) => {
                            value.iFormProps.visible=!visibleText
                        })
                  }
                 
                }}>{!this.state.visibleText?'显示文本框':'隐藏文本框'}</Button>       
         <Button style={{marginLeft:'10px'}} type="primary" htmlType="submit" onClick={()=>{
                    const item = this.formRef.viewModel.getFormItemField('price');
                    if (item&&item.value) {
                        
                        let visible = item.value.iFormProps.visible;
                        if (visible === void 0) {
                            visible = true;
                        }
                        this.setState({
                            visible:!visible
                        })
                        this.formRef.methods.setFormStates('price',(value) => {
                                value.iFormProps.visible = !visible;
                        })
                    }
                }}>{!this.state.visible?'显示价格文本框':'隐藏价格文本框'}</Button>       
        </FormItem>
      </Row>
     
    );
  }
}
const root = props => {
  return <ProFormDemo></ProFormDemo>;
};
const app = create();
ReactDOM.render(React.createElement(app.start(root)), mountNode);
```
