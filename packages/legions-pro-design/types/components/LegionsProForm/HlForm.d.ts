import React from 'react';
import './style/index.less';
import { WrappedFormUtils } from '../interface/antd';
import { IErrorView } from './interface/form';
import { ProFormStore } from '../store/pro.form';
import { InstanceForm } from './interface/form';
export interface IProFormProps<mapProps = {}> {
    form?: WrappedFormUtils;
    /**
     * 表单输入数据模型
     * 数据模型class 实例
     * 注意 使用此模式，由于数据时动态生成，当被改变时，组件无法作出反应，请在调用组件实例定义@observable xxx来接收
     * 并在调用updateFormInputData进行更新时，传入此变量
     * @type {Object}
     * @memberof IHLFormProps
     */
    InputDataModel?: Function;
    store?: ProFormStore;
    controls: Array<any>;
    group?: Array<IGroup>;
    /**
     * 等分栅格 默认2
     *
     * @type {(1|2|3)}
     * @memberof IHLFormProps
     */
    colCount?: 1 | 2 | 3 | 4;
    /**
     *把父组件的属性映射到表单项上（可用于把 Redux store 中的值读出）
     *
     * @memberof IProps
     */
    mapPropsToFields: (props: mapProps) => any;
    /**
     * 当 Form.Item 子节点的值发生改变时触发，可以把对应的值转存到 mobx store or redux store
     *
     * @memberof IHLFormProps
     */
    onFieldsChange: (props: mapProps, fields: any) => void;
    /**
     *任一表单域的值发生改变时的回调
     *
     * @memberof IHLFormProps
     */
    onValuesChange?: (props: any, values: any) => void;
    /**
     * 获取表单数据模型
     * form  即将废弃，请formRef.viewModel.form 获取
     *
     * @memberof IHLFormProps
     */
    onGetForm?: (
    /**即将废弃，请formRef.viewModel.form 获取 */
    form: WrappedFormUtils, formRef?: InstanceForm) => void;
    size?: 'default' | 'small' | 'table';
    /**
     *
     * 忽略错误信息触发
     * @memberof IHLFormProps
     */
    onIgnoreError?: (item: IErrorView) => void;
    /**
     * 改变表单主题风格时触发
     *
     * @memberof IHLFormProps
     */
    onUpdateStyleSize?: (size: 'default' | 'small' | 'table') => void;
    /**
     * 主要用于当父组件中存在多个表单组件时，标记key 来保证父级组件中表单组件唯一
     * 注意，建议一定传递
     * @type {string}
     * @memberof IProps
     */
    uniqueKeys?: string;
    isDragSort?: boolean;
    onLogRecord?: (params: {
        modulesPath?: string;
        type: string;
        content: string;
        modulesName?: string;
        userInfo: string;
        traceId: string;
        browserEnvironment: string;
    }) => void;
}
export interface IGroup {
    /**
     * 分组名称
     *
     * @type {string}
     * @memberof IGroup
     */
    name: string | React.ReactNode;
    /**
     * 分组唯一标识ID
     *
     * @type {string}
     * @memberof IGroup
     */
    id: number;
    active: boolean;
    /**
     * 分组是否折叠
     *
     * @type {boolean}
     * @memberof IGroup
     */
    isFolding: boolean;
    className?: string;
    /**
     * 标题行是否显示设置主题风格图标 默认不显示 true 显示
     *
     * @type {boolean}
     * @memberof IGroup
     */
    isShowFormSizeIcon?: boolean;
}
export declare function LegionsProForm<mapProps = {}>(props: IProFormProps<mapProps>): JSX.Element;
export declare namespace LegionsProForm {
    var CreateForm: typeof import("./CreateForm").default;
    var ProFormUtils: typeof import("./ProFormUtils").ProFormUtils;
    var LabelWithInputNumberModel: typeof import("./FormInputNumber").LabelWithInputNumberModel;
    var LabelWithSelectModel: typeof import("./FormSelect").LabelWithSelectModel;
    var LabelWithHLSelectModel: typeof import("./interface").LabelWithHLSelectModel;
    var LabelWithRenderModel: typeof import("./FormRender").LabelWithRenderModel;
    var LabelWithDatePickerModel: typeof import("./FormDatePicker").LabelWithDatePickerModel;
    var LabelWithMonthPickerModel: typeof import("./FormMonthPicker").LabelWithMonthPickerModel;
    var LabelWithRangePickerModel: typeof import("./FormRangePicker").LabelWithRangePickerModel;
    var LabelWithUploadModel: typeof import("./FormUpload").LabelWithUploadModel;
    var LabelWithSwitchModel: typeof import("./FormSwitch").LabelWithSwitchModel;
    var LabelWithRadioButtonModel: typeof import("./FormRadioButton").LabelWithRadioButtonModel;
    var LabelWithTextModel: typeof import("./FormText").LabelWithTextModel;
    var LabelWithInputModel: typeof import("./FormInput").LabelWithInputModel;
}
