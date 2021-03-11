import React from 'react'
import { Row } from 'antd';
import { WrappedFormUtils, IAntdFormItemProps, IAntdRule } from '../interface/antd';
/* import AbstractForm from './AbstractForm'; */
import { shortHash } from 'legions-lunar/object-hash';
import { bind,observer } from 'legions/store-react';
import { findDOMNode } from 'react-dom';
import { InstanceFormElement } from './interface/formElement';
import { inject } from 'legions/store';
import LegionsStoreForm from '../LegionsStoreForm';
import { LabelWithSelectModel } from './interface/select';
export interface IFormElementProps{
    form: WrappedFormUtils;
    elementKey: string;
    /**
     * 表单生成的唯一uid，做回车切换时，可以把需要进行切换的组件都存储到此表单UID的HASH列表中，回车切换时会在hash列表中找寻组件
     *
     * @type {string}
     * @memberof IFormWithInputProps
     */
    formUid:string;
    store?:InstanceType<typeof LegionsStoreForm>;

    /**
     * 组件类型
     *
     * @type {('input'|'textarea'|'button')}
     * @memberof IFormElementProps
     */
    elType?:'input'|'textarea'|'button'|'span'|'',

    /**
     * 此方法会抛回组件一些关键信息到上层组件
     *
     * @memberof IFormElementProps
     */
    onReady?: (instance: InstanceFormElement) => void
    
    /**
     * 回车，下键触发时指定一个元素聚焦,如果不填写，默认就是下一个
     *
     * @type {string}
     * @memberof IFormElementProps
     */
    nextElementKey?: string | { formUid: string;nextElementKey:string};
}
enum KeydownEnum{

    /**
     * 键盘向上键
     */
    up=38,


    /** 
     * 键盘向下键
     */
    next=40,


    /**
     * 回车键
     */
    enter=13,
}
const selectionSingleClass = 'ant-select-selection--single';
const selectionMultipleClass = 'ant-select-selection--multiple';
/**
 * 如果元素需要回车，或者上下键切换焦点，则一定要用此组件包裹
 *
 * @export
 * @class FormElement
 * @extends {AbstractForm<IFormElementProps>}
 */
@bind({store:LegionsStoreForm})
@observer
export default class FormElement extends React.Component<IFormElementProps,{}>{
    static defaultProps ={
        elType: 'input',
        nextElementKey:'',
    }
   
    timeId = new Date().getTime()
    uid = ''
    constructor(props) {
        super(props)
        this.uid=`element${this.props.elementKey}${shortHash(this.timeId)}`
    }
    /**  注册元素键盘行为代理事件*/
    onLoadingKeyDown:Function = null

    /**  处理重复注册代理事件行为，已经注册过的代理事件,不重复注册*/
    onkeyDownProxy = () => {
        let isLoaded = false;
        return () => {
            if (!isLoaded&&this.formStore&&this.formStore.enableEnterSwitch) {
                const selectSelectionDom = this.querySelectDom()
                if (selectSelectionDom) {
                    selectSelectionDom.addEventListener('keydown',this.onKeyDownSelect.bind(this))
                }
                const selectSelectionMultipleDom = this.querySelectDom(selectionMultipleClass)
                if (selectSelectionMultipleDom) {
                    selectSelectionMultipleDom.addEventListener('keydown',this.onkeyDownSelelctMultiple.bind(this))
                }   
                isLoaded = true
            }
        }
    }
    componentWillMount(){
        this.props.onReady&&this.props.onReady({store:this.props.store,uid:this.uid})
    }
    get formStore() {
       return this.props.store.get(this.props.formUid)
    }
    /**
     *
     *  查询下拉单选dom
     * @returns
     * @memberof FormElement
     */
    querySelectDom(type:'ant-select-selection--single'|'ant-select-selection--multiple'=selectionSingleClass) {
        const selectDom = document.querySelector(`.${this.uid}`);
        if (selectDom) {
            const selectSelectionDom = selectDom.getElementsByClassName(type)
            if (selectSelectionDom&&selectSelectionDom.length) {
                return selectSelectionDom[0]
            }
            return null
        }
        return null
    }
    componentDidMount(){
        this.addElement() 
        /**  只对下拉框键盘事件进行代理*/
        if (this.querySelectDom(selectionMultipleClass) || this.querySelectDom()) {
            if (!this.onLoadingKeyDown) {
                this.onLoadingKeyDown = this.onkeyDownProxy();
            }           
            this.onLoadingKeyDown()
        }
    }
    componentDidUpdate() {
        this.addElement()
        /**  只对下拉框键盘事件进行代理*/
        if (this.querySelectDom(selectionMultipleClass) || this.querySelectDom()) {
            this.onLoadingKeyDown()
        }
    }
    componentWillUnmount(){
        const formStore= this.props.store.get(this.props.formUid)
        if(formStore){
            formStore._elementList.delete(this.uid)
        }
        const selectSelectionDom = this.querySelectDom()
        if (selectSelectionDom) {
            selectSelectionDom.removeEventListener('keydown',this.onKeyDownSelect.bind(this))
        }

        const selectSelectionMultipleDom = this.querySelectDom(selectionMultipleClass)
        if (selectSelectionMultipleDom) {
            selectSelectionMultipleDom.removeEventListener('keydown',this.onkeyDownSelelctMultiple.bind(this))
        }
    }
    onkeyDownSelelctMultiple(even) {
        const { keyCode } = even;
        if (keyCode === 40) { // 下键
            const selectDom = document.querySelector(`.${this.uid}`);
            if (selectDom) {
                const selectSelectionDom = selectDom.getElementsByClassName('ant-select-open')
                let controlsOptiosn = []
                if (this.formStore) {
                    const controls = this.formStore.computedFormFields.find((item) => item.iAntdProps.name === this.props.elementKey)
                    if (controls && controls instanceof LabelWithSelectModel) {
                        controlsOptiosn = controls.iFormProps.options||[]
                    }
                }
                if (selectSelectionDom && selectSelectionDom.length<=0) { // 当下拉框展开选项数据时，不拦截默认下拉回车选中行为
                    even.stopPropagation()
                    even.preventDefault() // 当下拉选项没有展开时，回车直接跳转下一个组件
                    this.props.store.nextElement(this.uid,this.props.formUid)
                }
                else {
                    even.preventDefault()
                }
            }
        }
    }
    /**
     *  下拉单选 键盘事件拦截
     *
     * @param {*} even
     * @memberof FormElement
     */
    onKeyDownSelect(even){
        const { keyCode } = even;
        if (keyCode === 13) { // 回车键
            const selectDom = document.querySelector(`.${this.uid}`);
            if (selectDom) {
                const selectSelectionDom = selectDom.getElementsByClassName('ant-select-open')
                let controlsOptiosn = []
                if (this.formStore) {
                    const controls = this.formStore.computedFormFields.find((item) => item.iAntdProps.name === this.props.elementKey)
                    if (controls && controls instanceof LabelWithSelectModel) {
                        controlsOptiosn = controls.iFormProps.options||[]
                    }
                }
                if (selectSelectionDom && selectSelectionDom.length) { // 当下拉框展开选项数据时，不拦截默认下拉回车选中行为，回车选中数据
                    even.preventDefault()
                    setTimeout(() => {
                        this.props.store.nextElement(this.uid,this.props.formUid)
                    },100)
                }
                else {
                    even.stopPropagation()
                    even.preventDefault() // 当下拉选项没有展开时，回车直接跳转下一个组件
                    this.props.store.nextElement(this.uid,this.props.formUid)
                }
            }         
        }
        if (keyCode === 40) { // 下键
            const selectDom = document.querySelector(`.${this.uid}`);
            if (selectDom) {
                const selectSelectionDom = selectDom.getElementsByClassName('ant-select-open')
                if (selectSelectionDom && selectSelectionDom.length<=0) { // 当下拉框展开选项数据时，不拦截默认下拉回车选中行为
                    even.stopPropagation()
                    even.preventDefault() // 当下拉选项没有展开时，回车直接跳转下一个组件
                    this.props.store.nextElement(this.uid,this.props.formUid)
                }
                else {
                    even.preventDefault()
                }
            }     
        }
    }
    addElement(){
        const formStore = this.props.store.get(this.props.formUid)
        if(formStore){
            formStore._addAllElementKeys(this.props.elementKey)
            if (!formStore._elementList.has(this.uid)) {
                const el = document.querySelector(`.${this.uid}`);
                if (el&&this.props.elType) {
                    const elChildren = el.getElementsByTagName(this.props.elType)
                    let elementTabindex =null
                    const antSSelectSelection = el.getElementsByClassName(selectionSingleClass)
                    if (antSSelectSelection && antSSelectSelection instanceof HTMLCollection && antSSelectSelection.length) {
                        if (findDOMNode(antSSelectSelection[0]).getAttribute('tabindex') !== null) { // 如果下拉列表自身设置了获取焦点方法，则抓取元素用于获取焦点
                            // @ts-ignore
                            elementTabindex = antSSelectSelection
                        }
                    }
                    // @ts-ignore
                    if(elChildren&&el&&elChildren instanceof HTMLCollection&&elChildren.length&&!elChildren[0].disabled){
                        formStore._elementList.set(this.uid,{
                            elementKey: this.props.elementKey,
                            elementTabindex:elementTabindex,
                            element: elChildren,
                            nextElementKey:this.props.nextElementKey
                        })
                    }
                }
            }
        }
    }
    render() {
        const { form, elementKey,children} = this.props;
        /* const { getFieldDecorator,getFieldsError } = form; */
        return (
            <Row  className={this.uid}>{children}</Row>
        )
    }
}