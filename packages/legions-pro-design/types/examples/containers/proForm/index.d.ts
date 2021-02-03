import React from 'react';
import { InstanceForm } from '../../../components/LegionsProForm/interface';
interface IProps {
}
interface IState {
    visible: boolean;
    disabled: boolean;
}
export declare class ProForm extends React.Component<IProps, IState> {
    formRef: InstanceForm;
    constructor(props: IProps);
    arr: (import("../../../components/LegionsProForm/FormInput").LabelWithInputModel | import("../../../components/LegionsProForm/FormInputNumber").LabelWithInputNumberModel | import("../../../components/LegionsProForm/FormDatePicker").LabelWithDatePickerModel | import("../../../components/LegionsProForm/FormMonthPicker").LabelWithMonthPickerModel | import("../../../components/LegionsProForm/FormRangePicker").LabelWithRangePickerModel | import("../../../components/LegionsProForm/FormUpload").LabelWithUploadModel | import("../../../components/LegionsProForm/FormSwitch").LabelWithSwitchModel | import("../../../components/LegionsProForm/FormRadioButton").LabelWithRadioButtonModel | import("../../../components/LegionsProForm/FormText").LabelWithTextModel | import("../../../components/LegionsProForm/interface").LabelWithSelectModel)[];
    componentDidMount(): void;
    createConfig(): (import("../../../components/LegionsProForm/FormInput").LabelWithInputModel | import("../../../components/LegionsProForm/FormInputNumber").LabelWithInputNumberModel | import("../../../components/LegionsProForm/FormDatePicker").LabelWithDatePickerModel | import("../../../components/LegionsProForm/FormMonthPicker").LabelWithMonthPickerModel | import("../../../components/LegionsProForm/FormRangePicker").LabelWithRangePickerModel | import("../../../components/LegionsProForm/FormUpload").LabelWithUploadModel | import("../../../components/LegionsProForm/FormSwitch").LabelWithSwitchModel | import("../../../components/LegionsProForm/FormRadioButton").LabelWithRadioButtonModel | import("../../../components/LegionsProForm/FormText").LabelWithTextModel | import("../../../components/LegionsProForm/interface").LabelWithSelectModel)[];
    render(): JSX.Element;
}
export {};
