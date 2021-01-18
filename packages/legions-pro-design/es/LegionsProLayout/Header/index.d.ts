import React from 'react';
import { MenuStore } from '../../store/pro.layout';
import { InstanceLegionsProModal } from '../../LegionsProModal/interface';
import { InstanceProTable } from '../../LegionsProTable/interface';
interface IProps {
    store?: MenuStore;
    userName: string;
    companyName: string;
    onLoginOut: () => void;
    /** 删除异步任务 */
    onExportTaskDelete?: (id: string) => any;
    /**
     * 修改密码功能信息
     *
     * @memberof IProps
     */
    password?: {
        /**
         * 提交事件函数
         *
         */
        onSubmit: (value: {
            /**
             * 关闭弹窗
             *
             */
            onClose: () => void;
        }) => void;
        componentNode?: React.ReactNode;
        footer?: React.ReactNode;
        onReady?: (instance: InstanceLegionsProModal) => void;
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
    /** 模态框内容区展示组件类型 */
    modalContentType: 'updatePass' | 'readTaskList' | '';
    modalRef: InstanceLegionsProModal;
    taskCenterTableRef: InstanceProTable;
    constructor(props: any);
    static defaultProps: {
        fixedLayoutPosition: string;
    };
    /** 渲染皮肤方案切换节点 */
    renderSkinsElement(): JSX.Element;
    renderDropdown(): JSX.Element;
    renderTaskCenterElement(): JSX.Element;
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
    renderModalElement(): JSX.Element;
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
    onClose: () => void;
    render(): JSX.Element;
}
export {};
