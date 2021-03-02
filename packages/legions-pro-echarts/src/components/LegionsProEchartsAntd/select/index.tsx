/*
 * @Author: linzeqin
 * @Date: 2019-11-07 08:36:35
 * @description: 单选框组件
 */

import { Select } from 'antd';
import { SelectProps } from 'antd/lib/select';
import React from 'react';
import { prefixCls } from '../../core';
import '../style/select.less';

export default class LegionsProEchartsSelect extends React.Component<SelectProps> {
    static Option: typeof Select.Option = Select.Option;
    render() {
        const { className = '', style, ...props} = this.props;
        const mStyle: React.CSSProperties = {
            width: '100%',
            ...style,
        }
        return (
            <Select {...props} style={mStyle} className={`${className} ${prefixCls}-select`}>
                {this.props.children}
            </Select>
        )
    }
}
