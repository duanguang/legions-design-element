import { Button,Col,Row } from 'antd';
import React from 'react';
import { bind,observer } from 'legions/store-react';
import { LegionsProForm,LegionsProPageContainer } from '../../../components';
import { observablePromise } from 'legions/store-utils';
import { observable } from 'legions/store';
import { HttpConfig } from '../../constants/httpConfig';
import { InstanceProForm } from '../../../components/LegionsProForm/interface'
import { FormFields } from '../proForm/model';
import { ClassOf } from 'legions-lunar/types/api/typescript';
import LegionsProTabsForm from 'components/LegionsProTabsForm';
import { InstanceTabsForm } from 'components/LegionsProTabsForm/interface';
interface IProps { }
interface IState {
    visible: boolean;
    disabled: boolean;
}
/* @observer */
export class ProTabsForm extends React.Component<IProps,IState> {
    formRef: InstanceTabsForm<FormFields>
    constructor(props: IProps) {
        super(props)
        this.state = {
            visible: true,
            disabled: false
        }
    }
    arr = this.createConfig()
    componentDidMount() {
    /* this.formRef.viewModel.setFormState('price',{visible:false}) */
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
        
        formUtils.renderSelectConfig({
            iAntdProps: formUtils.createAntdProps('selectedItemRemote',null,'请选择'),
            iFormProps: {
                ...formUtils.createLayout('远程下拉',5,1 * 7),
                allowClear: true,
                remote: true,
                pageSize: 30,
                autoQuery: {
                    params: (pageIndex,pageSize,keywords) => {
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
                    token: 'SESSION=645c93e8-bfcf-45e5-a09e-4786d41255f4;',
                    options: {
                        'api-target': 'https://qa-scm.hoolinks.com//jg/basic/cusinfo/search.json'
                    },
                    mappingEntity: (that,res) => {
                        that.total = res['total'];
                        that.current = res['current'];
                        that.pageSize = res['size'];
                        const data = res['data'] as [] || []
                        return data.map((item) => {
                            return {
                                key: item['code'],
                                value: item['name'],
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
        return [
            formUtils.getFormConfig('text'),
            formUtils.getFormConfig('textarea'),
            formUtils.getFormConfig('password'),
            formUtils.getFormConfig('numberText'),
            formUtils.getFormConfig('numbers'),
            formUtils.getFormConfig('selectedItem'),
            formUtils.getFormConfig('selectedItemRemote'),
            /* formUtils.getFormConfig('textarea'), */
            /* formUtils.getFormConfig('password'),
            formUtils.getFormConfig('numberText'),
            formUtils.getFormConfig('numbers'),
            formUtils.getFormConfig('selectedItem'),
            formUtils.getFormConfig('selectedItemRemote'),
            formUtils.getFormConfig('selectedItemMultiple'),
            formUtils.getFormConfig('customRenderInput'), */
            /* formUtils.getFormConfig('customRender'), */
            /* formUtils.getFormConfig('upload'), */
        ]
    }
    render() {
        console.log('render parent');
        return (<LegionsProPageContainer
            query={null}
            content={
                <Row>
                    <Button style={{ marginLeft: '10px' }} type="primary" htmlType="submit" onClick={() => {
                        console.log(this.formRef.methods.validateFields());
                       
                    }}>检验</Button>
                    <Button style={{ marginLeft: '10px' }} type="primary"  onClick={() => {
                        this.formRef.methods.submit((values) => {
                            console.log(values,'value');
                        })
                       
                    }}>提交</Button>
                    <Button style={{ marginLeft: '10px' }} type="primary" htmlType="submit" onClick={() => {
                        const item = this.formRef.viewModel.getTabs(this.formRef.viewModel.activeTabKey)
                        console.log(this.formRef.viewModel.activeTabKey);
                      item.formInstance.store.updateFormInputData(item.formInstance.uid,{text:{value:'222'}})
                    }}>赋值</Button>
                    <LegionsProTabsForm
                        <FormFields>
                        InputDataModel={FormFields}
                        controls={this.createConfig()}
                        tabPaneProps={
                            {
                                tab: (key,index) => {
                                    console.log(key);
                                    return <div>销售订单{index+1}</div>
                                }
                            }
                        }
                        onReady={(formref) => {
                            this.formRef = formref;
                            this.formRef.viewModel.clearTabs();
                            this.formRef.methods.onTabAdd();
                        }}
                    ></LegionsProTabsForm>
                    

                </Row>
            }
        ></LegionsProPageContainer>)
    }
}

