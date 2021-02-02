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
import { Weaken } from '../interface'
import LegionsProSelect from '../LegionsProSelect';
import { IProSelectProps } from '../LegionsProSelect/interface'
import { ProQueryConditionStore } from '../store/pro.query.conditions';
import { IViewQueryConditionStore,ISelectAutoQuery } from '../store/pro.query.conditions/interface';
import { shortHash } from 'legions-lunar/object-hash';
import ReactDOM,{ findDOMNode } from "react-dom";
import { debounce } from 'legions-utils-tool/debounce'
import { cloneDeep } from 'lodash'
import { HlLabeledValue } from 'legions-lunar/model';
import { IFieldsState,IQueryConditionsInstance,IQueryDateProps,IQueryProps,IQueryRangePickerProps,IQuerySelectProps,IQueryTextAreaProps,IQueryTextProps,ISelectProps } from './interface';
import { ConditionCheckBoxModel,ConditionDateModel,ConditionRadioButtonModel,ConditionRangePickerModel,ConditionSearchModel,ConditionSelectModel,ConditionTextAreaModel,ConditionTextModel,ConditionTextNumberModel,IProConditions,ProConditions } from './ProConditionsUtils';
import { isArray } from 'legions-utils-tool/type.validation';
import LegionsProLineOverflow from '../LegionsProLineOverflow';
const { RangePicker } = DatePicker;
const Option = Select.Option;
const { TextArea } = Input;
const baseCls = `legions-pro-query`
interface IRadioButtonProps {
    value: string
    label: string,
    disabled?: boolean
}

interface IProps<Query = {}> {
    query: Array<IProConditions['componentModel']>,
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






interface IState {
    vmModel: any
    queryPrams: any
    fieldsStates: { name: string,state: IFieldsState }[],
    /**
     * xs: 宽度<768px 响应式栅格，可为栅格数或一个包含其他属性的对象 
     * 
     * sm:宽度≥768px 响应式栅格，可为栅格数或一个包含其他属性的对象 
     * 
     * md: 宽度≥992px 响应式栅格，可为栅格数或一个包含其他属性的对象
     * 
     * lg: 宽度≥1200px 响应式栅格，可为栅格数或一个包含其他属性的对象
     * 
     * xl:宽度≥1600px 响应式栅格，可为栅格数或一个包含其他属性的对象
     */
    resolution:'xs'| 'sm' | 'md' | 'lg' | 'xl'
}

@bind({ store: ProQueryConditionStore })
@observer
export default class LegionsProConditions<Query = {}> extends React.Component<IProps<Query>,IState>{
    /* search =debounce((options,val)=>{
       options&&options.props.onSearch&&options.props.onSearch(val)
    },200) */
    static ProConditions = ProConditions
    resize = debounce(() => {
        const queryDom = document.querySelector(`.${this.uid}`);
        if (queryDom && findDOMNode(queryDom) && this.viewStore) {
            this.viewStore.widthContainer = findDOMNode(queryDom).clientWidth;
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
            resolution: null,
        }
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
    }
    //@ts-ignore
    get viewStore() {
        return this.props.store.HlQueryConditionContainer.get(this.uid)
    }
    static defaultProps = {
        size: 'default',
        defaultToggle: false,
    }
    componentWillMount() {
        if (!this.props.store.HlQueryConditionContainer.has(this.uid)) {
            this.props.store.add(this.uid);
            this.initVModel();
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
                onSelectSearch: (name: string,params: {
                    pageIndex: number;
                    pageSize?: number;
                    keyWords?: string;
                } & Object) => {
                    const selectConfigs = this.props.query.filter((item) => item instanceof ConditionSelectModel);
                    const index = selectConfigs.findIndex((item) => item.containerProps.name === name);
                    if (index > -1) {
                        const item = selectConfigs[index].conditionsProps as IQuerySelectProps;
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
    }
    componentDidMount() {
        const queryDom = document.querySelector(`.${this.uid}`);
        const store = this.props.store.get(this.uid);
        if (queryDom && store) {
            this.onDidMount();
            window.addEventListener && window.addEventListener('resize',this.resize.bind(this))
        }
        this.dispatchRequest();
    }
    componentWillUnmount() {
        if (!this.props['uniqueUid']) {
            this.props.store.delete(this.uid)
        }
        window.removeEventListener && window.removeEventListener('resize',this.resize.bind(this))
    }
    componentDidUpdate() {
        this.onDidMount()
    }
    dispatchRequest() {
        const { query } = this.props;
        query.map((item) => {
            if (item instanceof ConditionSelectModel) {
                const props = item.conditionsProps as IQuerySelectProps;
                if (props.autoQuery && (props.autoQuery.isInitialize === void 0 || props.autoQuery.isInitialize)) {
                    this.viewStore.dispatchRequest(item.containerProps.name,props.autoQuery,{
                        pageIndex: 1,
                    })
                }
            }
        })
    }
    compuedResolution(width:number) {
        if (width >= 1600) {/** 宽度≥1600px 响应式栅格，可为栅格数或一个包含其他属性的对象 */
            this.setState({
                resolution:'xl'
            },() => {
                    console.log(this.state.resolution);
            })
            
        }
        else if (width >= 1200 && width < 1600) { /**宽度≥1200px 响应式栅格，可为栅格数或一个包含其他属性的对象 */
            this.setState({
                resolution:'lg'
            })
        }
        else if (width >= 992 && width < 1200) {/**宽度≥992px 响应式栅格，可为栅格数或一个包含其他属性的对象 */
            this.setState({
                resolution:'md'
            })
        }
        else if (width >= 768 && width < 992) {/**宽度≥768px 响应式栅格，可为栅格数或一个包含其他属性的对象 */
            this.setState({
                resolution:'sm'
            })
        }
        else if (width < 768) {
            this.setState({
                resolution:'xs'
            })
        }
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
    initVModel() {
        const { query } = this.props;
        let data = {}
        let prams = {}
        query.map((item) => {
            if (!(item instanceof ConditionSearchModel) && item.jsonProperty) {
                if (isArray(item.conditionsProps.defaultValue)) {
                    data[item.containerProps.name] = [...item.conditionsProps.defaultValue]
                }
                else {
                    data[item.containerProps.name] = item.conditionsProps.defaultValue || item.conditionsProps.value
                }
                prams[item.jsonProperty] = data[item.containerProps.name];
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
            if (!(item instanceof ConditionSearchModel)) {
                prams[item.jsonProperty] = this.state.vmModel[item.containerProps.name]
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
            let entity = this.props.query.find((item) => item.containerProps.name === key)
            if (entity && !(entity instanceof ConditionSearchModel) && !entity.conditionsProps.isNotReset) {
                if (entity.conditionsProps.onReset) {
                    data[key] = entity.conditionsProps.onReset(key,data[key]);
                }
                else {
                    data[key] = entity.conditionsProps.defaultValue || ''
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
    }
    /**
     * 回车搜索
     *
     * @param {Function} onEnter
     * @memberof QueryConditions
     */
    handleEnter(onEnter: Function) {
        onEnter && onEnter.call(this,this.state.vmModel)
        //@ts-ignore
        const emit = this.searchEmit();
        const onSearch = emit.find((item) => item.name === 'onSearch')
        this.handleSearch(onSearch && onSearch.handle)
    }
    formatTrim(str) {
        if (str) {
            return str.replace(/(^\s+)|(\s+$)/g,"");
        }
        return str
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
        else {
            throw new Error(`
            ProConditions: Unknown query. query = ${JSON.stringify(component)}`);
        }
    }
    renderInput(component: ConditionTextModel) {
        const { conditionsProps,containerProps,jsonProperty } = component;
        let placeholder = conditionsProps.placeholder as string
        if (this.viewStore && this.viewStore.computedSize === 'small') {
            placeholder = ''
        }
        const { labelSpan,defaultValue,...prop } = conditionsProps
        const onEnter = conditionsProps.onEnter;
        const vmValue = this.state.vmModel[containerProps.name]
        /* const vmValue  = this.viewStore.computedVmModel[JsonProperty.name] */
        const suffix = vmValue ? <Icon type="close-circle" onClick={() => {
            let state = this.state.vmModel;
            /* let state ={...this.viewStore.computedVmModel} */
            state[containerProps.name] = ''
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
                    value={vmValue}
                    onPressEnter={this.handleEnter.bind(this,onEnter)}
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
        const { labelSpan,defaultValue,...prop } = conditionsProps
        const { onReset,...themProps } = prop;
        const onEnter = conditionsProps.onEnter;
        const vmValue = this.state.vmModel[containerProps.name]
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

                    value={vmValue}
                    onPressEnter={this.handleEnter.bind(this,onEnter)}
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
        const { labelSpan,defaultValue,...prop } = conditionsProps
        const vmValue = this.state.vmModel[containerProps.name]
        /* let vmValue = this.viewStore.computedVmModel[JsonProperty.name] */
        /* if (isObservableArray(vmValue) && vmValue.length === 0) {
            vmValue =[]
        } */
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
    renderDate(component: ConditionDateModel) {
        const { conditionsProps,containerProps,jsonProperty } = component;
        const placeholder = conditionsProps.placeholder as string
        const { labelSpan,defaultValue,...prop } = conditionsProps
        const vmValue = this.state.vmModel[containerProps.name]
        /* const vmValue  = this.viewStore.computedVmModel[JsonProperty.name] */
        let value = vmValue
        value = value ? moment(value,prop.format) : void 0
        return (<DatePicker
            {...prop}
            style={{ width: '100%' }}
            placeholder={placeholder}
            value={value}
        >
        </DatePicker>)
    }
    renderDateRange(component: ConditionRangePickerModel) {
        const { conditionsProps,containerProps,jsonProperty } = component;
        const { labelSpan,defaultValue,...prop } = conditionsProps
        const placeholder = conditionsProps.placeholder as [string,string]
        const vmValue = this.state.vmModel[containerProps.name]
        /*  const vmValue  = this.viewStore.computedVmModel[JsonProperty.name] */
        let value = vmValue
        value = (value && value.length) ? [moment(value[0],prop.format),moment(value[1],prop.format)] : [void 0,void 0]

        return (<RangePicker
            allowClear={true}
            {...prop}
            value={value}
            placeholder={placeholder}
        >

        </RangePicker>)
    }
    renderChxBox(component: ConditionCheckBoxModel) {
        const { conditionsProps,containerProps,jsonProperty } = component;
        const { labelSpan,...prop } = conditionsProps
        const placeholder = conditionsProps.placeholder as string
        const vmValue = this.state.vmModel[containerProps.name]
        /* const vmValue  = this.viewStore.computedVmModel[JsonProperty.name] */
        let value = vmValue === '' ? false : vmValue
        return (<Checkbox
            checked={value}>
            {conditionsProps.label}
        </Checkbox>)
    }
    renderInputNumber(component: ConditionTextNumberModel) {
        const { conditionsProps,containerProps,jsonProperty } = component;
        const { labelSpan,defaultValue,...prop } = conditionsProps
        let placeholder = conditionsProps.placeholder as string
        if (this.viewStore && this.viewStore.computedSize === 'small') {
            placeholder = ''
        }
        const onEnter = conditionsProps.onEnter;
        const vmValue = this.state.vmModel[containerProps.name]
        /* const vmValue  = this.viewStore.computedVmModel[JsonProperty.name] */
        return (
            <InputNumber
                {...prop}
                onKeyDown={(value) => {
                    if (value && value['key'] && value['key'] === 'Enter') {
                        this.handleEnter.call(this,onEnter);
                    }
                }}
                style={{ width: '100%' }}
                value={vmValue}
                placeholder={placeholder}
            >
            </InputNumber>)
    }
    renderRadioButton(component: ConditionRadioButtonModel) {
        const { conditionsProps,containerProps,jsonProperty } = component;
        const { labelSpan,defaultValue,options,...prop } = conditionsProps
        const newData = options as Array<IRadioButtonProps>
        const vmValue = this.state.vmModel[containerProps.name]
        /* const vmValue  = this.viewStore.computedVmModel[JsonProperty.name] */
        return (
            <RadioGroup
                {...prop}
                style={{ width: '100%' }}
                value={vmValue}
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
                const size = item.key
                // @ts-ignore
                this.viewStore.setSize(size);
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
                    style={{ borderColor: `#46b8da`,color: `white` }}
                >{`${'搜索'}`}
                </Button></Col>
                <Col span={6} >
                    <Dropdown.Button type="ghost" overlay={menu}>
                        重置
                        </Dropdown.Button>
                </Col>
                <Col span={4} >
                    {<Button style={{ width: '100%',padding: '0 2px' }}
                        //@ts-ignore
                        title="刷新">
                        <Icon type="sync" title="刷新" />
                    </Button>}
                </Col>
                <Col span={8}>
                    <Button
                        type="ghost"
                        icon={ 'up'}
                        style={{ backgroundColor: `#fff`,borderColor: `#46b8da` }}>
                        展开{this.viewStore.compuedResolution}
                 </Button>
                </Col>




            </Row>
        </React.Fragment>
    }
    renderLabel(component: IProConditions['componentModel']) {
        if (!(component instanceof ConditionSearchModel)) {
            return (
                this.viewStore.computedSize === 'small' ? <label
                    title={component.conditionsProps.label}
                    style={{
                        float: 'left',marginLeft: '5px',marginRight: '3px',
                        position: 'absolute',zIndex: 999,background: '#fff',
                        height: '20px',lineHeight: '20px',
                        color: '#999',top: '-3px',fontSize: 10,
                        //@ts-ignore
                        webkitTransform: 'scale(0.9)'
                    }}>
                    {component instanceof ConditionRadioButtonModel ? '' : component.conditionsProps.label}
                </label> :
                    <label
                        //@ts-ignore
                        htmlFor={component.containerProps.name}
                        title={component.conditionsProps.label} style={{ lineHeight: '28px',position: 'absolute',right: '0px' }}>
                        {component.conditionsProps.label}
                    </label>
            )
        }
        return null;

    }
    renderShowComponent() {
        const searchItem = this.props.query.find((item) => item instanceof ConditionSearchModel)
        let searchSpan = 0;
        if (searchItem && !Array.isArray(searchItem)) {
            const Resolution = searchItem.containerProps.col[this.viewStore.compuedResolution];
            if (typeof Resolution === 'number') {
                searchSpan = Resolution
            }
            else if (typeof Resolution === 'object') {
                searchSpan = Resolution.span||4
            }
        }
        let unUsedSpan = 24 - searchSpan;
        
    }
    render() {
        return (
            <Row className={`${baseCls} ${this.uid}`} gutter={8} type="flex">
                {this.props.query.map((item) => {
                    const labelSpan = (item instanceof ConditionCheckBoxModel || (item instanceof ConditionSearchModel)) ? 1 : (item.conditionsProps.labelSpan || 4)
                    const offset = item instanceof ConditionCheckBoxModel ? { offset: 1 } : {}
                    return <Col {...item.containerProps.col} key={item.containerProps.name} style={{ paddingBottom: '6px' }}>
                        {(item instanceof ConditionCheckBoxModel) || (item instanceof ConditionSearchModel) ? null : <Col className="legions-pro-query-label" span={labelSpan}>
                            {this.renderLabel(item)}
                        </Col>}
                        <Col style={{ lineHeight: '28px' }} {...offset} span={24 - labelSpan}>
                            {this.renderComponent(item)}
                        </Col>
                    </Col>
                })}
            </Row>
        )
    }
}
