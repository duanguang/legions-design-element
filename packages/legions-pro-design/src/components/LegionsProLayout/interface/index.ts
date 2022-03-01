import { MenuBaseModel,MenuModel,TypeMenuBaseModel } from "../model"
import React from 'react'
import { MenuProps } from "antd/lib/menu"
import LegionsStoreLayout from "../store"
/*
 * @Author: duanguang
 * @Date: 2022-02-28 15:56:19
 * @LastEditTime: 2022-03-01 13:54:18
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/LegionsProLayout/interface/index.ts
 * 「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
interface panesInterface {
    key: string;
    keyPath?: string | string[];
    path: string;
    title: string;
    activeRouter?: string;
    content?: string;
    closable?: boolean;
    /** 页签内容加载方式:1：sandbox沙箱加载 2：iframe 3: React路由组件加载方式; 默认统一iframe */
    loadingMode: 'sandbox' | 'iframe' | 'routerCompeont';
    /** 单应用路由模式,可选参数,不传默认为history */
    router?: 'history' | 'hash'
    sandbox: {
        /** 应用名称 */
        appName: string;
        /** 应用入口链接 */
        appEntiy: string;
        /** 应用根节点标签Id信息  */
        appRootId: string;
        experimentalStyleIsolation: boolean;
        isMerge: boolean;
        props?: any;
    };
    params?: {
        [x: string]: string;
    };
    forceRefresh?: boolean;
    /** 在渲染页面(iframe,sanbox,routerComponent)之前调用，可对页签对象进行自定义操作 */
    beforeLoad?: (pane: panesInterface) => panesInterface;
    /** 打开页面后，执行该函数 */
    afterLoad?: (value: { pane: panesInterface; iframe?: HTMLIFrameElement }) => void;
}
export interface skinModelInterface {
    [propName: string]: {
        color: string;
        skin: string;
        logoSkin: string;
        theme: 'light' | 'dark';
        width: number;
        /** 菜单收起时宽度 */
        collapsedWidth: number;
    };
}
interface mount {
    mount: () => void;
    unmount: () => void;
    loadPromise: Promise<null>;
    bootstrapPromise: Promise<null>;
    mountPromise: Promise<null>;
    unmountPromise: Promise<null>;
}
export interface microSanboxAppInterface {
    getStatus: () =>
        | 'NOT_LOADED'
        | 'LOADING_SOURCE_CODE'
        | 'NOT_BOOTSTRAPPED'
        | 'BOOTSTRAPPING'
        | 'NOT_MOUNTED'
        | 'MOUNTING'
        | 'MOUNTED'
        | 'UPDATING'
        | 'UNMOUNTING'
        | 'UNLOADING'
        | 'SKIP_BECAUSE_BROKEN'
        | 'LOAD_ERROR';
    /** 沙箱应用名称 */
    appName: string;
    /** 资源入口 */
    entry: string;
    app: mount;
    mount(): Promise<null>;
    unmount(): Promise<null>;
}


export type globalUserType<T> = {
    userName: string
    userUid: string;
    companyName?: string,
    companyUid?: string,
    /** 接口返回的原始用户信息 */
    rowData?: T;
}
interface GlobalStates {
    methods?: {
        /** 打开菜单页签，可只传递菜单key */
        openTabPane?: (pane: { key: string; keyPath?: string[]; title?: string; path?: string,params?: { [x: string]: string },forceRefresh?: boolean }) => void;
        /** 关闭菜单页签 */
        removeTablePane?: (targetKey: string | string[]) => void;
    },
    menuList?: TypeMenuBaseModel[];
    user?: globalUserType<any>
}
interface TriggerEventPrams {
    collapsed?: boolean;
    menuList?: TypeMenuBaseModel[];
    router?: Array<router>;
}
interface router {
    path: string;
    key?: string;
    component: any;
}
export type openPaneParamesType = Pick<panesInterface,'key' | 'title' | 'path' | 'params' | 'forceRefresh'> & { keyPath?: Array<string> }
export interface legionsProLayoutInterface<User = {}> {
    panes: panesInterface;
    skinModel: skinModelInterface;
    mount: mount;
    microSanboxApp: microSanboxAppInterface;
    globalUser: globalUserType<User>;
    openPaneParames: openPaneParamesType;
    menuList: TypeMenuBaseModel[];
    triggerEventPrams: TriggerEventPrams;
    GlobalStates: GlobalStates;
    router: router;
}
 /** Layout 管理页容器 */
export interface legionsProLayoutMainProps {
    userEntity?: globalUserType<{}>;
    /** 路由访问模块时使用 */
    router?: Array<router>;
    /** 是否启用页签 */
    isEnabledTabs: boolean;
    /** logo 图片地址 */
    logo: string;

    /** 获取菜单数据接口 */
    onQueryPromiseMenus: () => Promise<InstanceType<typeof MenuModel>>;

    /** 退出登录 */
    onLoginOut: () => void;

    /**
     * 头部logo 点击事件
     */
    onLogoClick?: () => void;

    /** 菜单地址主域地址信息
    * 
    * 当菜单地址为相对路径时，会根据此链接拼接完整地址，主要用于iframe
    */
    domainUrl?: string;

    /** 外部链接跳转，打开指定菜单 */
    defaultOpenMenuTabs?: {
        /** 指定菜单Key */
        meunKey?: string;
        /** 打开菜单地址栏参数 */
        params?: string;
    };

    /**
     *404 url or path
     */
    notFoundUrl: string;

    children?: React.ReactNode;

    /** 是否显示头部 */
    isShowHeader?: boolean;

    /** 默认展开的菜单项 */
    defaultOpenKeys?: string[];

    /** 扩展系统设置下拉菜单项 */
    sysSettingDropdown?: {
        /** 下拉菜单项被单击时触发 */
        onClick?: (key: string) => void;
        dropdown: Array<{
            /** 下拉菜单项节点 */
            node: React.ReactNode,
            /** 下拉菜单项key */
            key: string;
        }>
    };

    /** * 自定义头部区域 */
    header?: React.ReactNode;

    /**  主题 */
    theme?: 'dark' | 'lightBlue' | 'blue';

    /**
    * 重新自定义头部右侧内容
    * @description 值为true时表示重新自定义头部右侧内容，不传值或者值为false时表示沿用旧版
   */
    isReCustomHeader?: boolean;

    /** 菜单组件配置项 */
    menuProps?: MenuProps;

    /** 布局位置
     * 
     * fixedSider 固定侧边栏
     * 
     * fixedSiderHeader 固定侧边栏及header
     */
    fixedLayoutPosition?: 'fixedSider' | 'fixedSiderHeader';

    /** 在菜单数据接口请求完成后，如果需要对菜单数据项进行自定义加工，可传入此函数 */
    loadedMenuTransformData?: (menuList: InstanceType<typeof MenuBaseModel>[]) => void;
}
/** 菜单组件props约束 */
export interface menuPartsProps extends
    Pick<legionsProLayoutMainProps,'userEntity' | 'logo'
    | 'onQueryPromiseMenus' | 'defaultOpenMenuTabs'
    | 'domainUrl' | 'router'
    | 'defaultOpenKeys' | 'onLogoClick'
    | 'fixedLayoutPosition' | 'loadedMenuTransformData'> , MenuProps{
    store?: InstanceType<typeof LegionsStoreLayout.MenuStore>
}
/** headerPart组件props约束 */
export interface headerPartProps extends Pick<legionsProLayoutMainProps,'userEntity'
    | 'onLoginOut' | 'sysSettingDropdown'
    | 'header' | 'isReCustomHeader'
    | 'fixedLayoutPosition'> {
    skin?: string;
    store?: InstanceType<typeof LegionsStoreLayout.MenuStore>;
}
/** content组件props约束 */
export interface contentPartProps extends Pick<legionsProLayoutMainProps,'userEntity'
    | 'router' | 'isEnabledTabs'
    | 'domainUrl' | 'notFoundUrl'
    | 'fixedLayoutPosition'> {
    store?: InstanceType<typeof LegionsStoreLayout.TabPaneViewStore>;
    menuStore?: InstanceType<typeof LegionsStoreLayout.MenuStore>;
}
export interface legionsProLayoutProps {
    /** Layout 管理页容器 */
    main: legionsProLayoutMainProps;
    /** 菜单组件props约束 */
    menuParts: menuPartsProps;
    /** headerPart组件props约束 */
    headerPart: headerPartProps;
    /** content组件props约束 */
    contentPart: contentPartProps;
}