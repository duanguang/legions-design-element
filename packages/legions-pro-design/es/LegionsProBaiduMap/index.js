/**
  *  legions-pro-design v0.0.9
  * (c) 2021 duanguang
  * @license MIT
  */
import React from 'react';
import { shortHash } from 'legions-lunar/object-hash';

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

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

/** @deprecated */
function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

/** ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
var AK = 'qGCNVaqaLys5IewTGcIuswUEtcAq0rp6';
var IProps = /** @class */ (function () {
    function IProps() {
        /**
         * 标记, 支持多个标记 eg：[['116.403847', '39.915526']]，默认北京天安门
         * @type {Array<MapMarkerPointType>}
         * @memberof IProps
         */
        this.marker = [{
                position: ['116.403847', '39.915526'],
                title: '天安门',
            }];
        /**
         * 缩放比例
         * @type {number}
         * @memberof IProps
         */
        this.zoom = 16;
        /**
         * 百度api脚本地址
         * @type {string}
         * @memberof IProps
         */
        this.src = "https://api.map.baidu.com/getscript?v=2.0&ak=" + AK;
        /**
         * 请求类型, 默认https，根据百度window['HOST_TYPE']所有参数类型设置，1表示http、2表示https
         * @type {string}
         * @memberof IProps
         */
        this.hostType = '2';
    }
    return IProps;
}());
var LegionsProBaiduMap = /** @class */ (function (_super) {
    __extends(LegionsProBaiduMap, _super);
    function LegionsProBaiduMap() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** 地图唯一标识 */
        _this.uid = "BaiduMap-" + shortHash(new Date().getTime());
        return _this;
    }
    LegionsProBaiduMap.prototype.componentDidMount = function () {
        this.loadBaiduMapAPI(this.props);
    };
    LegionsProBaiduMap.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps !== this.props) {
            this.loadBaiduMapAPI(nextProps);
        }
    };
    /** 创建地图 */
    LegionsProBaiduMap.prototype.createMap = function (props) {
        var _a, _b;
        var BMap = window['BMap'];
        /** 创建 */
        var map = new BMap.Map(this.uid);
        /** 不传position则默认定位到第一个标点 */
        if (props.position) {
            /** 定位 */
            var point = new ((_a = BMap.Point).bind.apply(_a, __spread([void 0], props.position)))();
            /** 初始化缩放 */
            map.centerAndZoom(point, props.zoom);
        }
        else {
            /** 定位 */
            //@ts-ignore
            var point = new ((_b = BMap.Point).bind.apply(_b, __spread([void 0], props.marker[0].position)))();
            /** 初始化缩放 */
            map.centerAndZoom(point, props.zoom);
        }
        /** 启动鼠标滚轮事件 */
        map.enableScrollWheelZoom();
        /** 添加标尺 */
        var navControl = new BMap.NavigationControl({ anchor: 'BMAP_ANCHOR_TOP_LEFT', type: 'BMAP_NAVIGATION_CONTROL_LARGE' });
        map.addControl(navControl);
        //@ts-ignore
        props.marker.forEach(function (_a) {
            var _b;
            var position = _a.position, title = _a.title;
            var markerPoint = new ((_b = BMap.Point).bind.apply(_b, __spread([void 0], position)))();
            /** 创建标注 */
            var marker = new BMap.Marker(markerPoint);
            /** 备注信息 */
            var label = new BMap.Label(title, { offset: new BMap.Size(25, 5) });
            /** 向标注上添加备注信息 */
            marker.setLabel(label);
            /** 方法addOverlay() 向地图中添加覆盖物 */
            map.addOverlay(marker);
        });
    };
    /** 加载百度地图API */
    LegionsProBaiduMap.prototype.loadBaiduMapAPI = function (props) {
        /** 设置host类型  */
        window['HOST_TYPE'] = this.props.hostType;
        // tslint:disable-next-line
        if (!window['BMap']) {
            var that_1 = this;
            var script = document.createElement('script');
            //@ts-ignore
            script.src = this.props.src;
            // @ts-ignore
            script.onload = script.onreadystatechange = function () {
                //@ts-ignore
                if (!this.readyState || /^(loaded|complete)$/.test(this.readyState)) {
                    that_1.createMap(props);
                }
            };
            document.body.appendChild(script);
        }
        else {
            this.createMap(props);
        }
    };
    LegionsProBaiduMap.prototype.render = function () {
        return (React.createElement("div", { id: this.uid, style: __assign({ width: '100%', height: '100%', minHeight: '300px', fontSize: '12px' }, this.props.style) }));
    };
    LegionsProBaiduMap.defaultProps = new IProps();
    return LegionsProBaiduMap;
}(React.Component));

export default LegionsProBaiduMap;
