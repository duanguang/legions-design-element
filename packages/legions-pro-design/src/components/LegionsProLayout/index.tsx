import React from 'react'
import { Layout } from 'antd';

import './index.less'
import ContentPart,{ IRouter } from './content';
import MenuParts from './SideMenu';
import HeaderPart from './Header';
import { IUserInfo,ILegionsPluginDataOrigin } from '../interface';
import { InstanceLegionsProModal } from '../LegionsProModal/interface';
import { MenuProps } from 'antd/lib/menu';
import { LegionsPluginsExecute } from 'legions-lunar/legion.plugin.sdk';
import { MenuEntity } from '../models/pro.menu.model';
const baseCls = 'legions-pro-layout'

interface IProps extends IUserInfo {
    router: Array<IRouter>
    isEnabledTabs: boolean
    userName: string
    companyName: string,
    logo: string,
    onGetMenuEntity: () => Promise<any>
    onLoginOut: () => void,
    domainUrl?: string,
    menuActiveKey?: string,
    query?: string,

    /**
     *404 url or path
     *
     * @type {string}
     * @memberof IProps
     */
    notFoundUrl: string;

    /** 删除异步任务 */
    onExportTaskDelete?: (id: string) => any;
    children?: React.ReactNode
    isShowHeader?: boolean;
    defaultOpenKeys?: string[];
    password?: {
        /** * 点击确定时触发提交事件*  */
        onSubmit: (value: {
            /**  关闭弹窗  */
            onClose: () => void,
        }) => void;
        componentNode?: React.ReactNode;
        footer?: React.ReactNode;
        onReady?: (instance: InstanceLegionsProModal) => void
    }

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
    isReCustomHeader?: boolean

    /**
     * 头部logo 点击事件
     *
     * @memberof IProps
     */
    onLogoClick?: () => void;
    /** 菜单组件配置项 */
    menuProps?: MenuProps;

    /** 布局布局位置 */
    fixedLayoutPosition?: 'fixedSider' | 'fixedSiderHeader'

    /** 在菜单数据接口请求完成后，如果需要对菜单数据项进行自定义加工，可传入此函数 */
    loadedMenuTransformData?: (menuList: MenuEntity[]) => void;
}
const ContainLayout = (props: IProps) => {
    return (
        <div className={`${baseCls}`}>
            <Layout>
                <MenuParts
                    {...props.menuProps}
                    fixedLayoutPosition={props.fixedLayoutPosition}
                    domainUrl={props.domainUrl}
                    userEntity={props.userEntity}
                    router={props.router || []}
                    defaultOpenKeys={props.defaultOpenKeys}
                    query={props.query} activeKey={props.menuActiveKey}
                    loadedMenuTransformData={props.loadedMenuTransformData}
                    onGetMenuEntity={props.onGetMenuEntity} logo={props.logo}
                    onLogoClick={props.onLogoClick}></MenuParts>

                <Layout>
                    {(props.isShowHeader === void 0 || props.isShowHeader) && <HeaderPart
                        onLoginOut={props.onLoginOut}
                        fixedLayoutPosition={props.fixedLayoutPosition}
                        userName={props.userName}
                        companyName={props.companyName}
                        onExportTaskDelete={props.onExportTaskDelete}
                        password={props.password}
                        header={props.header}
                        skin={props.skin || '0'}
                        isReCustomHeader={props.isReCustomHeader}
                    ></HeaderPart>}
                    <ContentPart
                        notFoundUrl={props.notFoundUrl}
                        fixedLayoutPosition={props.fixedLayoutPosition}
                        domainUrl={props.domainUrl}
                        userEntity={props.userEntity}
                        isEnabledTabs={props.isEnabledTabs} router={props.router}>
                    </ContentPart>
                </Layout>

            </Layout>
        </div>
    )
}
export default ContainLayout
