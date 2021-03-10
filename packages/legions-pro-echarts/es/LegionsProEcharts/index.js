/**
  *  legions-pro-echarts v0.0.7
  * (c) 2021 duanguang
  * @license MIT
  */
import LegionsProEchartsCore from '../LegionsProEchartsCore';
import { echarts, LegionsProEchartsPropsTypes } from '../interface';
import { TitleComponent, LegendComponent, TooltipComponent, GridComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

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

var theme = require('../locale/theme.json');
/** 预设组件，也是注册必须的组件 */
echarts.use([TitleComponent, LegendComponent, TooltipComponent, GridComponent, CanvasRenderer]);
var LegionsProEcharts = /** @class */ (function (_super) {
    __extends(LegionsProEcharts, _super);
    function LegionsProEcharts(props) {
        var _this = _super.call(this, props) || this;
        /** 请求托管 */
        _this.autoRequestData = function (params) {
            if (_this.props.request) {
                _this.echartObj.showLoading(_this.props.loadingOption);
                _this.props.request(params).then(function (res) {
                    _this.echartObj.setOption(res);
                }).finally(function () {
                    _this.echartObj.hideLoading();
                });
            }
        };
        _this.echartsLib = echarts;
        return _this;
    }
    LegionsProEcharts.prototype.componentDidMount = function () {
        _super.prototype.componentDidMount.call(this);
        /** 抛出实例 */
        this.props.onChartReady && this.props.onChartReady({
            echarts: this.echartObj,
            methods: { onSearch: this.autoRequestData }
        });
        /** 执行请求 */
        this.autoRequestData();
    };
    LegionsProEcharts.defaultProps = __assign(__assign({}, new LegionsProEchartsPropsTypes()), { theme: theme });
    return LegionsProEcharts;
}(LegionsProEchartsCore));

export default LegionsProEcharts;
