import React from 'react';
import { legionsProLayoutProps } from '../interface';
export default class HeaderPart extends React.Component<legionsProLayoutProps['headerPart']> {
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
