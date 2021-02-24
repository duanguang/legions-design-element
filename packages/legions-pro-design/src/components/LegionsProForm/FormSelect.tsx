import React from 'react';
import { Form,Select,message } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const OptGroup = Select.OptGroup;

import { IProSelectProps,LabeledValue } from '../LegionsProSelect/interface';
import LegionsProSelect from '../LegionsProSelect'
import AbstractForm from './AbstractForm';
import FormElement from './FormElement';
import {InstanceFormElement} from './interface/formElement'
import LegionsProErrorReportShow from '../LegionsProErrorReportShow'
import { on,off } from 'legions-utils-tool/dom'
import { legionsThirdpartyPlugin } from 'legions-thirdparty-plugin';
import { IFormSelectProps, IFormSelectWrapError, IFormWithSelectProps } from './interface/select';







export class HLSelectWrapError extends React.Component<IFormSelectProps & IProSelectProps & IFormSelectWrapError> {

    render() {
        const { formItemName,formHLSelectRef,formUid,...props } = this.props;
        let isShowErrorView = false;
        if (formHLSelectRef && this.props.formUid) {
            const viewStore = formHLSelectRef.store.get(this.props.formUid)
            if (viewStore.computedErrorReactNodeList.has(this.props.formItemName)) {
                const uid = viewStore.computedErrorReactNodeList.get(this.props.formItemName).uid
                isShowErrorView = viewStore.errorListView.has(uid)
            }
        }
        return (
            <LegionsProErrorReportShow
                formUid={this.props.formUid}
                code={this.props.formItemName}
                errorClassName={'tip-icon'}
                onIgnoreError={this.props.onIgnoreError}
                className={isShowErrorView ? 'errorView' : ''}
            >
                <LegionsProSelect
                    style={{ width: '100%' }}
                    placeholder={this.props.placeholder}
                    {...props}
                >
                </LegionsProSelect>
            </LegionsProErrorReportShow>
        );
    }
}
interface IState {
    open?: boolean,
    /**
     *
     * 获得焦点时的样式名称
     * 
     * 只在默认下拉框生效
     * 
     * 排除mode: 'multiple' | 'tags' | 'combobox'
     * @type {string}
     * @memberof IState
     */
    styleClassFocus?: string;
}
export default class FormSelect extends AbstractForm<IFormWithSelectProps,IState>{
    FormHLSelectRef: InstanceFormElement = null
    constructor(props) {
        super(props)
        this.state = {
            open: this.props.iFormWithSelect.open || false,
        }
    }

    translabelInValue(value,options = this.props.iFormWithSelect.options): LabeledValue[] | LabeledValue {
        return LegionsProSelect.transformlabelInValue(value,
            //@ts-ignore
            this.props.iFormWithSelect,
            options)
    }
    componentDidMount() {
        this.bindCopyKeydown()
        this.didMountClearNodeQueue(this.FormHLSelectRef,this.props.formUid,this.props.iAntdProps.name)
    }
    componentWillUnmount() {
        const el = document.querySelector(`.${this.FormHLSelectRef.uid}`);
        if (el) {
            const selectDom = el.querySelector(`.ant-select-selection--single`)
            if (selectDom) {
                off(selectDom,'keydown',this.handleCopyKeydown.bind(this));
            }
        }
    }
    bindCopyKeydown() {
        const el = document.querySelector(`.${this.FormHLSelectRef.uid}`);
        if (el) {
            const selectDom = el.querySelector(`.ant-select-selection--single`)
            if (selectDom) {
                on(selectDom,'keydown',this.handleCopyKeydown.bind(this));
            }
        }
    }
    handleCopyKeydown(event) {
        if (event.keyCode == 67 && this.state.styleClassFocus) {
            const value = this.props.form.getFieldValue(this.props.iAntdProps.name)
            const values = this.translabelInValue(value,this.props.iFormWithSelect.options)
            if (!Array.isArray(values) && values && values['label']) {
                if (!legionsThirdpartyPlugin.plugins.clipboard) {
                    message.warning('Plugin is not ready to clipboard')
                } else {
                    legionsThirdpartyPlugin.plugins.clipboard.copyText(values['label'] as string).then((res) => {
                        const el = document.querySelector(`.${this.FormHLSelectRef.uid}`);
                        if (el) {
                            const selectDom = el.querySelector(`.ant-select-selection--single`)
                            if (selectDom) {
                                // @ts-ignore
                                selectDom.focus && selectDom.focus()
                            }
                        }
                    })
                }
            }
        }
    }
    onFocus() {
        const store = this.FormHLSelectRef.store.get(this.props.formUid)
        if (store) {
            store.focusUid = this.FormHLSelectRef.uid
            if (store.enableEnterSwitch && (this.props.iFormWithSelect.mode === 'default' || this.props.iFormWithSelect.mode === void 0)) {
                this.setState({ styleClassFocus: 'legions-pro-select-focus' })
            }
        }
        const el = document.querySelector(`.${this.FormHLSelectRef.uid}`);
        if (el && this.props.iFormWithSelect.mode === 'combobox') {  // 只能做到对combobox类型聚点，全选文字，下拉多选，tag及普通模式由于实现方式不同，所以暂时做不到
            const inputSelect = el.getElementsByTagName('input')
            if (inputSelect && inputSelect.length) {
                inputSelect[0].select()
            }
        }
        this.props.iFormWithSelect && this.props.iFormWithSelect.onFocus && this.props.iFormWithSelect.onFocus()
    }
    onBlur() {
        if (this.state.open) {
            this.setState({
                open: false
            })
        }
        if (this.state.styleClassFocus) {
            this.setState({ styleClassFocus: '' })
        }
        this.props.iFormWithSelect && this.props.iFormWithSelect.onBlur && this.props.iFormWithSelect.onBlur()
    }
    onSelect(value,option) {
        this.props.iFormWithSelect && this.props.iFormWithSelect.onSelect && this.props.iFormWithSelect.onSelect(value,option)
    }
    onSearch(value: string) {
        if (this.FormHLSelectRef && this.props.formUid) {
            const viewStore = this.FormHLSelectRef.store.get(this.props.formUid)
            const view = viewStore.computedErrorReactNodeList.get(this.props.iAntdProps.name)
            if (view && view.validateStatus !== '') {
                view.validateStatus = ''
            }
        }
        /** 启用了远程搜索才会在搜索输入触发时调用 */
        if (this.props.formStore && this.props.formStore.localViewModel && this.props.iFormWithSelect.remote) {
            const view = this.props.formStore.localViewModel.selectView.get(this.props.iAntdProps.name)
            if (view && view.autoQuery) {
                this.props.formStore.localViewModel.dispatchRequest(this.props.iAntdProps.name,view.autoQuery,{
                    pageIndex: 1,
                    pageSize: view.pageSize,
                    keyWords: value as string,
                })
            }
        }
        if (this.state.styleClassFocus) {
            this.setState({ styleClassFocus: '' })
        }
        this.props.iFormWithSelect && this.props.iFormWithSelect.onSearch && this.props.iFormWithSelect.onSearch(value)
    }
    onClear = () => {
        /** 启用了远程搜索才会在清除输入触发时调用搜索接口 */
        if (this.props.formStore && this.props.formStore.localViewModel && this.props.iFormWithSelect.remote) {
            const view = this.props.formStore.localViewModel.selectView.get(this.props.iAntdProps.name)
            if (view && view.autoQuery) {
                this.props.formStore.localViewModel.dispatchRequest(this.props.iAntdProps.name,view.autoQuery,{
                    pageIndex: 1,
                    pageSize: view.pageSize,
                    keyWords: '',
                })
            }
        }
        this.props.iFormWithSelect && this.props.iFormWithSelect.onClear && this.props.iFormWithSelect.onClear()
    }
    onChange(even) {
        this.props.iFormWithSelect.onChange && this.props.iFormWithSelect.onChange(even)
        if (this.FormHLSelectRef && this.props.formUid) {
            const viewStore = this.FormHLSelectRef.store.get(this.props.formUid)
            const view = viewStore.computedErrorReactNodeList.get(this.props.iAntdProps.name)
            if (view) {
                view.validateStatus = ''
            }
        }
        if (this.state.styleClassFocus) {
            this.setState({ styleClassFocus: '' })
        }
    }
    onPagingQuery = (pageIndex: number,pageSize: number,value?: string | string[] | number[] | LabeledValue | LabeledValue[]) => {
        if (this.props.formStore && this.props.formStore.localViewModel) {
            const view = this.props.formStore.localViewModel.selectView.get(this.props.iAntdProps.name)
            if (view && view.autoQuery) {
                this.props.formStore.localViewModel.dispatchRequest(this.props.iAntdProps.name,view.autoQuery,{
                    pageIndex: pageIndex,
                    pageSize: view.pageSize,
                    keyWords: value as string,
                })
            }
        }
        this.props.iFormWithSelect.onPagingQuery && this.props.iFormWithSelect.onPagingQuery(pageIndex,pageSize,value)
    }
    shouldComponentUpdate(nextProps:IFormWithSelectProps,nextState,context) {
        return this.isShouldComponentUpdate(this.FormHLSelectRef,this.props.formUid,nextProps.iAntdProps.name)
    }
    public render() {
        const { form,iAntdProps,iFormWithSelect,children,rules,formUid } = this.props;
        const { getFieldDecorator,getFieldsError } = form;
        const { label,labelCol,wrapperCol,...props } = iFormWithSelect
        const mode = iFormWithSelect.mode || 'default'
        let options = props.options;
        let total = props.total;
        let formItemProps = {};
        if ('colon' in props) {
            formItemProps['colon'] = props.colon;
        }
        return (
            <FormElement form={form}
                elType={'input'}
                onReady={(value) => {
                    this.FormHLSelectRef = value
                }}
                elementKey={iAntdProps.name}
                nextElementKey={iAntdProps.nextElementKey}
                formUid={formUid}>
                <FormItem
                    {...formItemProps}
                    extra={iFormWithSelect.extra}
                    className={iAntdProps.className}
                    label={iFormWithSelect.label}
                    labelCol={iFormWithSelect.labelCol}
                    wrapperCol={iFormWithSelect.wrapperCol}
                >
                    {getFieldDecorator(iAntdProps.name,{
                        rules: rules,
                    })(
                        <HLSelectWrapError
                            /* size="default" */
                            {...props}
                            selectAllClass={this.state.styleClassFocus}
                            options={options}
                            onPagingQuery={this.onPagingQuery}
                            total={total}
                            open={this.state.open}
                            onIgnoreError={this.props.formStore && this.props.formStore.onIgnoreError}
                            formUid={this.props.formUid}
                            formHLSelectRef={this.FormHLSelectRef}
                            formItemName={iAntdProps.name}
                            placeholder={iAntdProps.placeholder}
                            onClear={this.onClear}
                            onSelect={this.onSelect.bind(this)}
                            onBlur={this.onBlur.bind(this)}
                            onSearch={this.onSearch.bind(this)}
                            onChange={this.onChange.bind(this)}
                            onFocus={this.onFocus.bind(this)}>

                        </HLSelectWrapError>
                    )}
                    {children}
                </FormItem>
            </FormElement>
        )
    }
}
