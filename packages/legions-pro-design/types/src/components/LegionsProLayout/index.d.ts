import React from 'react';
import './style/index.less';
import { IRouter } from './content';
import { IUserInfo } from '../interface';
import { MenuProps } from 'antd/lib/menu';
import LegionsModels from '../LegionsModels';
interface IProps extends IUserInfo {
    /** 路由访问模块时使用 */
    router?: Array<IRouter>;
    /** 是否启用页签 */
    isEnabledTabs: boolean;
    /** logo 图片地址 */
    logo: string;
    /** 获取菜单数据接口 */
    onQueryPromiseMenus: () => Promise<InstanceType<typeof LegionsModels.MenuContainerEntity>>;
    /** 退出登录 */
    onLoginOut: () => void;
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
     *
     * @type {string}
     * @memberof IProps
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
            node: React.ReactNode;
            /** 下拉菜单项key */
            key: string;
        }>;
    };
    /** * 自定义头部区域 */
    header?: React.ReactNode;
    /**  主题 */
    theme?: 'dark' | 'lightBlue' | 'blue';
    /**
     *
     * 重新自定义头部右侧内容
     * @type {boolean}
     * @memberof IProps
     * @description 值为true时表示重新自定义头部右侧内容，不传值或者值为false时表示沿用旧版
    */
    isReCustomHeader?: boolean;
    /**
     * 头部logo 点击事件
     *
     * @memberof IProps
     */
    onLogoClick?: () => void;
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
    loadedMenuTransformData?: (menuList: InstanceType<typeof LegionsModels.MenuEntity>[]) => void;
}
declare const LegionsProLayout: (props: IProps) => JSX.Element;
export default LegionsProLayout;
