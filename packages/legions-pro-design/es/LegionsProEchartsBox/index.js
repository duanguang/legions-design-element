/**
  *  legions-pro-echarts v0.0.7
  * (c) 2020 duanguang
  * @license MIT
  */
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
        this.style = {};
        this.className = '';
        this.title = null;
    }
    return IProps;
}());
var proLayoutPrefix = 'legions-pro-echarts';
/** 可视化界面容器盒子占位块 */
var LegionsProEchartsBox = /** @class */ (function (_super) {
    __extends(LegionsProEchartsBox, _super);
    function LegionsProEchartsBox() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LegionsProEchartsBox.prototype.render = function () {
        var _a = this.props, style = _a.style, className = _a.className, title = _a.title;
        var mStyle = __assign({ height: '100%' }, style);
        return (React.createElement("div", { style: mStyle, className: className },
            React.createElement("div", { style: { height: '100%', paddingTop: title ? '36px' : void 0 }, className: proLayoutPrefix + "-box" },
                title && React.createElement("div", { className: 'pro-box-title' }, title),
                React.createElement("div", { className: 'boxTopLeft' }),
                React.createElement("div", { className: 'boxTopRight' }),
                React.createElement("div", { className: 'boxBotLeft' }),
                React.createElement("div", { className: 'boxBotRight' }),
                this.props.children)));
    };
    LegionsProEchartsBox.defaultProps = new IProps();
    return LegionsProEchartsBox;
}(React.Component));

export { LegionsProEchartsBox };
