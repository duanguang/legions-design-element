/**
  *  legions-pro-design v0.0.7
  * (c) 2021 duanguang
  * @license MIT
  */
import { CollapsedResource, MenuPanesStorageResource, BreadCrumbsResourceEven, StoreBase } from '../index';
import { observable, action, StoreModules } from 'legions/store';
import { setStorageItems, getStorageItem } from 'legions-utils-tool/storage';
import { observableViewModel, observablePromise } from 'legions/store-utils';
import { panesStorageKeys, activeKeyStorageKeys, selectedStorageKeys, breadcrumbStorageKeys, SELECTED_STORAGE_KEY, OPENKEYS_STORAGE_KEY } from '../../core';
import { RegExChk, validatorType } from 'legions-utils-tool/regex';
import { ProxySanbox } from '../../core/cross-module';
import { computed } from 'mobx';

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

var TabPaneUIView = /** @class */ (function () {
    function TabPaneUIView() {
        /**
         * 页签生成时间戳信息
         *
         * @memberof TabPaneUIView
         */
        this.tabPanesTimestamp = observable.map();
    }
    /**
     *
     * 更新相关页签时间戳信息
     * @memberof TabPaneUIView
     */
    TabPaneUIView.prototype.updateTimestamp = function (panesKey, timeStamp) {
        if (this.tabPanesTimestamp.has(panesKey)) {
            this.tabPanesTimestamp.set(panesKey, timeStamp || Date.parse(new Date().toString()));
        }
        else {
            this.tabPanesTimestamp.set(panesKey, timeStamp || Date.parse(new Date().toString()));
        }
    };
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], TabPaneUIView.prototype, "tabPanesTimestamp", void 0);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, Number]),
        __metadata("design:returntype", void 0)
    ], TabPaneUIView.prototype, "updateTimestamp", null);
    return TabPaneUIView;
}());

/** @format */
var TabPaneViewStore = /** @class */ (function (_super) {
    __extends(TabPaneViewStore, _super);
    function TabPaneViewStore(context) {
        var _this = _super.call(this, context) || this;
        _this.proxySanbox = null;
        /**
         *
         * 组件UI数据
         * @memberof TabPaneViewStore
         */
        _this.viewUIModel = observableViewModel(new TabPaneUIView());
        /**
         * 用于同步菜单栏是否收缩状态
         *
         * @memberof TabPaneViewStore
         */
        _this.collapsed = false;
        /**  Tabs 页签打开缓存数据*/
        _this.panes = getStorageItem(panesStorageKeys, []);
        /**  当前标签页,默认首页*/
        _this.activeKey = getStorageItem(activeKeyStorageKeys, '');
        _this.breadcrumbMenu = getStorageItem(breadcrumbStorageKeys, []);
        _this.proxySanbox = new ProxySanbox(_this.history);
        return _this;
    }
    TabPaneViewStore.prototype.addTabPanes = function (panes, menuList) {
        var index = this.panes.findIndex(function (item) { return item.key === panes.key; });
        var currMenu = menuList.find(function (item) { return item.key === panes.key; });
        this.updateBreadcrumbs(panes, menuList);
        if (index < 0) {
            var appName = '';
            var appEntiy = '';
            var appRootId = '';
            var experimentalStyleIsolation = true;
            var isMerge = false;
            if (currMenu && currMenu.sandbox) {
                appName = currMenu.sandbox['appName'];
                appEntiy = currMenu.sandbox['appEntiy'];
                appRootId = currMenu.sandbox['appRootId'];
                experimentalStyleIsolation = currMenu.sandbox['experimentalStyleIsolation'];
                isMerge = currMenu.sandbox['isMerge'];
            }
            else if (panes && panes.sandbox) {
                appName = panes.sandbox['appName'];
                appEntiy = panes.sandbox['appEntiy'];
                appRootId = panes.sandbox['appRootId'];
                experimentalStyleIsolation = panes.sandbox['experimentalStyleIsolation'];
                isMerge = panes.sandbox['isMerge'];
            }
            this.panes.push({
                key: panes.key,
                keyPath: panes.keyPath || (currMenu ? currMenu.deep.reverse() : []),
                path: currMenu ? currMenu.path : panes.path,
                title: currMenu ? currMenu.title : panes.title,
                activeRouter: currMenu ? currMenu.path : panes.path,
                loadingMode: currMenu ? currMenu.loadingMode : panes['loadingMode'] ? panes['loadingMode'] : 'iframe',
                sandbox: {
                    appName: appName,
                    appEntiy: appEntiy,
                    appRootId: appRootId,
                    experimentalStyleIsolation: experimentalStyleIsolation,
                    isMerge: isMerge,
                },
                params: panes.params || {},
            });
            this.viewUIModel.updateTimestamp(panes.key.toString());
        }
        else {
            this.panes[index].keyPath = panes.keyPath;
            this.panes[index].path = currMenu ? currMenu.path : panes.path;
            this.panes[index].activeRouter = currMenu ? currMenu.path : panes.path;
            this.panes[index].params = panes.params ? panes.params : this.panes[index].params;
            if (panes.forceRefresh) {
                this.viewUIModel.updateTimestamp(panes.key.toString());
            }
        }
        this.panes = this.panes.slice(); //
        this.setActiveKey(panes.key);
        setStorageItems(panesStorageKeys, this.panes); //同步缓存
    };
    /**
     * 打开指定菜单并同步更新缓存信息(tabs缓存，活动页签缓存,菜单面包屑缓存)
     *
     * @param {{key:string;keyPath?:string;path:string}} defaultItem
     * @param {Array<MenuEntity>} menuList
     * @memberof TabPaneViewStore
     */
    TabPaneViewStore.prototype.openDefault = function (defaultItem, menuList) {
        var index = this.panes.findIndex(function (item) { return item.key === defaultItem.key; });
        var currMenu = menuList.find(function (item) { return item.key === defaultItem.key; });
        this.updateBreadcrumbs({ keyPath: currMenu.deep }, menuList);
        if (index < 0) {
            this.panes.push({
                key: defaultItem.key,
                keyPath: defaultItem.keyPath,
                path: defaultItem.path,
                title: currMenu && currMenu.title,
                activeRouter: defaultItem.path,
                loadingMode: currMenu ? currMenu['loadingMode'] : 'iframe',
                sandbox: {
                    appName: (currMenu && currMenu.sandbox) && currMenu.sandbox['appName'],
                    appEntiy: (currMenu && currMenu.sandbox) && currMenu.sandbox['appEntiy'],
                    appRootId: (currMenu && currMenu.sandbox) && currMenu.sandbox['appRootId'],
                    experimentalStyleIsolation: (currMenu && currMenu.sandbox) && currMenu.sandbox['experimentalStyleIsolation'],
                    isMerge: (currMenu && currMenu.sandbox) && currMenu.sandbox['isMerge'],
                },
            });
            this.viewUIModel.updateTimestamp(defaultItem.key.toString());
        }
        else {
            this.panes[index].path = defaultItem.path;
            this.panes[index].activeRouter = defaultItem.path;
        }
        setStorageItems(panesStorageKeys, this.panes); //同步缓存
        this.panes = this.panes.slice(); //
        this.setActiveKey(defaultItem.key);
    };
    /**
     * 设置默认展开菜单信息同步缓存(tabs缓存，活动页签缓存,菜单面包屑缓存)
     *
     * @param {*} defaultItem
     * @param {Array<MenuEntity>} menuList
     * @memberof TabPaneViewStore
     */
    TabPaneViewStore.prototype.setDefaultTabPanes = function (defaultItem, menuList) {
        var index = this.panes.findIndex(function (item) { return item.key === defaultItem.key; });
        var currMenu = menuList.find(function (item) { return item.key === defaultItem.key; });
        this.updateBreadcrumbs({ keyPath: currMenu.deep }, menuList);
        if (index < 0) {
            this.panes.push({
                key: defaultItem.key,
                keyPath: defaultItem.keyPath,
                path: currMenu && currMenu.path,
                title: currMenu && currMenu.title,
                activeRouter: currMenu && currMenu.path,
                loadingMode: currMenu ? currMenu['loadingMode'] : 'iframe',
                sandbox: {
                    appName: (currMenu && currMenu.sandbox) && currMenu.sandbox['appName'],
                    appEntiy: (currMenu && currMenu.sandbox) && currMenu.sandbox['appEntiy'],
                    appRootId: (currMenu && currMenu.sandbox) && currMenu.sandbox['appRootId'],
                    experimentalStyleIsolation: (currMenu && currMenu.sandbox) && currMenu.sandbox['experimentalStyleIsolation'],
                    isMerge: (currMenu && currMenu.sandbox) && currMenu.sandbox['isMerge'],
                },
            });
            this.viewUIModel.updateTimestamp(defaultItem.key.toString());
            setStorageItems(panesStorageKeys, this.panes); //同步缓存
            this.panes = this.panes.slice(); //
            this.setActiveKey(defaultItem.key);
        }
    };
    /**
     * 设置活动页签
     *
     * @param {*} activeKey
     * @memberof TabPaneViewStore
     */
    TabPaneViewStore.prototype.setActiveKey = function (activeKey) {
        this.activeKey = activeKey;
        setStorageItems(activeKeyStorageKeys, this.activeKey);
        setStorageItems(selectedStorageKeys, this.activeKey);
    };
    /**
     * 新增和删除页签
     *
     * @param {any} targetKey  页签id
     * @param {any} action 操作类型 remove,add
     * @memberof TabPaneViewStore
     */
    TabPaneViewStore.prototype.update = function (targetKey, action) {
        var _this = this;
        if (action === 'remove') {
            if (typeof targetKey === 'string') {
                this.remove(targetKey);
            }
            else if (targetKey && Array.isArray(targetKey)) {
                targetKey.map(function (item) {
                    _this.remove(item);
                });
            }
        }
    };
    TabPaneViewStore.prototype.remove = function (targetKey) {
        //私有方法
        var activeKey = this.activeKey;
        var lastIndex;
        this.panes.forEach(function (pane, i) {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        var panes = this.panes.filter(function (pane) { return pane.key !== targetKey; });
        /**  当页签数量等于1时，则不允许删除最后一个页签*/
        if (panes.length > 0) {
            if (lastIndex >= 0 && activeKey === targetKey) {
                activeKey = panes[lastIndex].key;
            }
            else {
                /**  当页签为-1时，即从左至右一次关闭页签时，总是把后一个设为活动页签*/
                lastIndex = 0;
                activeKey = panes[lastIndex].key;
            }
            this.panes = panes;
            this.setActiveKey(activeKey);
            setStorageItems(panesStorageKeys, this.panes);
        }
    };
    /**
     * 同步设置面包屑导航信息
     *
     * @private
     * @param {*} panes
     * @param {Array<MenuEntity>} menuList
     * @memberof TabPaneViewStore
     */
    TabPaneViewStore.prototype.updateBreadcrumbs = function (panes, menuList) {
        var _this = this;
        this.breadcrumbMenu = []; //清空面包屑导航
        panes.keyPath.map(function (items) {
            var entity = menuList.find(function (item) { return item.key === items; });
            if (entity) {
                _this.breadcrumbMenu.push(entity.title);
            }
            else if (panes.title) {
                _this.breadcrumbMenu.push(panes.title);
            }
        });
        this.breadcrumbMenu = this.breadcrumbMenu.reverse().slice(); //处理头部面包屑导航数据
        setStorageItems(breadcrumbStorageKeys, this.breadcrumbMenu); //同步持久化
    };
    /**
     * 同步状态，主要用于当菜单手收起和展开时，执行的一些副作用
     *
     * @memberof TabPaneViewStore
     */
    TabPaneViewStore.prototype.syncCollapsed = function (collapsed) {
        this.collapsed = collapsed;
    };
    TabPaneViewStore.prototype.clearStorage = function () {
        localStorage.removeItem(panesStorageKeys);
        localStorage.removeItem(activeKeyStorageKeys);
        localStorage.removeItem(selectedStorageKeys);
        localStorage.removeItem(breadcrumbStorageKeys);
    };
    TabPaneViewStore.prototype.onEvent = function (event) {
        var _this = this;
        if (CollapsedResource.created.name === event.name) {
            this.collapsed = event.payload.collapsed; // 当菜单折叠状态变更时，同步更新
        }
        if (MenuPanesStorageResource.removed.name === event.name) {
            // 移除缓存信息
            this.clearStorage();
        }
        if (BreadCrumbsResourceEven.created.name === event.name) {
            var item = this.panes.find(function (item) { return item.key === _this.activeKey; }); // 当移除页签时，重新设置面包屑导航信息
            if (item) {
                this.updateBreadcrumbs({ keyPath: item.keyPath }, event.payload.menuList);
                if (
                //@ts-ignore
                RegExChk(validatorType.path, item.path) &&
                    item.path.indexOf('#') > -1) {
                    var _path_1 = item.path.split('#');
                    var _router = event.payload.router || [];
                    if (_path_1.length > 1) {
                        var _index = _router.findIndex(function (item) { return item.path === _path_1[1]; });
                        if (_index > -1) {
                            window.location.hash = _path_1[1];
                        }
                    }
                }
            }
        }
    };
    /**
     * 同步菜单缓存信息
     *
     * @param {Array<MenuEntity>} menuList
     * @memberof TabPaneViewStore
     */
    TabPaneViewStore.prototype.syncTabPanes = function (menuList) {
        this.panes = this.panes.map(function (item) {
            var entity = menuList.find(function (menu) { return menu.key === item.key; });
            if (entity) {
                item.path = entity.path;
                item.activeRouter = entity.path;
                item.title = entity.title;
                item['loadingMode'] = entity['loadingMode'];
                item['sandbox'] = entity['sandbox'] || {
                    appName: '',
                    appEntiy: '',
                    appRootId: '',
                    experimentalStyleIsolation: true,
                    isMerge: false,
                };
            }
            return item;
        });
        setStorageItems(panesStorageKeys, this.panes); //同步缓存
    };
    TabPaneViewStore.meta = __assign(__assign({}, StoreBase.meta), { eventScopes: [
            CollapsedResource,
            MenuPanesStorageResource,
            BreadCrumbsResourceEven,
        ] });
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], TabPaneViewStore.prototype, "viewUIModel", void 0);
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], TabPaneViewStore.prototype, "collapsed", void 0);
    __decorate([
        observable,
        __metadata("design:type", Array)
    ], TabPaneViewStore.prototype, "panes", void 0);
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], TabPaneViewStore.prototype, "activeKey", void 0);
    __decorate([
        observable,
        __metadata("design:type", Array)
    ], TabPaneViewStore.prototype, "breadcrumbMenu", void 0);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Array]),
        __metadata("design:returntype", void 0)
    ], TabPaneViewStore.prototype, "addTabPanes", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Array]),
        __metadata("design:returntype", void 0)
    ], TabPaneViewStore.prototype, "openDefault", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Array]),
        __metadata("design:returntype", void 0)
    ], TabPaneViewStore.prototype, "setDefaultTabPanes", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], TabPaneViewStore.prototype, "setActiveKey", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], TabPaneViewStore.prototype, "update", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], TabPaneViewStore.prototype, "syncCollapsed", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], TabPaneViewStore.prototype, "clearStorage", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], TabPaneViewStore.prototype, "onEvent", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Array]),
        __metadata("design:returntype", void 0)
    ], TabPaneViewStore.prototype, "syncTabPanes", null);
    TabPaneViewStore = __decorate([
        StoreModules,
        __metadata("design:paramtypes", [Object])
    ], TabPaneViewStore);
    return TabPaneViewStore;
}(StoreBase));

var MenuViewStore = /** @class */ (function () {
    function MenuViewStore() {
        /**
         * logo 宽度
         *
         * @memberof MenuViewStore
         */
        this.logoWidth = 125;
        /**
         *
         *皮肤方案
         * @memberof MenuViewStore
         */
        this.skin = '0';
        /**
         * 皮肤列表数据
         *
         * @type {ISkinModel}
         * @memberof MenuViewStore
         */
        this.SkinList = {
            '0': {
                color: '#484C72',
                skin: 'legions-pro-menu-them-dark-green',
                logoSkin: 'legions-pro-menu-them-dark-green-logo',
                theme: 'dark',
                width: 170,
                collapsedWidth: 65,
            },
            '1': {
                skin: 'legions-pro-menu-them-light-blue',
                color: '#212D32',
                logoSkin: 'legions-pro-menu-them-light-blue-logo',
                theme: 'dark',
                width: 170,
                collapsedWidth: 65,
            },
            '2': {
                skin: 'legions-pro-menu-them-2',
                color: '#fff',
                logoSkin: 'legions-pro-menu-them-2-logo',
                theme: 'light',
                width: 160,
                collapsedWidth: 65,
            },
            '3': {
                skin: 'legions-pro-menu-them-blue',
                color: '#015EA3',
                logoSkin: 'legions-pro-menu-them-blue-logo',
                theme: 'dark',
                width: 160,
                collapsedWidth: 40,
            },
        };
        /**
         * true 折叠
         *
         * false 展开
         *菜单左右方向展开收起
         * @memberof MenuViewStore
         */
        this.collapsed = false; //
        this.exportTaskList = [];
        /** 是否固定侧边菜单 */
        this.fixedSiderMenu = true;
        /** 是否固定头部区域 */
        this.fixedHeader = true;
    }
    MenuViewStore.prototype.getSkinInfos = function () {
        return this.SkinList[this.skin];
    };
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], MenuViewStore.prototype, "logoWidth", void 0);
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], MenuViewStore.prototype, "skin", void 0);
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], MenuViewStore.prototype, "SkinList", void 0);
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], MenuViewStore.prototype, "collapsed", void 0);
    __decorate([
        observable,
        __metadata("design:type", Array)
    ], MenuViewStore.prototype, "exportTaskList", void 0);
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], MenuViewStore.prototype, "fixedSiderMenu", void 0);
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], MenuViewStore.prototype, "fixedHeader", void 0);
    return MenuViewStore;
}());

/*
 * @Author: duanguang
 * @Date: 2020-12-31 10:34:43
 * @LastEditTime: 2021-01-07 17:52:53
 * @LastEditors: duanguang
 * @Description:
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/store/pro.layout/MenuStore.ts
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
var MenuStore = /** @class */ (function (_super) {
    __extends(MenuStore, _super);
    function MenuStore(context) {
        var _this = _super.call(this, context) || this;
        /** 菜单组件涉及到数据Model */
        _this.viewModel = observableViewModel(new MenuViewStore());
        /** 菜单展开选项值集合 */
        _this.openKeys = getStorageItem(OPENKEYS_STORAGE_KEY, []);
        _this.obMenuList = observablePromise();
        /** 选中菜单项数据 */
        _this.selectedKeys = getStorageItem(SELECTED_STORAGE_KEY, []);
        /**一级菜单节点数据*/
        _this.rootSubmenuKeys = [];
        /**
         * 菜单展开收起
         *
         * @memberof MenuStore
         */
        _this.openChange = function (openKeys) {
            _this.openKeys = openKeys;
            localStorage.setItem(OPENKEYS_STORAGE_KEY, JSON.stringify(_this.openKeys));
        };
        _this.menuList = _this.plainMenuList();
        return _this;
    }
    Object.defineProperty(MenuStore.prototype, "computedLastStageMenuItemList", {
        /** 查询末级菜单选项集合 */
        get: function () {
            if (this.obMenuList.isResolved) {
                return this.getAllMenuList().filter(function (item) { return item.children.length === 0; });
            }
            return [];
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 菜单由层级改为平级
     *
     * @private
     * @returns
     * @memberof MenuStore
     */
    MenuStore.prototype.plainMenuList = function () {
        var _this = this;
        //菜单由层级改为平级
        var plainMenu = [];
        var func = function (options) {
            if (plainMenu.length <= 0) {
                _this.cycleMenuList(plainMenu, options.list);
                if (options.loadedMenuTransformData) {
                    options.loadedMenuTransformData(plainMenu);
                }
                return plainMenu;
            }
            return plainMenu;
        };
        return func;
    };
    /**
     *  菜单由多层嵌套层级改为平级
     *
     * @private
     * @param {Array<MenuEntity>} arr
     * @param {Array<MenuEntity>} [list=[]]
     * @returns
     * @memberof MenuStore
     */
    MenuStore.prototype.cycleMenuList = function (arr, list) {
        var _this = this;
        if (list === void 0) { list = []; }
        list.map(function (item) {
            arr.push(item);
            if (item.children.length) {
                _this.cycleMenuList(arr, item.children);
            }
        });
        return arr;
    };
    /**
     * 设置选中菜单缓存值，用于持久化
     *
     * @memberof MenuViewStore
     */
    MenuStore.prototype.updateSelectedStorage = function () {
        localStorage.setItem(SELECTED_STORAGE_KEY, JSON.stringify(this.selectedKeys));
    };
    /** 获取全部菜单数据 */
    MenuStore.prototype.getAllMenuList = function (list, loadedMenuTransformData) {
        return this.menuList({
            list: list,
            loadedMenuTransformData: loadedMenuTransformData
        });
    };
    /**
     * 查询指定菜单选项
     *
     * @param {string} key 通过菜单key
     * @memberof MenuStore
     */
    MenuStore.prototype.getMenuByKey = function (key) {
        var menuList = this.menuList();
        return menuList.find(function (item) { return item['key'] === key; });
    };
    /**
     * 菜单折叠触发器
     *
     * @param {ITriggerEventPrams} payload
     * @memberof MenuStore
     */
    MenuStore.prototype.triggerSyncCollapsedEvent = function (payload) {
        this.context.dispatch(CollapsedResource.created, payload);
    };
    /** 清理菜单及页签缓存数据触发器 */
    MenuStore.prototype.triggerClearStorageEvent = function () {
        this.context.dispatch(MenuPanesStorageResource.removed, {});
    };
    /**
     *
     * 设置菜单面包屑信息(点击tabs页签切换)
     * @param {{ keyPath: string[] }} panesKeyPath
     * @memberof MenuStore
     */
    MenuStore.prototype.triggerSetBreadCrumbsEven = function (router) {
        this.context.dispatch(BreadCrumbsResourceEven.created, {
            menuList: this.menuList(),
            router: router,
        });
    };
    /** 调用接口查询菜单数据 */
    MenuStore.prototype.getMenuList = function (func) {
        this.obMenuList = observablePromise(func());
    };
    /** 当前展开的 SubMenu 菜单项 key 数组  */
    MenuStore.prototype.expand = function (openKeys) {
        this.openKeys = openKeys;
    };
    MenuStore.prototype.updateSelected = function (selected) {
        this.selectedKeys = selected;
        this.updateSelectedStorage();
    };
    /** 设置根节点菜单项信息 */
    MenuStore.prototype.setRootSubMenu = function (key, depth) {
        var index = this.rootSubmenuKeys.findIndex(function (item) { return item.key === key; });
        if (index < 0) {
            this.rootSubmenuKeys.push({ key: key, depth: depth });
        }
    };
    /** 打开默认菜单页签 */
    MenuStore.prototype.openDefault = function (panes) {
        this.context.TabPaneApp.openDefault(panes, this.menuList());
    };
    /**
     * 清空当前展开的菜单项缓存值
     *
     * 清除当前选中的菜单项缓存值
     */
    MenuStore.prototype.clearStorage = function () {
        localStorage.removeItem(OPENKEYS_STORAGE_KEY);
        localStorage.removeItem(SELECTED_STORAGE_KEY);
    };
    MenuStore.prototype.onEvent = function (event) {
        if (event.name === MenuPanesStorageResource.removed.name) {
            this.clearStorage();
        }
        if (event.name === CollapsedResource.created.name) {
            this.viewModel.logoWidth = 125;
            if (this.viewModel.collapsed) {
                this.viewModel.logoWidth = 80;
            }
        }
    };
    MenuStore.meta = __assign(__assign({}, StoreBase.meta), { eventScopes: [
            CollapsedResource,
            MenuPanesStorageResource,
            BreadCrumbsResourceEven,
        ], contextTypes: {
            TabPaneApp: TabPaneViewStore,
        } });
    __decorate([
        observable.ref,
        __metadata("design:type", Array)
    ], MenuStore.prototype, "openKeys", void 0);
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], MenuStore.prototype, "obMenuList", void 0);
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], MenuStore.prototype, "selectedKeys", void 0);
    __decorate([
        observable,
        __metadata("design:type", Array)
    ], MenuStore.prototype, "rootSubmenuKeys", void 0);
    __decorate([
        computed,
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [])
    ], MenuStore.prototype, "computedLastStageMenuItemList", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Function]),
        __metadata("design:returntype", void 0)
    ], MenuStore.prototype, "getMenuList", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Array]),
        __metadata("design:returntype", void 0)
    ], MenuStore.prototype, "expand", null);
    __decorate([
        action,
        __metadata("design:type", Object)
    ], MenuStore.prototype, "openChange", void 0);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Array]),
        __metadata("design:returntype", void 0)
    ], MenuStore.prototype, "updateSelected", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, String]),
        __metadata("design:returntype", void 0)
    ], MenuStore.prototype, "setRootSubMenu", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], MenuStore.prototype, "openDefault", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], MenuStore.prototype, "clearStorage", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], MenuStore.prototype, "onEvent", null);
    MenuStore = __decorate([
        StoreModules,
        __metadata("design:paramtypes", [Object])
    ], MenuStore);
    return MenuStore;
}(StoreBase));

export { MenuStore, TabPaneViewStore };
