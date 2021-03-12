import { Button,Col,Input,Row } from 'antd';
import React from 'react';
import { bind,observer } from 'legions/store-react';
import { LegionsProForm,LegionsProPageContainer, LegionsProTableForm } from '../../../components';
import { observablePromise, observableViewModel } from 'legions/store-utils';
import { observable } from 'legions/store';
import { HttpConfig } from '../../constants/httpConfig';
import { InstanceProForm } from '../../../components/LegionsProForm/interface'
import { TableFormDemoField } from './model';
import { ClassOf } from 'legions-lunar/types/api/typescript';
import moment from 'moment';
import { toJS } from 'mobx';
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
    { title: '单选框', width: 140, dataIndex: 'radioComponent' },
    { title: '开关', width: 80, dataIndex: 'switchComponent', render: (text, record, index) => `${record.switchComponent}`},
    { title: '普通文本', width: 80, dataIndex: 'textComponent' },
    { title: '操作', width: 120, dataIndex: 'test', render: (text, record) => {
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
export class ProTableForm extends React.Component<IProps,IState> {
    formRef: InstanceProForm
    viewModel = observableViewModel<PageViewModel>(new PageViewModel());

    constructor(props: IProps) {
        super(props)
        this.state = {
            visible: true,
            disabled: false,
            xssValue: '',
        }
    }
    arr = this.createConfig()
    componentDidMount() {
        /* this.formRef.viewModel.setFormState('price',{visible:false}) */
    }
    createConfig() {
        const rules = TableFormDemoField.initFormRules<TableFormDemoField,{}>(TableFormDemoField,{})
        const formUtils = new LegionsProForm.ProFormUtils();
        /** input */
        formUtils.renderInputConfig({
            iAntdProps: formUtils.createAntdProps('inputComponent',1),
            iFormProps: {
                ...formUtils.createLayout(' ',2,2 * 9),
                colon: false,
            },
            rules: rules.input,
        });
        /** select */
        formUtils.renderSelectConfig({
            iAntdProps: formUtils.createAntdProps('selectComponent',1),
            iFormProps: {
                ...formUtils.createLayout(' ',2,2 * 9),
                colon: false,
                options: [{ key: '1',value: '服务1' },{ key: '2',value: '服务2' }],
            },
            rules: rules.select,
        });
        /** 日期 */
        formUtils.renderDatePickerConfig({
            iAntdProps: formUtils.createAntdProps('dateComponent',1),
            iFormProps: {
                ...formUtils.createLayout(' ',3,2 * 9),
                colon: false,
                format:'YYYY-MM-DD'
            },
            rules: rules.date,
        });
        /** 单选 */
        formUtils.renderRadioButtonConfig({
            iAntdProps: formUtils.createAntdProps('radioComponent',1),
            iFormProps: {
                ...formUtils.createLayout(' ',3,2 * 9),
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
        console.log('render parent',this.viewModel.list);

        return (<LegionsProPageContainer
            query={null}
            content={
                <Row>
                    <Button type="primary" onClick={() => {
                        this.viewModel.list = [
                            ...this.viewModel.list,
                            {
                                ...new TableEntity(),
                                index: this.viewModel.list.length,
                            },
                        ]
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
                        controls: this.createConfig(),
                        onReady: (_, formRef) => {
                            formRef.viewModel.enableEnterSwitch = true;
                            this.formRef = formRef;
                        },
                  
                    }}
                    proTableConfig={{
                        columns: tableColumns(this.viewModel,this),
                        dataSource: this.viewModel.list,
                        uniqueKey: 'index',
                        pageSize: 2,
                    }}
                    onChange={(dataList) => {
                        this.viewModel.list = dataList;
                    }}
                ></LegionsProTableForm>

                </Row>
            }
        ></LegionsProPageContainer>)
    }
}

