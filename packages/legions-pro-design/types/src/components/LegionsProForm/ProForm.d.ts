import React from 'react';
import CreateForm from './CreateForm';
import { LabelWithInputModel } from './FormInput';
import './style/index.less';
import { WrappedFormUtils } from '../interface/antd';
import { IErrorView, IGroup } from './interface/form';
import { LabelWithSelectModel, LabelWithRenderModel, LabelWithDatePickerModel, LabelWithMonthPickerModel, LabelWithRangePickerModel, LabelWithUploadModel, LabelWithInputNumberModel } from './interface';
import LegionsStoreForm from '../LegionsStoreForm';
import { IElementList, IProFormFields } from '../LegionsStoreForm/interface';
import { LabelWithSwitchModel } from './FormSwitch';
import { LabelWithRadioButtonModel } from './FormRadioButton';
import { LabelWithTextModel } from './FormText';
import { InstanceForm } from './interface/form';
import { LabelWithCheckboxModel } from './FormCheckbox';
import { BaseFormFields } from 'legions-lunar/model';
import { ProFormFields, ProFormUtils } from './ProFormUtils';
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
    InputDataModel: Function;
    store?: InstanceType<typeof LegionsStoreForm>;
    /** 初始化执行一次 */
    controls: Array<IProFormFields['componentModel']>;
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
    onReady: (
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
    onUpdateFormSize?: (size: 'default' | 'small' | 'table') => void;
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
export declare class LegionsProForm<mapProps = {}> extends React.Component<IProFormProps<mapProps>> {
    static CreateForm: typeof CreateForm;
    static ProFormUtils: typeof ProFormUtils;
    static LabelWithInputNumberModel: typeof LabelWithInputNumberModel;
    static LabelWithSelectModel: typeof LabelWithSelectModel;
    static LabelWithRenderModel: typeof LabelWithRenderModel;
    static LabelWithDatePickerModel: typeof LabelWithDatePickerModel;
    static LabelWithMonthPickerModel: typeof LabelWithMonthPickerModel;
    static LabelWithRangePickerModel: typeof LabelWithRangePickerModel;
    static LabelWithUploadModel: typeof LabelWithUploadModel;
    static LabelWithSwitchModel: typeof LabelWithSwitchModel;
    static LabelWithRadioButtonModel: typeof LabelWithRadioButtonModel;
    static LabelWithTextModel: typeof LabelWithTextModel;
    static LabelWithInputModel: typeof LabelWithInputModel;
    static BaseFormFields: typeof BaseFormFields;
    static ProFormFields: typeof ProFormFields;
    /** 根据时间戳生成，每次初始化表单组件都会产生新的值*/
    uid: string;
    timeId: number;
    /** uid 的值绝对唯一，且每次初始生成表单都是相同值 */
    freezeUid: string;
    /** 未加密的freezeUid 值 */
    decryptionFreezeUid: string;
    constructor(props: any);
    get storeView(): import("brain-store-utils").ViewModel<import("../LegionsStoreForm/proFormStore").HlFormView> & {
        elementList: import("../LegionsStoreForm/interface").IObservableMap<string, IElementList>;
        focusUid: string;
        enableEnterSwitch: boolean;
        renderNodeQueue: import("../LegionsStoreForm/interface").IObservableMap<string, string>;
        errorReactNodeList: import("../LegionsStoreForm/interface").IObservableMap<string, import("brain-store-utils").ViewModel<import("../LegionsStoreForm/proFormStore").ErrorViewModel> & {
            uid: string;
            validateStatus: "" | "error";
        }>;
        errorListView: import("../LegionsStoreForm/interface").IObservableMap<string, IErrorView[]>;
        readonly computedErrorReactNodeList: import("../LegionsStoreForm/interface").IObservableMap<string, import("brain-store-utils").ViewModel<import("../LegionsStoreForm/proFormStore").ErrorViewModel> & {
            uid: string;
            validateStatus: "" | "error";
        }>;
        readonly computedAllElementList: string[];
        readonly computedFormFields: (LabelWithInputModel | LabelWithInputNumberModel | LabelWithDatePickerModel | LabelWithMonthPickerModel | LabelWithRangePickerModel | LabelWithUploadModel | LabelWithSwitchModel | LabelWithRadioButtonModel | LabelWithTextModel | LabelWithSelectModel | LabelWithCheckboxModel)[];
        readonly computedAllFormFields: (LabelWithInputModel | LabelWithInputNumberModel | LabelWithDatePickerModel | LabelWithMonthPickerModel | LabelWithRangePickerModel | LabelWithUploadModel | LabelWithSwitchModel | LabelWithRadioButtonModel | LabelWithTextModel | LabelWithSelectModel | LabelWithCheckboxModel)[];
        readonly computedErrorListView: IErrorView[];
        readonly computedFormSize: "small" | "table" | "default";
        updateFormSize: (size: "small" | "table" | "default") => void;
        collectErrorReactNode: (componentCode: string, errorUid: string) => void;
        setErrorErrorReactNodeList: (componentCode: string, errorListView: IErrorView[]) => void;
        handleIgnore: (componentCode: string, id: number) => void;
        addAllElementKeys: (keys: string) => void;
        getFormItemField: (key: string) => {
            value: LabelWithInputModel | LabelWithInputNumberModel | LabelWithDatePickerModel | LabelWithMonthPickerModel | LabelWithRangePickerModel | LabelWithUploadModel | LabelWithSwitchModel | LabelWithRadioButtonModel | LabelWithTextModel | LabelWithSelectModel | LabelWithCheckboxModel;
            type: "normal" | "custom";
        };
        _initFormItemField: (key: string, value: LabelWithInputModel | LabelWithInputNumberModel | LabelWithDatePickerModel | LabelWithMonthPickerModel | LabelWithRangePickerModel | LabelWithUploadModel | LabelWithSwitchModel | LabelWithRadioButtonModel | LabelWithTextModel | LabelWithSelectModel | LabelWithCheckboxModel, type?: "normal" | "custom") => void;
    } & import("../LegionsStoreForm/proFormStore").IOtherView;
    render(): JSX.Element;
}
