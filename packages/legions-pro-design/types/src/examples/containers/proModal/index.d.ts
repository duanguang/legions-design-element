import React from 'react';
import { FormFields } from '../proForm/model';
import { InstanceLegionsModalForm } from '../../../components/LegionsProModalForm/interface';
interface IProps {
}
interface IState {
    visible: boolean;
    disabled: boolean;
}
export declare class ProModal extends React.Component<IProps, IState> {
    modalStore: InstanceLegionsModalForm<FormFields>;
    modalStore1: InstanceLegionsModalForm<FormFields>;
    constructor(props: IProps);
    createConfig(): (import("../../../components/LegionsProForm/FormInput").LabelWithInputModel | import("../../../components/LegionsProForm/FormInputNumber").LabelWithInputNumberModel | import("../../../components/LegionsProForm/interface").LabelWithSelectModel | import("../../../components/LegionsProForm/FormDatePicker").LabelWithDatePickerModel | import("../../../components/LegionsProForm/FormMonthPicker").LabelWithMonthPickerModel | import("../../../components/LegionsProForm/FormRangePicker").LabelWithRangePickerModel | import("../../../components/LegionsProForm/FormUpload").LabelWithUploadModel | import("../../../components/LegionsProForm/FormSwitch").LabelWithSwitchModel | import("../../../components/LegionsProForm/FormRadioButton").LabelWithRadioButtonModel | import("../../../components/LegionsProForm/FormText").LabelWithTextModel | import("../../../components/LegionsProForm/FormCascader").LabelWithCascaderModel | import("../../../components/LegionsProForm/FormCheckbox").LabelWithCheckboxModel)[];
    componentDidMount(): void;
    render(): JSX.Element;
}
export {};
