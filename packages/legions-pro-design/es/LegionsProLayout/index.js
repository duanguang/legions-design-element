/**
  *  legions-pro-design v0.0.7
  * (c) 2021 duanguang
  * @license MIT
  */
import React from 'react';
import { Layout, Tabs, message, Menu, Dropdown, Spin, Icon, Avatar, Breadcrumb, Badge } from 'antd';
import './style/index.less';
import { bind, observer } from 'legions/store-react';
import { TabPaneViewStore, MenuStore } from '../store/pro.layout';
import ReactDOM from 'react-dom';
import { observableViewModel } from 'legions/store-utils';
import { debounce } from 'legions-utils-tool/debounce';
import styles from './style/content.modules.less';
import classNames from 'classnames';
import { observable, isObservableArray, runInAction } from 'mobx';
import { shortHash } from 'legions-lunar/object-hash';
import { focusBind, focusUnbind } from 'legions-thirdparty-plugin/focus-outside';
import { RegExChk, validatorType } from 'legions-utils-tool/regex';
import LegionsProIframe from '../LegionsProIframe';
import { NProgress } from 'legions-nprogress';
import pathToRegexp from 'path-to-regexp';
import cloneDeep from 'lodash/cloneDeep';
import { getMicroAppStateActions } from 'legions-micro-service';
import { MasterGlobalStateStore } from '../core/cross-module';
import { inject } from 'legions/store';
import './style/memu.less';
import { page } from 'legions-lunar/mobx-decorator';
import LegionsProSelect from '../LegionsProSelect';
import LegionsProModal from '../LegionsProModal';
import { OpenConfirm } from 'legions-lunar/antd-toolkit';
import LegionsProTable from '../LegionsProTable';
import { download } from 'legions-utils-tool/download';

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

var LayoutContentUtils = /** @class */ (function () {
    function LayoutContentUtils() {
    }
    /** 将对象转换为字符串拼接至url */
    LayoutContentUtils.transHttpUrlByObj = function (url, object) {
        var arr = url.split('?');
        var paramsString = Object.keys(object).map(function (key) {
            return key + "=" + object[key];
        }).join('&');
        if (arr.length > 1) {
            var _query = arr[1] + "&" + paramsString;
            if (arr.length > 2) {
                var query = "?" + arr[2] + "&" + paramsString;
                return arr[0] + "?" + arr[1] + query;
            }
            return arr[0] + "?" + _query;
        }
        else {
            var src = paramsString ? url + "?" + paramsString : url;
            return src;
        }
    };
    /** 在传入的url 信息加生成的时间戳，主要用于清除iframe 加载页面缓存，无法拉取到更新后的JS，CSS资源 */
    LayoutContentUtils.transHttpUrl = function (url, timeid) {
        var arr = url.split('?');
        var version = timeid ? "&version=" + timeid : '';
        if (arr.length > 1) {
            var _query = "" + arr[1] + version;
            if (arr.length > 2) {
                var query = "?" + arr[2] + version;
                return arr[0] + "?" + arr[1] + query;
            }
            return arr[0] + "?" + _query;
        }
        else {
            var version_1 = timeid ? "?version=" + timeid : '';
            var _query = "" + url + version_1;
            return _query;
        }
    };
    /** 获取菜单页签path  */
    LayoutContentUtils.getTabPanePath = function (pane, that) {
        var src = '';
        // @ts-ignore
        if (RegExChk(validatorType.url, pane.path)) {
            /** * 判定字符串是否URL*/
            src = pane.path;
        }
        // @ts-ignore
        else if (RegExChk(validatorType.path, pane.path)) {
            /** 判定字符串是否文件路径 */
            if (pane.path.indexOf('#') > -1) {
                // 如果路由是前端路由且能从路由列表找到相应组件信息则渲染前端组件
                var newItem = that.props.router.findIndex(function (item) { return item.path === pane.path.replace('#', ''); });
                if (newItem > -1) {
                    src = pane.path;
                }
                else {
                    src = "" + that.props.domainUrl + pane.path;
                }
            }
            else {
                src = "" + that.props.domainUrl + pane.path;
            }
        }
        else {
            /** 找不到路径或路径不对直接跳转到404  */
            src = "" + that.props.notFoundUrl;
        }
        return src;
    };
    LayoutContentUtils.renderTabPaneContent = function (pane, that) {
        var menuList = that.props.menuStore.getAllMenuList();
        var currMenu = menuList.find(function (item) { return item.key === pane.key; });
        var tempPane = __assign(__assign({}, currMenu), cloneDeep(pane));
        var newPane = tempPane.beforeLoad && tempPane.beforeLoad(tempPane) || tempPane;
        var src = LayoutContentUtils.getTabPanePath(newPane, that);
        src = newPane.params ? LayoutContentUtils.transHttpUrlByObj(src, newPane.params) : src;
        /* const proxySanbox = that.props.store.proxySanbox; */
        //@ts-ignore'
        if (RegExChk(validatorType.url, src)) {
            if (newPane.loadingMode === 'iframe') {
                return LayoutContentUtils.renderTabPaneIframe(newPane, that, src);
            }
            else if (newPane.loadingMode === 'sandbox') {
                LayoutContentUtils.masterGlobalStateStore.setGlobalState({
                    user: that.props.userEntity,
                    methods: {
                        openTabPane: LayoutContentUtils.masterGlobalStateStore.openTabPane,
                        removeTablePane: LayoutContentUtils.masterGlobalStateStore.removeTablePane,
                    },
                    menuList: LayoutContentUtils.masterGlobalStateStore.menuList,
                }, LayoutContentUtils.masterGlobalStateStore.masterEventScopes.userEvent.created);
                return LayoutContentUtils.renderProxySanboxDom(newPane, that, src, that.props.store.proxySanbox);
            }
        }
        else {
            return LayoutContentUtils.renderTabPaneRouterComponent(newPane, that, src);
        }
    };
    //@ts-ignore
    LayoutContentUtils.renderTabPaneIframe = function (pane, that, src) {
        /* let url =!this.props.isEnabledTabs?this.transHttpUrl(src, this.props.store.urlRangTimestamp):src; */
        var tabPanesTimestamp = that.props.store.viewUIModel.tabPanesTimestamp.get(pane.key) || new Date().getTime();
        that.props.store.viewUIModel.updateTimestamp(pane.key.toString(), tabPanesTimestamp);
        if (pane.loadingMode === 'iframe') {
            var url = LayoutContentUtils.transHttpUrl(src, tabPanesTimestamp);
            return (React.createElement(LegionsProIframe, { url: url, ref: "iframeContainer" + pane.key, height: "100%", display: "initial", position: "relative", styles: { border: "none", minHeight: "" + that.viewModel.iframeHeight }, id: "ReactIframe", name: pane.key, allowFullScreen: true, onFirstLoaded: function () {
                    var value = { pane: pane, iframe: document.querySelector("iframe[name=\"" + pane.key + "\"]") };
                    if (!value.iframe.contentWindow.LegionsProGlobal) {
                        var _a = getMicroAppStateActions(pane.key), onGlobalStateChange = _a.onGlobalStateChange, setGlobalState = _a.setGlobalState, offGlobalStateChange = _a.offGlobalStateChange;
                        value.iframe.contentWindow.LegionsProGlobal = {
                            //@ts-ignore
                            onGlobalStateChange: onGlobalStateChange,
                            //@ts-ignore
                            setGlobalState: setGlobalState,
                            appId: pane.key
                        };
                        LayoutContentUtils.masterGlobalStateStore.setGlobalState({
                            user: that.props.userEntity,
                            methods: {
                                openTabPane: LayoutContentUtils.masterGlobalStateStore.openTabPane,
                                removeTablePane: LayoutContentUtils.masterGlobalStateStore.removeTablePane,
                            },
                            menuList: LayoutContentUtils.masterGlobalStateStore.menuList,
                        }, LayoutContentUtils.masterGlobalStateStore.masterEventScopes.userEvent.created);
                    }
                }, onLoad: function () {
                    NProgress.done();
                    pane.afterLoad && pane.afterLoad({ pane: pane, iframe: document.querySelector("iframe[name=\"" + pane.key + "\"]") });
                } }));
        }
    };
    //@ts-ignore
    LayoutContentUtils.renderTabPaneRouterComponent = function (pane, that, src) {
        NProgress.done();
        var path = src.replace('#', '');
        var getPath = function () {
            var path = window.location.hash.replace('#', '').split('?')[0];
            return path;
        };
        if (that.props.router.length) {
            var item = that.props.router.find(function (e) { return e.path === path; });
            if (item && typeof item.component === 'function') {
                return React.createElement(item.component);
            }
            else {
                item = that.props.router.find(function (e) { return pathToRegexp(e.path).test(getPath()); });
                if (item && typeof item.component === 'function') {
                    return React.createElement(item.component);
                }
            }
        }
        /* return this.props.router.map((item,index)=>{
              const path = src.replace('#','');
              if (path === item.path) {
                NProgress.done();
                return <Route path={path} component={item.component} key={index}></Route>
              }
              else{
                const path = window.location.hash.replace('#','').split('?')[0];
                if (pathToRegexp(item.path).test(path)) {
                  NProgress.done();
                  return <Route path={item.path} component={item.component} key={index}></Route>
                }
              }
            }) */
    };
    LayoutContentUtils.renderProxySanboxDom = function (pane, that, src, proxySanbox) {
        if (pane.loadingMode === 'sandbox') {
            return null;
        }
    };
    LayoutContentUtils.loadMicroApp = function (pane, that, proxySanbox) {
        if (pane && pane.loadingMode === 'sandbox') {
            var routerPath = proxySanbox.getRouterPath(pane);
            var appid = proxySanbox.createMicroAppId(pane);
            var keys = pane.sandbox.appName + "-" + appid;
            var target = document.querySelector("div[data-id=" + keys + "-legions]");
            if (!that.props.isEnabledTabs) {
                target = document.querySelector("#micro-app-legions");
            }
            if (!proxySanbox.microSanboxApp.has(pane.sandbox.appName)) {
                if (target) {
                    var dataApp = target.getAttribute('data-app');
                    if (!that.props.isEnabledTabs) {
                        dataApp = pane.sandbox.appName;
                    }
                    var oldcontainer = document.querySelector("#" + dataApp);
                    if (oldcontainer) {
                        oldcontainer.remove();
                    }
                    var container = document.createElement('div');
                    container.setAttribute('id', "" + dataApp);
                    target.appendChild(container);
                    if (proxySanbox.routerSanboxOpenMode === 'inSideActiveTab') {
                        proxySanbox.routerSanboxOpenMode = 'newOpenactiveTab';
                    }
                    proxySanbox.registerMicroApps(pane);
                }
            }
            else {
                if (target) {
                    var dataApp = target.getAttribute('data-app');
                    if (!that.props.isEnabledTabs) {
                        dataApp = pane.sandbox.appName;
                    }
                    var microSanboxApp = proxySanbox.microSanboxApp.get(dataApp);
                    if (microSanboxApp.getStatus() !== 'MOUNTING') {
                        var oldcontainer = document.querySelector("#" + dataApp);
                        if (oldcontainer) {
                            oldcontainer.remove();
                        }
                        var container = document.createElement('div');
                        container.setAttribute('id', "" + dataApp);
                        target.appendChild(container);
                        microSanboxApp.loadMicroApp();
                        microSanboxApp.app.mountPromise.then(function () {
                            if (proxySanbox.routerSanboxOpenMode === 'newOpenactiveTab') {
                                proxySanbox.routerSanboxOpenMode = 'inSideActiveTab';
                            }
                        });
                        var hash_1 = window.location.hash.replace('#', '');
                        var containerId = appid;
                        if (hash_1 !== routerPath && hash_1 && microSanboxApp.container.has(containerId)) {
                            microSanboxApp.container.get(containerId).lastActiveRouter = hash_1;
                            if (Array.isArray(microSanboxApp.container.get(containerId)['routers'])) {
                                var _index = microSanboxApp.container.get(containerId)['routers'].findIndex(function (item) { return item === hash_1; });
                                if (_index < 0) {
                                    microSanboxApp.container.get(containerId)['routers'].push(hash_1);
                                }
                            }
                        }
                        if (!microSanboxApp.container.has(containerId)) {
                            microSanboxApp.container.set(containerId, {
                                rootid: pane.sandbox.appName,
                                wrapid: pane.sandbox.appRootId,
                                lastActiveRouter: routerPath,
                                routers: [routerPath]
                            });
                        }
                        microSanboxApp.activityRouter = routerPath;
                    }
                }
            }
        }
    };
    __decorate([
        inject(MasterGlobalStateStore),
        __metadata("design:type", MasterGlobalStateStore
        /** 将对象转换为字符串拼接至url */
        )
    ], LayoutContentUtils, "masterGlobalStateStore", void 0);
    return LayoutContentUtils;
}());

var Content = Layout.Content;
var TabPane = Tabs.TabPane;
var ViewModels = /** @class */ (function () {
    function ViewModels() {
        this.iframeHeight = 500;
        this.dropdown = observable.map();
    }
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], ViewModels.prototype, "iframeHeight", void 0);
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], ViewModels.prototype, "dropdown", void 0);
    return ViewModels;
}());
var ContentPart = /** @class */ (function (_super) {
    __extends(ContentPart, _super);
    function ContentPart(props) {
        var _this = _super.call(this, props) || this;
        _this.history = _this.props.store.context._manage.history;
        _this.viewModel = observableViewModel(new ViewModels());
        _this.setIframe = debounce(function () {
            _this.viewModel.iframeHeight = document.body.clientHeight - 98;
        }, 1000);
        /**
         * 修改页签活动状态
         *
         * @param {*} activeKey
         * @memberof ContentPart
         */
        _this.handleChange = function (activeKey) {
            var store = _this.props.store;
            var pane = store.panes.find(function (item) { return item.key === activeKey; });
            var oldpane = store.panes.find(function (item) { return item.key === store.activeKey; });
            store.setActiveKey(activeKey);
            _this.props.menuStore.triggerSetBreadCrumbsEven(_this.props.router);
            store.proxySanbox.switchTabPaneSanboxMicroApp(oldpane, pane);
        };
        /**
         *
         * 页签编辑行为
         * @param {*} targetKey
         * @param {*} action
         * @memberof ContentPart
         */
        _this.handleEdit = function (targetKey, action) {
            var store = _this.props.store;
            var oldpane = store.panes.find(function (item) { return item.key === targetKey; });
            store.update(targetKey, action);
            var pane = store.panes.find(function (item) { return item.key === store.activeKey; });
            if (action === 'remove') {
                if (typeof targetKey === 'string') {
                    _this.removeContextmenu(targetKey);
                    _this.viewModel.dropdown.delete(targetKey);
                }
                else if (targetKey && Array.isArray(targetKey)) {
                    targetKey.map(function (item) {
                        _this.removeContextmenu(item);
                        _this.viewModel.dropdown.delete(item);
                    });
                }
            }
            _this.props.menuStore.triggerSetBreadCrumbsEven();
            store.proxySanbox.switchTabPaneSanboxMicroApp(oldpane, pane);
        };
        var height = _this.props.isEnabledTabs ? 98 : 128;
        _this.viewModel.iframeHeight = document.body.clientHeight - height;
        return _this;
    }
    ContentPart.prototype.componentDidMount = function () {
        var _this = this;
        window.addEventListener('resize', function () {
            _this.setIframe();
        });
        this.props.isEnabledTabs && this.addContextmenu();
    };
    ContentPart.prototype.componentWillUnmount = function () {
        this.removeAllContextmenu();
    };
    ContentPart.prototype.componentDidUpdate = function () {
        var _this = this;
        this.props.isEnabledTabs && this.addContextmenu();
        var pane = this.props.store.panes.find(function (item) { return item.key === _this.props.store.activeKey; });
        LayoutContentUtils.loadMicroApp(pane, this, this.props.store.proxySanbox);
    };
    /** 添加页签悬浮窗 */
    ContentPart.prototype.addContextmenu = function () {
        var _this = this;
        this.viewModel.dropdown.keys().map(function (item) {
            var view = _this.viewModel.dropdown.get(item);
            if (view) {
                var dropdownElm = ReactDOM.findDOMNode(_this.refs[view.uid]);
                if (dropdownElm) {
                    var el = ReactDOM.findDOMNode(_this.refs["" + view.uid + view.tabkey]);
                    if (el && el.parentElement && el.parentElement.parentElement) {
                        if (!view.isAddContextmenu) {
                            el.parentElement.parentElement.removeEventListener('contextmenu', _this.handleContextmenu.bind(_this, el.id));
                            el.parentElement.parentElement.addEventListener('contextmenu', _this.handleContextmenu.bind(_this, el.id));
                            //focusUnbind(el.parentElement.parentElement,this.handleOutside.bind(this,item),styles.outSide)
                            view.isAddContextmenu = true;
                        }
                        else {
                            if (el.parentElement.parentElement.classList.value.indexOf(styles.outSide) < 0) {
                                el.parentElement.parentElement.className = el.parentElement.parentElement.className + " " + styles.outSide;
                            }
                        }
                        focusBind(el.parentElement.parentElement, _this.handleOutside.bind(_this, item), styles.outSide);
                    }
                }
            }
        });
    };
    /** 移除全部页签悬浮窗 */
    ContentPart.prototype.removeAllContextmenu = function () {
        var _this = this;
        this.viewModel.dropdown.keys().map(function (item) {
            var view = _this.viewModel.dropdown.get(item);
            if (view) {
                var dropdownElm = ReactDOM.findDOMNode(_this.refs[view.uid]);
                if (dropdownElm) {
                    var el = ReactDOM.findDOMNode(_this.refs["" + view.uid + view.tabkey]);
                    if (el && el.parentElement && el.parentElement.parentElement) {
                        el.parentElement.parentElement.removeEventListener('contextmenu', _this.handleContextmenu.bind(_this, el.id));
                    }
                    // @ts-ignore
                    focusUnbind(el.parentElement.parentElement, _this.handleOutside.bind(_this, item), styles.outSide);
                }
            }
        });
    };
    /** 移除页签悬浮窗dom 元素 */
    ContentPart.prototype.removeContextmenu = function (itemKey) {
        var view = this.viewModel.dropdown.get(itemKey);
        if (view) {
            var dropdownElm = ReactDOM.findDOMNode(this.refs[view.uid]);
            if (dropdownElm) {
                var el = ReactDOM.findDOMNode(this.refs["" + view.uid + view.tabkey]);
                if (el && el.parentElement && el.parentElement.parentElement) {
                    el.parentElement.parentElement.removeEventListener('contextmenu', this.handleContextmenu.bind(this, el.id));
                }
                // @ts-ignore
                focusUnbind(el.parentElement.parentElement, this.handleOutside.bind(this, itemKey), styles.outSide);
            }
        }
    };
    ContentPart.prototype.handleContextmenu = function (tabkey, even) {
        var _this = this;
        even.preventDefault();
        this.viewModel.dispatchAction(function () {
            _this.viewModel.dropdown.get(tabkey).visible = true;
            _this.viewModel.dropdown.keys().map(function (item) {
                if (item !== tabkey) {
                    _this.viewModel.dropdown.get(item).visible = false;
                }
            });
        });
    };
    /** 在页签元素之外单击关闭悬浮窗 */
    ContentPart.prototype.handleOutside = function (item) {
        var _this = this;
        var timeid = setTimeout(function () {
            _this.viewModel.dispatchAction(function () {
                if (_this.viewModel.dropdown.get(item)) {
                    _this.viewModel.dropdown.get(item).visible = false;
                }
            });
            clearTimeout(timeid);
        }, 200);
    };
    ContentPart.prototype.handleDropMenuItemClick = function (tabkey, even) {
        var key = even.key;
        if (key === 'closeOther') {
            var keys = this.viewModel.dropdown.keys();
            var tabkeys = keys.filter(function (item) { return item !== tabkey; });
            this.handleEdit(tabkeys, 'remove');
        }
        else if (key === 'closeCurr') {
            if (this.viewModel.dropdown.size === 1) {
                message.warning('至少保留一个页签');
            }
            else {
                this.handleEdit(tabkey, 'remove');
            }
        }
    };
    /** 渲染页签悬浮窗元素 */
    ContentPart.prototype.renderDropMenuElement = function (tabkey) {
        return (React.createElement(Menu, { onClick: this.handleDropMenuItemClick.bind(this, tabkey) },
            React.createElement(Menu.Item, { key: "closeOther" },
                React.createElement("span", null, "\u5173\u95ED\u5176\u4ED6")),
            React.createElement(Menu.Item, { key: "closeCurr" },
                React.createElement("span", null, "\u5173\u95ED\u5F53\u524D"))));
    };
    ContentPart.prototype.renderTabPaneElement = function () {
        var _this = this;
        var store = this.props.store;
        return store.panes.map(function (pane) {
            var routerPath = store.proxySanbox.getRouterPath(pane);
            var appid = store.proxySanbox.createMicroAppId(pane);
            var keys = pane.sandbox.appName + "-" + appid;
            return React.createElement(TabPane, { "data-id": keys + "-legions", "data-service": keys, "data-app": pane.sandbox.appName, "data-page": pane.sandbox.appName + "-" + routerPath, style: { outline: 'none' }, tab: _this.renderTitleElement(pane.title, store.activeKey, pane.key), key: pane.key, closable: pane.closable }, _this.renderContentElement(pane));
        });
    };
    ContentPart.prototype.renderContentElement = function (pane) {
        //let regex = /^http|https:\/\/\w+\.\w+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/;
        if (typeof pane.path === "string") {
            return LayoutContentUtils.renderTabPaneContent(pane, this);
        }
    };
    /**
     * 渲染页签标题
     *
     * @param {any} title 标题名称
     * @param {any} activeKey 选中页签key
     * @param {any} currKey //当前页签key
     * @returns
     * @memberof ContentPart
     */
    ContentPart.prototype.renderTitleElement = function (title, activeKey, currKey) {
        var _a;
        if (!this.viewModel.dropdown.has(currKey)) {
            this.viewModel.dropdown.set(currKey, { visible: false, tabkey: currKey, uid: "" + shortHash(new Date().getTime()), isAddContextmenu: false });
        }
        var render = [];
        if (activeKey === currKey) {
            render.push(React.createElement("span", { key: "t-0", className: "" + classNames((_a = {},
                    _a[styles['tag-dot-inner']] = true,
                    _a[styles['tag-dot-innerblue']] = true,
                    _a)) }));
        }
        else {
            render.push(React.createElement("span", { key: "t-0", className: styles['tag-dot-inner'] }));
        }
        render.push(React.createElement(Dropdown, { trigger: ['click'], ref: "" + this.viewModel.dropdown.get(currKey).uid, overlay: this.renderDropMenuElement(currKey), visible: this.viewModel.dropdown.get(currKey).visible, placement: "bottomLeft" },
            React.createElement("span", { key: currKey, id: currKey, ref: "" + this.viewModel.dropdown.get(currKey).uid + this.viewModel.dropdown.get(currKey).tabkey }, title)));
        return render;
    };
    ContentPart.prototype.renderLayoutContentElement = function () {
        var _this = this;
        var store = this.props.store;
        var pane = this.props.store.panes.find(function (item) { return item.key === _this.props.store.activeKey; });
        if (this.props.userEntity !== void 0 && !this.props.userEntity.userUid) {
            return null;
        }
        if (this.props.isEnabledTabs) {
            return React.createElement(Tabs, { hideAdd: true, tabPosition: "top", animated: { inkBar: false, tabPane: false }, type: "editable-card", activeKey: store.activeKey, onEdit: this.handleEdit, onChange: this.handleChange, tabBarStyle: this.computedTabBarStyles() }, this.renderTabPaneElement());
        }
        else {
            return (React.createElement("div", { id: "micro-app-legions" }, pane && this.renderContentElement(pane)));
        }
    };
    ContentPart.prototype.computedContentClassProps = function () {
        var classValue = {};
        if (this.props.fixedLayoutPosition === 'fixedSiderHeader') {
            if (this.props.menuStore.viewModel.fixedHeader) {
                classValue = { className: "legions-pro-layout-tabs-content-fixed " + (this.props.isEnabledTabs ? '' : 'legions-pro-layout-tabs-content-fixed-not-pane') };
            }
        }
        return classValue;
    };
    ContentPart.prototype.computedTabBarStyles = function () {
        var tabBarStyles = { marginBottom: '0px', backgroundColor: '#fff' };
        if (this.props.fixedLayoutPosition === 'fixedSiderHeader') {
            if (this.props.menuStore.viewModel.fixedHeader) {
                tabBarStyles = __assign(__assign({}, tabBarStyles), { position: 'fixed', top: '50px', zIndex: 19, width: '90%' });
            }
        }
        return tabBarStyles;
    };
    ContentPart.prototype.render = function () {
        var loading = true;
        if (this.props.userEntity && this.props.userEntity.userUid) {
            loading = false;
        }
        return (React.createElement(Content, __assign({}, this.computedContentClassProps()), this.props.userEntity !== void 0 ? React.createElement(Spin, { tip: "Loading...", spinning: loading }, this.renderLayoutContentElement()) : this.renderLayoutContentElement()));
    };
    ContentPart.defaultProps = {
        fixedLayoutPosition: 'fixedSider',
    };
    ContentPart = __decorate([
        bind({ store: TabPaneViewStore, menuStore: MenuStore }),
        observer,
        __metadata("design:paramtypes", [Object])
    ], ContentPart);
    return ContentPart;
}(React.Component));

var Sider = Layout.Sider;
var SubMenu = Menu.SubMenu;
var MenuParts = /** @class */ (function (_super) {
    __extends(MenuParts, _super);
    function MenuParts(props) {
        var _this = _super.call(this, props) || this;
        /** 点击 MenuItem 调用此函数 */
        _this.onClick = function (selected) {
            var store = _this.props.store;
            var newItem = store.getMenuByKey(selected.key);
            var oldActiveKey = store.context.TabPaneApp.activeKey;
            //@ts-ignore
            store.context.TabPaneApp.addTabPanes(selected, store.getAllMenuList());
            if (newItem) {
                var path_1 = newItem['path'];
                var index = _this.props.router.findIndex(function (item) { return item.path === path_1.replace('#', ''); });
                if (path_1.indexOf('#') > -1 && index > -1) {
                    // window.location.href = `${this.props.domainUrl}${path.replace('','')}`
                    _this.props.store.history.push("" + path_1.replace('#', ''));
                }
                else if (path_1.indexOf('#') > -1 && newItem.loadingMode === 'sandbox') {
                    var _path = path_1.split('#');
                    if (_path.length > 1) {
                        var pane = store.context.TabPaneApp.panes.find(function (item) { return item.key === selected['key']; });
                        var oldpane = store.context.TabPaneApp.panes.find(function (item) { return item.key === oldActiveKey; });
                        store.context.TabPaneApp.proxySanbox.routerSanboxOpenMode = 'newOpenactiveTab';
                        store.context.TabPaneApp.proxySanbox.openTabPaneSanbox(oldpane, pane);
                    }
                }
            }
        };
        /** 菜单展开及收起 */
        _this.handleToggle = function () {
            _this.props.store.viewModel.collapsed = !_this.props.store.viewModel.collapsed;
            _this.props.store.triggerSyncCollapsedEvent({
                collapsed: _this.props.store.viewModel.collapsed
            });
        };
        _this.onSelect = _this.onSelect.bind(_this);
        _this.onOpenChange = _this.onOpenChange.bind(_this);
        return _this;
    }
    MenuParts.prototype.componentDidMount = function () {
        this.props.store.getMenuList(this.props.onGetMenuEntity);
        this.initGlobalVariableValue();
        this.setOpenKesInDidMountcycle();
    };
    MenuParts.prototype.initGlobalVariableValue = function () {
        var _this = this;
        var openTabPane = function (pane) {
            var item = _this.props.store.getMenuByKey(pane.key);
            if (item) {
                pane['keyPath'] = pane.keyPath || item.deep.reverse();
            }
            //@ts-ignore
            _this.props.store.context.TabPaneApp.addTabPanes(pane, _this.props.store.getAllMenuList());
        };
        var removeTablePane = function (targetKey) {
            _this.props.store.context.TabPaneApp.update(targetKey, 'remove');
            _this.props.store.triggerSetBreadCrumbsEven();
        };
        this.masterGlobalStateStore.openTabPane = openTabPane;
        this.masterGlobalStateStore.removeTablePane = removeTablePane;
    };
    /** 在did mount 生命周期内设置菜单展开项数据 */
    MenuParts.prototype.setOpenKesInDidMountcycle = function () {
        if (this.props.defaultOpenKeys && Array.isArray(this.props.defaultOpenKeys) && this.props.defaultOpenKeys.length) {
            if (this.props.store.openKeys.length === 0) {
                this.props.store.openChange(this.props.defaultOpenKeys);
            }
            else {
                var newOpenKeys = __spread(new Set(__spread(this.props.store.openKeys, this.props.defaultOpenKeys)));
                this.props.store.openChange(newOpenKeys);
            }
        }
    };
    /** 在打开菜单页面路由时，获取菜单完毕时，打开菜单页签 */
    MenuParts.prototype.onPageloadedOpenTabpane = function (menuList) {
        var _this = this;
        var store = this.props.store;
        store.context.TabPaneApp.syncTabPanes(menuList);
        var activeMenuItem = menuList.find(function (item) { return item.key === _this.props.activeKey; });
        var hash = window.location.hash;
        var menuItem = hash && menuList.find(function (item) { return (item.path === hash.replace('#', '') || item.path === hash || (item.path !== '#' && hash.indexOf(item.path) > -1)); });
        if (activeMenuItem) { /** 如果用户通过URL传入了活动菜单key值， 则打开用户指定的菜单key */
            store.openDefault({ key: this.props.activeKey, title: activeMenuItem.title, path: activeMenuItem.path + "?" + this.props.query });
        }
        else if (hash && menuItem) { /** 如果用户传入指定菜单路由进行访问，则通过路由地址去找寻菜单数据，进行访问菜单页面 */
            store.openDefault({ key: menuItem.key, title: menuItem.title, path: "" + menuItem.path });
        }
        else {
            /** 默认打开第一个
               * 条件 当默认选中值为空或数组长度为0 则可以自动打开默认页，
               * 否则调取默认缓存中菜单数据进行打开 */
            if ((Array.isArray(store.selectedKeys) || isObservableArray(store.selectedKeys)) && store.selectedKeys.length === 0) {
                var entity = menuList.length && menuList[0];
                if (entity.path && entity.path !== '#' && !this.props.activeKey) {
                    store.context.TabPaneApp.setDefaultTabPanes({
                        key: entity.key,
                        keyPath: [entity.key.toString()]
                    }, menuList);
                }
            }
        }
    };
    MenuParts.prototype.renderFirstMenuItemElement = function (item) {
        var skin = this.props.store.viewModel.getSkinInfos();
        this.props.store.setRootSubMenu(item.key.toString(), '0');
        return (React.createElement(Menu.Item, { key: "" + item.key, className: (skin && skin.skin) || '' }, !item.icon ? [React.createElement(Icon, { type: 'pie-chart' }),
            React.createElement("span", null, item.title)] : [
            React.createElement("img", { className: 'anticon', src: item.icon, style: { position: 'relative', top: '4px', right: '4px' } }),
            React.createElement("span", null, item.title)
        ]));
    };
    MenuParts.prototype.renderFirstSubMenuELement = function (item) {
        var skin = this.props.store.viewModel.getSkinInfos();
        this.props.store.setRootSubMenu(item.key.toString(), '0');
        var icon = '';
        if (item.icon && typeof item.icon === 'string') {
            //@ts-ignore
            if (RegExChk(validatorType.url, item.icon)) {
                icon = item.icon;
            }
            else {
                icon = "" + this.props.domainUrl + item.icon;
            }
        }
        return (React.createElement(SubMenu, { key: "" + item.key, className: (skin && skin.skin) || '', title: React.createElement("span", null,
                icon ? React.createElement("img", { className: 'anticon', src: icon, style: { position: 'relative', top: '4px', right: '4px' } }) : React.createElement(Icon, { type: "appstore" }),
                React.createElement("span", null, item.title)) }, this.renderRecursiveCallsMenu(item.children, false)));
    };
    /** 渲染末级菜单选项 */
    MenuParts.prototype.renderMenuItemElement = function (item) {
        var skin = this.props.store.viewModel.getSkinInfos();
        return (React.createElement(Menu.Item, { key: "" + item.key, className: (skin && skin.skin) || '' }, item.title));
    };
    MenuParts.prototype.renderSubMenuElement = function (item) {
        var skin = this.props.store.viewModel.getSkinInfos();
        return (React.createElement(SubMenu, { className: (skin && skin.skin) || '', key: "" + item.key, title: item.title }, this.renderRecursiveCallsMenu(item.children, false)));
    };
    /** 递归调用不断遍历所有菜单，并按照顺序渲染相应层级菜单 */
    MenuParts.prototype.renderRecursiveCallsMenu = function (list, isFirst) {
        var _this = this;
        if (isFirst === void 0) { isFirst = true; }
        if (isFirst) {
            return list.map(function (item, index) {
                return !item.children.length ? _this.renderFirstMenuItemElement(item) : _this.renderFirstSubMenuELement(item);
            });
        }
        else {
            return list.map(function (item, index) {
                return !item.children.length ? _this.renderMenuItemElement(item) : _this.renderSubMenuElement(item);
            });
        }
    };
    /** 渲染Logo节点 */
    MenuParts.prototype.renderLogoElement = function () {
        var store = this.props.store;
        var skin = store.viewModel.SkinList[store.viewModel.skin];
        return React.createElement("div", { className: "legions-pro-layout pro-content logo " + ((skin && skin.logoSkin) || '') }, this.props.store.viewModel.skin === '2' ? React.createElement(Icon, { className: "trigger", style: { marginLeft: "" + (store.viewModel.collapsed ? '10%' : '30%'), fontSize: '18px' }, type: store.viewModel.collapsed ? 'menu-unfold' : 'menu-fold', onClick: this.handleToggle }) : this.props.logo && React.createElement("img", { src: this.props.logo, width: store.viewModel.logoWidth + "px", onClick: this.props.onLogoClick }));
    };
    MenuParts.prototype.renderMenuNodesElement = function () {
        var store = this.props.store;
        var skin = store.viewModel.getSkinInfos();
        var renderMenuNode = React.createElement(Menu, __assign({ inlineIndent: 12 }, this.props, { mode: "inline", theme: skin.theme, openKeys: store.openKeys, className: (skin && skin.skin) || '', style: __assign({ color: 'hsla(0,0%,100%,.65)' }, this.props.style), selectedKeys: [store.context.TabPaneApp.activeKey], defaultSelectedKeys: [store.context.TabPaneApp.activeKey], defaultOpenKeys: this.props.defaultOpenKeys || [], inlineCollapsed: store.viewModel.collapsed, onSelect: this.onSelect, onOpenChange: this.onOpenChange, onClick: this.onClick }), store.obMenuList.isResolved && this.renderRecursiveCallsMenu(store.obMenuList.value.result));
        if (this.props.fixedLayoutPosition === 'fixedSiderHeader') {
            return React.createElement("div", { style: this.computedMenuParentElementStyles(), className: 'scroll_firefox_content' }, renderMenuNode);
        }
        return renderMenuNode;
    };
    MenuParts.prototype.renderSiderElement = function () {
        var _this = this;
        var store = this.props.store;
        var skin = store.viewModel.getSkinInfos();
        var rednerSider = function (style, classValue) { return React.createElement(Sider, { className: ((skin && skin.skin) || '') + " " + classValue, ref: 'siderContainer', breakpoint: "lg", collapsedWidth: "500", trigger: null, collapsed: store.viewModel.collapsed, 
            /* collapsible */
            width: skin.width, style: !store.viewModel.collapsed ? __assign({ overflow: 'auto' }, style) : __assign({}, style) },
            _this.renderLogoElement(),
            _this.renderMenuNodesElement()); };
        if (this.props.fixedLayoutPosition === 'fixedSiderHeader') {
            var classValue = store.viewModel.fixedSiderMenu ? 'ant-pro-sider ant-pro-sider-fixed' : '';
            var collapsedStyle = {};
            if (store.viewModel.collapsed) {
                collapsedStyle = { overflow: 'inherit' };
            }
            return React.createElement("aside", null,
                store.viewModel.fixedSiderMenu &&
                    React.createElement("div", { className: this.computedMenuPlaceholderNodesClass(), style: this.computedMenuPlaceholderNodesStyles() }),
                rednerSider(__assign({}, collapsedStyle), classValue));
        }
        return rednerSider({ height: '100vh' }, '');
    };
    MenuParts.prototype.computedMenuParentElementStyles = function () {
        var store = this.props.store;
        var menuStyles = {};
        if (this.props.fixedLayoutPosition === 'fixedSiderHeader') {
            if (!store.viewModel.collapsed) {
                menuStyles = __assign(__assign({}, menuStyles), { flex: '1 1 0%', overflow: 'auto' });
            }
        }
        return menuStyles;
    };
    /** 计算在固定侧边菜单栏区域占位节点样式信息 */
    MenuParts.prototype.computedMenuPlaceholderNodesStyles = function () {
        var store = this.props.store;
        var skin = this.props.store.viewModel.getSkinInfos();
        var fixedStyles = {};
        if (this.props.fixedLayoutPosition === 'fixedSiderHeader') {
            if (store.viewModel.fixedSiderMenu && !store.viewModel.collapsed) {
                fixedStyles = __assign(__assign({}, fixedStyles), { width: skin.width + "px", overflow: 'hidden', flex: "0 0 " + skin.width + "px", maxWidth: skin.width + "px", minWidth: skin.width + "px" });
            }
        }
        return fixedStyles;
    };
    MenuParts.prototype.computedMenuPlaceholderNodesClass = function () {
        var fixedClass = '';
        var store = this.props.store;
        if (this.props.fixedLayoutPosition === 'fixedSiderHeader') {
            if (store.viewModel.fixedSiderMenu && store.viewModel.collapsed) {
                fixedClass = 'ant-layout-sider-collapsed';
            }
        }
        return fixedClass;
    };
    /**
     * 被选中时调用
     *
     * @param {any} selected { item:'Menu.Item组件实例', key:'菜单序号', selectedKeys：‘当前选中的菜单项 key 数组’ }
     * @memberof MenuPart
     */
    MenuParts.prototype.onSelect = function (selected) {
        this.props.store.updateSelected(selected.selectedKeys);
    };
    /**
     * SubMenu 展开/关闭的回调
     *
     * @param {any} openKeys string[]
     * @memberof MenuPart
     */
    MenuParts.prototype.onOpenChange = function (openKeys) {
        var store = this.props.store;
        var latestOpenKey = openKeys.find(function (key) { return store.openKeys.indexOf(key) === -1; });
        var rootKeys = store.rootSubmenuKeys.map(function (item) { return item.key; });
        if (rootKeys.indexOf(latestOpenKey) === -1) {
            this.props.store.openChange(openKeys);
        }
        else {
            openKeys = latestOpenKey ? [latestOpenKey] : [];
            this.props.store.openChange(openKeys);
        }
    };
    MenuParts.prototype.render = function () {
        return (this.renderSiderElement());
    };
    MenuParts.defaultProps = {
        fixedLayoutPosition: 'fixedSider',
    };
    __decorate([
        inject(MasterGlobalStateStore),
        __metadata("design:type", MasterGlobalStateStore)
    ], MenuParts.prototype, "masterGlobalStateStore", void 0);
    MenuParts = __decorate([
        bind({ store: MenuStore }),
        page({
            sideEffect: function (that, store) {
                if (store.obMenuList.isResolved) {
                    /** 首次加载完成 */
                    that.masterGlobalStateStore.menuList = store.getAllMenuList(store.obMenuList.value.result, that.props.loadedMenuTransformData);
                    that.onPageloadedOpenTabpane(that.masterGlobalStateStore.menuList);
                }
            }
        }),
        observer,
        __metadata("design:paramtypes", [Object])
    ], MenuParts);
    return MenuParts;
}(React.Component));

var Header = Layout.Header;
var Columns = function (that) { return [
    {
        title: '任务名称',
        dataIndex: 'taskName',
        key: 'taskName',
        width: '10%',
    },
    {
        title: '版本号',
        dataIndex: 'version',
        key: 'version',
        width: '10%',
    },
    {
        title: '导出状态',
        dataIndex: 'stateDesc',
        key: 'stateDesc',
        width: '10%',
        render: function (text, recrod) {
            return React.createElement(Badge, { status: recrod['stateUI'], text: text });
        },
    },
    {
        title: '创建人',
        dataIndex: 'createrName',
        key: 'createrName',
        width: '10%',
    }, {
        title: '导出名字',
        dataIndex: 'moduleName',
        key: 'moduleName',
        width: '10%',
    },
    {
        title: '导出开始时间',
        dataIndex: 'startTime',
        key: 'startTime',
        width: '20%',
    },
    {
        title: '导出完成时间',
        dataIndex: 'finishTime',
        key: 'finishTime',
        width: '20%',
    },
    {
        title: '下载',
        dataIndex: 'filePath',
        key: 'filePath',
        width: '10%',
        render: function (text) {
            return React.createElement("span", { style: { cursor: 'pointer' } }, text && React.createElement(Icon, { type: "cloud-download-o", style: { fontSize: '18px', color: '#108ee9' }, onClick: function () {
                    download([decodeURIComponent(text)]);
                } }));
        },
    },
    {
        title: '删除',
        dataIndex: 'id',
        key: 'id',
        width: '10%',
        render: function (id) {
            return React.createElement(Icon, { type: "delete", style: { fontSize: '16px', color: '#108ee9', cursor: 'pointer' }, onClick: function () {
                    OpenConfirm({
                        title: '提示',
                        content: '是否确认删除？',
                        onOk: function () {
                            that.props.onExportTaskDelete && that.props.onExportTaskDelete(id);
                        }
                    });
                } });
        },
    }
]; };
var HeaderPart = /** @class */ (function (_super) {
    __extends(HeaderPart, _super);
    function HeaderPart(props) {
        var _this = _super.call(this, props) || this;
        /** 模态框内容区展示组件类型 */
        _this.modalContentType = '';
        _this.modalRef = null;
        _this.taskCenterTableRef = null;
        _this.onClose = function () {
            _this.modalRef.viewModel.visible = false;
        };
        _this.props.store.viewModel.skin = _this.props.skin || _this.props.store.viewModel.skin;
        _this.handleToggle = _this.handleToggle.bind(_this);
        _this.handleClick = _this.handleClick.bind(_this);
        return _this;
    }
    /** 渲染皮肤方案切换节点 */
    HeaderPart.prototype.renderSkinsElement = function () {
        var viewModel = this.props.store.viewModel;
        var menuItem = React.createElement(Menu, { onClick: this.handleClick, selectedKeys: ["" + viewModel.skin] },
            React.createElement(Menu.Item, { key: "0" },
                React.createElement("span", null,
                    "\u6697\u8272 : ",
                    React.createElement("span", null,
                        React.createElement(Icon, { type: "skin", style: { backgroundColor: '#484C72' } })))),
            React.createElement(Menu.Divider, null),
            React.createElement(Menu.Item, { key: "1" },
                React.createElement("span", null,
                    "\u6DE1\u84DD\u8272 : ",
                    React.createElement("span", null,
                        React.createElement(Icon, { type: "skin", style: { backgroundColor: '#212D32' } })))),
            React.createElement(Menu.Item, { key: "3" },
                React.createElement("span", null,
                    "\u84DD\u8272 : ",
                    React.createElement("span", null,
                        React.createElement(Icon, { type: "skin", style: { backgroundColor: '#015EA3' } })))));
        return React.createElement("span", { className: "action-item" },
            React.createElement(Dropdown, { overlay: menuItem, trigger: ['click'] },
                React.createElement("a", { className: "ant-dropdown-link", href: "#" },
                    React.createElement(Icon, { type: "skin", style: { fontSize: '18px' } }),
                    React.createElement(Icon, { type: "down" }))));
    };
    HeaderPart.prototype.renderDropdown = function () {
        return React.createElement(Menu, { onClick: this.props.onLoginOut },
            React.createElement(Menu.Item, null,
                React.createElement("span", null,
                    React.createElement(Icon, { type: "logout", style: { fontSize: 13, color: '#08c', paddingRight: '5px' } }),
                    React.createElement("span", null, "\u9000\u51FA\u767B\u5F55"))));
    };
    HeaderPart.prototype.renderTaskCenterElement = function () {
        var _this = this;
        return React.createElement("span", { className: "action-item", onClick: function () {
                _this.modalRef.viewModel.visible = true;
                _this.modalRef.viewModel.width = 960;
                _this.modalRef.viewModel.title = '自动任务调度中心';
                runInAction(function () {
                    _this.modalContentType = 'readTaskList';
                });
            } },
            React.createElement(Icon, { type: "cloud-download-o", style: { fontSize: '22px', color: '#108ee9' } }));
    };
    /** 渲染系统设置节点 */
    HeaderPart.prototype.renderSystemSettingElement = function () {
        var _this = this;
        return React.createElement(Dropdown, { overlay: (React.createElement(Menu, { onClick: function (params) {
                    if (params.key === '0') {
                        runInAction(function () {
                            _this.modalContentType = 'updatePass';
                        });
                        _this.modalRef.viewModel.visible = true;
                        _this.modalRef.viewModel.width = 660;
                        _this.modalRef.viewModel.title = '修改密码';
                    }
                } },
                (this.props.password && this.props.password.componentNode) && React.createElement(Menu.Item, { key: "0" },
                    React.createElement("span", null,
                        React.createElement(Icon, { style: { fontSize: '11px' }, type: "user" }),
                        "\u00A0\u00A0\u4FEE\u6539\u5BC6\u7801")),
                React.createElement(Menu.Item, { key: "1" },
                    React.createElement("span", { className: "action-item", onClick: this.props.onLoginOut },
                        React.createElement(Icon, { style: { fontSize: '11px' }, type: "logout" }),
                        "\u00A0\u00A0\u9000\u51FA\u767B\u5F55")))), trigger: ['hover'] },
            React.createElement("span", { className: "action-item" },
                React.createElement(Icon, { type: "setting", style: { fontSize: '20px', color: '#108ee9' } })));
    };
    HeaderPart.prototype.renderUserInfoElement = function () {
        return React.createElement("span", { className: "action-item" },
            React.createElement(Avatar, { icon: "user", size: "small" }),
            React.createElement("span", { className: "name" }, this.props.userName),
            this.props.companyName && React.createElement("span", null,
                " \u00A0\u00A0|\u00A0\u00A0",
                this.props.companyName));
    };
    /** 在用户信息节点之后插入自定义header信息 */
    HeaderPart.prototype.renderInsertRightHeaderElement = function () {
        return React.createElement("span", { className: "action-item" }, this.props.header);
    };
    /** 渲染搜索菜单直接打开菜单页签 */
    HeaderPart.prototype.renderSearchDirectMenuElement = function () {
        return React.createElement(LegionsProSelect, { labelInValue: true, onChange: this.handleChange.bind(this), placeholder: "\u5230\u8FBE\u83DC\u5355", style: { width: '160px' }, options: this.props.store.computedLastStageMenuItemList.map(function (item) {
                return { key: item.key, value: item.title };
            }) });
    };
    /** 渲染菜单展开折叠ICON 节点 */
    HeaderPart.prototype.renderMenuToggleIconElement = function () {
        return React.createElement(Icon, { className: "trigger", style: { float: 'left', fontSize: '26px' }, type: this.props.store.viewModel.collapsed ? 'menu-unfold' : 'menu-fold', onClick: this.handleToggle });
    };
    HeaderPart.prototype.renderBreadcrumbElement = function () {
        return React.createElement(Breadcrumb, { separator: ">", style: { float: 'left', marginLeft: '22px', lineHeight: '50px' } }, this.props.store.context.TabPaneApp.breadcrumbMenu.map(function (item, index) {
            return (React.createElement(Breadcrumb.Item, { key: index },
                React.createElement("span", { style: { fontSize: '14px' } }, item)));
        }));
    };
    HeaderPart.prototype.renderModalElement = function () {
        var _this = this;
        var footer = null;
        if (this.modalContentType === 'readTaskList') {
            footer = { footer: null };
        }
        if (this.modalContentType === 'updatePass' && this.props.password && (this.props.password.footer === null || this.props.password.footer)) {
            footer = { footer: this.props.password.footer };
        }
        return React.createElement(LegionsProModal, __assign({}, footer, { onOk: function () {
                if (_this.props.password && _this.props.password.onSubmit) {
                    if (typeof _this.props.password.onSubmit === 'function') {
                        _this.props.password.onSubmit({
                            onClose: _this.onClose,
                        });
                    }
                }
            }, onReady: function (value) {
                _this.modalRef = value;
                if (_this.props.password) {
                    _this.props.password.onReady && _this.props.password.onReady(value);
                }
            } }),
            //@ts-ignore
            this.modalContentType === 'readTaskList' && React.createElement(LegionsProTable, { bodyStyle: { minHeight: '0' }, total: this.props.store.viewModel.exportTaskList.length, scroll: { x: '100%', y: '300px' }, uniqueKey: "id", loading: false, columns: Columns(this), onReady: function (value) {
                    _this.taskCenterTableRef = value;
                    _this.taskCenterTableRef.viewModel.pageSize = 2;
                }, data: this.props.store.viewModel.exportTaskList }),
            (this.modalContentType === 'updatePass' && this.props.password) && (this.props.password.componentNode));
    };
    HeaderPart.prototype.renderHeaderElement = function () {
        var renderHeaders = React.createElement(Header, { style: { padding: 0, height: '50px' } },
            React.createElement("div", { className: 'left-header' },
                this.renderMenuToggleIconElement(),
                this.renderBreadcrumbElement()),
            !this.props.isReCustomHeader ?
                React.createElement("div", { className: "right-header" },
                    this.renderSearchDirectMenuElement(),
                    this.renderUserInfoElement(),
                    this.renderInsertRightHeaderElement(),
                    this.renderSkinsElement(),
                    this.renderTaskCenterElement(),
                    this.renderSystemSettingElement())
                :
                    React.createElement("div", { className: "right-header" },
                        this.renderSearchDirectMenuElement(),
                        this.renderInsertRightHeaderElement()),
            this.renderModalElement());
        if (this.props.fixedLayoutPosition === 'fixedSiderHeader') {
            return React.createElement("header", { className: this.computedHeaderClassName(), style: this.computedHeaderStyles() }, renderHeaders);
        }
        return renderHeaders;
    };
    /** 计算header 标签样式信息  */
    HeaderPart.prototype.computedHeaderClassName = function () {
        var store = this.props.store;
        var classNames = '';
        if (store.viewModel.fixedHeader) {
            classNames = 'ant-pro-fixed-header';
        }
        return classNames;
    };
    /** 计算header 标签 style 样式信息 */
    HeaderPart.prototype.computedHeaderStyles = function () {
        var store = this.props.store;
        var headerStyles = {};
        if (store.viewModel.fixedHeader) {
            var skin = store.viewModel.getSkinInfos();
            var width = skin.width;
            if (store.viewModel.collapsed) {
                width = skin.width - skin.collapsedWidth - 40;
            }
            headerStyles = __assign(__assign({}, headerStyles), { width: "calc(100% - " + width + "px)" });
        }
        return headerStyles;
    };
    HeaderPart.prototype.handleClick = function (value) {
        this.props.store.viewModel.skin = value.key;
    };
    HeaderPart.prototype.handleToggle = function () {
        this.props.store.viewModel.collapsed = !this.props.store.viewModel.collapsed;
        this.props.store.triggerSyncCollapsedEvent({
            collapsed: this.props.store.viewModel.collapsed
        });
    };
    HeaderPart.prototype.handleChange = function (value) {
        if (value) {
            var entrty = this.props.store.computedLastStageMenuItemList.find(function (item) { return item.key === value.key; });
            if (entrty) {
                var deep = entrty.deep.slice();
                var keyPath_1 = [];
                deep.map(function (item) {
                    keyPath_1.unshift(item);
                });
                var panes = { key: value.key, keyPath: keyPath_1 };
                //@ts-ignore
                this.props.store.context.TabPaneApp.addTabPanes(panes, this.props.store.getAllMenuList());
            }
        }
    };
    HeaderPart.prototype.render = function () {
        var store = this.props.store;
        return (this.renderHeaderElement());
    };
    HeaderPart.defaultProps = {
        fixedLayoutPosition: 'fixedSider',
    };
    __decorate([
        observable,
        __metadata("design:type", String)
    ], HeaderPart.prototype, "modalContentType", void 0);
    HeaderPart = __decorate([
        bind({ store: MenuStore }),
        observer,
        __metadata("design:paramtypes", [Object])
    ], HeaderPart);
    return HeaderPart;
}(React.Component));

var baseCls = 'legions-pro-layout';
var LegionsProLayout = function (props) {
    return (React.createElement("div", { className: "" + baseCls },
        React.createElement(Layout, null,
            React.createElement(MenuParts, __assign({}, props.menuProps, { fixedLayoutPosition: props.fixedLayoutPosition, domainUrl: props.domainUrl, userEntity: props.userEntity, router: props.router || [], defaultOpenKeys: props.defaultOpenKeys, query: props.query, activeKey: props.menuActiveKey, loadedMenuTransformData: props.loadedMenuTransformData, onGetMenuEntity: props.onGetMenuEntity, logo: props.logo, onLogoClick: props.onLogoClick })),
            React.createElement(Layout, null,
                (props.isShowHeader === void 0 || props.isShowHeader) && React.createElement(HeaderPart, { onLoginOut: props.onLoginOut, fixedLayoutPosition: props.fixedLayoutPosition, userName: props.userName, companyName: props.companyName, onExportTaskDelete: props.onExportTaskDelete, password: props.password, header: props.header, skin: props.skin || '0', isReCustomHeader: props.isReCustomHeader }),
                React.createElement(ContentPart, { notFoundUrl: props.notFoundUrl, fixedLayoutPosition: props.fixedLayoutPosition, domainUrl: props.domainUrl, userEntity: props.userEntity, isEnabledTabs: props.isEnabledTabs, router: props.router })))));
};

export default LegionsProLayout;
