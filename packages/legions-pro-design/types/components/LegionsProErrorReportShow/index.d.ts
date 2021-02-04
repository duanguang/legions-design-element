import { Component } from 'react';
import { ProFormStore } from '../store/pro.form';
import './style/index.less';
import { IErrorView } from '../store/pro.form/interface';
interface IProps {
    store?: ProFormStore;
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
    get viewForm(): import("brain-store-utils").ViewModel<import("../store/pro.form/proFormStore").HlFormView> & {
        elementList: import("../store/pro.form/interface").IObservableMap<string, import("../store/pro.form/interface").IElementList>;
        focusUid: string;
        enableEnterSwitch: boolean;
        renderNodeQueue: import("../store/pro.form/interface").IObservableMap<string, string>;
        errorReactNodeList: import("../store/pro.form/interface").IObservableMap<string, import("brain-store-utils").ViewModel<import("../store/pro.form/proFormStore").ErrorViewModel> & {
            uid: string;
            validateStatus: "" | "error";
        }>;
        errorListView: import("../store/pro.form/interface").IObservableMap<string, IErrorView[]>;
        readonly computedErrorReactNodeList: import("../store/pro.form/interface").IObservableMap<string, import("brain-store-utils").ViewModel<import("../store/pro.form/proFormStore").ErrorViewModel> & {
            uid: string;
            validateStatus: "" | "error";
        }>;
        readonly computedAllElementList: string[];
        readonly computedFormFields: (import("../LegionsProForm/FormInput").LabelWithInputModel | import("../LegionsProForm/FormInputNumber").LabelWithInputNumberModel | import("../LegionsProForm/FormDatePicker").LabelWithDatePickerModel | import("../LegionsProForm/FormMonthPicker").LabelWithMonthPickerModel | import("../LegionsProForm/FormRangePicker").LabelWithRangePickerModel | import("../LegionsProForm/FormUpload").LabelWithUploadModel | import("../LegionsProForm/FormSwitch").LabelWithSwitchModel | import("../LegionsProForm/FormRadioButton").LabelWithRadioButtonModel | import("../LegionsProForm/FormText").LabelWithTextModel | import("../LegionsProForm/interface").LabelWithSelectModel | import("../LegionsProForm/FormCheckbox").LabelWithCheckboxModel)[];
        readonly computedAllFormFields: (import("../LegionsProForm/FormInput").LabelWithInputModel | import("../LegionsProForm/FormInputNumber").LabelWithInputNumberModel | import("../LegionsProForm/FormDatePicker").LabelWithDatePickerModel | import("../LegionsProForm/FormMonthPicker").LabelWithMonthPickerModel | import("../LegionsProForm/FormRangePicker").LabelWithRangePickerModel | import("../LegionsProForm/FormUpload").LabelWithUploadModel | import("../LegionsProForm/FormSwitch").LabelWithSwitchModel | import("../LegionsProForm/FormRadioButton").LabelWithRadioButtonModel | import("../LegionsProForm/FormText").LabelWithTextModel | import("../LegionsProForm/interface").LabelWithSelectModel | import("../LegionsProForm/FormCheckbox").LabelWithCheckboxModel)[];
        readonly computedErrorListView: IErrorView[];
        readonly computedFormSize: "small" | "default" | "table";
        updateFormSize: (size: "small" | "default" | "table") => void;
        collectErrorReactNode: (componentCode: string, errorUid: string) => void;
        setErrorErrorReactNodeList: (componentCode: string, errorListView: IErrorView[]) => void;
        handleIgnore: (componentCode: string, id: number) => void;
        addAllElementKeys: (keys: string) => void;
        getFormItemField: (key: string) => {
            value: import("../LegionsProForm/FormInput").LabelWithInputModel | import("../LegionsProForm/FormInputNumber").LabelWithInputNumberModel | import("../LegionsProForm/FormDatePicker").LabelWithDatePickerModel | import("../LegionsProForm/FormMonthPicker").LabelWithMonthPickerModel | import("../LegionsProForm/FormRangePicker").LabelWithRangePickerModel | import("../LegionsProForm/FormUpload").LabelWithUploadModel | import("../LegionsProForm/FormSwitch").LabelWithSwitchModel | import("../LegionsProForm/FormRadioButton").LabelWithRadioButtonModel | import("../LegionsProForm/FormText").LabelWithTextModel | import("../LegionsProForm/interface").LabelWithSelectModel | import("../LegionsProForm/FormCheckbox").LabelWithCheckboxModel;
            type: "normal" | "custom";
        };
        _initFormItemField: (key: string, value: import("../LegionsProForm/FormInput").LabelWithInputModel | import("../LegionsProForm/FormInputNumber").LabelWithInputNumberModel | import("../LegionsProForm/FormDatePicker").LabelWithDatePickerModel | import("../LegionsProForm/FormMonthPicker").LabelWithMonthPickerModel | import("../LegionsProForm/FormRangePicker").LabelWithRangePickerModel | import("../LegionsProForm/FormUpload").LabelWithUploadModel | import("../LegionsProForm/FormSwitch").LabelWithSwitchModel | import("../LegionsProForm/FormRadioButton").LabelWithRadioButtonModel | import("../LegionsProForm/FormText").LabelWithTextModel | import("../LegionsProForm/interface").LabelWithSelectModel | import("../LegionsProForm/FormCheckbox").LabelWithCheckboxModel, type?: "normal" | "custom") => void;
    } & import("../store/pro.form/proFormStore").IOtherView;
    handleIgnore(item: IErrorView): void;
    renderContent(): JSX.Element;
    render(): JSX.Element;
}
export {};
