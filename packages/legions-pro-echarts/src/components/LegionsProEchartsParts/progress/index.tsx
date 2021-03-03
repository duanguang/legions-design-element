import React,{ Component } from 'react'
import { Progress } from 'antd';
import { ProgressProps } from 'antd/lib/progress/progress';
import { prefixCls } from '../../core';
import '../style/progress.less';

export default class LegionsProEchartsProgress extends Component<ProgressProps> {
    render() {
        const {
            className = '',
            /** 线宽默认8 */
            strokeWidth = 8,
            /** 状态默认全部为active */
            status="active",
            ...props
        } = this.props;

        return <Progress
            {...props}
            status={status}
            strokeWidth={strokeWidth}
            className={`${prefixCls}-progress ${className}`}
        ></Progress>
    }
}
