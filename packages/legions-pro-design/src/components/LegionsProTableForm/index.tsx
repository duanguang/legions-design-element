/*
 * @Author: duanguang 
 * @Date: 2020-08-05 12:02:20 
 * @Last Modified by: duanguang
 * @Last Modified time: 2020-11-03 10:07:18
 * @description: 动态表格编辑组件，hlTable+hlForm
 */
import { debounce } from 'legions-utils-tool/debounce';
import React from 'react';
import { BaseFormFields } from 'legions-lunar/model';
import { LabelWithDatePickerModel,LabelWithHLSelectModel,LabelWithInputNumberModel,LabelWithMonthPickerModel,LabelWithRadioButtonModel,LabelWithRangePickerModel,LabelWithRenderModel,LabelWithSelectModel,LabelWithSwitchModel,LabelWithTextModel,LabelWithUploadModel } from '../../models/HLForm';
import HLTable from '../hlTable/HlTable';
import { ITableColumnConfigProps,Weaken,TableFormColumnsType,IAntdRule,ClassOf,ITableColumnConfig,TableColumnConfig,WrappedFormUtils } from '../../typings/antd';
import { IHLTableProps,InstanceHlTable } from '../../typings/components';
import { HLFormUtils,InstanceForm } from '../hlForm';
import CreateForm from '../hlForm/CreateForm';
import { LabelWithInputModel } from '../hlForm/FormInput';
import { HLFormContainer,IHLFormProps } from '../hlForm/HlForm';
import styles from './index.modules.less';
import { toJS } from 'mobx';
import { cloneDeep } from 'lodash';
import { shortHash } from 'legions-lunar/object-hash';
import get from 'lodash/get'
import set from 'lodash/set'
import has from 'lodash/has'
/** 分割符，用于给表单字段添加下标时使用 */
export const HLTableFormSeparator = '___';
interface IHlFormConfig<F> extends Partial<IHLFormProps<F>>,Weaken<Partial<IHLFormProps<F>>,'controls' | 'onGetForm'> {
    /**
    * 获取表单数据模型
    * form  即将废弃，请formRef.viewModel.form 获取 
    *
    * @memberof IHLFormProps
    */
    onGetForm?: (
        /**即将废弃，请formRef.viewModel.form 获取 */
        form: WrappedFormUtils,
        formRef?: InstanceForm) => void;
    controls: any[];
    /** 表单验证规则函数类 */
    ruleClassDeclaration?: Function;
    /** 表单实体函数类 */
    formFieldsClassDeclaration?: Function;
}
export class HLTableFormProps<T = {},F = {}> {
    /**
     * hlForm配置，只需要传入controls，组件会根据表单字段名称自动匹配并生成可编辑表格
     * 无需配置mapPropsToFields和onFieldsChange，本组件已托管
     * 暂不支持select下拉请求托管
     * @type {Partial<IHLFormProps<F>>}
     * @memberof HLTableFormProps
     */
    hlFormConfig: IHlFormConfig<F>;
    // hlFormConfig: Partial<IHLFormProps<F>> & {
    //     /** 表单验证规则函数类 */
    //     ruleClassDeclaration: Function;
    //     /** 表单实体函数类 */
    //     formFieldsClassDeclaration: Function;
    // };
    /**
     * hlTable配置
     * @type {Partial<IHLTableProps<T>>}
     * @memberof HLTableFormProps
     */
    hlTableConfig: IHLTableProps<T>;
    /**
     * 容器样式
     * @type {React.CSSProperties}
     * @memberof HLTableFormProps
     */
    style?: React.CSSProperties;
    /**
     * 容器类名
     * @type {string}
     * @memberof HLTableFormProps
     */
    className?: string = '';
    /**
     * 数据变化监听
     * @memberof HLTableFormProps
     */
    onChange?: (dataList: T[]) => void = () => void 0;
}
const formUtils = new HLFormUtils();
type IFormRules<FormRules> = {
    [P in keyof FormRules]: IAntdRule[];
}
interface IState<T = {}> {
    data: T[];
    recordEditData: Map<string,boolean>
}
export default class LegionsProTableForm<T = {},F = {}> extends CreateForm<HLTableFormProps<T,F>,IState<T>>{
    static defaultProps = new HLTableFormProps() as Object;
    /** 用于缓存上一次onFieldsChange中改变的状态，除了value */
    fieldsOtherCache = new Map();
    /** 行缓存, 避免表格render多次执行导致表单各种行为异常 */
    recordCache = new Map();
    /** 表单实体 */
    formRef: InstanceForm = null;
    rules: IFormRules<any> = null;
    /** 行唯一id */
    get uniqueKey() {
        /*  const { hlTableConfig: { uniqueKey } = {} } = this.props;
         return uniqueKey; */
        return 'hlTableFormItemKey'
    }

    constructor(props: HLTableFormProps<T,F>) {
        super(props);
        /* const {ruleClassDeclaration,formFieldsClassDeclaration} = this.props.hlFormConfig;
        invariant((ruleClassDeclaration.prototype instanceof formFieldsClassDeclaration), `规则实体类验证: 验证规则函数类原型没有继承表单实体函数类,请检查参数props.ruleClassDeclaration及props.formFieldsClassDeclaration`);
        invariant((formFieldsClassDeclaration.prototype instanceof BaseFormFields), `表单实体函数类验证: 表单实体函数类原型没有继承BaseFormFields函数类,请检查参数props.formFieldsClassDeclaration`);
        // @ts-ignore
        this.rules = ruleClassDeclaration['createFormRules']<ruleClassDeclaration>(ruleClassDeclaration); */
        this.state = {
            data: this.tranformData(cloneDeep(toJS(this.props.hlTableConfig.data))),
            recordEditData: new Map(),
        }
    }
    updateRecordEditData = (record: Object) => {
        const { data } = this.state;
        const index = data.findIndex((item) => {
            return get(item,this.uniqueKey) === get(record,this.uniqueKey)
        })
        if (index > -1) {
            const isRecordEdit = !get(data[index],'isRecordEdit');
            set(data[index],'isRecordEdit',isRecordEdit)
            this.setState({
                data: data
            })
        }
    }
    tranformData(data: T[]) {
        return data.map((item,index) => {
            const hlTableFormItem = {};
            if (!has(item,this.uniqueKey)) {
                hlTableFormItem[this.uniqueKey] = `${shortHash(new Date().getTime())}${index}`
            }
            return {
                isRecordEdit: false,
                ...item,
                ...hlTableFormItem,
            }
        })
    }
    componentWillReceiveProps(nextProps: HLTableFormProps<T,F>) {
        const { hlTableConfig: { data = [] } } = this.props;
        const { hlTableConfig: { data: nextData = [] } } = nextProps;
        /** 列表长度变化时，清空缓存 */
        if (data.length !== nextData.length) {
            this.fieldsOtherCache.clear()
            this.recordCache.clear()
        }
        if (nextData !== data) {
            this.setState({
                data: this.tranformData(cloneDeep(toJS(nextData)))
            })
        }
    }
    renderComponent(column: TableColumnConfig<T> & ITableColumnConfig) {
        /*  if (column.formItemType === 'input') {
            return formUtils.renderInputConfig({
                 iAntdProps: formUtils.createAntdProps(column.dataIndex, 1),
                 iFormProps: {
                     label: '',
                 },
                 rules: this.rules[column.dataIndex],
             });
         } */
    }
    createControl = (control: any,key: number,formRef: InstanceForm) => {
        const { uid,viewModel: { form } } = formRef;
        /** 给表单字段id，名称，校验规则添加下标 */
        const newControl = {
            ...control,
            iAntdProps: {
                ...control.iAntdProps,
                id: `${control.iAntdProps.id}${HLTableFormSeparator}${key}`,
                name: `${control.iAntdProps.name}${HLTableFormSeparator}${key}`,
            }
        }
        if (control instanceof LabelWithInputModel) {
            return super.createFormInput(key,newControl,form,uid,formRef);
        }
        else if (control instanceof LabelWithInputNumberModel) {
            return super.createFormInputNumber(key,newControl,form,uid,formRef);
        }
        else if (control instanceof LabelWithSelectModel || control instanceof LabelWithHLSelectModel) {
            return super.createFormSelect(key,newControl,form,uid,formRef);
        }
        else if (control instanceof LabelWithRenderModel) {

            return super.createFormRender(key,newControl,form,formRef);
        }
        else if (control instanceof LabelWithDatePickerModel) {
            return super.createFormDatePicker(key,newControl,form,uid,formRef);
        }
        else if (control instanceof LabelWithMonthPickerModel) {
            return super.createFormMonthPicker(key,newControl,form,uid,formRef);
        }
        else if (control instanceof LabelWithRangePickerModel) {
            return super.createFormRangePicker(key,newControl,form,uid,formRef);
        }
        else if (control instanceof LabelWithUploadModel) {
            return super.createFormUpload(key,newControl,form,uid,formRef);
        }
        else if (control instanceof LabelWithSwitchModel) {
            return super.createFormSwitch(key,newControl,form,uid,formRef)
        }
        else if (control instanceof LabelWithRadioButtonModel) {
            return super.createFormRadioButton(key,newControl,form,uid,formRef)
        }
        else if (control instanceof LabelWithTextModel) {
            return super.createFormText(key,newControl,form,uid,formRef)
        }
        else {
            throw new Error(`ComponentClass: Unknown control. control = ${JSON.stringify(control)}`);
        }
    }
    /** 创建行表单 */
    createTable = () => {
        const formUtils = new HLFormUtils();
        const { hlTableConfig,hlTableConfig: { columns } = {},hlFormConfig: { controls } = {} } = this.props;
        /** 根据表格列名和表单字段名自动匹配渲染 */
        const newColumns = (formRef: InstanceForm) => (columns || []).map((item,pIndex): ITableColumnConfigProps => {
            const control = controls && controls.find((i) => i.iAntdProps.id === item.dataIndex);
            const itemRender = {};
            if (item.render) {
                itemRender['render'] = (text,record: T,index) => {
                    const newItem = this.state.data.find((item) => item[this.uniqueKey] === record[this.uniqueKey])
                    return item.render(text,newItem || record,index);
                }
            }
            return control ? {
                ...item,
                render: (text,record: T,index) => {
                    const key = `${pIndex}${record[this.uniqueKey]}`;
                    const newItem = this.state.data.find((item) => item[this.uniqueKey] === record[this.uniqueKey])
                    const formRecord = this.recordCache.get(key)
                        ? this.recordCache.get(key)
                        : this.createControl(control,record[this.uniqueKey],formRef);
                    this.recordCache.set(key,formRecord);
                    return (newItem && newItem['isRecordEdit']) ? formRecord : item.render ? item.render(text,newItem || record,index) : text;
                },
            } : {
                    ...item,
                    ...itemRender,
                };
        })
        formUtils.renderCustomConfig({
            iAntdProps: formUtils.createAntdProps('table',1,'',{ span: 24 }),
            iFormProps: {
                render: (form,iAntdProps,rules,formRef: InstanceForm) => {
                    const { data } = this.state
                    return formRef && <HLTable<T>
                        {...hlTableConfig}
                        data={data}
                        onPagingQuery={(page: number,pageSize: number,isChangePageSize?: boolean) => {
                            const { hlTableConfig } = this.props;
                            /** 触发表单的setFields，实现table分页切换时，表单数据不异常 */
                            this.formRef.viewModel.form.setFields({});
                            hlTableConfig.onPagingQuery && hlTableConfig.onPagingQuery(page,pageSize,isChangePageSize);
                        }}
                        isOpenRowChange
                        columns={newColumns(formRef)}
                    ></HLTable>
                }
            }
        })
        return [formUtils.getFormConfig('table')]
    }
    /** 数据转化，列表数据转化为表单数据 */
    listToFormData = (data: T[] = []) => {
        let newModel = {};
        if (data.length === 0) {
            return {};
        }
        data.forEach((item) => {
            const obj = {}
            Object.keys(item).forEach((key: string) => {
                const separator = `${key}${HLTableFormSeparator}${item[this.uniqueKey]}`
                obj[separator] = {
                    ...this.fieldsOtherCache.get(separator),
                    value: item[key]
                }
            })
            newModel = {
                ...newModel,
                ...obj,
            }
        })
        return newModel
    }
    /** 数据转化，表单数据转列表数据 */
    formDataToList = (data: T[],fields: Partial<F>) => {
        let newData = [...data];
        Object.keys(fields).forEach((key: string) => {
            const separator = key.split(HLTableFormSeparator);
            const name = separator[0];
            const rowIndex = data.findIndex((item) => `${item[this.uniqueKey]}` === separator[1])
            if (name && rowIndex >= 0 && fields && fields[key]) {
                this.fieldsOtherCache.set(key,fields[key])
                newData[rowIndex] = {
                    ...newData[rowIndex],
                    [name]: fields[key]['value']
                }
            }
        })
        return newData;
    }

    render() {
        const { style,className,hlFormConfig } = this.props;
        const { data } = this.state;
        return (
            <div style={style} className={`HLTableForm ${styles.wrap} ${className}`}>
                <HLFormContainer<F>
                    key={data.length}
                    {...this.listToFormData(data)}
                    {...hlFormConfig}
                    //@ts-ignore
                    uniqueUid={this.props['uniqueUid']}
                    onGetForm={(form,formRef) => {
                        this.formRef = formRef;
                        hlFormConfig.onGetForm && hlFormConfig.onGetForm(form,{
                            ...formRef,methods: {
                                updateRecordEditData: this.updateRecordEditData
                            }
                        })
                    }}
                    mapPropsToFields={(props) => {
                        return new BaseFormFields.initMapPropsToFields(props)
                    }}
                    onFieldsChange={debounce((props,fields) => {
                        this.props.onChange(this.formDataToList(data,fields));
                        hlFormConfig.onFieldsChange && hlFormConfig.onFieldsChange(props,fields)
                    },10) as () => void}
                    controls={this.createTable()}
                />
            </div>
        )
    }
}
