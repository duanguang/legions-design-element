import React,{ Component } from 'react'
import { Progress } from 'antd';
import { ProgressProps } from 'antd/lib/progress/progress';
import { prefixCls } from '../../core';
import '../style/progress.less';
interface IProps extends ProgressProps{}
export default class LegionsProEchartsProgress extends Component<IProps> {
    renderProgress(){
        const {className,style,strokeWidth,...props} = this.props
        if(this.props.type === 'circle'){
            return <Progress
                {...props}
                strokeWidth={strokeWidth || 8}
                className={`${prefixCls}-progress-circle ${className ? className : ''}`}
                style={{color:'#00E6FC',...style}}
            ></Progress>
        }else{
            return <Progress
                {...props}
                strokeWidth={strokeWidth || 8}
                className={`${prefixCls}-progress ${className ? className : ''}`}
                style={{color:'#00E6FC',...style}}
            ></Progress>
        }
    }
    render() {
        return this.renderProgress()
    }
}
