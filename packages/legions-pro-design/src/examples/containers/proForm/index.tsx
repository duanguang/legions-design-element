import { Button,Col,Row } from 'antd';
import React from 'react';
import { bind,observer } from 'legions/store-react';
import { LegionsProForm,LegionsProPageContainer } from '../../../components';
import { observablePromise } from 'legions/store-utils';
import { observable } from 'legions/store';
import { HttpConfig } from '../../constants/httpConfig';
import { InstanceForm } from '../../../components/LegionsProForm/interface'
import { FormFields } from './model';
interface IProps { }
interface IState{
    visible:boolean;
    disabled:boolean;
}
/* @observer */
export class ProForm extends React.Component<IProps,IState> {
    formRef: InstanceForm
    constructor(props: IProps) {
        super(props)
        this.state={
            visible:true,
            disabled:false
        }
    }
    componentDidMount() {
        /* this.formRef.viewModel.setFormState('price',{visible:false}) */
    }
    createConfig() {
        const rules = FormFields.initFormRules<FormFields,{}>(FormFields,{})
        const formUtils = new LegionsProForm.ProFormUtils();
        console.log(rules);
        formUtils.renderInputConfig({
            iAntdProps: formUtils.createAntdProps('text',null),
            iFormProps: {
                ...formUtils.createLayout('文本框',5,7),
                maxLength: '50',
                type: 'text',
                defaultVisible:false,
            },
            rules: rules.text
        });
        formUtils.renderInputConfig({
            iAntdProps: formUtils.createAntdProps('textarea',null),
            iFormProps: {
                ...formUtils.createLayout('多行文本',5,7),
                maxLength: '50',
                type: 'textarea'
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
            iAntdProps: formUtils.createAntdProps('selectedItemRemote',null,'请选择'),
            iFormProps: {
                ...formUtils.createLayout('远程下拉',5,1 * 7),
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
                    token: 'SESSION=09a88b98-211f-4b64-89e6-197d13aba31b;',
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
            iAntdProps: formUtils.createAntdProps('selectedItemMultiple',1,'下拉多选'),
            iFormProps: {
                ...formUtils.createLayout('下拉多选',5,1*7),
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
            iAntdProps: formUtils.createAntdProps('upload',1,'文件上传'),
            iFormProps: {
                ...formUtils.createLayout('文件上传',5,7),
                maxFileCount: 1,
                isDragger: true,
                prompt: (<p>扫去窗上的尘埃，才可以看到窗外的美景</p>),
            },
            rules: rules.upload,
        })
        formUtils.renderCustomConfig({
            // 自定义组件容器div属性设置 {span:24} 单独占一行 
            // 此属性定义是标识整个容器组件
            iAntdProps: formUtils.createAntdProps('customRenderInput',1,''),
            iFormProps: {
                render: (form,antdProps,rule,formRef) => {
                    const jsxInput = formUtils.renderInputConfig({
                        iAntdProps: formUtils.createAntdProps('customRenderInput1',null,'自定义文本组件'),
                        iFormProps: {
                            ...formUtils.createLayout('自定义组件',5,7),
                            type: 'password',
                        },
                        rules:rules.customRenderInput1
                    })
                    return formUtils.createFormComponent(jsxInput,form,formRef.uid,formRef)
                },
            },
        })
        formUtils.renderCustomConfig({
            iAntdProps: formUtils.createAntdProps('customRender',1,''),
            iFormProps: {
                render: (form,antdProps,rule,formRef) => {
                    const JsxSelect = formUtils.renderSelectConfig({
                        iAntdProps: {
                            ...formUtils.createAntdProps('priceType',null,'请选择'),
                            className: antdProps.className,
                        },
                        iFormProps: {
                            ...formUtils.createLayout('价格',10,2 * 7),
                            options: [{ key: 'rmb',value: 'RMB' },{ key: 'dollar',value: 'Dollar' }],
                        },
                        rules: rules.priceType,
                    })
                    const JsxInput = formUtils.renderInputConfig({
                        iAntdProps: formUtils.createAntdProps('price',1,'价格'),
                        iFormProps: {
                            maxLength: '70',
                            disabled: true,
                            defaultVisible:true,
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
                            <Col span={10} offset={1}>
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
        return (<LegionsProPageContainer
            query={null}
            content={
                <Row>
                    <Button style={{marginLeft:'10px'}} type="primary" htmlType="submit" onClick={()=>{
                  const visibleText=this.formRef.viewModel.getFormState('price').visible;
                  console.log(this.formRef.viewModel.getFormState('price'));
                  this.setState({
                    visible:!visibleText
                  })
                  this.formRef.viewModel.setFormState('price',{visible:!visibleText})
                    }}>{!this.state.visible ? '显示文本框' : '隐藏文本框'}</Button>
                    <Button style={{marginLeft:'10px'}} type="primary" htmlType="submit" onClick={()=>{
                  const visibleText=this.formRef.viewModel.getFormState('price').disabled;
                  console.log(this.formRef.viewModel.getFormState('price'));
                  this.setState({
                    disabled:!visibleText
                  })
                  this.formRef.viewModel.setFormState('price',{disabled:!visibleText})
                }}>{!this.state.disabled?'禁用文本框':'启用文本框'}</Button>     
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
                        controls={this.createConfig()}
                        colCount={1}
                    ></LegionsProForm>

                </Row>
            }
        ></LegionsProPageContainer>)
    }
}

