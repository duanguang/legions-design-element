import LegionsStoreForm from '../LegionsStoreForm';
import React from 'react';
import { IProFormFields } from '../LegionsStoreForm/interface';
import { ClassOf } from 'legions-lunar/types/api/typescript';
import { IGroup } from '../LegionsProForm/interface';
import { TabPaneProps, TabsProps } from 'antd/lib/tabs';
import { Weaken } from '../interface';
import { InstanceTabsForm } from './interface';
import { TabsItemView } from '../LegionsStoreForm/tabsView';
interface IProps<Model> {
    store?: InstanceType<typeof LegionsStoreForm>;
    /**
     * 主要用于当父组件中存在多个表单组件时，标记key 来保证父级组件中表单组件唯一
     * 注意，建议一定传递
     * @type {string}
     * @memberof IProps
     */
    uniqueKeys?: string;
    /**
     * 表单输入数据模型
     * 数据模型class 实例
     * 注意 使用此模式，由于数据时动态生成，当被改变时，组件无法作出反应，请在调用组件实例定义@observable xxx来接收
     * 并在调用updateFormInputData进行更新时，传入此变量
     * @type {Object}
     * @memberof IHLFormProps
     */
    InputDataModel: ClassOf<Model>;
    /** 初始化执行一次 */
    controls: Array<IProFormFields['componentModel']>;
    group?: Array<IGroup>;
    tabsProps?: TabsProps;
    tabPaneProps?: ITabPaneProps;
    onReady: (formRef?: InstanceTabsForm<Model>) => void;
    /**
     * 添加页签项成功后触发回调钩子
     *@param {uid} 添加页签项唯一key
     * @memberof IProps
     */
    onTabAdd?: (uid: string) => void;
    /** 页签项执行渲染前的钩子函数 */
    onBeforeTabPaneRender?: (key: string) => void;
    size?: 'default' | 'small' | 'table';
    /**
     * 等分栅格 默认2
     *
     * @type {(1|2|3)}
     */
    colCount?: 1 | 2 | 3 | 4;
}
interface ITabPaneProps extends TabPaneProps, Weaken<TabPaneProps, 'tab'> {
    tab: (key: string, index: number) => React.ReactNode;
}
/** 动态表单
 * 业务场景主要在页签方式创建多个表单
 */
export default class LegionsProTabsForm<Model> extends React.Component<IProps<Model>> {
    /** uid 的值绝对唯一，且每次初始生成表单都是相同值 */
    freezeUid: string;
    /** 未加密的freezeUid 值 */
    decryptionFreezeUid: string;
    timeId: number;
    constructor(props: any);
    get storeView(): import("brain-store-utils/types/create-view-model").ViewModel<import("../LegionsStoreForm/tabsView").TabsFormView> & {
        activeTabKey: string;
        readonly _computedTabs: TabsItemView[];
        readonly size: number;
        readonly entries: IterableIterator<import("mobx").IMapEntry<string, TabsItemView>>;
        getTabs: (key: string) => TabsItemView;
        hasTabs: (key: string) => boolean;
        getTabsKeys: () => IterableIterator<string>;
        clearTabs: () => void;
        delTabsMap: (key: string) => void;
        _addTabsMap: (options?: {
            isSwitchTabKey: boolean;
            key?: string;
            callback?: () => void;
        }) => string;
    };
    componentWillMount(): void;
    /** 验证表单
     *
     * 如果有错误信息则返回true,否则返回false
     */
    validateFields(): boolean;
    renderForm(key: string, tab: TabsItemView): JSX.Element;
    handleTabChange: (activeKey: string) => void;
    /** 删除tab页 */
    handleTabDelete: (targetKey: string, action: any) => void;
    /** 增加tab页 */
    handleTabAdd: () => void;
    render(): JSX.Element;
}
export {};
