/**
  *  legions-pro-echarts v0.0.7
  * (c) 2020 duanguang
  * @license MIT
  */
import React from 'react';
import 'echarts/lib/chart/pie';

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

var theme = require('../locale/theme.json');
var LegionsProEchartsPropsTypes = /** @class */ (function () {
    function LegionsProEchartsPropsTypes() {
        /** 配置项 */
        this.option = {};
        this.onEvents = {};
        /** 是否显示加载状态 */
        this.loading = false;
        this.loadingOption = {};
        /** 初始化附加参数 */
        this.opts = {};
        /** 初始化主题 */
        //@ts-ignore
        this.theme = theme;
        /** 容器样式 */
        this.style = {};
        /** 容器类名 */
        this.className = '';
        /** setOption时的附加配置项 */
        this.setOptionConfig = {};
        /** 由上层觉得是否需要setOption, 类似shouldComponentUpdate。默认为 true */
        this.shouldSetOption = function () { return true; };
        /** echarts 实例化完成后执行并抛出实例 */
        this.onChartReady = function () { };
    }
    return LegionsProEchartsPropsTypes;
}());

var LegionsProEchartsCardProps = /** @class */ (function (_super) {
    __extends(LegionsProEchartsCardProps, _super);
    function LegionsProEchartsCardProps() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** 数据 */
        _this.data = [{ value: 100, name: 'demo' }];
        /** 配置项 */
        _this.option = {};
        _this.title = '';
        _this.total = 0;
        return _this;
    }
    return LegionsProEchartsCardProps;
}(LegionsProEchartsPropsTypes));
/** 饼图组件 */
var LegionsProEchartsChartCard = /** @class */ (function (_super) {
    __extends(LegionsProEchartsChartCard, _super);
    function LegionsProEchartsChartCard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LegionsProEchartsChartCard.prototype.componentDidMount = function () {
    };
    LegionsProEchartsChartCard.prototype.render = function () {
        var _a = this.props, option = _a.option, title = _a.title, total = _a.total;
        return (React.createElement("div", { style: {
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            } },
            React.createElement("div", null,
                React.createElement("div", { style: {
                        fontSize: '30px',
                        fontFamily: ' PingFangSC, PingFangSC-Regular',
                        fontWeight: 400,
                        textAlign: 'center',
                        color: '#00e6fc',
                        lineHeight: '32px',
                    } }, total),
                React.createElement("div", { style: {
                        fontSize: '14px',
                        fontFamily: 'PingFangSC, PingFangSC-Regular',
                        fontWeight: 400,
                        textAlign: 'center',
                        color: '#9be7f5',
                        lineHeight: '20px',
                    } }, title))));
    };
    LegionsProEchartsChartCard.defaultProps = new LegionsProEchartsCardProps();
    return LegionsProEchartsChartCard;
}(React.Component));

export { LegionsProEchartsCardProps, LegionsProEchartsChartCard };
