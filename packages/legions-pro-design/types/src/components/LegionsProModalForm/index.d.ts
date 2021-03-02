import { ProFormStore } from '../store/pro.form';
import React from 'react';
import { IProFormFields } from '../store/pro.form/interface';
import { ClassOf } from 'legions-lunar/types/api/typescript';
import { IGroup, InstanceForm } from '../LegionsProForm/interface';
import { InstanceLegionsModalForm } from './interface';
import { ILegionsProModalProps, InstanceLegionsProModal } from '../LegionsProModal/interface';
interface IProps<Model> {
    store?: ProFormStore;
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
    colCount?: 1 | 2 | 3 | 4;
}
/** 模态框表单
 * 业务场景主要通过弹窗放置表单信息
 */
export default class LegionsProModalForm<Model> extends React.Component<IProps<Model>> {
    timeId: number;
    formInstance: InstanceForm;
    modalInstance: InstanceLegionsProModal;
    constructor(props: any);
    onVisibleChange: (value: boolean) => void;
    render(): JSX.Element;
}
export {};
