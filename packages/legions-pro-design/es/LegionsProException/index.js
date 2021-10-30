/**
  *  legions-pro-design v0.0.8-beta.1
  * (c) 2021 duanguang
  * @license MIT
  */
import React, { createElement } from 'react';
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
 * @Author: duanguang
 * @Date: 2020-12-26 11:01:56
 * @LastEditTime: 2021-01-12 10:45:29
 * @LastEditors: duanguang
 * @Description:
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/LegionsProException/typeConfig.ts
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
var NoAccess = 'https://gitee.com/duanguang/figure-bed/raw/master/oss/wZcnGqRDyhPOEYFcZDnb.png';
var NoFound = 'https://gitee.com/duanguang/figure-bed/raw/master/oss/KpnpchXsobRgLElEozzI.png';
var ServerError = 'https://gitee.com/duanguang/figure-bed/raw/master/oss/RVRUAYdCGeYNBWoKiIwB.png';
var config = {
    403: {
        img: NoAccess,
        title: '403',
        desc: '抱歉，你无权访问该页面',
    },
    404: {
        img: NoFound,
        title: '404',
        desc: '抱歉，你访问的页面不存在',
    },
    500: {
        img: ServerError,
        title: '500',
        desc: '抱歉，服务器出错了',
    },
};

var baseCls = "legions-pro-design-exception";
var LegionsProException = /** @class */ (function (_super) {
    __extends(LegionsProException, _super);
    function LegionsProException(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        return _this;
    }
    LegionsProException.prototype.render = function () {
        var _a = this.props, className = _a.className, backText = _a.backText, _b = _a.linkElement, linkElement = _b === void 0 ? 'a' : _b, type = _a.type, title = _a.title, desc = _a.desc, img = _a.img, actions = _a.actions, redirect = _a.redirect, rest = __rest(_a, ["className", "backText", "linkElement", "type", "title", "desc", "img", "actions", "redirect"]);
        var pageType = type in config ? type : '404';
        // const clsString = classNames(styles.exception, className);
        return (React.createElement("div", { className: baseCls },
            React.createElement("div", { className: "imgBlock" },
                React.createElement("div", { className: "imgEle", style: { backgroundImage: "url(" + (img || config[pageType].img) + ")" } })),
            React.createElement("div", { className: "content" },
                React.createElement("h1", null, title || config[pageType].title),
                React.createElement("div", { className: "desc" }, desc || config[pageType].desc),
                React.createElement("div", { className: "actions" }, actions ||
                    createElement(linkElement, {
                        to: redirect,
                        href: redirect,
                    })))));
    };
    LegionsProException.defaultProps = {
        backText: '返回主页',
        redirect: '/',
    };
    return LegionsProException;
}(React.PureComponent));

export default LegionsProException;
