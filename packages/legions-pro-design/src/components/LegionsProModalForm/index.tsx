/*
 * @Author: duanguang
 * @Date: 2021-02-01 22:24:42
 * @LastEditTime: 2021-03-05 15:54:53
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/LegionsProModalForm/index.tsx
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
import { Button,Col,Icon,Tabs } from 'antd';
import LegionsStoreForm from '../LegionsStoreForm';
import { bind,observer } from 'legions/store-react';
import React from 'react';
import { shortHash } from 'legions-lunar/object-hash';
import LegionsProForm from '../LegionsProForm';
import { IProFormFields,ITabsFormItem } from '../LegionsStoreForm/interface';
import { ClassOf } from 'legions-lunar/types/api/typescript';
import { IGroup,InstanceProForm } from '../LegionsProForm/interface';
import { TabPaneProps,TabsProps } from 'antd/lib/tabs';
import { Weaken } from '../interface';
import { InstanceLegionsModalForm } from './interface';
import { ValidateCallback } from 'antd/lib/form/Form';
import { ILegionsProModalProps,InstanceProModal } from '../LegionsProModal/interface';
import LegionsProModal from '../LegionsProModal'
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

    modalProps?: ILegionsProModalProps;
    onReady: (formRef?: InstanceLegionsModalForm<Model>) => void;

    size?: 'default' | 'small' | 'table';
    /**
     * 等分栅格 默认2
     *
     * @type {(1|2|3)}
     */
    colCount?: 1 | 2 | 3 | 4
}
/** 模态框表单
 * 业务场景主要通过弹窗放置表单信息
 */
@observer
export default class LegionsProModalForm<Model> extends React.Component<IProps<Model>> {

    timeId = new Date().getTime();
    formInstance: InstanceProForm = null;
    modalInstance: InstanceProModal = null;
    constructor(props) {
        super(props);

    }
    onVisibleChange = (value: boolean) => {
        const { modalProps = {},} = this.props;
        modalProps.onVisibleChange && modalProps.onVisibleChange(value);
    }
    render() {
        const { modalProps = {},controls,InputDataModel,group,size,colCount } = this.props;
        return <React.Fragment>
            <LegionsProModal
                 resizable
                 modalType="fullscreen"
                 placement="top"
                 draggable
                 {...modalProps}
                 onVisibleChange={this.onVisibleChange}
                 onReady={(value) => {
                     const width = 1120
                     this.modalInstance = value;
                     this.modalInstance.viewModel.width = width;
                     this.props.onReady && this.props.onReady({
                         formInstance: this.formInstance,
                         modalInstance: this.modalInstance
                     })
                 }}
                >
                <React.Fragment>
                        <LegionsProForm
                            size={size}
                            colCount={colCount}
                            InputDataModel={InputDataModel}
                            mapPropsToFields={(props: Model) => {
                                return new InputDataModel(props)
                            }}
                            onFieldsChange={(_,fields: Partial<Model>) => {
                                this.formInstance.store.updateFormInputData(this.formInstance.uid,fields)
                            }}
                            onReady={(_,formInstance?: InstanceProForm) => {
                                this.formInstance = { ...formInstance,that: this };
                                this.props.onReady && this.props.onReady({
                                    formInstance: this.formInstance,
                                    modalInstance: this.modalInstance
                                })
                            }}
                            group={group}
                            controls={controls}
                        />
                    </React.Fragment>
            </LegionsProModal>

        </React.Fragment>
    }
}