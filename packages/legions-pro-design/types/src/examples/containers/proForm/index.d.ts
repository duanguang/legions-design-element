import React from 'react';
import { InstanceProForm } from '../../../components/LegionsProForm/interface';
import TodoStore from 'examples/stores/TodoStore';
interface IProps {
    todoStore: TodoStore;
}
interface IState {
    visible: boolean;
    disabled: boolean;
    xssValue: string;
}
export declare class ProForm extends React.Component<IProps, IState> {
    formRef: InstanceProForm;
    constructor(props: IProps);
    arr: (import("../../../components/LegionsProForm/interface").LabelWithSelectModel | import("../../../components/LegionsProForm/FormInput").LabelWithInputModel | import("../../../components/LegionsProForm/FormInputNumber").LabelWithInputNumberModel | import("../../../components/LegionsProForm/FormDatePicker").LabelWithDatePickerModel | import("../../../components/LegionsProForm/FormMonthPicker").LabelWithMonthPickerModel | import("../../../components/LegionsProForm/FormRangePicker").LabelWithRangePickerModel | import("../../../components/LegionsProForm/FormUpload").LabelWithUploadModel | import("../../../components/LegionsProForm/FormSwitch").LabelWithSwitchModel | import("../../../components/LegionsProForm/FormRadioButton").LabelWithRadioButtonModel | import("../../../components/LegionsProForm/FormText").LabelWithTextModel | import("../../../components/LegionsProForm/FormCheckbox").LabelWithCheckboxModel | import("../../../components/LegionsProForm/FormCascader").LabelWithCascaderModel)[];
    componentDidMount(): void;
    createConfig(): (import("../../../components/LegionsProForm/interface").LabelWithSelectModel | import("../../../components/LegionsProForm/FormInput").LabelWithInputModel | import("../../../components/LegionsProForm/FormInputNumber").LabelWithInputNumberModel | import("../../../components/LegionsProForm/FormDatePicker").LabelWithDatePickerModel | import("../../../components/LegionsProForm/FormMonthPicker").LabelWithMonthPickerModel | import("../../../components/LegionsProForm/FormRangePicker").LabelWithRangePickerModel | import("../../../components/LegionsProForm/FormUpload").LabelWithUploadModel | import("../../../components/LegionsProForm/FormSwitch").LabelWithSwitchModel | import("../../../components/LegionsProForm/FormRadioButton").LabelWithRadioButtonModel | import("../../../components/LegionsProForm/FormText").LabelWithTextModel | import("../../../components/LegionsProForm/FormCheckbox").LabelWithCheckboxModel | import("../../../components/LegionsProForm/FormCascader").LabelWithCascaderModel)[];
    render(): JSX.Element;
}
export {};
