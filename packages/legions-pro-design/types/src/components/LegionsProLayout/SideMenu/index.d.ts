import React from 'react';
import { SelectParam, ClickParam } from 'antd/lib/menu';
import '../style/memu.less';
import LegionsCrossModule from '../../LegionsCrossModule';
import { TypeMenuBaseModel } from '../model';
import { legionsProLayoutProps } from '../interface';
export default class MenuParts extends React.Component<legionsProLayoutProps['menuParts']> {
    masterGlobalStateStore: InstanceType<typeof LegionsCrossModule.MasterGlobalStateStore>;
    constructor(props: any);
    static defaultProps: {
        fixedLayoutPosition: string;
        router: any[];
    };
    componentDidMount(): void;
    componentWillUnmount(): void;
    addListenerPopstate(): void;
    removeListenerPopstate(): void;
    listenerPopState(evt: PopStateEvent): void;
    initGlobalVariableValue(): void;
    /** 在did mount 生命周期内设置菜单展开项数据 */
    setOpenKesInDidMountcycle(): void;
    /** 在打开菜单页面路由时，获取菜单完毕时，打开菜单页签 */
    onPageloadedOpenTabpane(menuList: TypeMenuBaseModel[]): void;
    renderFirstMenuItemElement(item: TypeMenuBaseModel): JSX.Element;
    renderFirstSubMenuELement(item: TypeMenuBaseModel): JSX.Element;
    /** 渲染末级菜单选项 */
    renderMenuItemElement(item: TypeMenuBaseModel): JSX.Element;
    renderSubMenuElement(item: TypeMenuBaseModel): JSX.Element;
    /** 递归调用不断遍历所有菜单，并按照顺序渲染相应层级菜单 */
    renderRecursiveCallsMenu(list: Array<TypeMenuBaseModel>, isFirst?: boolean): JSX.Element[];
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
     */
    onSelect(selected: SelectParam): void;
    /** 点击 MenuItem 调用此函数 */
    onClick: (selected: ClickParam) => void;
    /**
     * SubMenu 展开/关闭的回调
     *
     * @param openKeys
     */
    onOpenChange(openKeys: string[]): void;
    /** 菜单展开及收起 */
    handleToggle: () => void;
    render(): JSX.Element;
}
