/*
 * @Author: duanguang
 * @Date: 2021-01-28 15:58:15
 * @LastEditTime: 2021-03-09 10:33:48
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/LegionsProTabsForm/index.tsx
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
import { Button,Col,Icon,Tabs } from 'antd';
import LegionsStoreForm from '../LegionsStoreForm';
import { bind,observer } from 'legions/store-react';
import React from 'react';
import { shortHash } from 'legions-lunar/object-hash';
import LegionsProForm from '../LegionsProForm';
import { IProFormFields, IProTabsFormAddTabsMap, ITabsFormItem } from '../LegionsStoreForm/interface';
import { ClassOf } from 'legions-lunar/types/api/typescript';
import { IGroup,InstanceProForm } from '../LegionsProForm/interface';
import { TabPaneProps, TabsProps } from 'antd/lib/tabs';
import { Weaken } from '../interface';
import { InstanceTabsForm } from './interface';
import { ValidateCallback } from 'antd/lib/form/Form';
import { TabsItemView } from '../LegionsStoreForm/tabsView';
import invariant from 'invariant';
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
    colCount?: 1 | 2 | 3 | 4
}
interface ITabPaneProps extends TabPaneProps,Weaken<TabPaneProps,'tab'> {
    tab: (key: string,index: number) => React.ReactNode;
}
/** 动态表单
 * 业务场景主要在页签方式创建多个表单
 */
@bind({ store: LegionsStoreForm })
@observer
export default class LegionsProTabsForm<Model> extends React.Component<IProps<Model>> {
    /** uid 的值绝对唯一，且每次初始生成表单都是相同值 */
    freezeUid = ''

    /** 未加密的freezeUid 值 */
    decryptionFreezeUid = ''
    timeId = new Date().getTime()
    constructor(props) {
        super(props);
        const keys = 'uniqueUid';
        invariant(this.props[keys],`[LegionsProTabsForm]:props.${keys} cannot be empty`);
        if (this.props[keys]) {
            this.decryptionFreezeUid = `${this.props[keys]}${this.props.uniqueKeys || ''}${process.env.environment === 'production' ? 'production' : ''}`;
            this.freezeUid = `tabsform${shortHash(this.decryptionFreezeUid)}`;
        }
        else {
            console.error('props.uniqueUid Can not be empty');
            this.timeId = new Date().getTime()
            this.freezeUid = `tabsform${this.props.store._TabsFormDataMap.size}${shortHash(`${this.timeId}${this.props.store._TabsFormDataMap.size}`)}`;
        }

        if (!this.props.store._TabsFormDataMap.has(this.freezeUid)) {
            this.props.store.addTabsForm(this.freezeUid)
        }
    }
    get storeView() {
        return this.props.store._TabsFormDataMap.get(this.freezeUid)
    }
    componentWillMount() {
        this.props.onReady && this.props.onReady({
            viewModel: this.storeView,
            freezeUid: this.freezeUid,
            decryptionFreezeUid: this.decryptionFreezeUid,
            methods: {
                validateFields: () => {
                    /*   */
                    return this.validateFields();
                },
                submit: (callback?) => {
                    if (!this.validateFields()) {
                        const values:Array<ITabsFormItem> =[]
                        for (let item of this.storeView.entries) {
                            const key = item[0]
                            const value={key,tabsItemView:item[1]}
                            values.push(value)
                        }
                        const model: Model[] = [];
                        
                        values.map((item) => {
                            //@ts-ignore
                            model.push(item.tabsItemView.formInstance.viewModel.InputDataModel)
                        })
                        callback&&callback(model);
                    }
                },
                onTabAdd: (options?:IProTabsFormAddTabsMap['options']) => {
                    const uid = this.storeView._addTabsMap(options);
                    this.props.onTabAdd && this.props.onTabAdd(uid);
                    return uid;
                },
                getFormFields: (key: string) => {
                    const item = this.storeView.getTabs(key);
                    if (item) {
                        return item.formInstance.viewModel.InputDataModel as Model;
                    }
                    return null;
                }
            }
        })
    }
    /** 验证表单
     * 
     * 如果有错误信息则返回true,否则返回false
     */
    validateFields() {
        const values:Array<ITabsFormItem> =[]
        for (let item of this.storeView.entries) {
            const key = item[0]
            const value={key,tabsItemView:item[1]}
            values.push(value)
        }
        const tabsHasError = values.map((item, index) => {
            let res: ValidateCallback = null;
            item.tabsItemView.formInstance.viewModel.form.validateFields((errors) => {
                res = errors
            })
            return res
        }).some((item) => item)
        this.forceUpdate();
        return tabsHasError;
    }
    renderForm(key: string,tab:TabsItemView) {
        const { controls,InputDataModel,group,size,colCount } = this.props;
        return <LegionsProForm
            size={size}
            colCount={colCount}
            InputDataModel={InputDataModel}
            mapPropsToFields={(props: Model) => {
                if (tab && tab.formInstance) {
                    return new InputDataModel(tab.formInstance.viewModel.InputDataModel) 
                }
                return new InputDataModel(props)
            }}
            onFieldsChange={(_,fields: Partial<Model>) => {
                tab.formInstance.store.updateFormInputData(tab.formInstance.uid,fields)
                
            }}
            onReady={(_,formInstance?: InstanceProForm) => {
                tab.formInstance = { ...formInstance,that: this };
            }}
            uniqueKeys={key}
            key={key}
            group={group}
            controls={controls}
        />
    }
    handleTabChange = (activeKey: string) => {
        const { tabsProps = {} } = this.props;
        this.storeView.activeTabKey = activeKey
        tabsProps.onChange && tabsProps.onChange(activeKey);
    }
    /** 删除tab页 */
    handleTabDelete = (targetKey: string,action:any) => {
        const { size,activeTabKey } = this.storeView;
        const { tabsProps = {} } = this.props;
        /** 至少剩下一个页签 */
        if (size === 1) return
        /** 删除页签的同时删除map中对应的项 */
        this.storeView.delTabsMap(targetKey)
        /** 处理删除页签后的高亮定位问题 */
        if (!this.storeView.getTabs(activeTabKey)) {
            const keys: string[] = []
            for (let item of this.storeView.getTabsKeys()) {
                keys.push(item);
            }
            this.storeView.activeTabKey = keys[0]
        }
        tabsProps.onEdit && tabsProps.onEdit(targetKey,action);
    }
    /** 增加tab页 */
    handleTabAdd = () => {
        /** 新增页签 */
        const uid = this.storeView._addTabsMap();
        const { onTabAdd } = this.props;
        onTabAdd && onTabAdd(uid);
    }
    render() {
        const { tabsProps = {},tabPaneProps = {} as ITabPaneProps,onBeforeTabPaneRender } = this.props;
        console.log(this.storeView.activeTabKey,'this.storeView.activeTabKey');
        return <React.Fragment>
            <Tabs
                hideAdd
                type="editable-card"
                animated
                tabBarExtraContent={
                    <Button
                        icon="plus"
                        type="primary"
                        onClick={this.handleTabAdd}
                    >添加</Button>
                }
                {...tabsProps}
                onChange={this.handleTabChange}
                onEdit={this.handleTabDelete}
                activeKey={this.storeView.activeTabKey}
            >
                {
                    this.storeView._computedTabs.map((item,index,arr) => {
                        const ErrorList = item.formInstance && item.formInstance.viewModel.form.getFieldsError() || []
                        /** 根据表单中的错误信息动态显示tab标签背景颜色 */
                        const tabHasError = Object.values(ErrorList).some((i) => i);
                        onBeforeTabPaneRender&&onBeforeTabPaneRender(item.keys)
                        return <Tabs.TabPane
                            {...tabPaneProps}
                            {...item.computedStyle}
                            {...item.computedClassName}
                            {...item.computedClosable}
                            {...item.computedDisabled}
                            forceRender
                            tab={<React.Fragment >
                                <Col data-key={item.keys} span={19}>{tabPaneProps.tab?tabPaneProps.tab(item.keys,index):`页签${index+1}`}</Col>
                                <Col span={3}>{tabHasError && <Icon style={{ color: '#ff0000' }} type="exclamation-circle" />}</Col>
                                <Col span={2}></Col>
                            </React.Fragment>
                            }
                            key={item.keys}
                            data-key={item.keys}
                        >
                            {this.renderForm(item.keys,item)}
                        </Tabs.TabPane>
                    })
                }
            </Tabs>
        </React.Fragment>
    }
}