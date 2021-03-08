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
        elementList: import("../LegionsStoreForm/interface").IObservableMap<string, import("../LegionsStoreForm/interface").IElementList>;
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
        readonly computedFormFields: (import("../LegionsProForm/FormInput").LabelWithInputModel | import("../LegionsProForm/FormInputNumber").LabelWithInputNumberModel | import("../LegionsProForm/FormDatePicker").LabelWithDatePickerModel | import("../LegionsProForm/FormMonthPicker").LabelWithMonthPickerModel | import("../LegionsProForm/FormRangePicker").LabelWithRangePickerModel | import("../LegionsProForm/FormUpload").LabelWithUploadModel | import("../LegionsProForm/FormSwitch").LabelWithSwitchModel | import("../LegionsProForm/FormRadioButton").LabelWithRadioButtonModel | import("../LegionsProForm/FormText").LabelWithTextModel | import("../LegionsProForm/interface").LabelWithSelectModel | import("../LegionsProForm/FormCheckbox").LabelWithCheckboxModel)[];
        readonly computedAllFormFields: (import("../LegionsProForm/FormInput").LabelWithInputModel | import("../LegionsProForm/FormInputNumber").LabelWithInputNumberModel | import("../LegionsProForm/FormDatePicker").LabelWithDatePickerModel | import("../LegionsProForm/FormMonthPicker").LabelWithMonthPickerModel | import("../LegionsProForm/FormRangePicker").LabelWithRangePickerModel | import("../LegionsProForm/FormUpload").LabelWithUploadModel | import("../LegionsProForm/FormSwitch").LabelWithSwitchModel | import("../LegionsProForm/FormRadioButton").LabelWithRadioButtonModel | import("../LegionsProForm/FormText").LabelWithTextModel | import("../LegionsProForm/interface").LabelWithSelectModel | import("../LegionsProForm/FormCheckbox").LabelWithCheckboxModel)[];
        readonly computedErrorListView: IErrorView[];
        readonly computedFormSize: "default" | "small" | "table";
        updateFormSize: (size: "default" | "small" | "table") => void;
        collectErrorReactNode: (componentCode: string, errorUid: string) => void;
        setErrorErrorReactNodeList: (componentCode: string, errorListView: IErrorView[]) => void;
        handleIgnore: (componentCode: string, id: number) => void;
        addAllElementKeys: (keys: string) => void;
        getFormItemField: <T extends import("../LegionsProForm/FormInput").LabelWithInputModel | import("../LegionsProForm/FormInputNumber").LabelWithInputNumberModel | import("../LegionsProForm/FormDatePicker").LabelWithDatePickerModel | import("../LegionsProForm/FormMonthPicker").LabelWithMonthPickerModel | import("../LegionsProForm/FormRangePicker").LabelWithRangePickerModel | import("../LegionsProForm/FormUpload").LabelWithUploadModel | import("../LegionsProForm/FormSwitch").LabelWithSwitchModel | import("../LegionsProForm/FormRadioButton").LabelWithRadioButtonModel | import("../LegionsProForm/FormText").LabelWithTextModel | import("../LegionsProForm/interface").LabelWithSelectModel | import("../LegionsProForm/FormCheckbox").LabelWithCheckboxModel>(key: string) => {
            value: T;
            type: "normal" | "custom";
        };
        _initFormItemField: (key: string, value: import("../LegionsProForm/FormInput").LabelWithInputModel | import("../LegionsProForm/FormInputNumber").LabelWithInputNumberModel | import("../LegionsProForm/FormDatePicker").LabelWithDatePickerModel | import("../LegionsProForm/FormMonthPicker").LabelWithMonthPickerModel | import("../LegionsProForm/FormRangePicker").LabelWithRangePickerModel | import("../LegionsProForm/FormUpload").LabelWithUploadModel | import("../LegionsProForm/FormSwitch").LabelWithSwitchModel | import("../LegionsProForm/FormRadioButton").LabelWithRadioButtonModel | import("../LegionsProForm/FormText").LabelWithTextModel | import("../LegionsProForm/interface").LabelWithSelectModel | import("../LegionsProForm/FormCheckbox").LabelWithCheckboxModel, type?: "normal" | "custom") => void;
    } & import("../LegionsStoreForm/proFormStore").IOtherView;
    handleIgnore(item: IErrorView): void;
    renderContent(): JSX.Element;
    render(): JSX.Element;
}
export {};
