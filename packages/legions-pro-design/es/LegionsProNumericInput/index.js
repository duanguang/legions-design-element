/**
  *  legions-pro-design v0.0.9
  * (c) 2021 duanguang
  * @license MIT
  */
import React, { Component } from 'react';
import { Tooltip, Input } from 'antd';

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

function formatNumber(value) {
    value += '';
    var list = value.split('.');
    var prefix = list[0].charAt(0) === '-' ? '-' : '';
    var num = prefix ? list[0].slice(1) : list[0];
    var result = '';
    while (num.length > 3) {
        result = "," + num.slice(-3) + result;
        num = num.slice(0, num.length - 3);
    }
    if (num) {
        result = num + result;
    }
    return "" + prefix + result + (list[1] ? "." + list[1] : '');
}
var LegionsProNumericInput = /** @class */ (function (_super) {
    __extends(LegionsProNumericInput, _super);
    function LegionsProNumericInput() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onChange = function (e) {
            var value = e.target.value;
            _this.handleChange(e, value);
        };
        _this.onBlur = function (e) {
            var _a = _this.props, value = _a.value, onBlur = _a.onBlur;
            if (value && value.toString().charAt(value.length - 1) === '.' || value === '-') {
                _this.handleChange(e, value.slice(0, -1));
            }
            onBlur && onBlur(e);
        };
        return _this;
    }
    LegionsProNumericInput.prototype.handleChange = function (even, value) {
        var reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
        if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
            // @ts-ignore
            this.props.onChange(even, value);
        }
    };
    LegionsProNumericInput.prototype.render = function () {
        var value = this.props.value;
        var title = value ? (React.createElement("span", { className: "numeric-input-title" }, value !== '-' ? formatNumber(value) : '-')) : '请输入数字';
        return (React.createElement(Tooltip, { trigger: 'focus', title: title, placement: "topLeft", overlayClassName: "numeric-input" },
            React.createElement(Input, __assign({ maxLength: "25" }, this.props, { onChange: this.onChange, onBlur: this.onBlur, placeholder: "" + (this.props.placeholder || '请输入数字') }))));
    };
    return LegionsProNumericInput;
}(Component));

export default LegionsProNumericInput;
