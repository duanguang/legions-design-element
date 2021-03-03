import React from 'react';
import LegionsStoreLayout from '../../LegionsStoreLayout';
import { IUserInfo } from '../../interface';
interface IProps extends IUserInfo {
    store?: InstanceType<typeof LegionsStoreLayout.MenuStore>;
    onLoginOut: () => void;
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
    /**在插入自定义header信息 */
    header?: React.ReactNode;
    skin?: string;
    /** false 表示props.header 自定义部分头部信息
     *
     * 如果为 true 则props.header 自定义全部header 信息 完全个性化
     */
    isReCustomHeader?: boolean;
    /** 布局布局位置
     *  fixedSider 主要为了兼容历史固定侧边方案  过渡性方案
     */
    fixedLayoutPosition?: 'fixedSider' | 'fixedSiderHeader';
}
export default class HeaderPart extends React.Component<IProps> {
    constructor(props: any);
    static defaultProps: {
        fixedLayoutPosition: string;
    };
    /** 渲染皮肤方案切换节点 */
    renderSkinsElement(): JSX.Element;
    renderDropdown(): JSX.Element;
    /** 渲染系统设置节点 */
    renderSystemSettingElement(): JSX.Element;
    renderUserInfoElement(): JSX.Element;
    /** 在用户信息节点之后插入自定义header信息 */
    renderInsertRightHeaderElement(): JSX.Element;
    /** 渲染搜索菜单直接打开菜单页签 */
    renderSearchDirectMenuElement(): JSX.Element;
    /** 渲染菜单展开折叠ICON 节点 */
    renderMenuToggleIconElement(): JSX.Element;
    renderBreadcrumbElement(): JSX.Element;
    renderHeaderElement(): JSX.Element;
    /** 计算header 标签样式信息  */
    computedHeaderClassName(): string;
    /** 计算header 标签 style 样式信息 */
    computedHeaderStyles(): React.CSSProperties;
    handleClick(value: {
        key: string;
        keyPath: Array<string>;
    }): void;
    handleToggle(): void;
    handleChange(value: {
        key: string;
        label: string;
    }): void;
    render(): JSX.Element;
}
export {};
