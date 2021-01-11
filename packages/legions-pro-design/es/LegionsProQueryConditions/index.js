/**
  *  legions-pro-design v0.0.7
  * (c) 2021 duanguang
  * @license MIT
  */
import React from 'react';
import './style/index.less';
import { Button, Row, Radio, DatePicker, Select, Input, Tooltip, InputNumber, Checkbox, Icon, Menu, Dropdown, Col } from 'antd';
import { findDOMNode } from 'react-dom';
import moment from 'moment';
import { bind, observer } from 'legions/store-react';
import LegionsProSelect from '../LegionsProSelect';
import { ProQueryConditionStore } from '../store/pro.query.conditions';
import { shortHash } from 'legions-lunar/object-hash';
import { debounce } from 'legions-utils-tool/debounce';
import { cloneDeep } from 'lodash';
import { HlLabeledValue } from 'legions-lunar/model';

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

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

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

/**
 * 请勿外部使用，只用于搜索条件组件
 *
 * @export
 * @class CollapseUtil
 * @extends {React.Component<IProps, IState>}
 */
var CollapseUtil = /** @class */ (function (_super) {
    __extends(CollapseUtil, _super);
    function CollapseUtil(props) {
        var _this = _super.call(this, props) || this;
        _this.draggerContent = function (component) {
            var render = [];
            Object.keys(component).forEach(function (key, index) {
                /* render.push(<div style={{ float: `left`, width: `100%` }} key={index}>{component[key]}</div>) */
                if (Array.isArray(component[key])) {
                    component[key].map(function (item) {
                        render.push(item);
                    });
                }
                else {
                    render.push(component[key]);
                }
            });
            return render;
        };
        _this.state = {
            vmVisible: _this.props.defaultToggle,
            visibleLeft: true,
        };
        return _this;
    }
    CollapseUtil.prototype.componentWillMount = function () {
    };
    CollapseUtil.prototype.componentDidMount = function () {
        this.setState(__assign({}, this.state));
    };
    CollapseUtil.prototype.getContentNodeWidth = function () {
        var content = this.slots().content;
        return this.getNodeWidth(content);
    };
    /**
     * 计算节点总宽度
     *
     * @param {any} items 节点集合
     * @returns
     * @memberof CollapseUtil
     */
    CollapseUtil.prototype.getNodeWidth = function (items) {
        var width = 0;
        if (items && items instanceof Array) {
            items.map(function (item) {
                var children = item.props.children;
                if (children) {
                    var clientWidth = item.props.width;
                    if (clientWidth) {
                        width += clientWidth + 5;
                    }
                }
            });
        }
        return width;
    };
    /**
     * 计算solt-letf 宽度
     *
     * @returns
     * @memberof CollapseUtil
     */
    CollapseUtil.prototype.getLeftNodeWidth = function () {
        var left = this.slots().left;
        return this.getNodeWidth(left);
    };
    /**
     * 计算solt-show 宽度
     *
     * @returns
     * @memberof CollapseUtil
     */
    CollapseUtil.prototype.getRightNodeWidth = function () {
        var right = this.slots().right;
        return this.getNodeWidth(right);
    };
    Object.defineProperty(CollapseUtil.prototype, "isShowCollapse", {
        get: function () {
            var LeftNodeWidth = this.getLeftNodeWidth() + this.getRightNodeWidth() + 44;
            if ((this.props.widthContainer - LeftNodeWidth) > 0) {
                return true;
            }
            return false;
        },
        enumerable: false,
        configurable: true
    });
    /**
 * 渲染折叠按钮
 *
 * @param {any} content
 * @returns
 * @memberof CollapseUtil
 */
    CollapseUtil.prototype.renderCollapse = function (content) {
        var LeftNodeWidth = this.getLeftNodeWidth() + this.getRightNodeWidth() + 44;
        var component = [React.createElement("div", { style: { float: "left", width: "74px" } },
                React.createElement(Button, { type: "ghost", icon: this.state.vmVisible ? 'down' : 'up', onClick: this.handleToggle.bind(this), style: { backgroundColor: "#fff", borderColor: "#46b8da" } }, this.state.vmVisible ? '收起' : '展开'))];
        if ((this.props.widthContainer - LeftNodeWidth) > 0 && !this.state.vmVisible && content.length) {
            return (component);
        }
        else if (this.state.vmVisible) {
            return (component);
        }
        return null;
    };
    CollapseUtil.prototype.handleToggle = function () {
        var _this = this;
        if (this.state.vmVisible) {
            this.setState({
                vmVisible: false
            }, function () {
                var queryDom = document.querySelector("." + _this.props.parentUid);
                var height = findDOMNode(queryDom).clientHeight;
                _this.props.onToggle && _this.props.onToggle(false, height);
                _this.props.onDidMount && _this.props.onDidMount({ height: height, uid: _this.props.parentUid });
            });
        }
        else {
            this.setState({
                vmVisible: true
            }, function () {
                var queryDom = document.querySelector("." + _this.props.parentUid);
                var height = findDOMNode(queryDom).clientHeight;
                _this.props.onToggle && _this.props.onToggle(true, height);
                _this.props.onDidMount && _this.props.onDidMount({ height: height, uid: _this.props.parentUid });
            });
        }
    };
    /**
   *
   *
   * @param {any} newItems
   * @param {any} component
   * @param {any} bodyWidth
   * @memberof CollapseUtil
   */
    CollapseUtil.prototype.getNodeItem = function (newItems, component, bodyWidth) {
        var useWidth = bodyWidth;
        var content = [];
        newItems.content.map(function (item, index) {
            var children = item.props.children;
            if (children) {
                var clientWidth = item.props.width;
                if (useWidth && clientWidth && useWidth > clientWidth) {
                    useWidth = useWidth - clientWidth - 5;
                    component.push(item);
                    newItems.left.push(item);
                }
                else {
                    content.push(item);
                }
            }
            else {
                useWidth = useWidth - 5;
            }
        });
        newItems.content = [];
        newItems.content = content;
    };
    /**
   * 统计需要隐藏部分节点数据
   *
   * @param {any} items
   * @param {any} bodyWidth
   * @returns
   * @memberof CollapseUtil
   */
    CollapseUtil.prototype.renderRight = function (items, bodyWidth) {
        var component = {};
        var LeftNodeWidth = this.getNodeWidth(items) || 0;
        var line = Math.ceil(LeftNodeWidth / (bodyWidth));
        var newItems = { left: [], content: items };
        if (items && Array.isArray(items) && line && bodyWidth && isFinite(line)) { // 判定行数不是无穷大数字，导致内存崩溃
            for (var i = 0; i <= line; i++) {
                component[i] = [];
                this.getNodeItem(newItems, component[i], bodyWidth);
            }
        }
        return component;
    };
    /**
   * 渲染隐藏部分节点组件
   *
   * @param {any} component
   * @param {any} isShow
   * @returns
   * @memberof CollapseUtil
   */
    CollapseUtil.prototype.renderContent = function (component, isShow) {
        if (isShow && this.state.vmVisible) {
            var render_1 = [];
            Object.keys(component).forEach(function (key, index) {
                /*  render.push(<div style={{ float: `left`, width: `100%` }} key={index}>{component[key]}</div>) */
                render_1.push(component[key]);
            });
            return render_1;
        }
        return null;
    };
    CollapseUtil.prototype.renderItems = function (bodyWidth) {
        /* let LeftNodeWidth = 0;
        if (!this.state.vmVisible) {
            LeftNodeWidth = this.getLeftNodeWidth() + this.getRightNodeWidth() + 44;
        }
        else {
            LeftNodeWidth = this.getLeftNodeWidth();
        } */
        var LeftNodeWidth = this.getLeftNodeWidth() + this.getRightNodeWidth() + 75;
        var useWidth = bodyWidth - LeftNodeWidth;
        var _a = this.slots(), content = _a.content, left = _a.left;
        var items = { left: [], content: [] };
        if (content && content instanceof Array) {
            content.map(function (item, index) {
                var children = item.props.children;
                if (children) {
                    var clientWidth = item.props.width;
                    if (useWidth && clientWidth && (useWidth > clientWidth)) {
                        useWidth = useWidth - clientWidth - 5;
                        items.left.push(item);
                    }
                    else {
                        items.content.push(item);
                    }
                }
                /* else {
                    useWidth = useWidth - 5;
                } */
            });
        }
        return items;
    };
    CollapseUtil.prototype.slots = function () {
        var children = this.props.children;
        var left = children.filter(function (item) {
            return item.props.slot &&
                item.props.slot === "left" &&
                item.props.children.length;
        });
        var right = children.filter(function (item) {
            return item.props.slot &&
                item.props.slot === "right" &&
                item.props.children.length;
        });
        var content = children.filter(function (item) {
            return item.props.slot &&
                item.props.slot === "content" &&
                item.props.children.length;
        });
        return {
            left: left.length ? left[0].props.children : [],
            right: right.length ? right[0].props.children : [],
            content: content.length ? content[0].props.children : []
        };
    };
    CollapseUtil.prototype.render = function () {
        var items = this.renderItems(this.props.widthContainer);
        var component = this.renderRight(items.content, this.props.widthContainer);
        var _a = this.slots(), left = _a.left, right = _a.right; // right: 搜索，重置按钮
        if (this.state.vmVisible) ;
        /** 清除浮动，解决火狐塌陷问题 */
        return React.createElement(Row, null,
            React.createElement("div", { style: { width: "100%", lineHeight: "45px", clear: 'both' } },
                this.props.ondragger && this.props.ondragger(__spread(left, items.left, this.draggerContent(component)), 'left'),
                !this.props.ondragger && left,
                !this.props.ondragger && items.left,
                right,
                this.renderCollapse(items.content)),
            React.createElement("div", { style: { width: "100%", lineHeight: "45px", clear: 'both' } }, !this.props.ondragger && this.renderContent(component, items.content ? true : false)));
    };
    return CollapseUtil;
}(React.Component));

var Template = /** @class */ (function (_super) {
    __extends(Template, _super);
    function Template() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Template.prototype.render = function () {
        return React.createElement("div", null, this.props.children);
    };
    return Template;
}(React.Component));

var SlotItem = /** @class */ (function (_super) {
    __extends(SlotItem, _super);
    function SlotItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SlotItem.prototype.render = function () {
        var style = __assign({ float: "left", marginRight: "4px", position: 'relative', width: this.props.width + "px" }, this.props.style);
        return React.createElement("div", { style: style }, this.props.children);
    };
    return SlotItem;
}(React.Component));

var RadioButton = Radio.Button;
var RadioGroup = Radio.Group;
var RangePicker = DatePicker.RangePicker;
var Option = Select.Option;
var TextArea = Input.TextArea;
var baseCls = "legions-pro-query";
function isArray(val) {
    return Object.prototype.toString.call(val) === "[object Array]";
}
var LegionsProQueryConditions = /** @class */ (function (_super) {
    __extends(LegionsProQueryConditions, _super);
    // @ts-ignore
    /* MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver
    observer= null */
    function LegionsProQueryConditions(props) {
        var _this = _super.call(this, props) || this;
        /* search =debounce((options,val)=>{
           options&&options.props.onSearch&&options.props.onSearch(val)
        },200) */
        _this.resize = debounce(function () {
            var queryDom = document.querySelector("." + _this.uid);
            if (queryDom && findDOMNode(queryDom) && _this.viewStore) {
                _this.viewStore.widthContainer = findDOMNode(queryDom).clientWidth;
            }
        }, 500);
        _this.timeId = new Date().getTime();
        _this.uid = "Query" + shortHash(_this.timeId);
        _this.state = {
            vmModel: {},
            queryPrams: {},
            fieldsStates: [],
        };
        /* const obj = this.props.query.filter((item)=>item.container.position!=='right').map((item) => {
            return {name:item.container.component.JsonProperty.name,label:item.container.component.label,type:item.container.component.type}
        }) */
        /* const hash = {query:obj,namespace:this.props.namespace||''} */
        if (_this.props['uniqueUid']) {
            _this.uid = "Query" + shortHash(_this.props['uniqueUid']);
        }
        else {
            _this.uid = "Query" + _this.props.store.HlQueryConditionContainer.size + shortHash("" + _this.timeId + _this.props.store.HlQueryConditionContainer.size);
            if (_this.props.store.HlQueryConditionContainer.has(_this.uid)) {
                _this.timeId = new Date().getTime();
                _this.uid = "Query" + _this.props.store.HlQueryConditionContainer.size + shortHash("" + _this.timeId + _this.props.store.HlQueryConditionContainer.size);
            }
        }
        _this.consoleLog('constructor-QueryConditions');
        return _this;
    }
    Object.defineProperty(LegionsProQueryConditions.prototype, "viewStore", {
        //@ts-ignore
        get: function () {
            return this.props.store.HlQueryConditionContainer.get(this.uid);
        },
        enumerable: false,
        configurable: true
    });
    LegionsProQueryConditions.prototype.consoleLog = function (type, logObj) {
        var obj = logObj || {};
        if (window['handleHlQueryDebug'] && typeof window['handleHlQueryDebug'] === 'function') {
            window['handleHlQueryDebug'](__assign(__assign({ store: this.viewStore, state: this.state }, obj), { that: this }), type);
        }
    };
    LegionsProQueryConditions.prototype.componentWillMount = function () {
        var _this = this;
        if (!this.props.store.HlQueryConditionContainer.has(this.uid)) {
            this.props.store.add(this.uid);
            this.initVModel();
        }
        else {
            this.setState({ vmModel: __assign({}, this.viewStore.computedVmModel) });
        }
        this.viewStore.setSize(this.props.size);
        this.props.onReady && this.props.onReady({
            store: this.props.store, uid: this.uid, viewModel: this.viewStore,
            methods: {
                reset: function () {
                    _this.reset();
                },
                setFieldsValue: function (fieldsValues) {
                    _this.setFieldsValue(fieldsValues);
                },
                setFieldState: function (fieldsStates) {
                    _this.setFieldState(fieldsStates);
                },
                getQuerySelectOption: function (name, optionKey) {
                    var selectConfigs = _this.props.query.filter(function (item) { return item.container.component.type === 'select'; });
                    var index = selectConfigs.findIndex(function (item) { return item.container.component.JsonProperty.name === name; });
                    var newData = [];
                    var optionItem = new HlLabeledValue();
                    if (index > -1) {
                        var item = selectConfigs[index].container.component.props;
                        newData = selectConfigs[index].container.component.data;
                        if (item.autoQuery) {
                            var autoObData = _this.viewStore.selectOptions.get(name);
                            if (autoObData) {
                                var autoData = item.autoQuery.transform(autoObData.obData);
                                newData = autoData.data;
                            }
                        }
                        var option = newData.find(function (item) { return item.key === optionKey; });
                        optionItem = __assign(__assign({}, optionItem), option);
                    }
                    return {
                        item: optionItem,
                        options: newData,
                    };
                },
                onSelectSearch: function (name, params) {
                    var selectConfigs = _this.props.query.filter(function (item) { return item.container.component.type === 'select'; });
                    var index = selectConfigs.findIndex(function (item) { return item.container.component.JsonProperty.name === name; });
                    if (index > -1) {
                        var item = selectConfigs[index].container.component.props;
                        if (item.autoQuery) {
                            _this.viewStore.dispatchRequest(name, item.autoQuery, params);
                        }
                        else {
                            console.warn('此下拉框组件并没有开启自动托管请求配置信息,请检查');
                        }
                    }
                    else {
                        console.warn('搜索条件配置数据找不到此名称的下拉组件,请检查');
                    }
                }
            }
        });
        this.consoleLog('componentWillMount-QueryConditions');
    };
    LegionsProQueryConditions.prototype.componentDidMount = function () {
        var queryDom = document.querySelector("." + this.uid);
        var store = this.props.store.get(this.uid);
        if (queryDom && store) {
            this.onDidMount();
            window.addEventListener && window.addEventListener('resize', this.resize.bind(this));
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
        this.consoleLog('componentDidMount-QueryConditions');
    };
    LegionsProQueryConditions.prototype.onDidMount = function () {
        var queryDom = document.querySelector("." + this.uid);
        var store = this.props.store.get(this.uid);
        if (queryDom && store) {
            if (findDOMNode(queryDom).clientHeight) {
                store.domHeight = findDOMNode(queryDom).clientHeight;
                store.widthContainer = findDOMNode(queryDom).clientWidth;
                this.props.onDidMount && this.props.onDidMount({ uid: this.uid, height: store.domHeight });
            }
        }
    };
    LegionsProQueryConditions.prototype.componentWillReceiveProps = function (nextProps) {
        this.consoleLog('componentWillReceiveProps-QueryConditions');
    };
    LegionsProQueryConditions.prototype.componentWillUnmount = function () {
        if (!this.props['uniqueUid']) {
            this.props.store.delete(this.uid);
        }
        window.removeEventListener && window.removeEventListener('resize', this.resize.bind(this));
        this.consoleLog('componentWillUnmount-QueryConditions');
    };
    LegionsProQueryConditions.prototype.componentDidUpdate = function () {
        this.onDidMount();
        this.consoleLog('componentDidUpdate-QueryConditions');
    };
    LegionsProQueryConditions.prototype.dispatchRequest = function () {
        var _this = this;
        var query = this.props.query;
        query.map(function (item) {
            if (item.container.component.type === 'select') {
                var props = item.container.component.props;
                if (props.autoQuery && (props.autoQuery.isInitialize === void 0 || props.autoQuery.isInitialize)) {
                    _this.viewStore.dispatchRequest(item.container.component.JsonProperty.name, props.autoQuery, {
                        pageIndex: 1,
                    });
                }
            }
        });
    };
    /**
     * 设置指定元素value值
     *
     * @template T value 类型
     * @param {string} fieldName JsonProperty.name
     * @param {T} value
     * @memberof QueryConditions
     */
    LegionsProQueryConditions.prototype.setFieldsValue = function (fieldsValues) {
        if (Array.isArray(fieldsValues) && fieldsValues.length) {
            var vmModels_1 = __assign({}, this.state.vmModel);
            fieldsValues.map(function (item) {
                if (vmModels_1.hasOwnProperty(item.fieldName)) {
                    vmModels_1[item.fieldName] = item.value;
                }
            });
            this.setState({ vmModel: vmModels_1 });
            this.viewStore.setVmModel(vmModels_1);
        }
    };
    /**
     * 设置指定元素显示隐藏
     *
     * @template T state 类型
     * @param {string} name JsonProperty.name
     * @param {T} state
     * @memberof QueryConditions
     */
    LegionsProQueryConditions.prototype.setFieldState = function (fieldsStates) {
        var newFieldsName = fieldsStates.map(function (item) { return item.name; });
        var oldFieldsStates = this.state.fieldsStates.filter(function (item) { return !newFieldsName.includes(item.name); });
        this.setState({ fieldsStates: __spread(oldFieldsStates, fieldsStates) });
    };
    LegionsProQueryConditions.prototype.initVModel = function () {
        var query = this.props.query;
        var data = {};
        var prams = {};
        query.map(function (item) {
            if (item.container.component.JsonProperty && typeof item.container.component.JsonProperty === 'object') {
                if (isArray(item.container.component.defaultValue) || isArray(item.container.component.JsonProperty.value)) {
                    if (item.container.component.defaultValue.length) {
                        data[item.container.component.JsonProperty.name] = __spread(item.container.component.defaultValue);
                    }
                    else if (item.container.component.JsonProperty.value.length) {
                        // @ts-ignore
                        data[item.container.component.JsonProperty.name] = __spread(item.container.component.JsonProperty.value);
                    }
                    else {
                        data[item.container.component.JsonProperty.name] = item.container.component.defaultValue || item.container.component.JsonProperty.value;
                    }
                }
                else {
                    data[item.container.component.JsonProperty.name] = item.container.component.defaultValue || item.container.component.JsonProperty.value || '';
                }
                if (item.container.component.JsonProperty.queryPrams) {
                    prams[item.container.component.JsonProperty.queryPrams] = item.container.component.JsonProperty.value || '';
                }
            }
        });
        this.setState({
            vmModel: data,
            queryPrams: prams
        });
        this.viewStore.setVmModel(data);
    };
    /**
     * 把组件元素结果映射至查询条件
     *
     * @memberof QueryConditions
     */
    LegionsProQueryConditions.prototype.mapQueryValue = function () {
        var _this = this;
        var query = this.props.query;
        var prams = this.state.queryPrams;
        query.map(function (item) {
            if (item.container.component.JsonProperty && typeof item.container.component.JsonProperty === 'object') {
                prams[item.container.component.JsonProperty.queryPrams] = _this.state.vmModel[item.container.component.JsonProperty.name];
                /* prams[item.container.component.JsonProperty.queryPrams] = this.viewStore.computedVmModel[item.container.component.JsonProperty.name] */
            }
        });
        this.setState({
            queryPrams: prams
        });
        this.viewStore.setQuery(__assign(__assign({}, this.viewStore.computedQuery), prams));
    };
    LegionsProQueryConditions.prototype.reset = function () {
        var _this = this;
        var data = this.state.vmModel;
        /* let data = {...this.viewStore.computedVmModel} */
        Object.keys(data).forEach(function (key) {
            var entity = _this.props.query.find(function (item) { return item.container.component.JsonProperty.name === key; });
            if (entity && !entity.container.component.props.isNotReset) {
                if (entity.container.component.props.onReset) {
                    data[key] = entity.container.component.props.onReset(key, data[key]);
                }
                else {
                    data[key] = entity.container.component.defaultValue || '';
                }
            }
        });
        this.setState({
            vmModel: data
        });
        this.viewStore.setVmModel(data);
        this.mapQueryValue();
    };
    /**
     * 搜索事件
     *
     * @param {*} handle
     * @memberof QueryConditions
     */
    LegionsProQueryConditions.prototype.handleSearch = function (handle) {
        this.mapQueryValue();
        handle && handle.call(this, cloneDeep(this.state.queryPrams), this.viewStore);
        this.consoleLog('handleSearch-QueryConditions', { stateParams: cloneDeep(this.state.queryPrams) });
    };
    /**
     * 重置数据
     *
     * @param {Function} handle
     * @memberof QueryConditions
     */
    LegionsProQueryConditions.prototype.handleReset = function (handle) {
        this.reset();
        this.mapQueryValue();
        handle && handle.call(this, cloneDeep(this.state.queryPrams));
    };
    LegionsProQueryConditions.prototype.handleChangeChx = function (option, even) {
        option = option || {};
        var value = even.target.checked;
        var JsonProperty = option.JsonProperty || {};
        option.JsonProperty = JsonProperty;
        option.regex = option.regex || '';
        var data = this.state.vmModel;
        /* let data = {...this.viewStore.computedVmModel} */
        data[option.JsonProperty.name] = value;
        this.setState({
            vmModel: data
        });
        this.viewStore.setVmModel(__assign({}, data));
        option.handle && option.handle.call(this, cloneDeep(data));
    };
    LegionsProQueryConditions.prototype.handleChangeDate = function (option, even, dateString) {
        option = option || {};
        var value = dateString;
        var JsonProperty = option.JsonProperty || {};
        option.JsonProperty = JsonProperty;
        option.regex = option.regex || '';
        var data = this.state.vmModel;
        /* let data = {...this.viewStore.computedVmModel} */
        if (Array.isArray(even) && even.length === 0) { // 日期多选
            data[option.JsonProperty.name] = [];
        }
        else {
            data[option.JsonProperty.name] = value;
        }
        this.setState({
            vmModel: data
        });
        this.viewStore.setVmModel(__assign({}, data));
        option.handle && option.handle.call(this, cloneDeep(data));
    };
    LegionsProQueryConditions.prototype.handleSelectSearch = function (option, value) {
        option && option.props.onSearch && option.props.onSearch(value);
        /* this.search(option,value) */
    };
    LegionsProQueryConditions.prototype.handleChangeSelect = function (option, even) {
        option = option || {};
        var value = even;
        if (Object.prototype.toString.call(even) === '[object Object]') {
            if (even.target) {
                value = even.target.value;
            }
            else if (option && option.props && option.props.labelInValue) {
                value = even.key;
            }
        }
        if (isArray(even)) {
            value = even;
        }
        var JsonProperty = option.JsonProperty || {};
        option.JsonProperty = JsonProperty;
        option.regex = option.regex || '';
        var data = this.state.vmModel;
        /* let data = {...this.viewStore.computedVmModel} */
        if (option.props.mode === 'combobox') {
            var entity = option.data.find(function (item) { return item.key === value; });
            if (option.props.labelInValue) {
                data[option.JsonProperty.name] = even;
            }
            else {
                data[option.JsonProperty.name] = entity ? entity.value : value;
            }
        }
        else {
            data[option.JsonProperty.name] = option.props.labelInValue ? even : value;
        }
        if (value instanceof Array) {
            if (!value.every(function (item) { return item; })) {
                data[option.JsonProperty.name] = '';
            }
        }
        this.setState({
            vmModel: data
        });
        this.viewStore.setVmModel(__assign({}, data));
        option.handle && option.handle.call(this, cloneDeep(data));
    };
    LegionsProQueryConditions.prototype.handleChange = function (option, even) {
        option = option || {};
        var value = even;
        if (typeof even === 'object') {
            value = even.target.value;
        }
        var JsonProperty = option.JsonProperty || {};
        option.JsonProperty = JsonProperty;
        option.regex = option.regex || '';
        var data = this.state.vmModel;
        /* let data = {...this.viewStore.computedVmModel} */
        data[option.JsonProperty.name] = value;
        if (option.type && option.type === 'text') {
            data[option.JsonProperty.name] = this.formatTrim(value);
        }
        this.setState({
            vmModel: data
        });
        this.viewStore.setVmModel(__assign({}, data));
        option.handle && option.handle.call(this, cloneDeep(data));
    };
    LegionsProQueryConditions.prototype.formatTrim = function (str) {
        if (str) {
            return str.replace(/(^\s+)|(\s+$)/g, "");
        }
        return str;
    };
    /**
      * 获取传入参数
      *
      * @param {any} component
      * @returns
      * @memberof FilterSearchWrap
      */
    LegionsProQueryConditions.prototype.changeOptions = function (component) {
        var hooks = component.hooks, JsonProperty = component.JsonProperty, regex = component.regex, type = component.type, props = component.props, data = component.data;
        var onChange = hooks && hooks.find(function (item) { return item.name === 'onChange'; });
        var option = {
            handle: onChange && onChange.handle,
            JsonProperty: JsonProperty,
            regex: regex,
            type: type,
            props: props,
            data: data,
        };
        return option;
    };
    /**
     * 获取搜索区域钩子事件列表
     *
     * @returns
     * @memberof QueryConditions
     */
    LegionsProQueryConditions.prototype.searchEmit = function () {
        var right = this.props.query.filter(function (item) { return item.container.position === 'right'; });
        if (right.length > 0) {
            return right[0].container.component.hooks || [];
        }
        return [];
    };
    /**
     * 回车搜索
     *
     * @param {Function} onEnter
     * @memberof QueryConditions
     */
    LegionsProQueryConditions.prototype.handleEnter = function (onEnter) {
        onEnter && onEnter.call(this, this.state.vmModel);
        var emit = this.searchEmit();
        var onSearch = emit.find(function (item) { return item.name === 'onSearch'; });
        this.handleSearch(onSearch && onSearch.handle);
    };
    //@ts-ignore
    LegionsProQueryConditions.prototype.renderLabel = function (label, component) {
        if (label) {
            return (this.viewStore.computedSize === 'small' ? React.createElement("span", { style: {
                    float: 'left', marginLeft: '5px', marginRight: '3px',
                    position: 'absolute', zIndex: 999, background: '#fff',
                    height: '20px', lineHeight: '20px',
                    color: '#999', top: '-3px', fontSize: 10, webkitTransform: 'scale(0.9)'
                } }, component.type === 'radioButton' ? '' : label) :
                React.createElement("span", { style: { float: 'left', marginRight: '3px' } }, label));
        }
    };
    LegionsProQueryConditions.prototype.renderComponent = function (component) {
        if (component.render) {
            return component.render();
        }
        else {
            switch (component.type) {
                case 'text':
                    return this.renderInput(component);
                case 'textArea':
                    return this.renderInputTextArea(component);
                case 'select':
                    return this.renderSelect(component);
                case 'date':
                    return this.renderDate(component);
                case 'daterange':
                    return this.renderDateRange(component);
                case 'checkBox':
                    return this.renderChxBox(component);
                case 'number':
                    return this.renderInputNumber(component);
                case 'radioButton':
                    return this.renderRadioButton(component);
            }
        }
    };
    LegionsProQueryConditions.prototype.renderInputTextArea = function (component) {
        var props = component.props, hooks = component.hooks, JsonProperty = component.JsonProperty, label = component.label;
        var placeholder = props.placeholder;
        if (this.viewStore && this.viewStore.computedSize === 'small') {
            placeholder = '';
        }
        var prop = props;
        var onReset = prop.onReset, themProps = __rest(prop, ["onReset"]);
        var option = this.changeOptions(component);
        var onEnter = hooks && hooks.find(function (item) { return item.name === 'onEnter'; });
        var vmValue = this.state.vmModel[JsonProperty.name];
        /* const vmValue  = this.viewStore.computedVmModel[JsonProperty.name] */
        return (React.createElement(Tooltip, { overlayClassName: "legions-pro-query-tooltip", trigger: "focus", title: (this.formatTrim(vmValue)) ? React.createElement("pre", null, vmValue.replace('↵', ',')) : null, placement: "topLeft" },
            React.createElement(TextArea, __assign({ maxLength: 1500, autosize: { minRows: 1, maxRows: 1 } }, themProps, { style: { width: props.width + "px", maxWidth: props.width + "px", marginBottom: '8px' }, value: vmValue, onPressEnter: this.handleEnter.bind(this, onEnter && onEnter.handle), placeholder: placeholder, onChange: this.handleChange.bind(this, option) }))));
    };
    LegionsProQueryConditions.prototype.renderRadioButton = function (component) {
        var props = component.props, hooks = component.hooks, JsonProperty = component.JsonProperty, data = component.data;
        var prop = props;
        var newData = data;
        var option = this.changeOptions(component);
        var vmValue = this.state.vmModel[JsonProperty.name];
        /* const vmValue  = this.viewStore.computedVmModel[JsonProperty.name] */
        return (React.createElement(RadioGroup, __assign({}, prop, { value: vmValue, onChange: this.handleChange.bind(this, option) }), newData && newData.map(function (item) {
            return (React.createElement(RadioButton, { key: item.value + "-" + JsonProperty.name, disabled: item.disabled, value: item.value }, item.label));
        })));
    };
    LegionsProQueryConditions.prototype.renderInputNumber = function (component) {
        var _this = this;
        var props = component.props, hooks = component.hooks, JsonProperty = component.JsonProperty;
        var placeholder = props.placeholder;
        if (this.viewStore && this.viewStore.computedSize === 'small') {
            placeholder = '';
        }
        var prop = props;
        var option = this.changeOptions(component);
        var onEnter = hooks && hooks.find(function (item) { return item.name === 'onEnter'; });
        var vmValue = this.state.vmModel[JsonProperty.name];
        /* const vmValue  = this.viewStore.computedVmModel[JsonProperty.name] */
        return (React.createElement(InputNumber, __assign({}, prop, { onKeyDown: function (value) {
                if (value && value['key'] && value['key'] === 'Enter') {
                    _this.handleEnter.call(_this, onEnter && onEnter.handle);
                }
            }, style: { width: props.width + "px" }, value: vmValue, placeholder: placeholder, onChange: this.handleChange.bind(this, option) })));
    };
    LegionsProQueryConditions.prototype.renderChxBox = function (component) {
        var props = component.props, hooks = component.hooks, JsonProperty = component.JsonProperty;
        var placeholder = props.placeholder;
        var option = this.changeOptions(component);
        var vmValue = this.state.vmModel[JsonProperty.name];
        /* const vmValue  = this.viewStore.computedVmModel[JsonProperty.name] */
        var value = vmValue === '' ? false : vmValue;
        return (React.createElement(Checkbox, { checked: value, onChange: this.handleChangeChx.bind(this, option) }, placeholder));
    };
    LegionsProQueryConditions.prototype.renderDate = function (component) {
        var props = component.props, hooks = component.hooks, JsonProperty = component.JsonProperty;
        var placeholder = props.placeholder;
        var prop = props;
        var option = this.changeOptions(component);
        var vmValue = this.state.vmModel[JsonProperty.name];
        /* const vmValue  = this.viewStore.computedVmModel[JsonProperty.name] */
        var value = vmValue;
        value = value ? moment(value, prop.format) : void 0;
        return (React.createElement(DatePicker, __assign({}, prop, { placeholder: placeholder, style: { width: props.width + "px" }, value: value, onChange: this.handleChangeDate.bind(this, option) })));
    };
    LegionsProQueryConditions.prototype.renderDateRange = function (component) {
        var props = component.props, hooks = component.hooks, JsonProperty = component.JsonProperty;
        var placeholder = props.placeholder;
        var option = this.changeOptions(component);
        var prop = props;
        var vmValue = this.state.vmModel[JsonProperty.name];
        /*  const vmValue  = this.viewStore.computedVmModel[JsonProperty.name] */
        var value = vmValue;
        value = (value && value.length) ? [moment(value[0], prop.format), moment(value[1], prop.format)] : [void 0, void 0];
        return (React.createElement(RangePicker, __assign({ allowClear: true }, prop, { value: value, onChange: this.handleChangeDate.bind(this, option), placeholder: placeholder, style: { width: props.width + "px" } })));
    };
    LegionsProQueryConditions.prototype.renderSelect = function (component) {
        var props = component.props, data = component.data, hooks = component.hooks, JsonProperty = component.JsonProperty, defaultValue = component.defaultValue, label = component.label;
        var placeholder = props.placeholder;
        var newData = data;
        var prop = props;
        var option = this.changeOptions(component);
        var vmValue = this.state.vmModel[JsonProperty.name];
        /* let vmValue = this.viewStore.computedVmModel[JsonProperty.name] */
        /* if (isObservableArray(vmValue) && vmValue.length === 0) {
            vmValue =[]
        } */
        var firstActiveValue = newData.length > 0 ? ["" + newData[0].key] : '';
        var autoObData = this.viewStore.selectOptions.get(JsonProperty.name);
        if (autoObData && prop.autoQuery) {
            var autoData = prop.autoQuery.transform(autoObData.obData);
            newData = autoData.data;
        }
        return (
        // @ts-ignore mode 为tags时，可以把随意输入的条目作为 tag，输入项不需要与下拉选项匹配
        React.createElement("div", null,
            React.createElement(LegionsProSelect
            // notFoundContent={prop.loading? <Spin size="small" /> : null}
            , __assign({}, prop, { style: { width: props.width + "px" }, placeholder: placeholder, onSearch: this.handleSelectSearch.bind(this, option), onChange: this.handleChangeSelect.bind(this, option), value: vmValue, options: newData, allowClear: true, showSearch: true, defaultActiveFirstOption: true, optionFilterProp: "children" }))));
    };
    LegionsProQueryConditions.prototype.renderInput = function (component) {
        var _this = this;
        var props = component.props, hooks = component.hooks, JsonProperty = component.JsonProperty, label = component.label;
        var placeholder = props.placeholder;
        if (this.viewStore && this.viewStore.computedSize === 'small') {
            placeholder = '';
        }
        var prop = props;
        var option = this.changeOptions(component);
        var onEnter = hooks && hooks.find(function (item) { return item.name === 'onEnter'; });
        var vmValue = this.state.vmModel[JsonProperty.name];
        /* const vmValue  = this.viewStore.computedVmModel[JsonProperty.name] */
        var suffix = vmValue ? React.createElement(Icon, { type: "close-circle", onClick: function () {
                var state = _this.state.vmModel;
                /* let state ={...this.viewStore.computedVmModel} */
                state[JsonProperty.name] = '';
                _this.setState({
                    vmModel: state
                });
                _this.viewStore.setVmModel(state);
                _this.mapQueryValue();
            } }) : null;
        return (React.createElement(Tooltip, { trigger: "focus", title: (this.formatTrim(vmValue)) ? React.createElement("pre", null, vmValue.replace('↵', ',')) : null, placement: "topLeft" },
            React.createElement(Input, __assign({ maxLength: '50' }, prop, { suffix: suffix, style: { width: props.width + "px" }, value: vmValue, onPressEnter: this.handleEnter.bind(this, onEnter && onEnter.handle), placeholder: placeholder, onChange: this.handleChange.bind(this, option) }))));
    };
    LegionsProQueryConditions.prototype.renderContent = function (position, query) {
        var _this = this;
        if (query === void 0) { query = this.props.query; }
        var left = query.filter(function (item) { return item.container.position === position; });
        var fieldsStates = this.state.fieldsStates;
        if (Array.isArray(fieldsStates) && fieldsStates.length > 0) {
            var fieldFalseVisable_1 = fieldsStates.filter(function (item) { return !item.state.visable; }).map(function (item) { return item.name; });
            left = left.filter(function (item) { return !fieldFalseVisable_1.includes(item.container.component.JsonProperty.name); });
        }
        return (React.createElement(Template, { slot: position }, left.map(function (item, index) {
            var label = item.container.component.label ? item.container.component.label : '';
            if (label) {
                label = label + ':';
                label = label.replace(':', ':').replace('：', ':').replace('::', ':').replace('：:', ':');
            }
            var labelLenWidth = label.length;
            var width = item.container.width;
            if (_this.viewStore.computedSize === 'small') {
                if (label) {
                    label = _this.formatTrim(label);
                    label = label.replace(':', '').replace('：', '');
                    /* labelLenWidth = label.length; */
                }
                width = item.container.width - labelLenWidth * 10;
            }
            return (React.createElement(SlotItem, { key: "" + index + (item.container.component.JsonProperty.uuid || item.container.component.JsonProperty.name), width: width, name: item.container.component.JsonProperty.uuid },
                _this.renderLabel(label, item.container.component),
                _this.renderComponent(item.container.component)));
        })));
    };
    LegionsProQueryConditions.prototype.queryEmit = function (hooks, position) {
        if (position === void 0) { position = 'right'; }
        var right = this.props.query.filter(function (item) { return item.container.position === position; });
        if (right.length > 0) {
            var emit = right[0].container.component.hooks || [];
            var onSearch_1 = emit.find(function (item) { return item.name === hooks; });
            if (onSearch_1) {
                var viewStore_1 = this.props.store.HlQueryConditionContainer.get(this.uid);
                return function (value, height) {
                    viewStore_1.domHeight = height;
                    onSearch_1.handle(value, viewStore_1);
                };
            }
            return void 0;
        }
        return void 0;
    };
    /**
     * 搜索按钮及重置按钮
     *
     * @returns
     * @memberof QueryConditions
     */
    //@ts-ignore
    LegionsProQueryConditions.prototype.renderRight = function (query) {
        var _this = this;
        if (query === void 0) { query = this.props.query; }
        var right = query.filter(function (item) { return item.container.position === 'right'; });
        if (right.length > 0) {
            var emit = right[0].container.component.hooks || [];
            var props = null;
            var label = null;
            if (right[0].container && right[0].container.component) {
                props = right[0].container.component.props;
                label = right[0].container.component.label;
            }
            var width = (props && props.width) ? props.width : 73;
            var onSearch = emit.find(function (item) { return item.name === 'onSearch'; });
            var onReset = emit.find(function (item) { return item.name === 'onReset'; });
            var onRefresh = emit.find(function (item) { return item.name === 'onRefresh'; });
            var handleSearch = this.handleSearch.bind(this, onSearch && onSearch.handle);
            var menu = (React.createElement(Menu, { selectedKeys: [this.viewStore.computedSize], onClick: function (item) {
                    var size = item.key;
                    // @ts-ignore
                    _this.viewStore.setSize(size);
                } },
                React.createElement(Menu.Item, { key: "small" }, "\u7D27\u51D1"),
                React.createElement(Menu.Item, { key: "default" }, "\u8212\u9002")));
            return (React.createElement(Template, { slot: 'right' },
                React.createElement(SlotItem, { width: width },
                    React.createElement(Button.Group, null,
                        React.createElement(Button, { type: "primary", icon: "" + (label || 'search'), onClick: handleSearch, style: { borderColor: "#46b8da", color: "white" } }, "" + (label || '搜索')))),
                React.createElement(SlotItem, { width: onRefresh ? 108 + 15 : 60 + 15 },
                    React.createElement(Dropdown.Button, { onClick: this.handleReset.bind(this, onReset && onReset.handle), type: "ghost", overlay: menu }, "\u91CD\u7F6E"),
                    onRefresh && React.createElement(Button, { style: { marginLeft: '5px', width: '36px', padding: '0 2px' }, onClick: onRefresh && onRefresh.handle },
                        React.createElement(Icon, { type: "sync" })))));
        }
    };
    LegionsProQueryConditions.prototype.render = function () {
        return (React.createElement(Row, { className: baseCls + " " + this.uid },
            React.createElement(Col, null,
                React.createElement(CollapseUtil, { widthContainer: this.viewStore ? this.viewStore.widthContainer : 0, parentUid: this.uid, defaultToggle: this.props.defaultToggle, onDidMount: this.props.onDidMount, ondragger: this.props.ondragger, onToggle: this.queryEmit('onToggle') },
                    this.renderContent('left'),
                    this.renderContent('content'),
                    this.renderRight()))));
    };
    LegionsProQueryConditions.defaultProps = {
        size: 'default',
        defaultToggle: false,
    };
    LegionsProQueryConditions = __decorate([
        bind({ store: ProQueryConditionStore }),
        observer,
        __metadata("design:paramtypes", [Object])
    ], LegionsProQueryConditions);
    return LegionsProQueryConditions;
}(React.Component));

export default LegionsProQueryConditions;
