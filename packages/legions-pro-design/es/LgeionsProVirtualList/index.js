/**
  *  legions-pro-design v0.0.7
  * (c) 2021 duanguang
  * @license MIT
  */
import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

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

var _this = undefined;
var throttleWithRAF = (function (fn) {
    var running = false;
    return function () {
        if (running)
            return;
        running = true;
        window.requestAnimationFrame(function () {
            // @ts-ignore  
            fn.apply(_this, arguments);
            running = false;
        });
    };
});

var getElementTop = function (element) {
    if (element.pageYOffset)
        return element.pageYOffset;
    if (element.document) {
        if (element.document.documentElement && element.document.documentElement.scrollTop)
            return element.document.documentElement.scrollTop;
        if (element.document.body && element.document.body.scrollTop)
            return element.document.body.scrollTop;
        return 0;
    }
    return element.scrollY || element.scrollTop || 0;
};

var topFromWindow = function (element) {
    if (typeof element === 'undefined' || !element)
        return 0;
    return (element.offsetTop || 0) + topFromWindow(element.offsetParent);
};

var getVisibleItemBounds = function (list, container, items, itemHeight, itemBuffer) {
    // early return if we can't calculate
    if (!container)
        return undefined;
    if (!itemHeight)
        return undefined;
    if (!items)
        return undefined;
    if (items.length === 0)
        return undefined;
    // what the user can see
    var innerHeight = container.innerHeight, clientHeight = container.clientHeight;
    var viewHeight = innerHeight || clientHeight; // how many pixels are visible
    if (!viewHeight)
        return undefined;
    var viewTop = getElementTop(container); // top y-coordinate of viewport inside container
    var viewBottom = viewTop + viewHeight;
    console.log(topFromWindow(list), 'topFromWindow(list)');
    console.log(topFromWindow(container), 'topFromWindow(container)');
    var listTop = topFromWindow(list) - topFromWindow(container); // top y-coordinate of container inside window
    var listHeight = itemHeight * items.length;
    // visible list inside view
    var listViewTop = Math.max(0, viewTop - listTop); // top y-coordinate of list that is visible inside view
    var listViewBottom = Math.max(0, Math.min(listHeight, viewBottom - listTop)); // bottom y-coordinate of list that is visible inside view
    // visible item indexes
    var firstItemIndex = Math.max(0, Math.floor(listViewTop / itemHeight) - itemBuffer);
    var lastItemIndex = Math.min(items.length, Math.ceil(listViewBottom / itemHeight) + itemBuffer) - 1;
    return {
        firstItemIndex: firstItemIndex,
        lastItemIndex: lastItemIndex,
    };
};

var defaultMapToVirtualProps = function (_a, _b) {
    var items = _a.items, itemHeight = _a.itemHeight;
    var firstItemIndex = _b.firstItemIndex, lastItemIndex = _b.lastItemIndex;
    var visibleItems = lastItemIndex > -1 ? items.slice(firstItemIndex, lastItemIndex + 1) : [];
    console.log(firstItemIndex, lastItemIndex);
    // style
    var height = items.length * itemHeight;
    var paddingTop = firstItemIndex * itemHeight;
    return {
        virtual: {
            items: visibleItems,
            style: {
                height: height,
                paddingTop: paddingTop,
                boxSizing: 'border-box',
            },
        }
    };
};

var LegionsProVirtualList = function (options, mapVirtualToProps) {
    if (mapVirtualToProps === void 0) { mapVirtualToProps = defaultMapToVirtualProps; }
    return function (InnerComponent) {
        var _a;
        return _a = /** @class */ (function (_super) {
                __extends(vlist, _super);
                function vlist(props) {
                    var _this = _super.call(this, props) || this;
                    _this._isMounted = false;
                    _this.domNode = null;
                    _this.options = __assign({ container: typeof window !== 'undefined' ? window : undefined }, options);
                    _this.state = {
                        firstItemIndex: 0,
                        lastItemIndex: -1,
                    };
                    // initialState allows us to set the first/lastItemIndex (useful for server-rendering)
                    if (options && options.initialState) {
                        _this.state = __assign(__assign({}, _this.state), options.initialState);
                    }
                    _this.refreshState = _this.refreshState.bind(_this);
                    // if requestAnimationFrame is available, use it to throttle refreshState
                    if (typeof window !== 'undefined' && 'requestAnimationFrame' in window) {
                        _this.refreshState = throttleWithRAF(_this.refreshState);
                    }
                    return _this;
                }
                vlist.prototype.componentWillMount = function () {
                    this._isMounted = true;
                };
                vlist.prototype.componentDidMount = function () {
                    // cache the DOM node
                    this.domNode = ReactDOM.findDOMNode(this);
                    // we need to refreshState because we didn't have access to the DOM node before
                    this.refreshState();
                    // add events
                    // @ts-ignore
                    this.options.container.addEventListener('scroll', this.refreshState);
                    // @ts-ignore
                    this.options.container.addEventListener('resize', this.refreshState);
                };
                vlist.prototype.componentWillUnmount = function () {
                    this._isMounted = false;
                    // remove events
                    // @ts-ignore
                    this.options.container.removeEventListener('scroll', this.refreshState);
                    // @ts-ignore
                    this.options.container.removeEventListener('resize', this.refreshState);
                };
                // if props change, just assume we have to recalculate
                vlist.prototype.componentWillReceiveProps = function (nextProps) {
                    var itemHeight = nextProps.itemHeight, items = nextProps.items, itemBuffer = nextProps.itemBuffer;
                    this.setStateIfNeeded(this.domNode, this.options.container, items, itemHeight, itemBuffer);
                };
                vlist.prototype.setStateIfNeeded = function (list, container, items, itemHeight, itemBuffer) {
                    // get first and lastItemIndex
                    console.dir(container, 'container');
                    var state = getVisibleItemBounds(list, container, items, itemHeight, itemBuffer);
                    if (state === undefined) {
                        return;
                    }
                    if (state.firstItemIndex > state.lastItemIndex) {
                        return;
                    }
                    if (state.firstItemIndex !== this.state.firstItemIndex || state.lastItemIndex !== this.state.lastItemIndex) {
                        this.setState(state);
                    }
                };
                vlist.prototype.refreshState = function () {
                    if (!this._isMounted) {
                        return;
                    }
                    var _a = this.props, itemHeight = _a.itemHeight, items = _a.items, itemBuffer = _a.itemBuffer;
                    this.setStateIfNeeded(this.domNode, this.options.container, items, itemHeight, itemBuffer);
                };
                vlist.prototype.render = function () {
                    console.log(this.props, __assign({}, mapVirtualToProps(this.props, this.state)), this.state);
                    return (React.createElement(InnerComponent, __assign({}, this.props, mapVirtualToProps(this.props, this.state))));
                };
                return vlist;
            }(PureComponent)),
            _a.propTypes = {
                items: PropTypes.array.isRequired,
                itemHeight: PropTypes.number.isRequired,
                itemBuffer: PropTypes.number,
            },
            _a.defaultProps = {
                itemBuffer: 0,
            },
            _a;
    };
};

export default LegionsProVirtualList;
