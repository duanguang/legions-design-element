/**
  *  legions-pro-echarts v0.0.7
  * (c) 2021 duanguang
  * @license MIT
  */
import 'echarts-wordcloud';
import { merge } from 'lodash';
import React from 'react';
import { mainColorList } from '../core';
import { LegionsProEchartsPropsTypes } from '../interface';
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

var LegionsProEchartsWordCloudProps = /** @class */ (function (_super) {
    __extends(LegionsProEchartsWordCloudProps, _super);
    function LegionsProEchartsWordCloudProps() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return LegionsProEchartsWordCloudProps;
}(LegionsProEchartsPropsTypes));
var LegionsProEchartsWordCloud = /** @class */ (function (_super) {
    __extends(LegionsProEchartsWordCloud, _super);
    function LegionsProEchartsWordCloud() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(LegionsProEchartsWordCloud.prototype, "option", {
        /** 配置项 */
        get: function () {
            return {
                series: [
                    {
                        type: 'wordCloud',
                        sizeRange: [6, 20],
                        rotationRange: [-90, 90],
                        textPadding: 0,
                        gridSize: 5,
                        left: 'center',
                        top: 'center',
                        drawOutOfBound: false,
                        textStyle: {
                            color: function (e) {
                                return mainColorList[e.dataIndex % mainColorList.length];
                            }
                        },
                        data: this.props.data || []
                    },
                ],
            };
        },
        enumerable: false,
        configurable: true
    });
    LegionsProEchartsWordCloud.prototype.render = function () {
        var option = merge(this.option, this.props.option);
        return (React.createElement(LegionsProEcharts, __assign({}, this.props, { option: option })));
    };
    LegionsProEchartsWordCloud.defaultProps = new LegionsProEchartsWordCloudProps();
    return LegionsProEchartsWordCloud;
}(React.Component));

export default LegionsProEchartsWordCloud;
export { LegionsProEchartsWordCloudProps };
