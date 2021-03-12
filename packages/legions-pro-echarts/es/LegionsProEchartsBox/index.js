/**
  *  legions-pro-echarts v0.0.7
  * (c) 2021 duanguang
  * @license MIT
  */
import { prefixCls } from '../core';
import React from 'react';
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
        /** 标题 */
        this.title = void 0;
        /** 高度 */
        this.height = '100%';
        /** 宽度 */
        this.width = 'auto';
        /** 外层样式 */
        this.style = {};
        /** 内层conent样式 */
        this.contentStyle = {};
        /** 外层容器类名 */
        this.className = '';
    }
    return IProps;
}());
/** 可视化界面容器盒子占位块 */
var LegionsProEchartsBox = /** @class */ (function (_super) {
    __extends(LegionsProEchartsBox, _super);
    function LegionsProEchartsBox() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LegionsProEchartsBox.prototype.render = function () {
        var _a = this.props, style = _a.style, className = _a.className, title = _a.title, height = _a.height, width = _a.width, contentStyle = _a.contentStyle;
        var mStyle = __assign({ height: height,
            width: width }, style);
        return (React.createElement("div", { style: mStyle, className: prefixCls + "-box-wrap " + className },
            React.createElement("div", { className: prefixCls + "-box", style: { height: '100%', paddingTop: title ? '36px' : void 0 } },
                title && React.createElement("div", { className: "pro-box-title" },
                    React.createElement("span", null, title)),
                React.createElement("div", { className: "pro-box-topLeft" }),
                React.createElement("div", { className: "pro-box-topRight" }),
                React.createElement("div", { className: "pro-box-botLeft" }),
                React.createElement("div", { className: "pro-box-botRight" }),
                React.createElement("div", { className: "pro-box-content", style: contentStyle }, this.props.children))));
    };
    LegionsProEchartsBox.defaultProps = new IProps();
    return LegionsProEchartsBox;
}(React.Component));

export default LegionsProEchartsBox;
