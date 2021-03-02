/*
 * @Author: linzeqin
 * @Date: 2019-11-07 08:36:35
 * @description: 单选框组件
 */

import { Radio } from 'antd';
import { RadioGroupProps } from 'antd/lib/radio/group';
import React from 'react';
import { prefixCls } from '../../core';
import '../style/radio.less';

interface IProps extends RadioGroupProps {
    /** 主题 */
    theme?: 'default' | 'card'
}

export default class LegionsProEchartsRadio extends React.Component<IProps> {
    static Button: typeof Radio.Button = Radio.Button;
    static defaultProps: IProps = {
        theme: 'default',
    }

    render() {
        const { className = '', ...props} = this.props;
        const themeClassName = `${prefixCls}-radio-${this.props.theme}`
        return (
            <Radio.Group {...props} className={`${className} ${themeClassName}`}>{this.props.children}</Radio.Group>
        )
    }
}
