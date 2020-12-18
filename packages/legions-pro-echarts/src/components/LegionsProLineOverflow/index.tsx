import React,{ Component } from 'react'
import { Tooltip } from 'antd';
interface IProps {
    width?: number | string,
    text: string | React.ReactNode,
}
export default class LegionsProLineOverflow extends Component<IProps> {
    static defaultProps: IProps = {
        text: '',
        width: 100,
    };
    render() {
        return (
            <Tooltip placement="leftTop" title={this.props.text ? this.props.text : ''}>
              {this.props.children}
            </Tooltip>
        )
    }
}
