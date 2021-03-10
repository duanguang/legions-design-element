/**
  *  legions-pro-design v0.0.7-beta.10
  * (c) 2021 duanguang
  * @license MIT
  */
import React from 'react';
import './style/index.less';
import { Radio, DatePicker, Select, Input, Checkbox, Icon, Tooltip, InputNumber, Menu, Row, Col, Button, Dropdown } from 'antd';
import moment from 'moment';
import { bind, observer } from 'legions/store-react';
import LegionsProSelect from '../LegionsProSelect';
import LegionsStoreConditions from '../LegionsStoreConditions';
import { shortHash } from 'legions-lunar/object-hash';
import { findDOMNode } from 'react-dom';
import { debounce } from 'legions-utils-tool/debounce';
import { cloneDeep } from 'lodash';
import { HlLabeledValue } from 'legions-lunar/model';
import { getInjector } from 'legions/store';
import { isArray } from 'legions-utils-tool/type.validation';
import LegionsProDragger from '../LegionsProDragger';

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
var ConditionGroupCheckBoxModel = /** @class */ (function () {
    function ConditionGroupCheckBoxModel(containerProps, conditionsProps, jsonProperty) {
        this.containerProps = containerProps;
        this.conditionsProps = conditionsProps;
        this.jsonProperty = jsonProperty;
    }
    return ConditionGroupCheckBoxModel;
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
    ProConditions.prototype.createUid = function (name) {
        var timeId = new Date().getTime();
        var uid = name + "-" + shortHash("" + timeId + name);
        return uid;
    };
    ProConditions.prototype.createContainerProps = function (props) {
        var id = props.name;
        if (!this[id]) {
            return __assign(__assign({}, props), { uuid: this.createUid(id) });
        }
        return this[id]['containerProps'];
    };
    ProConditions.prototype.getConditionsConfig = function (componentConfigKey) {
        return this[componentConfigKey];
    };
    ProConditions.prototype.renderSelectConfig = function (options) {
        var id = options.containerProps.name;
        this[id] = new ConditionSelectModel(this.createContainerProps(options.containerProps), options.conditionsProps, options.jsonProperty);
        return this[id];
    };
    ProConditions.prototype.renderTextNumberConfig = function (options) {
        var id = options.containerProps.name;
        this[id] = new ConditionTextNumberModel(this.createContainerProps(options.containerProps), options.conditionsProps, options.jsonProperty);
        return this[id];
    };
    ProConditions.prototype.renderRadioButtonConfig = function (options) {
        var id = options.containerProps.name;
        this[id] = new ConditionRadioButtonModel(this.createContainerProps(options.containerProps), options.conditionsProps, options.jsonProperty);
        return this[id];
    };
    ProConditions.prototype.renderTextAreaConfig = function (options) {
        var id = options.containerProps.name;
        this[id] = new ConditionTextAreaModel(this.createContainerProps(options.containerProps), options.conditionsProps, options.jsonProperty);
        return this[id];
    };
    ProConditions.prototype.renderTextConfig = function (options) {
        var id = options.containerProps.name;
        this[id] = new ConditionTextModel(this.createContainerProps(options.containerProps), options.conditionsProps, options.jsonProperty);
        return this[id];
    };
    ProConditions.prototype.renderDateConfig = function (options) {
        var id = options.containerProps.name;
        this[id] = new ConditionDateModel(this.createContainerProps(options.containerProps), options.conditionsProps, options.jsonProperty);
        return this[id];
    };
    ProConditions.prototype.renderRangePickerConfig = function (options) {
        var id = options.containerProps.name;
        this[id] = new ConditionRangePickerModel(this.createContainerProps(options.containerProps), options.conditionsProps, options.jsonProperty);
        return this[id];
    };
    ProConditions.prototype.renderCheckBoxConfig = function (options) {
        var id = options.containerProps.name;
        this[id] = new ConditionCheckBoxModel(this.createContainerProps(options.containerProps), options.conditionsProps, options.jsonProperty);
        return this[id];
    };
    ProConditions.prototype.renderGroupCheckBoxConfig = function (options) {
        var id = options.containerProps.name;
        this[id] = new ConditionGroupCheckBoxModel(this.createContainerProps(options.containerProps), options.conditionsProps, options.jsonProperty);
        return this[id];
    };
    ProConditions.prototype.renderSearchConfig = function (options) {
        var id = options.containerProps.name;
        this[id] = new ConditionSearchModel(this.createContainerProps(options.containerProps), options.conditionsProps);
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
        _this.queryPrams = {};
        _this.state = {
            collapsed: _this.props.defaultCollapsed,
        };
        if (_this.props['uniqueUid']) {
            _this.uid = "Query" + shortHash(_this.props['uniqueUid']);
        }
        else {
            _this.uid = "Query" + _this.props.store.ConditionContainer.size + shortHash("" + _this.timeId + _this.props.store.ConditionContainer.size);
            if (_this.props.store.ConditionContainer.has(_this.uid)) {
                _this.timeId = new Date().getTime();
                _this.uid = "Query" + _this.props.store.ConditionContainer.size + shortHash("" + _this.timeId + _this.props.store.ConditionContainer.size);
            }
        }
        _this.consoleLog('constructor');
        return _this;
    }
    Object.defineProperty(LegionsProConditions.prototype, "viewStore", {
        //@ts-ignore
        get: function () {
            return this.props.store.ConditionContainer.get(this.uid);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LegionsProConditions.prototype, "vmModel", {
        get: function () {
            return this.viewStore.computedVmModel;
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
        if (!this.props.store.ConditionContainer.has(this.uid)) {
            this.props.store.add(this.uid);
            this.initVModel();
            this.viewStore._initQuery(this.props.query);
        }
        this.viewStore._setSize(this.props.size);
        this.props.onReady && this.props.onReady({
            store: this.props.store, uid: this.uid, viewModel: this.viewStore,
            methods: {
                reset: function () {
                    _this.handleReset();
                },
                addQuery: function (list) {
                    _this.initVModel(list);
                    _this.viewStore._initQuery(list);
                    _this.dispatchRequest(list);
                },
                removeQuery: function (uuid) {
                    return _this.viewStore._removeQuery(uuid);
                },
                setFieldsValues: function (name, callback) {
                    _this.setFieldsValues(name, callback);
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
                onRrmoteSearch: function (name, params) {
                    var selectConfigs = _this.props.query.filter(function (item) { return item instanceof ConditionSelectModel; });
                    var index = selectConfigs.findIndex(function (item) { return item.containerProps.name === name; });
                    if (index > -1) {
                        var item = selectConfigs[index].conditionsProps;
                        if (item.autoQuery) {
                            _this.viewStore._dispatchRequest(name, item.autoQuery, params);
                        }
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
    LegionsProConditions.prototype.dispatchRequest = function (query) {
        var _this = this;
        if (query === void 0) { query = this.props.query; }
        query.map(function (item) {
            if (item instanceof ConditionSelectModel) {
                var props = item.conditionsProps;
                if (props.autoQuery && (props.autoQuery.isInitialize === void 0 || props.autoQuery.isInitialize)) {
                    _this.viewStore._dispatchRequest(item.containerProps.name, props.autoQuery, {
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
    LegionsProConditions.prototype.setFieldsValues = function (name, callback) {
        this.viewStore._setQueryState(name, function (value) {
            callback(value);
        });
    };
    LegionsProConditions.prototype.initVModel = function (query) {
        if (query === void 0) { query = this.props.query; }
        var data = {};
        var prams = {};
        query.map(function (item) {
            var name = item.containerProps.name;
            if (!(item instanceof ConditionSearchModel) && item.jsonProperty) {
                if (isArray(item.conditionsProps.defaultValue)) {
                    if (item instanceof ConditionRangePickerModel) {
                        data[name] = item.conditionsProps.defaultValue.map(function (m) {
                            if (moment.isMoment(m)) {
                                return moment(m).format(item.conditionsProps.format || 'YYYY-MM-DD HH:mm:ss');
                            }
                            return m;
                        });
                    }
                    else {
                        data[name] = __spread(item.conditionsProps.defaultValue);
                    }
                }
                else {
                    var defaultValue = item.conditionsProps.defaultValue;
                    var value = item.conditionsProps.value;
                    if (item instanceof ConditionCheckBoxModel) {
                        defaultValue = item.conditionsProps.defaultChecked;
                        value = item.conditionsProps.checked || item.conditionsProps.value;
                    }
                    var newValue = null;
                    if (item instanceof ConditionDateModel) {
                        var format = item.conditionsProps.format || 'YYYY-MM-DD HH:mm:ss';
                        if (moment.isMoment(defaultValue)) {
                            newValue = moment(defaultValue).format(format);
                        }
                        else if (moment.isMoment(value)) {
                            newValue = moment(value).format(format);
                        }
                        data[name] = newValue;
                    }
                    else {
                        data[name] = defaultValue || value;
                    }
                }
                prams[item.jsonProperty] = data[name];
            }
        });
        this.queryPrams = prams;
        this.viewStore._setVmModel(data);
    };
    /**
     * 把组件元素结果映射至查询条件
     *
     * @memberof QueryConditions
     */
    LegionsProConditions.prototype.mapQueryValue = function () {
        var _this = this;
        var computedQuery = this.viewStore.computedQuery;
        var prams = this.queryPrams;
        computedQuery.map(function (item) {
            if (!(item instanceof ConditionSearchModel)) {
                prams[item.jsonProperty] = _this.vmModel[item.containerProps.name];
            }
        });
        this.queryPrams = prams;
    };
    LegionsProConditions.prototype.reset = function () {
        var _this = this;
        var data = this.vmModel;
        /* let data = {...this.viewStore.computedVmModel} */
        var computedQuery = this.viewStore.computedQuery;
        Object.keys(data).forEach(function (key) {
            var entity = computedQuery.find(function (item) { return item.containerProps.name === key; });
            if (entity && !(entity instanceof ConditionSearchModel) && !entity.conditionsProps.isNotReset) {
                if (entity.conditionsProps.onReset) {
                    data[key] = entity.conditionsProps.onReset(key, data[key]);
                }
                else {
                    var defaultValue_1 = entity.conditionsProps.defaultValue;
                    var format = entity.conditionsProps['format'] || 'YYYY-MM-DD';
                    if (moment.isMoment(defaultValue_1)) {
                        data[key] = moment(defaultValue_1).format(format);
                    }
                    else if (Array.isArray(defaultValue_1) && defaultValue_1.length >= 2) {
                        data[key] = [moment(defaultValue_1[0]).format(format), moment(defaultValue_1[1]).format(format)];
                    }
                    else if (entity instanceof ConditionCheckBoxModel) {
                        data[key] = entity.conditionsProps.defaultChecked;
                        defaultValue_1 = data[key];
                    }
                    else {
                        data[key] = defaultValue_1 || '';
                    }
                    _this.setFieldsValues(entity.containerProps.name, function (value) {
                        if (value instanceof ConditionCheckBoxModel) {
                            value.conditionsProps.checked = defaultValue_1;
                        }
                        else {
                            value.conditionsProps['value'] = defaultValue_1;
                        }
                    });
                }
            }
        });
        this.viewStore._setVmModel(data);
        this.mapQueryValue();
    };
    LegionsProConditions.prototype.handleChangeDate = function (component, datas, dateString) {
        var name = component.containerProps.name;
        var data = this.vmModel;
        this.setFieldsValues(name, function (value) {
            value.conditionsProps['value'] = datas;
        });
        data[name] = dateString;
        if (component instanceof ConditionDateModel) {
            component.conditionsProps.onChange && component.conditionsProps.onChange.call(this, {
                date: datas,
                dateString: dateString
            }, {
                viewState: cloneDeep(data),
                parameter: cloneDeep(this.queryPrams),
            }, this.viewStore);
        }
        else if (component instanceof ConditionRangePickerModel) {
            component.conditionsProps.onChange && component.conditionsProps.onChange.call(this, {
                date: datas,
                dateString: dateString
            }, {
                viewState: cloneDeep(data),
                parameter: cloneDeep(this.queryPrams),
            }, this.viewStore);
        }
        this.viewStore._setVmModel(data);
    };
    LegionsProConditions.prototype.handleChangeChx = function (component, even) {
        var value = even.target.checked;
        var data = this.vmModel;
        var name = component.containerProps.name;
        data[name] = value;
        this.setFieldsValues(name, function (values) {
            values.conditionsProps.checked = value;
        });
        component.conditionsProps.onChange && component.conditionsProps.onChange.call(this, even, {
            viewState: cloneDeep(data),
            parameter: cloneDeep(this.queryPrams),
        }, this.viewStore);
        this.viewStore._setVmModel(data);
    };
    LegionsProConditions.prototype.handleSelectSearch = function (component, value) {
        var props = component.conditionsProps;
        props.onSearch && props.onSearch(value);
    };
    LegionsProConditions.prototype.handleChangeSelect = function (component, even) {
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
        var data = this.vmModel;
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
        this.setFieldsValues(name, function (value) {
            value.conditionsProps.value = data[name];
        });
        props.onChange && props.onChange.call(this, {
            viewState: cloneDeep(data),
            parameter: cloneDeep(this.queryPrams),
        }, this.viewStore);
        this.viewStore._setVmModel(data);
    };
    /**
     * 重置数据
     *
     * @memberof QueryConditions
     */
    LegionsProConditions.prototype.handleReset = function () {
        this.reset();
        this.mapQueryValue();
        var item = this.viewStore.computedQuery.find(function (item) { return item instanceof ConditionSearchModel; });
        if (item && item instanceof ConditionSearchModel) {
            item.conditionsProps.onReset && item.conditionsProps.onReset.call(this, cloneDeep(this.queryPrams), this.viewStore);
        }
    };
    /**
     * 搜索事件
     *
     * @memberof QueryConditions
     */
    LegionsProConditions.prototype.handleSearch = function () {
        this.mapQueryValue();
        var item = this.viewStore.computedQuery.find(function (item) { return item instanceof ConditionSearchModel; });
        if (item && item instanceof ConditionSearchModel) {
            item.conditionsProps.onSearch && item.conditionsProps.onSearch.call(this, cloneDeep(this.queryPrams), this.viewStore);
        }
        this.consoleLog('handleSearch', { stateParams: cloneDeep(this.queryPrams) });
    };
    /**
     * 回车搜索
     *
     * @param {Function} onEnter
     * @memberof QueryConditions
     */
    LegionsProConditions.prototype.handleEnter = function (com) {
        var onEnter = com.conditionsProps['onEnter'];
        onEnter && onEnter.call(this, {
            viewState: cloneDeep(this.vmModel),
            parameter: cloneDeep(this.queryPrams),
        }, this.viewStore);
        this.handleSearch();
    };
    LegionsProConditions.prototype.handleToggle = function () {
        var _this = this;
        var onToggle = function (toggle) {
            var queryDom = document.querySelector("." + _this.uid);
            var height = findDOMNode(queryDom).clientHeight;
            _this.viewStore.domHeight = height;
            _this.props.onCollapse && _this.props.onCollapse(toggle, _this.viewStore);
            _this.props.onDidMount && _this.props.onDidMount({ height: height, uid: _this.uid });
        };
        if (this.state.collapsed) {
            this.setState({
                collapsed: false
            }, function () {
                onToggle(false);
            });
        }
        else {
            this.setState({
                collapsed: true
            }, function () {
                onToggle(true);
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
        var data = this.vmModel;
        data[name] = value;
        if (component instanceof ConditionTextModel) {
            data[name] = this.formatTrim(value);
        }
        this.setFieldsValues(name, function (value) {
            value.conditionsProps['value'] = data[name];
        });
        props['onChange'] && props.onChange.call(this, even, {
            viewState: cloneDeep(data),
            parameter: cloneDeep(this.queryPrams),
        }, this.viewStore);
        this.viewStore._setVmModel(data);
    };
    LegionsProConditions.prototype.handleGroupChxBox = function (component, checkedValue) {
        var data = this.vmModel;
        var name = component.containerProps.name;
        data[name] = checkedValue;
        this.setFieldsValues(name, function (value) {
            value.conditionsProps.value = checkedValue;
        });
        component.conditionsProps.onChange && component.conditionsProps.onChange.call(this, checkedValue, {
            viewState: cloneDeep(data),
            parameter: cloneDeep(this.queryPrams),
        }, this.viewStore);
        this.viewStore._setVmModel(data);
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
        else if (component instanceof ConditionGroupCheckBoxModel) {
            return this.renderGroupChxBox(component);
        }
        else {
            throw new Error("\n            ProConditions: Unknown query. query = " + JSON.stringify(component));
        }
    };
    LegionsProConditions.prototype.renderGroupChxBox = function (component) {
        var conditionsProps = component.conditionsProps, containerProps = component.containerProps, jsonProperty = component.jsonProperty;
        var labelSpan = conditionsProps.labelSpan, defaultValue = conditionsProps.defaultValue, visable = conditionsProps.visable, display = conditionsProps.display, _a = conditionsProps.value, value = _a === void 0 ? defaultValue : _a, prop = __rest(conditionsProps, ["labelSpan", "defaultValue", "visable", "display", "value"]);
        return React.createElement(Checkbox.Group, __assign({}, prop, { value: value, onChange: this.handleGroupChxBox.bind(this, component) }));
    };
    LegionsProConditions.prototype.renderInput = function (component) {
        var _this = this;
        var conditionsProps = component.conditionsProps, containerProps = component.containerProps, jsonProperty = component.jsonProperty;
        var placeholder = conditionsProps.placeholder;
        if (this.viewStore && this.viewStore.computedSize === 'small') {
            placeholder = '';
        }
        var labelSpan = conditionsProps.labelSpan, defaultValue = conditionsProps.defaultValue, _a = conditionsProps.value, value = _a === void 0 ? defaultValue : _a, visable = conditionsProps.visable, display = conditionsProps.display, prop = __rest(conditionsProps, ["labelSpan", "defaultValue", "value", "visable", "display"]);
        var suffix = value ? React.createElement(Icon, { type: "close-circle", onClick: function () {
                var state = _this.vmModel;
                state[containerProps.name] = '';
                _this.setFieldsValues(containerProps.name, function (value) {
                    value.conditionsProps.value = '';
                });
                _this.mapQueryValue();
            } }) : null;
        return (React.createElement(Tooltip, { trigger: "focus", title: (this.formatTrim(value)) ? React.createElement("pre", null, value.replace('↵', ',')) : null, placement: "topLeft" },
            React.createElement(Input, __assign({ maxLength: '50', suffix: suffix }, prop, { value: value, onPressEnter: this.handleEnter.bind(this, component), onChange: this.handleChange.bind(this, component), placeholder: placeholder }))));
    };
    LegionsProConditions.prototype.renderInputTextArea = function (component) {
        var conditionsProps = component.conditionsProps, containerProps = component.containerProps, jsonProperty = component.jsonProperty;
        var placeholder = conditionsProps.placeholder;
        if (this.viewStore && this.viewStore.computedSize === 'small') {
            placeholder = '';
        }
        var labelSpan = conditionsProps.labelSpan, defaultValue = conditionsProps.defaultValue, _a = conditionsProps.value, value = _a === void 0 ? defaultValue : _a, visable = conditionsProps.visable, display = conditionsProps.display, prop = __rest(conditionsProps, ["labelSpan", "defaultValue", "value", "visable", "display"]);
        var themProps = __rest(prop, ["onReset"]);
        var onEnter = conditionsProps.onEnter;
        return (React.createElement(Tooltip, { overlayClassName: "legions-pro-query-tooltip", trigger: "focus", title: (this.formatTrim(value)) ? React.createElement("pre", null, value.replace('↵', ',')) : null, placement: "topLeft" },
            React.createElement(TextArea, __assign({ maxLength: 1500, autosize: { minRows: 1, maxRows: 1 } }, themProps, { value: value, onPressEnter: this.handleEnter.bind(this, onEnter), onChange: this.handleChange.bind(this, component), placeholder: placeholder }))));
    };
    LegionsProConditions.prototype.renderSelect = function (component) {
        var conditionsProps = component.conditionsProps, containerProps = component.containerProps, jsonProperty = component.jsonProperty;
        var placeholder = conditionsProps.placeholder;
        var newData = conditionsProps.options;
        var labelSpan = conditionsProps.labelSpan, defaultValue = conditionsProps.defaultValue, visable = conditionsProps.visable, display = conditionsProps.display, _a = conditionsProps.value, value = _a === void 0 ? defaultValue : _a, prop = __rest(conditionsProps, ["labelSpan", "defaultValue", "visable", "display", "value"]);
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
            , __assign({}, prop, { style: { width: '100%' }, placeholder: placeholder, onSearch: this.handleSelectSearch.bind(this, component), onChange: this.handleChangeSelect.bind(this, component), value: value, options: newData, allowClear: true, showSearch: true, defaultActiveFirstOption: true, optionFilterProp: "children" }))));
    };
    LegionsProConditions.prototype.renderDate = function (component) {
        var conditionsProps = component.conditionsProps, containerProps = component.containerProps, jsonProperty = component.jsonProperty;
        var placeholder = conditionsProps.placeholder;
        var labelSpan = conditionsProps.labelSpan, defaultValue = conditionsProps.defaultValue, visable = conditionsProps.visable, display = conditionsProps.display, _a = conditionsProps.value, value = _a === void 0 ? defaultValue : _a, prop = __rest(conditionsProps, ["labelSpan", "defaultValue", "visable", "display", "value"]);
        return (React.createElement(DatePicker, __assign({}, prop, { style: { width: '100%' }, placeholder: placeholder, value: value, onChange: this.handleChangeDate.bind(this, component) })));
    };
    LegionsProConditions.prototype.renderDateRange = function (component) {
        var conditionsProps = component.conditionsProps, containerProps = component.containerProps, jsonProperty = component.jsonProperty;
        var labelSpan = conditionsProps.labelSpan, defaultValue = conditionsProps.defaultValue, visable = conditionsProps.visable, display = conditionsProps.display, _a = conditionsProps.value, value = _a === void 0 ? defaultValue : _a, prop = __rest(conditionsProps, ["labelSpan", "defaultValue", "visable", "display", "value"]);
        var placeholder = conditionsProps.placeholder;
        return (React.createElement(RangePicker, __assign({ allowClear: true }, prop, { value: value, onChange: this.handleChangeDate.bind(this, component), placeholder: placeholder })));
    };
    LegionsProConditions.prototype.renderChxBox = function (component) {
        var conditionsProps = component.conditionsProps, containerProps = component.containerProps, jsonProperty = component.jsonProperty;
        var labelSpan = conditionsProps.labelSpan, visable = conditionsProps.visable, display = conditionsProps.display, value = conditionsProps.value, defaultChecked = conditionsProps.defaultChecked, prop = __rest(conditionsProps, ["labelSpan", "visable", "display", "value", "defaultChecked"]);
        return (React.createElement(Checkbox, __assign({}, prop, { defaultChecked: defaultChecked, onChange: this.handleChangeChx.bind(this, component) }), conditionsProps.label));
    };
    LegionsProConditions.prototype.renderInputNumber = function (component) {
        var _this = this;
        var conditionsProps = component.conditionsProps, containerProps = component.containerProps, jsonProperty = component.jsonProperty;
        var labelSpan = conditionsProps.labelSpan, defaultValue = conditionsProps.defaultValue, display = conditionsProps.display, visable = conditionsProps.visable, prop = __rest(conditionsProps, ["labelSpan", "defaultValue", "display", "visable"]);
        var placeholder = conditionsProps.placeholder;
        if (this.viewStore && this.viewStore.computedSize === 'small') {
            placeholder = '';
        }
        var onEnter = conditionsProps.onEnter;
        /* const vmValue  = this.viewStore.computedVmModel[JsonProperty.name] */
        return (React.createElement(InputNumber, __assign({}, prop, { onKeyDown: function (value) {
                if (value && value['key'] && value['key'] === 'Enter') {
                    _this.handleEnter.call(_this, onEnter);
                }
            }, defaultValue: defaultValue, style: { width: '100%' }, onChange: this.handleChange.bind(this, component), placeholder: placeholder })));
    };
    LegionsProConditions.prototype.renderRadioButton = function (component) {
        var conditionsProps = component.conditionsProps, containerProps = component.containerProps, jsonProperty = component.jsonProperty;
        var labelSpan = conditionsProps.labelSpan, defaultValue = conditionsProps.defaultValue, display = conditionsProps.display, options = conditionsProps.options, visable = conditionsProps.visable, prop = __rest(conditionsProps, ["labelSpan", "defaultValue", "display", "options", "visable"]);
        var newData = options;
        return (React.createElement(RadioGroup, __assign({}, prop, { style: { width: '100%' }, defaultValue: defaultValue, onChange: this.handleChange.bind(this, component) }), newData && newData.map(function (item) {
            return (React.createElement(RadioButton, { key: item.value + "-" + containerProps.name, disabled: item.disabled, value: item.value }, item.label));
        })));
    };
    LegionsProConditions.prototype.renderSearch = function (component) {
        var _this = this;
        var conditionsProps = component.conditionsProps, containerProps = component.containerProps;
        var prop = __rest(conditionsProps, []);
        var menu = (React.createElement(Menu, { selectedKeys: [this.viewStore.computedSize], onClick: function (item) {
                var size = item.key;
                _this.viewStore._setSize(size);
            } },
            React.createElement(Menu.Item, { key: "small" }, "\u7D27\u51D1"),
            React.createElement(Menu.Item, { key: "default" }, "\u8212\u9002")));
        return React.createElement(React.Fragment, null,
            React.createElement(Row, { gutter: 8, type: "flex" },
                React.createElement(Col, { span: 6 },
                    React.createElement(Button, { type: "primary", icon: 'search', onClick: this.handleSearch.bind(this), style: { borderColor: "#46b8da", color: "white" } }, component.conditionsProps.searchText || '搜索')),
                React.createElement(Col, { span: 6 },
                    React.createElement(Dropdown.Button, { type: "ghost", onClick: this.handleReset.bind(this), overlay: menu }, component.conditionsProps.resetText || '重置')),
                React.createElement(Col, { span: 4 },
                    React.createElement(Button, { onClick: function () {
                            var item = _this.props.query.find(function (item) { return item instanceof ConditionSearchModel; });
                            if (item && item instanceof ConditionSearchModel) {
                                item.conditionsProps.onRefresh && item.conditionsProps.onRefresh.call(_this, cloneDeep(_this.queryPrams), _this.viewStore);
                            }
                        }, style: { width: '100%', padding: '0 2px' }, 
                        //@ts-ignore
                        title: "\u5237\u65B0" },
                        React.createElement(Icon, { type: "sync", title: "\u5237\u65B0" }))),
                React.createElement(Col, { span: 8 },
                    React.createElement(Button, { type: "ghost", icon: this.state.collapsed ? 'down' : 'up', onClick: this.handleToggle.bind(this), style: { backgroundColor: "#fff", borderColor: "#46b8da" } }, this.state.collapsed ? '收起' : '展开'))));
    };
    LegionsProConditions.prototype.renderLabel = function (component, labelSpan) {
        if (!(component instanceof ConditionSearchModel) && !(component instanceof ConditionCheckBoxModel) && !(component instanceof ConditionGroupCheckBoxModel)) {
            var label = component.conditionsProps.label;
            var name_1 = component.containerProps.name;
            return (this.viewStore.computedSize !== 'small' ? React.createElement(Col, { className: "legions-pro-query-label", span: labelSpan },
                React.createElement("label", { htmlFor: name_1, title: label, style: { lineHeight: '28px', right: '0px' } }, label)) :
                React.createElement("label", { htmlFor: name_1, title: label, style: {
                        marginLeft: '5px', marginRight: '3px',
                        position: 'absolute', zIndex: 999, background: '#fff',
                        height: '20px', lineHeight: '20px',
                        color: '#999', top: '-11px', fontSize: 10,
                        WebkitTransform: 'scale(0.9)'
                    } },
                    label,
                    ":"));
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
        var searchItem = this.viewStore.computedQuery.find(function (item) { return item instanceof ConditionSearchModel; });
        var show = [];
        if (searchItem && !Array.isArray(searchItem)) {
            show.push(searchItem);
        }
        return this.renderQueryComponent(show);
    };
    LegionsProConditions.prototype.renderShowComponent = function (hide) {
        var _this = this;
        var searchItem = this.viewStore.computedQuery.find(function (item) { return item instanceof ConditionSearchModel; });
        var searchSpan = 0;
        if (searchItem && !Array.isArray(searchItem)) {
            searchSpan = this.getQueryItemSpan(searchItem);
        }
        var unUsedSpan = 24 - searchSpan;
        var show = [];
        this.viewStore.computedQuery.filter(function (item) { return !(item instanceof ConditionSearchModel); }).map(function (item) {
            var currSpan = _this.getQueryItemSpan(item);
            var visable = item.conditionsProps['visable'];
            visable = visable === void 0 ? true : visable;
            if (unUsedSpan >= currSpan && visable) {
                show.push(item);
                unUsedSpan = unUsedSpan - currSpan;
            }
            else {
                hide.push(item);
            }
        });
        return this.renderQueryComponent(show);
    };
    LegionsProConditions.prototype.renderCollapsed = function (list) {
        var show = [];
        list.map(function (item) {
            var visable = item.conditionsProps['visable'];
            visable = visable === void 0 ? true : visable;
            if (visable) {
                show.push(item);
            }
        });
        return this.renderQueryComponent(show);
    };
    LegionsProConditions.prototype.renderQueryComponent = function (list) {
        var _this = this;
        return list.map(function (item) {
            var labelSpan = (item instanceof ConditionCheckBoxModel || (item instanceof ConditionSearchModel)) ? 1 : (item.conditionsProps.labelSpan || 4);
            if (_this.viewStore.computedSize === 'small') {
                labelSpan = 0;
            }
            var _a = item.containerProps.col, offset = _a.offset, pull = _a.pull, push = _a.push, md = _a.md, xl = _a.xl, lg = _a.lg, sm = _a.sm, xs = _a.xs, col = __rest(_a, ["offset", "pull", "push", "md", "xl", "lg", "sm", "xs"]);
            var span = item.containerProps.col[_this.viewStore.compuedResolution];
            var colspan = {};
            if (typeof span === 'number') {
                colspan['span'] = span;
            }
            else if (Object.prototype.toString.call(span) === "[object Object]") {
                colspan['span'] = span.span;
            }
            var uid = item.containerProps.uuid;
            var _b = item.containerProps, _c = _b.className, className = _c === void 0 ? '' : _c, _d = _b.style, style = _d === void 0 ? {} : _d, onClick = _b.onClick;
            var click = {};
            if (onClick) {
                click['onClick'] = onClick.bind(_this, { uid: uid, componentName: item.containerProps.name });
            }
            return React.createElement(Col, __assign({}, col, colspan, click, { className: className, "data-id": uid, "data-name": item.containerProps.name, key: uid, style: __assign({ paddingBottom: '10px', paddingLeft: '5px' }, style) }),
                _this.renderLabel(item, labelSpan),
                React.createElement(Col, { style: { lineHeight: '28px' }, span: 24 - labelSpan }, _this.renderComponent(item)));
        });
    };
    LegionsProConditions.prototype.renderContent = function () {
        var hide = [];
        return React.createElement(React.Fragment, null,
            this.renderShowComponent(hide),
            this.renderSearchComponent(),
            this.state.collapsed && this.renderCollapsed(hide));
    };
    LegionsProConditions.prototype.render = function () {
        var _this = this;
        var _a = this.props.draggerProps, draggerProps = _a === void 0 ? {} : _a;
        var _b = draggerProps.options, onChange = draggerProps.onChange, prop = __rest(draggerProps, ["options", "onChange"]);
        return (React.createElement(Row, { className: baseCls + " " + this.uid, gutter: 8, type: "flex" }, this.props.isDragSort ? React.createElement(LegionsProDragger, __assign({ options: __assign(__assign({ animation: 150 }, draggerProps.options), { group: {
                    name: 'ProConditions',
                    pull: true,
                    put: true,
                } }), onChange: function (items, sort, evt) {
                /* const dataId = evt.item.attributes['data-id'];
                const dataName = evt.item.attributes['data-name']; */
                var query = [];
                if (items.length && items.length === _this.viewStore.computedQuery.length) { // 内部拖拽排序
                    items.map(function (item) {
                        var view = _this.viewStore.computedQuery.find(function (s) { return s.containerProps.uuid === item; });
                        if (view) {
                            query.push(view);
                        }
                    });
                    _this.viewStore._clearQuery();
                    _this.viewStore._initQuery(query);
                }
                if (typeof onChange === 'function') {
                    onChange(items, sort, evt);
                }
            } }, prop), this.renderContent()) : this.renderContent()));
    };
    /* search =debounce((options,val)=>{
       options&&options.props.onSearch&&options.props.onSearch(val)
    },200) */
    LegionsProConditions.ProConditions = ProConditions;
    LegionsProConditions.ConditionSelectModel = ConditionSelectModel;
    LegionsProConditions.ConditionTextNumberModel = ConditionTextNumberModel;
    LegionsProConditions.ConditionRadioButtonModel = ConditionRadioButtonModel;
    LegionsProConditions.ConditionTextAreaModel = ConditionTextAreaModel;
    LegionsProConditions.ConditionTextModel = ConditionTextModel;
    LegionsProConditions.ConditionDateModel = ConditionDateModel;
    LegionsProConditions.ConditionSearchModel = ConditionSearchModel;
    LegionsProConditions.ConditionRangePickerModel = ConditionRangePickerModel;
    LegionsProConditions.ConditionCheckBoxModel = ConditionCheckBoxModel;
    LegionsProConditions.ConditionGroupCheckBoxModel = ConditionGroupCheckBoxModel;
    LegionsProConditions.defaultProps = {
        size: 'default',
        defaultCollapsed: true,
    };
    LegionsProConditions = __decorate([
        bind({ store: LegionsStoreConditions }),
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
