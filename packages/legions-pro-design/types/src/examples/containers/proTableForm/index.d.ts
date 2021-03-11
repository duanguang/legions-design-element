import React from 'react';
import { InstanceProForm } from '../../../components/LegionsProForm/interface';
import moment from 'moment';
interface IProps {
}
interface IState {
    visible: boolean;
    disabled: boolean;
    xssValue: string;
}
/** 列表字段实体 */
declare class TableEntity {
    /** 序号 */
    index: number;
    /** 文本框 */
    inputComponent?: string;
    /** 下拉框 */
    selectComponent?: string;
    /** 日期选择框 */
    dateComponent?: moment.Moment;
    /** 单选框 */
    radioComponent?: string;
    /** 开关 */
    switchComponent?: boolean;
    /** 普通文本 */
    textComponent?: string;
}
declare class PageViewModel {
    list: TableEntity[];
}
export declare class ProTableForm extends React.Component<IProps, IState> {
    formRef: InstanceProForm;
    viewModel: import("brain-store-utils").ViewModel<PageViewModel> & import("brain-store-utils").Proxify<PageViewModel>;
    constructor(props: IProps);
    arr: (import("../../../components/LegionsProForm/FormInput").LabelWithInputModel | import("../../../components/LegionsProForm/FormInputNumber").LabelWithInputNumberModel | import("../../../components/LegionsProForm/FormDatePicker").LabelWithDatePickerModel | import("../../../components/LegionsProForm/FormMonthPicker").LabelWithMonthPickerModel | import("../../../components/LegionsProForm/FormRangePicker").LabelWithRangePickerModel | import("../../../components/LegionsProForm/FormUpload").LabelWithUploadModel | import("../../../components/LegionsProForm/FormSwitch").LabelWithSwitchModel | import("../../../components/LegionsProForm/FormRadioButton").LabelWithRadioButtonModel | import("../../../components/LegionsProForm/FormText").LabelWithTextModel | import("../../../components/LegionsProForm/interface").LabelWithSelectModel)[];
    componentDidMount(): void;
    createConfig(): (import("../../../components/LegionsProForm/FormInput").LabelWithInputModel | import("../../../components/LegionsProForm/FormInputNumber").LabelWithInputNumberModel | import("../../../components/LegionsProForm/FormDatePicker").LabelWithDatePickerModel | import("../../../components/LegionsProForm/FormMonthPicker").LabelWithMonthPickerModel | import("../../../components/LegionsProForm/FormRangePicker").LabelWithRangePickerModel | import("../../../components/LegionsProForm/FormUpload").LabelWithUploadModel | import("../../../components/LegionsProForm/FormSwitch").LabelWithSwitchModel | import("../../../components/LegionsProForm/FormRadioButton").LabelWithRadioButtonModel | import("../../../components/LegionsProForm/FormText").LabelWithTextModel | import("../../../components/LegionsProForm/interface").LabelWithSelectModel)[];
    render(): JSX.Element;
}
export {};
