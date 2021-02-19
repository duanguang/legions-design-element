import React,{ Component } from 'react'
import { Tooltip } from 'antd';
import { TooltipProps } from 'antd/lib/tooltip';
interface IProps extends TooltipProps{
    text: string | React.ReactNode,
}
export default class LegionsProLineOverflow extends Component<IProps> {
    render() {
        const {text,title,placement} = this.props
        return (
            <Tooltip placement={placement || 'leftTop'} title={title || text || ''}>
              {this.props.children}
            </Tooltip>
        )
    }
}
