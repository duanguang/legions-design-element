/*
 * @Author: linzeqin
 * @Date: 2019-11-07 08:36:35
 * @description: 单选框组件
 */

import { DatePicker } from 'antd';
import { DatePickerProps } from 'antd/lib/date-picker';
import React from 'react';
import { prefixCls } from '../../core';
import '../style/date-picker.less';

export default class LegionsProEchartsDatePicker extends React.Component<DatePickerProps> {

    render() {
        const { className = '', ...props} = this.props;
        return (
            <DatePicker {...props} className={`${className} ${prefixCls}-date-picker`}/>
        )
    }
}
