
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
import { runScriptsSdk } from 'legions-thirdparty-plugin';
import { IProSelectProps,ProSelect,LabeledValue } from './interface';

interface IState {
    value: string | any[] | LabeledValue | LabeledValue[];
    keyWords: string,
    pageIndex: number,
    data?: Map<string,ProSelect['options'][]>;
    total?: number;
}
function transformlabelInValue(value: SelectValue,props: IProSelectProps,options: ProSelect['options'][] = []): LabeledValue[] | LabeledValue {
    if (!props['labelInValue']) {
        if (Array.isArray(value)) {
            // 多选模式
            const arr: LabeledValue[] = []
            value.forEach((item: string) => {
                const entity = options.find((moedl) => moedl.key === item)
                if (entity) {
                    arr.push({
                        ...entity,
                        key: item,
                        label: entity.label,
                        title: entity.title,
                        value: entity.value,
                    })
                }
            })
            return arr
        }
        if (typeof value === 'string' || typeof value === 'number') { //单选
            const entity = options.find((moedl) => moedl.key === value)
            if (entity) {
                const values: LabeledValue = {
                    ...entity,
                    key: value,
                    label: entity.label,
                    title: entity.title,
                    value: entity.value,
                }
                return values
            }
        }
    } else {
        if (Array.isArray(value)) {
            const arr: LabeledValue[] = []
            value.forEach((item: LabeledValue) => {
                const entity = options.find((moedl) => moedl.key === item.key)
                if (entity) {
                    arr.push({
                        ...value,
                        ...entity,
                        key: item.key,
                        label: entity.label,
                        title: entity.title,
                        value: entity.value,
                    })
                }
            })
            return arr
        }
        if (typeof value === 'object' && !Array.isArray(value)) {
            let entity = options.find((moedl) => moedl.key === value.key)
            if (entity) {
                return { ...value,...entity,value: entity.value }
            }
        }
    }
    return void 0
}

export default class LegionsProSelect extends React.Component<IProSelectProps,IState> {
    static defaultProps = {
        maxTagCount: 80000,
        defaultOpen: false,
        mode: 'default',
        paging: false,
        remote: false,
    }
    static transformlabelInValue = transformlabelInValue;
    antdSelectRef = null
    timeId = new Date().getTime()
    uid = `select${shortHash(this.timeId)}`
    SelectInputUid = `selectInput${shortHash(this.timeId)}`
    MaxTagPlaceholderUid = `placeholder${shortHash(this.timeId)}`
    pageSize: number = this.props.pageSize || 100
    copyIconNode: Element = null
    maxTagPlaceholderNode: Element = null;

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
    }
    componentWillMount() {
        this.props.onReady && this.props.onReady(this.uid);
        this.initPageData();
    }
    /** 是否远程搜索 */
    isRemoteSearch() {
        if (this.props.onSearch) {
            return true;
        }
        return false;
    }
    /**
     *  本地搜索时通过选中词得出所选内容所在页码位置
     *
     * @memberof HLSelect
     */
    queryLocalPageIndexByKeyWords() {
        if (this.props.paging  && this.state.data.size > 0 && this.props.mode !== 'multiple' && this.state.value) {
            for (let i = 1; i <= this.state.data.size; i++) {
                const index = this.state.data.get(i.toString()).findIndex((item) => item.key === this.state.value['key'])
                if (index > -1) {
                    this.setState({ pageIndex: i })
                    break;
                }
            }
        }
    }
    /** 
     * 触发分页数据初始化条件
     * 
     * 1. 失去焦点，且state.data数据为0时
     * 
     * 2. 初始化组件时，触发
     * 
     * 3. 组件options数据更新时
     */
    initPageData(datas = this.props.options || [],total = this.props.total || datas.length || 0,pageIndex = this.state.pageIndex || 1,paging = this.props.paging) {
        if (paging) {
            // 开启了分页且当前数据项大于等于总数量，如果是静态数据，则以静态写死数据分页，如果是动态数据，则表示一次性请求全部数据回来
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
    }
    getLabel() {
        let label = ''
        if (this.props.mode === 'default' || this.props.mode === 'combobox') {
            if (this.state.value && typeof this.state.value === 'object' && !Array.isArray(this.state.value)) {
                label = this.state.value['value'] as string
            }
        }
        return label;
    }
    renderIconCopyPortal(props) {
        const label = this.getLabel();
        if (label && this.copyIconNode) {
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
                this.copyIconNode // 传送门另一端的DOM node
            )
        }
        else {
            this.destroyIconCopyPortal()
        }
    }
    destroyIconCopyPortal() {
        let inputDom = document.querySelector(`.${this.SelectInputUid}`);
        if (inputDom) {
            const selection = inputDom.querySelector('.ant-select-selection');
            if (selection && this.copyIconNode) {
                unmountComponentAtNode(this.copyIconNode);
                if (findDOMNode(selection).contains(this.copyIconNode)) {
                    //  findDOMNode(selection).removeChild(this.copyIconNode);
                }
            }
        }
    }
    componentDidMount() {
        this.appendMaxTagDom()
        let inputDom = document.querySelector(`.${this.SelectInputUid}`);
        if (inputDom) {
            const selection = inputDom.querySelector('.ant-select-selection');
            if (selection) {
                const span = document.createElement('span');
                span.setAttribute('class',`span-icon`);
                this.copyIconNode = span;
                selection.appendChild(this.copyIconNode)
                this.renderIconCopyPortal(this.props);
            }
            const selectionChoiceUL = inputDom.querySelector('ul')
            if (selectionChoiceUL) {
                // this.maxTagPlaceholderNode = selectionChoiceUL
                // this.renderMaxTagPlaceholderPortal()
            }
        }
    }
    componentWillReceiveProps(nextProps: IProSelectProps) {
        if (this.props.value !== nextProps.value || this.props.options !== nextProps.options) {
            this.setValue(nextProps.value,nextProps.options)
        }
        if (nextProps.value === void 0 && nextProps.paging) {
            //@ts-ignore
           // this.localSearch(nextProps,'')
        }
        if (this.props.options !== nextProps.options) {
            this.initPageData(nextProps.options,nextProps.total,this.state.pageIndex,nextProps.paging)
        }
        if (this.props.open !== nextProps.open) {
            if (this.antdSelectRef) {
                this.antdSelectRef.setOpenState && this.antdSelectRef.setOpenState(nextProps.open)
            }
        }
    }
    componentDidUpdate() {
        this.appendPageDom()
        this.appendMaxTagDom()
        this.renderIconCopyPortal(this.props);
    }
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
                    let entity = value.find((val) => val.key === title)
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
        if (this.props.onSearch) {
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
        this.removeEventListener()
        this.destroyIconCopyPortal()
    }
    onBlur() {
        if (this.props.paging  && this.state.data.size === 0) { // 在失去焦点时，重新分配分页数据
            this.initPageData()
        }
        this.props.onBlur && this.props.onBlur()
    }
    onFocus() {
        if (this.props.paging) {
            setTimeout(() => {
                this.appendPageDom()
            },200);
        }
        this.props.onFocus && this.props.onFocus()
    }
    onGeneralSearch(props: IProSelectProps,val) {
        const value = formatTrim(val);
        props && props.onSearch && props.onSearch(value)
        this.setState({
            keyWords: value,
        })
    }
    onSearch(value: string) {
        if (this.props.onSearch) { // 开启远程搜索时，才触发上层onSearch
            if (this.props.paging) {
                // 如果开启分页了，则需要重置页码后，在去触发远程搜索函数
                this.setState({
                    pageIndex: 1,
                },() => {
                    this.onGeneralSearch(this.props,value);
                })/**  重新搜索页码重置*/
            }
            else {
                this.onGeneralSearch(this.props,value);
            }
            
        }
        else {
            // 没有开启远程搜索，则走本地数据搜索
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
    translabelInValue(value: SelectValue,options = this.props.options): LabeledValue[] | LabeledValue {
        return transformlabelInValue(value,this.props,options);
    }
    setValue(value: SelectValue,options = this.props.options,callback?: (values: LabeledValue[] | LabeledValue) => void) {
        const res = this.translabelInValue(value,options)
        this.setState({ value: res },() => {
            callback && callback(res)
        })
        return res;
    }
    onChange = (value: SelectValue) => {
        const res = this.setValue(value,this.props.options);
        this.props.onChange && this.props.onChange(value,res)
        if (value === undefined) { // 执行清空选项时触发
            this.setState({
                keyWords:''
            })
            if (this.props.paging) {
                this.setState({
                    pageIndex: 1,
                })/**  重新搜索页码重置*/
                /** 当开启分页且查询全部数据做本地分页时，清空选择，重新检索本地数据 */
                if (!this.props.onSearch) {
                    //@ts-ignore
                    this.localSearch(this.props,'')
                }
            }
            this.props.onClear && this.props.onClear()
        }
    }
    renderOption(): JSX.Element[] {
        const { optGroups,options,total,onPagingQuery } = this.props
        let newData: ProSelect['options'][] = [];
        if (this.props.paging && !this.props.onSearch) {
            const data = this.state.data.get(this.state.pageIndex.toString());
            if (data && data.length) {
                newData = [...data]
            }
        } else {
            newData = options
        }
        if (optGroups) {
            return optGroups.map((item,index) => {
                const option = newData.filter((entity) => entity.group_key === item.key)
                return <OptGroup label={item.label} key={`${item.label}${item.key}`}>
                    {option.map((option,key) => {
                        <Option
                            {...option}
                            value={option.value}
                            disabled={option.disabled}
                            title={option.title||option.label||option.value}
                            key={`${this.uid}${option.key||option.value}`}
                        >
                            {option.label||option.value}
                        </Option>
                    })}
                </OptGroup>
            })
        }
        return newData.map((option,key) => {
            return <Option
                {...option}
                key={`${this.uid}${option.key||option.value}`}
                disabled={option.disabled}
                value={`${option.value}`}
                title={option.title||option.label||option.value}
            >
                {option.label||option.value}
            </Option>
        })
    }
    copyText(value) {
        if (!runScriptsSdk.plugins.clipboard) {
            message.warning('Plugin is not ready to clipboard')
        } else {
            runScriptsSdk.plugins.clipboard.copyText(value).then((res) => {
                message.success('复制成功')
            },() => {
                message.error('复制失败',4)
            })
        }

    }
    renderSelelt() {
        const { className,placeholder,options,loading } = this.props;
        const label = this.getLabel();
        return <Select
            ref={(ref) => {
                if (!this.antdSelectRef && ref && ref['_reactInternalInstance'] && ref['_reactInternalInstance']['_renderedComponent'] && ref['_reactInternalInstance']['_renderedComponent']['_instance']) {
                    this.antdSelectRef = ref['_reactInternalInstance']['_renderedComponent']['_instance']
                }
            }}
            optionLabelProp="children"
            optionFilterProp="children"
            className={`${this.SelectInputUid} ${this.props.selectAllClass || ''} ${label ? 'legions-pro-select-copy' : ''} ${this.state.value ? 'legions-pro-select' : ''}`}
            notFoundContent={loading ? <Spin size="small" /> : options.length === 0 ? '暂无数据' : ''}
            {...this.props}
            filterOption={this.props.mode === 'combobox' ? false : this.state.keyWords ? true : false}
            getPopupContainer={(t) => {
                if (this.props.getPopupContainer && typeof this.props.getPopupContainer === 'function') {
                    return this.props.getPopupContainer(t);
                }
                if (window['proxy']) {
                    return document.getElementById(this.SelectInputUid)
                }
                return document.body
            }}
            dropdownClassName={`${this.uid} ${window['proxy'] ? 'legions-pro-select-line' : ''}`}
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
        return (
            (window['proxy']) ? < div style={{ position: 'relative',display: 'unset' }
            } id={this.SelectInputUid} >  {this.renderSelelt()} </div> : this.renderSelelt()

        )
    }
}
