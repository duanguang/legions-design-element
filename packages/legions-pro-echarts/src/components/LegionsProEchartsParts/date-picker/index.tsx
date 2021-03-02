/*
 * @Author: linzeqin
 * @Date: 2019-11-07 08:36:35
 * @description: 日期选择组件
 */

import { DatePicker } from 'antd';
import { DatePickerProps, MonthPickerProps, RangePickerProps } from 'antd/lib/date-picker';
import React from 'react';
import { prefixCls } from '../../core';
import '../style/date-picker.less';
class RangePicker extends React.Component<RangePickerProps> {
    render() {
        const { className = '', ...props} = this.props;
        return (
            <DatePicker.RangePicker {...props} className={`${prefixCls}-rangeDate-picker ${className}`}/>
        )
    }
}
class MonthPicker extends React.Component<MonthPickerProps> {
    render() {
        const { className = '', ...props} = this.props;
        return (
            <DatePicker.MonthPicker {...props} className={`${prefixCls}-monthDate-picker ${className}`}/>
        )
    }
}

export default class LegionsProEchartsDatePicker extends React.Component<DatePickerProps> {
    static RangePicker = RangePicker
    static MonthPicker = MonthPicker

    render() {
        const { className = '', ...props} = this.props;
        return (
            <DatePicker {...props} className={`${prefixCls}-date-picker ${className}`}/>
        )
    }
}
