/**
  *  legions-pro-echarts v0.0.7
  * (c) 2021 duanguang
  * @license MIT
  */
import { LineChart } from 'echarts/charts';
import { merge } from 'lodash';
import React from 'react';
import { echarts, LegionsProEchartsPropsTypes } from '../interface';
import LegionsProEcharts from '../LegionsProEcharts';

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

echarts.use([LineChart]);
var LegionsProEchartsChartLineProps = /** @class */ (function (_super) {
    __extends(LegionsProEchartsChartLineProps, _super);
    function LegionsProEchartsChartLineProps() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return LegionsProEchartsChartLineProps;
}(LegionsProEchartsPropsTypes));
var LegionsProEchartsChartLine = /** @class */ (function (_super) {
    __extends(LegionsProEchartsChartLine, _super);
    function LegionsProEchartsChartLine() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
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
                    bottom: '5%',
                    containLabel: true,
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
                series: [
                    {
                        type: 'line',
                    }
                ],
            };
        },
        enumerable: false,
        configurable: true
    });
    LegionsProEchartsChartLine.prototype.render = function () {
        var option = merge(this.option, this.props.option);
        return (React.createElement(LegionsProEcharts, __assign({}, this.props, { option: merge(this.option, option) })));
    };
    LegionsProEchartsChartLine.defaultProps = new LegionsProEchartsChartLineProps();
    return LegionsProEchartsChartLine;
}(React.Component));

export default LegionsProEchartsChartLine;
export { LegionsProEchartsChartLineProps };
