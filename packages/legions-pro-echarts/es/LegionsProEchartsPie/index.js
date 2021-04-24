/**
  *  legions-pro-echarts v0.0.7
  * (c) 2021 duanguang
  * @license MIT
  */
import { PieChart } from 'echarts/charts';
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

echarts.use([PieChart]);
var LegionsProEchartsPieProps = /** @class */ (function (_super) {
    __extends(LegionsProEchartsPieProps, _super);
    function LegionsProEchartsPieProps() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return LegionsProEchartsPieProps;
}(LegionsProEchartsPropsTypes));
/** 饼图组件 */
var LegionsProEchartsPie = /** @class */ (function (_super) {
    __extends(LegionsProEchartsPie, _super);
    function LegionsProEchartsPie() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(LegionsProEchartsPie.prototype, "option", {
        /** 配置项 */
        get: function () {
            return {
                tooltip: {
                    trigger: 'item',
                    formatter: '{b} : {c} ({d}%)',
                },
                legend: {
                    bottom: 20,
                    itemWidth: 10,
                    itemHeight: 4,
                },
                series: [
                    {
                        type: 'pie',
                        radius: '40%',
                        center: ['50%', '40%'],
                        itemStyle: {
                            borderRadius: 0,
                            borderColor: 'rgba(12,13,41,0.4)',
                            borderWidth: 2
                        },
                        selectedOffset: 1.5,
                        data: this.props.data || [],
                        label: {
                            show: true,
                            formatter: '{b}\n{d}%',
                        },
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    },
                ],
            };
        },
        enumerable: false,
        configurable: true
    });
    LegionsProEchartsPie.prototype.render = function () {
        var option = merge(this.option, this.props.option);
        return (React.createElement(LegionsProEcharts, __assign({}, this.props, { option: option })));
    };
    LegionsProEchartsPie.defaultProps = new LegionsProEchartsPieProps();
    return LegionsProEchartsPie;
}(React.PureComponent));

export default LegionsProEchartsPie;
export { LegionsProEchartsPieProps };
