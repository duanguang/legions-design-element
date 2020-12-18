/**
  *  legions-pro-echarts v0.0.7
  * (c) 2020 duanguang
  * @license MIT
  */
import React from 'react';
import { LegionsProEcharts } from '../LegionsProEcharts';
import { observablePromise, observableViewModel } from 'brain-store-utils';
import { observable } from 'mobx';
import { MORE_IOCN } from '../core';
import { merge } from 'lodash';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/toolbox';

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

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
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

var LegionsProEchartsChartLineProps = /** @class */ (function (_super) {
    __extends(LegionsProEchartsChartLineProps, _super);
    function LegionsProEchartsChartLineProps() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** 数据 */
        _this.data = [{ value: 100, name: 'demo' }];
        /** 配置项 */
        _this.option = {};
        return _this;
    }
    return LegionsProEchartsChartLineProps;
}(LegionsProEchartsPropsTypes));
var ViewModel = /** @class */ (function () {
    function ViewModel() {
        /** 请求托管response */
        this.response = observablePromise();
    }
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], ViewModel.prototype, "response", void 0);
    return ViewModel;
}());
var LegionsProEchartsChartLine = /** @class */ (function (_super) {
    __extends(LegionsProEchartsChartLine, _super);
    function LegionsProEchartsChartLine() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.viewModel = observableViewModel(new ViewModel());
        return _this;
    }
    Object.defineProperty(LegionsProEchartsChartLine.prototype, "responseData", {
        /** 自动接管接口返回数据 */
        get: function () {
            if (this.viewModel.response.isResolved && this.props.autoQuery) {
                return this.props.autoQuery.responseTransform(this.viewModel.response);
            }
            return [];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LegionsProEchartsChartLine.prototype, "option", {
        /** 配置项 */
        get: function () {
            return {
                tooltip: {
                    trigger: 'axis',
                },
                legend: {
                    padding: 15,
                    itemWidth: 13,
                    itemHeight: 5,
                },
                grid: {
                    top: '20%',
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true,
                },
                toolbox: {
                    /* show: true, */
                    feature: {
                        saveAsImage: { type: 'png', show: true },
                        magicType: {
                            type: ["line", "bar", 'stack', 'tiled']
                        },
                        myReadMore: {
                            onclick: function () {
                                alert('myToolHandler2');
                            },
                            title: 'more',
                            icon: MORE_IOCN
                        },
                    },
                    showTitle: false,
                    tooltip: {
                        show: true,
                        formatter: function (param) {
                            return '<div>' + param.title + '</div>'; // 自定义的 DOM 结构
                        },
                        backgroundColor: '#222',
                        textStyle: {
                            fontSize: 12,
                        },
                        extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);' // 自定义的 CSS 样式
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    splitLine: {
                        lineStyle: {
                            type: 'dashed',
                            color: '#0C4354',
                        },
                    },
                    axisLabel: {
                        color: '#6A94AC',
                    },
                },
                yAxis: {
                    type: 'value',
                    splitLine: {
                        lineStyle: {
                            type: 'dashed',
                            color: '#0C4354',
                        },
                    },
                    axisLabel: {
                        color: '#6A94AC',
                    },
                    show: true,
                },
                series: [],
            };
        },
        enumerable: false,
        configurable: true
    });
    LegionsProEchartsChartLine.prototype.render = function () {
        var option = this.props.option;
        return (React.createElement(LegionsProEcharts, { option: merge(this.option, option) }));
    };
    LegionsProEchartsChartLine.defaultProps = new LegionsProEchartsChartLineProps();
    return LegionsProEchartsChartLine;
}(React.Component));

export { LegionsProEchartsChartLine, LegionsProEchartsChartLineProps };
