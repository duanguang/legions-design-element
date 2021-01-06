import React from 'react';
/* const QRCodeImpl = require('qr.js/lib/QRCode');
const ErrorCorrectLevel = require('qr.js/lib/ErrorCorrectLevel'); */
const qr = require('qr.js');
const PropTypes = require('prop-types');
const ReactDOM = require('react-dom');
function getBackingStorePixelRatio(ctx) {
    return (
        ctx.webkitBackingStorePixelRatio ||
        ctx.mozBackingStorePixelRatio ||
        ctx.msBackingStorePixelRatio ||
        ctx.oBackingStorePixelRatio ||
        ctx.backingStorePixelRatio ||
        1
    );
}
let getDOMNode;
if (/^0\.14/.test(React.version)) {
    getDOMNode = function(ref) {
        return ref;
    }
} else {
    getDOMNode = function(ref) {
        return ReactDOM.findDOMNode(ref);
    }
}
interface IProps{
    value: string;

    /**
     * 二维码的宽和高，单位是px，只允许生成正方形二维码

     * 
     *
     * @type {number}
     * @memberof IProps
     */
    size?: number;

    /**
     *
     * 背景色
     * @type {string}
     * @memberof IProps
     */
    bgColor?: string;

    /**
     * 前景色
     *
     * @type {string}
     * @memberof IProps
     */
    fgColor?: string;

    /**
     * 码正中间图片的url，只支持配置正方形图片
     *
     * @type {string}
     * @memberof IProps
     */
    image?: string;
    imageWidth?: number;
    imageHeight?: number;
}
interface IState{ }

export default class LegionsProQrCode extends React.Component<IProps,IState>{
    constructor(props:IProps) {
        super(props);
    }
    static defaultProps = {
        size: 128,
        bgColor: '#FFFFFF',
        fgColor: '#000000',
        value: 'https://baidu.com/'
    };
    shouldComponentUpdate(nextProps) {
        const that = this;
        return Object.keys(this.props).some(function(k) {
            return that.props[k] !== nextProps[k];
        });
    }

    componentDidMount() {
        this.update();
    }

    componentDidUpdate() {
        this.update();
    }

    utf16to8(str) {
        let out, i, len, c;
        out = "";
        len = str.length;
        for (i = 0; i < len; i++) {
            c = str.charCodeAt(i);
            if ((c >= 0x0001) && (c <= 0x007F)) {
                out += str.charAt(i);
            } else if (c > 0x07FF) {
                out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
                out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
                out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
            } else {
                out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
                out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
            }
        }
        return out;
    }

    update() {
        let value = this.utf16to8(this.props.value);
        let qrcode = qr(value);
        let canvas = getDOMNode(this.refs.canvas);
        let ctx = canvas.getContext('2d');
        let cells = qrcode.modules;
        let tileW = this.props.size / cells.length;
        let tileH = this.props.size / cells.length;
        let scale = (window.devicePixelRatio || 1) / getBackingStorePixelRatio(ctx);
        canvas.height = canvas.width = this.props.size * scale;
        ctx.scale(scale, scale);

        cells.forEach((row, rdx)=> {
            row.forEach((cell, cdx)=> {
                ctx.fillStyle = cell ? this.props.fgColor : this.props.bgColor;
                let w = (Math.ceil((cdx + 1) * tileW) - Math.floor(cdx * tileW));
                let h = (Math.ceil((rdx + 1) * tileH) - Math.floor(rdx * tileH));
                ctx.fillRect(Math.round(cdx * tileW), Math.round(rdx * tileH), w, h);
            }, this);
        }, this);

        if (this.props.image) {
            let self = this
            let size = this.props.size;
            let image = document.createElement('img');
            image.src = this.props.image;
            image.onload = function() {
                let dwidth = self.props.imageWidth || size * 0.2;
                let dheight = self.props.imageHeight || image.height / image.width * dwidth;
                let dx = (size - dwidth) / 2;
                let dy = (size - dheight) / 2;
                image.width = dwidth;
                image.height = dheight;
                ctx.drawImage(image, dx, dy, dwidth, dheight);
            }
        }
    }

    render() {
        return React.createElement('canvas', {
            style: { height: this.props.size, width: this.props.size },
            height: this.props.size,
            width: this.props.size,
            ref: 'canvas'
        });
    }
}