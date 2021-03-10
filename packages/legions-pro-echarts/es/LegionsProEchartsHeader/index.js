/**
  *  legions-pro-echarts v0.0.7
  * (c) 2021 duanguang
  * @license MIT
  */
import { prefixCls } from '../core';
import React from 'react';
import { bind, clear } from 'size-sensor';
import './style/index.less';

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

var IProps = /** @class */ (function () {
    function IProps() {
        /** 主题 */
        this.theme = 'default';
        /** 容器类名 */
        this.className = '';
        /** 外层样式 */
        this.style = {};
    }
    return IProps;
}());
/** 卡片组件 */
var LegionsProEchartsHeader = /** @class */ (function (_super) {
    __extends(LegionsProEchartsHeader, _super);
    function LegionsProEchartsHeader() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // @ts-ignore
        _this.ele = null;
        _this.state = { scale: 1 };
        return _this;
    }
    LegionsProEchartsHeader.prototype.componentDidMount = function () {
        var _this = this;
        bind(this.ele, function () {
            var scale = _this.ele.parentElement.offsetHeight / 55;
            _this.setState({ scale: scale > 1 ? 1 : scale });
        });
    };
    LegionsProEchartsHeader.prototype.componentWillUnmount = function () {
        clear(this.ele);
    };
    LegionsProEchartsHeader.prototype.render = function () {
        var _this = this;
        var _a = this.props, theme = _a.theme, children = _a.children, className = _a.className, style = _a.style;
        var mStyle = __assign(__assign({}, style), { transform: "scale(" + this.state.scale + ")" });
        return (React.createElement("div", { ref: function (e) { _this.ele = e; }, className: prefixCls + "-header " + className, style: mStyle },
            React.createElement("div", { className: "pro-header-top" }),
            React.createElement("div", { className: "pro-header-bottom" }),
            React.createElement("div", { className: "pro-header-content" },
                React.createElement("i", { className: "pro-header-icon" }),
                React.createElement("i", { className: "pro-header-icon" }),
                React.createElement("i", { className: "pro-header-icon" }),
                React.createElement("i", { className: "pro-header-icon" }),
                React.createElement("i", { className: "pro-header-icon" }),
                React.createElement("i", { className: "pro-header-icon" }),
                React.createElement("i", { className: "pro-header-icon" }),
                React.createElement("i", { className: "pro-header-icon" }),
                React.createElement("i", { className: "pro-header-icon" }),
                React.createElement("i", { className: "pro-header-icon" }),
                React.createElement("i", { className: "pro-header-icon" }),
                React.createElement("i", { className: "pro-header-icon" }),
                React.createElement("i", { className: "pro-header-icon" }),
                React.createElement("i", { className: "pro-header-icon" }),
                children)));
    };
    LegionsProEchartsHeader.defaultProps = new IProps();
    return LegionsProEchartsHeader;
}(React.Component));

export default LegionsProEchartsHeader;
