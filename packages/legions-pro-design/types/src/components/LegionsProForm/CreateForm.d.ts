import React from 'react';
import { LabelWithInputModel } from './FormInput';
import { WrappedFormUtils } from '../interface/antd';
import { LabelWithRenderModel } from './FormRender';
import { LabelWithDatePickerModel } from './FormDatePicker';
import { LabelWithMonthPickerModel } from './FormMonthPicker';
import { LabelWithRangePickerModel } from './FormRangePicker';
import { LabelWithUploadModel } from './FormUpload';
import { LabelWithSelectModel } from './interface';
import { LabelWithInputNumberModel } from './FormInputNumber';
import { InstanceProForm } from './interface';
import { LabelWithSwitchModel } from './FormSwitch';
import { LabelWithRadioButtonModel } from './FormRadioButton';
import { LabelWithTextModel } from './FormText';
import { LabelWithCheckboxModel } from './FormCheckbox';
export default abstract class CreateForm<Props, State> extends React.Component<Props, State> {
    protected createFormInput(key: number | string, control: LabelWithInputModel, form: WrappedFormUtils, formUid: string, formRef: InstanceProForm): JSX.Element;
    protected createFormInputNumber(key: number | string, control: LabelWithInputNumberModel, form: WrappedFormUtils, formUid: string, formRef: InstanceProForm): JSX.Element;
    protected createFormSelect(key: number | string, control: LabelWithSelectModel, form: WrappedFormUtils, formUid: string, formRef: InstanceProForm): JSX.Element;
    protected createFormRender(key: number | string, control: LabelWithRenderModel, form: WrappedFormUtils, formRef: InstanceProForm): JSX.Element;
    protected createFormDatePicker(key: number | string, control: LabelWithDatePickerModel, form: WrappedFormUtils, formUid: string, formRef: InstanceProForm): JSX.Element;
    protected createFormMonthPicker(key: number | string, control: LabelWithMonthPickerModel, form: WrappedFormUtils, formUid: string, formRef: InstanceProForm): JSX.Element;
    protected createFormRangePicker(key: number | string, control: LabelWithRangePickerModel, form: WrappedFormUtils, formUid: string, formRef: InstanceProForm): JSX.Element;
    protected createFormUpload(key: number | string, control: LabelWithUploadModel, form: WrappedFormUtils, formUid: string, formRef: InstanceProForm): JSX.Element;
    protected createFormSwitch(key: number | string, control: LabelWithSwitchModel, form: WrappedFormUtils, formUid: string, formRef: InstanceProForm): JSX.Element;
    protected createFormRadioButton(key: number | string, control: LabelWithRadioButtonModel, form: WrappedFormUtils, formUid: string, formRef: InstanceProForm): JSX.Element;
    protected createFormText(key: number | string, control: LabelWithTextModel, form: WrappedFormUtils, formUid: string, formRef: InstanceProForm): JSX.Element;
    protected createFormCheckbox(key: number | string, control: LabelWithCheckboxModel, form: WrappedFormUtils, formUid: string, formRef: InstanceProForm): JSX.Element;
}
