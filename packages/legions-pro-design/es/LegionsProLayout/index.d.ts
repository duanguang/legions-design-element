import React from 'react';
import './style/index.less';
import { IRouter } from './content';
import { IUserInfo } from '../interface';
import { InstanceLegionsProModal } from '../LegionsProModal/interface';
import { MenuProps } from 'antd/lib/menu';
import { MenuEntity } from '../models';
interface IProps extends IUserInfo {
    router: Array<IRouter>;
    isEnabledTabs: boolean;
    userName: string;
    companyName: string;
    logo: string;
    onGetMenuEntity: () => Promise<any>;
    onLoginOut: () => void;
    domainUrl?: string;
    menuActiveKey?: string;
    query?: string;
    /**
     *404 url or path
     *
     * @type {string}
     * @memberof IProps
     */
    notFoundUrl: string;
    /** 删除异步任务 */
    onExportTaskDelete?: (id: string) => any;
    children?: React.ReactNode;
    isShowHeader?: boolean;
    defaultOpenKeys?: string[];
    password?: {
        /** * 点击确定时触发提交事件*  */
        onSubmit: (value: {
            /**  关闭弹窗  */
            onClose: () => void;
        }) => void;
        componentNode?: React.ReactNode;
        footer?: React.ReactNode;
        onReady?: (instance: InstanceLegionsProModal) => void;
    };
    /** * 自定义头部区域 */
    header?: React.ReactNode;
    /**  * 自定义皮肤 */
    skin?: string;
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
    /** 布局布局位置 */
    fixedLayoutPosition?: 'fixedSider' | 'fixedSiderHeader';
    /** 在菜单数据接口请求完成后，如果需要对菜单数据项进行自定义加工，可传入此函数 */
    loadedMenuTransformData?: (menuList: MenuEntity[]) => void;
}
declare const LegionsProLayout: (props: IProps) => JSX.Element;
export default LegionsProLayout;
