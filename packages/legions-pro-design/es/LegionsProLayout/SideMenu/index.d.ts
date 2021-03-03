import React from 'react';
import LegionsStoreLayout from '../../LegionsStoreLayout';
import LegionsModels from '../../LegionsModels';
import { SelectParam, MenuProps, ClickParam } from 'antd/lib/menu';
import '../style/memu.less';
import LegionsCore from '../../LegionsCore';
import { IRouter } from '../../interface/router';
import { IUserInfo } from '../../interface';
interface IProps extends IUserInfo, MenuProps {
    store?: InstanceType<typeof LegionsStoreLayout.MenuStore>;
    logo: string;
    onQueryPromiseMenus: () => Promise<InstanceType<typeof LegionsModels.MenuContainerEntity>>;
    /** 外部链接跳转，打开指定菜单 */
    defaultOpenMenuTabs?: {
        /** 指定菜单Key */
        meunKey?: string;
        /** 打开菜单地址栏参数 */
        params?: string;
    };
    domainUrl?: string;
    router: Array<IRouter>;
    defaultOpenKeys?: string[];
    onLogoClick?: () => void;
    /** 布局布局位置
     *  fixedSider 主要为了兼容历史固定侧边方案  过渡性方案
     */
    fixedLayoutPosition?: 'fixedSider' | 'fixedSiderHeader';
    /** 在菜单数据接口请求完成后，如果需要对菜单数据项进行自定义加工，可传入此函数 */
    loadedMenuTransformData?: (menuList: InstanceType<typeof LegionsModels.MenuEntity>[]) => void;
}
export default class MenuParts extends React.Component<IProps> {
    masterGlobalStateStore: InstanceType<typeof LegionsCore.MasterGlobalStateStore>;
    constructor(props: any);
    static defaultProps: {
        fixedLayoutPosition: string;
        router: any[];
    };
    componentDidMount(): void;
    initGlobalVariableValue(): void;
    /** 在did mount 生命周期内设置菜单展开项数据 */
    setOpenKesInDidMountcycle(): void;
    /** 在打开菜单页面路由时，获取菜单完毕时，打开菜单页签 */
    onPageloadedOpenTabpane(menuList: InstanceType<typeof LegionsModels.MenuEntity>[]): void;
    renderFirstMenuItemElement(item: InstanceType<typeof LegionsModels.MenuEntity>): JSX.Element;
    renderFirstSubMenuELement(item: InstanceType<typeof LegionsModels.MenuEntity>): JSX.Element;
    /** 渲染末级菜单选项 */
    renderMenuItemElement(item: InstanceType<typeof LegionsModels.MenuEntity>): JSX.Element;
    renderSubMenuElement(item: InstanceType<typeof LegionsModels.MenuEntity>): JSX.Element;
    /** 递归调用不断遍历所有菜单，并按照顺序渲染相应层级菜单 */
    renderRecursiveCallsMenu(list: Array<InstanceType<typeof LegionsModels.MenuEntity>>, isFirst?: boolean): JSX.Element[];
    /** 渲染Logo节点 */
    renderLogoElement(): JSX.Element;
    renderMenuNodesElement(): JSX.Element;
    renderSiderElement(): JSX.Element;
    computedMenuParentElementStyles(): React.CSSProperties;
    /** 计算在固定侧边菜单栏区域占位节点样式信息 */
    computedMenuPlaceholderNodesStyles(): React.CSSProperties;
    computedMenuPlaceholderNodesClass(): string;
    /**
     * 被选中时调用
     *
     * @param {any} selected { item:'Menu.Item组件实例', key:'菜单序号', selectedKeys：‘当前选中的菜单项 key 数组’ }
     * @memberof MenuPart
     */
    onSelect(selected: SelectParam): void;
    /** 点击 MenuItem 调用此函数 */
    onClick: (selected: ClickParam) => void;
    /**
     * SubMenu 展开/关闭的回调
     *
     * @param {any} openKeys string[]
     * @memberof MenuPart
     */
    onOpenChange(openKeys: string[]): void;
    /** 菜单展开及收起 */
    handleToggle: () => void;
    render(): JSX.Element;
}
export {};
