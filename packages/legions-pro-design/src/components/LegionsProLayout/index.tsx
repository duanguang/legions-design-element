import React from 'react'
import { Layout } from 'antd';
import ContentPart from './content';
import MenuParts from './SideMenu';
import HeaderPart from './Header';
import { MenuBaseModel, MenuModel,BaseModel } from './model';
import {legionsProLayoutProps} from './interface'
import LegionsStoreLayout from './store';
import './style/index.less'
const baseCls = 'legions-pro-layout'

const theme = {
    dark: '0',
    lightBlue: '1',
    blue:'3',
}
const LegionsProLayout = (props: legionsProLayoutProps['main']) => {
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
                    defaultOpenMenuTabs={props.defaultOpenMenuTabs}
                    loadedMenuTransformData={props.loadedMenuTransformData}
                    onQueryPromiseMenus={props.onQueryPromiseMenus}
                    logo={props.logo}
                    onLogoClick={props.onLogoClick}></MenuParts>

                <Layout>
                    {(props.isShowHeader === void 0 || props.isShowHeader) && <HeaderPart
                        onLoginOut={props.onLoginOut}
                        fixedLayoutPosition={props.fixedLayoutPosition}
                        userEntity={props.userEntity}
                        sysSettingDropdown={props.sysSettingDropdown}
                        header={props.header}
                        skin={theme[props.theme] || '0'}
                        isReCustomHeader={props.isReCustomHeader}
                    ></HeaderPart>}
                    <ContentPart
                        notFoundUrl={props.notFoundUrl}
                        fixedLayoutPosition={props.fixedLayoutPosition}
                        domainUrl={props.domainUrl}
                        userEntity={props.userEntity}
                        isEnabledTabs={props.isEnabledTabs} router={props.router||[]}>
                    </ContentPart>
                </Layout>

            </Layout>
        </div>
    )
}
LegionsProLayout['MenuModel'] = MenuModel
LegionsProLayout['MenuBaseModel'] = MenuBaseModel
LegionsProLayout['BaseModel'] = BaseModel
LegionsProLayout['LegionsStoreLayout']=LegionsStoreLayout
export default LegionsProLayout
