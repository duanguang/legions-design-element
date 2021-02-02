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
import CollapseUtil from './collapse';
import Template from './template';
import SlotItem from './slotItem';
import moment from 'moment';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
import { bind,observer } from 'legions/store-react'
/* import {debounce} from 'hoolinks/property' */
import {
    InputProps,
    SelectProps,
    DatePickerProps,
    RangePickerProps,
    InputNumberProps,
    RadioGroupProps,
    RadioButtonProps,
    TextAreaProps,
    CheckboxGroupProps,
    CheckboxProps,
} from '../interface/antd';
import { Weaken} from '../interface'
import LegionsProSelect from '../LegionsProSelect';
import {IProSelectProps} from '../LegionsProSelect/interface'
import {ProQueryConditionStore} from '../store/pro.query.conditions';
import { IViewQueryConditionStore,ISelectAutoQuery } from '../store/pro.query.conditions/interface';
import { shortHash } from 'legions-lunar/object-hash';
import ReactDOM,{ findDOMNode } from "react-dom";
import { debounce } from 'legions-utils-tool/debounce'
import { cloneDeep } from 'lodash'
import { HlLabeledValue } from 'legions-lunar/model';
import { IFieldsState, IQueryConditionsInstance, IQueryProps, ISelectProps } from './interface';
const { RangePicker } = DatePicker;
const Option = Select.Option;
const { TextArea } = Input;
const baseCls = `legions-pro-query`


interface IProps<Query = {}> {
    query: Array<IQuery>,
    store?: ProQueryConditionStore<Query>,
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
      *
      * @memberof IHLTableProps
      */
    onReady?: (instance: IQueryConditionsInstance<Query>) => void;

    size?: 'default' | 'small';

    /**
     * 默认是否展开 折叠区域内容
     *
     * @type {boolean}
     * @memberof IProps
     */
    defaultToggle: boolean;
    /**
     * 主要用于当父组件中存在多个搜索组件时，标记key 来保证父级组件中搜索组件唯一
     * 持久化查询输入值时，保证值绝对唯一，生成hash 存入数据库，并且作为查询主键
     * 如果不传，则系统默认生成，此时如果在数据库持久化查询条件，则需要保证搜索组件唯一，及父级组件路径不能产生变化
     * @type {string}
     * @memberof IProps
     */
    uniqueKeys?: string;
    ondragger?: (item: any[],key: string) => React.ReactElement;
}

interface IQueryTextProps extends IQueryProps,InputProps {

}
interface IQueryTextAreaProps extends Weaken<IQueryProps,'maxlength'>,TextAreaProps {
    maxlength?: number
}
interface IQueryRadioButtonProps extends IQueryProps,RadioGroupProps {
}
interface IQueryTextNumberProps extends IQueryProps,InputNumberProps {
}
interface IQuerySelectProps extends IQueryProps,IProSelectProps {
    multiple: boolean,
    loading?: boolean,
    /** 自动托管下拉数据请求，在下拉框组件中使用,只支持一次性查询全部数据
     * 不支持远程根据关键词搜索
     */
    autoQuery?: ISelectAutoQuery
}
interface IQueryDateProps extends IQueryProps,DatePickerProps {
    format: 'YYYY-MM-DD HH:mm:ss' | 'YYYY-MM-DD' | 'YYYY-MM-DD HH:mm'
    showTime: boolean | { format: 'HH:mm' }
}
interface IQueryRangePickerProps extends RangePickerProps,Weaken<IQueryProps,'placeholder'> {
    placeholder?: [string,string]
}

interface IRadioButtonProps {
    value: string
    label: string,
    disabled?: boolean
}
interface IEmit {
    name: 'onChange' | 'onEnter' | 'onSearch' | 'onReset' | 'onResize' | 'onToggle' | 'onRefresh'
    handle: (value,viewEntity?: IViewQueryConditionStore) => any
}
export interface IQuery {
    container: {
        width?: number
        span?: number
        position: 'left' | 'content' | 'right'
        component: IComponent
    }
}
interface IJsonProperty {
    name: string

    /**
     * 废弃属性，请勿使用
     *
     * @type {(string|[]|any[])}
     * @memberof IJsonProperty
     */
    value?: string | [] | any[],
    queryPrams: string,
    uuid?: string;
}

function isArray(val) {
    return Object.prototype.toString.call(val) === "[object Array]";
}
interface IComponent {
    type?: 'daterange' | 'text' | 'number' | 'select' | 'checkBox' | 'date' | 'daterange' | 'radioButton' | 'textArea'
    props?: IQueryTextProps | IQuerySelectProps | IQueryDateProps | IQueryRangePickerProps | IQueryTextNumberProps | IQueryRadioButtonProps | IQueryTextAreaProps
    JsonProperty?: IJsonProperty
    data?: Array<ISelectProps> | Array<IRadioButtonProps>
    label?: string
    defaultValue?: any
    hooks?: Array<IEmit>
    render?: Function,
    regex?: RegExp
}
interface IState {
    vmModel: any
    queryPrams: any
    fieldsStates: { name: string,state: IFieldsState }[]
}

@bind({ store: ProQueryConditionStore })
@observer
export default class LegionsProQueryConditions<Query = {}> extends React.Component<IProps<Query>,IState>{
    /* search =debounce((options,val)=>{
       options&&options.props.onSearch&&options.props.onSearch(val)
    },200) */
    resize = debounce(() => {
        const queryDom = document.querySelector(`.${this.uid}`);
        if (queryDom && findDOMNode(queryDom) && this.viewStore) {
            this.viewStore.widthContainer = findDOMNode(queryDom).clientWidth
        }
    },500)
    timeId = new Date().getTime()
    uid = `Query${shortHash(this.timeId)}`
    // @ts-ignore
    /* MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver
    observer= null */
    constructor(props) {
        super(props)
        this.state = {
            vmModel: {},
            queryPrams: {},
            fieldsStates: [],
        }
        /* const obj = this.props.query.filter((item)=>item.container.position!=='right').map((item) => {
            return {name:item.container.component.JsonProperty.name,label:item.container.component.label,type:item.container.component.type}
        }) */
        /* const hash = {query:obj,namespace:this.props.namespace||''} */
        if (this.props['uniqueUid']) {
            this.uid = `Query${shortHash(this.props['uniqueUid'])}`
        }
        else {
            this.uid = `Query${this.props.store.HlQueryConditionContainer.size}${shortHash(`${this.timeId}${this.props.store.HlQueryConditionContainer.size}`)}`
            if (this.props.store.HlQueryConditionContainer.has(this.uid)) {
                this.timeId = new Date().getTime()
                this.uid = `Query${this.props.store.HlQueryConditionContainer.size}${shortHash(`${this.timeId}${this.props.store.HlQueryConditionContainer.size}`)}`
            }
        }
        this.consoleLog('constructor-QueryConditions')
    }
    //@ts-ignore
    get viewStore() {
        return this.props.store.HlQueryConditionContainer.get(this.uid)
    }
    static defaultProps = {
        size: 'default',
        defaultToggle: false,
    }
    consoleLog(type: string,logObj?: Object) {
        const obj = logObj || {}
        if (window['handleHlQueryDebug'] && typeof window['handleHlQueryDebug'] === 'function') {
            window['handleHlQueryDebug']({ store: this.viewStore,state: this.state,...obj,that: this },type)
        }
    }
    componentWillMount() {
        if (!this.props.store.HlQueryConditionContainer.has(this.uid)) {
            this.props.store.add(this.uid)
            this.initVModel()
        }
        else {
            this.setState({ vmModel: { ...this.viewStore.computedVmModel } })
        }
        this.viewStore.setSize(this.props.size);
        this.props.onReady && this.props.onReady({
            store: this.props.store,uid: this.uid,viewModel: this.viewStore,methods: {
                reset: () => {
                    this.reset()
                },
                setFieldsValue: (fieldsValues: { fieldName: string,value: any }[]) => {
                    this.setFieldsValue(fieldsValues)
                },
                setFieldState: (fieldsStates: { name: string,state: IFieldsState }[]) => {
                    this.setFieldState(fieldsStates)
                },
                getQuerySelectOption: (name: string,optionKey: string) => {
                    const selectConfigs = this.props.query.filter((item) => item.container.component.type === 'select');
                    const index = selectConfigs.findIndex((item) => item.container.component.JsonProperty.name === name);
                    let newData = [] as Array<ISelectProps>
                    let optionItem = new HlLabeledValue();
                    if (index > -1) {
                        const item = selectConfigs[index].container.component.props as IQuerySelectProps;
                        newData = selectConfigs[index].container.component.data as Array<ISelectProps>
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
                onSelectSearch: (name: string,params: {
                    pageIndex: number;
                    pageSize?: number;
                    keyWords?: string;
                } & Object) => {
                    const selectConfigs = this.props.query.filter((item) => item.container.component.type === 'select');
                    const index = selectConfigs.findIndex((item) => item.container.component.JsonProperty.name === name);
                    if (index > -1) {
                        const item = selectConfigs[index].container.component.props as IQuerySelectProps;
                        if (item.autoQuery) {
                            this.viewStore.dispatchRequest(name,item.autoQuery,params)
                        } else {
                            console.warn('此下拉框组件并没有开启自动托管请求配置信息,请检查')
                        }
                    }
                    else {
                        console.warn('搜索条件配置数据找不到此名称的下拉组件,请检查')
                    }
                }
            }
        })
        this.consoleLog('componentWillMount-QueryConditions')
    }
    componentDidMount() {
        const queryDom = document.querySelector(`.${this.uid}`);
        const store = this.props.store.get(this.uid)
        if (queryDom && store) {
            this.onDidMount();
            window.addEventListener && window.addEventListener('resize',this.resize.bind(this))
            /* if (MutationObserver) {
                this.observer = new MutationObserver((mutationList) => {
                    console.log(222)
                })
                this.observer.observe(queryDom, {'childList': true,
                'arrtibutes': true})
            } */
            /* if (this.viewStore.widthContainer < 1200) {
                this.viewStore.setSize('small');
            } */
        }
        this.dispatchRequest();
        this.consoleLog('componentDidMount-QueryConditions')
    }
    onDidMount() {
        const queryDom = document.querySelector(`.${this.uid}`);
        const store = this.props.store.get(this.uid)
        if (queryDom && store) {
            if (findDOMNode(queryDom).clientHeight) {
                store.domHeight = findDOMNode(queryDom).clientHeight
                store.widthContainer = findDOMNode(queryDom).clientWidth
                this.props.onDidMount && this.props.onDidMount({ uid: this.uid,height: store.domHeight })
            }
        }
    }
    componentWillReceiveProps(nextProps: IProps) {
        this.consoleLog('componentWillReceiveProps-QueryConditions')
    }
    componentWillUnmount() {
        if (!this.props['uniqueUid']) {
            this.props.store.delete(this.uid)
        }
        window.removeEventListener && window.removeEventListener('resize',this.resize.bind(this))
        this.consoleLog('componentWillUnmount-QueryConditions')
    }
    componentDidUpdate() {
        this.onDidMount();
        this.consoleLog('componentDidUpdate-QueryConditions');
    }
    dispatchRequest() {
        const { query } = this.props;
        query.map((item) => {
            if (item.container.component.type === 'select') {
                const props = item.container.component.props as IQuerySelectProps;
                if (props.autoQuery && (props.autoQuery.isInitialize === void 0 || props.autoQuery.isInitialize)) {
                    this.viewStore.dispatchRequest(item.container.component.JsonProperty.name,props.autoQuery,{
                        pageIndex: 1,
                    })
                }
            }
        })
    }
    /**
     * 设置指定元素value值
     *
     * @template T value 类型
     * @param {string} fieldName JsonProperty.name
     * @param {T} value
     * @memberof QueryConditions
     */
    setFieldsValue(fieldsValues: { fieldName: string,value: any }[]) {
        if (Array.isArray(fieldsValues) && fieldsValues.length) {
            const vmModels: Object = { ...this.state.vmModel };
            fieldsValues.map((item) => {
                if (vmModels.hasOwnProperty(item.fieldName)) {
                    vmModels[item.fieldName] = item.value;
                }
            })
            this.setState({ vmModel: vmModels })
            this.viewStore.setVmModel(vmModels)
        }
    }
    /**
     * 设置指定元素显示隐藏
     *
     * @template T state 类型
     * @param {string} name JsonProperty.name
     * @param {T} state
     * @memberof QueryConditions
     */
    setFieldState(fieldsStates: { name: string,state: IFieldsState }[]) {
        let newFieldsName = fieldsStates.map(item => item.name)
        const oldFieldsStates = this.state.fieldsStates.filter(item => !newFieldsName.includes(item.name))
        this.setState({ fieldsStates: [...oldFieldsStates,...fieldsStates] })
    }
    initVModel() {
        const { query } = this.props
        let data = {}
        let prams = {}
        query.map(item => {
            if (item.container.component.JsonProperty && typeof item.container.component.JsonProperty === 'object') {

                if (isArray(item.container.component.defaultValue) || isArray(item.container.component.JsonProperty.value)) {
                    if (item.container.component.defaultValue.length) {
                        data[item.container.component.JsonProperty.name] = [...item.container.component.defaultValue]
                    }
                    else if (item.container.component.JsonProperty.value.length) {

                        // @ts-ignore
                        data[item.container.component.JsonProperty.name] = [...item.container.component.JsonProperty.value]
                    }
                    else {
                        data[item.container.component.JsonProperty.name] = item.container.component.defaultValue || item.container.component.JsonProperty.value
                    }

                }
                else {
                    data[item.container.component.JsonProperty.name] = item.container.component.defaultValue || item.container.component.JsonProperty.value || ''
                }
                if (item.container.component.JsonProperty.queryPrams) {
                    prams[item.container.component.JsonProperty.queryPrams] = item.container.component.JsonProperty.value || ''
                }
            }
        })
        this.setState({
            vmModel: data,
            queryPrams: prams
        })
        this.viewStore.setVmModel(data)
    }
    /**
     * 把组件元素结果映射至查询条件
     *
     * @memberof QueryConditions
     */
    mapQueryValue() {
        const { query } = this.props
        let prams = this.state.queryPrams
        query.map((item) => {
            if (item.container.component.JsonProperty && typeof item.container.component.JsonProperty === 'object') {
                prams[item.container.component.JsonProperty.queryPrams] = this.state.vmModel[item.container.component.JsonProperty.name]
                /* prams[item.container.component.JsonProperty.queryPrams] = this.viewStore.computedVmModel[item.container.component.JsonProperty.name] */
            }
        })
        this.setState({
            queryPrams: prams
        })
        this.viewStore.setQuery({ ...this.viewStore.computedQuery,...prams })
    }
    reset() {
        let data = this.state.vmModel
        /* let data = {...this.viewStore.computedVmModel} */
        Object.keys(data).forEach((key) => {
            let entity = this.props.query.find((item) => item.container.component.JsonProperty.name === key)
            if (entity && !entity.container.component.props.isNotReset) {
                if (entity.container.component.props.onReset) {
                    data[key] = entity.container.component.props.onReset(key,data[key]);
                }
                else {
                    data[key] = entity.container.component.defaultValue || ''
                }
            }

        })
        this.setState({
            vmModel: data
        })
        this.viewStore.setVmModel(data)
        this.mapQueryValue();
    }
    /**
     * 搜索事件
     *
     * @param {*} handle
     * @memberof QueryConditions
     */
    handleSearch(handle) {
        this.mapQueryValue()

        handle && handle.call(this,cloneDeep(this.state.queryPrams),this.viewStore);
        this.consoleLog('handleSearch-QueryConditions',{ stateParams: cloneDeep(this.state.queryPrams) })
    }

    /**
     * 重置数据
     *
     * @param {Function} handle
     * @memberof QueryConditions
     */
    handleReset(handle: Function) {
        this.reset();
        this.mapQueryValue();
        handle && handle.call(this,cloneDeep(this.state.queryPrams))
    }
    handleChangeChx(option,even) {
        option = option || {};
        let value = even.target.checked
        let JsonProperty: IJsonProperty = option.JsonProperty || {}
        option.JsonProperty = JsonProperty;
        option.regex = option.regex || '';
        let data = this.state.vmModel
        /* let data = {...this.viewStore.computedVmModel} */
        data[option.JsonProperty.name] = value
        this.setState({
            vmModel: data
        })
        this.viewStore.setVmModel({ ...data })
        option.handle && option.handle.call(this,cloneDeep(data))
    }
    handleChangeDate(option,even,dateString: string) {
        option = option || {};
        let value = dateString
        let JsonProperty: IJsonProperty = option.JsonProperty || {}
        option.JsonProperty = JsonProperty;
        option.regex = option.regex || '';
        let data = this.state.vmModel
        /* let data = {...this.viewStore.computedVmModel} */
        if (Array.isArray(even) && even.length === 0) { // 日期多选
            data[option.JsonProperty.name] = []
        }
        else {
            data[option.JsonProperty.name] = value
        }
        this.setState({
            vmModel: data
        })
        this.viewStore.setVmModel({ ...data })
        option.handle && option.handle.call(this,cloneDeep(data))
    }
    handleSelectSearch(option,value) {
        option && option.props.onSearch && option.props.onSearch(value)
        /* this.search(option,value) */
    }
    handleChangeSelect(option,even) {

        option = option || {};
        let value = even
        if (Object.prototype.toString.call(even) === '[object Object]') {
            if (even.target) {
                value = even.target.value
            }
            else if (option && option.props && option.props.labelInValue) {
                value = even.key;
            }
        }
        if (isArray(even)) {
            value = even
        }
        let JsonProperty: IJsonProperty = option.JsonProperty || {}
        option.JsonProperty = JsonProperty;
        option.regex = option.regex || '';
        let data = this.state.vmModel
        /* let data = {...this.viewStore.computedVmModel} */
        if (option.props.mode === 'combobox') {
            let entity = option.data.find((item) => item.key === value)
            if (option.props.labelInValue) {
                data[option.JsonProperty.name] = even;
            }
            else {
                data[option.JsonProperty.name] = entity ? entity.value : value
            }
        } else {
            data[option.JsonProperty.name] = option.props.labelInValue ? even : value
        }
        if (value instanceof Array) {
            if (!value.every((item) => item)) {
                data[option.JsonProperty.name] = '';
            }
        }
        this.setState({
            vmModel: data
        })
        this.viewStore.setVmModel({ ...data })
        option.handle && option.handle.call(this,cloneDeep(data))
    }
    handleChange(option,even) {
        option = option || {};
        let value = even
        if (typeof even === 'object') {
            value = even.target.value
        }

        let JsonProperty: IJsonProperty = option.JsonProperty || {}
        option.JsonProperty = JsonProperty;
        option.regex = option.regex || '';
        let data = this.state.vmModel
        /* let data = {...this.viewStore.computedVmModel} */
        data[option.JsonProperty.name] = value
        if (option.type && option.type === 'text') {
            data[option.JsonProperty.name] = this.formatTrim(value)
        }
        this.setState({
            vmModel: data
        })
        this.viewStore.setVmModel({ ...data })
        option.handle && option.handle.call(this,cloneDeep(data))
    }

    formatTrim(str) {
        if (str) {
            return str.replace(/(^\s+)|(\s+$)/g,"");
        }
        return str
    }
    /**
      * 获取传入参数
      *
      * @param {any} component
      * @returns
      * @memberof FilterSearchWrap
      */
    changeOptions(component: IComponent) {
        const { hooks,JsonProperty,regex,type,props,data } = component;
        const onChange = hooks && hooks.find((item) => item.name === 'onChange');
        const option = {
            handle: onChange && onChange.handle,
            JsonProperty,
            regex,
            type,
            props,
            data,
        }
        return option;
    }
    /**
     * 获取搜索区域钩子事件列表
     *
     * @returns
     * @memberof QueryConditions
     */
    searchEmit() {
        const right = this.props.query.filter((item) => item.container.position === 'right')
        if (right.length > 0) {
            return right[0].container.component.hooks || []
        }
        return []
    }

    /**
     * 回车搜索
     *
     * @param {Function} onEnter
     * @memberof QueryConditions
     */
    handleEnter(onEnter: Function) {
        onEnter && onEnter.call(this,this.state.vmModel)
        const emit = this.searchEmit();
        const onSearch = emit.find((item) => item.name === 'onSearch')
        this.handleSearch(onSearch && onSearch.handle)
    }
    //@ts-ignore
    renderLabel(label,component: IComponent) {
        if (label) {
            return (
                this.viewStore.computedSize === 'small' ? <span style={{
                    float: 'left',marginLeft: '5px',marginRight: '3px',
                    position: 'absolute',zIndex: 999,background: '#fff',
                    height: '20px',lineHeight: '20px',
                    color: '#999',top: '-3px',fontSize: 10,
                    //@ts-ignore
                    webkitTransform: 'scale(0.9)'
                }}>
                    {component.type === 'radioButton' ? '' : label}
                </span> :
                    <span style={{ float: 'left',marginRight: '3px' }}>
                        {label}
                    </span>
            )
        }
    }
    renderComponent(component: IComponent) {
        if (component.render) {
            return component.render()
        }
        else {
            switch (component.type) {
                case 'text':
                    return this.renderInput(component)
                case 'textArea':
                    return this.renderInputTextArea(component);
                case 'select':
                    return this.renderSelect(component)
                case 'date':
                    return this.renderDate(component)
                case 'daterange':
                    return this.renderDateRange(component)
                case 'checkBox':
                    return this.renderChxBox(component)
                case 'number':
                    return this.renderInputNumber(component)
                case 'radioButton':
                    return this.renderRadioButton(component)

            }
        }
    }
    renderInputTextArea(component: IComponent) {
        const { props,hooks,JsonProperty,label } = component;
        let placeholder = props.placeholder as string
        if (this.viewStore && this.viewStore.computedSize === 'small') {
            placeholder = ''
        }
        const prop = props as IQueryTextAreaProps
        const { onReset,...themProps } = prop;
        const option = this.changeOptions(component);
        const onEnter = hooks && hooks.find((item) => item.name === 'onEnter');
        const vmValue = this.state.vmModel[JsonProperty.name]
        /* const vmValue  = this.viewStore.computedVmModel[JsonProperty.name] */
        return (
            <Tooltip
                overlayClassName="legions-pro-query-tooltip"
                trigger="focus"
                title={(this.formatTrim(vmValue)) ? <pre>{vmValue.replace('↵',',')}</pre> : null}
                placement="topLeft">
                <TextArea
                    maxLength={1500}
                    autosize={{ minRows: 1,maxRows: 1 }}
                    {...themProps}
                    style={{ width: `${props.width}px`,maxWidth: `${props.width}px`,marginBottom: '8px' }}
                    value={vmValue}
                    onPressEnter={this.handleEnter.bind(this,onEnter && onEnter.handle)}
                    placeholder={placeholder}
                    onChange={this.handleChange.bind(this,option)}
                />
                {/* <div className={styles.labelTooltipInput}>{label}</div> */}
            </Tooltip>
        );
    }
    renderRadioButton(component: IComponent) {
        const { props,hooks,JsonProperty,data } = component;
        const prop = props as IQueryRadioButtonProps
        const newData = data as Array<IRadioButtonProps>
        const option = this.changeOptions(component);
        const vmValue = this.state.vmModel[JsonProperty.name]
        /* const vmValue  = this.viewStore.computedVmModel[JsonProperty.name] */
        return (
            <RadioGroup
                {...prop}
                value={vmValue}
                onChange={this.handleChange.bind(this,option)}
            >
                {newData && newData.map((item) => {
                    return (<RadioButton key={`${item.value}-${JsonProperty.name}`} disabled={item.disabled} value={item.value}>{item.label}</RadioButton>)
                })}

            </RadioGroup>
        )
    }
    renderInputNumber(component: IComponent) {
        const { props,hooks,JsonProperty } = component;
        let placeholder = props.placeholder as string
        if (this.viewStore && this.viewStore.computedSize === 'small') {
            placeholder = ''
        }
        const prop = props as IQueryTextNumberProps
        const option = this.changeOptions(component);
        const onEnter = hooks && hooks.find((item) => item.name === 'onEnter');
        const vmValue = this.state.vmModel[JsonProperty.name]
        /* const vmValue  = this.viewStore.computedVmModel[JsonProperty.name] */
        return (
            <InputNumber
                {...prop}
                onKeyDown={(value) => {
                    if (value && value['key'] && value['key'] === 'Enter') {
                        this.handleEnter.call(this,onEnter && onEnter.handle);
                    }
                }}
                style={{ width: `${props.width}px` }}
                value={vmValue}
                placeholder={placeholder}
                onChange={this.handleChange.bind(this,option)}
            >
            </InputNumber>)
    }
    renderChxBox(component: IComponent) {
        const { props,hooks,JsonProperty } = component;
        const placeholder = props.placeholder as string
        const option = this.changeOptions(component);
        const vmValue = this.state.vmModel[JsonProperty.name]
        /* const vmValue  = this.viewStore.computedVmModel[JsonProperty.name] */
        let value = vmValue === '' ? false : vmValue
        return (<Checkbox
            checked={value}
            onChange={this.handleChangeChx.bind(this,option)}>
            {placeholder}
        </Checkbox>)
    }
    renderDate(component: IComponent) {
        const { props,hooks,JsonProperty } = component;
        const placeholder = props.placeholder as string
        const prop = props as IQueryDateProps
        const option = this.changeOptions(component);
        const vmValue = this.state.vmModel[JsonProperty.name]
        /* const vmValue  = this.viewStore.computedVmModel[JsonProperty.name] */
        let value = vmValue
        value = value ? moment(value,prop.format) : void 0
        return (<DatePicker
            {...prop}
            placeholder={placeholder}
            style={{ width: `${props.width}px` }}
            value={value}
            onChange={this.handleChangeDate.bind(this,option)}
        >
        </DatePicker>)
    }
    renderDateRange(component: IComponent) {
        const { props,hooks,JsonProperty } = component;
        const placeholder = props.placeholder as [string,string]
        const option = this.changeOptions(component);
        const prop = props as IQueryRangePickerProps
        const vmValue = this.state.vmModel[JsonProperty.name]
        /*  const vmValue  = this.viewStore.computedVmModel[JsonProperty.name] */
        let value = vmValue
        value = (value && value.length) ? [moment(value[0],prop.format),moment(value[1],prop.format)] : [void 0,void 0]
        return (<RangePicker
            allowClear={true}
            {...prop}
            value={value}
            onChange={this.handleChangeDate.bind(this,option)}
            placeholder={placeholder}
            style={{ width: `${props.width}px` }}
        >

        </RangePicker>)
    }
    renderSelect(component: IComponent) {
        const { props,data,hooks,JsonProperty,defaultValue,label } = component;
        const placeholder = props.placeholder as string
        let newData = data as Array<ISelectProps>
        const prop = props as IQuerySelectProps
        const option = this.changeOptions(component);
        const vmValue = this.state.vmModel[JsonProperty.name]
        /* let vmValue = this.viewStore.computedVmModel[JsonProperty.name] */
        /* if (isObservableArray(vmValue) && vmValue.length === 0) {
            vmValue =[]
        } */
        const firstActiveValue = newData.length > 0 ? [`${newData[0].key}`] : ''
        const autoObData = this.viewStore.selectOptions.get(JsonProperty.name);
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
                    style={{ width: `${props.width}px` }}
                    placeholder={placeholder}
                    onSearch={this.handleSelectSearch.bind(this,option)}
                    onChange={this.handleChangeSelect.bind(this,option)}
                    value={vmValue}
                    options={newData}
                    allowClear
                    showSearch
                    defaultActiveFirstOption
                    optionFilterProp="children"
                >
                    {/* {newData && newData.map((item) => {
                    return <Option value={item.key} key={`${item.value}-${JsonProperty.name}`}>
                        {item.value}
                    </Option>
                })} */}
                </LegionsProSelect>
                {/* <div className={styles.labelTooltipInput}>{label}</div> */}
            </div>

        )
    }
    renderInput(component: IComponent) {
        const { props,hooks,JsonProperty,label } = component;
        let placeholder = props.placeholder as string
        if (this.viewStore && this.viewStore.computedSize === 'small') {
            placeholder = ''
        }
        const prop = props as IQueryTextProps
        const option = this.changeOptions(component);
        const onEnter = hooks && hooks.find((item) => item.name === 'onEnter');
        const vmValue = this.state.vmModel[JsonProperty.name]
        /* const vmValue  = this.viewStore.computedVmModel[JsonProperty.name] */
        const suffix = vmValue ? <Icon type="close-circle" onClick={() => {
            let state = this.state.vmModel;
            /* let state ={...this.viewStore.computedVmModel} */
            state[JsonProperty.name] = ''
            this.setState({
                vmModel: state
            })
            this.viewStore.setVmModel(state)
            this.mapQueryValue()
        }} /> : null;
        return (
            <Tooltip
                trigger="focus"
                title={(this.formatTrim(vmValue)) ? <pre>{vmValue.replace('↵',',')}</pre> : null}
                placement="topLeft">
                <Input
                    maxLength={'50'}
                    {...prop}
                    suffix={suffix}
                    style={{ width: `${props.width}px` }}
                    value={vmValue}
                    onPressEnter={this.handleEnter.bind(this,onEnter && onEnter.handle)}
                    placeholder={placeholder}
                    onChange={this.handleChange.bind(this,option)}
                >
                </Input>
                {/* <div className={styles.labelTooltipInput}>{label}</div> */}
            </Tooltip>
        )
    }
    renderContent(position: string,query = this.props.query) {
        let left = query.filter((item) => item.container.position === position)
        const { fieldsStates } = this.state
        if (Array.isArray(fieldsStates) && fieldsStates.length > 0) {
            let fieldFalseVisable = fieldsStates.filter(item => !item.state.visable).map(item => item.name)
            left = left.filter(item => !fieldFalseVisable.includes(item.container.component.JsonProperty.name))
        }
        return (
            <Template slot={position}>
                {left.map((item,index) => {
                    let label = item.container.component.label ? item.container.component.label : ''
                    if (label) {
                        label = label + ':'
                        label = label.replace(':',':').replace('：',':').replace('::',':').replace('：:',':')
                    }
                    let labelLenWidth = label.length;
                    let width = item.container.width
                    if (this.viewStore.computedSize === 'small') {
                        if (label) {
                            label = this.formatTrim(label)
                            label = label.replace(':','').replace('：','')
                            /* labelLenWidth = label.length; */
                        }
                        width = item.container.width - labelLenWidth * 10
                    }
                    return (<SlotItem key={`${index}${item.container.component.JsonProperty.uuid || item.container.component.JsonProperty.name}`} width={width} name={item.container.component.JsonProperty.uuid}>
                        {this.renderLabel(label,item.container.component)}
                        {this.renderComponent(item.container.component)}
                    </SlotItem>)
                })}
            </Template>
        )
    }

    queryEmit(hooks: IEmit['name'],position: IQuery['container']['position'] = 'right') {
        const right = this.props.query.filter((item) => item.container.position === position)
        if (right.length > 0) {
            const emit = right[0].container.component.hooks || [];
            const onSearch = emit.find((item) => item.name === hooks)
            if (onSearch) {
                const viewStore = this.props.store.HlQueryConditionContainer.get(this.uid)
                return (value,height: number) => {
                    viewStore.domHeight = height
                    onSearch.handle(value,viewStore)
                }
            }
            return void 0
        }
        return void 0
    }
    /**
     * 搜索按钮及重置按钮
     *
     * @returns
     * @memberof QueryConditions
     */
    //@ts-ignore
    renderRight(query = this.props.query) {
        const right = query.filter((item) => item.container.position === 'right');
        if (right.length > 0) {
            const emit = right[0].container.component.hooks || [];
            let props = null
            let label = null
            if (right[0].container && right[0].container.component) {
                props = right[0].container.component.props
                label = right[0].container.component.label
            }
            const width = (props && props.width) ? props.width : 73
            const onSearch = emit.find((item) => item.name === 'onSearch');
            const onReset = emit.find((item) => item.name === 'onReset');
            const onRefresh = emit.find((item) => item.name === 'onRefresh');
            let handleSearch = this.handleSearch.bind(this,onSearch && onSearch.handle);
            const menu = (
                <Menu selectedKeys={[this.viewStore.computedSize]} onClick={(item) => {
                    const size = item.key
                    // @ts-ignore
                    this.viewStore.setSize(size);
                }}>
                    <Menu.Item key="small">紧凑</Menu.Item>
                    <Menu.Item key="default">舒适</Menu.Item>
                </Menu>
            );
            return (
                <Template slot='right'>
                    <SlotItem width={width}>
                        <Button.Group >
                            <Button
                                type="primary"
                                icon={`${label || 'search'}`}
                                onClick={handleSearch}
                                style={{ borderColor: `#46b8da`,color: `white` }}
                            >{`${label || '搜索'}`}
                            </Button>

                        </Button.Group>
                    </SlotItem>
                    <SlotItem width={onRefresh ? 108 + 15 : 60 + 15}>
                        {/* <Button type="ghost"
                        style={{width:'60px'}}
                         onClick={this.handleReset.bind(this,onReset&&onReset.handle)}
                        >重置
                        </Button> */}
                        <Dropdown.Button onClick={this.handleReset.bind(this,onReset && onReset.handle)} type="ghost" overlay={menu}>
                            重置
                        </Dropdown.Button>
                        {onRefresh && <Button style={{ marginLeft: '5px',width: '36px',padding: '0 2px' }} onClick={onRefresh && onRefresh.handle}>
                            <Icon type="sync" />
                        </Button>}
                    </SlotItem>
                </Template>
            )
        }
    }
    render() {
        return (
            <Row className={`${baseCls} ${this.uid}`} >
                <Col>
                    <CollapseUtil
                        widthContainer={this.viewStore ? this.viewStore.widthContainer : 0}
                        parentUid={this.uid}
                        defaultToggle={this.props.defaultToggle}
                        onDidMount={this.props.onDidMount}
                        ondragger={this.props.ondragger}
                        onToggle={this.queryEmit('onToggle')}>
                        {this.renderContent('left')}
                        {this.renderContent('content')}
                        {this.renderRight()}
                    </CollapseUtil>
                </Col>
            </Row>
        )
    }
}
