import React from 'react'
import { Form,Input,Row,Col,Layout,Icon,Anchor,Affix,Tooltip,Dropdown,Menu } from 'antd';
const { Link } = Anchor;
const FormItem = Form.Item;
import CreateForm from './CreateForm';
import { LabelWithInputModel } from './FormInput';
import './style/index.less'
import { WrappedFormUtils } from '../interface/antd';
import { IErrorView, IFormState, IGroup } from './interface/form';
import { ISchedule } from '../store/interface';
import {
    LabelWithHLSelectModel,LabelWithSelectModel,LabelWithRenderModel,LabelWithDatePickerModel,
    LabelWithMonthPickerModel,LabelWithRangePickerModel,LabelWithUploadModel,LabelWithInputNumberModel,
} from './interface';
import { bind,observer } from 'legions/store-react'
import {ProFormStore } from '../store/pro.form';
import {IViewModelHlFormStore,IElementList} from '../store/pro.form/interface'
import { shortHash } from 'legions-lunar/object-hash';
import { LabelWithSwitchModel } from './FormSwitch';
import { LabelWithRadioButtonModel } from './FormRadioButton';
import { debounce } from 'legions-utils-tool/debounce'
import { LabelWithTextModel } from './FormText';
import { InstanceForm } from './interface/form';
import { computed,observable,runInAction,toJS } from 'mobx';
import LegionsProDragger from '../LegionsProDragger';
import get from 'lodash/get'
import { ValidateCallback } from 'antd/lib/form/Form';
import { LabelWithCheckboxModel } from './FormCheckbox';
import { BaseFormFields, HlLabeledValue } from 'legions-lunar/model';
import { legionsPlugins,LegionsPluginsExecute,LoggerManager } from 'legions-lunar/legion.plugin.sdk';
import { ProFormFields,ProFormUtils,COMPONENT_TYPE } from './ProFormUtils';
const baseCls = `legions-pro-form`

export interface IProFormProps<mapProps = {}> {
    form?: WrappedFormUtils,

    /**
     * 表单输入数据模型
     * 数据模型class 实例
     * 注意 使用此模式，由于数据时动态生成，当被改变时，组件无法作出反应，请在调用组件实例定义@observable xxx来接收
     * 并在调用updateFormInputData进行更新时，传入此变量
     * @type {Object}
     * @memberof IHLFormProps
     */
    InputDataModel: Function,
    store?: ProFormStore,
    controls: Array<any>;
    group?: Array<IGroup>,

    /**
     * 等分栅格 默认2
     *
     * @type {(1|2|3)}
     * @memberof IHLFormProps
     */
    colCount?: 1 | 2 | 3 | 4

    /**
     *把父组件的属性映射到表单项上（可用于把 Redux store 中的值读出）
     *
     * @memberof IProps
     */
    mapPropsToFields: (props: mapProps) => any

    /**
     * 当 Form.Item 子节点的值发生改变时触发，可以把对应的值转存到 mobx store or redux store
     *
     * @memberof IHLFormProps
     */
    onFieldsChange: (props: mapProps,fields) => void

    /**
     *任一表单域的值发生改变时的回调
     *
     * @memberof IHLFormProps
     */
    onValuesChange?: (props,values) => void

    /**
     * 获取表单数据模型
     * form  即将废弃，请formRef.viewModel.form 获取 
     *
     * @memberof IHLFormProps
     */
    onReady: (
        /**即将废弃，请formRef.viewModel.form 获取 */
        form: WrappedFormUtils,
        formRef?: InstanceForm) => void;
    size?: 'default' | 'small' | 'table';


    /**
     *
     * 忽略错误信息触发
     * @memberof IHLFormProps
     */
    onIgnoreError?: (item: IErrorView) => void


    /**
     * 改变表单主题风格时触发
     *
     * @memberof IHLFormProps
     */
    onUpdateStyleSize?: (size: 'default' | 'small' | 'table') => void

    /**
     * 主要用于当父组件中存在多个表单组件时，标记key 来保证父级组件中表单组件唯一
     * 注意，建议一定传递
     * @type {string}
     * @memberof IProps
     */
    uniqueKeys?: string;

    isDragSort?: boolean;

    onLogRecord?: (params: {
        modulesPath?: string;
        type: string;
        content: string;
        modulesName?: string;
        userInfo: string;
        traceId: string;
        browserEnvironment: string;
    }) => void
}

interface IState {
    groupEntity: Array<IGroup>,
    activeName: string,
}
enum KeydownEnum {
    /**键盘向上键 */
    up = 38,

    /** 键盘向下键 */
    next = 40,

    /** 回车键 */
    enter = 13,
}
const size = {
    'default': {
        formItemLayOut: 'form-item-default',
    },'small': {
        formItemLayOut: 'form-item-small',
    },'table': {
        formItemLayOut: 'form-item-table',
    }
}
@bind({ store: ProFormStore })
@observer
class HLForm<mapProps = {}> extends CreateForm<IProFormProps<mapProps>,IState>{
    timer = null
    timeId = new Date().getTime()

    /** 根据时间戳生成，每次初始化表单组件都会产生新的值*/
    uid = ''

    /** uid 的值绝对唯一，且每次初始生成表单都是相同值 */
    freezeUid = ''

    /** 未加密的freezeUid 值 */
    decryptionFreezeUid = ''
    subscription: ISchedule = null;
    controlsLen = 0;
    /** 全链路监控跟踪id */
    traceId: string = '';
    constructor(props) {
        super(props)
        this.state = {
            groupEntity: [],
            activeName: ''
        }
        this.uid = this.props['uid'];
        this.uid = `form${this.props.store.HLFormContainer.size}${shortHash(`${this.timeId}${this.props.store.HLFormContainer.size}`)}`;
        if (this.props.store.HLFormContainer.has(this.uid)) {
            this.timeId = new Date().getTime()
            this.uid = `form${this.props.store.HLFormContainer.size}${shortHash(`${this.timeId}${this.props.store.HLFormContainer.size}`)}`;
        }
        this.traceId = this.uid;
        this.props.store.add(this.uid,{ ...this.props.form,validateFields: this.validateFields.bind(this) },this.props.InputDataModel)
        if (this.props['uniqueUid']) {
            this.decryptionFreezeUid = `${this.props['uniqueUid']}${this.props.uniqueKeys || ''}${process.env.environment === 'production' ? 'production' : ''}`;
            this.freezeUid = shortHash(this.decryptionFreezeUid);
            if (!this.props.store.HLFormLocalDataContainer.has(this.freezeUid)) {
                this.props.store.addLocalData(this.freezeUid)
                this.initSelectView();
            }
            this.storeLocalView.setDragSort(this.props.isDragSort);
            if (this.storeLocalView.dragSortState) {
                this.storeLocalView.updateControlsSort(this.props.controls.map(item => item.iAntdProps.name));
            }
        }
        this.storeView.updateStyleSize(this.props.size);
        /* if (this.props.InputDataModel) {
            this.subscription = this.props.store.schedule([() => {
                const view = this.storeView.InputDataModel
            }])
        } */
        this.initFromState();
        this.setFormItemStateDisabled({
            props: this.props
        });
        this.consoleLog('hlFormContainer-constructor');
    }
    watcher = (n) => {
        console.log(this.storeView.InputDataModel,'InputDataModel')
    }
    static defaultProps = {
        size: 'default',
        isDragSort: false,
    }
    get storeView() {
        return this.props.store.HLFormContainer.get(this.uid)
    }
    get storeLocalView() {
        return this.props.store.HLFormLocalDataContainer.get(this.freezeUid)
    }
    consoleLog(type: Parameters<typeof LoggerManager['report']>[0]['type'],logObj?: Object) {
        const obj = logObj || {}
        const logConent = {
            localView: { ...this.storeLocalView },...obj,
            store: this.props.store,
            that: toJS(this),
            props: toJS(this.props),
            storeView: this.storeView,
        }
        LoggerManager.consoleLog({
            type,
            logConent,
            methodsName: 'onHLFormCycle',
        })
    }
    logger(type: Parameters<HLForm['consoleLog']>[0],logObj?: Object) {
        if (typeof this.props.onLogRecord === 'function') {
            const obj = logObj || {}
            const { store,form,...props } = this.props
            const logConent = {
                ...obj,
                props: {
                    colCount: props.colCount,
                    size: props.size,
                },
            }
            LoggerManager.report({
                type,
                content: JSON.stringify(logConent),
                traceId: this.traceId,
                modulesPath: this.props['uniqueUid'],
            },this.props.onLogRecord)
        }
    }
    getFormItemState(name: string) {
        return this.storeView.computedFormState.get(name)
    }
    initGroup(group: IGroup[] = this.props.group) {
        if (this.state.groupEntity.length === 0 || (group && this.state.groupEntity.length !== group.length)) {
            let groupEntity: IGroup[] = []
            group && group.map((item) => {
                groupEntity.push({ name: item.name,active: item.active,isFolding: item.isFolding,id: item.id,isShowSizeIcon: item.isShowSizeIcon })
            })
            this.setState({
                groupEntity: groupEntity
            })
        }
    }
    /** 重写表单验证提交方法 */
    validateFields(...options) {
        console.log(options);
        let callback: ValidateCallback = null;
        const newCallback = (callbacks: ValidateCallback) => (error,values) => {
            this.logger('hlFormContainer-validateFields',{ error,values,traceId: this.traceId })
            callbacks(error,values)
        }

        if (options.length === 3) {
            if (typeof options[2] === 'function') {
                callback = options[2];
                options[2] = newCallback(callback);
            }
        }
        else if (options.length === 2) {
            if (typeof options[1] === 'function') {
                callback = options[1];
                options[1] = newCallback(callback);
            }
        }
        else if (options.length === 1 && typeof options[0] === 'function') {
            callback = options[0];
            options[0] = newCallback(callback);
        }
        // @ts-ignore
        this.props.form.validateFields(...options)
    }
    componentWillMount() {
        const group = this.props.group;
        let groupEntity: IGroup[] = []
        group && group.map((item) => {
            groupEntity.push({ name: item.name,active: item.active,isFolding: item.isFolding,id: item.id,isShowSizeIcon: item.isShowSizeIcon })
        })
        this.setState({
            groupEntity: groupEntity
        })
        const view = this.props.store.HLFormContainer.get(this.uid);
        const localview = this.props.store.HLFormLocalDataContainer.get(this.freezeUid);
        view.controls = this.props.controls;

        this.props.onReady && this.props.onReady({ ...this.props.form,validateFields: this.validateFields.bind(this) },{
            store: this.props.store,
            uid: this.uid,
            viewModel: view,
            localViewModel: localview,
            freezeUid: this.freezeUid,
            decryptionFreezeUid: this.decryptionFreezeUid,
            methods: {
                onSelectSearch: (name,options) => {
                    this.onSelectSearch(name,options);
                },
                getQuerySelectOption: (name: string,optionKey: string) => {
                    const selectView = this.storeLocalView.selectView.get(name)
                    let optionItem = new HlLabeledValue();
                    if (selectView && selectView.currValue) {
                        for (let i = 1; i <= selectView.currValue.data.size; i++) {
                             //@ts-ignore
                            const option = selectView.currValue.data.get(i.toString()).find((item) => item.key === optionKey)
                            if (option) {
                                optionItem = {
                                    ...optionItem,
                                    ...option,
                                }
                                break;
                            }
                        }
                    }
                    return {
                        option: optionItem,
                    }
                },
            },
            validateFields: (callback: ValidateCallback) => {
                view.form.validateFields(callback)
            }
        })
        this.consoleLog('hlFormContainer-componentWillMount')
        /* document.addEventListener('keydown',this.handleKeyDown.bind(this)) */
    }
    componentDidMount() {
        const el = document.querySelector(`.${this.uid}`);
        if (el) {
            el.addEventListener('keydown',this.handleKeyDown.bind(this));
        }
        this.controlsLen = this.props.controls.length;
        this.consoleLog('hlFormContainer-componentDidMount');
    }
    componentWillReceiveProps(nextProps: IProFormProps) {
        const store = this.props.store.HLFormContainer.get(this.uid)
        if (store.elementList.size !== store.nodeCount || store.elementList.size !== store.computedAllElementList.length) {
            store.nodeCount = store.elementList.size;
            this.props.store.clearAllElement(this.uid)
        }
        if (this.props.controls !== nextProps.controls) {
            this.setFormItemStateDisabled({
                props: this.props,nextProps
            })
            this.storeView.controls = nextProps.controls;
            if (this.storeLocalView.dragSortState) {
                this.storeLocalView.updateControlsSort(nextProps.controls.map(item => item.iAntdProps.name));
            }
            if (this.props['uniqueUid']) {
                this.initSelectView(false,nextProps.controls);
            }
        }
        if (nextProps.size !== this.props.size) {
            this.storeView.updateStyleSize(nextProps.size);
        }
        if (this.props.group !== nextProps.group) {
            this.initGroup(nextProps.group);
        }
        this.consoleLog('hlFormContainer-componentWillReceiveProps');
    }
    componentWillUnmount() {
        this.props.store.delete(this.uid);
        const el = document.querySelector(`.${this.uid}`);
        if (el) {
            el.removeEventListener('keydown',this.handleKeyDown.bind(this))
        }
        this.consoleLog('hlFormContainer-componentWillUnmount');
        /* document.removeEventListener('keydown',this.handleKeyDown.bind(this)) */
    }

    initFromState() {
        if (this.props.controls && Array.isArray(this.props.controls)) {
            this.props.controls.map((item) => {
                const wc = COMPONENT_TYPE.find((cc) => item['hasOwnProperty'](cc))
                let defaultValue:IFormState = null;
                if (wc) {
                    const wItem = item[wc]
                    if (wItem['hasOwnProperty']('defaultVisible')) {
                        defaultValue={visible:wItem['defaultVisible']}
                    }
                }
                this.storeView.initFormState(item.iAntdProps.name,defaultValue)
            })
        }
    }

    /**
     * 初始化下拉框数据
     *
     * @param {boolean} [isDispatch=true]
     * @param {*} [controls=this.props.controls]
     * @memberof HLForm
     */
    initSelectView(isDispatch: boolean = true,controls = this.props.controls) {
        if (controls && Array.isArray(this.props.controls)) {
            controls.map((item) => {
                if (item instanceof LabelWithHLSelectModel && item.iFormWithSelect && item.iFormWithSelect.autoQuery)
                    runInAction(() => {
                        if (this.storeLocalView && item.iAntdProps) {
                            const pageSize = item.iFormWithSelect.pageSize || 30;
                            const keywords = item.iFormWithSelect.autoQuery.params(1,pageSize,'').defaultKeyWords;
                            if (!this.storeLocalView.selectView.has(item.iAntdProps.name)) {
                                this.storeLocalView.initSelectView(item.iAntdProps.name,item.iFormWithSelect.autoQuery,{
                                    paging: item.iFormWithSelect.paging === void 0 ? false : item.iFormWithSelect.paging,
                                    remote: item.iFormWithSelect.remote === void 0 ? false : item.iFormWithSelect.remote,
                                    pageSize: pageSize,
                                    tableNameDb: `${this.freezeUid}`,
                                    keywords: item.iFormWithSelect.autoQuery.params(1,item.iFormWithSelect.pageSize || 30,'').defaultKeyWords
                                })
                            }
                            if (item.iFormWithSelect.autoQuery) {
                                if (!this.storeLocalView.selectOptions.has(item.iAntdProps.name)) {
                                    this.storeLocalView.initSelectOptions(item.iAntdProps.name,item.iFormWithSelect.autoQuery);
                                }
                                if (isDispatch) {
                                    this.storeLocalView.dispatchRequest(item.iAntdProps.name,item.iFormWithSelect.autoQuery,{
                                        pageIndex: 1,
                                        pageSize,
                                        keyWords: keywords,
                                    });
                                }
                            }
                        }
                    })
            })
        }
    }
    onSelectSearch(name: string,options: {
        pageIndex: number;
        pageSize?: number;
        keywords?: string;
    } & Object) {
        if (this.storeLocalView && this.storeLocalView.selectView.has(name)) {
            const item = this.storeLocalView.selectView.get(name)
            this.storeLocalView.dispatchRequest(name,item.autoQuery,{
                pageIndex: options.pageIndex,
                pageSize: item.pageSize,
                keyWords: options.keywords,
                ...options,
            });
        }
    }
    /** 设置表单选项禁用和启用值 */
    setFormItemStateDisabled(options: {
        props: IProFormProps<mapProps>,nextProps?: IProFormProps<mapProps>
    }) {
        const nextProps = options.nextProps;
        const props = options.props || this.props;
        if (nextProps) {
            nextProps.controls.map((item) => {
                const entity = props.controls.find((w) => w.iAntdProps.name === item.iAntdProps.name)
                if (entity) {
                    COMPONENT_TYPE.map((c) => {
                        if (c === 'iFormWithRadioButton') {
                            const propsDisabled = get(entity,`${c}.radioGroup.disabled`);
                            const nextPropsDisabled = get(item,`${c}.radioGroup.disabled`);
                            if (propsDisabled !== void 0 && nextPropsDisabled !== void 0 && propsDisabled !== nextPropsDisabled) {
                                this.storeView.setFormState(item.iAntdProps.name,{ disabled: nextPropsDisabled })
                            }
                        } else {
                            const propsDisabled = get(entity,`${c}.disabled`);
                            const nextPropsDisabled = get(item,`${c}.disabled`);
                            if (propsDisabled !== void 0 && nextPropsDisabled !== void 0&& propsDisabled !== nextPropsDisabled) {
                                this.storeView.setFormState(item.iAntdProps.name,{ disabled: nextPropsDisabled })
                            }
                        }
                    })
                }
            })
        }
        else {
            props.controls.map((item) => {
                COMPONENT_TYPE.map((c) => {
                    if (c === 'iFormWithRadioButton') {
                        const propsDisabled = get(item,`${c}.radioGroup.disabled`);
                        if (propsDisabled !== void 0) {
                            this.storeView.setFormState(item.iAntdProps.name,{ disabled: propsDisabled })
                        }
                    } else {
                        const propsDisabled = get(item,`${c}.disabled`);
                        if (propsDisabled !== void 0) {
                            this.storeView.setFormState(item.iAntdProps.name,{ disabled: propsDisabled })
                        }
                    }
                })
            })
        }
    }
    queryElementItem(ElementKey: string): IElementList & { keys: string } {
        if (this.storeView) {
            const keys = this.storeView.elementList.keys()
            let entitys: IElementList & { keys: string } = null
             //@ts-ignore
            keys.map((item) => {
                const entity = this.storeView.elementList.get(item)
                if (entity && entity.elementKey === ElementKey) {
                    entitys = { ...entity,keys: item }
                }
            })
            return entitys
        }
        return null
    }

    /**
     * 跨表单跳转
     *
     * @param {{ formUid: string;nextElementKey:string}} elementItem
     * @returns {(IElementList & {keys:string})}
     * @memberof HLForm
     */
    queryFormElementItem(elementItem: { formUid: string; nextElementKey: string }): IElementList & { keys: string,viewStore: IViewModelHlFormStore } {
        const viewStore = this.props.store.HLFormContainer.get(elementItem.formUid)
        if (viewStore) {
            const keys: string[] = []
            for (let item of viewStore.elementList.keys()) {
                keys.push(item);
            }
            let entitys: IElementList & { keys: string,viewStore: IViewModelHlFormStore } = null
            keys.map((item) => {
                const entity = viewStore.elementList.get(item)
                if (entity && entity.elementKey === elementItem.nextElementKey) {
                    entitys = { ...entity,keys: item,viewStore }
                }
            })
            return entitys
        }
        return null
    }
    //@ts-ignore
    handleKeyDown(e) {
        let formStore = this.props.store.get(this.uid)
        const { keyCode } = e;
        if (formStore && formStore.enableEnterSwitch) {
            /* e.stopPropagation() */
            const keys = formStore.elementList.keys()
             //@ts-ignore
            if (keys.length > 0 && !formStore.focusUid) {
                formStore.focusUid = keys[0];
            }
            if (keyCode === KeydownEnum.next || keyCode === KeydownEnum.enter) {
                 //@ts-ignore
                for (let i = 0; i < keys.length; i++) {
                     //@ts-ignore
                    let index = keys.findIndex((item) => item === formStore.focusUid)
                    if (index > -1) {
                        let currUid = keys[index]
                        let nextIndex = index + 1
                        let nextUid = keys[nextIndex]
                        const currElement = formStore.elementList.get(currUid)
                        if (currElement.nextElementKey) {
                            if (typeof currElement.nextElementKey === 'string') {
                                const nextElementItem = this.queryElementItem(currElement.nextElementKey)
                                if (nextElementItem) {
                                    nextUid = nextElementItem.keys
                                }
                            }
                            if (typeof currElement.nextElementKey === 'object') {
                                const nextElementItem = this.queryFormElementItem(currElement.nextElementKey)
                                if (nextElementItem) {
                                    nextUid = nextElementItem.keys
                                    formStore = nextElementItem.viewStore
                                }
                            }

                        }
                        else {
                             //@ts-ignore
                            if (nextIndex >= keys.length) {/**  当到达最后一个元素时，再次回车将回到第一个元素的焦点*/
                                nextIndex = 0
                                nextUid = keys[nextIndex]
                            }
                        }

                        let el = formStore.elementList.get(nextUid)
                        if (el) {
                            const result = el.element instanceof HTMLCollection
                            if (result && el.element.length) {
                                const selectDom = document.querySelector(`.${currUid}`);
                                if (selectDom) {
                                    const selectSelectionDom = selectDom.getElementsByClassName('ant-select-open')
                                    if (selectSelectionDom && selectSelectionDom.length) { // 当下拉框展开选项数据时，不拦截默认下拉回车选中行为 不跳转下一个元素
                                        e.preventDefault()
                                        return false
                                    }
                                }

                                if (el.elementTabindex && el.elementTabindex instanceof HTMLCollection && el.elementTabindex.length) {
                                    // @ts-ignore
                                    el.elementTabindex[0].focus && el.elementTabindex[0].focus() //主要用于解决select 框 聚焦后边框线无法高亮
                                }
                                /* const timeid= setTimeout(() => {
                                    el.element[0].focus && el.element[0].focus()
                                    formStore.focusUid = nextUid; // 与钩子列表组件自带回车事件错开任务队列执行
                                    clearTimeout(timeid)
                                }) */
                                const timeid = setTimeout(() => {  // 定时器主要解决文本框上键无法全选文字问题 createTextRange
                                    el.element[0].select()
                                    clearTimeout(timeid)
                                })
                                el.element[0].focus && el.element[0].focus()
                                formStore.focusUid = nextUid; // 与钩子列表组件自带回车事件错开任务队列执行
                                return false
                            }
                        }

                    }
                }
            }
            if (keyCode === KeydownEnum.up) {
                 //@ts-ignore
                for (let i = 0; i < keys.length; i++) {
                     //@ts-ignore
                    let index = keys.findIndex((item) => item === formStore.focusUid)
                    if (index > -1) {
                        let preIndex = index - 1
                        let nextUid = keys[preIndex]
                        if (preIndex < 0) {/**  当到达第一个一个元素时，再次按上键将回到最后一个元素的焦点*/
                             //@ts-ignore
                            preIndex = keys.length - 1
                            nextUid = keys[preIndex]
                        }
                        let el = formStore.elementList.get(nextUid)
                        if (el) {
                            const result = el.element instanceof HTMLCollection
                            if (result && el.element.length) {
                                const selectDom = document.querySelector(`.${formStore.focusUid}`);
                                if (selectDom) {
                                    const selectSelectionDom = selectDom.getElementsByClassName('ant-select-open')
                                    if (selectSelectionDom && selectSelectionDom.length) { // 当下拉框展开选项数据时，不拦截默认下拉回车选中行为,不跳转下一个元素
                                        e.preventDefault()
                                        return false
                                    }
                                }
                                if (el.elementTabindex && el.elementTabindex instanceof HTMLCollection && el.elementTabindex.length) {
                                    // @ts-ignore
                                    el.elementTabindex[0].focus && el.elementTabindex[0].focus() //主要用于解决select 框 聚焦后边框线无法高亮
                                }
                                const timeid = setTimeout(() => {  // 定时器主要解决文本框上键无法全选文字问题 createTextRange
                                    el.element[0].select()
                                    clearTimeout(timeid)
                                })
                                el.element[0].focus && el.element[0].focus()

                                formStore.focusUid = nextUid;
                                //@ts-ignore
                                return
                            }
                        }
                    }
                }
            }
        }
    }
    handleToggle(name,even) {
        let key = even.target.id || name;
        let group = this.state.groupEntity
        group.map((item) => {
            if (item.name === key) {
                item.isFolding = !item.isFolding
            }
        });
        this.setState({
            groupEntity: group
        })
    }
    getAbsPos(obj) {		//此方法不计算margin和border值，如果设置会报错

        let x = obj.offsetLeft;
        let y = obj.offsetTop;
        while (obj = obj.offsetParent) {
            x += obj.offsetLeft;
            y += obj.offsetTop;
        }
        return { "x": x,"y": y };
    }
    componentDidUpdate() {
        const el = document.querySelector(`.${this.uid}`);
        if (el && this.props.controls.length !== this.controlsLen) {
            /** 主要解决当key值发生变化时，导致组件卸载掉回车事件，重新绑定，否则回车会出现失效 
             * 如果在上层组件设置key 值，则需要重新设置回车值
            */
            this.controlsLen = this.props.controls.length
            el.removeEventListener('keydown',this.handleKeyDown.bind(this))
            el.addEventListener('keydown',this.handleKeyDown.bind(this))

        }
    }
    /**
     * 栏目快捷导航
     *
     * @memberof HLForm
     */
    handlePositioning(name: string) {
        let target = document.querySelector('div[data-tab=' + name + ']')
        let targetScroll = this.getAbsPos(target).y;
        window.scrollTo(0,targetScroll);
        let group = this.state.groupEntity
        group.map((item) => {
            if (item.name === name) {
                item.active = true
            } else {
                item.active = false
            }
        })
        this.setState({
            groupEntity: group,
            activeName: name
        })

    }
    isFormHasError(getFieldsError: () => any) {
        let error = getFieldsError && getFieldsError()
        let has = false
        for (let key in error) {
            if (error[key]) {
                has = true
                break;
            }
        }
        return has
    }
    renderControl(control: any,key: number | string): JSX.Element {
        const form = this.props.form;
        const hasError = this.isFormHasError(form.getFieldsError)
        const error = form.getFieldError(control.iAntdProps.id)
        const styleSize = this.storeView.styleSize;
        if (control.iAntdProps.className) {
            control.iAntdProps.className = control.iAntdProps.className.replace(size[styleSize]['formItemLayOut'],'')
        }

        COMPONENT_TYPE.map((item) => {
            if (control[item]) {
                control[item].size = styleSize
                if (item === 'iFormWithSelect' && control[item].options && control[item].options.length >= 50 && !control[item].paging) { // 当下拉数据超过50项自动开启分页
                    control[item].paging = true
                }
                /* 防止表单动态增加的字段在表单状态集合中不存在而报错 */
                if (this.storeView.computedFormState.has(control.iAntdProps.name)) { // 判断表单字段是否在表单状态数据集合中存在
                    if (item === 'iFormWithRadioButton' && control.iFormWithRadioButton['radioGroup']) {
                        control.iFormWithRadioButton['radioGroup']['disabled'] = this.storeView.computedFormState.get(control.iAntdProps.name).disabled
                    } else {
                        control[item]['disabled'] = this.storeView.computedFormState.get(control.iAntdProps.name).disabled
                    }
                }
            }
        })
        if (control.iAntdProps.className) {
            control.iAntdProps.className = control.iAntdProps.className && control.iAntdProps.className.replace(size['table'].formItemLayOut,'').replace('table-error','').replace('table-not-error','').replace('hlform-table-row-height','')
            control.iAntdProps.className = control.iAntdProps.className && control.iAntdProps.className.replace(size['small'].formItemLayOut,'').replace('hlform-table-row-height','')
            control.iAntdProps.className = control.iAntdProps.className && control.iAntdProps.className.replace(size['default'].formItemLayOut,'').replace('form-item-default-error','')
        }
        if (styleSize === 'table') {
            control.iAntdProps.className = `${control.iAntdProps.className || ''} ${size[styleSize].formItemLayOut} ${error ? 'table-error' : 'table-not-error'} hlform-table-row-height` /**  表单间距调小*/
            COMPONENT_TYPE.map((item) => {
                if (control[item]) {
                    control[item].size = 'small'
                }
            })
        }
        else if (styleSize === 'small') {
            control.iAntdProps.className = `${control.iAntdProps.className || ''} ${size[styleSize].formItemLayOut} hlform-table-row-height`
        }
        else {
            control.iAntdProps.className = `${control.iAntdProps.className || ''} ${size[styleSize].formItemLayOut} ${hasError ? '' : size[styleSize].formItemLayOut} ${error ? 'form-item-default-error' : ''}` /**  表单间距调小*/
        }
        const view = this.props.store.HLFormContainer.get(this.uid)
        const localview = this.props.store.HLFormLocalDataContainer.get(this.freezeUid)
        let viewModel: InstanceForm = {
            store: this.props.store,
            uid: this.uid,
            viewModel: view,
            localViewModel: localview,
            freezeUid: this.freezeUid,
            decryptionFreezeUid: this.decryptionFreezeUid
        }
        if (this.props.onIgnoreError) {
            viewModel = {
                store: this.props.store,
                uid: this.uid,
                viewModel: view,
                localViewModel: localview,
                freezeUid: this.freezeUid,
                decryptionFreezeUid: this.decryptionFreezeUid,
                onIgnoreError: this.props.onIgnoreError
            }
        }
        if (control instanceof LabelWithInputModel) {
            return super.createFormInput(key,control,form,this.uid,viewModel);
        }
        else if (control instanceof LabelWithInputNumberModel) {
            return super.createFormInputNumber(key,control,form,this.uid,viewModel);
        }
        else if (control instanceof LabelWithSelectModel || control instanceof LabelWithHLSelectModel) {
            if (control instanceof LabelWithHLSelectModel && control.iFormWithSelect.autoQuery) {
                const view = localview.selectView.get(control.iAntdProps.name)
                if (view && view.currValue) {
                    let options = []
                    let total = 0;
                    //@ts-ignore
                    if (view.currValue.data.get(view.pageIndex.toString())) {
                         //@ts-ignore
                        options = view.currValue.data.get(view.pageIndex.toString())
                        total = view.currValue.total;
                    }
                    control.iFormWithSelect.options = options;
                    control.iFormWithSelect.total = total
                }
            }
            return super.createFormSelect(key,control,form,this.uid,viewModel);
        }
        else if (control instanceof LabelWithRenderModel) {

            return super.createFormRender(key,control,form,viewModel);
        }
        else if (control instanceof LabelWithDatePickerModel) {
            return super.createFormDatePicker(key,control,form,this.uid,viewModel);
        }
        else if (control instanceof LabelWithMonthPickerModel) {
            return super.createFormMonthPicker(key,control,form,this.uid,viewModel);
        }
        else if (control instanceof LabelWithRangePickerModel) {
            return super.createFormRangePicker(key,control,form,this.uid,viewModel);
        }
        else if (control instanceof LabelWithUploadModel) {
            return super.createFormUpload(key,control,form,this.uid,viewModel);
        }
        else if (control instanceof LabelWithSwitchModel) {
            return super.createFormSwitch(key,control,form,this.uid,viewModel)
        }
        else if (control instanceof LabelWithRadioButtonModel) {
            return super.createFormRadioButton(key,control,form,this.uid,viewModel)
        }
        else if (control instanceof LabelWithTextModel) {
            return super.createFormText(key,control,form,this.uid,viewModel)
        }
        else if (control instanceof LabelWithCheckboxModel) {
            return super.createFormCheckbox(key,control,form,this.uid,viewModel)
        }
        else {
            throw new Error(`ComponentClass: Unknown control. control = ${JSON.stringify(control)}`);
        }
    }
    renderControls(controls: Array<any>) {
        let colCount = this.props.colCount || 2;
        const form = this.props.form;
        let newcontrols = controls;
        if (this.storeLocalView.computedControlsSort.length) {
            newcontrols = [];
            this.storeLocalView.computedControlsSort.map((item) => {
                const model = controls.find((m) => m.iAntdProps.name === item);
                if (model) {
                    newcontrols.push(model);
                }
            })
        }
        const rendercontrols = newcontrols.map((controls: any,key: number) => {
            let span = controls.iAntdProps.span || (24 / colCount)
            const name = controls.iAntdProps.name
            const keys = `col${name}`
            const formItemState = this.getFormItemState(name);
            let visible: Boolean = true;
            let display = true;
            if (formItemState) {
                if (formItemState.visible === false) {
                    visible = formItemState.visible
                }
                if (formItemState.display === false) {
                    display = false
                }
            }
            return (
                (visible) ? <Col span={span} data-id={name} key={`col${keys}`} style={{ display: `${display ? 'block' : 'none'}` }}>
                    {this.renderControl(controls,`col${keys}`)}
                </Col> : null
            );
        })
        return (this.storeLocalView.dragSortState ? <LegionsProDragger
            options={{
                animation: 150,
                group: {
                    name: 'query',
                    pull: true,
                    put: true,
                }
            }}
            style={{ width: '100%',display: 'contents' }}
            onChange={(items: string[],sort,evt) => {
                this.storeLocalView.updateControlsSort(items);
            }}
        >
            {
                rendercontrols
            }
        </LegionsProDragger> : rendercontrols)
    }
    renderGroup() {
        const group = this.props.group;
        const controls = this.props.controls;
    /* const controls = this.storeView.controls; */
        //@ts-ignore
        const groupComponent = group.map((item,index) => {
            let groupFormItem = controls.filter((entity) => entity.iAntdProps.groupId === item.id);
            if (groupFormItem && groupFormItem.length) {
                let entity = this.state.groupEntity.find((entity) => entity.name === item.name)
                return (<Row className={!entity.isFolding ? "group toggle" : "group"}
                    key={index}>
                    <div className={`title ${item.className || ''}`} data-id="form-floor" data-tab={item.name}>
                        <span className="span-left" >{item.name}</span>
                        <span className="span-right" >
                            {entity.isShowSizeIcon && <Dropdown overlay={(
                                <Menu selectedKeys={[this.storeView.styleSize]} onClick={(item) => {
                                    const size = item.key as IProFormProps['size']
                                    this.storeView.updateStyleSize(size)
                                    this.props.onUpdateStyleSize && this.props.onUpdateStyleSize(size)
                                }}>
                                    <Menu.Item key="default">
                                        <span>舒适型</span>
                                    </Menu.Item>
                                    <Menu.Item key="small">
                                        <span>迷你型</span>
                                    </Menu.Item>
                                    <Menu.Item key="table">
                                        <span>紧凑型</span>
                                    </Menu.Item>
                                </Menu>
                            )} placement="bottomCenter">
                                <Icon style={{ fontSize: '16px' }} type="bars" />
                            </Dropdown>}
                            {!entity.isFolding ? <Icon type="plus" style={{ fontSize: '16px' }} onClick={this.handleToggle.bind(this,item.name)} /> : <Icon type="minus" style={{ fontSize: '17px' }} onClick={this.handleToggle.bind(this,item.name)} />}
                        </span>
                    </div>
                    <div className={!entity.isFolding ? "form-content hide" : "form-content"}>
                        <Row type="flex"  >{this.renderControls(groupFormItem)}</Row>
                    </div>
                </Row>)
            }
        })
        return (
            <Row className="container">
                <div className="left" style={{ width: `${this.state.groupEntity.length > 5 ? 87 : 100}%` }}>
                    {groupComponent}
                </div>
                {this.state.groupEntity.length > 6 && <div className="right">
                    <Affix>
                        <ul>
                            {

                                this.state.groupEntity.map((entity,index) => {
                                    if (entity.active) {
                                        return <li key={index}>{entity.active && <img src={'https://gitee.com/duanguang/figure-bed/raw/master/oss/u586.png'} />}
                                            <span
                                                style={{ paddingLeft: `10px`,color: `rgb(39, 140, 222)` }}
                                                onClick={this.handlePositioning.bind(this,entity.name)}
                                            >{entity.name}</span></li>
                                    }
                                    return <li key={index}><span
                                        style={{ paddingLeft: `20px` }}
                                        onClick={this.handlePositioning.bind(this,entity.name)}
                                    >{entity.name}</span></li>
                                })

                            }
                        </ul>
                    </Affix>
                </div>}

            </Row>
        )
    }
    renderForm() {
        const group = this.props.group;
        const controls = this.props.controls;
        if (group && group instanceof Array && group.length) {
            return this.renderGroup()
        }
        return <Row type="flex">
            {this.renderControls(controls)}
        </Row>;
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form className={`${baseCls} ${this.uid}`} /* key={this.props.controls.length} */>
                {this.renderForm()}
            </Form>
        )
    }
}
const debounceOnFieldsChange = debounce((props,changedFields) => {
    props.onFieldsChange && props.onFieldsChange(props,changedFields)
},200)
const CustomizedForm = Form.create({
    mapPropsToFields: (props: IProFormProps) => {
        return props.mapPropsToFields(props)
    },
    onFieldsChange: (props: IProFormProps,changedFields) => {
        return props.onFieldsChange(props,changedFields);
        /* return debounceOnFieldsChange(props,changedFields) */
    },
    onValuesChange(props: IProFormProps,values) {
        props.onValuesChange && props.onValuesChange(props,values)
    }
})(HLForm);
/* export const HLFormContainer = (props: IHLFormProps) => {
    return <CustomizedForm {...props} />
} */
export function LegionsProForm<mapProps = {}>(props: IProFormProps<mapProps>) {
    return <CustomizedForm {...props} />
}
LegionsProForm.CreateForm = CreateForm
LegionsProForm.ProFormUtils = ProFormUtils;
LegionsProForm.LabelWithInputNumberModel = LabelWithInputNumberModel;
LegionsProForm.LabelWithSelectModel = LabelWithSelectModel;
LegionsProForm.LabelWithHLSelectModel = LabelWithHLSelectModel;
LegionsProForm.LabelWithRenderModel = LabelWithRenderModel;
LegionsProForm.LabelWithDatePickerModel = LabelWithDatePickerModel;
LegionsProForm.LabelWithMonthPickerModel = LabelWithMonthPickerModel;
LegionsProForm.LabelWithRangePickerModel = LabelWithRangePickerModel;
LegionsProForm.LabelWithUploadModel = LabelWithUploadModel;
LegionsProForm.LabelWithSwitchModel = LabelWithSwitchModel;
LegionsProForm.LabelWithRadioButtonModel = LabelWithRadioButtonModel;
LegionsProForm.LabelWithTextModel = LabelWithTextModel;
LegionsProForm.LabelWithInputModel = LabelWithInputModel;
LegionsProForm.BaseFormFields = BaseFormFields
LegionsProForm.ProFormFields = ProFormFields

/* @bind({ store: HLFormStore })
@observer
export class HLFormContainer<mapProps = {}> extends React.Component<IHLFormProps<mapProps>>{
    timer = null
    timeId = new Date().getTime()
    uid = ''
    constructor(props) {
        super(props)
        this.uid = `form${this.props.store.HLFormContainer.size}${shortHash(`${this.timeId}${this.props.store.HLFormContainer.size}`)}`
    }
    @computed get storeView() {
        return this.props.store.HLFormContainer.get(this.uid)
    }
    render() {
        const formEntity = { uid: this.uid }
        let InputDataModel = {}
        if (this.storeView&&this.storeView.InputDataModel) {
            InputDataModel = this.storeView.InputDataModel
        }
        return <CustomizedForm {...this.props} {...formEntity} />
    }
} */


