/**
  *  legions-pro-design v0.0.7
  * (c) 2021 duanguang
  * @license MIT
  */
import React from 'react';
import './style/index.less';
import { Radio, DatePicker, Select, Input, Icon, Tooltip, Checkbox, InputNumber, Menu, Row, Col, Button, Dropdown } from 'antd';
import moment from 'moment';
import { bind, observer } from 'legions/store-react';
import LegionsProSelect from '../LegionsProSelect';
import { ProQueryConditionStore } from '../store/pro.query.conditions';
import { shortHash } from 'legions-lunar/object-hash';
import { findDOMNode } from 'react-dom';
import { debounce } from 'legions-utils-tool/debounce';
import { cloneDeep } from 'lodash';
import { HlLabeledValue } from 'legions-lunar/model';
import { getInjector } from 'legions/store';
import { isArray } from 'legions-utils-tool/type.validation';

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

var ConditionSelectModel = /** @class */ (function () {
    function ConditionSelectModel(containerProps, conditionsProps, jsonProperty) {
        this.containerProps = containerProps;
        this.conditionsProps = conditionsProps;
        this.jsonProperty = jsonProperty;
    }
    return ConditionSelectModel;
}());
var ConditionTextNumberModel = /** @class */ (function () {
    function ConditionTextNumberModel(containerProps, conditionsProps, jsonProperty) {
        this.containerProps = containerProps;
        this.conditionsProps = conditionsProps;
        this.jsonProperty = jsonProperty;
    }
    return ConditionTextNumberModel;
}());
var ConditionRadioButtonModel = /** @class */ (function () {
    function ConditionRadioButtonModel(containerProps, conditionsProps, jsonProperty) {
        this.containerProps = containerProps;
        this.conditionsProps = conditionsProps;
        this.jsonProperty = jsonProperty;
    }
    return ConditionRadioButtonModel;
}());
var ConditionTextAreaModel = /** @class */ (function () {
    function ConditionTextAreaModel(containerProps, conditionsProps, jsonProperty) {
        this.containerProps = containerProps;
        this.conditionsProps = conditionsProps;
        this.jsonProperty = jsonProperty;
    }
    return ConditionTextAreaModel;
}());
var ConditionTextModel = /** @class */ (function () {
    function ConditionTextModel(containerProps, conditionsProps, jsonProperty) {
        this.containerProps = containerProps;
        this.conditionsProps = conditionsProps;
        this.jsonProperty = jsonProperty;
    }
    return ConditionTextModel;
}());
var ConditionDateModel = /** @class */ (function () {
    function ConditionDateModel(containerProps, conditionsProps, jsonProperty) {
        this.containerProps = containerProps;
        this.conditionsProps = conditionsProps;
        this.jsonProperty = jsonProperty;
    }
    return ConditionDateModel;
}());
var ConditionSearchModel = /** @class */ (function () {
    function ConditionSearchModel(containerProps, conditionsProps) {
        this.containerProps = containerProps;
        this.conditionsProps = conditionsProps;
    }
    return ConditionSearchModel;
}());
var ConditionRangePickerModel = /** @class */ (function () {
    function ConditionRangePickerModel(containerProps, conditionsProps, jsonProperty) {
        this.containerProps = containerProps;
        this.conditionsProps = conditionsProps;
        this.jsonProperty = jsonProperty;
    }
    return ConditionRangePickerModel;
}());
var ConditionCheckBoxModel = /** @class */ (function () {
    function ConditionCheckBoxModel(containerProps, conditionsProps, jsonProperty) {
        this.containerProps = containerProps;
        this.conditionsProps = conditionsProps;
        this.jsonProperty = jsonProperty;
    }
    return ConditionCheckBoxModel;
}());
var ProConditions = /** @class */ (function () {
    function ProConditions(options) {
        this.global = null;
        this.mobxStore = null;
        // super()
        if (options) {
            if (options.global) {
                this.global = options.global;
            }
            if (options.store) ;
            if (typeof options.store === 'function' && options.store.meta) {
                var stores = getInjector();
                this.mobxStore = stores.getState(options.store);
            }
        }
    }
    ProConditions.prototype.getConditionsConfig = function (componentConfigKey) {
        return this[componentConfigKey];
    };
    ProConditions.prototype.renderSelectConfig = function (options) {
        var id = options.containerProps.name;
        this[id] = new ConditionSelectModel(options.containerProps, options.conditionsProps, options.jsonProperty);
        return this[id];
    };
    ProConditions.prototype.renderTextNumberConfig = function (options) {
        var id = options.containerProps.name;
        this[id] = new ConditionTextNumberModel(options.containerProps, options.conditionsProps, options.jsonProperty);
        return this[id];
    };
    ProConditions.prototype.renderRadioButtonConfig = function (options) {
        var id = options.containerProps.name;
        this[id] = new ConditionRadioButtonModel(options.containerProps, options.conditionsProps, options.jsonProperty);
        return this[id];
    };
    ProConditions.prototype.renderTextAreaConfig = function (options) {
        var id = options.containerProps.name;
        this[id] = new ConditionTextAreaModel(options.containerProps, options.conditionsProps, options.jsonProperty);
        return this[id];
    };
    ProConditions.prototype.renderTextConfig = function (options) {
        var id = options.containerProps.name;
        this[id] = new ConditionTextModel(options.containerProps, options.conditionsProps, options.jsonProperty);
        return this[id];
    };
    ProConditions.prototype.renderDateConfig = function (options) {
        var id = options.containerProps.name;
        this[id] = new ConditionDateModel(options.containerProps, options.conditionsProps, options.jsonProperty);
        return this[id];
    };
    ProConditions.prototype.renderRangePickerConfig = function (options) {
        var id = options.containerProps.name;
        this[id] = new ConditionRangePickerModel(options.containerProps, options.conditionsProps, options.jsonProperty);
        return this[id];
    };
    ProConditions.prototype.renderCheckBoxConfig = function (options) {
        var id = options.containerProps.name;
        this[id] = new ConditionCheckBoxModel(options.containerProps, options.conditionsProps, options.jsonProperty);
        return this[id];
    };
    ProConditions.prototype.renderSearchConfig = function (options) {
        var id = options.containerProps.name;
        this[id] = new ConditionSearchModel(options.containerProps, options.conditionsProps);
        return this[id];
    };
    return ProConditions;
}());

var RadioButton = Radio.Button;
var RadioGroup = Radio.Group;
var RangePicker = DatePicker.RangePicker;
var Option = Select.Option;
var TextArea = Input.TextArea;
var baseCls = "legions-pro-query";
var LegionsProConditions = /** @class */ (function (_super) {
    __extends(LegionsProConditions, _super);
    // @ts-ignore
    /* MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver
    observer= null */
    function LegionsProConditions(props) {
        var _this = _super.call(this, props) || this;
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
            collapsed: true,
        };
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
        _this.consoleLog('constructor');
        return _this;
    }
    Object.defineProperty(LegionsProConditions.prototype, "viewStore", {
        //@ts-ignore
        get: function () {
            return this.props.store.HlQueryConditionContainer.get(this.uid);
        },
        enumerable: false,
        configurable: true
    });
    LegionsProConditions.prototype.consoleLog = function (type, logObj) {
        var obj = logObj || {};
        var name = 'LegionsConditionsDebug';
        if (window[name] && typeof window[name] === 'function') {
            window[name](__assign(__assign({ store: this.viewStore, state: this.state }, obj), { that: this }), "name-" + type);
        }
    };
    LegionsProConditions.prototype.componentWillMount = function () {
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
                    var selectConfigs = _this.props.query.filter(function (item) { return item instanceof ConditionSelectModel; });
                    var index = selectConfigs.findIndex(function (item) { return item.containerProps.name === name; });
                    var newData = [];
                    var optionItem = new HlLabeledValue();
                    if (index > -1) {
                        var item = selectConfigs[index].conditionsProps;
                        newData = item.options;
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
                    var selectConfigs = _this.props.query.filter(function (item) { return item instanceof ConditionSelectModel; });
                    var index = selectConfigs.findIndex(function (item) { return item.containerProps.name === name; });
                    if (index > -1) {
                        var item = selectConfigs[index].conditionsProps;
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
        this.consoleLog('componentWillMount');
    };
    LegionsProConditions.prototype.componentDidMount = function () {
        var queryDom = document.querySelector("." + this.uid);
        var store = this.props.store.get(this.uid);
        if (queryDom && store) {
            this.onDidMount();
            window.addEventListener && window.addEventListener('resize', this.resize.bind(this));
        }
        this.dispatchRequest();
        this.consoleLog('componentDidMount');
    };
    LegionsProConditions.prototype.componentWillReceiveProps = function (nextProps) {
        this.consoleLog('componentWillReceiveProps');
    };
    LegionsProConditions.prototype.componentWillUnmount = function () {
        if (!this.props['uniqueUid']) {
            this.props.store.delete(this.uid);
        }
        window.removeEventListener && window.removeEventListener('resize', this.resize.bind(this));
        this.consoleLog('componentWillUnmount');
    };
    LegionsProConditions.prototype.componentDidUpdate = function () {
        this.onDidMount();
        this.consoleLog('componentDidUpdate');
    };
    LegionsProConditions.prototype.dispatchRequest = function () {
        var _this = this;
        var query = this.props.query;
        query.map(function (item) {
            if (item instanceof ConditionSelectModel) {
                var props = item.conditionsProps;
                if (props.autoQuery && (props.autoQuery.isInitialize === void 0 || props.autoQuery.isInitialize)) {
                    _this.viewStore.dispatchRequest(item.containerProps.name, props.autoQuery, {
                        pageIndex: 1,
                    });
                }
            }
        });
    };
    LegionsProConditions.prototype.onDidMount = function () {
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
    /**
     * 设置指定元素显示隐藏
     *
     * @template T state 类型
     * @param {string} name JsonProperty.name
     * @param {T} state
     * @memberof QueryConditions
     */
    LegionsProConditions.prototype.setFieldState = function (fieldsStates) {
        var newFieldsName = fieldsStates.map(function (item) { return item.name; });
        var oldFieldsStates = this.state.fieldsStates.filter(function (item) { return !newFieldsName.includes(item.name); });
        this.setState({ fieldsStates: __spread(oldFieldsStates, fieldsStates) });
    };
    /**
     * 设置指定元素value值
     *
     * @template T value 类型
     * @param {string} fieldName JsonProperty.name
     * @param {T} value
     * @memberof QueryConditions
     */
    LegionsProConditions.prototype.setFieldsValue = function (fieldsValues) {
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
    LegionsProConditions.prototype.initVModel = function () {
        var query = this.props.query;
        var data = {};
        var prams = {};
        query.map(function (item) {
            if (!(item instanceof ConditionSearchModel) && item.jsonProperty) {
                if (isArray(item.conditionsProps.defaultValue)) {
                    data[item.containerProps.name] = __spread(item.conditionsProps.defaultValue);
                }
                else {
                    data[item.containerProps.name] = item.conditionsProps.defaultValue || item.conditionsProps.value;
                }
                prams[item.jsonProperty] = data[item.containerProps.name];
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
    LegionsProConditions.prototype.mapQueryValue = function () {
        var _this = this;
        var query = this.props.query;
        var prams = this.state.queryPrams;
        query.map(function (item) {
            if (!(item instanceof ConditionSearchModel)) {
                prams[item.jsonProperty] = _this.state.vmModel[item.containerProps.name];
            }
        });
        this.setState({
            queryPrams: prams
        });
        this.viewStore.setQuery(__assign(__assign({}, this.viewStore.computedQuery), prams));
    };
    LegionsProConditions.prototype.reset = function () {
        var _this = this;
        var data = this.state.vmModel;
        /* let data = {...this.viewStore.computedVmModel} */
        Object.keys(data).forEach(function (key) {
            var entity = _this.props.query.find(function (item) { return item.containerProps.name === key; });
            if (entity && !(entity instanceof ConditionSearchModel) && !entity.conditionsProps.isNotReset) {
                if (entity.conditionsProps.onReset) {
                    data[key] = entity.conditionsProps.onReset(key, data[key]);
                }
                else {
                    data[key] = entity.conditionsProps.defaultValue || '';
                }
            }
        });
        this.setState({
            vmModel: data
        });
        this.viewStore.setVmModel(data);
        this.mapQueryValue();
    };
    LegionsProConditions.prototype.handleChangeDate = function (component, datas, dateString) {
        var name = component.containerProps.name;
        var value = dateString;
        var data = this.state.vmModel;
        //@ts-ignore
        if (Array.isArray(datas) && datas.length === 0) { // 日期多选
            data[name] = [];
        }
        else {
            data[name] = value;
        }
        this.setState({
            vmModel: data
        });
        this.viewStore.setVmModel(__assign({}, data));
        if (component instanceof ConditionDateModel) {
            //@ts-ignore
            component.conditionsProps.onChange && component.conditionsProps.onChange.call(this, datas, dateString);
        }
        else if (component instanceof ConditionRangePickerModel) {
            //@ts-ignore
            component.conditionsProps.onChange && component.conditionsProps.onChange.call(this, datas, dateString);
        }
    };
    LegionsProConditions.prototype.handleChangeChx = function (component, even) {
        var value = even.target.checked;
        var data = this.state.vmModel;
        data[component.containerProps.name] = value;
        this.setState({
            vmModel: data
        });
        this.viewStore.setVmModel(__assign({}, data));
        component.conditionsProps.onChange && component.conditionsProps.onChange.call(this, even, cloneDeep(data));
    };
    LegionsProConditions.prototype.handleSelectSearch = function (component, value) {
        var props = component.conditionsProps;
        props.onSearch && props.onSearch(value);
    };
    LegionsProConditions.prototype.handleChangeSelect = function (component, even, keyValue) {
        var value = even;
        var props = component.conditionsProps;
        var name = component.containerProps.name;
        if (Object.prototype.toString.call(even) === '[object Object]') {
            if (even.target) {
                value = even.target.value;
            }
            else if (props.labelInValue) {
                value = even.key;
            }
        }
        if (isArray(even)) {
            value = even;
        }
        var data = this.state.vmModel;
        if (props.mode === 'combobox') {
            var entity = props.options.find(function (item) { return item.key === value; });
            if (props.labelInValue) {
                data[name] = even;
            }
            else {
                data[name] = entity ? entity.value : value;
            }
        }
        else {
            data[name] = props.labelInValue ? even : value;
        }
        if (value instanceof Array) {
            if (!value.every(function (item) { return item; })) {
                data[name] = '';
            }
        }
        this.setState({
            vmModel: data
        });
        this.viewStore.setVmModel(__assign({}, data));
        //@ts-ignore
        props.onChange && props.onChange.call(this, even, keyValue, cloneDeep(data));
    };
    /**
     * 重置数据
     *
     * @memberof QueryConditions
     */
    LegionsProConditions.prototype.handleReset = function (h) {
        this.reset();
        this.mapQueryValue();
        var item = this.props.query.find(function (item) { return item instanceof ConditionSearchModel; });
        if (item && item instanceof ConditionSearchModel) {
            item.conditionsProps.onReset && item.conditionsProps.onReset.call(this, cloneDeep(this.state.queryPrams), this.viewStore);
        }
    };
    /**
     * 搜索事件
     *
     * @memberof QueryConditions
     */
    LegionsProConditions.prototype.handleSearch = function () {
        this.mapQueryValue();
        var item = this.props.query.find(function (item) { return item instanceof ConditionSearchModel; });
        if (item && item instanceof ConditionSearchModel) {
            console.log(item, 'item');
            item.conditionsProps.onSearch && item.conditionsProps.onSearch.call(this, cloneDeep(this.state.queryPrams), this.viewStore);
        }
        this.consoleLog('handleSearch', { stateParams: cloneDeep(this.state.queryPrams) });
    };
    /**
     * 回车搜索
     *
     * @param {Function} onEnter
     * @memberof QueryConditions
     */
    LegionsProConditions.prototype.handleEnter = function (onEnter) {
        onEnter && onEnter.call(this, this.state.vmModel);
        this.handleSearch();
    };
    LegionsProConditions.prototype.handleToggle = function () {
        var _this = this;
        if (this.state.collapsed) {
            this.setState({
                collapsed: false
            }, function () {
                var queryDom = document.querySelector("." + _this.uid);
                var height = findDOMNode(queryDom).clientHeight;
                _this.viewStore.domHeight = height;
                _this.props.onToggle && _this.props.onToggle(false, _this.viewStore);
                _this.props.onDidMount && _this.props.onDidMount({ height: height, uid: _this.uid });
            });
        }
        else {
            this.setState({
                collapsed: true
            }, function () {
                var queryDom = document.querySelector("." + _this.uid);
                var height = findDOMNode(queryDom).clientHeight;
                _this.viewStore.domHeight = height;
                _this.props.onToggle && _this.props.onToggle(false, _this.viewStore);
                _this.props.onDidMount && _this.props.onDidMount({ height: height, uid: _this.uid });
            });
        }
    };
    LegionsProConditions.prototype.formatTrim = function (str) {
        if (str) {
            return str.replace(/(^\s+)|(\s+$)/g, "");
        }
        return str;
    };
    LegionsProConditions.prototype.handleChange = function (component, even) {
        var value = even;
        var name = component.containerProps.name;
        var props = component.conditionsProps;
        if (typeof even === 'object') {
            value = even.target.value;
        }
        var data = this.state.vmModel;
        data[name] = value;
        if (component instanceof ConditionTextModel) {
            data[name] = this.formatTrim(value);
        }
        this.setState({
            vmModel: data
        });
        this.viewStore.setVmModel(__assign({}, data));
        //@ts-ignore
        props.onChange && props.onChange.call(this, even, cloneDeep(data));
    };
    LegionsProConditions.prototype.renderComponent = function (component) {
        if (component instanceof ConditionTextAreaModel) {
            return this.renderInputTextArea(component);
        }
        else if (component instanceof ConditionTextModel) {
            return this.renderInput(component);
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
            throw new Error("\n            ProConditions: Unknown query. query = " + JSON.stringify(component));
        }
    };
    LegionsProConditions.prototype.renderInput = function (component) {
        var _this = this;
        var conditionsProps = component.conditionsProps, containerProps = component.containerProps, jsonProperty = component.jsonProperty;
        var placeholder = conditionsProps.placeholder;
        if (this.viewStore && this.viewStore.computedSize === 'small') {
            placeholder = '';
        }
        var labelSpan = conditionsProps.labelSpan, defaultValue = conditionsProps.defaultValue, prop = __rest(conditionsProps, ["labelSpan", "defaultValue"]);
        var onEnter = conditionsProps.onEnter;
        var vmValue = this.state.vmModel[containerProps.name];
        /* const vmValue  = this.viewStore.computedVmModel[JsonProperty.name] */
        var suffix = vmValue ? React.createElement(Icon, { type: "close-circle", onClick: function () {
                var state = _this.state.vmModel;
                /* let state ={...this.viewStore.computedVmModel} */
                state[containerProps.name] = '';
                _this.setState({
                    vmModel: state
                });
                _this.viewStore.setVmModel(state);
                _this.mapQueryValue();
            } }) : null;
        return (React.createElement(Tooltip, { trigger: "focus", title: (this.formatTrim(vmValue)) ? React.createElement("pre", null, vmValue.replace('↵', ',')) : null, placement: "topLeft" },
            React.createElement(Input, __assign({ maxLength: '50' }, prop, { suffix: suffix, value: vmValue, onPressEnter: this.handleEnter.bind(this, onEnter), onChange: this.handleChange.bind(this, component), placeholder: placeholder }))));
    };
    LegionsProConditions.prototype.renderInputTextArea = function (component) {
        var conditionsProps = component.conditionsProps, containerProps = component.containerProps, jsonProperty = component.jsonProperty;
        var placeholder = conditionsProps.placeholder;
        if (this.viewStore && this.viewStore.computedSize === 'small') {
            placeholder = '';
        }
        var labelSpan = conditionsProps.labelSpan, defaultValue = conditionsProps.defaultValue, prop = __rest(conditionsProps, ["labelSpan", "defaultValue"]);
        var themProps = __rest(prop, ["onReset"]);
        var onEnter = conditionsProps.onEnter;
        var vmValue = this.state.vmModel[containerProps.name];
        /* const vmValue  = this.viewStore.computedVmModel[JsonProperty.name] */
        return (React.createElement(Tooltip, { overlayClassName: "legions-pro-query-tooltip", trigger: "focus", title: (this.formatTrim(vmValue)) ? React.createElement("pre", null, vmValue.replace('↵', ',')) : null, placement: "topLeft" },
            React.createElement(TextArea, __assign({ maxLength: 1500, autosize: { minRows: 1, maxRows: 1 } }, themProps, { value: vmValue, onPressEnter: this.handleEnter.bind(this, onEnter), onChange: this.handleChange.bind(this, component), placeholder: placeholder }))));
    };
    LegionsProConditions.prototype.renderSelect = function (component) {
        var conditionsProps = component.conditionsProps, containerProps = component.containerProps, jsonProperty = component.jsonProperty;
        var placeholder = conditionsProps.placeholder;
        var newData = conditionsProps.options;
        var labelSpan = conditionsProps.labelSpan, defaultValue = conditionsProps.defaultValue, prop = __rest(conditionsProps, ["labelSpan", "defaultValue"]);
        var vmValue = this.state.vmModel[containerProps.name];
        /* let vmValue = this.viewStore.computedVmModel[JsonProperty.name] */
        /* if (isObservableArray(vmValue) && vmValue.length === 0) {
            vmValue =[]
        } */
        var firstActiveValue = newData.length > 0 ? ["" + newData[0].key] : '';
        var autoObData = this.viewStore.selectOptions.get(containerProps.name);
        if (autoObData && prop.autoQuery) {
            var autoData = prop.autoQuery.transform(autoObData.obData);
            newData = autoData.data;
        }
        return (
        // @ts-ignore mode 为tags时，可以把随意输入的条目作为 tag，输入项不需要与下拉选项匹配
        React.createElement("div", null,
            React.createElement(LegionsProSelect
            // notFoundContent={prop.loading? <Spin size="small" /> : null}
            , __assign({}, prop, { style: { width: '100%' }, placeholder: placeholder, onSearch: this.handleSelectSearch.bind(this, component), onChange: this.handleChangeSelect.bind(this, component), value: vmValue, options: newData, allowClear: true, showSearch: true, defaultActiveFirstOption: true, optionFilterProp: "children" }))));
    };
    LegionsProConditions.prototype.renderDate = function (component) {
        var conditionsProps = component.conditionsProps, containerProps = component.containerProps, jsonProperty = component.jsonProperty;
        var placeholder = conditionsProps.placeholder;
        var labelSpan = conditionsProps.labelSpan, defaultValue = conditionsProps.defaultValue, prop = __rest(conditionsProps, ["labelSpan", "defaultValue"]);
        var vmValue = this.state.vmModel[containerProps.name];
        /* const vmValue  = this.viewStore.computedVmModel[JsonProperty.name] */
        var value = vmValue;
        value = value ? moment(value, prop.format) : void 0;
        return (React.createElement(DatePicker, __assign({}, prop, { style: { width: '100%' }, placeholder: placeholder, value: value, onChange: this.handleChangeDate.bind(this, component) })));
    };
    LegionsProConditions.prototype.renderDateRange = function (component) {
        var conditionsProps = component.conditionsProps, containerProps = component.containerProps, jsonProperty = component.jsonProperty;
        var labelSpan = conditionsProps.labelSpan, defaultValue = conditionsProps.defaultValue, prop = __rest(conditionsProps, ["labelSpan", "defaultValue"]);
        var placeholder = conditionsProps.placeholder;
        var vmValue = this.state.vmModel[containerProps.name];
        /*  const vmValue  = this.viewStore.computedVmModel[JsonProperty.name] */
        var value = vmValue;
        value = (value && value.length) ? [moment(value[0], prop.format), moment(value[1], prop.format)] : [void 0, void 0];
        return (React.createElement(RangePicker, __assign({ allowClear: true }, prop, { value: value, onChange: this.handleChangeDate.bind(this, component), placeholder: placeholder })));
    };
    LegionsProConditions.prototype.renderChxBox = function (component) {
        var conditionsProps = component.conditionsProps, containerProps = component.containerProps, jsonProperty = component.jsonProperty;
        var labelSpan = conditionsProps.labelSpan, prop = __rest(conditionsProps, ["labelSpan"]);
        var placeholder = conditionsProps.placeholder;
        var vmValue = this.state.vmModel[containerProps.name];
        /* const vmValue  = this.viewStore.computedVmModel[JsonProperty.name] */
        var value = vmValue === '' ? false : vmValue;
        return (React.createElement(Checkbox, { onChange: this.handleChangeChx.bind(this, component), checked: value }, conditionsProps.label));
    };
    LegionsProConditions.prototype.renderInputNumber = function (component) {
        var _this = this;
        var conditionsProps = component.conditionsProps, containerProps = component.containerProps, jsonProperty = component.jsonProperty;
        var labelSpan = conditionsProps.labelSpan, defaultValue = conditionsProps.defaultValue, prop = __rest(conditionsProps, ["labelSpan", "defaultValue"]);
        var placeholder = conditionsProps.placeholder;
        if (this.viewStore && this.viewStore.computedSize === 'small') {
            placeholder = '';
        }
        var onEnter = conditionsProps.onEnter;
        var vmValue = this.state.vmModel[containerProps.name];
        /* const vmValue  = this.viewStore.computedVmModel[JsonProperty.name] */
        return (React.createElement(InputNumber, __assign({}, prop, { onKeyDown: function (value) {
                if (value && value['key'] && value['key'] === 'Enter') {
                    _this.handleEnter.call(_this, onEnter);
                }
            }, style: { width: '100%' }, value: vmValue, onChange: this.handleChange.bind(this, component), placeholder: placeholder })));
    };
    LegionsProConditions.prototype.renderRadioButton = function (component) {
        var conditionsProps = component.conditionsProps, containerProps = component.containerProps, jsonProperty = component.jsonProperty;
        var labelSpan = conditionsProps.labelSpan, defaultValue = conditionsProps.defaultValue, options = conditionsProps.options, prop = __rest(conditionsProps, ["labelSpan", "defaultValue", "options"]);
        var newData = options;
        var vmValue = this.state.vmModel[containerProps.name];
        /* const vmValue  = this.viewStore.computedVmModel[JsonProperty.name] */
        return (React.createElement(RadioGroup, __assign({}, prop, { style: { width: '100%' }, value: vmValue, onChange: this.handleChange.bind(this, component) }), newData && newData.map(function (item) {
            return (React.createElement(RadioButton, { key: item.value + "-" + containerProps.name, disabled: item.disabled, value: item.value }, item.label));
        })));
    };
    LegionsProConditions.prototype.renderSearch = function (component) {
        var _this = this;
        var conditionsProps = component.conditionsProps, containerProps = component.containerProps;
        var prop = __rest(conditionsProps, []);
        var menu = (React.createElement(Menu, { selectedKeys: [this.viewStore.computedSize], onClick: function (item) {
                var size = item.key;
                // @ts-ignore
                _this.viewStore.setSize(size);
            } },
            React.createElement(Menu.Item, { key: "small" }, "\u7D27\u51D1"),
            React.createElement(Menu.Item, { key: "default" }, "\u8212\u9002")));
        return React.createElement(React.Fragment, null,
            React.createElement(Row, { gutter: 8, type: "flex" },
                React.createElement(Col, { span: 6 },
                    React.createElement(Button, { type: "primary", icon: 'search', onClick: this.handleSearch.bind(this), style: { borderColor: "#46b8da", color: "white" } }, "" + '搜索')),
                React.createElement(Col, { span: 6 },
                    React.createElement(Dropdown.Button, { type: "ghost", onClick: this.handleReset.bind(this), overlay: menu }, "\u91CD\u7F6E")),
                React.createElement(Col, { span: 4 }, React.createElement(Button, { style: { width: '100%', padding: '0 2px' }, 
                    //@ts-ignore
                    title: "\u5237\u65B0" },
                    React.createElement(Icon, { type: "sync", title: "\u5237\u65B0" }))),
                React.createElement(Col, { span: 8 },
                    React.createElement(Button, { type: "ghost", icon: this.state.collapsed ? 'down' : 'up', onClick: this.handleToggle.bind(this), style: { backgroundColor: "#fff", borderColor: "#46b8da" } }, this.state.collapsed ? '收起' : '展开'))));
    };
    LegionsProConditions.prototype.renderLabel = function (component) {
        if (!(component instanceof ConditionSearchModel)) {
            return (this.viewStore.computedSize === 'small' ? React.createElement("label", { title: component.conditionsProps.label, style: {
                    float: 'left', marginLeft: '5px', marginRight: '3px',
                    position: 'absolute', zIndex: 999, background: '#fff',
                    height: '20px', lineHeight: '20px',
                    color: '#999', top: '-3px', fontSize: 10,
                    //@ts-ignore
                    webkitTransform: 'scale(0.9)'
                } }, component instanceof ConditionRadioButtonModel ? '' : component.conditionsProps.label) :
                React.createElement("label", { 
                    //@ts-ignore
                    htmlFor: component.containerProps.name, title: component.conditionsProps.label, style: { lineHeight: '28px', position: 'absolute', right: '0px' } }, component.conditionsProps.label));
        }
        return null;
    };
    LegionsProConditions.prototype.getQueryItemSpan = function (item) {
        var Resolution = item.containerProps.col[this.viewStore.compuedResolution];
        if (typeof Resolution === 'number') {
            return Resolution;
        }
        else if (typeof Resolution === 'object') {
            return Resolution.span || 4;
        }
        else {
            return 4;
        }
    };
    LegionsProConditions.prototype.renderSearchComponent = function () {
        var searchItem = this.props.query.find(function (item) { return item instanceof ConditionSearchModel; });
        var show = [];
        if (searchItem && !Array.isArray(searchItem)) {
            show.push(searchItem);
        }
        return this.renderQueryComponent(show);
    };
    LegionsProConditions.prototype.renderShowComponent = function (hide) {
        var _this = this;
        var searchItem = this.props.query.find(function (item) { return item instanceof ConditionSearchModel; });
        var searchSpan = 0;
        if (searchItem && !Array.isArray(searchItem)) {
            searchSpan = this.getQueryItemSpan(searchItem);
        }
        var unUsedSpan = 24 - searchSpan;
        var show = [];
        this.props.query.filter(function (item) { return !(item instanceof ConditionSearchModel); }).map(function (item) {
            var currSpan = _this.getQueryItemSpan(item);
            if (unUsedSpan >= currSpan) {
                show.push(item);
                unUsedSpan = unUsedSpan - currSpan;
            }
            else {
                hide.push(item);
            }
        });
        return this.renderQueryComponent(show);
    };
    LegionsProConditions.prototype.renderQueryComponent = function (list) {
        var _this = this;
        return list.map(function (item) {
            var labelSpan = (item instanceof ConditionCheckBoxModel || (item instanceof ConditionSearchModel)) ? 1 : (item.conditionsProps.labelSpan || 4);
            var offset = item instanceof ConditionCheckBoxModel ? { offset: 1 } : {};
            return React.createElement(Col, __assign({}, item.containerProps.col, { key: item.containerProps.name, style: { paddingBottom: '6px' } }),
                (item instanceof ConditionCheckBoxModel) || (item instanceof ConditionSearchModel) ? null : React.createElement(Col, { className: "legions-pro-query-label", span: labelSpan }, _this.renderLabel(item)),
                React.createElement(Col, __assign({ style: { lineHeight: '28px' } }, offset, { span: 24 - labelSpan }), _this.renderComponent(item)));
        });
    };
    LegionsProConditions.prototype.render = function () {
        var hide = [];
        return (React.createElement(Row, { className: baseCls + " " + this.uid, gutter: 8, type: "flex" },
            this.renderShowComponent(hide),
            this.renderSearchComponent(),
            this.state.collapsed && this.renderQueryComponent(hide)));
    };
    /* search =debounce((options,val)=>{
       options&&options.props.onSearch&&options.props.onSearch(val)
    },200) */
    LegionsProConditions.ProConditions = ProConditions;
    LegionsProConditions.defaultProps = {
        size: 'default',
        defaultToggle: false,
    };
    LegionsProConditions = __decorate([
        bind({ store: ProQueryConditionStore }),
        observer,
        __metadata("design:paramtypes", [Object])
    ], LegionsProConditions);
    return LegionsProConditions;
}(React.Component));

/*
 * @Author: duanguang
 * @Date: 2021-01-04 16:30:32
 * @LastEditTime: 2021-02-03 11:49:08
 * @LastEditors: duanguang
 * @Description:
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/LegionsProQueryConditions/index.tsx
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */

export default LegionsProConditions;
