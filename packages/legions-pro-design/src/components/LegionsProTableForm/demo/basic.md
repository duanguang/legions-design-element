---
order: 0
title:
  zh-CN: 表格表单
  en-US: tableForm
---

## zh-CN

表格嵌套表单的简单使用

## en-US

```jsx
import create from '../../../common/components/render.tsx';
import { JsonProperty } from 'json-mapper-object';
import { Button, Row } from 'antd';
import React from 'react';
import { observer } from 'legions/store-react';
import { observable } from 'legions/store';
import { LegionsProForm,LegionsProPageContainer, LegionsProTableForm } from 'legions-pro-design';
import { observableViewModel } from 'legions/store-utils';
import moment from 'moment';
import { toJS } from 'mobx';
import { TableFormDemoField } from '../demoTest/model';
/** 列表字段实体 */
class TableEntity {
    /** 序号 */
    index: number = 0;
    /** 文本框 */
    inputComponent?: string = '昊链科技';
    /** 下拉框 */
    selectComponent?: string = '1';
    /** 日期选择框 */
    dateComponent?: moment.Moment = moment();
    /** 单选框 */
    radioComponent?: string = '1';
    /** 开关 */
    switchComponent?: boolean = true;
    /** 普通文本 */
    textComponent?: string = '普通文本';
}
interface IProps {}
interface IState {
    list:TableEntity[];
}
/** 表格列配置 */
const tableColumns = (that:ProTableFormDemo): IProTableFormColumnConfigProps<TableEntity>[] => [
    { title: '序号', width: 50, dataIndex: 'index' },
    { title: '文本框', width: 100, dataIndex: 'inputComponent' },
    { title: '下拉框', width: 100, dataIndex: 'selectComponent' },
    { title: '日期选择框', width: 130, dataIndex: 'dateComponent', render: (text, record, index) => record.dateComponent.format('YYYY-MM-DD HH:mm:ss')},
    { title: '单选框', width: 160, dataIndex: 'radioComponent' },
    { title: '开关', width: 80, dataIndex: 'switchComponent', render: (text, record, index) => `${record.switchComponent}`},
    { title: '普通文本', width: 80, dataIndex: 'textComponent' },
    { title: '操作', width: 150, dataIndex: 'test', render: (text, record) => {
        const index = record['index'];
        return <div>
            <Button type="primary" onClick={() => {
                if (record['isRecordEdit']) {
                    that.formRef.viewModel.form.validateFields((error) => {
                        if (!error) {
                            that.formRef.methods.updateRecordEditData(record);
                        }
                    });
                } else {
                    console.log(that.formRef.viewModel,record);
                    that.formRef.methods.updateRecordEditData(record);
                }
            }}>
                {record['isRecordEdit'] ? '保存' : '编辑'}
            </Button>
            <Button type="danger" style={{marginLeft: 5}} onClick={() => {
                const list = [...that.state.list];
                list.splice(index, 1);
                that.setState({list:list.map((item, index) => ({...item, index}))})
            }}>删除</Button>
        </div>
    }},
]

class ProTableFormDemo extends React.Component<IProps,IState> {
    formRef: InstanceProForm
    constructor(props: IProps) {
        super(props)
        this.state = {
            list:[
                {...new TableEntity(), index: 0},
                {...new TableEntity(), index: 1},
                {...new TableEntity(), index: 2},
            ],
        }
    }
    createConfig() {
        const rules = TableFormDemoField.initFormRules<TableFormDemoField,{}>(TableFormDemoField,{})
        const formUtils = new LegionsProForm.ProFormUtils();
        /** input */
        formUtils.renderInputConfig({
            iAntdProps: formUtils.createAntdProps('inputComponent',1),
            iFormProps: {
                ...formUtils.createLayout('',0,24),
                colon: false,
            },
            rules: rules.input,
        });
        /** select */
        formUtils.renderSelectConfig({
            iAntdProps: formUtils.createAntdProps('selectComponent',1),
            iFormProps: {
                ...formUtils.createLayout('',0,24),
                colon: false,
                options: [{ key: '1',value: '服务1' },{ key: '2',value: '服务2' }],
            },
            rules: rules.select,
        });
        /** 日期 */
        formUtils.renderDatePickerConfig({
            iAntdProps: formUtils.createAntdProps('dateComponent',1),
            iFormProps: {
                ...formUtils.createLayout('',0,24),
                colon: false,
                format:'YYYY-MM-DD'
            },
            rules: rules.date,
        });
        /** 单选 */
        formUtils.renderRadioButtonConfig({
            iAntdProps: formUtils.createAntdProps('radioComponent',1),
            iFormProps: {
                ...formUtils.createLayout('',0,24),
                colon: false,
                radio: {
                    options: [{ label: '1',value: '1' },{ label: '2',value: '2' },{ label: '3',value: '3' }],
                },
            },
            rules: rules.select,
        });
        /** 开关 */
        formUtils.renderSwitchConfig({
            iAntdProps: formUtils.createAntdProps('switchComponent',1),
            iFormProps: {
                label: '',
            },
        });
        /** 普通文本 */
        formUtils.renderTextConfig({
            iAntdProps: formUtils.createAntdProps('textComponent',1),
            iFormProps: {
                label: '',
            },
        });
        return [
            formUtils.getFormConfig('inputComponent'),
            formUtils.getFormConfig('selectComponent'),
            formUtils.getFormConfig('dateComponent'),
            formUtils.getFormConfig('radioComponent'),
            formUtils.getFormConfig('switchComponent'),
            formUtils.getFormConfig('textComponent'),
        ]
    }
    render() {
        console.log('render parent',this.state.list);
        return (<LegionsProPageContainer
            operation={<Row>
                    <Button type="primary" onClick={() => {
                        let data = [
                            ...this.state.list,
                            {
                                ...new TableEntity(),
                                index: this.state.list.length,
                            },
                        ]
                        this.setState({list:data})
                    }}>添加行</Button>
                    <Button type="primary" style={{marginLeft: 5}} onClick={() => {
                        let list = this.state.list
                        list[0].inputComponent = `${new Date().getTime()}`
                        this.setState({list:list})
                    }}>改变某个单元格数据</Button>
                    <Button type="primary" style={{marginLeft: 5}} onClick={() => {
                        this.formRef.viewModel.form.validateFields(() => void 0);
                    }}>表单校验</Button>
                    <Button type="primary" style={{marginLeft: 5}} onClick={() => {
                        console.log(toJS(this.state.list))
                    }}>打印列表数据</Button>
                </Row>}
            content={
                <Row>
                    <LegionsProTableForm<TableEntity>
                    proFormConfig={{
                        controls: this.createConfig(),
                        onReady: (_, formRef) => {
                            formRef.viewModel.enableEnterSwitch = true;
                            this.formRef = formRef;
                        },

                    }}
                    proTableConfig={{
                        columns: tableColumns(this),
                        dataSource: this.state.list.slice(),
                        uniqueKey: 'index',
                    }}
                    onChange={(dataList) => {
                        this.setState({list:dataList})
                    }}
                ></LegionsProTableForm>

                </Row>
            }
        ></LegionsProPageContainer>)
    }
}
const root = props => {
  return <ProTableFormDemo></ProTableFormDemo>;
};
const app = create();
ReactDOM.render(React.createElement(app.start(root)), mountNode);
```
