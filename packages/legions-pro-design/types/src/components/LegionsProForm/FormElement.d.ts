import React from 'react';
import { WrappedFormUtils } from '../interface/antd';
import { InstanceFormElement } from './interface/formElement';
import LegionsStoreForm from '../LegionsStoreForm';
import { LabelWithSelectModel } from './interface/select';
export interface IFormElementProps {
    form: WrappedFormUtils;
    elementKey: string;
    /**
     * 表单生成的唯一uid，做回车切换时，可以把需要进行切换的组件都存储到此表单UID的HASH列表中，回车切换时会在hash列表中找寻组件
     *
     * @type {string}
     * @memberof IFormWithInputProps
     */
    formUid: string;
    store?: InstanceType<typeof LegionsStoreForm>;
    /**
     * 组件类型
     *
     * @type {('input'|'textarea'|'button')}
     * @memberof IFormElementProps
     */
    elType?: 'input' | 'textarea' | 'button' | 'span' | '';
    /**
     * 此方法会抛回组件一些关键信息到上层组件
     *
     * @memberof IFormElementProps
     */
    onReady?: (instance: InstanceFormElement) => void;
    /**
     * 回车，下键触发时指定一个元素聚焦,如果不填写，默认就是下一个
     *
     * @type {string}
     * @memberof IFormElementProps
     */
    nextElementKey?: string | {
        formUid: string;
        nextElementKey: string;
    };
}
/**
 * 如果元素需要回车，或者上下键切换焦点，则一定要用此组件包裹
 *
 * @export
 * @class FormElement
 * @extends {AbstractForm<IFormElementProps>}
 */
export default class FormElement extends React.Component<IFormElementProps, {}> {
    static defaultProps: {
        elType: string;
        nextElementKey: string;
    };
    timeId: number;
    uid: string;
    constructor(props: any);
    /**  注册元素键盘行为代理事件*/
    onLoadingKeyDown: Function;
    /**  处理重复注册代理事件行为，已经注册过的代理事件,不重复注册*/
    onkeyDownProxy: () => () => void;
    componentWillMount(): void;
    get formStore(): import("brain-store-utils/types/create-view-model").ViewModel<import("../LegionsStoreForm/proFormStore").HlFormView> & {
        _elementList: import("../LegionsStoreForm/interface").IObservableMap<string, import("../LegionsStoreForm/interface").IElementList>;
        focusUid: string;
        enableEnterSwitch: boolean;
        renderNodeQueue: import("../LegionsStoreForm/interface").IObservableMap<string, string>;
        _errorListView: import("../LegionsStoreForm/interface").IObservableMap<string, import("./interface").IErrorView[]>;
        readonly computedAllElementList: string[];
        readonly computedFormFields: (import("./FormInput").LabelWithInputModel | import("./FormInputNumber").LabelWithInputNumberModel | LabelWithSelectModel | import("./FormDatePicker").LabelWithDatePickerModel | import("./FormMonthPicker").LabelWithMonthPickerModel | import("./FormRangePicker").LabelWithRangePickerModel | import("./FormUpload").LabelWithUploadModel | import("./FormSwitch").LabelWithSwitchModel | import("./FormRadioButton").LabelWithRadioButtonModel | import("./FormText").LabelWithTextModel | import("./FormCascader").LabelWithCascaderModel | import("./FormCheckbox").LabelWithCheckboxModel)[];
        readonly computedAllFormFields: (import("./FormInput").LabelWithInputModel | import("./FormInputNumber").LabelWithInputNumberModel | LabelWithSelectModel | import("./FormDatePicker").LabelWithDatePickerModel | import("./FormMonthPicker").LabelWithMonthPickerModel | import("./FormRangePicker").LabelWithRangePickerModel | import("./FormUpload").LabelWithUploadModel | import("./FormSwitch").LabelWithSwitchModel | import("./FormRadioButton").LabelWithRadioButtonModel | import("./FormText").LabelWithTextModel | import("./FormCascader").LabelWithCascaderModel | import("./FormCheckbox").LabelWithCheckboxModel)[];
        readonly computedFormSize: "small" | "table" | "default";
        updateFormSize: (size: "small" | "table" | "default") => void;
        _addAllElementKeys: (keys: string) => void;
        getFormItemField: <T extends import("./FormInput").LabelWithInputModel | import("./FormInputNumber").LabelWithInputNumberModel | LabelWithSelectModel | import("./FormDatePicker").LabelWithDatePickerModel | import("./FormMonthPicker").LabelWithMonthPickerModel | import("./FormRangePicker").LabelWithRangePickerModel | import("./FormUpload").LabelWithUploadModel | import("./FormSwitch").LabelWithSwitchModel | import("./FormRadioButton").LabelWithRadioButtonModel | import("./FormText").LabelWithTextModel | import("./FormCascader").LabelWithCascaderModel | import("./FormCheckbox").LabelWithCheckboxModel>(key: string) => {
            value: T;
            type: "normal" | "custom";
        };
        removeFormItem: (key: string) => boolean;
        clearFormItem: () => void;
        _initFormItemField: (key: string, value: import("./FormInput").LabelWithInputModel | import("./FormInputNumber").LabelWithInputNumberModel | LabelWithSelectModel | import("./FormDatePicker").LabelWithDatePickerModel | import("./FormMonthPicker").LabelWithMonthPickerModel | import("./FormRangePicker").LabelWithRangePickerModel | import("./FormUpload").LabelWithUploadModel | import("./FormSwitch").LabelWithSwitchModel | import("./FormRadioButton").LabelWithRadioButtonModel | import("./FormText").LabelWithTextModel | import("./FormCascader").LabelWithCascaderModel | import("./FormCheckbox").LabelWithCheckboxModel, type?: "normal" | "custom") => void;
    } & import("../LegionsStoreForm/proFormStore").IOtherView;
    /**
     *
     *  查询下拉单选dom
     * @returns
     * @memberof FormElement
     */
    querySelectDom(type?: 'ant-select-selection--single' | 'ant-select-selection--multiple'): Element;
    componentDidMount(): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    onkeyDownSelelctMultiple(even: any): void;
    /**
     *  下拉单选 键盘事件拦截
     *
     * @param {*} even
     * @memberof FormElement
     */
    onKeyDownSelect(even: any): void;
    addElement(): void;
    render(): JSX.Element;
}
