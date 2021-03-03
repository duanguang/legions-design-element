/**
  *  legions-pro-design v0.0.3
  * (c) 2021 duanguang
  * @license MIT
  */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import SortableJS from 'sortablejs';

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

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
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

var store = {
    nextSibling: null,
    activeComponent: null
};
var LegionsProDragger = /** @class */ (function (_super) {
    __extends(LegionsProDragger, _super);
    function LegionsProDragger() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.node = null;
        _this.sortable = null;
        return _this;
    }
    LegionsProDragger.prototype.componentDidMount = function () {
        var _this = this;
        var options = __assign({}, this.props.options);
        [
            'onChoose',
            'onStart',
            'onEnd',
            'onAdd',
            'onUpdate',
            'onSort',
            'onRemove',
            'onFilter',
            'onMove',
            'onClone'
        ].forEach(function (name) {
            var eventHandler = options[name];
            options[name] = function () {
                var params = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    params[_i] = arguments[_i];
                }
                var _a = __read(params, 1), evt = _a[0];
                if (name === 'onChoose') {
                    store.nextSibling = evt.item.nextElementSibling;
                    store.activeComponent = _this;
                }
                else if ((name === 'onAdd' || name === 'onUpdate') && _this.props.onChange) {
                    var items = _this.sortable.toArray();
                    var remote = store.activeComponent;
                    var remoteItems = remote.sortable.toArray();
                    var referenceNode = (store.nextSibling && store.nextSibling.parentNode !== null) ? store.nextSibling : null;
                    evt.from.insertBefore(evt.item, referenceNode);
                    if (remote !== _this) {
                        var remoteOptions = remote.props.options || {};
                        if ((typeof remoteOptions.group === 'object') && (remoteOptions.group.pull === 'clone')) {
                            // Remove the node with the same data-reactid
                            evt.item.parentNode.removeChild(evt.item);
                        }
                        remote.props.onChange && remote.props.onChange(remoteItems, remote.sortable, evt);
                    }
                    _this.props.onChange && _this.props.onChange(items, _this.sortable, evt);
                }
                if (evt.type === 'move') {
                    var _b = __read(params, 2), evt_1 = _b[0], originalEvent = _b[1];
                    var canMove = eventHandler ? eventHandler(evt_1, originalEvent) : true;
                    return canMove;
                }
                setTimeout(function () {
                    eventHandler && eventHandler(evt);
                }, 0);
            };
        });
        this.sortable = SortableJS.create(this.node, options);
    };
    LegionsProDragger.prototype.shouldComponentUpdate = function (nextProps) {
        // If onChange is null, it is an UnControlled component
        // Don't let React re-render it by setting return to false
        if (!nextProps.onChange) {
            return false;
        }
        return true;
    };
    LegionsProDragger.prototype.componentWillUnmount = function () {
        if (this.sortable) {
            this.sortable.destroy();
            this.sortable = null;
        }
    };
    LegionsProDragger.prototype.render = function () {
        var _this = this;
        var _a = this.props, Component = _a.tag, options = _a.options, // eslint-disable-line
        onChange = _a.onChange, // eslint-disable-line
        //@ts-ignore
        style = _a.style, children = _a.children, props = __rest(_a, ["tag", "options", "onChange", "style", "children"]);
        return (
        // @ts-ignore
        React.createElement(Component, __assign({ style: { width: '100%', display: 'inline-block' } }, props, { 
            //@ts-ignore
            ref: function (node) {
                _this.node = node;
            } }), this.props.children));
    };
    LegionsProDragger.propTypes = {
        options: PropTypes.object,
        onChange: PropTypes.func,
        tag: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.func
        ]),
        style: PropTypes.object
    };
    LegionsProDragger.defaultProps = {
        options: {},
        tag: 'div',
        style: {}
    };
    return LegionsProDragger;
}(Component));

export default LegionsProDragger;
