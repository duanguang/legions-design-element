/*
 * @Author: linzeqin
 * @Date: 2019-11-07 08:36:35
 * @description: 单选框组件
 */

import { Button } from 'antd';
import { ButtonProps } from 'antd/lib/button/button';
import React from 'react';
import { prefixCls } from '../../core';
import '../style/button.less';

export default class LegionsProEchartsButton extends React.Component<ButtonProps> {
    static Group = Button.Group

    render() {
        const { className = '',  ...props} = this.props;
        return (
            <Button {...props} className={`${prefixCls}-button ${className}`}/>
        )
    }
}
