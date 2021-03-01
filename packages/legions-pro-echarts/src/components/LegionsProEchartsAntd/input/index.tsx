/*
 * @Author: linzeqin
 * @Date: 2019-11-07 08:36:35
 * @description: 单选框组件
 */

import { Input } from 'antd';
import { InputProps } from 'antd/lib/input/Input';
import React from 'react';
import { prefixCls } from '../../core';
import '../style/input.less';

export default class LegionsProEchartsInput extends React.Component<InputProps> {

    render() {
        const { className = '',  ...props} = this.props;
        return (
            <Input {...props} className={`${className} ${prefixCls}-input`}/>
        )
    }
}
