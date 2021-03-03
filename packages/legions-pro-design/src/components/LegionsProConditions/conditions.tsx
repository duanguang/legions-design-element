import React from 'react';
import './style/index.less'
import {
    Row,
    Col,
    Input,
    Select,
    DatePicker,
    Checkbox,
    Button,
    Radio,
    InputNumber,
    Icon,
    Tooltip,
    message,
    Dropdown,
    Menu,
} from 'antd';
import moment from 'moment';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
import { bind,observer } from 'legions/store-react'
import { Weaken } from '../interface'
import LegionsProSelect from '../LegionsProSelect';
import { IProSelectProps } from '../LegionsProSelect/interface'
import LegionsStoreConditions from '../LegionsStoreConditions';
import { IViewQueryConditionStore,ISelectAutoQuery } from '../LegionsStoreConditions/interface';
import { shortHash } from 'legions-lunar/object-hash';
import ReactDOM,{ findDOMNode } from "react-dom";
import { debounce } from 'legions-utils-tool/debounce'
import { cloneDeep } from 'lodash'
import { HlLabeledValue } from 'legions-lunar/model';
import { IFieldsState,IQueryConditionsInstance,IQueryDateProps,IQueryProps,IQueryRangePickerProps,IQuerySelectProps,IQueryTextAreaProps,IQueryTextProps,ISelectProps } from './interface';
import { ConditionCheckBoxModel,ConditionDateModel,ConditionGroupCheckBoxModel,ConditionRadioButtonModel,ConditionRangePickerModel,ConditionSearchModel,ConditionSelectModel,ConditionTextAreaModel,ConditionTextModel,ConditionTextNumberModel,IProConditions,ProConditions } from './ProConditionsUtils';
import { isArray } from 'legions-utils-tool/type.validation';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import LegionsProDragger from '../LegionsProDragger';
const { RangePicker } = DatePicker;
const Option = Select.Option;
const { TextArea } = Input;
const baseCls = `legions-pro-query`
interface IRadioButtonProps {
    value: string
    label: string,
    disabled?: boolean
}

interface IProps {
    query: Array<IProConditions['componentModel']>,
    store?: InstanceType<typeof LegionsStoreConditions>,
    /**
     *
     * 组件完成渲染时执行，有DOM结构，执行的钩子函数
     * @memberof IProps
     */
    onDidMount?: (value: {

        /**
         *
         * 组件真实高度
         * @type {number}
         */
        height: number,

        /**
         *
         * 组件唯一UID
         * @type {string}
         */
        uid: string
    }) => void,
    /**
      *  组件componentWillMount 执行
      */
    onReady?: (instance: IQueryConditionsInstance) => void;

    size?: 'default' | 'small';

    /**
     * 默认是否展开 折叠区域内容
     *
     * @type {boolean}
     * @memberof IProps
     */
    defaultCollapsed?: boolean;
    /**
     * 主要用于当父组件中存在多个搜索组件时，标记key 来保证父级组件中搜索组件唯一
     * 持久化查询输入值时，保证值绝对唯一，生成hash 存入数据库，并且作为查询主键
     * 如果不传，则系统默认生成，此时如果在数据库持久化查询条件，则需要保证搜索组件唯一，及父级组件路径不能产生变化
     * @type {string}
     * @memberof IProps
     */
    uniqueKeys?: string;
    /** 是否拖拽排序 */
    isDragSort?: boolean;
    /** 收起按钮的事件 */
    onCollapse?: (collapsed: boolean,viewEntity?: IViewQueryConditionStore) => void;
}
interface IState {
    collapsed: boolean
}
@bind({ store: LegionsStoreConditions })
@observer
export default class LegionsProConditions<Query = {}> extends React.Component<IProps,IState>{
    /* search =debounce((options,val)=>{
       options&&options.props.onSearch&&options.props.onSearch(val)
    },200) */
    static ProConditions = ProConditions
    static ConditionSelectModel = ConditionSelectModel;
    static ConditionTextNumberModel = ConditionTextNumberModel;
    static ConditionRadioButtonModel = ConditionRadioButtonModel;
    static ConditionTextAreaModel = ConditionTextAreaModel;
    static ConditionTextModel = ConditionTextModel;
    static ConditionDateModel = ConditionDateModel;
    static ConditionSearchModel = ConditionSearchModel;
    static ConditionRangePickerModel = ConditionRangePickerModel;
    static ConditionCheckBoxModel = ConditionCheckBoxModel;
    static ConditionGroupCheckBoxModel = ConditionGroupCheckBoxModel;
    resize = debounce(() => {
        const queryDom = document.querySelector(`.${this.uid}`);
        if (queryDom && findDOMNode(queryDom) && this.viewStore) {
            this.viewStore.widthContainer = findDOMNode(queryDom).clientWidth;
        }
    },500)
    timeId = new Date().getTime()
    uid = `Query${shortHash(this.timeId)}`;
    queryPrams = {};
    // @ts-ignore
    /* MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver
    observer= null */
    constructor(props) {
        super(props)
        this.state = {
            collapsed: this.props.defaultCollapsed,
        }
        if (this.props['uniqueUid']) {
            this.uid = `Query${shortHash(this.props['uniqueUid'])}`
        }
        else {
            this.uid = `Query${this.props.store.ConditionContainer.size}${shortHash(`${this.timeId}${this.props.store.ConditionContainer.size}`)}`
            if (this.props.store.ConditionContainer.has(this.uid)) {
                this.timeId = new Date().getTime()
                this.uid = `Query${this.props.store.ConditionContainer.size}${shortHash(`${this.timeId}${this.props.store.ConditionContainer.size}`)}`
            }
        }
        this.consoleLog('constructor')
    }
    //@ts-ignore
    get viewStore() {
        return this.props.store.ConditionContainer.get(this.uid)
    }
    get vmModel() {
       return this.viewStore.computedVmModel;
    }
    static defaultProps = {
        size: 'default',
        defaultCollapsed:true,
    }
    consoleLog(type: string,logObj?: Object) {
        const obj = logObj || {}
        const name = 'LegionsConditionsDebug'
        if (window[name] && typeof window[name] === 'function') {
            window[name]({ store: this.viewStore,state: this.state,...obj,that: this },`name-${type}`)
        }
    }
    componentWillMount() {
        if (!this.props.store.ConditionContainer.has(this.uid)) {
            this.props.store.add(this.uid);
            this.initVModel();
            this.viewStore._initQuery(this.props.query);
        }
        this.viewStore._setSize(this.props.size);
        this.props.onReady && this.props.onReady({
            store: this.props.store,uid: this.uid,viewModel: this.viewStore,methods: {
                reset: () => {
                    this.handleReset()
                },
                setFieldsValues: (name: string,callback: (value: IProConditions['componentModel']) => void)=>{
                    this.setFieldsValues(name,callback);
                },
                getQuerySelectOption: (name: string,optionKey: string) => {
                    const selectConfigs = this.props.query.filter((item) => item instanceof ConditionSelectModel);
                    const index = selectConfigs.findIndex((item) => item.containerProps.name === name);
                    let newData = [] as Array<ISelectProps>
                    let optionItem = new HlLabeledValue();
                    if (index > -1) {
                        const item = selectConfigs[index].conditionsProps as IQuerySelectProps;
                        newData = item.options as Array<ISelectProps>
                        if (item.autoQuery) {
                            const autoObData = this.viewStore.selectOptions.get(name);
                            if (autoObData) {
                                const autoData = item.autoQuery.transform(autoObData.obData)
                                newData = autoData.data;
                            }
                        }
                        const option = newData.find((item) => item.key === optionKey)
                        optionItem = {
                            ...optionItem,
                            ...option,
                        }
                    }
                    return {
                        item: optionItem,
                        options: newData,
                    }
                },
                onRrmoteSearch: (name: string,params: {
                    pageIndex: number;
                    pageSize?: number;
                    keyWords?: string;
                } & Object) => {
                    const selectConfigs = this.props.query.filter((item) => item instanceof ConditionSelectModel);
                    const index = selectConfigs.findIndex((item) => item.containerProps.name === name);
                    if (index > -1) {
                        const item = selectConfigs[index].conditionsProps as IQuerySelectProps;
                        if (item.autoQuery) {
                            this.viewStore._dispatchRequest(name,item.autoQuery,params)
                        }
                    }
                }
            }
        })
        this.consoleLog('componentWillMount')
    }
    componentDidMount() {
        const queryDom = document.querySelector(`.${this.uid}`);
        const store = this.props.store.get(this.uid);
        if (queryDom && store) {
            this.onDidMount();
            window.addEventListener && window.addEventListener('resize',this.resize.bind(this))
        }
        this.dispatchRequest();
        this.consoleLog('componentDidMount')
    }
    componentWillReceiveProps(nextProps: IProps) {
        this.consoleLog('componentWillReceiveProps')
    }
    componentWillUnmount() {
        if (!this.props['uniqueUid']) {
            this.props.store.delete(this.uid)
        }
        window.removeEventListener && window.removeEventListener('resize',this.resize.bind(this))
        this.consoleLog('componentWillUnmount')
    }
    componentDidUpdate() {
        this.onDidMount()
        this.consoleLog('componentDidUpdate')
    }
    dispatchRequest() {
        const { query } = this.props;
        query.map((item) => {
            if (item instanceof ConditionSelectModel) {
                const props = item.conditionsProps as IQuerySelectProps;
                if (props.autoQuery && (props.autoQuery.isInitialize === void 0 || props.autoQuery.isInitialize)) {
                    this.viewStore._dispatchRequest(item.containerProps.name,props.autoQuery,{
                        pageIndex: 1,
                    })
                }
            }
        })
    }
    onDidMount() {
        const queryDom = document.querySelector(`.${this.uid}`);
        const store = this.props.store.get(this.uid)
        if (queryDom && store) {
            if (findDOMNode(queryDom).clientHeight) {
                store.domHeight = findDOMNode(queryDom).clientHeight
                store.widthContainer = findDOMNode(queryDom).clientWidth;
                this.props.onDidMount && this.props.onDidMount({ uid: this.uid,height: store.domHeight })
            }
        }
    }
    setFieldsValues(name: string,callback: (value: IProConditions['componentModel']) => void) {
        this.viewStore._setQueryState(name,(value) => {
            callback(value);
        });
    }
    initVModel() {
        let data = {}
        let prams = {}
        this.props.query.map((item) => {
            const name = item.containerProps.name;
            if (!(item instanceof ConditionSearchModel) && item.jsonProperty) {
                if (isArray(item.conditionsProps.defaultValue)) {
                    if (item instanceof ConditionRangePickerModel) {
                        data[name] = item.conditionsProps.defaultValue.map((m) => {
                            if (moment.isMoment(m)) {
                                return moment(m).format(item.conditionsProps.format||'YYYY-MM-DD HH:mm:ss')
                            }
                            return m;
                        })
                    } else {
                        data[name] = [...item.conditionsProps.defaultValue]
                    }
                }
                else {
                    let defaultValue = item.conditionsProps.defaultValue;
                    let value = item.conditionsProps.value;
                    if (item instanceof ConditionCheckBoxModel) {
                        defaultValue = item.conditionsProps.defaultChecked;
                        value = item.conditionsProps.checked || item.conditionsProps.value;
                    }
                    
                    let newValue = null;
                    if (item instanceof ConditionDateModel) {
                        const  format= item.conditionsProps.format||'YYYY-MM-DD HH:mm:ss'
                        if (moment.isMoment(defaultValue)) {
                            newValue = moment(defaultValue).format(format)
                        }
                        else if (moment.isMoment(value)) {
                            newValue =moment(value).format(format)
                        }
                        data[name] = newValue;
                    }
                    else {
                        data[name] = defaultValue || value
                    }
                }
                prams[item.jsonProperty] = data[name];
            }
        })
        this.queryPrams = prams;
        this.viewStore._setVmModel(data)
    }
    /**
     * 把组件元素结果映射至查询条件
     *
     * @memberof QueryConditions
     */
    mapQueryValue() {
        const { computedQuery } = this.viewStore
        let prams = this.queryPrams
        computedQuery.map((item) => {
            if (!(item instanceof ConditionSearchModel)) {
                prams[item.jsonProperty] = this.vmModel[item.containerProps.name]
            }
        })
        this.queryPrams = prams;
    }
    reset() {
        let data = this.vmModel
    /* let data = {...this.viewStore.computedVmModel} */
        const { computedQuery } = this.viewStore
        Object.keys(data).forEach((key) => {
            let entity = computedQuery.find((item) => item.containerProps.name === key)
            if (entity && !(entity instanceof ConditionSearchModel) && !entity.conditionsProps.isNotReset) {
                if (entity.conditionsProps.onReset) {
                    data[key] = entity.conditionsProps.onReset(key,data[key]);
                }
                else {
                    let  defaultValue = entity.conditionsProps.defaultValue;
                    const format = entity.conditionsProps['format'] || 'YYYY-MM-DD';
                    if (moment.isMoment(defaultValue)) {
                        data[key] = moment(defaultValue).format(format)
                    } else if (Array.isArray(defaultValue) && defaultValue.length>=2) {
                        data[key]=[ moment(defaultValue[0]).format(format), moment(defaultValue[1]).format(format)]
                    }
                    else if (entity instanceof ConditionCheckBoxModel) {
                        data[key] = entity.conditionsProps.defaultChecked;
                        defaultValue= data[key]
                    }
                    else {
                        data[key] = defaultValue || ''
                    }
                    this.setFieldsValues(entity.containerProps.name,(value) => {
                        if (value instanceof ConditionCheckBoxModel) {
                            value.conditionsProps.checked = defaultValue;
                        }
                        else {
                            value.conditionsProps['value'] = defaultValue;
                        }
                    })
                }
            }

        })
        this.viewStore._setVmModel(data);
        this.mapQueryValue();
    }
    handleChangeDate(component: ConditionDateModel | ConditionRangePickerModel,datas: moment.Moment | [moment.Moment,moment.Moment],dateString: string) {
        const name = component.containerProps.name;
        let data = this.vmModel;
        this.setFieldsValues(name,(value) => {
            value.conditionsProps['value'] = datas;
        })
        data[name] = dateString
        if (component instanceof ConditionDateModel) {
            component.conditionsProps.onChange && component.conditionsProps.onChange.call(this,{
                date:datas,dateString
            },{
                viewState: cloneDeep(data),
                parameter:cloneDeep(this.queryPrams),
            },this.viewStore)
        }
        else if (component instanceof ConditionRangePickerModel) {
            component.conditionsProps.onChange && component.conditionsProps.onChange.call(this,{
                date:datas,dateString
            },{
                viewState: cloneDeep(data),
                parameter:cloneDeep(this.queryPrams),
            },this.viewStore)
        }
        this.viewStore._setVmModel(data);
    }
    handleChangeChx(component: ConditionCheckBoxModel,even: React.ChangeEvent<HTMLInputElement>) {
        let value = even.target.checked;
        let data = this.vmModel;
        const name=component.containerProps.name
        data[name] = value;

        this.setFieldsValues(name,(values:ConditionCheckBoxModel) => {
            values.conditionsProps.checked = value;
        })
        component.conditionsProps.onChange && component.conditionsProps.onChange.call(this,even,{
            viewState: cloneDeep(data),
            parameter:cloneDeep(this.queryPrams),
        },this.viewStore)
        this.viewStore._setVmModel(data);
    }
    handleSelectSearch(component: ConditionSelectModel,value) {
        const props = component.conditionsProps;
        props.onSearch && props.onSearch(value)
    }
    handleChangeSelect(component: ConditionSelectModel,even) {
        let value = even
        const props = component.conditionsProps;
        const name = component.containerProps.name;
        if (Object.prototype.toString.call(even) === '[object Object]') {
            if (even.target) {
                value = even.target.value
            }
            else if (props.labelInValue) {
                value = even.key;
            }
        }
        if (isArray(even)) {
            value = even
        }
        let data = this.vmModel
        if (props.mode === 'combobox') {
            let entity = props.options.find((item) => item.key === value)
            if (props.labelInValue) {
                data[name] = even;
            }
            else {
                data[name] = entity ? entity.value : value
            }
        } else {
            data[name] = props.labelInValue ? even : value
        }
        if (value instanceof Array) {
            if (!value.every((item) => item)) {
                data[name] = '';
            }
        }
        this.setFieldsValues(name,(value:ConditionSelectModel) => {
            value.conditionsProps.value = data[name];
        })
        props.onChange && props.onChange.call(this,{
            viewState: cloneDeep(data),
            parameter:cloneDeep(this.queryPrams),
        },this.viewStore);
        this.viewStore._setVmModel(data);
    }
    /**
     * 重置数据
     *
     * @memberof QueryConditions
     */
    handleReset() {
        this.reset();
        this.mapQueryValue();
        const item =this.viewStore.computedQuery.find((item) => item instanceof ConditionSearchModel);
        if (item && item instanceof ConditionSearchModel) {
            item.conditionsProps.onReset && item.conditionsProps.onReset.call(this,cloneDeep(this.queryPrams),this.viewStore)
        }
    }
    /**
     * 搜索事件
     *
     * @memberof QueryConditions
     */
    handleSearch() {
        this.mapQueryValue()
        const item = this.viewStore.computedQuery.find((item) => item instanceof ConditionSearchModel);

        if (item && item instanceof ConditionSearchModel) {
            item.conditionsProps.onSearch && item.conditionsProps.onSearch.call(this,cloneDeep(this.queryPrams),this.viewStore)
        }
        this.consoleLog('handleSearch',{ stateParams: cloneDeep(this.queryPrams) })
    }
    /**
     * 回车搜索
     *
     * @param {Function} onEnter
     * @memberof QueryConditions
     */
    handleEnter(com: IProConditions['componentModel']) {
        const onEnter = com.conditionsProps['onEnter'];
        onEnter && onEnter.call(this,{
            viewState: cloneDeep(this.vmModel),
            parameter:cloneDeep(this.queryPrams),
        },this.viewStore)
        this.handleSearch()
    }
    handleToggle() {
        const onToggle = (toggle:boolean) => {
            const queryDom = document.querySelector(`.${this.uid}`);
            const height = findDOMNode(queryDom).clientHeight;
            this.viewStore.domHeight = height;
            this.props.onCollapse && this.props.onCollapse(toggle,this.viewStore)
            this.props.onDidMount && this.props.onDidMount({ height,uid: this.uid })
        }
        if (this.state.collapsed) {
            this.setState({
                collapsed: false
            },() => {
                    onToggle(false);
            })
        } else {
            this.setState({
                collapsed: true
            },() => {
                onToggle(true);
            })
        }
    }
    formatTrim(str) {
        if (str) {
            return str.replace(/(^\s+)|(\s+$)/g,"");
        }
        return str
    }
    handleChange(component: ConditionTextModel | ConditionTextAreaModel | ConditionRadioButtonModel | ConditionTextNumberModel,even) {
        let value = even;
        const name = component.containerProps.name;
        const props = component.conditionsProps;
        if (typeof even === 'object') {
            value = even.target.value
        }
        let data = this.vmModel
        data[name] = value
        if (component instanceof ConditionTextModel) {
            data[name] = this.formatTrim(value)
        }
        this.setFieldsValues(name,(value) => {
            value.conditionsProps['value']= data[name]
        })
        props['onChange']&&props.onChange.call(this,even,{
            viewState: cloneDeep(data),
            parameter:cloneDeep(this.queryPrams),
        },this.viewStore)
        this.viewStore._setVmModel(data);
    }
    handleGroupChxBox(component:ConditionGroupCheckBoxModel,checkedValue: Array<CheckboxValueType>) {
        let data = this.vmModel;
        const name = component.containerProps.name
        data[name] = checkedValue;
        this.setFieldsValues(name,(value:ConditionGroupCheckBoxModel) => {
            value.conditionsProps.value = checkedValue;
        })
        component.conditionsProps.onChange && component.conditionsProps.onChange.call(this,checkedValue,{
            viewState: cloneDeep(data),
            parameter:cloneDeep(this.queryPrams),
        },this.viewStore)
        this.viewStore._setVmModel(data);
    }
    renderComponent(component: IProConditions['componentModel']) {
        if (component instanceof ConditionTextAreaModel) {
            return this.renderInputTextArea(component)
        }
        else if (component instanceof ConditionTextModel) {
            return this.renderInput(component)
        }
        else if (component instanceof ConditionSelectModel) {
            return this.renderSelect(component);
        }
        else if (component instanceof ConditionDateModel) {
            return this.renderDate(component);
        }
        else if (component instanceof ConditionRangePickerModel) {
            return this.renderDateRange(component);
        }
        else if (component instanceof ConditionCheckBoxModel) {
            return this.renderChxBox(component);
        }
        else if (component instanceof ConditionTextNumberModel) {
            return this.renderInputNumber(component);
        }
        else if (component instanceof ConditionRadioButtonModel) {
            return this.renderRadioButton(component);
        }
        else if (component instanceof ConditionSearchModel) {
            return this.renderSearch(component);
        }
        else if (component instanceof ConditionGroupCheckBoxModel) {
            return this.renderGroupChxBox(component);
        }
        else {
            throw new Error(`
            ProConditions: Unknown query. query = ${JSON.stringify(component)}`);
        }
    }
    renderGroupChxBox(component: ConditionGroupCheckBoxModel) {
        const { conditionsProps,containerProps,jsonProperty } = component;
        const { labelSpan,defaultValue,visable,display,value=defaultValue,...prop } = conditionsProps
        return <Checkbox.Group {...prop}
            value={value}
            onChange={this.handleGroupChxBox.bind(this,component)} />
    }
    renderInput(component: ConditionTextModel) {
        const { conditionsProps,containerProps,jsonProperty } = component;
        let placeholder = conditionsProps.placeholder as string
        if (this.viewStore && this.viewStore.computedSize === 'small') {
            placeholder = ''
        }
        const { labelSpan,defaultValue,value=defaultValue,visable,display,...prop } = conditionsProps
        const suffix = value ? <Icon type="close-circle" onClick={() => {
            let state = this.vmModel;
            state[containerProps.name] = ''
            this.setFieldsValues(containerProps.name,(value:ConditionTextModel) => {
                value.conditionsProps.value=''
            })
            this.mapQueryValue()
        }} /> : null;
        return (
            <Tooltip
                trigger="focus"
                title={(this.formatTrim(value)) ? <pre>{value.replace('↵',',')}</pre> : null}
                placement="topLeft">
                <Input
                    maxLength={'50'}
                    suffix={suffix}
                    {...prop}
                    value={value}
                    onPressEnter={this.handleEnter.bind(this,component)}
                    onChange={this.handleChange.bind(this,component)}
                    placeholder={placeholder}
                >
                </Input>
            </Tooltip>
        )
    }
    renderInputTextArea(component: ConditionTextAreaModel) {
        const { conditionsProps,containerProps,jsonProperty } = component;
        let placeholder = conditionsProps.placeholder as string
        if (this.viewStore && this.viewStore.computedSize === 'small') {
            placeholder = ''
        }
        const { labelSpan,defaultValue,value=defaultValue,visable,display,...prop } = conditionsProps
        const { onReset,...themProps } = prop;
        const onEnter = conditionsProps.onEnter;
        return (
            <Tooltip
                overlayClassName="legions-pro-query-tooltip"
                trigger="focus"
                title={(this.formatTrim(value)) ? <pre>{value.replace('↵',',')}</pre> : null}
                placement="topLeft">
                <TextArea
                    maxLength={1500}
                    autosize={{ minRows: 1,maxRows: 1 }}
                    {...themProps}
                    value={value}
                    onPressEnter={this.handleEnter.bind(this,onEnter)}
                    onChange={this.handleChange.bind(this,component)}
                    placeholder={placeholder}
                /* onChange={this.handleChange.bind(this,option)} */
                />
                {/* <div className={styles.labelTooltipInput}>{label}</div> */}
            </Tooltip>
        );
    }
    renderSelect(component: ConditionSelectModel) {
        const { conditionsProps,containerProps,jsonProperty } = component;
        const placeholder = conditionsProps.placeholder as string
        let newData = conditionsProps.options as Array<ISelectProps>
        const { labelSpan,defaultValue,visable,display,value=defaultValue,...prop } = conditionsProps
        const firstActiveValue = newData.length > 0 ? [`${newData[0].key}`] : ''
        const autoObData = this.viewStore.selectOptions.get(containerProps.name);
        if (autoObData && prop.autoQuery) {
            const autoData = prop.autoQuery.transform(autoObData.obData)
            newData = autoData.data;
        }
        return (
            // @ts-ignore mode 为tags时，可以把随意输入的条目作为 tag，输入项不需要与下拉选项匹配
            <div>
                <LegionsProSelect
                    // notFoundContent={prop.loading? <Spin size="small" /> : null}
                    {...prop}
                    style={{ width: '100%' }}
                    placeholder={placeholder}
                    onSearch={this.handleSelectSearch.bind(this,component)}
                    onChange={this.handleChangeSelect.bind(this,component)}
                    value={value}
                    options={newData}
                    allowClear
                    showSearch
                    defaultActiveFirstOption
                    optionFilterProp="children"
                >
                </LegionsProSelect>
            </div>

        )
    }
    renderDate(component: ConditionDateModel) {
        const { conditionsProps,containerProps,jsonProperty } = component;
        const placeholder = conditionsProps.placeholder as string
        const { labelSpan,defaultValue,visable,display,value=defaultValue,...prop } = conditionsProps
        return (<DatePicker
            {...prop}
            style={{ width: '100%' }}
            placeholder={placeholder}
            value={value}
            onChange={this.handleChangeDate.bind(this,component)}
        >
        </DatePicker>)
    }
    renderDateRange(component: ConditionRangePickerModel) {
        const { conditionsProps,containerProps,jsonProperty } = component;
        const { labelSpan,defaultValue,visable,display,value=defaultValue,...prop } = conditionsProps
        const placeholder = conditionsProps.placeholder as [string,string]
        return (<RangePicker
            allowClear={true}
            {...prop}
            value={value}
            onChange={this.handleChangeDate.bind(this,component)}
            placeholder={placeholder}
        >

        </RangePicker>)
    }
    renderChxBox(component: ConditionCheckBoxModel) {
        const { conditionsProps,containerProps,jsonProperty } = component;
        const { labelSpan,visable,display,value,defaultChecked,...prop } = conditionsProps
        return (<Checkbox
            {...prop}
            defaultChecked={defaultChecked}
            onChange={this.handleChangeChx.bind(this,component)}
            
        >
            {conditionsProps.label}
        </Checkbox>)
    }
    renderInputNumber(component: ConditionTextNumberModel) {
        const { conditionsProps,containerProps,jsonProperty } = component;
        const { labelSpan,defaultValue,display,visable,...prop } = conditionsProps
        let placeholder = conditionsProps.placeholder as string
        if (this.viewStore && this.viewStore.computedSize === 'small') {
            placeholder = ''
        }
        const onEnter = conditionsProps.onEnter;
        /* const vmValue  = this.viewStore.computedVmModel[JsonProperty.name] */
        return (
            <InputNumber
                {...prop}
                onKeyDown={(value) => {
                    if (value && value['key'] && value['key'] === 'Enter') {
                        this.handleEnter.call(this,onEnter);
                    }
                }}
                defaultValue={defaultValue}
                style={{ width: '100%' }}
                onChange={this.handleChange.bind(this,component)}
                placeholder={placeholder}
            >
            </InputNumber>)
    }
    renderRadioButton(component: ConditionRadioButtonModel) {
        const { conditionsProps,containerProps,jsonProperty } = component;
        const { labelSpan,defaultValue,display,options,visable,...prop } = conditionsProps
        const newData = options as Array<IRadioButtonProps>
        return (
            <RadioGroup
                {...prop}
                style={{ width: '100%' }}
                defaultValue={defaultValue}
                
                onChange={this.handleChange.bind(this,component)}
            >
                {newData && newData.map((item) => {
                    return (<RadioButton key={`${item.value}-${containerProps.name}`} disabled={item.disabled} value={item.value}>{item.label}</RadioButton>)
                })}

            </RadioGroup>
        )
    }
    renderSearch(component: ConditionSearchModel) {
        const { conditionsProps,containerProps } = component;
        const { ...prop } = conditionsProps;
        const menu = (
            <Menu selectedKeys={[this.viewStore.computedSize]} onClick={(item) => {
                const size = item.key as "default" | "small"
                this.viewStore._setSize(size);
            }}>
                <Menu.Item key="small">紧凑</Menu.Item>
                <Menu.Item key="default">舒适</Menu.Item>
            </Menu>
        );
        return <React.Fragment>
            <Row gutter={8} type="flex">
                <Col span={6} ><Button
                    type="primary"
                    icon={'search'}
                    onClick={this.handleSearch.bind(this)}
                    style={{ borderColor: `#46b8da`,color: `white` }}
                >{component.conditionsProps.searchText||'搜索'}
                </Button>
                </Col>
                <Col span={6} >
                    <Dropdown.Button type="ghost" onClick={this.handleReset.bind(this)} overlay={menu}>
                    {component.conditionsProps.resetText||'重置'}
                        </Dropdown.Button>
                </Col>
                <Col span={4} >
                    <Button
                        onClick={() => {
                            const item = this.props.query.find((item) => item instanceof ConditionSearchModel);
                            if (item && item instanceof ConditionSearchModel) {
                                item.conditionsProps.onRefresh && item.conditionsProps.onRefresh.call(this,cloneDeep(this.queryPrams),this.viewStore)
                            }
                         }}
                         style={{ width: '100%',padding: '0 2px' }}
                        //@ts-ignore
                        title="刷新">
                        <Icon type="sync" title="刷新" />
                    </Button>
                </Col>
                <Col span={8}>
                    <Button
                        type="ghost"
                        icon={this.state.collapsed ? 'down' : 'up'}
                        onClick={this.handleToggle.bind(this)}
                        style={{ backgroundColor: `#fff`,borderColor: `#46b8da` }}>
                        {this.state.collapsed ? '收起' : '展开'}
                    </Button>
                </Col>




            </Row>
        </React.Fragment>
    }
    renderLabel(component: IProConditions['componentModel'],labelSpan: number) {
        if (!(component instanceof ConditionSearchModel) && !(component instanceof ConditionCheckBoxModel)&&!(component instanceof ConditionGroupCheckBoxModel)) {
            let label = component.conditionsProps.label;
            const name = component.containerProps.name;
            return (
                this.viewStore.computedSize !== 'small' ? <Col className="legions-pro-query-label" span={labelSpan}>
                    <label
                        htmlFor={name}
                        title={label} style={{ lineHeight: '28px',right: '0px' }}>
                        {label}
                    </label>
                </Col> :
                    <label
                        htmlFor={name}
                        title={label}
                        style={{
                            marginLeft: '5px',marginRight: '3px',
                            position: 'absolute',zIndex: 999,background: '#fff',
                            height: '20px',lineHeight: '20px',
                            color: '#999',top: '-11px',fontSize: 10,
                            WebkitTransform: 'scale(0.9)'
                        }}>
                        {label}:
                    </label>

            )
        }
        return null;

    }
    getQueryItemSpan(item: IProConditions['componentModel']) {
        const Resolution = item.containerProps.col[this.viewStore.compuedResolution];
        if (typeof Resolution === 'number') {
            return Resolution
        }
        else if (typeof Resolution === 'object') {
            return Resolution.span || 4
        }
        else {
            return 4;
        }
    }
    renderSearchComponent() {
        const searchItem = this.viewStore.computedQuery.find((item) => item instanceof ConditionSearchModel)
        let show: IProConditions['componentModel'][] = []
        if (searchItem && !Array.isArray(searchItem)) {
            show.push(searchItem)
        }
        return this.renderQueryComponent(show);
    }
    renderShowComponent(hide: IProConditions['componentModel'][]) {
        const searchItem = this.viewStore.computedQuery.find((item) => item instanceof ConditionSearchModel)
        let searchSpan = 0;
        if (searchItem && !Array.isArray(searchItem)) {
            searchSpan = this.getQueryItemSpan(searchItem)
        }
        let unUsedSpan = 24 - searchSpan;
        let show: IProConditions['componentModel'][] = []
        this.viewStore.computedQuery.filter((item) => !(item instanceof ConditionSearchModel)).map((item) => {
            const currSpan = this.getQueryItemSpan(item);
            let visable: boolean = item.conditionsProps['visable']
            visable = visable === void 0 ? true : visable;
            if (unUsedSpan >= currSpan&&visable) {
                show.push(item);
                unUsedSpan = unUsedSpan - currSpan;
            } else {
                hide.push(item);
            }
        })
        return this.renderQueryComponent(show)
    }
    renderCollapsed(list: IProConditions['componentModel'][]) {
        let show: IProConditions['componentModel'][] = []
        list.map((item) => {
            let visable: boolean = item.conditionsProps['visable']
            visable = visable === void 0 ? true : visable;
            if (visable) {
                show.push(item);
            }
        })
        return this.renderQueryComponent(show);
    }
    renderQueryComponent(list: IProConditions['componentModel'][]) {
        return list.map((item) => {
            let labelSpan = (item instanceof ConditionCheckBoxModel || (item instanceof ConditionSearchModel)) ? 1 : (item.conditionsProps.labelSpan || 4)
            if (this.viewStore.computedSize === 'small') {
                labelSpan = 0;
            }
            const { offset,pull,push,md,xl,lg,sm,xs,...col } = item.containerProps.col;
            const span = item.containerProps.col[this.viewStore.compuedResolution]
            const colspan = {};
            if (typeof span === 'number') {
                colspan['span'] = span;
            }else if(Object.prototype.toString.call(span) === "[object Object]"){
                colspan['span'] = span.span;
            }
            const uid = item.containerProps.uuid;
            return <Col {...col} {...colspan}
                data-id={uid}
                data-name={item.containerProps.name}
                key={uid} style={{ paddingBottom: '10px',paddingLeft:'5px' }}>
                        {this.renderLabel(item,labelSpan)}
                        <Col style={{ lineHeight: '28px' }}  span={24 - labelSpan}>
                            {this.renderComponent(item)}
                        </Col>
                    </Col>
        })
    }
    renderContent() {
        let hide: IProConditions['componentModel'][] = []
        return <React.Fragment>
           {this.renderShowComponent(hide)}
                {this.renderSearchComponent()}
                {this.state.collapsed && this.renderCollapsed(hide)}
        </React.Fragment>
    }
    render() {
        return (
            <Row className={`${baseCls} ${this.uid}`} gutter={8} type="flex">
                {this.props.isDragSort?<LegionsProDragger
                      options={{
                        animation: 150,
                        group: {
                            name: 'ProConditions',
                            pull: true,
                            put: true,
                        }
                    }}
                    onChange={(items: string[],sort,evt) => {
                        /* const dataId = evt.item.attributes['data-id'];
                        const dataName = evt.item.attributes['data-name']; */
                        const query: IProConditions['componentModel'][] = [];
                        if (items.length && items.length === this.viewStore.computedQuery.length) { // 内部拖拽排序
                            items.map((item) => {
                                const view = this.viewStore.computedQuery.find((s) => s.containerProps.uuid === item);
                                if (view) {
                                    query.push(view);
                                }
                            })
                            this.viewStore._clearQuery();
                            this.viewStore._initQuery(query);
                        }
                    }}
                >
                     {this.renderContent()}
                </LegionsProDragger>:this.renderContent()}
                
                
            </Row>
        )
    }
}
