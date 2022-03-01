/**
  *  legions-pro-design v0.0.21
  * (c) 2022 duanguang
  * @license MIT
  */
import { cloneElement, Component } from 'react';
import { findDOMNode } from 'react-dom';

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

/** 排版方向 */
var Direction;
(function (Direction) {
    /** 横向 */
    Direction[Direction["horizontal"] = 0] = "horizontal";
    /** 纵向 */
    Direction[Direction["vertical"] = 1] = "vertical";
})(Direction || (Direction = {}));
/** 打印页面选定区域内容 */
var LegionsProPrint = /** @class */ (function (_super) {
    __extends(LegionsProPrint, _super);
    function LegionsProPrint() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.startPrint = function (target, onAfterPrint) {
            setTimeout(function () {
                target.contentWindow.focus();
                target.contentWindow.print();
                if (onAfterPrint) {
                    onAfterPrint();
                }
            }, 500);
        };
        _this.triggerPrint = function (target) {
            var _a = _this.props, onBeforePrint = _a.onBeforePrint, onAfterPrint = _a.onAfterPrint;
            if (onBeforePrint) {
                var onBeforePrintOutput = onBeforePrint();
                if (onBeforePrintOutput && typeof onBeforePrintOutput.then.bind(_this) === 'function') {
                    onBeforePrintOutput.then(function () {
                        _this.startPrint(target, onAfterPrint);
                    });
                }
                else {
                    _this.startPrint(target, onAfterPrint);
                }
            }
            else {
                _this.startPrint(target, onAfterPrint);
            }
        };
        _this.handlePrint = function () {
            var _a = _this.props, _b = _a.bodyClass, bodyClass = _b === void 0 ? '' : _b, content = _a.content, _c = _a.copyStyles, copyStyles = _c === void 0 ? true : _c, pageStyle = _a.pageStyle, _d = _a.debug, debug = _d === void 0 ? false : _d;
            var contentEl = content();
            if (contentEl === undefined) {
                console.error('Refs are not available for stateless components. For "react-to-print" to work only Class based components can be printed');
                return;
            }
            var printWindowWrap = document.createElement('div');
            var printWindow = document.createElement('iframe');
            var a4Size = _this.getA4Size();
            var scrollBarWidth = 20;
            var direction = Direction.vertical;
            printWindowWrap.style.position = 'fixed';
            printWindowWrap.style.display = 'flex';
            printWindowWrap.style.justifyContent = 'center';
            printWindowWrap.style.top = '-1000px';
            printWindowWrap.style.left = '-1000px';
            printWindowWrap.style.backgroundColor = 'rgba(0,0,0,0.7)';
            printWindowWrap.style.border = '0';
            printWindowWrap.id = 'printWindowWrap';
            printWindow.style.width = a4Size.a4w + scrollBarWidth + "px";
            printWindow.style.height = '100%';
            printWindow.style.border = '0';
            printWindowWrap.appendChild(printWindow);
            /** debug模式下，显示打印排版 */
            if (debug) {
                /** 显示打印容器 */
                printWindowWrap.style.top = '0';
                printWindowWrap.style.left = '0';
                printWindowWrap.style.width = '100%';
                printWindowWrap.style.height = '100%';
                printWindowWrap.style.zIndex = '1000000';
                /** 按钮容器 */
                var btnWrap = document.createElement('div');
                /** 添加切换方向按钮 */
                var transformBtn = document.createElement('button');
                transformBtn.innerText = '切换方向';
                transformBtn.style.display = 'block';
                transformBtn.style.width = '80px';
                transformBtn.style.height = '30px';
                transformBtn.style.margin = '10px 10px 0 10px';
                transformBtn.onclick = function () {
                    direction = direction === Direction.vertical ? Direction.horizontal : Direction.vertical;
                    var width = direction === Direction.vertical ? a4Size.a4w : a4Size.a4h;
                    printWindow.style.width = width + scrollBarWidth + "px";
                };
                btnWrap.appendChild(transformBtn);
                /** 添加打印按钮 */
                var printBtn = document.createElement('button');
                printBtn.innerText = '打印';
                printBtn.style.display = 'block';
                printBtn.style.width = '80px';
                printBtn.style.height = '30px';
                printBtn.style.margin = '10px 10px 0 10px';
                printBtn.onclick = function () { return _this.triggerPrint(printWindow); };
                btnWrap.appendChild(printBtn);
                /** 添加关闭按钮 */
                var closeBtn = document.createElement('button');
                closeBtn.innerText = '关闭';
                closeBtn.style.display = 'block';
                closeBtn.style.width = '80px';
                closeBtn.style.height = '30px';
                closeBtn.style.margin = '10px 10px 0 10px';
                closeBtn.onclick = function () {
                    document.body.removeChild(document.getElementById('printWindowWrap'));
                };
                btnWrap.appendChild(closeBtn);
                printWindowWrap.appendChild(btnWrap);
            }
            var contentNodes = findDOMNode(contentEl);
            var linkNodes = document.querySelectorAll('link[rel="stylesheet"]');
            _this.linkTotal = linkNodes.length || 0;
            _this.linksLoaded = [];
            _this.linksErrored = [];
            var markLoaded = function (linkNode, loaded) {
                if (loaded) {
                    _this.linksLoaded.push(linkNode);
                }
                else {
                    console.error("\"react-to-print\" was unable to load a link. It may be invalid. 'react-to-print' will continue attempting to print the page. The link the errored was:", linkNode);
                    _this.linksErrored.push(linkNode);
                }
                if (_this.linksLoaded.length + _this.linksErrored.length === _this.linkTotal) {
                    !debug && _this.triggerPrint(printWindow);
                }
            };
            printWindow.onload = function () {
                /* IE11 support */
                if (window.navigator && window.navigator.userAgent.indexOf('Trident/7.0') > -1) {
                    printWindow.onload = null;
                }
                var domDoc = printWindow.contentDocument || printWindow.contentWindow.document;
                var srcCanvasEls = contentNodes.querySelectorAll('canvas');
                domDoc.open();
                domDoc.write(contentNodes.outerHTML);
                domDoc.close();
                /* remove date/time from top */
                var defaultPageStyle = pageStyle === undefined
                    ? '@page { size: auto;  margin: 0mm; } @media print { body { -webkit-print-color-adjust: exact; } }'
                    : pageStyle;
                var styleEl = domDoc.createElement('style');
                styleEl.appendChild(domDoc.createTextNode(defaultPageStyle));
                domDoc.head.appendChild(styleEl);
                if (bodyClass.length) {
                    domDoc.body.classList.add(bodyClass);
                    domDoc.body.style.overflowY = 'scorll';
                }
                var canvasEls = domDoc.querySelectorAll('canvas');
                for (var index = 0, l = canvasEls.length; index < l; ++index) {
                    var node = canvasEls[index];
                    node.getContext('2d').drawImage(srcCanvasEls[index], 0, 0);
                }
                if (copyStyles !== false) {
                    var headEls = document.querySelectorAll('style, link[rel="stylesheet"]');
                    for (var index = 0, l = headEls.length; index < l; ++index) {
                        var node = headEls[index];
                        if (node.tagName === 'STYLE') {
                            var newHeadEl = domDoc.createElement(node.tagName);
                            var sheet = node.sheet;
                            if (sheet) {
                                var styleCSS = '';
                                // tslint:disable-next-line
                                for (var i = 0; i < sheet.cssRules.length; i++) {
                                    if (typeof sheet.cssRules[i].cssText === 'string') {
                                        styleCSS += sheet.cssRules[i].cssText + "\r\n";
                                    }
                                }
                                newHeadEl.setAttribute('id', "react-to-print-" + index);
                                newHeadEl.appendChild(domDoc.createTextNode(styleCSS));
                                domDoc.head.appendChild(newHeadEl);
                            }
                        }
                        else {
                            if (node.hasAttribute('href') && !!node.getAttribute('href')) {
                                var newHeadEl = domDoc.createElement(node.tagName);
                                for (var i = 0, l_1 = node.attributes.length; i < l_1; ++i) {
                                    var attr = node.attributes[i];
                                    newHeadEl.setAttribute(attr.nodeName, attr.nodeValue);
                                }
                                newHeadEl.onload = markLoaded.bind(null, newHeadEl, true);
                                newHeadEl.onerror = markLoaded.bind(null, newHeadEl, false);
                                domDoc.head.appendChild(newHeadEl);
                            }
                            else {
                                console.warn('"react-to-print" encountered a <link> tag with an empty "href" attribute. In addition to being invalid HTML, this can cause problems in many browsers, and so the <link> was not loaded. The <link> is:', node);
                                markLoaded(node, true); // `true` because we've already shown a warning for this
                            }
                        }
                    }
                }
                if (_this.linkTotal === 0 || copyStyles === false) {
                    !debug && _this.triggerPrint(printWindow);
                }
            };
            if (document.getElementById('printWindowWrap')) {
                document.body.removeChild(document.getElementById('printWindowWrap'));
            }
            document.body.appendChild(printWindowWrap);
        };
        _this.setRef = function (ref) {
            _this.triggerRef = ref;
        };
        return _this;
    }
    LegionsProPrint.prototype.componentDidMount = function () {
        this.props.debug && this.handlePrint();
    };
    /** 根据屏幕DPI，计算A4尺寸 */
    LegionsProPrint.prototype.getA4Size = function () {
        var tmpNode = document.createElement('div');
        /* 浏览器A4宽度：dpi/inch * standardWdith */
        var dpi = 96; // 默认屏幕dpi
        var inch = 25.4; // 一英寸为25.4毫米
        var standardWdith = 210; // A4标准宽度210
        var standardHeight = 297; // A4标准高度297
        tmpNode.style.cssText = 'width:1in;height:1in;position:absolute;left:0px;top:0px;z-index:99;visibility:hidden';
        document.body.appendChild(tmpNode);
        dpi = tmpNode.offsetWidth;
        tmpNode.parentNode.removeChild(tmpNode);
        return {
            a4w: dpi / inch * standardWdith,
            a4h: dpi / inch * standardHeight,
        };
    };
    LegionsProPrint.prototype.render = function () {
        var trigger = this.props.trigger;
        return cloneElement(trigger(), {
            onClick: this.handlePrint,
            ref: this.setRef,
        });
    };
    return LegionsProPrint;
}(Component));

export default LegionsProPrint;
