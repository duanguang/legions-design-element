/**
  *  legions-pro-design v0.0.3
  * (c) 2021 duanguang
  * @license MIT
  */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import throttle from 'lodash.throttle';
import LegionsProTable from '../LegionsProTable';
import { compare } from 'legions-utils-tool/object.utils';
import { shortHash } from 'legions-lunar/object-hash';
import { observer } from 'legions/store-react';
import LegionsProLineOverflow from '../LegionsProLineOverflow';
import { observable, runInAction } from 'mobx';

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

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

/**
 * 应对展示大量数据时，对性能的优化,主要用于报表展示，
 * 请勿开启左右固定列设置,行高也请固定，否则会计算错误
 *
 * @class HlVirtualTable
 * @extends {Component<IHLTableProps, IState>}
 */
var LegionsProVirtualTable = /** @class */ (function (_super) {
    __extends(LegionsProVirtualTable, _super);
    /* lodaMore = debounce(() => {
        const { data } = this.props
        this.handleScroll((data || []).length)
    },100) */
    function LegionsProVirtualTable(props) {
        var _this = _super.call(this, props) || this;
        _this.total = 0;
        _this.loading = false;
        _this.timeId = new Date().getTime();
        _this.uid = "VirtualTable" + shortHash(_this.timeId);
        _this.refScroll = null;
        _this.listenEvent = null;
        _this.refTable = null;
        _this.tabelRef = null;
        _this.refLeftTable = null;
        _this.lastSlideUpHeight = 0;
        _this.sameSlideHeightCount = 0;
        _this.subscription = null;
        _this.ticking = false; // rAF 触发锁
        _this.throttleWithRAF = function (fn) {
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
        };
        _this.log = function (n) {
            if (_this.tabelRef && _this.props.autoQuery && _this.tabelRef.localViewModel && _this.tabelRef.localViewModel.obState.isPending) {
                runInAction(function () {
                    _this.loading = true;
                });
            }
            if (_this.tabelRef && _this.tabelRef.localViewModel && !_this.tabelRef.localViewModel.obState.isPending && _this.props.autoQuery && _this.loading) {
                var data_1 = _this.props.autoQuery.transform(_this.tabelRef.localViewModel.obState);
                if (data_1) {
                    _this.setState({ data: data_1.data, thresholdCount: 40 }, function () {
                        _this.refScroll.scrollTop = 0;
                        console.log(data_1);
                        _this.handleScroll(data_1.data.length);
                    });
                    runInAction(function () {
                        _this.total = data_1.total;
                        _this.loading = false;
                    });
                }
            }
        };
        _this.handleScrollEvent = function (even) {
            var dataSource = _this.props.dataSource;
            _this.handleScroll((_this.props.autoQuery ? _this.state.data : dataSource || []).length);
            /* this.lodaMore() */
            // this.ticking =false
        };
        _this.handleScroll = function (length) {
            var _a = _this.state, rowHeight = _a.rowHeight, maxTotalHeight = _a.maxTotalHeight;
            if (rowHeight && length) {
                if (length) {
                    var visibleHeight = _this.refScroll.clientHeight; // 显示的table body高度
                    var scrollHeight = _this.refScroll.scrollHeight;
                    var scrollTop = _this.refScroll.scrollTop; // 滑动的距离
                    _this.handleBlankHeight(length, rowHeight, maxTotalHeight, visibleHeight, scrollTop);
                }
            }
            else {
                _this.setRowHeight();
            }
        };
        _this.getSorterFn = function (sortOrder, sorter) {
            return function (a, b) {
                var result = sorter(a, b);
                if (result !== 0) {
                    return (sortOrder === 'descend') ? -result : result;
                }
                return 0;
            };
        };
        _this.onPagingQuery = function (pageIndex, pageSize, isChangePageSize) {
            _this.props.onPagingQuery && _this.props.onPagingQuery(pageIndex, pageSize, isChangePageSize);
            if (_this.props.autoQuery && _this.tabelRef) {
                _this.tabelRef.methods.onSearch({ pageIndex: pageIndex });
            }
        };
        _this.state = {
            startIndex: 0,
            visibleRowCount: 0,
            thresholdCount: 40,
            rowHeight: 0,
            topBlankHeight: 0,
            bottomBlankHeight: 0,
            maxTotalHeight: 15000000,
            columns: _this.tranMapColumns(),
            data: _this.props.dataSource,
        };
        return _this;
    }
    LegionsProVirtualTable.prototype.FillNode = function (options) {
        var height = options.height, marginTop = options.marginTop, marginBottom = options.marginBottom, uid = options.uid;
        marginTop = marginTop || 0;
        marginBottom = marginBottom || 0;
        height = height || 0;
        return (React.createElement("div", { id: uid },
            React.createElement("div", { style: { height: height + "px", marginTop: marginTop + "px", marginBottom: marginBottom + "px" } })));
    };
    LegionsProVirtualTable.prototype.tranMapColumns = function (columns) {
        if (columns === void 0) { columns = this.props.columns; }
        return columns.map(function (item) {
            var newItem = __assign({ sorter: true, key: item.dataIndex }, item);
            if (!item.render) {
                newItem = __assign(__assign({}, newItem), { render: function (text, record) {
                        return React.createElement(LegionsProLineOverflow, { width: item.width, text: record[item.dataIndex] });
                    } });
            }
            return newItem;
        });
    };
    LegionsProVirtualTable.prototype.componentWillMount = function () {
    };
    LegionsProVirtualTable.prototype.componentDidMount = function () {
        this.refScroll = ReactDOM.findDOMNode(this).getElementsByClassName('ant-table-body')[0];
        // this.refInnerScroll = ReactDOM.findDOMNode(this).getElementsByClassName('ant-table-body-inner')[0]
        this.listenEvent = throttle(this.handleScrollEvent, 50);
        /* this.listenEvent =  this.throttleWithRAF(this.handleScrollEvent) */
        if (this.refScroll) {
            /* if (typeof window !== 'undefined' && 'requestAnimationFrame' in window) {
                this.refScroll.addEventListener('scroll',this.listenEvent,false)
            } */
            /* this.refScroll.addEventListener('scroll',this.listenEvent) */
            this.refScroll.addEventListener('scroll', this.listenEvent);
        }
        this.createTopFillNode();
        this.createBottomFillNode();
        // 初始化设置滚动条
        this.setRowHeight();
        this.handleScrollEvent();
        if (this.tabelRef && this.props.autoQuery && this.tabelRef.localViewModel) {
            if (this.props.autoQuery.isDefaultLoad === void 0 || this.props.autoQuery.isDefaultLoad) {
                this.tabelRef.methods.onSearch();
            }
            this.subscription = this.tabelRef.store.schedule([this.log.bind(this)]);
        }
    };
    LegionsProVirtualTable.prototype.componentWillReceiveProps = function (nextProps) {
        var _this = this;
        var data = nextProps.data;
        var tdataSource = this.props.dataSource;
        if (data && data !== tdataSource && !this.props.autoQuery) {
            this.setState({ data: data, thresholdCount: 40 }, function () {
                _this.refScroll.scrollTop = 0;
                _this.handleScroll(data.length);
            });
        }
        if (this.props.columns !== nextProps.columns) {
            this.setState({ columns: this.tranMapColumns(nextProps.columns) });
        }
    };
    LegionsProVirtualTable.prototype.componentWillUpdate = function () {
    };
    LegionsProVirtualTable.prototype.componentDidUpdate = function () {
        this.setRowHeight();
    };
    LegionsProVirtualTable.prototype.componentWillUnmount = function () {
        if (this.refScroll) {
            this.refScroll.removeEventListener('scroll', this.listenEvent);
        }
        this.subscription && this.subscription.unsubscribe();
    };
    LegionsProVirtualTable.prototype.createTopFillNode = function () {
        if (this.refScroll) {
            var ele = document.getElementById(this.uid + "topBlank");
            this.refScroll.insertBefore(ele, this.refScroll.firstChild);
        }
    };
    LegionsProVirtualTable.prototype.createBottomFillNode = function () {
        if (this.refScroll) {
            var ele = document.getElementById(this.uid + "bottomBlank");
            this.refScroll.appendChild(ele);
        }
    };
    LegionsProVirtualTable.prototype.createLeftTopFillNode = function () {
        if (this.refScroll) {
            var ele = document.getElementById(this.uid + "topBlank");
            this.refScroll.insertBefore(ele, this.refScroll.firstChild);
        }
    };
    LegionsProVirtualTable.prototype.createLeftBottomFillNode = function () {
        if (this.refScroll) {
            var ele = document.getElementById(this.uid + "bottomBlank");
            this.refScroll.appendChild(ele);
        }
    };
    LegionsProVirtualTable.prototype.setRowHeight = function () {
        this.refTable = this.refScroll.getElementsByTagName('table')[0];
        if (this.refTable) {
            var rows = this.refTable['rows'];
            var rowHeight = 0;
            if (rows.length) {
                var tr = rows[0];
                rowHeight = (tr && tr.clientHeight) || 0;
            }
            if (this.state.rowHeight === 0 && this.state.rowHeight !== rowHeight) {
                // this.setState({rowHeight})
                // @ts-ignore
                this.state['rowHeight'] = rowHeight;
            }
        }
    };
    LegionsProVirtualTable.prototype.getIndexByScrollTop = function (rowHeight, scrollTop) {
        var index = (scrollTop - scrollTop % rowHeight) / rowHeight;
        return index;
    };
    LegionsProVirtualTable.prototype.handleBlankHeight = function (length, rowHeight, maxTotalHeight, visibleHeight, scrollTop) {
        var oriRowHeight = rowHeight;
        var totalHeight = length * rowHeight; // 总高度 data * 行高度
        var isBigData = false;
        if (totalHeight > maxTotalHeight) {
            isBigData = true;
            totalHeight = maxTotalHeight;
            rowHeight = totalHeight / length;
            scrollTop = scrollTop > maxTotalHeight ? maxTotalHeight : scrollTop;
        }
        if (length >= 10000) {
            isBigData = true;
        }
        var topBlankHeight, bottomBlankHeight, startIndex, visibleRowCount;
        startIndex = this.getIndexByScrollTop(rowHeight, scrollTop);
        visibleRowCount = Math.ceil(visibleHeight / oriRowHeight); // 计算固定高度所能显示的行数量 例如 300/31 10行
        topBlankHeight = rowHeight * startIndex;
        topBlankHeight = this.getValidValue(topBlankHeight, 0, totalHeight);
        bottomBlankHeight = totalHeight - topBlankHeight - visibleHeight;
        bottomBlankHeight = bottomBlankHeight > 0 ? bottomBlankHeight : 0;
        var slideUpHeight = Math.abs(topBlankHeight - this.state.topBlankHeight);
        var slideDownHeight = Math.abs(bottomBlankHeight - this.state.bottomBlankHeight);
        if (!this.lastSlideUpHeight) {
            this.sameSlideHeightCount = 0;
            this.lastSlideUpHeight = slideUpHeight;
        }
        else if (this.lastSlideUpHeight === slideUpHeight) {
            this.sameSlideHeightCount++;
        }
        else {
            this.lastSlideUpHeight = slideUpHeight;
            this.sameSlideHeightCount = 0;
        }
        // console.log('===================')
        // console.log('oriRowHeight', oriRowHeight)
        // console.log('rowHeight', rowHeight)
        // console.log('totalHeight', totalHeight)
        // console.log('visibleHeight', visibleHeight)
        // console.log('scrollTop', scrollTop)
        // console.log('topBlankHeight', topBlankHeight)
        // console.log('bottomBlankHeight', bottomBlankHeight)
        // console.log('startIndex', startIndex)
        // console.log('visibleRowCount', visibleRowCount)
        // console.log('slideUpHeight', slideUpHeight)
        // console.log('slideDownHeight', slideDownHeight)
        // console.log('lastSlideUpHeight', this.lastSlideUpHeight)
        var isValid = slideUpHeight >= rowHeight;
        isValid = isValid || slideDownHeight >= rowHeight;
        isValid = isValid || startIndex === 0;
        if (isValid) {
            startIndex = startIndex - 5;
            visibleRowCount = visibleRowCount + 5;
            this.setState({
                startIndex: startIndex,
                visibleRowCount: visibleRowCount,
                topBlankHeight: topBlankHeight,
                bottomBlankHeight: bottomBlankHeight
            });
            if (isBigData && this.sameSlideHeightCount >= 1) { // 防止大数据持续滚动期间出现空白的问题
                this.refScroll.scrollTop = scrollTop;
                this.sameSlideHeightCount = 0;
                // console.log('set this.refScroll.scrollTop=', scrollTop)
            }
        }
    };
    LegionsProVirtualTable.prototype.checkValidIntervalTime = function (timeKey, interval) {
        if (interval === void 0) { interval = 100; }
        var cur = Date.now();
        if (!this[timeKey] || cur - this[timeKey] >= interval) {
            this[timeKey] = cur;
            return true;
        }
        return false;
    };
    LegionsProVirtualTable.prototype.getValidValue = function (val, min, max) {
        if (min === void 0) { min = 0; }
        if (max === void 0) { max = 40; }
        if (val < min) {
            return min;
        }
        else if (val > max) {
            return max;
        }
        return val;
    };
    LegionsProVirtualTable.prototype.onReady = function (value) {
        var _this = this;
        this.tabelRef = value;
        if (this.props.autoQuery) {
            this.tabelRef.methods.onSearch = function (options) {
                if (options && options.pageIndex) {
                    value.viewModel.pageIndex = options.pageIndex;
                }
                else {
                    value.viewModel.pageIndex = 1;
                }
                value.localViewModel.dispatchRequest(_this.props.autoQuery, Object.assign({
                    pageIndex: value.viewModel.pageIndex,
                    pageSize: value.viewModel.pageSize,
                }, options));
            };
        }
        this.props.onReady && this.props.onReady(value);
    };
    LegionsProVirtualTable.prototype.render = function () {
        var _this = this;
        var _a = this.props, autoQuery = _a.autoQuery, rest = __rest(_a, ["autoQuery"]);
        var data = this.state.data;
        var _b = this.state, topBlankHeight = _b.topBlankHeight, bottomBlankHeight = _b.bottomBlankHeight, startIndex = _b.startIndex, visibleRowCount = _b.visibleRowCount, rowHeight = _b.rowHeight, thresholdCount = _b.thresholdCount;
        var length = (data || []).length;
        var startCount = length - visibleRowCount;
        startCount = startCount > 0 ? startCount : length;
        var startIn = this.getValidValue(startIndex, 0, startCount);
        var endIn = startIndex + visibleRowCount;
        if (!endIn) { // 初始化渲染数据
            endIn = length > thresholdCount ? thresholdCount : length;
        }
        endIn = this.getValidValue(endIn, startIndex, length);
        var dataSource = (data || []).slice(startIn, endIn);
        if (this.tabelRef) {
            this.tabelRef.viewModel._renderData = __spread(dataSource);
        }
        return (React.createElement("div", { className: this.uid },
            this.FillNode({ height: topBlankHeight, uid: this.uid + "topBlank" }),
            React.createElement(LegionsProTable, __assign({}, rest, { loading: this.props.autoQuery ? this.loading : rest.loading, total: this.props.autoQuery ? this.total : rest.total, columns: this.state.columns, displayType: "bigData", onPagingQuery: this.onPagingQuery, onReady: this.onReady.bind(this), pageSizeOptions: ['100', '500', '1000', '2000', '3000', '5000', '10000'], dataSource: this.props.autoQuery ? this.state.data : this.props.dataSource, 
                //@ts-ignore
                onChange: function (pagination, filters, sorter) {
                    if (sorter.column && sorter.column.sorter && typeof sorter.column.sorter === 'boolean') {
                        var sorterFn = _this.getSorterFn(sorter.order, function (a, b) {
                            return compare(a[sorter.columnKey], b[sorter.columnKey]);
                        });
                        var data_2 = _this.state.data;
                        _this.setState({
                            data: data_2.sort(sorterFn)
                        });
                    }
                } })),
            this.FillNode({ height: bottomBlankHeight, uid: this.uid + "bottomBlank" })));
    };
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], LegionsProVirtualTable.prototype, "total", void 0);
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], LegionsProVirtualTable.prototype, "loading", void 0);
    LegionsProVirtualTable = __decorate([
        observer,
        __metadata("design:paramtypes", [Object])
    ], LegionsProVirtualTable);
    return LegionsProVirtualTable;
}(Component));

export default LegionsProVirtualTable;
