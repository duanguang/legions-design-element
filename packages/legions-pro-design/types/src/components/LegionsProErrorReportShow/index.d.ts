import { Component } from 'react';
import LegionsStoreForm from '../LegionsStoreForm';
import './style/index.less';
import { IErrorView } from '../LegionsStoreForm/interface';
interface IProps {
    store?: InstanceType<typeof LegionsStoreForm>;
    errorClassName?: string;
    className?: string;
    /**
     *
     * 用于关联业务错误信息的唯一编码
     * @type {string}
     * @memberof IProps
     */
    code: string;
    /**
     *
     * 表单uid
     * @type {string}
     * @memberof IProps
     */
    formUid: string;
    onIgnoreError?: (item: any) => void;
}
interface IState {
}
export default class LegionsProErrorReportShow extends Component<IProps, IState> {
    timeId: number;
    uid: string;
    enumList: {
        1: string;
        2: string;
    };
    constructor(props: any);
    get viewForm(): import("brain-store-utils").ViewModel<import("../LegionsStoreForm/proFormStore").HlFormView> & {
        _elementList: import("../LegionsStoreForm/interface").IObservableMap<string, import("../LegionsStoreForm/interface").IElementList>;
        focusUid: string;
        enableEnterSwitch: boolean;
        renderNodeQueue: import("../LegionsStoreForm/interface").IObservableMap<string, string>;
        _errorReactNodeList: import("../LegionsStoreForm/interface").IObservableMap<string, import("brain-store-utils").ViewModel<import("../LegionsStoreForm/proFormStore").ErrorViewModel> & {
            uid: string;
            validateStatus: "" | "error";
        }>;
        _errorListView: import("../LegionsStoreForm/interface").IObservableMap<string, IErrorView[]>;
        readonly computedErrorReactNodeList: import("../LegionsStoreForm/interface").IObservableMap<string, import("brain-store-utils").ViewModel<import("../LegionsStoreForm/proFormStore").ErrorViewModel> & {
            uid: string;
            validateStatus: "" | "error";
        }>;
        readonly computedAllElementList: string[];
        readonly computedFormFields: (import("../LegionsProForm/FormInput").LabelWithInputModel | import("../LegionsProForm/FormInputNumber").LabelWithInputNumberModel | import("../LegionsProForm/FormDatePicker").LabelWithDatePickerModel | import("../LegionsProForm/FormMonthPicker").LabelWithMonthPickerModel | import("../LegionsProForm/FormRangePicker").LabelWithRangePickerModel | import("../LegionsProForm/FormUpload").LabelWithUploadModel | import("../LegionsProForm/FormSwitch").LabelWithSwitchModel | import("../LegionsProForm/FormRadioButton").LabelWithRadioButtonModel | import("../LegionsProForm/FormText").LabelWithTextModel | import("../LegionsProForm/interface").LabelWithSelectModel | import("../LegionsProForm/FormCheckbox").LabelWithCheckboxModel | import("../LegionsProForm/FormCascader").LabelWithCascaderModel)[];
        readonly computedAllFormFields: (import("../LegionsProForm/FormInput").LabelWithInputModel | import("../LegionsProForm/FormInputNumber").LabelWithInputNumberModel | import("../LegionsProForm/FormDatePicker").LabelWithDatePickerModel | import("../LegionsProForm/FormMonthPicker").LabelWithMonthPickerModel | import("../LegionsProForm/FormRangePicker").LabelWithRangePickerModel | import("../LegionsProForm/FormUpload").LabelWithUploadModel | import("../LegionsProForm/FormSwitch").LabelWithSwitchModel | import("../LegionsProForm/FormRadioButton").LabelWithRadioButtonModel | import("../LegionsProForm/FormText").LabelWithTextModel | import("../LegionsProForm/interface").LabelWithSelectModel | import("../LegionsProForm/FormCheckbox").LabelWithCheckboxModel | import("../LegionsProForm/FormCascader").LabelWithCascaderModel)[];
        readonly computedErrorListView: IErrorView[];
        readonly computedFormSize: "small" | "table" | "default";
        updateFormSize: (size: "small" | "table" | "default") => void;
        _collectErrorReactNode: (componentCode: string, errorUid: string) => void;
        setErrorErrorReactNodeList: (componentCode: string, errorListView: IErrorView[]) => void;
        handleIgnore: (componentCode: string, id: number) => void;
        _addAllElementKeys: (keys: string) => void;
        getFormItemField: <T extends import("../LegionsProForm/FormInput").LabelWithInputModel | import("../LegionsProForm/FormInputNumber").LabelWithInputNumberModel | import("../LegionsProForm/FormDatePicker").LabelWithDatePickerModel | import("../LegionsProForm/FormMonthPicker").LabelWithMonthPickerModel | import("../LegionsProForm/FormRangePicker").LabelWithRangePickerModel | import("../LegionsProForm/FormUpload").LabelWithUploadModel | import("../LegionsProForm/FormSwitch").LabelWithSwitchModel | import("../LegionsProForm/FormRadioButton").LabelWithRadioButtonModel | import("../LegionsProForm/FormText").LabelWithTextModel | import("../LegionsProForm/interface").LabelWithSelectModel | import("../LegionsProForm/FormCheckbox").LabelWithCheckboxModel | import("../LegionsProForm/FormCascader").LabelWithCascaderModel>(key: string) => {
            value: T;
            type: "normal" | "custom";
        };
        removeFormItem: (key: string) => boolean;
        clearFormItem: () => void;
        _initFormItemField: (key: string, value: import("../LegionsProForm/FormInput").LabelWithInputModel | import("../LegionsProForm/FormInputNumber").LabelWithInputNumberModel | import("../LegionsProForm/FormDatePicker").LabelWithDatePickerModel | import("../LegionsProForm/FormMonthPicker").LabelWithMonthPickerModel | import("../LegionsProForm/FormRangePicker").LabelWithRangePickerModel | import("../LegionsProForm/FormUpload").LabelWithUploadModel | import("../LegionsProForm/FormSwitch").LabelWithSwitchModel | import("../LegionsProForm/FormRadioButton").LabelWithRadioButtonModel | import("../LegionsProForm/FormText").LabelWithTextModel | import("../LegionsProForm/interface").LabelWithSelectModel | import("../LegionsProForm/FormCheckbox").LabelWithCheckboxModel | import("../LegionsProForm/FormCascader").LabelWithCascaderModel, type?: "normal" | "custom") => void;
    } & import("../LegionsStoreForm/proFormStore").IOtherView;
    handleIgnore(item: IErrorView): void;
    renderContent(): JSX.Element;
    render(): JSX.Element;
}
export {};
