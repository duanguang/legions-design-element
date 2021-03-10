/**
  *  legions-pro-echarts v0.0.7
  * (c) 2021 duanguang
  * @license MIT
  */
import { Col, Row } from 'antd';
import React from 'react';
import './style/index.less';
import { prefixCls } from '../core';

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

var ProColProps = /** @class */ (function () {
    function ProColProps() {
        this.style = {};
        this.className = prefixCls + "-col";
        /** 竖向栅格占位格数，仅在父窗口有固定高度的情况下生效 */
        this.ySpan = 0;
    }
    return ProColProps;
}());
var ProRowProps = /** @class */ (function () {
    function ProRowProps() {
        this.style = {};
        this.className = prefixCls + "-row";
        /** 竖向栅格占位格数，仅在父窗口有固定高度的情况下生效 */
        this.ySpan = 0;
    }
    return ProRowProps;
}());
var LayoutProps = /** @class */ (function () {
    function LayoutProps() {
        this.style = {};
        this.className = '';
        /** 是否只显示一屏 false:超出出现滚动条, true:铺满一屏 */
        this.isFullScreen = false;
        /** 背景色填满整个body */
        this.isFillFullScreen = true;
        /** 子元素上下左右间隔 */
        this.gutter = 0;
        /** gutter遍历的深度，默认5级children */
        this.gutterDeep = 5;
    }
    return LayoutProps;
}());
/** Col拓展，支持竖向栅格布局 */
var ProCol = /** @class */ (function (_super) {
    __extends(ProCol, _super);
    function ProCol() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ProCol.prototype.render = function () {
        var _a = this.props, style = _a.style, ySpan = _a.ySpan, props = __rest(_a, ["style", "ySpan"]);
        var mStyle = __assign({ height: ySpan ? (ySpan / 24) * 100 + "%" : style.height }, style);
        return (React.createElement(Col, __assign({ style: mStyle }, props), this.props.children));
    };
    ProCol.defaultProps = new ProColProps();
    return ProCol;
}(React.Component));
/** Row拓展，支持竖向栅格布局 */
var ProRow = /** @class */ (function (_super) {
    __extends(ProRow, _super);
    function ProRow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ProRow.prototype.render = function () {
        var _a = this.props, style = _a.style, ySpan = _a.ySpan, props = __rest(_a, ["style", "ySpan"]);
        var mStyle = __assign({ height: ySpan ? (ySpan / 24) * 100 + "%" : style.height }, style);
        return (React.createElement(Row, __assign({ style: mStyle }, props), this.props.children));
    };
    ProRow.defaultProps = new ProRowProps();
    return ProRow;
}(React.Component));
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
    /** 劫持子元素，设置元素间距 */
    LegionsProEchartsLayout.prototype.computedChildren = function (children, deep) {
        var _this = this;
        if (deep === void 0) { deep = 1; }
        var _a = this.props, gutter = _a.gutter, gutterDeep = _a.gutterDeep;
        return React.Children.map(children, function (item, index) {
            var newChildren = [];
            var newProps = {};
            try {
                if (!item || !item.props || !gutter || deep > gutterDeep) {
                    return item;
                }
                /** 向下查找并处理ProRow元素 */
                if (item.props.children) {
                    newChildren = _this.computedChildren(item.props.children, deep + 1);
                }
                /** 遇到ProRow元素，设置gutter属性 */
                if (item.props.className && item.props.className.indexOf(prefixCls + "-row") > -1) {
                    newProps = __assign(__assign({}, newProps), { gutter: item.props.gutter || gutter });
                    /** 深度deep === 1时，设置每一行的上下间距，除最后一行 */
                    if (deep === 1 && index !== React.Children.count(children) - 1) {
                        newProps = __assign(__assign({}, newProps), { style: __assign(__assign({}, item.props.style), { paddingBottom: gutter }) });
                    }
                }
            }
            catch (error) {
                console.error(error);
            }
            if (newChildren.length) {
                return React.cloneElement(item, newProps, newChildren);
            }
            else {
                return React.cloneElement(item, newProps);
            }
        });
    };
    LegionsProEchartsLayout.prototype.render = function () {
        var _a = this.props, className = _a.className, children = _a.children;
        return (React.createElement("div", { style: this.computedLayoutWrapStyles(), className: prefixCls + "-layout " + className }, this.computedChildren(children)));
    };
    LegionsProEchartsLayout.defaultProps = new LayoutProps();
    LegionsProEchartsLayout.ProRow = ProRow;
    LegionsProEchartsLayout.ProCol = ProCol;
    return LegionsProEchartsLayout;
}(React.Component));

export default LegionsProEchartsLayout;
