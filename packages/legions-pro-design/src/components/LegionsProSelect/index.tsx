
import React,{ ReactElement } from 'react';
import { Select,Input,Spin,Tooltip,Icon,Row,Col,message } from 'antd';
const OptGroup = Select.OptGroup;
const Option = Select.Option;
import './style/index.less';
import { findDOMNode,unstable_renderSubtreeIntoContainer,unmountComponentAtNode } from 'react-dom'
import { SelectProps } from '../interface/antd';
import { debounce } from 'legions-utils-tool/debounce'
import { shortHash } from 'legions-lunar/object-hash';
import {
    isArray,
  } from 'legions-utils-tool/type.validation';
import { formatTrim } from 'legions-utils-tool/format.string'
import { SelectValue } from 'antd/lib/select';
import { slice } from 'lodash'
import { legionsThirdpartyPlugin } from 'legions-thirdparty-plugin';
import { IProSelectProps, ISelectProps, LabeledValue } from './interface';

interface IState {
    value: string | any[] | LabeledValue | LabeledValue[];
    keyWords: string,
    pageIndex: number,
    data?: Map<string,ISelectProps[]>;
    total?: number;
}
export class AbstractSelect<P = {},S = {}> extends React.Component<P,S> {
    //@ts-ignore
    transformlabelInValue(value,props: P,options = []): LabeledValue[] | LabeledValue {
        if (!props['labelInValue']) {
            if (Array.isArray(value)) {
                const arr: LabeledValue[] = []
                value.forEach((item) => {
                    const entity = options.find((moedl) => moedl.key === item)
                    if (entity) {
                        arr.push({
                            key: item,
                            label: entity.value,
                            title: entity.title || entity.value,
                            keyValue: entity.keyValue,
                        })
                    }
                })
                return arr
            }
            if (typeof value === 'string' || typeof value === 'number') {
                const entity = options.find((moedl) => moedl.key === value)
                if (entity) {
                    const values: LabeledValue = {
                        key: value,
                        label: entity.value,
                        title: entity.title || entity.value,
                        keyValue: entity.keyValue,
                    }
                    return values
                }
            }
        } else {
            if (value && options.length) {
                let entity = options.find((moedl) => moedl.key === value.key)
                if (entity) {
                    return { ...value,keyValue: entity.keyValue }
                }
            }
            return { ...value,keyValue: '' }
        }
    }
}
export default class LegionsProSelect extends AbstractSelect<IProSelectProps,IState> {
    static defaultProps = {
        maxTagCount: 80000,
        defaultOpen: false,
        mode: 'default',
        paging: false,
        remote: false,
    }
    antdSelectRef = null
    timeId = new Date().getTime()
    uid = `s${shortHash(this.timeId)}`
    SelectInputUid = `input${shortHash(this.timeId)}`
    MaxTagPlaceholderUid = `placeholder${shortHash(this.timeId)}`
    pageSize: number = this.props.pageSize || 100
    node: Element = null
    maxTagPlaceholderNode: Element = null;
    search = debounce((props: IProSelectProps,val) => {
        props && props.onSearch && props.onSearch(formatTrim(val))
        this.setState({
            keyWords: formatTrim(val),
        })
    },100)
    localSearch = debounce((props: IProSelectProps,value: string) => {
        let data = []
        const filter = props.options.filter((item) => item.value.indexOf(value) > -1)
        if (filter && filter.length) {
            data.push(...filter)
        }
        if (props.paging) {
            this.initPageData(data,data.length,1)
        }
    },200)
    constructor(props) {
        super(props);
        this.appendPageDom = this.appendPageDom.bind(this);
        this.state = {
            value: this.translabelInValue(this.props.value,this.props.options),
            keyWords: '',
            pageIndex: 1,
            data: new Map(),
        }
        this.consoleLog('constructor-hlSelect')
    }
    componentWillMount() {
        /**  主要场景，当开启下拉搜索,下拉框赋默认值后，需要基于默认值进行搜索数据，防止选中项数据不在当前页情况，发生选中项选中数据出现问题*/
        /* this.props.onSearch&&this.search(this.props,this.props.value); */
        this.props.onReady && this.props.onReady(this.uid)
        this.consoleLog('componentWillMount-hlSelect')
    }
    consoleLog(type: string,logObj?: Object) {
        const obj = logObj || {}
        if (window && window['hlSelectDebug'] && typeof window['hlSelectDebug'] === 'function') {
            window['hlSelectDebug']({ that: this },type)
        }
    }
    /**
     *  本地搜索时通过选中词得出所选内容所在页码位置
     *
     * @memberof HLSelect
     */
    queryLocalPageIndexByKeyWords() {
        if (this.props.paging && !this.props.remote && this.state.data.size > 0 && this.props.mode !== 'multiple' && this.state.value) {
            for (let i = 1; i <= this.state.data.size; i++) {
                // @ts-ignore
                const index = this.state.data.get(i.toString()).findIndex((item) => item.key === this.state.value.key)
                if (index > -1) {
                    this.setState({ pageIndex: i })
                    break;
                }
            }
        }
    }
    initPageData(datas = this.props.options || [],total = this.props.total || datas.length || 0,pageIndex = this.state.pageIndex || 1,paging = this.props.paging) {
        if (paging && !this.props.remote) {
            const totalPage = parseInt(((total + this.pageSize - 1) / this.pageSize).toString());
            const data = this.state.data
            data.clear();
            for (let i = 1; i <= totalPage; i++) {
                let start = (i - 1) * this.pageSize;
                let end = start + this.pageSize;
                data.set(i.toString(),slice(datas,start,end))
            }
            if (data.size > 0) {
                this.setState({
                    data,
                    pageIndex,
                    total
                },() => {
                    this.queryLocalPageIndexByKeyWords()
                    this.appendPageDom()
                })
            }
        }
        if (paging && this.props.remote) {
            this.setState({
                total,
            },() => {
                this.appendPageDom()
            })
        }
    }
    renderPortal(props) {
        let label = ''
        if (this.props.mode === 'default' || this.props.mode === 'combobox') {
            if (this.state.value && typeof this.state.value === 'object' && !Array.isArray(this.state.value)) {
                label = this.state.value['label'] as string
            }
        }
        if (label && this.node) {
            unstable_renderSubtreeIntoContainer(
                this, //代表当前组件
                <Tooltip
                    /* trigger={'click'} */
                    title={(label && <Row><Col span={24}>{label} <Icon type="copy" title="复制" onClick={this.copyText.bind(this,label)} /></Col></Row>)}
                    placement="right"
                    overlayStyle={{ wordWrap: 'break-word' }}
                >
                    <Icon type="eye" onClick={this.copyText.bind(this,label)} style={{ fontSize: 16 }} />
                </Tooltip>,// 塞进传送门的JSX
                this.node // 传送门另一端的DOM node
            )
        }
        else {
            this.destroyPortal()
        }
    }
    destroyPortal() {
        let inputDom = document.querySelector(`.${this.SelectInputUid}`);
        if (inputDom) {
            const selection = inputDom.querySelector('.ant-select-selection');
            if (selection && this.node) {
                unmountComponentAtNode(this.node);
                if (findDOMNode(selection).contains(this.node)) {
                    //  findDOMNode(selection).removeChild(this.node);
                }
            }
        }
    }
    componentDidMount() {
        this.consoleLog('componentDidMount-hlSelect')
        this.appendMaxTagDom()
        this.initPageData()
        let inputDom = document.querySelector(`.${this.SelectInputUid}`);
        if (inputDom) {
            const selection = inputDom.querySelector('.ant-select-selection');
            if (selection) {
                const span = document.createElement('span');
                span.setAttribute('class',`legions-pro-select-copy`);
                this.node = span;
                selection.appendChild(this.node)
                this.renderPortal(this.props);
            }
            const selectionChoiceUL = inputDom.querySelector('ul')
            if (selectionChoiceUL) {
                // this.maxTagPlaceholderNode = selectionChoiceUL
                // this.renderMaxTagPlaceholderPortal()
            }
        }
        /* this.bindCopyKeydown() */
    }
    componentWillReceiveProps(nextProps: IProSelectProps) {
        if (this.props.value !== nextProps.value || this.props.options !== nextProps.options) {
            this.setValue(nextProps.value,nextProps.options)
        }
        if (nextProps.value === void 0 && nextProps.paging && !nextProps.remote) {
            //@ts-ignore
            this.localSearch(nextProps,'')
        }
        if (this.props.options !== nextProps.options) {
            this.initPageData(nextProps.options,nextProps.total,this.state.pageIndex,nextProps.paging)
        }
        if (this.props.open !== nextProps.open) {
            if (this.antdSelectRef) {
                this.antdSelectRef.setOpenState && this.antdSelectRef.setOpenState(nextProps.open)
            }
        }
        this.consoleLog('componentWillReceiveProps-hlSelect')
    }
    componentDidUpdate() {
        this.consoleLog('componentDidUpdate-hlSelect')
        this.appendPageDom()
        this.appendMaxTagDom()
        this.renderPortal(this.props);
        /* this.antdSelectedValueDom(); */
        // this.renderMaxTagPlaceholderPortal()
    }
    /* addDropdownHidden() {
        let inputDom = document.querySelector(`.${this.uid}`);
        console.log(this.props)
        if (this.props.open !== undefined&&inputDom) {
            if (findDOMNode(inputDom).className.indexOf('ant-select-dropdown-hidden')<0) {
                if (!this.props.open) {
                   this.setState({openClass:'ant-select-dropdown-hidden'})
                }
            } else {
                if (this.props.open) {

                    this.setState({openClass:''})
                 }
            }
        }

    } */
    renderMaxTagPlaceholderPortal() {
        const inputDom = document.querySelector(`.${this.SelectInputUid}`);
        if (inputDom) {
            const selectionChoiceUL = inputDom.querySelector('ul')
            let value = this.state.value as any[];

            if (selectionChoiceUL && isArray(this.state.value) && (this.props.mode === 'multiple' || this.props.mode === 'tags')) {
                this.maxTagPlaceholderNode = selectionChoiceUL.lastElementChild
                if (value.length > this.props.maxTagCount) {
                    unstable_renderSubtreeIntoContainer(
                        this,
                        // @ts-ignore
                        <li unselectable="on" role="presentation" style={{ userSelect: 'none' }}
                            className={`${this.MaxTagPlaceholderUid} ant-select-selection__choice ant-select-selection__choice__disabled`}
                            title={`+ ${value.length - this.props.maxTagCount} ...`}
                        >
                            <div className="ant-select-selection__choice__content">{value.length - this.props.maxTagCount} ...</div>
                        </li>,
                        this.maxTagPlaceholderNode,
                    )
                }
                //this.appendMaxTagDom()
            }

        }

    }
    appendMaxTagDom() {
        let inputDom = document.querySelector(`.${this.SelectInputUid}`);
        /**  判定 下拉框是否开启多选状态 value 是数组且下拉开启多选模式*/
        if ((inputDom && isArray(this.state.value)) && (this.props.mode === 'multiple' || this.props.mode === 'tags')) {
            const selectionChoiceDom = inputDom.querySelectorAll('.ant-select-selection__choice') /**  获取select 输入框选中项dom元素 主要用于多选*/
            const selectionChoiceUL = inputDom.querySelector('ul')
            /* 隐藏项数量显示dom 结构 */
            const targetDom = selectionChoiceUL.querySelector(`.${this.MaxTagPlaceholderUid}`);

            const removeMaxTagPlaceholderChild = () => {
                if (findDOMNode(selectionChoiceUL).contains(targetDom)) {
                    findDOMNode(selectionChoiceUL).removeChild(targetDom)
                }
            }
            let value = this.state.value as LabeledValue[]
            if (value.length > this.props.maxTagCount) {
                let selectionList = Array.prototype.slice.call(selectionChoiceDom); /**  把dom元素数组转换成数组*/
                let arr = []
                /* 筛选下拉输入框选中项dom 因为下拉选中项dom元素里面还有其他项，所以先做过滤，找到真实的选中项数据 */
                selectionList.map((item) => {
                    let title = item['title'] || ''
                    let entity = value.find((val) => val.label === title || val.title === title)
                    if (entity) {
                        arr.push(item)
                    }
                })
                arr.map((item,index) => {
                    if (index >= this.props.maxTagCount) { /* 对选中项进行循环遍历，大于最大选中项的统一加隐藏样式 */
                        item.setAttribute('class','ant-select-selection__choice legions-pro-contain-hide')
                    } else {
                        item.setAttribute('class','ant-select-selection__choice')
                    }
                })
                removeMaxTagPlaceholderChild()
                findDOMNode(selectionChoiceUL).appendChild(this.createMaxTagPlaceholder())
            }
            else {
                /* 当没有超出最大数量，移除已经加载的选中项隐藏数量dom ，并且把之前隐藏的元素隐藏样式剔除 */
                if (findDOMNode(selectionChoiceUL).contains(targetDom)) { /*  优化 当没有隐藏项DOM元素，说明未超过最大数量，则不需要重复执行修改本来未隐藏的选中项元素样式 */
                    removeMaxTagPlaceholderChild()
                    selectionChoiceDom.forEach((item,index) => {
                        let title = item['title'] || ''
                        let entity = value.find((val) => val === title)
                        if (entity) {
                            selectionChoiceDom[index].setAttribute('class','ant-select-selection__choice')
                        }
                    })
                }

            }
        }
    }
    createMaxTagPlaceholder() {
        const li = document.createElement('li');
        let value = this.state.value as any[];
        li.setAttribute('unselectable','on');
        li.setAttribute('role','presentation');
        li.setAttribute('class',`${this.MaxTagPlaceholderUid} ant-select-selection__choice ant-select-selection__choice__disabled `);
        li.setAttribute('title',`+ ${value.length - this.props.maxTagCount} ...`);
        li.setAttribute('style','user-select: none;');
        li.innerHTML = `<div class="ant-select-selection__choice__content">+ ${value.length - this.props.maxTagCount} ...</div>`
        return li;
    }
    creatPageDom() {
        const { total } = this.state;
        const currentPage = this.state.pageIndex;
        const totalPage = parseInt(((total + this.pageSize - 1) / this.pageSize).toString());
        const div = document.createElement('div');
        div.setAttribute('class','legions-pro-select-option');
        div.innerHTML = `
            <span class="legions-pro-select-prev ${currentPage === 1 ? 'ant-select-dropdown-menu-item-disabled' : ''}">上一页</span>
            <span><span class="legions-pro-select-current">${currentPage}</span> / ${totalPage}</span>
            <span class="legions-pro-select-next ${currentPage === totalPage ? 'ant-select-dropdown-menu-item-disabled' : ''}">下一页</span>
        `;

        return div;
    }
    handleChangePage(pageIndex: number,pageSize: number) {
        if (this.props.remote) {
            this.props.onPagingQuery && this.props.onPagingQuery(pageIndex,pageSize,this.state.keyWords)
        }
    }
    onNextPage = () => {
        const { total } = this.state;
        const currentPage = this.state.pageIndex;
        const totalPage = parseInt(((total + this.pageSize - 1) / this.pageSize).toString());
        if (currentPage < totalPage) {
            let pageIndex = this.state.pageIndex
            pageIndex += 1;
            this.setState({
                pageIndex,
            })
            this.handleChangePage(pageIndex,this.pageSize)
            this.appendPageDom()
        }

    }
    onPrePage = () => {
        const currentPage = this.state.pageIndex;
        if (currentPage > 1) {
            let pageIndex = this.state.pageIndex
            pageIndex -= 1;
            this.setState({
                pageIndex,
            })
            this.handleChangePage(pageIndex,this.pageSize)
            this.appendPageDom()
        }

    }

    /**
     *
     *
     * @memberof HLSelect
     */
    antdSelectedValueDom() {
        const selDom = document.querySelector(`.${this.SelectInputUid}`);
        const selectedValue = selDom.querySelector('.ant-select-selection-selected-value');
        if (selectedValue) {
            const text = selectedValue.attributes['title'].value;
            if (text) {
                selectedValue.innerHTML = ''
                selectedValue.innerHTML = `
                <input  data-enpassusermodified="yes" style="width:100%;border:0px;outline:medium" autocomplete="off" class="ant-select-search__field" value="${text}" >
                ${text}`;
            } else {
                selectedValue.innerHTML = ''
            }
        }
    }
    appendPageDom() {
        const { total } = this.state;
        if (!this.props.paging) {
            return
        }
        const currentPage = this.state.pageIndex
        const selDom = document.querySelector(`.${this.uid}`);
        const totalPage = parseInt((((total || 0) + this.pageSize - 1) / this.pageSize).toString());
        if (!findDOMNode(selDom) || !findDOMNode(selDom).firstElementChild) {
            return;
        }
        const targetDom = selDom.querySelector('.legions-pro-select-option');
        if (findDOMNode(selDom).firstElementChild.contains(targetDom)) {
            findDOMNode(selDom).firstElementChild.removeChild(targetDom)
        }
        if ((totalPage <= 1 && currentPage <= 1)) {
            return;
        }

        findDOMNode(selDom).firstElementChild.appendChild(this.creatPageDom());
        this.removeEventListener()
        // 绑定事件
        const prevEl = selDom.querySelector('.legions-pro-select-prev');
        const currEl = selDom.querySelector('.legions-pro-select-current');
        if (prevEl) {
            prevEl.addEventListener('click',this.onPrePage);
        }
        const nextEl = selDom.querySelector('.legions-pro-select-next');
        if (nextEl) {
            nextEl.addEventListener('click',this.onNextPage);
        }
    }
    removeEventListener() {
        const selDom = document.querySelector(`.${this.uid}`);
        if (selDom) {
            const prevEl = selDom.querySelector('.legions-pro-select-prev');
            if (prevEl && prevEl.removeEventListener) {
                prevEl.removeEventListener('click',this.onPrePage)
            }
            const nextEl = selDom.querySelector('.legions-pro-select-next');
            if (nextEl && nextEl.removeEventListener) {
                nextEl.removeEventListener('click',this.onNextPage)
            }
        }

    }
    componentWillUnmount() {
        this.consoleLog('componentWillUnmount-hlSelect')
        this.removeEventListener()
        this.destroyPortal()
    }
    onBlur() {
        if (this.props.paging && !this.props.remote && this.state.data.size === 0) { // 当执行搜索时，查询不到数据，在失去焦点时，重新分配分页数据
            this.initPageData()
        }
        /* if (this.state.styleClassFocus) {
            this.setState({styleClassFocus:''})
        } */
        this.props.onBlur && this.props.onBlur()
    }
    onFocus() {
        setTimeout(() => {
            this.appendPageDom()
        },200);
        this.props.onFocus && this.props.onFocus()
    }
    onSearch(value: string) {
        if (!this.props.paging || this.props.remote) { // 没有开启分页或者开启远程搜索时，才触发上层onSearch
            //@ts-ignore
            this.search(this.props,value);
            if (this.props.paging) {
                this.setState({
                    pageIndex: 1,
                })/**  重新搜索页码重置*/
            }
        }
        else {
            //@ts-ignore
            this.localSearch(this.props,value)
        }
    }
    onDeselect(value: SelectProps['value']) {
        this.props.onDeselect && this.props.onDeselect(value)
    }
    onSelect(value: SelectProps['value'],option: Object) {
        this.setState({
            keyWords: '',
        })
        this.props.onSelect && this.props.onSelect(value,option)
    }
    translabelInValue(value,options = this.props.options): LabeledValue[] | LabeledValue {
        return this.transformlabelInValue(value,this.props,options);
        /* if (!this.props.labelInValue) {
            if (Array.isArray(value)) {
                const arr:LabeledValue[]=[]
                value.forEach((item) => {
                    const entity = options.find((moedl) => moedl.key === item)
                    if (entity) {
                        arr.push({
                            key: item,
                            label:entity.value,
                            title: entity.title || entity.value,
                            keyValue:entity.keyValue,
                        })
                    }
                })
                return arr
            }
            if (typeof value === 'string'||typeof value==='number') {
                const entity = options.find((moedl) => moedl.key === value)
                if (entity) {
                    const values:LabeledValue = {
                        key: value,
                        label:entity.value,
                        title:entity.title||entity.value,
                        keyValue:entity.keyValue,
                    }
                    return values
                }
            }
        } else {
            if (value&&options.length) {
                let entity = options.find((moedl) => moedl.key === value.key)
                if(entity){
                    return {...value,keyValue:entity.keyValue}
                }
            }
            return {...value,keyValue:''}
        } */
    }
    setValue(value,options = this.props.options,callback?: (values: LabeledValue[] | LabeledValue) => void) {
        const values = this.translabelInValue(value,options)
        this.setState({ value: values },() => {
            callback && callback(values)
        })
        return values;
    }
    onChange = (value) => {
        const res = this.setValue(value,this.props.options);
        if (this.props.labelInValue && this.props.mode !== 'multiple') {
            this.props.onChange && this.props.onChange(value === void 0 ? value : res as SelectValue)
        } else {
            this.props.onChange && this.props.onChange(value,res)
        }
        if (value === undefined) {
            if (this.props.paging) {
                this.setState({
                    pageIndex: 1,
                    keyWords: '',
                })/**  重新搜索页码重置*/
                /** 当开启分页且查询全部数据做本地分页时，清空选择，重新检索本地数据 */
                if (!this.props.remote) {
                    //@ts-ignore
                    this.localSearch(this.props,'')
                }
            }
            this.props.onClear && this.props.onClear()
        }
    }
    renderOption(): JSX.Element[] {
        const { optGroups,options,total,onPagingQuery } = this.props
        let newData = [];
        if (this.props.paging && !this.props.remote) {
            const data = this.state.data.get(this.state.pageIndex.toString());
            if (data && data.length) {
                newData = [...data]
            }
        } else {
            newData = options
        }
        if (optGroups) {
            return optGroups.map((item,index) => {
                const option = newData.filter((entity) => entity.group === item.label)
                return <OptGroup label={item.label} key={`${item.label}${index}`}>
                    {option.map((option,key) => {
                        <Option
                            {...option}
                            value={option.key}
                            disabled={option.disabled}
                            title={option.title || option.value}
                            key={`${this.uid}${option.key}`}
                        >
                            {option.value}
                        </Option>
                    })}
                </OptGroup>
            })
        }
        return newData.map((option,key) => {
            return <Option
                {...option}
                key={`${this.uid}${option.key}`}
                disabled={option.disabled}
                value={`${option.key}`}
                title={option.title || option.value}
            >
                {option.value}
            </Option>
        })
    }
    copyText(value) {
        if (!legionsThirdpartyPlugin.plugins.clipboard) {
            message.warning('Plugin is not ready to clipboard')
        } else {
            legionsThirdpartyPlugin.plugins.clipboard.copyText(value).then((res) => {
                message.success('复制成功')
            },() => {
                message.error('复制失败',4)
            })
        }

    }
    getLegionsPlugins() {
        const legionsPlugins = window['legionsPlugins'];
        if (legionsPlugins && legionsPlugins.MicroApps && legionsPlugins.MicroApps.getStore && typeof legionsPlugins.MicroApps.getStore === 'function') {
            return legionsPlugins.MicroApps.getStore();
        }
        return null;
    }
    renderSelelt() {
        const { className,placeholder,options,loading } = this.props;
        return <Select
            ref={(ref) => {
                if (!this.antdSelectRef && ref && ref['_reactInternalInstance'] && ref['_reactInternalInstance']['_renderedComponent'] && ref['_reactInternalInstance']['_renderedComponent']['_instance']) {
                    this.antdSelectRef = ref['_reactInternalInstance']['_renderedComponent']['_instance']
                }
            }}
            optionLabelProp="children"
            optionFilterProp="children"
            className={`${this.SelectInputUid} ${this.props.selectAllClass} ${this.state.value ? 'legions-pro-select' : ''}`}
            filterOption={this.props.mode === 'combobox' ? false : this.state.keyWords ? true : false}
            notFoundContent={loading ? <Spin size="small" /> : options.length === 0 ? '暂无数据' : ''}
            {...this.props}
            getPopupContainer={(t) => {
                if (this.props.getPopupContainer) {
                    return this.props.getPopupContainer(t);
                }
                const legionsPlugins = this.getLegionsPlugins();
                if (legionsPlugins && legionsPlugins.currentEnvironment === 'sandbox') {
                    return document.getElementById(this.SelectInputUid)
                }
                return document.body
            }}
            /* filterOption={this.props.mode==='combobox'?false:true} */
            dropdownClassName={`${this.uid} ${window['legionsPlugins'] ? 'legions-pro-select-option-line-h' : ''}`}
            placeholder={placeholder}
            onChange={this.onChange}
            onFocus={this.onFocus.bind(this)}
            onSelect={this.onSelect.bind(this)}
            onDeselect={this.onDeselect.bind(this)}
            onBlur={this.onBlur.bind(this)}
            allowClear
            showSearch
            onSearch={this.onSearch.bind(this)}
            defaultActiveFirstOption
        >
            {this.renderOption()}
        </Select>
    }
    render() {
        this.consoleLog('componentWillUnmount-render')
        const { className,placeholder,options,loading } = this.props;
        const legionsPlugins = this.getLegionsPlugins();
        return (
            (legionsPlugins && legionsPlugins.currentEnvironment === 'sandbox') ? < div style={{ position: 'relative',display: 'unset' }
            } id={this.SelectInputUid} >  {this.renderSelelt()} </div> : this.renderSelelt()

        )
    }
}
