/**
  *  legions-pro-design v0.0.8-beta.1
  * (c) 2021 duanguang
  * @license MIT
  */
import React from 'react';
import { NProgress } from 'legions-nprogress';

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

var PureComponent = React.PureComponent, Component = React.Component;
var objectAssign = require("object-assign");
function noop() { }
var LegionsProIframe = /** @class */ (function (_super) {
    __extends(class_1, _super);
    function class_1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // static propTypes={}
    class_1.prototype.componentWillMount = function () {
        NProgress.start();
    };
    class_1.prototype.componentDidUpdate = function () {
        /* let iframe = document.getElementsByTagName("iframe");
        iframe['setAttribute']('webkitallowfullscreen', true); */
        /*  NProgress.done() */
    };
    class_1.prototype.componentDidMount = function () {
        this.props.onFirstLoaded && this.props.onFirstLoaded();
        NProgress.done();
    };
    class_1.prototype.render = function () {
        var props = {
            ref: "iframe",
            frameBorder: "0",
            src: this.props.url,
            target: "_parent",
            allowFullScreen: this.props.allowFullScreen || false,
            style: objectAssign({}, {
                position: this.props.position || "absolute",
                display: this.props.display || "block",
                height: this.props.height || "100%",
                width: this.props.width || "100%",
                padding: '0px',
                margin: '0px'
            }, this.props.styles || {}),
            height: this.props.height || "100%",
            name: this.props.name || "",
            width: this.props.width || "100%",
            onLoad: this.props.onLoad || noop,
            onMouseOver: this.props.onMouseOver || noop,
            onMouseOut: this.props.onMouseOut || noop,
        };
        return React.createElement("iframe", objectAssign(props, this.props.id ? { id: this.props.id } : {}, this.props.sandbox ? { sandbox: this.props.sandbox } : {}, this.props.allow ? { allow: this.props.allow } : {}, this.props.className ? { className: this.props.className } : {}, this.props.title ? { title: this.props.title } : {}, this.props.ariaHidden ? { "aria-hidden": "true" } : {}));
    };
    return class_1;
}(Component));

export default LegionsProIframe;
