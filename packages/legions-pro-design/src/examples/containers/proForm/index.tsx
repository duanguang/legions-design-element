import { Button,Col,Input,Row } from 'antd';
import React from 'react';
import { bind,observer } from 'legions/store-react';
import { LegionsProForm,LegionsProPageContainer } from '../../../components';
import { observablePromise } from 'legions/store-utils';
import { observable } from 'legions/store';
import { HttpConfig } from '../../constants/httpConfig';
import { InstanceProForm } from '../../../components/LegionsProForm/interface'
import { FormFields } from './model';
import TodoStore from 'examples/stores/TodoStore';
import { getFormMetaProperty } from 'legions-decorator/async.validator';
interface IProps {
    todoStore: TodoStore
}
interface IState {
    visible: boolean;
    disabled: boolean;
    xssValue: string;
}
@bind({
    todoStore: TodoStore
})
@observer
export class ProForm extends React.Component<IProps,IState> {
    formRef: InstanceProForm
    constructor(props: IProps) {
        super(props)
        this.state = {
            visible: true,
            disabled: false,
            xssValue: '',
        }
        console.log(this.props.todoStore,'todoStore:TodoStore');
    }
    arr = this.createConfig()
    componentDidMount() {
        /* this.formRef.viewModel.setFormState('price',{visible:false}) */
    }
    createConfig() {
        const rules = FormFields.initFormRules<FormFields,{ that: ProForm }>(FormFields,{ that: this })
        const formUtils = new LegionsProForm.ProFormUtils();
        formUtils.renderInputConfig({
            iAntdProps: formUtils.createAntdProps('text',1,),
            iFormProps: {
                ...formUtils.createLayout('文本框',5,7),
                maxLength: '50',
                type: 'text',
                /* visible:false, */
                /* disabled: true, */
                onChange: (even) => {
                    const value = this.formRef.viewModel.InputDataModel as FormFields;
                    console.log(value,even,'value');
                    /* this.setState({
                        xssValue:value.text.value
                    }) */
                },
                colon: false
            },
            rules: rules.text
        });
        formUtils.renderInputConfig({
            iAntdProps: formUtils.createAntdProps('textarea',1),
            iFormProps: {
                ...formUtils.createLayout('多行文本',5,7),
                maxLength: '50',
                type: 'textarea',
                disabled: true,
            },
            rules: rules.textarea
        });
        formUtils.renderInputConfig({
            iAntdProps: formUtils.createAntdProps('password',1),
            iFormProps: {
                ...formUtils.createLayout('密码',5,7),
                maxLength: '50',
                type: 'password',

            },
            rules: rules.password
        })
        formUtils.renderInputConfig({
            iAntdProps: formUtils.createAntdProps('numberText',1),
            iFormProps: {
                ...formUtils.createLayout('数字文本',5,7),
                maxLength: '50',
                type: 'number',
            },
            rules: rules.numberText
        })
        formUtils.renderInputNumberConfig({
            iAntdProps: formUtils.createAntdProps('numbers',1),
            iFormProps: {
                ...formUtils.createLayout('数字',5,7),
            },
            rules: rules.numbers
        })
        formUtils.renderSelectConfig({
            iAntdProps: formUtils.createAntdProps('selectedItem',2,'请选择'),
            iFormProps: {
                ...formUtils.createLayout('普通下拉',5,1 * 7),
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
                }],
                size: 'default',
                labelInValue: true,
                onFocus: () => {
                }
            },
            rules: rules.selectedItem,
        })
        formUtils.renderSelectConfig({
            iAntdProps: formUtils.createAntdProps('selectedItemRemote',2,'请选择'),
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
                    token: 'SESSION=ba9b7428-8300-4d56-83cd-a2ca6262ca3c;',
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
        formUtils.renderSelectConfig({
            iAntdProps: formUtils.createAntdProps('selectedItemMultiple',2,'下拉多选'),
            iFormProps: {
                ...formUtils.createLayout('下拉多选',5,1 * 7),
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
                /*  labelInValue: true, */
                mode: 'multiple',
            },
            rules: rules.selectedItemMultiple,
        })
        formUtils.renderUploadConfig({
            iAntdProps: formUtils.createAntdProps('upload',2,'文件上传'),
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
            iAntdProps: formUtils.createAntdProps('customRenderInput',2,''),
            iFormProps: {
                render: (form,antdProps,rule,formRef) => {
                    const jsxInput = formUtils.renderInputConfig({
                        iAntdProps: formUtils.createAntdProps('customRenderInput1',null,'自定义文本组件'),
                        iFormProps: {
                            ...formUtils.createLayout('自定义组件',5,7),
                            type: 'password',
                        },
                        rules: rules.customRenderInput1
                    })
                    return formUtils.createFormComponent(jsxInput,form,formRef.uid,formRef)
                },
            },
        })
        formUtils.renderCascaderConfig({
            iAntdProps: formUtils.createAntdProps('cascader',2,'级联'),
            iFormProps: {
                ...formUtils.createLayout('级联',5,7),
                options: [{
                    value: 'zhejiang',
                    label: '浙江',
                    children: [{
                        value: 'hangzhou',
                        label: '杭州',
                        children: [{
                            value: 'xihu',
                            label: 'West Lake',
                        }],
                    }],
                },{
                    value: 'jiangsu',
                    label: 'Jiangsu',
                    children: [{
                        value: 'nanjing',
                        label: 'Nanjing',
                        children: [{
                            value: 'zhonghuamen',
                            label: 'Zhong Hua Men',
                        }],
                    }],
                }],
                onChange: (value,selectedOptions) => {
                    console.log(selectedOptions,'selectedOptions');
                }
            },
            rules: rules.cascader,
        })
        formUtils.renderCustomConfig({
            iAntdProps: formUtils.createAntdProps('customRender',2,''),
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
                            /* disabled: true, */
                            onBlur: () => { }
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
            formUtils.getFormConfig('cascader'),
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
        console.log('render parent',this.state.xssValue);

        return (<LegionsProPageContainer
            operation={
                <Row>
                    <Button type="primary" htmlType="submit" onClick={() => {
                        const item = this.formRef.viewModel.getFormItemField('text');
                        if (item && item.value) {
                            /* this.setState({
                                visible: !visibleText
                            }) */
                            this.formRef.methods.setFormStates('text',(value) => {
                                value.iFormProps.visible = false
                            })
                        }

                    }}>{'隐藏文本框'}</Button>

                    <Button style={{ marginLeft: '10px' }} type="primary" htmlType="submit" onClick={() => {
                        const item = this.formRef.viewModel.getFormItemField('text');
                        if (item && item.value) {
                            this.formRef.methods.setFormStates('text',(value) => {
                                value.iFormProps.visible = true;
                            })
                        }

                    }}>{!this.state.visible ? '显示文本框' : '隐藏文本框'}</Button>

                    <Button type="primary" htmlType="submit" onClick={() => {
                        const item = this.formRef.viewModel.getFormItemField<InstanceType<typeof LegionsProForm.LabelWithInputModel>>('text');
                        if (item) {
                            this.formRef.methods.setFormStates<InstanceType<typeof LegionsProForm.LabelWithInputModel>>('text',(value) => {
                                value.iFormProps.disabled = false;
                            })
                        }

                    }}>{'启用文本框'}</Button>

                    <Button style={{ marginLeft: '10px' }} type="primary" htmlType="submit" onClick={() => {
                        const item = this.formRef.viewModel.getFormItemField<InstanceType<typeof LegionsProForm.LabelWithInputModel>>('text');
                        if (item) {
                            this.formRef.methods.setFormStates<InstanceType<typeof LegionsProForm.LabelWithInputModel>>('text',(value) => {
                                value.iFormProps.disabled = true;
                            })
                        }

                    }}>{!this.state.disabled ? '禁用文本框' : '启用文本框'}</Button>


                    <Button type="primary" htmlType="submit" onClick={() => {
                        const item = this.formRef.viewModel.getFormItemField('price');
                        if (item && item.value) {

                            let visible = item.value.iFormProps.visible;
                            if (visible === void 0) {
                                visible = true;
                            }
                            if (!visible) {
                                this.formRef.methods.setFormStates('price',(value) => {
                                    value.iFormProps.visible = true;
                                })
                            }
                        }

                    }}>显示价格输入框</Button>

                    <Button type="primary" htmlType="submit" onClick={() => {
                        const item = this.formRef.viewModel.getFormItemField('price');
                        if (item && item.value) {
                            let visible = item.value.iFormProps.visible;
                            if (visible === void 0) {
                                visible = true;
                            }
                            if (visible) {
                                this.formRef.methods.setFormStates('price',(value) => {
                                    value.iFormProps.visible = false;
                                })
                            }
                        }

                    }}>隐藏价格输入框</Button>

                    <Button type="primary" htmlType="submit" onClick={() => {
                        const item = this.formRef.viewModel.getFormItemField<InstanceType<typeof LegionsProForm.LabelWithInputModel>>('price');
                        if (item) {
                            this.formRef.methods.setFormStates<InstanceType<typeof LegionsProForm.LabelWithInputModel>>('price',(value) => {
                                value.iFormProps.disabled = false
                            })
                            this.formRef.store.updateFormInputData(this.formRef.uid,{ price: { value: '222' } })
                            this.formRef.methods.setFormStates<InstanceType<typeof LegionsProForm.LabelWithSelectModel>>('selectedItem',(value) => {
                                value.iFormProps.options.push({
                                    value: '工单2',
                                    label: '工单2',
                                    key: '3',
                                })
                            })
                        }

                    }}>启用价格输入框</Button>

                    <Button type="primary" htmlType="submit" onClick={() => {
                        const item = this.formRef.viewModel.getFormItemField<InstanceType<typeof LegionsProForm.LabelWithInputModel>>('price');
                        if (item) {
                            let disabled = item.value.iFormProps.disabled
                            if (disabled === void 0) {
                                disabled = false;
                            }
                            if (!disabled) {
                                this.formRef.methods.setFormStates<InstanceType<typeof LegionsProForm.LabelWithInputModel>>('price',(value) => {
                                    value.iFormProps.disabled = true
                                })
                            }

                        }

                    }}>禁用价格输入框</Button>
                    <Button onClick={() => {
                        this.formRef.viewModel.updateFormSize('table')
                    }}>表单尺寸</Button>
                    <Button onClick={() => {
                        this.formRef.methods.setFormStates<InstanceType<typeof LegionsProForm['LabelWithSelectModel']>>('selectedItem',(value) => {
                            value.iFormProps.mode = 'multiple';
                        })
                    }}>设置为多选</Button>
                    <Button onClick={() => {
                        const value = LegionsProForm.ProFormFields.responseBodyToFormFields(FormFields,{ text: 'xxx' })
                        console.log(value,'valuevaluevalue')
                        this.formRef.store.updateFormInputData(this.formRef.uid,value)
                    }}>文本框赋值</Button>
                    <Button onClick={() => {
                        const value = LegionsProForm.ProFormFields.formFieldsToRepuestBody<FormFields>(this.formRef.viewModel.targetFormModelData)
                        console.log(value,'formFieldsToRepuestBody')

                    }}>表单数据同步到接口数据</Button>
                    <Button onClick={() => {
                        this.formRef.methods.clearFormItem();
                    }}>清空表单项</Button>
                    <Button onClick={() => {
                        const rules = FormFields.initFormRules<FormFields,{}>(FormFields,{})
                        const formUtils = new LegionsProForm.ProFormUtils();
                        formUtils.renderSelectConfig({
                            iAntdProps: formUtils.createAntdProps('selectedItemRemoteTest',2,'请选择'),
                            iFormProps: {
                                ...formUtils.createLayout('远程下拉1',5,1 * 7),
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
                                    token: 'SESSION=f44dff33-3a8c-41ae-9c12-5b774febedf7;',
                                    options: {
                                        'api-target': 'https://uat-scm.hoolinks.com//jg/basic/cusinfo/search.json'
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
                        formUtils.renderInputConfig({
                            iAntdProps: formUtils.createAntdProps('text1',1,''),
                            iFormProps: {
                                ...formUtils.createLayout('文本框1',5,7),
                                maxLength: '50',
                                type: 'text',
                                onChange: () => {
                                    console.log(this.formRef);
                                }
                            },
                            rules: rules.text
                        })
                        this.formRef.methods.addFormItem([
                            formUtils.getFormConfig('selectedItemRemoteTest'),
                            formUtils.getFormConfig('text1'),
                        ])
                    }}>动态添加表单项</Button>
                </Row>
            }
            content={
                <LegionsProForm
                    <FormFields>
                    InputDataModel={FormFields}
                    onReady={(form,ref) => {
                        this.formRef = Object.assign(ref,{ that: this });
                        this.formRef.viewModel.enableEnterSwitch = true;
                    }}
                    isDragSort
                    /* mapPropsToFields={(props) => {
                        console.log('mapPropsToFields',props);
                        return props
                    }} */
                    onFieldsChange={(props,formFields) => {
                        console.log('onFieldsChange',formFields,this.formRef.viewModel.InputDataModel);
                        console.log('onFieldsChange1',this.formRef.viewModel.targetFormModelData);
                    }}
                    size="small"
                    controls={this.createConfig()}
                    colCount={2}
                    group={[{
                        name: '文本输入',
                        id: 1,
                        active: true,
                        isFolding: true,
                    },{
                        name: '下拉框',
                        id: 2,
                        active: true,
                        isFolding: true,
                    }]}
                ></LegionsProForm>
            }
        ></LegionsProPageContainer>)
    }
}

