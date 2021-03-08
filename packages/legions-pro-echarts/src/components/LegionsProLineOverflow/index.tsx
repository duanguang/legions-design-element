import React,{ Component } from 'react'
import { Tooltip } from 'antd';
import { TooltipProps } from 'antd/lib/tooltip';
interface IProps{
    text: string | React.ReactNode,
    width?:number | string
}
export default class LegionsProLineOverflow extends Component<IProps> {
    render() {
        const {text,width} = this.props
        return (
            <Tooltip placement={'leftTop'} title={text || ''}>
                <div style={{whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis',width:width || '100%'}}>
                    {text || ''}
                </div>
            </Tooltip>
        )
    }
}
