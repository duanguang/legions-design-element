/**
  *  legions-pro-design v0.0.7
  * (c) 2021 duanguang
  * @license MIT
  */
import React from 'react';
import { Select, Tooltip, Row, Col, Icon, message, Spin } from 'antd';
import './style/index.less';
import { unstable_renderSubtreeIntoContainer, unmountComponentAtNode, findDOMNode } from 'react-dom';
import { debounce } from 'legions-utils-tool/debounce';
import { shortHash } from 'legions-lunar/object-hash';
import { isArray } from 'legions-utils-tool/type.validation';
import { formatTrim } from 'legions-utils-tool/format.string';
import { slice } from 'lodash';
import { legionsThirdpartyPlugin } from 'legions-thirdparty-plugin';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

var OptGroup = Select.OptGroup;
var Option = Select.Option;
var AbstractSelect = /** @class */ (function (_super) {
    __extends(AbstractSelect, _super);
    function AbstractSelect() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //@ts-ignore
    AbstractSelect.prototype.transformlabelInValue = function (value, props, options) {
        if (options === void 0) { options = []; }
        if (!props['labelInValue']) {
            if (Array.isArray(value)) {
                var arr_1 = [];
                value.forEach(function (item) {
                    var entity = options.find(function (moedl) { return moedl.key === item; });
                    if (entity) {
                        arr_1.push({
                            key: item,
                            label: entity.value,
                            title: entity.title || entity.value,
                            keyValue: entity.keyValue,
                        });
                    }
                });
                return arr_1;
            }
            if (typeof value === 'string' || typeof value === 'number') {
                var entity = options.find(function (moedl) { return moedl.key === value; });
                if (entity) {
                    var values = {
                        key: value,
                        label: entity.value,
                        title: entity.title || entity.value,
                        keyValue: entity.keyValue,
                    };
                    return values;
                }
            }
        }
        else {
            if (value && options.length) {
                var entity = options.find(function (moedl) { return moedl.key === value.key; });
                if (entity) {
                    return __assign(__assign({}, value), { keyValue: entity.keyValue });
                }
            }
            return __assign(__assign({}, value), { keyValue: '' });
        }
    };
    return AbstractSelect;
}(React.Component));
var LegionsProSelect = /** @class */ (function (_super) {
    __extends(LegionsProSelect, _super);
    function LegionsProSelect(props) {
        var _this = _super.call(this, props) || this;
        _this.antdSelectRef = null;
        _this.timeId = new Date().getTime();
        _this.uid = "s" + shortHash(_this.timeId);
        _this.SelectInputUid = "input" + shortHash(_this.timeId);
        _this.MaxTagPlaceholderUid = "placeholder" + shortHash(_this.timeId);
        _this.pageSize = _this.props.pageSize || 100;
        _this.node = null;
        _this.maxTagPlaceholderNode = null;
        _this.search = debounce(function (props, val) {
            props && props.onSearch && props.onSearch(formatTrim(val));
            _this.setState({
                keyWords: formatTrim(val),
            });
        }, 100);
        _this.localSearch = debounce(function (props, value) {
            var data = [];
            var filter = props.options.filter(function (item) { return item.value.indexOf(value) > -1; });
            if (filter && filter.length) {
                data.push.apply(data, __spread(filter));
            }
            if (props.paging) {
                _this.initPageData(data, data.length, 1);
            }
        }, 200);
        _this.onNextPage = function () {
            var total = _this.state.total;
            var currentPage = _this.state.pageIndex;
            var totalPage = parseInt(((total + _this.pageSize - 1) / _this.pageSize).toString());
            if (currentPage < totalPage) {
                var pageIndex = _this.state.pageIndex;
                pageIndex += 1;
                _this.setState({
                    pageIndex: pageIndex,
                });
                _this.handleChangePage(pageIndex, _this.pageSize);
                _this.appendPageDom();
            }
        };
        _this.onPrePage = function () {
            var currentPage = _this.state.pageIndex;
            if (currentPage > 1) {
                var pageIndex = _this.state.pageIndex;
                pageIndex -= 1;
                _this.setState({
                    pageIndex: pageIndex,
                });
                _this.handleChangePage(pageIndex, _this.pageSize);
                _this.appendPageDom();
            }
        };
        _this.onChange = function (value) {
            var res = _this.setValue(value, _this.props.options);
            if (_this.props.labelInValue && _this.props.mode !== 'multiple') {
                _this.props.onChange && _this.props.onChange(value === void 0 ? value : res);
            }
            else {
                _this.props.onChange && _this.props.onChange(value, res);
            }
            if (value === undefined) {
                if (_this.props.paging) {
                    _this.setState({
                        pageIndex: 1,
                        keyWords: '',
                    }); /**  重新搜索页码重置*/
                    /** 当开启分页且查询全部数据做本地分页时，清空选择，重新检索本地数据 */
                    if (!_this.props.remote) {
                        //@ts-ignore
                        _this.localSearch(_this.props, '');
                    }
                }
                _this.props.onClear && _this.props.onClear();
            }
        };
        _this.appendPageDom = _this.appendPageDom.bind(_this);
        _this.state = {
            value: _this.translabelInValue(_this.props.value, _this.props.options),
            keyWords: '',
            pageIndex: 1,
            data: new Map(),
        };
        _this.consoleLog('constructor-hlSelect');
        return _this;
    }
    LegionsProSelect.prototype.componentWillMount = function () {
        /**  主要场景，当开启下拉搜索,下拉框赋默认值后，需要基于默认值进行搜索数据，防止选中项数据不在当前页情况，发生选中项选中数据出现问题*/
        /* this.props.onSearch&&this.search(this.props,this.props.value); */
        this.props.onReady && this.props.onReady(this.uid);
        this.consoleLog('componentWillMount-hlSelect');
    };
    LegionsProSelect.prototype.consoleLog = function (type, logObj) {
        if (window && window['hlSelectDebug'] && typeof window['hlSelectDebug'] === 'function') {
            window['hlSelectDebug']({ that: this }, type);
        }
    };
    /**
     *  本地搜索时通过选中词得出所选内容所在页码位置
     *
     * @memberof HLSelect
     */
    LegionsProSelect.prototype.queryLocalPageIndexByKeyWords = function () {
        var _this = this;
        if (this.props.paging && !this.props.remote && this.state.data.size > 0 && this.props.mode !== 'multiple' && this.state.value) {
            for (var i = 1; i <= this.state.data.size; i++) {
                // @ts-ignore
                var index = this.state.data.get(i.toString()).findIndex(function (item) { return item.key === _this.state.value.key; });
                if (index > -1) {
                    this.setState({ pageIndex: i });
                    break;
                }
            }
        }
    };
    LegionsProSelect.prototype.initPageData = function (datas, total, pageIndex, paging) {
        var _this = this;
        if (datas === void 0) { datas = this.props.options || []; }
        if (total === void 0) { total = this.props.total || datas.length || 0; }
        if (pageIndex === void 0) { pageIndex = this.state.pageIndex || 1; }
        if (paging === void 0) { paging = this.props.paging; }
        if (paging && !this.props.remote) {
            var totalPage = parseInt(((total + this.pageSize - 1) / this.pageSize).toString());
            var data = this.state.data;
            data.clear();
            for (var i = 1; i <= totalPage; i++) {
                var start = (i - 1) * this.pageSize;
                var end = start + this.pageSize;
                data.set(i.toString(), slice(datas, start, end));
            }
            if (data.size > 0) {
                this.setState({
                    data: data,
                    pageIndex: pageIndex,
                    total: total
                }, function () {
                    _this.queryLocalPageIndexByKeyWords();
                    _this.appendPageDom();
                });
            }
        }
        if (paging && this.props.remote) {
            this.setState({
                total: total,
            }, function () {
                _this.appendPageDom();
            });
        }
    };
    LegionsProSelect.prototype.renderPortal = function (props) {
        var label = '';
        if (this.props.mode === 'default' || this.props.mode === 'combobox') {
            if (this.state.value && typeof this.state.value === 'object' && !Array.isArray(this.state.value)) {
                label = this.state.value['label'];
            }
        }
        if (label && this.node) {
            unstable_renderSubtreeIntoContainer(this, //代表当前组件
            React.createElement(Tooltip
            /* trigger={'click'} */
            , { 
                /* trigger={'click'} */
                title: (label && React.createElement(Row, null,
                    React.createElement(Col, { span: 24 },
                        label,
                        " ",
                        React.createElement(Icon, { type: "copy", title: "\u590D\u5236", onClick: this.copyText.bind(this, label) })))), placement: "right", overlayStyle: { wordWrap: 'break-word' } },
                React.createElement(Icon, { type: "eye", onClick: this.copyText.bind(this, label), style: { fontSize: 16 } })), // 塞进传送门的JSX
            this.node // 传送门另一端的DOM node
            );
        }
        else {
            this.destroyPortal();
        }
    };
    LegionsProSelect.prototype.destroyPortal = function () {
        var inputDom = document.querySelector("." + this.SelectInputUid);
        if (inputDom) {
            var selection = inputDom.querySelector('.ant-select-selection');
            if (selection && this.node) {
                unmountComponentAtNode(this.node);
                if (findDOMNode(selection).contains(this.node)) ;
            }
        }
    };
    LegionsProSelect.prototype.componentDidMount = function () {
        this.consoleLog('componentDidMount-hlSelect');
        this.appendMaxTagDom();
        this.initPageData();
        var inputDom = document.querySelector("." + this.SelectInputUid);
        if (inputDom) {
            var selection = inputDom.querySelector('.ant-select-selection');
            if (selection) {
                var span = document.createElement('span');
                span.setAttribute('class', "legions-pro-select-copy");
                this.node = span;
                selection.appendChild(this.node);
                this.renderPortal(this.props);
            }
            var selectionChoiceUL = inputDom.querySelector('ul');
        }
        /* this.bindCopyKeydown() */
    };
    LegionsProSelect.prototype.componentWillReceiveProps = function (nextProps) {
        if (this.props.value !== nextProps.value || this.props.options !== nextProps.options) {
            this.setValue(nextProps.value, nextProps.options);
        }
        if (nextProps.value === void 0 && nextProps.paging && !nextProps.remote) {
            //@ts-ignore
            this.localSearch(nextProps, '');
        }
        if (this.props.options !== nextProps.options) {
            this.initPageData(nextProps.options, nextProps.total, this.state.pageIndex, nextProps.paging);
        }
        if (this.props.open !== nextProps.open) {
            if (this.antdSelectRef) {
                this.antdSelectRef.setOpenState && this.antdSelectRef.setOpenState(nextProps.open);
            }
        }
        this.consoleLog('componentWillReceiveProps-hlSelect');
    };
    LegionsProSelect.prototype.componentDidUpdate = function () {
        this.consoleLog('componentDidUpdate-hlSelect');
        this.appendPageDom();
        this.appendMaxTagDom();
        this.renderPortal(this.props);
        /* this.antdSelectedValueDom(); */
        // this.renderMaxTagPlaceholderPortal()
    };
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
    LegionsProSelect.prototype.renderMaxTagPlaceholderPortal = function () {
        var inputDom = document.querySelector("." + this.SelectInputUid);
        if (inputDom) {
            var selectionChoiceUL = inputDom.querySelector('ul');
            var value = this.state.value;
            if (selectionChoiceUL && isArray(this.state.value) && (this.props.mode === 'multiple' || this.props.mode === 'tags')) {
                this.maxTagPlaceholderNode = selectionChoiceUL.lastElementChild;
                if (value.length > this.props.maxTagCount) {
                    unstable_renderSubtreeIntoContainer(this, 
                    // @ts-ignore
                    React.createElement("li", { unselectable: "on", role: "presentation", style: { userSelect: 'none' }, className: this.MaxTagPlaceholderUid + " ant-select-selection__choice ant-select-selection__choice__disabled", title: "+ " + (value.length - this.props.maxTagCount) + " ..." },
                        React.createElement("div", { className: "ant-select-selection__choice__content" },
                            value.length - this.props.maxTagCount,
                            " ...")), this.maxTagPlaceholderNode);
                }
                //this.appendMaxTagDom()
            }
        }
    };
    LegionsProSelect.prototype.appendMaxTagDom = function () {
        var _this = this;
        var inputDom = document.querySelector("." + this.SelectInputUid);
        /**  判定 下拉框是否开启多选状态 value 是数组且下拉开启多选模式*/
        if ((inputDom && isArray(this.state.value)) && (this.props.mode === 'multiple' || this.props.mode === 'tags')) {
            var selectionChoiceDom_1 = inputDom.querySelectorAll('.ant-select-selection__choice'); /**  获取select 输入框选中项dom元素 主要用于多选*/
            var selectionChoiceUL_1 = inputDom.querySelector('ul');
            /* 隐藏项数量显示dom 结构 */
            var targetDom_1 = selectionChoiceUL_1.querySelector("." + this.MaxTagPlaceholderUid);
            var removeMaxTagPlaceholderChild = function () {
                if (findDOMNode(selectionChoiceUL_1).contains(targetDom_1)) {
                    findDOMNode(selectionChoiceUL_1).removeChild(targetDom_1);
                }
            };
            var value_1 = this.state.value;
            if (value_1.length > this.props.maxTagCount) {
                var selectionList = Array.prototype.slice.call(selectionChoiceDom_1); /**  把dom元素数组转换成数组*/
                var arr_2 = [];
                /* 筛选下拉输入框选中项dom 因为下拉选中项dom元素里面还有其他项，所以先做过滤，找到真实的选中项数据 */
                selectionList.map(function (item) {
                    var title = item['title'] || '';
                    var entity = value_1.find(function (val) { return val.label === title || val.title === title; });
                    if (entity) {
                        arr_2.push(item);
                    }
                });
                arr_2.map(function (item, index) {
                    if (index >= _this.props.maxTagCount) { /* 对选中项进行循环遍历，大于最大选中项的统一加隐藏样式 */
                        item.setAttribute('class', 'ant-select-selection__choice legions-pro-contain-hide');
                    }
                    else {
                        item.setAttribute('class', 'ant-select-selection__choice');
                    }
                });
                removeMaxTagPlaceholderChild();
                findDOMNode(selectionChoiceUL_1).appendChild(this.createMaxTagPlaceholder());
            }
            else {
                /* 当没有超出最大数量，移除已经加载的选中项隐藏数量dom ，并且把之前隐藏的元素隐藏样式剔除 */
                if (findDOMNode(selectionChoiceUL_1).contains(targetDom_1)) { /*  优化 当没有隐藏项DOM元素，说明未超过最大数量，则不需要重复执行修改本来未隐藏的选中项元素样式 */
                    removeMaxTagPlaceholderChild();
                    selectionChoiceDom_1.forEach(function (item, index) {
                        var title = item['title'] || '';
                        var entity = value_1.find(function (val) { return val === title; });
                        if (entity) {
                            selectionChoiceDom_1[index].setAttribute('class', 'ant-select-selection__choice');
                        }
                    });
                }
            }
        }
    };
    LegionsProSelect.prototype.createMaxTagPlaceholder = function () {
        var li = document.createElement('li');
        var value = this.state.value;
        li.setAttribute('unselectable', 'on');
        li.setAttribute('role', 'presentation');
        li.setAttribute('class', this.MaxTagPlaceholderUid + " ant-select-selection__choice ant-select-selection__choice__disabled ");
        li.setAttribute('title', "+ " + (value.length - this.props.maxTagCount) + " ...");
        li.setAttribute('style', 'user-select: none;');
        li.innerHTML = "<div class=\"ant-select-selection__choice__content\">+ " + (value.length - this.props.maxTagCount) + " ...</div>";
        return li;
    };
    LegionsProSelect.prototype.creatPageDom = function () {
        var total = this.state.total;
        var currentPage = this.state.pageIndex;
        var totalPage = parseInt(((total + this.pageSize - 1) / this.pageSize).toString());
        var div = document.createElement('div');
        div.setAttribute('class', 'legions-pro-select-option');
        div.innerHTML = "\n            <span class=\"legions-pro-select-prev " + (currentPage === 1 ? 'ant-select-dropdown-menu-item-disabled' : '') + "\">\u4E0A\u4E00\u9875</span>\n            <span><span class=\"legions-pro-select-current\">" + currentPage + "</span> / " + totalPage + "</span>\n            <span class=\"legions-pro-select-next " + (currentPage === totalPage ? 'ant-select-dropdown-menu-item-disabled' : '') + "\">\u4E0B\u4E00\u9875</span>\n        ";
        return div;
    };
    LegionsProSelect.prototype.handleChangePage = function (pageIndex, pageSize) {
        if (this.props.remote) {
            this.props.onPagingQuery && this.props.onPagingQuery(pageIndex, pageSize, this.state.keyWords);
        }
    };
    /**
     *
     *
     * @memberof HLSelect
     */
    LegionsProSelect.prototype.antdSelectedValueDom = function () {
        var selDom = document.querySelector("." + this.SelectInputUid);
        var selectedValue = selDom.querySelector('.ant-select-selection-selected-value');
        if (selectedValue) {
            var text = selectedValue.attributes['title'].value;
            if (text) {
                selectedValue.innerHTML = '';
                selectedValue.innerHTML = "\n                <input  data-enpassusermodified=\"yes\" style=\"width:100%;border:0px;outline:medium\" autocomplete=\"off\" class=\"ant-select-search__field\" value=\"" + text + "\" >\n                " + text;
            }
            else {
                selectedValue.innerHTML = '';
            }
        }
    };
    LegionsProSelect.prototype.appendPageDom = function () {
        var total = this.state.total;
        if (!this.props.paging) {
            return;
        }
        var currentPage = this.state.pageIndex;
        var selDom = document.querySelector("." + this.uid);
        var totalPage = parseInt((((total || 0) + this.pageSize - 1) / this.pageSize).toString());
        if (!findDOMNode(selDom) || !findDOMNode(selDom).firstElementChild) {
            return;
        }
        var targetDom = selDom.querySelector('.legions-pro-select-option');
        if (findDOMNode(selDom).firstElementChild.contains(targetDom)) {
            findDOMNode(selDom).firstElementChild.removeChild(targetDom);
        }
        if ((totalPage <= 1 && currentPage <= 1)) {
            return;
        }
        findDOMNode(selDom).firstElementChild.appendChild(this.creatPageDom());
        this.removeEventListener();
        // 绑定事件
        var prevEl = selDom.querySelector('.legions-pro-select-prev');
        var currEl = selDom.querySelector('.legions-pro-select-current');
        if (prevEl) {
            prevEl.addEventListener('click', this.onPrePage);
        }
        var nextEl = selDom.querySelector('.legions-pro-select-next');
        if (nextEl) {
            nextEl.addEventListener('click', this.onNextPage);
        }
    };
    LegionsProSelect.prototype.removeEventListener = function () {
        var selDom = document.querySelector("." + this.uid);
        if (selDom) {
            var prevEl = selDom.querySelector('.legions-pro-select-prev');
            if (prevEl && prevEl.removeEventListener) {
                prevEl.removeEventListener('click', this.onPrePage);
            }
            var nextEl = selDom.querySelector('.legions-pro-select-next');
            if (nextEl && nextEl.removeEventListener) {
                nextEl.removeEventListener('click', this.onNextPage);
            }
        }
    };
    LegionsProSelect.prototype.componentWillUnmount = function () {
        this.consoleLog('componentWillUnmount-hlSelect');
        this.removeEventListener();
        this.destroyPortal();
    };
    LegionsProSelect.prototype.onBlur = function () {
        if (this.props.paging && !this.props.remote && this.state.data.size === 0) { // 当执行搜索时，查询不到数据，在失去焦点时，重新分配分页数据
            this.initPageData();
        }
        /* if (this.state.styleClassFocus) {
            this.setState({styleClassFocus:''})
        } */
        this.props.onBlur && this.props.onBlur();
    };
    LegionsProSelect.prototype.onFocus = function () {
        var _this = this;
        setTimeout(function () {
            _this.appendPageDom();
        }, 200);
        this.props.onFocus && this.props.onFocus();
    };
    LegionsProSelect.prototype.onSearch = function (value) {
        if (!this.props.paging || this.props.remote) { // 没有开启分页或者开启远程搜索时，才触发上层onSearch
            //@ts-ignore
            this.search(this.props, value);
            if (this.props.paging) {
                this.setState({
                    pageIndex: 1,
                }); /**  重新搜索页码重置*/
            }
        }
        else {
            //@ts-ignore
            this.localSearch(this.props, value);
        }
    };
    LegionsProSelect.prototype.onDeselect = function (value) {
        this.props.onDeselect && this.props.onDeselect(value);
    };
    LegionsProSelect.prototype.onSelect = function (value, option) {
        this.setState({
            keyWords: '',
        });
        this.props.onSelect && this.props.onSelect(value, option);
    };
    LegionsProSelect.prototype.translabelInValue = function (value, options) {
        if (options === void 0) { options = this.props.options; }
        return this.transformlabelInValue(value, this.props, options);
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
    };
    LegionsProSelect.prototype.setValue = function (value, options, callback) {
        if (options === void 0) { options = this.props.options; }
        var values = this.translabelInValue(value, options);
        this.setState({ value: values }, function () {
            callback && callback(values);
        });
        return values;
    };
    LegionsProSelect.prototype.renderOption = function () {
        var _this = this;
        var _a = this.props, optGroups = _a.optGroups, options = _a.options, total = _a.total, onPagingQuery = _a.onPagingQuery;
        var newData = [];
        if (this.props.paging && !this.props.remote) {
            var data = this.state.data.get(this.state.pageIndex.toString());
            if (data && data.length) {
                newData = __spread(data);
            }
        }
        else {
            newData = options;
        }
        if (optGroups) {
            return optGroups.map(function (item, index) {
                var option = newData.filter(function (entity) { return entity.group === item.label; });
                return React.createElement(OptGroup, { label: item.label, key: "" + item.label + index }, option.map(function (option, key) {
                    React.createElement(Option, __assign({}, option, { value: option.key, disabled: option.disabled, title: option.title || option.value, key: "" + _this.uid + option.key }), option.value);
                }));
            });
        }
        return newData.map(function (option, key) {
            return React.createElement(Option, __assign({}, option, { key: "" + _this.uid + option.key, disabled: option.disabled, value: "" + option.key, title: option.title || option.value }), option.value);
        });
    };
    LegionsProSelect.prototype.copyText = function (value) {
        if (!legionsThirdpartyPlugin.plugins.clipboard) {
            message.warning('Plugin is not ready to clipboard');
        }
        else {
            legionsThirdpartyPlugin.plugins.clipboard.copyText(value).then(function (res) {
                message.success('复制成功');
            }, function () {
                message.error('复制失败', 4);
            });
        }
    };
    LegionsProSelect.prototype.getLegionsPlugins = function () {
        var legionsPlugins = window['legionsPlugins'];
        if (legionsPlugins && legionsPlugins.MicroApps && legionsPlugins.MicroApps.getStore && typeof legionsPlugins.MicroApps.getStore === 'function') {
            return legionsPlugins.MicroApps.getStore();
        }
        return null;
    };
    LegionsProSelect.prototype.renderSelelt = function () {
        var _this = this;
        var _a = this.props, className = _a.className, placeholder = _a.placeholder, options = _a.options, loading = _a.loading;
        return React.createElement(Select, __assign({ ref: function (ref) {
                if (!_this.antdSelectRef && ref && ref['_reactInternalInstance'] && ref['_reactInternalInstance']['_renderedComponent'] && ref['_reactInternalInstance']['_renderedComponent']['_instance']) {
                    _this.antdSelectRef = ref['_reactInternalInstance']['_renderedComponent']['_instance'];
                }
            }, optionLabelProp: "children", optionFilterProp: "children", className: this.SelectInputUid + " " + this.props.selectAllClass + " " + (this.state.value ? 'legions-pro-select' : ''), filterOption: this.props.mode === 'combobox' ? false : this.state.keyWords ? true : false, notFoundContent: loading ? React.createElement(Spin, { size: "small" }) : options.length === 0 ? '暂无数据' : '' }, this.props, { getPopupContainer: function (t) {
                if (_this.props.getPopupContainer) {
                    return _this.props.getPopupContainer(t);
                }
                var legionsPlugins = _this.getLegionsPlugins();
                if (legionsPlugins && legionsPlugins.currentEnvironment === 'sandbox') {
                    return document.getElementById(_this.SelectInputUid);
                }
                return document.body;
            }, 
            /* filterOption={this.props.mode==='combobox'?false:true} */
            dropdownClassName: this.uid + " " + (window['legionsPlugins'] ? 'legions-pro-select-option-line-h' : ''), placeholder: placeholder, onChange: this.onChange, onFocus: this.onFocus.bind(this), onSelect: this.onSelect.bind(this), onDeselect: this.onDeselect.bind(this), onBlur: this.onBlur.bind(this), allowClear: true, showSearch: true, onSearch: this.onSearch.bind(this), defaultActiveFirstOption: true }), this.renderOption());
    };
    LegionsProSelect.prototype.render = function () {
        this.consoleLog('componentWillUnmount-render');
        var _a = this.props, className = _a.className, placeholder = _a.placeholder, options = _a.options, loading = _a.loading;
        var legionsPlugins = this.getLegionsPlugins();
        return ((legionsPlugins && legionsPlugins.currentEnvironment === 'sandbox') ? React.createElement("div", { style: { position: 'relative', display: 'unset' }, id: this.SelectInputUid },
            "  ",
            this.renderSelelt(),
            " ") : this.renderSelelt());
    };
    LegionsProSelect.defaultProps = {
        maxTagCount: 80000,
        defaultOpen: false,
        mode: 'default',
        paging: false,
        remote: false,
    };
    return LegionsProSelect;
}(AbstractSelect));

export default LegionsProSelect;
export { AbstractSelect };
