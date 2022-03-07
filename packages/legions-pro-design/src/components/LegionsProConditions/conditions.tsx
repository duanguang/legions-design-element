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
import LegionsProSelect from '../LegionsProSelect';
import { StoreConditions } from './store'
import { shortHash } from 'legions-lunar/object-hash';
import ReactDOM,{ findDOMNode } from "react-dom";
import { debounce } from 'legions-utils-tool/debounce'
import { cloneDeep,isNumber } from 'lodash'
import { LegionsLabeledValue } from 'legions-lunar/model';
import { ProConditionsProps,ProConditions } from './interface';
import { ConditionCheckBoxModel,ConditionDateModel,ConditionGroupCheckBoxModel,ConditionRadioButtonModel,ConditionRangePickerModel,ConditionSearchModel,ConditionSelectModel,ConditionTextAreaModel,ConditionTextModel,ConditionTextNumberModel,IProConditions,ProConditionsBase } from './ProConditionsUtils';
import { isArray,isObject } from 'legions-utils-tool/type.validation';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import LegionsProDragger from '../LegionsProDragger';
import { IProDraggerOptions,IProDraggerProps } from '../LegionsProDragger/interface';
import { toJS } from 'mobx'
import { ProSelect } from '../LegionsProSelect/interface'
const { RangePicker } = DatePicker;
const Option = Select.Option;
const { TextArea } = Input;
const baseCls = `legions-pro-query`
interface IRadioButtonProps {
    value: string
    label: string,
    disabled?: boolean
}
interface IProps extends ProConditionsProps {

}
interface IState {
    collapsed: boolean
}
@bind({ store: StoreConditions })
@observer
export default class LegionsProConditions<Query = {}> extends React.Component<IProps,IState>{
    /* search =debounce((options,val)=>{
       options&&options.props.onSearch&&options.props.onSearch(val)
    },200) */
    static ProConditionsBase = ProConditionsBase
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
        col: 6,
        defaultCollapsed: true,
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
                addQuery: (list) => {
                    this.initVModel(list);
                    this.viewStore._initQuery(list);
                    this.dispatchRequest(list);
                },
                removeQuery: (uuid) => {
                    return this.viewStore._removeQuery(uuid);
                },
                setFieldsValues: (name: string,callback: (value) => void) => {
                    this.setFieldsValues(name,callback);
                },
                getQuerySelectOption: (name: string,option_key: string) => {
                    const selectConfigs = this.props.query.filter((item) => item instanceof ConditionSelectModel);
                    const index = selectConfigs.findIndex((item) => item.container.name === name);
                    let newData = [] as Array<ProSelect['options']>
                    let curr_item = new LegionsLabeledValue();
                    if (index > -1) {
                        const item = selectConfigs[index].props as ProConditions['component_props']['select'];
                        newData = item.options as Array<ProSelect['options']>
                        if (item.request) {
                            const data = this.viewStore._select_data.get(name);
                            if (data) {
                                newData = data.data;
                            }
                        }
                        const option = newData.find((item) => item.value === option_key)
                        curr_item = {
                            ...curr_item,
                            ...option,
                        }
                    }
                    return {
                        curr_item,
                        data: newData,
                    }
                },
                onSelectRequest:async (name: string,params?:any) => {
                    const selectConfigs = this.props.query.filter((item) => item instanceof ConditionSelectModel&& item.props['request']);
                    const index = selectConfigs.findIndex((item) => item.container.name === name);
                    if (index > -1) {
                        const props = selectConfigs[index].props as ProConditions['component_props']['select'];
                        return await this._dispatchFetch(props,params)
                    }
                    return {
                        data: [],
                        total:0,
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
    componentWillReceiveProps(nextProps: IProps) {
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
    async _dispatchFetch(props: ProConditions['component_props']['select'],params?:any) {
        return await props?.request(params)
    }
    async dispatchRequest(query = this.props.query) {
        const select_fetch = query.filter((item) => item instanceof ConditionSelectModel && item.props['request'])
        return select_fetch.map(async (item) => {
            const props = item.props as ProConditions['component_props']['select'];
            const result = await this._dispatchFetch(props)
            this.viewStore._setSelectData(item.container.name,result)
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
    setFieldsValues<T extends IProConditions['componentModel']>(name: string,callback: (value: T) => void) {
        this.viewStore._setQueryState<T>(name,(value) => {
            callback(value);
        });
    }
    mapPrams(item: Exclude<IProConditions['componentModel'],ConditionSearchModel>,data: any,prams: {}) {
        const jsonProperty = item.props?.jsonProperty || item.container.name
        if (Array.isArray(jsonProperty) && jsonProperty.length === 2) {
            if (item instanceof ConditionRangePickerModel) {
                const startTime = data && data[0] || ''
                const endTime = data && data[1] || ''
                const format = item.props.transformFormat || 'YYYY-MM-DD'
                prams[jsonProperty[0].trim()] = startTime && moment(startTime).format(format)
                prams[jsonProperty[1].trim()] = endTime && moment(endTime).format(format)
            }
            else if (item instanceof ConditionSelectModel) {
                if (item.props.labelInValue) {
                    let key = ''
                    let label = ''
                    if (Array.isArray(data)) {
                        prams[item.container.name] = data
                    } else {
                        key = data && data['key'] || ''
                        label = data && data['label'] || ''
                        prams[jsonProperty[0].trim()] = key
                        prams[jsonProperty[1].trim()] = label
                    }
                }
                else {
                    prams[jsonProperty[0].trim()] = data
                }
            }
            else {
                if (process.env.NODE_ENV !== 'production') {
                    console.error('if the components is not Select Or RangePicker, "jsonProperty" should be string without "[]" ')
                }
            }
        } else {
            prams[jsonProperty] = data
        }
        return prams
    }
    initVModel(query = this.props.query) {
        let data = {}
        let prams = {}
        query.map((item) => {
            const name = item.container.name;
            if (!(item instanceof ConditionSearchModel)) {
                if (isArray(item.props.defaultValue)) {
                    if (item instanceof ConditionRangePickerModel) {
                        data[name] = item.props.defaultValue.map((m) => {
                            if (moment.isMoment(m)) {
                                return moment(m).format(item.props.format || 'YYYY-MM-DD HH:mm:ss')
                            }
                            return m;
                        })
                    } else {
                        data[name] = [...item.props.defaultValue]
                    }
                }
                else {
                    let defaultValue = item.props.defaultValue;
                    let value = item.props.value;
                    if (item instanceof ConditionCheckBoxModel) {
                        defaultValue = item.props.defaultChecked;
                        value = item.props.checked || item.props.value;
                    }

                    let newValue = null;
                    if (item instanceof ConditionDateModel) {
                        const format = item.props.format || 'YYYY-MM-DD HH:mm:ss'
                        if (moment.isMoment(defaultValue)) {
                            newValue = moment(defaultValue).format(format)
                        }
                        else if (moment.isMoment(value)) {
                            newValue = moment(value).format(format)
                        }
                        data[name] = newValue;
                    }
                    else if (item instanceof ConditionRangePickerModel) {
                        data[name] = ['',''];
                    }
                    else {
                        data[name] = defaultValue || value
                    }
                }
                prams = this.mapPrams(item,data[name],prams)
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
                prams = this.mapPrams(item,this.vmModel[item.container.name],prams)
            }
        })
        this.queryPrams = prams;
    }
    reset() {
        let data = this.vmModel
        /* let data = {...this.viewStore.computedVmModel} */
        const { computedQuery } = this.viewStore
        Object.keys(data).forEach((key) => {
            let entity = computedQuery.find((item) => item.container.name === key)
            if (entity && !(entity instanceof ConditionSearchModel) && !entity.props.isNotReset) {
                if (entity.props.onReset) {
                    data[key] = entity.props.onReset(key,data[key]);
                }
                else {
                    let defaultValue = entity.props.defaultValue;
                    const format = entity.props['format'] || 'YYYY-MM-DD';
                    if (moment.isMoment(defaultValue)) {
                        data[key] = moment(defaultValue).format(format)
                    } else if (Array.isArray(defaultValue) && defaultValue.length >= 2) {
                        data[key] = [moment(defaultValue[0]).format(format),moment(defaultValue[1]).format(format)]
                    }
                    else if (entity instanceof ConditionCheckBoxModel) {
                        data[key] = entity.props.defaultChecked;
                        defaultValue = data[key]
                    }
                    else {
                        data[key] = defaultValue || ''
                    }
                    this.setFieldsValues(entity.container.name,(value) => {
                        if (value instanceof ConditionCheckBoxModel) {
                            value.props.checked = defaultValue;
                        }
                        else {
                            value.props['value'] = defaultValue;
                        }
                    })
                }
            }

        })
        this.viewStore._setVmModel(data);
        this.mapQueryValue();
    }
    handleChangeDate(component: ConditionDateModel | ConditionRangePickerModel,datas: moment.Moment | [moment.Moment,moment.Moment],dateString: string) {
        const name = component.container.name;
        let data = this.vmModel;
        this.setFieldsValues(name,(value) => {
            value.props['value'] = datas;
        })
        data[name] = dateString
        if (component instanceof ConditionDateModel) {
            component.props.onChange && component.props.onChange.call(this,{
                date: datas,dateString
            },{
                state: cloneDeep(data),
                parameter: cloneDeep(this.queryPrams),
            },this.viewStore)
        }
        else if (component instanceof ConditionRangePickerModel) {
            component.props.onChange && component.props.onChange.call(this,{
                date: datas,dateString
            },{
                state: cloneDeep(data),
                parameter: cloneDeep(this.queryPrams),
            },this.viewStore)
        }
        this.viewStore._setVmModel(data);
    }
    handleChangeChx(component: ConditionCheckBoxModel,even: React.ChangeEvent<HTMLInputElement>) {
        let value = even.target.checked;
        let data = this.vmModel;
        const name = component.container.name
        data[name] = value;

        this.setFieldsValues(name,(values: ConditionCheckBoxModel) => {
            values.props.checked = value;
        })
        component.props.onChange && component.props.onChange.call(this,even,{
            state: cloneDeep(data),
            parameter: cloneDeep(this.queryPrams),
        },this.viewStore)
        this.viewStore._setVmModel(data);
    }
    handleSelectSearch(component: ConditionSelectModel,value) {
        const props = component.props;
        props.onSearch && props.onSearch(value)
    }
    handleChangeSelect(component: ConditionSelectModel,value,packingValue) {
        const props = component.props;
        const name = component.container.name;
        let data = this.vmModel
        data[name] = value;
        this.setFieldsValues(name,(value: ConditionSelectModel) => {
            value.props.value = data[name];
        })
        props.onChange && props.onChange.call(this,value,{
            state: cloneDeep(data),
            parameter: cloneDeep(this.queryPrams),
            packingValue,
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
        const item = this.viewStore.computedQuery.find((item) => item instanceof ConditionSearchModel);
        if (item && item instanceof ConditionSearchModel) {
            item.props.onReset && item.props.onReset.call(this,cloneDeep(this.queryPrams),this.viewStore)
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
            item.props.onSearch && item.props.onSearch.call(this,cloneDeep(this.queryPrams),this.viewStore)
        }
    }
    /**
     * 回车搜索
     *
     * @param {Function} onEnter
     * @memberof QueryConditions
     */
    handleEnter(com: IProConditions['componentModel']) {
        const onEnter = com.props['onEnter'];
        onEnter && onEnter.call(this,{
            state: cloneDeep(this.vmModel),
            parameter: cloneDeep(this.queryPrams),
        },this.viewStore)
        this.handleSearch()
    }
    handleToggle() {
        const onToggle = (toggle: boolean) => {
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
        const name = component.container.name;
        const props = component.props;
        if (typeof even === 'object') {
            value = even.target.value
        }
        let data = this.vmModel
        data[name] = value
        if (component instanceof ConditionTextModel) {
            data[name] = this.formatTrim(value)
        }
        this.setFieldsValues(name,(value) => {
            value.props['value'] = data[name]
        })
        props['onChange'] && props.onChange.call(this,even,{
            viewState: cloneDeep(data),
            parameter: cloneDeep(this.queryPrams),
        },this.viewStore)
        this.viewStore._setVmModel(data);
    }
    handleGroupChxBox(component: ConditionGroupCheckBoxModel,checkedValue: Array<CheckboxValueType>) {
        let data = this.vmModel;
        const name = component.container.name
        data[name] = checkedValue;
        this.setFieldsValues(name,(value: ConditionGroupCheckBoxModel) => {
            value.props.value = checkedValue;
        })
        component.props.onChange && component.props.onChange.call(this,checkedValue,{
            state: cloneDeep(data),
            parameter: cloneDeep(this.queryPrams),
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
        const { props,container } = component;
        const { defaultValue,visable,display,value = defaultValue,...prop } = props
        return <Checkbox.Group {...prop}
            value={value}
            onChange={this.handleGroupChxBox.bind(this,component)} />
    }
    renderInput(component: ConditionTextModel) {
        const { props,container } = component;
        let placeholder = props.placeholder as string
        if (this.viewStore && this.viewStore.computedSize === 'small') {
            placeholder = ''
        }
        const { defaultValue,value = defaultValue,visable,display,...prop } = props
        const suffix = value ? <Icon type="close-circle" onClick={() => {
            let state = this.vmModel;
            state[container.name] = ''
            this.setFieldsValues(container.name,(value: ConditionTextModel) => {
                value.props.value = ''
            })
            this.viewStore._setVmModel(state)
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
        const { props } = component;
        let placeholder = props.placeholder as string
        if (this.viewStore && this.viewStore.computedSize === 'small') {
            placeholder = ''
        }
        const { defaultValue,value = defaultValue,visable,display,...prop } = props
        const { onReset,...themProps } = prop;
        const onEnter = props.onEnter;
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
        const { props,container } = component;
        const { jsonProperty } = props
        if (process.env.NODE_ENV !== 'production') {
            if (Array.isArray(jsonProperty) && !props.labelInValue) {
                console.error('LegionsProCondition的Select组件未开启labelInValue时,参数jsonProperty建议不要使用带,(逗号)的字符串格式')
                console.error('when the Select components of the LegionsProCondition is not used "labelInValue", "jsonProperty" should be string without "," ')
            }
        }
        const placeholder = props.placeholder as string
        let newData = props.options as Array<ProSelect['options']>
        const { defaultValue,visable,display,value = defaultValue,...prop } = props
        const firstActiveValue = newData.length > 0 ? [`${newData[0]?.key}`] : ''
        const data = this.viewStore._select_data.get(container.name);
        if (data && prop.request) {
            newData = data.data;
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
        const { props } = component;
        const placeholder = props.placeholder as string
        const { defaultValue,visable,display,value = defaultValue,...prop } = props
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
        const { props } = component;
        const { defaultValue,visable,display,value = defaultValue,...prop } = props
        let placeholder = { placeholder: ['',''] as [string,string] };
        if (props.placeholder) {
            placeholder = { placeholder: props.placeholder }
        }
        return (<RangePicker
            allowClear={true}
            {...prop}
            value={value}
            onChange={this.handleChangeDate.bind(this,component)}
            {...placeholder}
        >

        </RangePicker>)
    }
    renderChxBox(component: ConditionCheckBoxModel) {
        const { props } = component;
        const { visable,display,value,defaultChecked,...prop } = props
        return (<Checkbox
            {...prop}
            defaultChecked={defaultChecked}
            onChange={this.handleChangeChx.bind(this,component)}

        >
            {props.label}
        </Checkbox>)
    }
    renderInputNumber(component: ConditionTextNumberModel) {
        const { props } = component;
        const { defaultValue,display,visable,...prop } = props
        let placeholder = props.placeholder as string
        if (this.viewStore && this.viewStore.computedSize === 'small') {
            placeholder = ''
        }
        const onEnter = props.onEnter;
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
        const { props,container } = component;
        const { defaultValue,display,options,visable,...prop } = props
        const newData = options as Array<IRadioButtonProps>
        return (
            <RadioGroup
                {...prop}
                style={{ width: '100%' }}
                defaultValue={defaultValue}

                onChange={this.handleChange.bind(this,component)}
            >
                {newData && newData.map((item) => {
                    return (<RadioButton key={`${item.value}-${container.name}`} disabled={item.disabled} value={item.value}>{item.label}</RadioButton>)
                })}

            </RadioGroup>
        )
    }
    renderSearch(component: ConditionSearchModel) {
        return <React.Fragment>
            <div className="legions-pro-query-search">
                <Button
                    type="primary"
                    icon={'search'}
                    onClick={this.handleSearch.bind(this)}
                >{component.props.searchText || '搜索'}
                </Button>

                <Button
                    className="query-reset-btn"
                    type="primary"
                    ghost
                    icon="sync"
                    onClick={this.handleReset.bind(this)}
                >{component.props.resetText || '重置'}</Button>
                <Button
                    type="primary"
                    ghost
                    icon={this.state.collapsed ? 'down' : 'up'}
                    onClick={this.handleToggle.bind(this)}>
                    {this.state.collapsed ? '收起' : '展开'}
                </Button>
            </div>
        </React.Fragment>
    }
    renderLabel(component: IProConditions['componentModel']) {
        if (!(component instanceof ConditionSearchModel) && !(component instanceof ConditionCheckBoxModel) && !(component instanceof ConditionGroupCheckBoxModel)) {
            let label = component.props.label;
            const name = component.container.name;
            return (
                this.viewStore.computedSize !== 'small' ? <Col className="legions-pro-query-label" >
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
        /** 直接从query组件传入的全局col属性计算 */
        const parentColCompute = () => {
            const { col } = this.props;
            if (isNumber(col)) {
                return col as number * (item.container.colNum || 1)
            } else {
                return col[this.viewStore.compuedResolution] * (item.container.colNum || 1)
            }
        }
        // 如果子项有传递col属性，则取子项配置，没有则取组件props中的col属性
        if (item.container.col) {
            const Resolution = item.container.col[this.viewStore.compuedResolution];
            if (isNumber(Resolution)) {
                return Resolution
            } else if (isObject(Resolution)) {
                return Resolution['span']
            } else {
                return parentColCompute()
            }
        } else {
            return parentColCompute()
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
            let visable: boolean = item.props['visable']
            visable = visable === void 0 ? true : visable;
            if (unUsedSpan >= currSpan && visable) {
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
            let visable: boolean = item.props['visable']
            visable = visable === void 0 ? true : visable;
            if (visable) {
                show.push(item);
            }
        })
        return this.renderQueryComponent(show);
    }
    renderQueryComponent(list: IProConditions['componentModel'][]) {
        return list.map((item) => {
            const { offset,pull,push,md,xl,lg,sm,xs,...col } = item.container.col || {};
            const span = this.getQueryItemSpan(item)
            const colspan = { span };
            const uid = item.container.uuid;
            const { className = '',style = {},onClick } = item.container;
            const click = {};
            if (onClick) {
                click['onClick'] = onClick.bind(this,{ uid: uid,name: item.container.name });
            }
            return <Col {...col} {...colspan}
                {...click}
                className={`legions-pro-query-item ${className}`}
                data-id={uid}
                data-name={item.container.name}
                key={uid} style={{ ...style }}>
                {this.renderLabel(item)}
                <div style={{ lineHeight: '28px' }} className="legions-pro-query-field">
                    {this.renderComponent(item)}
                </div>
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
        const { draggerProps = {} as IProDraggerProps } = this.props;
        const { options = {} as IProDraggerOptions,onChange,...prop } = draggerProps
        return (
            <Row className={`${baseCls} ${this.uid}`} gutter={8} type="flex">
                {this.props.isDragSort ? <LegionsProDragger
                    options={{
                        animation: 150,
                        ...draggerProps.options,
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
                                const view = this.viewStore.computedQuery.find((s) => s.container.uuid === item);
                                if (view) {
                                    query.push(view);
                                }
                            })
                            this.viewStore._clearQuery();
                            this.viewStore._initQuery(query);
                        }
                        if (typeof onChange === 'function') {
                            onChange(items,sort,evt);
                        }
                    }}
                    {...prop}
                >
                    {this.renderContent()}
                </LegionsProDragger> : this.renderContent()}


            </Row>
        )
    }
}
