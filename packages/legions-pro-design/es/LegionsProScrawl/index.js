/**
  *  legions-pro-design v0.0.9
  * (c) 2021 duanguang
  * @license MIT
  */
import React from 'react';
import { Paper, Rect } from 'react-raphael';
import './style/index.less';
import { message, Icon, Popover, Slider } from 'antd';
import { observer } from 'legions/store-react';
import { observableViewModel } from 'legions/store-utils';
import { observable, computed } from 'mobx';
import { runScriptsSdk } from 'legions-thirdparty-plugin';

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

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

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

var redoSrc = 'https://gitee.com/duanguang/figure-bed/raw/master/oss/redo.png';
var redo1Src = 'https://gitee.com/duanguang/figure-bed/raw/master/oss/redo-1.png';
var undoSrc = 'https://gitee.com/duanguang/figure-bed/raw/master/oss/undo1.png';
var PickcolorSrc = 'https://gitee.com/duanguang/figure-bed/raw/master/oss/Pickcolor.png';
var ua = navigator.userAgent.toLowerCase();
var isMobile = /iphone|ipad|ipod|Android/.test(ua);
var ViewModel = /** @class */ (function () {
    function ViewModel() {
        this.chochooseColor = 'red';
        /**
         * 画笔属性
         *
         * @memberof ViewModel
         */
        this.brushColor = { "stroke": "#FF3C2A", "stroke-width": 6, opacity: 0.8 };
        /**
         *
         * 画板是否可见
         * @type {boolean}
         * @memberof ViewModel
         */
        this.visible = true;
        /**
         *
         * 待还原队列
         * @type {[]}
         * @memberof ViewModel
         */
        this.redoQueue = [];
    }
    Object.defineProperty(ViewModel.prototype, "colorStyle", {
        get: function () {
            var styles = {
                red: {
                    className: 'wPaint-menu-color-icon-bred',
                    value: '#FF3C2A',
                },
                violet: {
                    className: 'wPaint-menu-color-icon-bviolet',
                    value: '#9D4DB3',
                },
                yellow: {
                    className: 'wPaint-menu-color-icon-byellow',
                    value: '#E37C56',
                },
                black: {
                    className: 'wPaint-menu-color-icon-bblack',
                    value: '#484948',
                },
                blue: {
                    className: 'wPaint-menu-color-icon-bblue',
                    value: '#6CCBDD',
                },
                green: {
                    className: 'wPaint-menu-color-icon-bgreen',
                    value: '#77E680',
                },
            };
            return styles[this.chochooseColor];
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        observable,
        __metadata("design:type", String)
    ], ViewModel.prototype, "chochooseColor", void 0);
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], ViewModel.prototype, "brushColor", void 0);
    __decorate([
        observable,
        __metadata("design:type", Boolean)
    ], ViewModel.prototype, "visible", void 0);
    __decorate([
        observable,
        __metadata("design:type", Array)
    ], ViewModel.prototype, "redoQueue", void 0);
    __decorate([
        computed,
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], ViewModel.prototype, "colorStyle", null);
    return ViewModel;
}());
var LegionsProScrawl = /** @class */ (function (_super) {
    __extends(LegionsProScrawl, _super);
    /* modulesUid: string = ''; */
    function LegionsProScrawl(props) {
        var _this = _super.call(this, props) || this;
        _this.offset = {
            x: 0,
            y: 0,
        };
        _this.paper = null;
        _this.set = null;
        _this.path = null;
        _this.viewMoDel = observableViewModel(new ViewModel());
        _this.onChange = function (value) {
            _this.viewMoDel.dispatchAction(function () {
                _this.viewMoDel.brushColor.opacity = value / 100;
            });
        };
        _this.state = {
            loaded: false
        };
        // @ts-ignore
        _this.viewMoDel.brushColor = _this.props.attr;
        return _this;
    }
    LegionsProScrawl.prototype.componentDidMount = function () {
        var _this = this;
        this.handleStart = this.handleStart.bind(this);
        this.handleMove = this.handleMove.bind(this);
        this.handleEnd = this.handleEnd.bind(this);
        this.setState({
            loaded: true
        });
        this.props.onReady && this.props.onReady({
            methods: {
                onDrawScrawl: this.initLocalPath.bind(this),
                clear: this.clear.bind(this),
                getLocationPath: function () {
                    var path = [];
                    // @ts-ignore
                    for (var i = 0; i < _this.set.items.length; i++) {
                        // @ts-ignore
                        path.push(_this.set.items[i].attrs);
                    }
                    return path;
                }
            }
        });
    };
    LegionsProScrawl.prototype.initLocalPath = function (value) {
        var _this = this;
        // @ts-ignore
        var paper = this.refs.paper.getPaper();
        if (!this.set)
            this.set = paper.set();
        /* const attrs:IAttrs[] = eval('(' + window.localStorage.getItem('test11') + ')') */
        var attrs = value;
        if (attrs && Array.isArray(attrs)) {
            attrs.map(function (item) {
                var path = paper.path();
                // @ts-ignore
                path.attr({
                    /* path: [eval('(' + window.localStorage.getItem('test11') + ')')] */
                    path: item.path,
                    stroke: item.stroke,
                    'stroke-width': item['stroke-width'],
                });
                _this.set.push(path);
            });
        }
    };
    LegionsProScrawl.prototype.handleToImage = function () {
        var _this = this;
        if (!runScriptsSdk.plugins.html2canvas) {
            message.warning('Plugin is not ready to excel, Please install at the entrance(legionsThirdpartyPlugin.use({name:"html2canvas",url:"xxxx"}))');
            return;
        }
        var body = document.body;
        if (this.props.onRenderhtml2canvas) {
            body = this.props.onRenderhtml2canvas();
        }
        runScriptsSdk.plugins.html2canvas.html2canvas(body, this.props.html2canvasOptions).then(function (canvas) {
            /* canvas.id = 'screenshotCanvas';
            document.body.appendChild(canvas);
            const can = document.getElementById("screenshotCanvas");
            // @ts-ignore
            can.style = "display:none"
            // @ts-ignore
            const dataURL = can.toDataURL('image/png');
            const dataImg = new Image()
            dataImg.src = dataURL
            const alink = document.createElement("a");
            alink.href = dataImg.src;
            alink.download = "附件.p ng";
            alink.click(); */
            // canvas宽度
            var canvasWidth = canvas.width;
            // canvas高度
            var canvasHeight = canvas.height;
            //@ts-ignore
            var img = legionsThirdpartyPlugin.plugins.html2canvas.Canvas2Image.convertToImage(canvas, canvasWidth, canvasHeight);
            /* Canvas2Image.saveAsPNG(canvas, canvasWidth, canvasHeight); */
            var path = [];
            // @ts-ignore
            for (var i = 0; i < _this.set.items.length; i++) {
                // @ts-ignore
                path.push(_this.set.items[i].attrs);
            }
            /* const queryCode = serialize(path,{ ignoreFunction: false,space: 2 })
            window.localStorage.setItem('test11',queryCode) */
            _this.props.onSubmit && _this.props.onSubmit(path, img, canvas);
        });
    };
    LegionsProScrawl.prototype.handleStart = function (x, y, e) {
        // @ts-ignore
        this.paper = this.refs.paper.getPaper();
        var container = null;
        var canvasParentContainer = this.paper.canvas.parentElement;
        if (this.props.parentElement) {
            container = document.querySelector("." + this.props.parentElement);
        }
        /* this.offset = {
            x: canvasParentContainer.offsetLeft,
            y: canvasParentContainer.offsetTop,
        } */
        if (!this.set)
            this.set = this.paper.set();
        this.path = this.paper.path();
        var locationX = x;
        var locationY = y;
        if (container) {
            locationX = x - container.offsetLeft - canvasParentContainer.offsetLeft + container.scrollLeft;
            locationY = y - container.offsetTop - canvasParentContainer.offsetTop + container.scrollTop;
        }
        else {
            locationX = x - canvasParentContainer.offsetLeft + canvasParentContainer.scrollLeft;
            locationY = y - canvasParentContainer.offsetTop + canvasParentContainer.scrollTop;
        }
        /*  this.d = [["M",locationX - this.offset.x,locationY - this.offset.y]]; */
        this.d = [["M", locationX, locationY]];
        // @ts-ignore
        this.path.attr(this.viewMoDel.brushColor);
        // @ts-ignore
        this.path.attr({
            path: this.d
        });
        this.moving = true;
        this.set.push(this.path);
    };
    LegionsProScrawl.prototype.handleMove = function (dx, dy, x, y, e) {
        if (this.moving) {
            var locationX = x;
            var locationY = y;
            var container = null;
            if (this.props.parentElement) {
                container = document.querySelector("." + this.props.parentElement);
            }
            var canvasParentElement = this.paper.canvas.parentElement;
            if (container) {
                locationX = x - container.offsetLeft - canvasParentElement.offsetLeft + container.scrollLeft;
                locationY = y - container.offsetTop - canvasParentElement.offsetTop + container.scrollTop;
            }
            else {
                locationX = x - canvasParentElement.offsetLeft + canvasParentElement.scrollLeft;
                locationY = y - canvasParentElement.offsetTop + canvasParentElement.scrollTop;
            }
            /* this.d.push(["L",locationX - this.offset.x,locationY - this.offset.y]); */
            this.d.push(["L", locationX, locationY]);
            // @ts-ignore
            this.path.attr({
                path: this.d
            });
        }
        this.moving = true;
    };
    LegionsProScrawl.prototype.handleEnd = function (e) {
        this.moving = false;
    };
    LegionsProScrawl.prototype.clear = function () {
        var _this = this;
        if (!this.set)
            return;
        // @ts-ignore
        for (var i = 0; i < this.set.items.length; i++) {
            // @ts-ignore
            this.set.items[i].remove();
        }
        // @ts-ignore
        this.set.clear();
        this.viewMoDel.dispatchAction(function () {
            _this.viewMoDel.redoQueue = [];
        });
    };
    LegionsProScrawl.prototype.handleChooseColor = function (value) {
        this.viewMoDel.chochooseColor = value;
        this.viewMoDel.brushColor.stroke = this.viewMoDel.colorStyle.value;
    };
    LegionsProScrawl.prototype.handleVisible = function () {
        this.viewMoDel.visible = !this.viewMoDel.visible;
        this.props.onVisible && this.props.onVisible(this.viewMoDel.visible);
    };
    /**
     * 撤销最后一条记录
     *
     * @returns
     * @memberof HLScrawl
     */
    LegionsProScrawl.prototype.handleUndo = function () {
        var _this = this;
        if (!this.set)
            return;
        // @ts-ignore
        if (this.set.items.length > 0) {
            // @ts-ignore
            var rear_1 = this.set.items.pop();
            this.viewMoDel.dispatchAction(function () {
                // @ts-ignore
                _this.viewMoDel.redoQueue.push(rear_1);
            });
            rear_1.hide();
        }
    };
    LegionsProScrawl.prototype.handleRedo = function () {
        var _this = this;
        if (!this.set)
            return;
        if (this.viewMoDel.redoQueue.length > 0) {
            var newArray = __spread(this.viewMoDel.redoQueue);
            var item_1 = newArray.pop();
            this.viewMoDel.dispatchAction(function () {
                _this.viewMoDel.redoQueue.pop();
            });
            // @ts-ignore
            for (var i = 0; i < this.set.length; i++) {
                // @ts-ignore
                if (typeof this.set[i] === 'object' && !Array.isArray(this.set[i]) && this.set[i].id === item_1['id']) {
                    // @ts-ignore
                    /* this.set.push(item) */
                    this.set[i].show();
                }
            }
            // @ts-ignore
            var index = this.set.items.findIndex(function (items) { return item_1.id === items.id; });
            if (index < 0) {
                // @ts-ignore
                this.set.items.push(item_1);
            }
        }
    };
    LegionsProScrawl.prototype.render = function () {
        var _a = this.props, width = _a.width, height = _a.height;
        return (React.createElement("div", { className: "" + (!this.viewMoDel.visible ? 'legions-pro-scrawl-paper-container-not-visible' : '') },
            React.createElement(Paper, { ref: "paper", width: width, height: height },
                React.createElement(Rect, { x: 0, y: 0, width: width, height: height, drag: { move: this.handleMove, start: this.handleStart, end: this.handleEnd } })),
            React.createElement("div", { className: "legions-pro-scrawl-menu-holder", style: { zIndex: 9 } },
                React.createElement("div", { className: "legions-pro-scrawl-menu-icon" },
                    React.createElement("img", { src: undoSrc, className: "legions-pro-scrawl-menu-icon-img", onClick: this.handleUndo.bind(this) })),
                React.createElement("div", { className: "legions-pro-scrawl-menu-icon" },
                    React.createElement("img", { src: this.viewMoDel.redoQueue.length > 0 ? redoSrc : redo1Src, className: "legions-pro-scrawl-menu-icon-img", onClick: this.handleRedo.bind(this) })),
                React.createElement("div", { className: "legions-pro-scrawl-menu-icon" },
                    React.createElement(Icon, { title: this.viewMoDel.visible ? "隐藏" : "显示", type: this.viewMoDel.visible ? 'eye-o' : 'eye', onClick: this.handleVisible.bind(this), style: { fontSize: '18px' }, className: "legions-pro-scrawl-menu-antd-icon" })),
                React.createElement("div", { className: "legions-pro-scrawl-menu-icon" },
                    React.createElement(Popover, { placement: "bottomLeft", title: (React.createElement("div", null,
                            React.createElement("span", { style: { float: 'left' } }, "\u9009\u53D6\u989C\u8272:"),
                            React.createElement("div", { className: "legions-pro-scrawl-menu-color-icon-bg " + this.viewMoDel.colorStyle.className }),
                            React.createElement("br", null),
                            React.createElement("span", null, "\u900F\u660E\u5EA6:"),
                            React.createElement(Slider, { defaultValue: this.viewMoDel.brushColor.opacity * 100, value: this.viewMoDel.brushColor.opacity * 100, onChange: this.onChange, min: 1, max: 100 }))), content: (React.createElement("div", { className: "legions-pro-scrawl-menu-holder" },
                            React.createElement("div", { className: "legions-pro-scrawl-menu-color-icon" },
                                React.createElement("div", { className: "legions-pro-scrawl-menu-color-icon-bg legions-pro-scrawl-menu-color-icon-bred", onClick: this.handleChooseColor.bind(this, 'red') }),
                                React.createElement("div", { className: "legions-pro-scrawl-menu-color-icon-bg legions-pro-scrawl-menu-color-icon-bviolet", onClick: this.handleChooseColor.bind(this, 'violet') }),
                                React.createElement("div", { className: "legions-pro-scrawl-menu-color-icon-bg legions-pro-scrawl-menu-color-icon-byellow", onClick: this.handleChooseColor.bind(this, 'yellow') }),
                                React.createElement("div", { className: "legions-pro-scrawl-menu-color-icon-bg legions-pro-scrawl-menu-color-icon-bblack", onClick: this.handleChooseColor.bind(this, 'black') }),
                                React.createElement("div", { className: "legions-pro-scrawl-menu-color-icon-bg legions-pro-scrawl-menu-color-icon-bblue", onClick: this.handleChooseColor.bind(this, 'blue') }),
                                React.createElement("div", { className: "legions-pro-scrawl-menu-color-icon-bg legions-pro-scrawl-menu-color-icon-bgreen", onClick: this.handleChooseColor.bind(this, 'green') })))), trigger: "click" },
                        React.createElement("img", { src: PickcolorSrc, className: "legions-pro-scrawl-menu-icon-img" }))))));
    };
    LegionsProScrawl.defaultProps = {
        width: 600,
        height: 400,
        attr: { "stroke": "#FF3C2A", opacity: 0.8, "stroke-width": 3 },
        modulesName: 'GeneralForm/HLScrawl',
        isNormalFlow: false,
    };
    LegionsProScrawl = __decorate([
        observer,
        __metadata("design:paramtypes", [Object])
    ], LegionsProScrawl);
    return LegionsProScrawl;
}(React.Component));

export default LegionsProScrawl;
