/**
  *  legions-pro-echarts v0.0.7
  * (c) 2021 duanguang
  * @license MIT
  */
import { Button, DatePicker, Input, Progress, Radio, Select, Table, Tooltip } from 'antd';
import React, { Component } from 'react';
import './style/button.less';
import './style/date-picker.less';
import './style/input.less';
import './style/progress.less';
import './style/radio.less';
import './style/select.less';
import { get } from 'lodash';
import './style/table.less';

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

/*
 * @Author: linzeqin
 * @Date: 2019-11-07 08:36:35
 * @description: 公共常量
 */
/** 样式名称前缀 */
var prefixCls = 'legions-pro-echarts';

/*
 * @Author: linzeqin
 * @Date: 2019-11-07 08:36:35
 * @description: 单选框组件
 */
var LegionsProEchartsButton = /** @class */ (function (_super) {
    __extends(LegionsProEchartsButton, _super);
    function LegionsProEchartsButton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LegionsProEchartsButton.prototype.render = function () {
        var _a = this.props, _b = _a.className, className = _b === void 0 ? '' : _b, props = __rest(_a, ["className"]);
        return (React.createElement(Button, __assign({}, props, { className: prefixCls + "-button " + className })));
    };
    LegionsProEchartsButton.Group = Button.Group;
    return LegionsProEchartsButton;
}(React.Component));

/*
 * @Author: linzeqin
 * @Date: 2019-11-07 08:36:35
 * @description: 日期选择组件
 */
var RangePicker = /** @class */ (function (_super) {
    __extends(RangePicker, _super);
    function RangePicker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RangePicker.prototype.render = function () {
        var _a = this.props, _b = _a.className, className = _b === void 0 ? '' : _b, props = __rest(_a, ["className"]);
        return (React.createElement(DatePicker.RangePicker, __assign({}, props, { className: prefixCls + "-rangeDate-picker " + className })));
    };
    return RangePicker;
}(React.Component));
var MonthPicker = /** @class */ (function (_super) {
    __extends(MonthPicker, _super);
    function MonthPicker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MonthPicker.prototype.render = function () {
        var _a = this.props, _b = _a.className, className = _b === void 0 ? '' : _b, props = __rest(_a, ["className"]);
        return (React.createElement(DatePicker.MonthPicker, __assign({}, props, { className: prefixCls + "-monthDate-picker " + className })));
    };
    return MonthPicker;
}(React.Component));
var LegionsProEchartsDatePicker = /** @class */ (function (_super) {
    __extends(LegionsProEchartsDatePicker, _super);
    function LegionsProEchartsDatePicker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LegionsProEchartsDatePicker.prototype.render = function () {
        var _a = this.props, _b = _a.className, className = _b === void 0 ? '' : _b, props = __rest(_a, ["className"]);
        return (React.createElement(DatePicker, __assign({}, props, { className: prefixCls + "-date-picker " + className })));
    };
    LegionsProEchartsDatePicker.RangePicker = RangePicker;
    LegionsProEchartsDatePicker.MonthPicker = MonthPicker;
    return LegionsProEchartsDatePicker;
}(React.Component));

/*
 * @Author: linzeqin
 * @Date: 2019-11-07 08:36:35
 * @description: 单选框组件
 */
var LegionsProEchartsInput = /** @class */ (function (_super) {
    __extends(LegionsProEchartsInput, _super);
    function LegionsProEchartsInput() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LegionsProEchartsInput.prototype.render = function () {
        var _a = this.props, _b = _a.className, className = _b === void 0 ? '' : _b, props = __rest(_a, ["className"]);
        return (React.createElement(Input, __assign({}, props, { className: prefixCls + "-input " + className })));
    };
    return LegionsProEchartsInput;
}(React.Component));

var LegionsProEchartsProgress = /** @class */ (function (_super) {
    __extends(LegionsProEchartsProgress, _super);
    function LegionsProEchartsProgress() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LegionsProEchartsProgress.prototype.render = function () {
        var _a = this.props, _b = _a.className, className = _b === void 0 ? '' : _b, 
        /** 线宽默认8 */
        _c = _a.strokeWidth, 
        /** 线宽默认8 */
        strokeWidth = _c === void 0 ? 8 : _c, 
        /** 状态默认全部为active */
        _d = _a.status, 
        /** 状态默认全部为active */
        status = _d === void 0 ? "active" : _d, props = __rest(_a, ["className", "strokeWidth", "status"]);
        return React.createElement(Progress, __assign({}, props, { status: status, strokeWidth: strokeWidth, className: prefixCls + "-progress " + className }));
    };
    return LegionsProEchartsProgress;
}(Component));

/*
 * @Author: linzeqin
 * @Date: 2019-11-07 08:36:35
 * @description: 单选框组件
 */
var LegionsProEchartsRadio = /** @class */ (function (_super) {
    __extends(LegionsProEchartsRadio, _super);
    function LegionsProEchartsRadio() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LegionsProEchartsRadio.prototype.render = function () {
        var _a = this.props, _b = _a.className, className = _b === void 0 ? '' : _b, props = __rest(_a, ["className"]);
        var themeClassName = prefixCls + "-radio-" + this.props.theme;
        return (React.createElement(Radio.Group, __assign({}, props, { className: themeClassName + " " + className }), this.props.children));
    };
    LegionsProEchartsRadio.Button = Radio.Button;
    LegionsProEchartsRadio.defaultProps = {
        theme: 'default',
    };
    return LegionsProEchartsRadio;
}(React.Component));

/*
 * @Author: linzeqin
 * @Date: 2019-11-07 08:36:35
 * @description: 单选框组件
 */
var LegionsProEchartsSelect = /** @class */ (function (_super) {
    __extends(LegionsProEchartsSelect, _super);
    function LegionsProEchartsSelect() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LegionsProEchartsSelect.prototype.render = function () {
        var _a = this.props, _b = _a.className, className = _b === void 0 ? '' : _b, style = _a.style, props = __rest(_a, ["className", "style"]);
        var mStyle = __assign({ width: '100%' }, style);
        return (React.createElement(Select, __assign({}, props, { style: mStyle, className: prefixCls + "-select " + className }), this.props.children));
    };
    LegionsProEchartsSelect.Option = Select.Option;
    return LegionsProEchartsSelect;
}(React.Component));

/*
 * @Author: linzeqin
 * @Date: 2019-11-07 08:36:35
 * @description: 列表组件
 */
var LegionsProEchartsTable = /** @class */ (function (_super) {
    __extends(LegionsProEchartsTable, _super);
    function LegionsProEchartsTable() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ref = null;
        /** 列配置劫持处理，添加tooltip和超出隐藏显示省略号功能 */
        _this.columnsFactory = function (columns) {
            return columns.map(function (item) {
                var tooltip = item.tooltip, textAlign = item.textAlign, render = item.render;
                if (textAlign) {
                    item.className = prefixCls + "-table-align-" + textAlign + " " + (item.className || '');
                }
                if (tooltip) {
                    item.className = prefixCls + "-table-tooltip " + (item.className || '');
                    item.render = function (text, record, index) {
                        var value = render ? render(text, record, index) : get(record, item.dataIndex);
                        return React.createElement(Tooltip, { placement: tooltip, title: value }, value);
                    };
                    return item;
                }
                return item;
            });
        };
        return _this;
    }
    LegionsProEchartsTable.prototype.render = function () {
        var _this = this;
        var _a = this.props, _b = _a.className, className = _b === void 0 ? '' : _b, _c = _a.columns, columns = _c === void 0 ? [] : _c, isFullScreen = _a.isFullScreen, props = __rest(_a, ["className", "columns", "isFullScreen"]);
        var full = isFullScreen ? prefixCls + "-table-full" : '';
        var pagination = props.pagination ? prefixCls + "-table-pagination" : '';
        return (React.createElement(Table, __assign({ ref: function (ref) { _this.ref = ref; }, size: "middle" }, props, { columns: this.columnsFactory(columns), className: prefixCls + "-table " + full + " " + pagination + " " + className })));
    };
    return LegionsProEchartsTable;
}(React.Component));

export { LegionsProEchartsButton, LegionsProEchartsDatePicker, LegionsProEchartsInput, LegionsProEchartsProgress, LegionsProEchartsRadio, LegionsProEchartsSelect, LegionsProEchartsTable };
