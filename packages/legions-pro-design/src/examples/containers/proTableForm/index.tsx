import { Button,Col,Input,Row } from 'antd';
import React,{useState} from 'react';
import { bind,observer } from 'legions/store-react';
import { LegionsProForm,LegionsProPageContainer, LegionsProTable, LegionsProTableForm } from '../../../components';
import { observablePromise, observableViewModel } from 'legions/store-utils';
import { observable } from 'legions/store';
import { HttpConfig } from '../../constants/httpConfig';
import { InstanceProForm } from '../../../components/LegionsProForm/interface'
import { TableFormDemoField } from './model';
import { ClassOf } from 'legions-lunar/types/api/typescript';
import moment from 'moment';
import { toJS } from 'mobx';
import { cloneDeep } from 'lodash'
import { IProTableFormColumnConfigProps } from 'components/LegionsProTableForm/interface';
interface IProps { }
interface IState {
    visible: boolean;
    disabled: boolean;
    xssValue: string;
}
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
/** 表格列配置 */
const tableColumns = (viewModel: PageViewModel,that:ProTableForm): IProTableFormColumnConfigProps<TableEntity>[] => [
    { title: '序号', width: 40, dataIndex: 'index' },
    { title: '文本框', width: 150, dataIndex: 'inputComponent' },
    { title: '下拉框', width: 180, dataIndex: 'selectComponent' },
    { title: '日期选择框', width: 150, dataIndex: 'dateComponent', render: (text, record, index) => record.dateComponent.format('YYYY-MM-DD HH:mm:ss')},
    { title: '单选框', width: 160, dataIndex: 'radioComponent' },
    { title: '开关', width: 60, dataIndex: 'switchComponent', render: (text, record, index) => `${record.switchComponent}`},
    { title: '普通文本', width: 80, dataIndex: 'textComponent' },
    { title: '操作', width: 140, dataIndex: 'test', render: (text, record) => {
        const index = record['index'];
        return <div>
            <Button type="primary" onClick={() => {
                if (record['isRecordEdit']) {
                    
                    that.formRef.viewModel.form.validateFields((error) => {
                        console.log( that.formRef,' that.formRef');
                        if (!error) {
                            that.formRef.methods.updateRecordEditData(record);
                        }
                    });
                    /* that.formRef.methods.updateRecordEditData(record); */
                } else {
                    
                    that.formRef.methods.updateRecordEditData(record);
                }
            }}>
                {record['isRecordEdit'] ? '保存' : '编辑'}
            </Button>
            <Button type="danger" style={{marginLeft: 5}} onClick={() => {
                const list = [...viewModel.list];
                list.splice(index, 1);
                viewModel.list = list.map((item, index) => ({...item, index}));
            }}>删除</Button>
        </div>
    }},
]
class PageViewModel {
    @observable list: TableEntity[] = [
        {...new TableEntity(), index: 0},
        {...new TableEntity(), index: 1},
        {...new TableEntity(), index: 2},
    ];
}
@observer
export class ProTableForm extends LegionsProTable.ProTableBaseClass<IProps,IState,TableEntity> {
    formRef: InstanceProForm
    viewModel = observableViewModel<PageViewModel>(new PageViewModel());

    constructor(props: IProps) {
        super(props)
        this.state = {
            visible: true,
            disabled: false,
            xssValue: '',
        }
        this.pushColumns('key',  { title: '序号', width: 40,render:(text,record,index)=>index + 1})
        this.pushColumns('inputComponent',  { title: '文本框', width: 150,},)
        this.pushColumns('selectComponent', { title: '下拉框', width: 180 },)
        this.pushColumns('dateComponent',  { title: '日期选择框', width: 150, render: (text, record, index) => record.dateComponent.format('YYYY-MM-DD HH:mm:ss')})
        this.pushColumns('radioComponent',  { title: '单选框', width: 160 })
        this.pushColumns('switchComponent',  { title: '开关', width: 60, render: (text, record, index) => `${record.switchComponent}`})
        this.pushColumns('textComponent', { title: '普通文本', width: 80 })
        this.pushColumns('test', { title: '操作', width: 140, render: (text, record) => {
            const index = record['index'];
            return <div>
                <Button type="primary" onClick={() => {
                    if (record['isRecordEdit']) {
                        console.log('tableColumns');
                        this.formRef.viewModel.form.validateFields((error) => {
                            if (!error) {
                                this.formRef.methods.updateRecordEditData(record);
                            }
                        });
                    } else {
                        console.log(this.formRef.viewModel,record);
                        this.formRef.methods.updateRecordEditData(record);
                    }
                }}>
                    {record['isRecordEdit'] ? '保存' : '编辑'}
                </Button>
                <Button type="danger" style={{marginLeft: 5}} onClick={() => {
                    this.formRef.methods.deleteEditRecord(record['index'])
                }}>删除</Button>
            </div>
        }})
    }
    arr = this.createConfig()
    createConfig() {
        const rules = TableFormDemoField.initFormRules<TableFormDemoField,{}>(TableFormDemoField,{})
        const formUtils = new LegionsProForm.ProFormUtils();
        /** input */
        formUtils.renderInputConfig({
            iAntdProps: formUtils.createAntdProps('inputComponent',1),
            iFormProps: {
                ...formUtils.createLayout('',0,2 * 12),
                colon: false,
            },
            rules: rules.input,
        });
        /** select */
        formUtils.renderSelectConfig({
            iAntdProps: formUtils.createAntdProps('selectComponent',1),
            iFormProps: {
                ...formUtils.createLayout('',0,2 * 12),
                colon: false,
                options: [{ key: '1',value: '服务1' },{ key: '2',value: '服务2' }],
            },
            rules: rules.select,
        });
        /** 日期 */
        formUtils.renderDatePickerConfig({
            iAntdProps: formUtils.createAntdProps('dateComponent',1),
            iFormProps: {
                ...formUtils.createLayout('',0,2 * 12),
                colon: false,
                format:'YYYY-MM-DD'
            },
            rules: rules.date,
        });
        /** 单选 */
        formUtils.renderRadioButtonConfig({
            iAntdProps: formUtils.createAntdProps('radioComponent',1),
            iFormProps: {
                ...formUtils.createLayout('',0,2 * 12),
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
        console.log('render parent',this.viewModel);
        return (<LegionsProPageContainer
            query={null}
            content={
                <Row>
                    <Button type="primary" onClick={() => {
                        /* this.formRef.methods.addEditRecord(()=>({index:Date.now()})) */
                        this.formRef.methods.addEditRecord(new TableEntity)
                    }}>添加行</Button>
                    <Button type="primary" style={{marginLeft: 5}} onClick={() => {
                        this.viewModel.list[0].inputComponent = `${new Date().getTime()}`,
                            this.viewModel.list = [...this.viewModel.list];
                    }}>改变某个单元格数据</Button>
                    <Button type="primary" style={{marginLeft: 5}} onClick={() => {
                        this.formRef.viewModel.form.validateFields(() => void 0);
                    }}>表单校验</Button>
                    <Button type="primary" style={{marginLeft: 5}} onClick={() => {
                        console.log(toJS(this.viewModel.list))
                    }}>打印列表数据</Button>
                    <LegionsProTableForm<TableEntity>
                    proFormConfig={{
                        controls: this.arr,
                        onReady: (_, formRef) => {
                            formRef.viewModel.enableEnterSwitch = true;
                            this.formRef = formRef;
                        },
                    }}
                    proTableConfig={{
                        columns: this.columnsData,
                        dataSource: cloneDeep([...this.viewModel.list]),
                        uniqueKey: 'index',

                    }}
                    onChange={(dataList) => {
                        /* this.viewModel.list = dataList; */
                    }}
                ></LegionsProTableForm>

                </Row>
            }
        ></LegionsProPageContainer>)
    }
}

