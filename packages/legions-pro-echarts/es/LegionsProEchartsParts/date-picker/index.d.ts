import { DatePickerProps, MonthPickerProps, RangePickerProps } from 'antd/lib/date-picker';
import React from 'react';
import '../style/date-picker.less';
declare class RangePicker extends React.Component<RangePickerProps> {
    render(): JSX.Element;
}
declare class MonthPicker extends React.Component<MonthPickerProps> {
    render(): JSX.Element;
}
export default class LegionsProEchartsDatePicker extends React.Component<DatePickerProps> {
    static RangePicker: typeof RangePicker;
    static MonthPicker: typeof MonthPicker;
    render(): JSX.Element;
}
export {};
