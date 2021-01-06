/**
  *  legions-pro-echarts v0.0.7
  * (c) 2020 duanguang
  * @license MIT
  */
import { Row } from 'antd';
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
        /** 是否只显示一屏
         *
         * false 超出出现滚动条
         *
         * true  铺满一屏
         */
        this.isFullScreen = false;
        /** 背景色填满整个body */
        this.isFillFullScreen = true;
    }
    return IProps;
}());
var proLayoutPrefix = 'legions-pro-echarts';
var LegionsProEchartsLayout = /** @class */ (function (_super) {
    __extends(LegionsProEchartsLayout, _super);
    function LegionsProEchartsLayout() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LegionsProEchartsLayout.prototype.computedLayoutWrapStyles = function () {
        var _a = this.props, style = _a.style, isFullScreen = _a.isFullScreen, isFillFullScreen = _a.isFillFullScreen;
        var fullScreenStles = __assign({}, style);
        if (isFullScreen) {
            fullScreenStles = __assign(__assign({}, style), { height: '100vh', overflow: 'hidden' });
        }
        else if (isFillFullScreen) {
            var clientHeight = document.body.clientHeight;
            fullScreenStles = __assign(__assign({}, fullScreenStles), { minHeight: clientHeight + "px" });
        }
        return fullScreenStles;
    };
    LegionsProEchartsLayout.prototype.render = function () {
        var _a = this.props, style = _a.style, className = _a.className, isFullScreen = _a.isFullScreen;
        return (React.createElement("div", { style: this.computedLayoutWrapStyles(), className: proLayoutPrefix + "-layout " + (className ? className : '') },
            React.createElement(Row, { type: 'flex', justify: "start" }, this.props.children)));
    };
    LegionsProEchartsLayout.defaultProps = new IProps();
    return LegionsProEchartsLayout;
}(React.Component));

export { LegionsProEchartsLayout };
