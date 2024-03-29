/**
  *  legions-pro-design v0.0.8
  * (c) 2021 duanguang
  * @license MIT
  */
import React from 'react';
import { BaseFormFields } from 'legions-lunar/model';
import LegionsProTable from '../LegionsProTable';
import LegionsProForm from '../LegionsProForm';
import './style/index.less';
import { toJS } from 'mobx';
import { cloneDeep } from 'lodash';
import { shortHash } from 'legions-lunar/object-hash';
import get from 'lodash/get';
import set from 'lodash/set';
import has from 'lodash/has';
import ReactDOM from 'react-dom';

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
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
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

/** @deprecated */
function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

/** 分割符，用于给表单字段添加下标时使用 */
var ProTableFormSeparator = '___';
var ProTableFormProps = /** @class */ (function () {
    function ProTableFormProps() {
        /**
         * 容器类名
         * @type {string}
         * @memberof ProTableFormProps
         */
        this.className = '';
        /**
         * 数据变化监听,请勿同步table.dataSource回组件内部，引发务必要性能问题
         * @memberof ProTableFormProps
         */
        this.onChange = function () { return void 0; };
    }
    return ProTableFormProps;
}());
var LegionsProTableForm = /** @class */ (function (_super) {
    __extends(LegionsProTableForm, _super);
    function LegionsProTableForm(props) {
        var _this = _super.call(this, props) || this;
        /** 用于缓存上一次onFieldsChange中改变的状态，除了value */
        _this.fieldsOtherCache = new Map();
        /** table数据缓存，编辑数据时，收集变化数据结果，在保存时统一同步到state.data */
        _this.dataSourcesCache = [];
        /** 行缓存, 避免表格render多次执行导致表单各种行为异常 */
        _this.recordCache = new Map();
        /** 表单实体 */
        _this.formRef = null;
        _this.rules = null;
        _this.updateRecordEditData = function (record) {
            var data = _this.dataSourcesCache;
            var index = data.findIndex(function (item) {
                return get(item, _this.uniqueKey) === get(record, _this.uniqueKey);
            });
            if (index > -1) {
                var isRecordEdit = !get(data[index], 'isRecordEdit');
                set(data[index], 'isRecordEdit', isRecordEdit);
                _this.setState({
                    data: data
                }, function () {
                    _this.dataSourcesCache = _this.state.data;
                });
            }
        };
        /** 添加行数据 */
        _this.addEditRecord = function (record, isRecordEdit) {
            var _a;
            if (isRecordEdit === void 0) { isRecordEdit = true; }
            var recordData = _this.tranformData([__assign(__assign({}, record), (_a = {}, _a[_this.props.proTableConfig.uniqueKey] = record[_this.props.proTableConfig.uniqueKey] || "" + shortHash(new Date().getTime()) + _this.state.data.length, _a))], isRecordEdit);
            ReactDOM.unstable_batchedUpdates(function () {
                var data = __spread(_this.state.data, recordData);
                _this.dataSourcesCache = data;
                _this.setState({
                    data: data
                }, function () {
                    _this.props.onChange && _this.props.onChange(_this.state.data);
                });
            });
        };
        /** 删除行数据 */
        _this.deleteEditRecord = function (rowKeyValue) {
            var data = _this.state.data;
            ReactDOM.unstable_batchedUpdates(function () {
                var newData = data.filter(function (i) { return i[_this.props.proTableConfig.uniqueKey] !== rowKeyValue; });
                _this.dataSourcesCache = newData;
                _this.setState({
                    data: newData
                }, function () {
                    _this.props.onChange && _this.props.onChange(_this.state.data);
                });
            });
        };
        _this.createControl = function (control, key, formRef, formUtils) {
            var uid = formRef.uid, form = formRef.viewModel.form;
            /** 给表单字段id，名称，校验规则添加下标 */
            var keys = "" + control.iAntdProps.id + ProTableFormSeparator + key;
            var newControl = cloneDeep(control);
            newControl.iAntdProps.id = keys;
            newControl.iAntdProps.name = "" + control.iAntdProps.name + ProTableFormSeparator + key;
            return formUtils.createFormComponent(newControl, formRef.viewModel.form, formRef.uid, formRef, key);
        };
        /** 创建行表单 */
        _this.createTable = function () {
            var formUtils = new LegionsProForm.ProFormUtils();
            var _a = _this.props, proTableConfig = _a.proTableConfig, _b = _a.proTableConfig, _c = _b === void 0 ? {} : _b, columns = _c.columns, _d = _a.proFormConfig, _e = _d === void 0 ? {} : _d, controls = _e.controls;
            /** 根据表格列名和表单字段名自动匹配渲染 */
            var newColumns = function (formRef) { return (columns || []).map(function (item, pIndex) {
                var control = controls && controls.find(function (i) { return i.iAntdProps.id === item.dataIndex; });
                var itemRender = {};
                if (item.render) {
                    itemRender['render'] = function (text, record, index) {
                        var newItem = _this.state.data.find(function (item) { return item[_this.uniqueKey] === record[_this.uniqueKey]; });
                        return item.render(text, newItem || record, index);
                    };
                }
                return control ? __assign(__assign({}, item), { render: function (text, record, index) {
                        var key = "" + pIndex + record[_this.uniqueKey];
                        var newItem = _this.state.data.find(function (item) { return item[_this.uniqueKey] === record[_this.uniqueKey]; });
                        var formRecord = _this.recordCache.get(key)
                            ? _this.recordCache.get(key)
                            : _this.createControl(control, record[_this.uniqueKey], formRef, formUtils);
                        _this.recordCache.set(key, formRecord);
                        return (newItem && newItem['isRecordEdit']) ? formRecord : item.render ? item.render(text, newItem || record, index) : text;
                    } }) : __assign(__assign({}, item), itemRender);
            }); };
            formUtils.renderCustomConfig({
                iAntdProps: formUtils.createAntdProps('table', 1, '', { span: 24 }),
                iFormProps: {
                    render: function (form, iAntdProps, rules, formRef) {
                        var data = _this.state.data;
                        return formRef && React.createElement(LegionsProTable, __assign({ 
                            //@ts-ignore
                            uniqueUid: _this.props['uniqueUid'] + "/proTable", isOpenCustomColumns: false, visibleExportLoacl: false, isOpenRowChange: false }, proTableConfig, { dataSource: __spread(data), onPagingQuery: function (page, pageSize, isChangePageSize) {
                                var proTableConfig = _this.props.proTableConfig;
                                /** 触发表单的setFields，实现table分页切换时，表单数据不异常 */
                                _this.formRef.viewModel.form.setFields({});
                                proTableConfig.onPagingQuery && proTableConfig.onPagingQuery(page, pageSize, isChangePageSize);
                            }, columns: newColumns(formRef) }));
                    }
                }
            });
            return [formUtils.getFormConfig('table')];
        };
        /** 数据转化，列表数据转化为表单数据 */
        _this.listToFormData = function (data) {
            if (data === void 0) { data = []; }
            var newModel = {};
            if (data.length === 0) {
                return {};
            }
            data.forEach(function (item) {
                var obj = {};
                Object.keys(item).forEach(function (key) {
                    var separator = "" + key + ProTableFormSeparator + item[_this.uniqueKey];
                    obj[separator] = __assign(__assign({}, _this.fieldsOtherCache.get(separator)), { value: item[key] });
                });
                newModel = __assign(__assign({}, newModel), obj);
            });
            return newModel;
        };
        /** 数据转化，表单数据转列表数据 */
        _this.formDataToList = function (data, fields) {
            var newData = __spread(data);
            Object.keys(fields).forEach(function (key) {
                var _a;
                var separator = key.split(ProTableFormSeparator);
                var name = separator[0];
                var rowIndex = data.findIndex(function (item) { return "" + item[_this.uniqueKey] === separator[1]; });
                if (name && rowIndex >= 0 && fields && fields[key]) {
                    _this.fieldsOtherCache.set(key, fields[key]);
                    newData[rowIndex] = __assign(__assign({}, newData[rowIndex]), (_a = {}, _a[name] = fields[key]['value'], _a));
                }
            });
            _this.dataSourcesCache = newData;
            return newData;
        };
        _this.state = {
            data: _this.tranformData(cloneDeep(toJS(_this.props.proTableConfig.dataSource))),
            recordEditData: new Map(),
            formConfigs: [],
        };
        return _this;
    }
    Object.defineProperty(LegionsProTableForm.prototype, "uniqueKey", {
        /** 行唯一id */
        get: function () {
            /*  const { proTableConfig: { uniqueKey } = {} } = this.props;
             return uniqueKey; */
            return 'legionsTableFormItemKey';
        },
        enumerable: false,
        configurable: true
    });
    LegionsProTableForm.prototype.tranformData = function (data, isRecordEdit) {
        var _this = this;
        if (isRecordEdit === void 0) { isRecordEdit = false; }
        return data.map(function (item, index) {
            var hlTableFormItem = {};
            if (!has(item, _this.uniqueKey)) {
                hlTableFormItem[_this.uniqueKey] = "" + shortHash(new Date().getTime()) + index;
            }
            return __assign(__assign({ isRecordEdit: isRecordEdit }, item), hlTableFormItem);
        });
    };
    LegionsProTableForm.prototype.componentWillReceiveProps = function (nextProps) {
        var _a = this.props.proTableConfig.dataSource, dataSource = _a === void 0 ? [] : _a;
        var _b = nextProps.proTableConfig.dataSource, nextData = _b === void 0 ? [] : _b;
        /** 列表长度变化时，清空缓存 */
        if (dataSource.length !== nextData.length) {
            this.fieldsOtherCache.clear();
            this.recordCache.clear();
        }
    };
    LegionsProTableForm.prototype.render = function () {
        var _this = this;
        var _a = this.props, style = _a.style, className = _a.className, proFormConfig = _a.proFormConfig;
        return (React.createElement("div", { style: style, className: "ProTableForm  legions-pro-tableForm " + className },
            React.createElement(LegionsProForm, __assign({}, proFormConfig, { 
                //@ts-ignore
                uniqueUid: this.props['uniqueUid'] + "/proTableForm", onReady: function (form, formRef) {
                    _this.formRef = formRef;
                    proFormConfig.onReady && proFormConfig.onReady(form, __assign(__assign({}, formRef), { methods: {
                            updateRecordEditData: _this.updateRecordEditData,
                            //@ts-ignore
                            addEditRecord: _this.addEditRecord,
                            deleteEditRecord: _this.deleteEditRecord,
                            setTableFormDataSource: function (dataValue) {
                                _this.setState({
                                    data: _this.tranformData(cloneDeep(toJS(dataValue))),
                                });
                            }
                        } }));
                }, mapPropsToFields: function (props) {
                    return new BaseFormFields.initMapPropsToFields(__assign(__assign({}, props), _this.listToFormData(_this.dataSourcesCache)));
                }, onFieldsChange: (function (props, fields) {
                    _this.formRef.store.updateFormInputData(_this.formRef.uid, fields);
                    _this.props.onChange(cloneDeep(_this.formDataToList(_this.dataSourcesCache, fields)));
                    proFormConfig.onFieldsChange && proFormConfig.onFieldsChange(props, fields);
                }), controls: this.createTable() }))));
    };
    LegionsProTableForm.defaultProps = new ProTableFormProps();
    return LegionsProTableForm;
}(LegionsProForm.CreateForm));

export default LegionsProTableForm;
export { ProTableFormProps, ProTableFormSeparator };
