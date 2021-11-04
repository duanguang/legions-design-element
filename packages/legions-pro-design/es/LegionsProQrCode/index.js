/**
  *  legions-pro-design v0.0.8-beta.1
  * (c) 2021 duanguang
  * @license MIT
  */
import React from 'react';

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

/* const QRCodeImpl = require('qr.js/lib/QRCode');
const ErrorCorrectLevel = require('qr.js/lib/ErrorCorrectLevel'); */
var qr = require('qr.js');
var PropTypes = require('prop-types');
var ReactDOM = require('react-dom');
function getBackingStorePixelRatio(ctx) {
    return (ctx.webkitBackingStorePixelRatio ||
        ctx.mozBackingStorePixelRatio ||
        ctx.msBackingStorePixelRatio ||
        ctx.oBackingStorePixelRatio ||
        ctx.backingStorePixelRatio ||
        1);
}
var getDOMNode;
if (/^0\.14/.test(React.version)) {
    getDOMNode = function (ref) {
        return ref;
    };
}
else {
    getDOMNode = function (ref) {
        return ReactDOM.findDOMNode(ref);
    };
}
var LegionsProQrCode = /** @class */ (function (_super) {
    __extends(LegionsProQrCode, _super);
    function LegionsProQrCode(props) {
        return _super.call(this, props) || this;
    }
    LegionsProQrCode.prototype.shouldComponentUpdate = function (nextProps) {
        var that = this;
        return Object.keys(this.props).some(function (k) {
            return that.props[k] !== nextProps[k];
        });
    };
    LegionsProQrCode.prototype.componentDidMount = function () {
        this.update();
    };
    LegionsProQrCode.prototype.componentDidUpdate = function () {
        this.update();
    };
    LegionsProQrCode.prototype.utf16to8 = function (str) {
        var out, i, len, c;
        out = "";
        len = str.length;
        for (i = 0; i < len; i++) {
            c = str.charCodeAt(i);
            if ((c >= 0x0001) && (c <= 0x007F)) {
                out += str.charAt(i);
            }
            else if (c > 0x07FF) {
                out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
                out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
                out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
            }
            else {
                out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
                out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
            }
        }
        return out;
    };
    LegionsProQrCode.prototype.update = function () {
        var _this = this;
        var value = this.utf16to8(this.props.value);
        var qrcode = qr(value);
        var canvas = getDOMNode(this.refs.canvas);
        var ctx = canvas.getContext('2d');
        var cells = qrcode.modules;
        var tileW = this.props.size / cells.length;
        var tileH = this.props.size / cells.length;
        var scale = (window.devicePixelRatio || 1) / getBackingStorePixelRatio(ctx);
        canvas.height = canvas.width = this.props.size * scale;
        ctx.scale(scale, scale);
        cells.forEach(function (row, rdx) {
            row.forEach(function (cell, cdx) {
                ctx.fillStyle = cell ? _this.props.fgColor : _this.props.bgColor;
                var w = (Math.ceil((cdx + 1) * tileW) - Math.floor(cdx * tileW));
                var h = (Math.ceil((rdx + 1) * tileH) - Math.floor(rdx * tileH));
                ctx.fillRect(Math.round(cdx * tileW), Math.round(rdx * tileH), w, h);
            }, _this);
        }, this);
        if (this.props.image) {
            var self_1 = this;
            var size_1 = this.props.size;
            var image_1 = document.createElement('img');
            image_1.src = this.props.image;
            image_1.onload = function () {
                var dwidth = self_1.props.imageWidth || size_1 * 0.2;
                var dheight = self_1.props.imageHeight || image_1.height / image_1.width * dwidth;
                var dx = (size_1 - dwidth) / 2;
                var dy = (size_1 - dheight) / 2;
                image_1.width = dwidth;
                image_1.height = dheight;
                ctx.drawImage(image_1, dx, dy, dwidth, dheight);
            };
        }
    };
    LegionsProQrCode.prototype.render = function () {
        return React.createElement('canvas', {
            style: { height: this.props.size, width: this.props.size },
            height: this.props.size,
            width: this.props.size,
            ref: 'canvas'
        });
    };
    LegionsProQrCode.defaultProps = {
        size: 128,
        bgColor: '#FFFFFF',
        fgColor: '#000000',
        value: 'https://baidu.com/'
    };
    return LegionsProQrCode;
}(React.Component));

export default LegionsProQrCode;
