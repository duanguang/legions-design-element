/**
  *  legions-pro-design v0.0.7-beta.6
  * (c) 2021 duanguang
  * @license MIT
  */
import { Tabs, Button, Col, Icon } from 'antd';
import LegionsStoreForm from '../LegionsStoreForm';
import { bind, observer } from 'legions/store-react';
import React from 'react';
import { shortHash } from 'legions-lunar/object-hash';
import LegionsProForm from '../LegionsProForm';

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

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function(condition, format, a, b, c, d, e, f) {
  if (process.env.NODE_ENV !== 'production') {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

var browser = invariant;

/** 动态表单
 * 业务场景主要在页签方式创建多个表单
 */
var LegionsProTabsForm = /** @class */ (function (_super) {
    __extends(LegionsProTabsForm, _super);
    function LegionsProTabsForm(props) {
        var _this = _super.call(this, props) || this;
        /** uid 的值绝对唯一，且每次初始生成表单都是相同值 */
        _this.freezeUid = '';
        /** 未加密的freezeUid 值 */
        _this.decryptionFreezeUid = '';
        _this.timeId = new Date().getTime();
        _this.handleTabChange = function (activeKey) {
            var _a = _this.props.tabsProps, tabsProps = _a === void 0 ? {} : _a;
            _this.storeView.activeTabKey = activeKey;
            tabsProps.onChange && tabsProps.onChange(activeKey);
        };
        /** 删除tab页 */
        _this.handleTabDelete = function (targetKey, action) {
            var e_1, _a;
            var _b = _this.storeView, size = _b.size, activeTabKey = _b.activeTabKey;
            var _c = _this.props.tabsProps, tabsProps = _c === void 0 ? {} : _c;
            /** 至少剩下一个页签 */
            if (size === 1)
                return;
            /** 删除页签的同时删除map中对应的项 */
            _this.storeView.delTabsMap(targetKey);
            /** 处理删除页签后的高亮定位问题 */
            if (!_this.storeView.getTabs(activeTabKey)) {
                var keys = [];
                try {
                    for (var _d = __values(_this.storeView.getTabsKeys()), _e = _d.next(); !_e.done; _e = _d.next()) {
                        var item = _e.value;
                        keys.push(item);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                _this.storeView.activeTabKey = keys[0];
            }
            tabsProps.onEdit && tabsProps.onEdit(targetKey, action);
        };
        /** 增加tab页 */
        _this.handleTabAdd = function () {
            /** 新增页签 */
            var uid = _this.storeView._addTabsMap();
            var onTabAdd = _this.props.onTabAdd;
            onTabAdd && onTabAdd(uid);
        };
        var keys = 'uniqueUid';
        browser(_this.props[keys], "[LegionsProTabsForm]:props." + keys + " cannot be empty");
        if (_this.props[keys]) {
            _this.decryptionFreezeUid = "" + _this.props[keys] + (_this.props.uniqueKeys || '') + (process.env.environment === 'production' ? 'production' : '');
            _this.freezeUid = "tabsform" + shortHash(_this.decryptionFreezeUid);
        }
        else {
            console.error('props.uniqueUid Can not be empty');
            _this.timeId = new Date().getTime();
            _this.freezeUid = "tabsform" + _this.props.store._TabsFormDataMap.size + shortHash("" + _this.timeId + _this.props.store._TabsFormDataMap.size);
        }
        if (!_this.props.store._TabsFormDataMap.has(_this.freezeUid)) {
            _this.props.store.addTabsForm(_this.freezeUid);
        }
        return _this;
    }
    Object.defineProperty(LegionsProTabsForm.prototype, "storeView", {
        get: function () {
            return this.props.store._TabsFormDataMap.get(this.freezeUid);
        },
        enumerable: false,
        configurable: true
    });
    LegionsProTabsForm.prototype.componentWillMount = function () {
        var _this = this;
        this.props.onReady && this.props.onReady({
            viewModel: this.storeView,
            freezeUid: this.freezeUid,
            decryptionFreezeUid: this.decryptionFreezeUid,
            methods: {
                validateFields: function () {
                    /*   */
                    return _this.validateFields();
                },
                submit: function (callback) {
                    var e_2, _a;
                    if (!_this.validateFields()) {
                        var values = [];
                        try {
                            for (var _b = __values(_this.storeView.entries), _c = _b.next(); !_c.done; _c = _b.next()) {
                                var item = _c.value;
                                var key = item[0];
                                var value = { key: key, tabsItemView: item[1] };
                                values.push(value);
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                        var model_1 = [];
                        values.map(function (item) {
                            //@ts-ignore
                            model_1.push(item.tabsItemView.formInstance.viewModel.InputDataModel);
                        });
                        callback && callback(model_1);
                    }
                },
                onTabAdd: function (options) {
                    var uid = _this.storeView._addTabsMap(options);
                    _this.props.onTabAdd && _this.props.onTabAdd(uid);
                    return uid;
                },
                getFormFields: function (key) {
                    var item = _this.storeView.getTabs(key);
                    if (item) {
                        return item.formInstance.viewModel.InputDataModel;
                    }
                    return null;
                }
            }
        });
    };
    /** 验证表单
     *
     * 如果有错误信息则返回true,否则返回false
     */
    LegionsProTabsForm.prototype.validateFields = function () {
        var e_3, _a;
        var values = [];
        try {
            for (var _b = __values(this.storeView.entries), _c = _b.next(); !_c.done; _c = _b.next()) {
                var item = _c.value;
                var key = item[0];
                var value = { key: key, tabsItemView: item[1] };
                values.push(value);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
        }
        var tabsHasError = values.map(function (item, index) {
            var res = null;
            item.tabsItemView.formInstance.viewModel.form.validateFields(function (errors) {
                res = errors;
            });
            return res;
        }).some(function (item) { return item; });
        this.forceUpdate();
        return tabsHasError;
    };
    LegionsProTabsForm.prototype.renderForm = function (key, tab) {
        var _this = this;
        var _a = this.props, controls = _a.controls, InputDataModel = _a.InputDataModel, group = _a.group, size = _a.size, colCount = _a.colCount;
        return React.createElement(LegionsProForm, { size: size, colCount: colCount, InputDataModel: InputDataModel, mapPropsToFields: function (props) {
                if (tab && tab.formInstance) {
                    return new InputDataModel(tab.formInstance.viewModel.InputDataModel);
                }
                return new InputDataModel(props);
            }, onFieldsChange: function (_, fields) {
                tab.formInstance.store.updateFormInputData(tab.formInstance.uid, fields);
            }, onReady: function (_, formInstance) {
                tab.formInstance = __assign(__assign({}, formInstance), { that: _this });
            }, uniqueKeys: key, key: key, group: group, controls: controls });
    };
    LegionsProTabsForm.prototype.render = function () {
        var _this = this;
        var _a = this.props, _b = _a.tabsProps, tabsProps = _b === void 0 ? {} : _b, _c = _a.tabPaneProps, tabPaneProps = _c === void 0 ? {} : _c, onBeforeTabPaneRender = _a.onBeforeTabPaneRender;
        console.log(this.storeView.activeTabKey, 'this.storeView.activeTabKey');
        return React.createElement(React.Fragment, null,
            React.createElement(Tabs, __assign({ hideAdd: true, type: "editable-card", animated: true, tabBarExtraContent: React.createElement(Button, { icon: "plus", type: "primary", onClick: this.handleTabAdd }, "\u6DFB\u52A0") }, tabsProps, { onChange: this.handleTabChange, onEdit: this.handleTabDelete, activeKey: this.storeView.activeTabKey }), this.storeView._computedTabs.map(function (item, index, arr) {
                var ErrorList = item.formInstance && item.formInstance.viewModel.form.getFieldsError() || [];
                /** 根据表单中的错误信息动态显示tab标签背景颜色 */
                var tabHasError = Object.values(ErrorList).some(function (i) { return i; });
                onBeforeTabPaneRender && onBeforeTabPaneRender(item.keys);
                return React.createElement(Tabs.TabPane, __assign({}, tabPaneProps, item.computedStyle, item.computedClassName, item.computedClosable, item.computedDisabled, { forceRender: true, tab: React.createElement(React.Fragment, null,
                        React.createElement(Col, { "data-key": item.keys, span: 19 }, tabPaneProps.tab ? tabPaneProps.tab(item.keys, index) : "\u9875\u7B7E" + (index + 1)),
                        React.createElement(Col, { span: 3 }, tabHasError && React.createElement(Icon, { style: { color: '#ff0000' }, type: "exclamation-circle" })),
                        React.createElement(Col, { span: 2 })), key: item.keys, "data-key": item.keys }), _this.renderForm(item.keys, item));
            })));
    };
    LegionsProTabsForm = __decorate([
        bind({ store: LegionsStoreForm }),
        observer,
        __metadata("design:paramtypes", [Object])
    ], LegionsProTabsForm);
    return LegionsProTabsForm;
}(React.Component));

export default LegionsProTabsForm;
